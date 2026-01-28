# 🧪 AI Counsellor - Testing & Verification Guide

## **Pre-Launch Checklist**

### **Backend Verification**

- [ ] Python environment activated
- [ ] All dependencies installed (`pip list | grep -E "fastapi|sqlalchemy|anthropic"`)
- [ ] `.env` file created with all required variables
- [ ] Database seeded with universities (`python seed_comprehensive.py`)
- [ ] Backend starts without errors (`uvicorn main:app --reload`)
- [ ] API docs accessible at http://localhost:8000/docs
- [ ] Health check: GET http://localhost:8000/ returns JSON

### **Frontend Verification**

- [ ] Node.js and npm installed
- [ ] Dependencies installed (`npm list react@18`)
- [ ] `.env.local` configured with API_URL
- [ ] Frontend starts without errors (`npm run dev`)
- [ ] Landing page loads and renders
- [ ] All pages are accessible

### **Environment Variables**

#### **Backend (.env)**
```
DATABASE_URL=sqlite:///./counsellor.db
SECRET_KEY=your-super-secret-key-change-this
ANTHROPIC_API_KEY=sk-ant-xxxxx
ALLOWED_ORIGINS=["http://localhost:3000","http://localhost:5173"]
```

#### **Frontend (.env.local)**
```
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=AI Counsellor
```

---

## **End-to-End Testing Scenarios**

### **Test 1: User Signup Flow**

**Objective**: Verify new user registration works

**Steps**:
1. Open http://localhost:5173
2. Click "Get Started" button
3. Fill signup form:
   - Name: John Doe
   - Email: john@example.com
   - Password: TestPass123!
4. Click "Create Account"

**Expected Result**:
- ✅ User created successfully
- ✅ Redirected to onboarding page
- ✅ Token stored in localStorage

**Backend Verification**:
```bash
curl http://localhost:8000/api/users | grep john@example.com
```

---

### **Test 2: Onboarding Flow**

**Objective**: Verify 4-step onboarding completes successfully

**Steps**:
1. Complete Step 1 (Academic Background)
   - GPA: 3.7
   - Work Experience: 2 years
   - Program: MS Computer Science
2. Complete Step 2 (Test Scores)
   - GRE: 320
   - TOEFL: 105
3. Complete Step 3 (Preferences)
   - Select: USA, Canada, Germany
4. Complete Step 4 (Budget)
   - Budget: $60000

**Expected Result**:
- ✅ All steps progress normally
- ✅ Final step shows "Complete Setup"
- ✅ Redirected to dashboard
- ✅ Profile marked complete

---

### **Test 3: University Discovery**

**Objective**: Verify university listing and filtering

**Steps**:
1. On dashboard, click "Universities" tab
2. Scroll through university cards
3. Verify three categories visible: Dream, Target, Safe
4. Click "Shortlist" on Stanford University

**Expected Result**:
- ✅ 25 universities displayed
- ✅ Categories correctly labeled with colors
- ✅ Shortlist button changes to "✓ Shortlisted"
- ✅ University added to shortlist

---

### **Test 4: University Locking**

**Objective**: Verify university locking mechanism

**Steps**:
1. Find MIT in universities list
2. Click "Lock" button
3. Verify button changes state
4. Go to Tasks tab

**Expected Result**:
- ✅ Lock button toggles to "🔓 Locked"
- ✅ Unlock option available
- ✅ Application-specific tasks generated
- ✅ MIT appears with university-specific todos

---

### **Test 5: Task Management**

**Objective**: Verify todo creation and completion

**Steps**:
1. Navigate to Tasks tab
2. Type "Prepare GRE" in input field
3. Click "Add" button
4. Click checkbox to mark complete
5. Refresh page

**Expected Result**:
- ✅ Task added to list
- ✅ Task marked with strikethrough when completed
- ✅ Completion persists after refresh
- ✅ Tasks count updated in dashboard stats

---

### **Test 6: AI Chat**

**Objective**: Verify AI counsellor integration

**Steps**:
1. Navigate to Chat tab
2. Type: "What universities match my profile?"
3. Press Enter
4. Wait for response

**Expected Result**:
- ✅ Message appears on right (user message)
- ✅ AI response appears on left (assistant)
- ✅ Response includes university recommendations
- ✅ Chat history visible and scrollable

**Check backend logs for**:
- `✅ AI response generated successfully`
- `✅ API call to Anthropic successful`

---

### **Test 7: Profile Update**

**Objective**: Verify profile editing and updates

**Steps**:
1. Update GPA from 3.7 to 3.9
2. Change budget to $80000
3. Add new preferred country: Australia
4. Save changes

**Expected Result**:
- ✅ Changes saved successfully
- ✅ Profile strength recalculated
- ✅ University recommendations updated
- ✅ New recommendations appear in list

---

### **Test 8: Logout & Relogin**

**Objective**: Verify session persistence

**Steps**:
1. Click Logout button
2. Verify redirected to login page
3. Login with same credentials
4. Verify profile data loads

**Expected Result**:
- ✅ User logged out successfully
- ✅ Token removed from localStorage
- ✅ Relogin successful with correct credentials
- ✅ Profile data loads immediately
- ✅ Previous universities/tasks visible

---

## **API Testing with cURL**

### **Test Signup**
```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "full_name": "Test User",
    "password": "TestPass123"
  }'
```

**Expected**: Returns user data and access_token

### **Test Login**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

