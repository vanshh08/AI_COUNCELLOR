# AI Integration Guide - Claude API

## Overview

This document explains how the AI Counsellor uses Claude API to provide intelligent guidance to students.

## Architecture

```
User Message
    ↓
Backend receives message
    ↓
Build context from user profile + chat history
    ↓
Call Claude API with structured prompt
    ↓
Process response
    ↓
Save to database
    ↓
Return to frontend
```

## Claude API Configuration

### Model Selection
We use **Claude Sonnet 4** (`claude-sonnet-4-20250514`) because:
- Best balance of intelligence and speed
- Strong reasoning capabilities
- Cost-effective for production
- Excellent at following instructions

### API Parameters
```python
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1000,  # Sufficient for detailed responses
    system=system_prompt,  # Context about user
    messages=conversation_history
)
```

## System Prompt Structure

The system prompt is critical for AI behavior. It includes:

### 1. Role Definition
```
You are an expert study-abroad counsellor helping students make 
informed decisions about their higher education journey.
```

### 2. User Context
```python
profile_context = f"""
User Profile:
- Name: {user_profile.user.full_name}
- Current: {user_profile.current_degree} in {user_profile.major}
- GPA: {user_profile.gpa}
- Target: {user_profile.target_degree} in {user_profile.field_of_study}
- Countries: {', '.join(user_profile.preferred_countries)}
- Budget: ${user_profile.budget_range}
- IELTS: {user_profile.ielts_status}
- GRE: {user_profile.gre_status}
- SOP: {user_profile.sop_status}
"""
```

### 3. Responsibilities
```
Your responsibilities:
1. Analyze the student's profile strengths and gaps
2. Recommend universities (Dream/Target/Safe) based on their profile
3. Explain why universities fit or are risky
4. Help with shortlisting and locking universities
5. Create and manage to-do tasks
6. Provide actionable guidance

Be concise, specific, and action-oriented.
```

## Conversation Flow

### Initial Message
```python
# User sends first message
user_message = "Can you recommend universities for me?"

# Backend builds context
messages = [
    {"role": "user", "content": user_message}
]

# Call Claude API
response = await get_ai_response(user_message, profile, [], db)
```

### Follow-up Messages
```python
# Get last 10 messages for context
chat_history = db.query(ChatMessage)\
    .filter(ChatMessage.user_id == current_user.id)\
    .order_by(ChatMessage.created_at)\
    .all()[-10:]

# Build conversation
messages = [
    {"role": msg.role, "content": msg.content} 
    for msg in chat_history
]
messages.append({"role": "user", "content": new_message})

# Call API with full context
response = await get_ai_response(new_message, profile, messages, db)
```

## Response Processing

### Text Response
```python
# Extract text from response
ai_text = response.content[0].text

# Save to database
ai_msg = ChatMessage(
    user_id=current_user.id,
    role="assistant",
    content=ai_text
)
db.add(ai_msg)
db.commit()

# Return to user
return {"response": ai_text}
```

### Action Detection (Future Enhancement)

You can enhance the AI to trigger actions:

```python
# Example: Detect shortlist intent
if "shortlist" in user_message.lower():
    # Extract university name using AI
    university_name = extract_university_name(user_message)
    
    # Find university
    uni = db.query(University)\
        .filter(University.name.ilike(f"%{university_name}%"))\
        .first()
    
    if uni:
        # Shortlist it
        shortlist = ShortlistedUniversity(
            user_id=current_user.id,
            university_id=uni.id
        )
        db.add(shortlist)
        db.commit()
        
        # Tell AI action was performed
        action_result = f"✓ {uni.name} has been shortlisted"
        return {"response": action_result}
```

## Example Conversations

### Example 1: Profile Analysis
```
User: "How is my profile?"

AI Response:
"Based on your profile:

**Academic Strength**: Your 3.6 GPA in Computer Science shows strong 
academic performance. This puts you in a good position for target schools.

**Exam Status**: 
- ✓ IELTS completed with 7.5 - Excellent score
- ✓ GRE completed with 320 - Strong score
- ⚠ SOP is in draft - Needs to be finalized

**Recommendations**: 
With your profile, you can aim for universities like:
- University of Toronto (Target)
- University of Southern California (Target) 
- University of Texas at Austin (Target)

Your biggest priority should be finalizing your SOP to strengthen 
applications."
```

### Example 2: University Recommendations
```
User: "Recommend universities for my budget"

AI Response:
"Based on your budget of $20,000-40,000, here are my top recommendations:

**🎯 Target Universities**

1. **University of Toronto** ($28,000/year)
   - Strong CS program
   - Good value for money
   - PR pathway after graduation
   - Risk: Competitive admission

2. **University of British Columbia** ($26,000/year)
   - Beautiful location in Vancouver
   - Solid CS reputation
   - Work opportunities
   - Risk: High living costs

3. **Technical University of Munich** ($5,000/year)
   - Minimal tuition!
   - Strong engineering
   - EU job market
   - Risk: Need to learn German

Would you like me to shortlist any of these?"
```