**Expected**: Returns access_token

### **Test Get Universities**
```bash
curl http://localhost:8000/api/universities \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected**: Returns array of 25 universities

### **Test Chat**
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "message": "Recommend universities for me"
  }'
```

**Expected**: Returns AI-generated response

---

## **Performance Testing**

### **Load Testing**
```bash
# Install Apache Bench (if not available)
# Test concurrent requests
ab -n 100 -c 10 http://localhost:8000/api/universities
```

**Expected**: < 200ms response time per request

### **Database Performance**
```bash
# Check slow queries (if using PostgreSQL)
# SELECT * FROM pg_stat_statements ORDER BY mean_time DESC;
```

### **Frontend Performance**
- [ ] Page load time < 3 seconds
- [ ] Initial paint < 1 second
- [ ] First contentful paint < 1.5 seconds
- [ ] Lighthouse score > 90

---

## **Security Testing**

### **SQL Injection Test**
```bash
# Should not break the application
curl 'http://localhost:8000/api/universities?country=USA; DROP TABLE users;'
```

**Expected**: Returns data safely, no SQL injection possible

### **XSS Test**
```bash
# Create task with script tag
curl -X POST http://localhost:8000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "title": "<script>alert(\"XSS\")</script>",
    "category": "test"
  }'
```

**Expected**: Script is escaped/sanitized

### **CORS Test**
```bash
# Test from different origin
curl -X GET http://localhost:8000/api/universities \
  -H "Origin: http://malicious-site.com"
```

**Expected**: CORS error if origin not in whitelist

---

## **Browser Compatibility Testing**

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome (latest)
- [ ] Mobile Safari (latest)

---

## **Responsive Design Testing**

**Screen Sizes to Test**:
- [ ] Mobile (320px)
- [ ] Tablet (768px)
- [ ] Laptop (1024px)
- [ ] Desktop (1440px+)

**Test On**:
- [ ] Landing page responsive
- [ ] Forms responsive
- [ ] University cards layout
- [ ] Chat interface mobile-friendly

---

## **Error Handling Testing**

### **Test Invalid Credentials**
```bash
# Wrong password
curl -X POST http://localhost:8000/api/auth/login \
  -d '{"email":"test@example.com","password":"wrong"}'
```

**Expected**: 401 Unauthorized

### **Test Missing Token**
```bash
# No authorization header
curl http://localhost:8000/api/profile
```

**Expected**: 401 Unauthorized

### **Test Invalid Token**
```bash
curl http://localhost:8000/api/profile \
  -H "Authorization: Bearer invalid_token"
```

**Expected**: 401 Unauthorized

### **Test Server Error**
```bash
# Cause intentional error (modify code temporarily)
```

**Expected**: 500 with error message

---

## **Data Validation Testing**

### **Invalid Email Format**
```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -d '{
    "email": "not-an-email",
    "full_name": "Test",
    "password": "pass"
  }'
```

**Expected**: 422 Validation Error

### **Missing Required Fields**
```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -d '{"email":"test@example.com"}'
```

**Expected**: 422 Validation Error

### **Invalid GPA Range**
```bash
# Through API or frontend
# Try GPA = 5.0
```

**Expected**: Validation error or capped at 4.0

---

## **Regression Testing**

After making changes, verify:
- [ ] Signup still works
- [ ] Login still works
- [ ] Onboarding completes
- [ ] Universities load
- [ ] Chat responds
- [ ] Tasks update
- [ ] Profile persists

---

## **Performance Metrics**

Measure and record:
- **Backend Response Times**
  - GET /universities: < 200ms
  - POST /chat: < 1s
  - GET /profile: < 100ms

- **Frontend Metrics**
  - Time to Interactive: < 3s
  - First Contentful Paint: < 1.5s
  - Largest Contentful Paint: < 2.5s

- **Database Metrics**
  - Query time: < 100ms
  - Connection pool: 5-10 connections
  - Slow queries: < 5% of total

---

## **Known Issues & Workarounds**

| Issue | Workaround |
|-------|-----------|
| Token expires | Relogin to get new token |
| Chat slow | Check Anthropic API quota |
| Database connection | Verify DATABASE_URL |
| CORS errors | Check frontend URL in ALLOWED_ORIGINS |

---

## **Testing Checklist Summary**

```
[ ] Backend starts without errors
[ ] Frontend starts without errors
[ ] All API endpoints respond
[ ] Signup → Login → Onboarding → Dashboard flow works
[ ] Universities load and display
[ ] Shortlist/Lock functionality works
[ ] Task management works
[ ] AI chat responds
[ ] Profile updates reflect in recommendations
[ ] Logout and relogin works
[ ] All forms validate input
[ ] Error messages display correctly
[ ] Responsive design works on mobile
[ ] Performance acceptable (< 3s load time)
[ ] Security checks pass
[ ] Database queries efficient
```

---

## **Troubleshooting**

### **"Cannot connect to backend"**
- Verify backend is running on port 8000
- Check VITE_API_URL in frontend .env
- Check CORS is allowing frontend origin

### **"Invalid token" on page reload**
- Token might be expired (lasts 30 days)
- Logout and relogin
- Check localStorage for access_token

### **"Anthropic API error"**
- Verify ANTHROPIC_API_KEY is correct
- Check API key permissions
- Check account has credits

### **"Database error"**
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Run `python seed_comprehensive.py`

---

**Last Updated**: January 28, 2026