### Example 3: Shortlisting Action
```
User: "Yes, shortlist University of Toronto"

AI Response:
"✓ I've added University of Toronto to your shortlist!

You now have 1 university shortlisted. Here's what makes it a great fit:
- Your 3.6 GPA meets their 3.5 requirement
- Your GRE 320 exceeds their 315 minimum
- Budget-friendly at $28k/year
- Strong job market in Toronto tech scene

Next steps:
1. Research their specific program requirements
2. Finalize your SOP with Toronto-specific content
3. Consider locking this university once you're confident

Would you like recommendations for 1-2 more universities to complete 
your shortlist?"
```

## Prompt Engineering Tips

### 1. Be Specific
❌ Bad: "You are a counsellor"
✅ Good: "You are an expert study-abroad counsellor specializing in computer science programs"

### 2. Provide Context
Always include:
- User's current situation
- Goals and constraints
- Previous conversation
- Available actions

### 3. Set Boundaries
```
- Keep responses under 200 words
- Always explain reasoning
- Be encouraging but realistic
- Focus on actionable advice
```

### 4. Format Responses
```
Use this structure:
1. Direct answer to question
2. Brief explanation
3. Actionable next step

Use formatting:
- **Bold** for emphasis
- Bullet points for lists
- Numbers for steps
```

## Error Handling

```python
async def get_ai_response(message, profile, history, db):
    try:
        response = client.messages.create(...)
        return response.content[0].text
    except anthropic.APIError as e:
        logger.error(f"Anthropic API Error: {e}")
        return "I'm having trouble responding right now. Please try again."
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return "Something went wrong. Please contact support."
```

## Rate Limiting

Anthropic has rate limits. Implement caching for common queries:

```python
# Cache common responses
COMMON_RESPONSES = {
    "hello": "Hi! I'm your AI counsellor. How can I help you today?",
    "help": "I can help you with: profile analysis, university recommendations, ..."
}

def get_cached_response(message):
    message_lower = message.lower().strip()
    if message_lower in COMMON_RESPONSES:
        return COMMON_RESPONSES[message_lower]
    return None
```

## Cost Optimization

### Token Usage
- Input tokens: ~500-1000 per request (system + history)
- Output tokens: ~200-500 per response
- Cost: ~$0.003-0.015 per conversation turn

### Optimization Strategies
1. **Limit chat history**: Keep only last 10 messages
2. **Compress context**: Summarize old conversations
3. **Cache responses**: Store common queries
4. **Rate limit users**: 20 messages per hour

## Testing

### Test Prompt Quality
```python
test_cases = [
    {
        "input": "Recommend universities",
        "expected_contains": ["Dream", "Target", "Safe"]
    },
    {
        "input": "How is my profile?",
        "expected_contains": ["GPA", "IELTS", "GRE"]
    }
]

for test in test_cases:
    response = await get_ai_response(test["input"], profile, [], db)
    assert all(keyword in response for keyword in test["expected_contains"])
```

## Advanced Features

### 1. Sentiment Analysis
```python
# Detect user frustration and adjust tone
if "frustrated" in user_message or "confused" in user_message:
    system_prompt += "\nThe user seems frustrated. Be extra supportive."
```

### 2. Context-Aware Actions
```python
# Auto-detect intent and perform actions
intents = {
    "shortlist": handle_shortlist,
    "lock": handle_lock,
    "todo": handle_todo_creation
}

for intent, handler in intents.items():
    if intent in user_message.lower():
        result = handler(user_message, db)
        return result
```

### 3. Multi-Turn Planning
```python
# Track conversation state
conversation_state = {
    "stage": "exploring",  # exploring, shortlisting, locking, applying
    "focus_university": None,
    "pending_action": None
}

# Adjust responses based on state
if conversation_state["stage"] == "shortlisting":
    system_prompt += "\nUser is actively shortlisting. Be action-oriented."
```

## Security Considerations

### 1. Input Validation
```python
# Never pass raw user input to AI
def sanitize_input(user_input):
    # Remove potential prompt injection
    forbidden = ["ignore previous", "act as", "system:"]
    for pattern in forbidden:
        if pattern in user_input.lower():
            return "Invalid input"
    return user_input
```

### 2. Output Filtering
```python
# Filter sensitive information from AI responses
def filter_response(ai_response):
    # Don't leak API keys or internal data
    sensitive_patterns = [r'sk-\w+', r'postgresql://']
    for pattern in sensitive_patterns:
        ai_response = re.sub(pattern, '[REDACTED]', ai_response)
    return ai_response
```

## Monitoring

### Track Key Metrics
```python
# Log every AI interaction
ai_metrics = {
    "user_id": user.id,
    "timestamp": datetime.utcnow(),
    "input_tokens": len(message.split()),
    "output_tokens": len(response.split()),
    "response_time": end_time - start_time,
    "user_satisfied": None  # Can track via thumbs up/down
}
```

## Future Enhancements

1. **Streaming Responses**: Use Claude streaming for real-time responses
2. **Voice Integration**: Convert text to speech for voice mode
3. **Multi-Modal**: Allow image uploads (transcripts, documents)
4. **Function Calling**: Let AI directly trigger actions via structured outputs
5. **Memory**: Implement long-term memory across sessions

## Resources

- **Anthropic Docs**: https://docs.anthropic.com
- **Prompt Library**: https://docs.anthropic.com/claude/prompt-library
- **Best Practices**: https://docs.anthropic.com/claude/docs/intro-to-prompting

---

This guide should help you understand and extend the AI capabilities of the platform!
