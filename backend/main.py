"""
AI Counsellor - FastAPI Backend
Complete backend implementation with PostgreSQL and AI integration
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Float, DateTime, JSON, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
import google.generativeai as genai
import os
from jose import jwt
import bcrypt

# ============ Configuration ============
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./counsellor.db")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "AIzaSyBWGlLOFm28JeQI7t6jEOzR_qkC2-zdOoU")

# Configure Google Generative AI
genai.configure(api_key=GOOGLE_API_KEY)

# ============ Database Setup ============
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ============ Database Models ============

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    profile = relationship("UserProfile", back_populates="user", uselist=False)
    shortlisted = relationship("ShortlistedUniversity", back_populates="user")
    locked = relationship("LockedUniversity", back_populates="user")
    todos = relationship("Todo", back_populates="user")
    chat_history = relationship("ChatMessage", back_populates="user")


class UserProfile(Base):
    __tablename__ = "user_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    
    # Academic Background
    education_level = Column(String)
    current_degree = Column(String)
    major = Column(String)
    graduation_year = Column(String)
    gpa = Column(Float)
    
    # Study Goals
    target_degree = Column(String)
    field_of_study = Column(String)
    target_intake_year = Column(String)
    preferred_countries = Column(JSON)  # List of countries
    
    # Budget
    budget_range = Column(String)
    funding_plan = Column(String)
    
    # Exam Readiness
    ielts_status = Column(String)
    ielts_score = Column(Float, nullable=True)
    gre_status = Column(String)
    gre_score = Column(Integer, nullable=True)
    sop_status = Column(String)
    
    # Profile Metadata
    onboarding_complete = Column(Boolean, default=False)
    profile_strength = Column(JSON)  # {academics, exams, documents}
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="profile")


class University(Base):
    __tablename__ = "universities"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    country = Column(String, nullable=False, index=True)
    program = Column(String, nullable=False)
    tuition_per_year = Column(Integer, nullable=False)
    category = Column(String)  # dream, target, safe
    acceptance_rate = Column(Float)
    
    # Requirements
    min_gpa = Column(Float)
    min_gre = Column(Integer, nullable=True)
    min_toefl = Column(Integer, nullable=True)
    min_ielts = Column(Float, nullable=True)
    
    # Details
    why_fits = Column(Text)
    potential_risks = Column(Text)
    program_details = Column(JSON)
    application_deadline = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)


class ShortlistedUniversity(Base):
    __tablename__ = "shortlisted_universities"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    university_id = Column(Integer, ForeignKey("universities.id"))
    shortlisted_at = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text, nullable=True)
    
    user = relationship("User", back_populates="shortlisted")
    university = relationship("University")


class LockedUniversity(Base):
    __tablename__ = "locked_universities"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    university_id = Column(Integer, ForeignKey("universities.id"))
    locked_at = Column(DateTime, default=datetime.utcnow)
    application_status = Column(String, default="not_started")  # not_started, in_progress, submitted, accepted, rejected
    application_deadline = Column(DateTime, nullable=True)
    
    user = relationship("User", back_populates="locked")
    university = relationship("University")


class Todo(Base):
    __tablename__ = "todos"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String)  # exams, documents, research, application
    completed = Column(Boolean, default=False)
    university_id = Column(Integer, ForeignKey("universities.id"), nullable=True)
    due_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    user = relationship("User", back_populates="todos")


class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    role = Column(String)  # user, assistant
    content = Column(Text, nullable=False)
    extra_data = Column(JSON, nullable=True)  # Additional context
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="chat_history")


# Create all tables
Base.metadata.create_all(bind=engine)

# ============ Pydantic Models ============

class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserProfileCreate(BaseModel):
    education_level: str
    current_degree: str
    major: str
    graduation_year: str
    gpa: float
    target_degree: str
    field_of_study: str
    target_intake_year: str
    preferred_countries: List[str]
    budget_range: str
    funding_plan: str
    ielts_status: str
    ielts_score: Optional[float] = None
    gre_status: str
    gre_score: Optional[int] = None
    sop_status: str


class UserProfileUpdate(BaseModel):
    education_level: Optional[str] = None
    current_degree: Optional[str] = None
    major: Optional[str] = None
    graduation_year: Optional[str] = None
    gpa: Optional[float] = None
    target_degree: Optional[str] = None
    field_of_study: Optional[str] = None
    target_intake_year: Optional[str] = None
    preferred_countries: Optional[List[str]] = None
    budget_range: Optional[str] = None
    funding_plan: Optional[str] = None
    ielts_status: Optional[str] = None
    ielts_score: Optional[float] = None
    gre_status: Optional[str] = None
    gre_score: Optional[int] = None
    sop_status: Optional[str] = None


class ChatMessageCreate(BaseModel):
    message: str


class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    university_id: Optional[int] = None
    due_date: Optional[datetime] = None


class TodoUpdate(BaseModel):
    completed: bool


# ============ FastAPI App ============

app = FastAPI(
    title="AI Counsellor API",
    description="Backend API for AI-powered study abroad counselling platform",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# ============ Helper Functions ============

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=30)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.query(User).filter(User.email == email).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


def calculate_profile_strength(profile: UserProfile) -> Dict[str, str]:
    """Calculate profile strength metrics"""
    academics = "strong" if profile.gpa >= 3.5 else "average" if profile.gpa >= 3.0 else "weak"
    
    exams_score = 0
    if profile.ielts_status == "completed":
        exams_score += 1
    if profile.gre_status == "completed":
        exams_score += 1
    exams = "strong" if exams_score == 2 else "average" if exams_score == 1 else "weak"
    
    documents = "strong" if profile.sop_status == "ready" else "average" if profile.sop_status == "draft" else "weak"
    
    return {
        "academics": academics,
        "exams": exams,
        "documents": documents
    }


async def get_ai_response(user_message: str, user_profile: UserProfile, chat_history: List[Dict], db: Session) -> str:
    """Get AI response using Google Generative AI (Gemini)"""
    
    # Build context
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
    
    system_prompt = f"""You are an expert study-abroad counsellor helping students make informed decisions about their higher education journey.

{profile_context}

Your responsibilities:
1. Analyze the student's profile strengths and gaps
2. Recommend universities (Dream/Target/Safe) based on their profile
3. Explain why universities fit or are risky
4. Help with shortlisting and locking universities
5. Create and manage to-do tasks
6. Provide actionable guidance

Be concise, specific, and action-oriented. Focus on helping the student make confident decisions.

Use emojis and formatting to make responses engaging and easy to read."""

    # Build conversation history for Gemini
    history_text = ""
    for msg in chat_history[-10:]:
        role = "User" if msg["role"] == "user" else "Assistant"
        history_text += f"{role}: {msg['content']}\n\n"
    
    full_prompt = f"{system_prompt}\n\nConversation History:\n{history_text}\nUser: {user_message}\n\nAssistant:"
    
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(
            full_prompt,
            generation_config=genai.types.GenerationConfig(
                max_output_tokens=1000,
                temperature=0.7,
            )
        )
        return response.text
    except Exception as e:
        print(f"AI Error: {e}")
        return "I'm sorry, I'm having trouble responding right now. Please try again."


# ============ API Endpoints ============

@app.get("/")
async def root():
    return {"message": "AI Counsellor API is running"}


@app.post("/api/auth/signup")
async def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    hashed_pw = hash_password(user_data.password)
    new_user = User(
        email=user_data.email,
        full_name=user_data.full_name,
        hashed_password=hashed_pw
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Create access token
    token = create_access_token({"sub": new_user.email})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "full_name": new_user.full_name
        }
    }


@app.post("/api/auth/login")
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": user.email})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name
        }
    }


@app.get("/api/profile")
async def get_profile(current_user: User = Depends(verify_token), db: Session = Depends(get_db)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        return {"onboarding_complete": False}
    
    return {
        "id": profile.id,
        "education_level": profile.education_level,
        "current_degree": profile.current_degree,
        "major": profile.major,
        "graduation_year": profile.graduation_year,
        "gpa": profile.gpa,
        "target_degree": profile.target_degree,
        "field_of_study": profile.field_of_study,
        "target_intake_year": profile.target_intake_year,
        "preferred_countries": profile.preferred_countries,
        "budget_range": profile.budget_range,
        "funding_plan": profile.funding_plan,
        "ielts_status": profile.ielts_status,
        "ielts_score": profile.ielts_score,
        "gre_status": profile.gre_status,
        "gre_score": profile.gre_score,
        "sop_status": profile.sop_status,
        "onboarding_complete": profile.onboarding_complete,
        "profile_strength": profile.profile_strength
    }


@app.post("/api/profile")
async def create_profile(
    profile_data: UserProfileCreate,
    current_user: User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    # Check if profile exists
    existing_profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if existing_profile:
        raise HTTPException(status_code=400, detail="Profile already exists")
    
    # Create profile
    strength = calculate_profile_strength(profile_data)
    new_profile = UserProfile(
        user_id=current_user.id,
        education_level=profile_data.education_level,
        current_degree=profile_data.current_degree,
        major=profile_data.major,
        graduation_year=profile_data.graduation_year,
        gpa=profile_data.gpa,
        target_degree=profile_data.target_degree,
        field_of_study=profile_data.field_of_study,
        target_intake_year=profile_data.target_intake_year,
        preferred_countries=profile_data.preferred_countries,
        budget_range=profile_data.budget_range,
        funding_plan=profile_data.funding_plan,
        ielts_status=profile_data.ielts_status,
        ielts_score=profile_data.ielts_score,
        gre_status=profile_data.gre_status,
        gre_score=profile_data.gre_score,
        sop_status=profile_data.sop_status,
        onboarding_complete=True,
        profile_strength=strength
    )
    db.add(new_profile)
    
    # Create initial todos
    initial_todos = [
        Todo(user_id=current_user.id, title="Complete IELTS/TOEFL exam", category="exams", 
             completed=profile_data.ielts_status == "completed"),
        Todo(user_id=current_user.id, title="Complete GRE/GMAT exam", category="exams",
             completed=profile_data.gre_status == "completed"),
        Todo(user_id=current_user.id, title="Draft Statement of Purpose", category="documents",
             completed=profile_data.sop_status == "ready"),
        Todo(user_id=current_user.id, title="Gather recommendation letters", category="documents"),
        Todo(user_id=current_user.id, title="Research universities", category="research")
    ]
    for todo in initial_todos:
        db.add(todo)
    
    db.commit()
    db.refresh(new_profile)
    
    return {"message": "Profile created successfully", "profile_id": new_profile.id}


@app.put("/api/profile")
async def update_profile(
    profile_data: UserProfileUpdate,
    current_user: User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    # Update fields
    for key, value in profile_data.dict(exclude_unset=True).items():
        setattr(profile, key, value)
    
    # Recalculate strength
    profile.profile_strength = calculate_profile_strength(profile)
    profile.updated_at = datetime.utcnow()
    
    db.commit()
    
    return {"message": "Profile updated successfully"}


@app.get("/api/universities")
async def get_universities(
    country: Optional[str] = None,
    category: Optional[str] = None,
    max_tuition: Optional[int] = None,
    current_user: User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    query = db.query(University)
    
    if country:
        query = query.filter(University.country == country)
    if category:
        query = query.filter(University.category == category)
    if max_tuition:
        query = query.filter(University.tuition_per_year <= max_tuition)
    
    universities = query.all()
    
    return {
        "universities": [
            {
                "id": uni.id,
                "name": uni.name,
                "country": uni.country,
                "program": uni.program,
                "tuition_per_year": uni.tuition_per_year,
                "category": uni.category,
                "acceptance_rate": uni.acceptance_rate,
                "why_fits": uni.why_fits,
                "potential_risks": uni.potential_risks
            }
            for uni in universities
        ]
    }


@app.post("/api/universities/{university_id}/shortlist")
async def shortlist_university(
    university_id: int,
    current_user: User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    # Check if already shortlisted
    existing = db.query(ShortlistedUniversity).filter(
        ShortlistedUniversity.user_id == current_user.id,
        ShortlistedUniversity.university_id == university_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="University already shortlisted")
    
    shortlist = ShortlistedUniversity(user_id=current_user.id, university_id=university_id)
    db.add(shortlist)
    db.commit()
    
    return {"message": "University shortlisted successfully"}


@app.post("/api/universities/{university_id}/lock")
async def lock_university(
    university_id: int,
    current_user: User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    # Check if already locked
    existing = db.query(LockedUniversity).filter(
        LockedUniversity.user_id == current_user.id,
        LockedUniversity.university_id == university_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="University already locked")
    
    university = db.query(University).filter(University.id == university_id).first()
    if not university:
        raise HTTPException(status_code=404, detail="University not found")
    
    # Lock university
    locked = LockedUniversity(user_id=current_user.id, university_id=university_id)
    db.add(locked)
    
    # Create application todos
    application_todos = [
        Todo(user_id=current_user.id, university_id=university_id,
             title=f"Complete application form for {university.name}", category="application"),
        Todo(user_id=current_user.id, university_id=university_id,
             title=f"Prepare SOP for {university.name}", category="documents"),
        Todo(user_id=current_user.id, university_id=university_id,
             title=f"Get recommendation letters for {university.name}", category="documents"),
        Todo(user_id=current_user.id, university_id=university_id,
             title=f"Prepare financial documents for {university.name}", category="documents")
    ]
    for todo in application_todos:
        db.add(todo)
    
    db.commit()
    
    return {"message": "University locked successfully"}


@app.delete("/api/universities/{university_id}/unlock")
async def unlock_university(
    university_id: int,
    current_user: User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    locked = db.query(LockedUniversity).filter(
        LockedUniversity.user_id == current_user.id,
        LockedUniversity.university_id == university_id
    ).first()
    
    if not locked:
        raise HTTPException(status_code=404, detail="University not locked")
    
    # Delete locked entry
    db.delete(locked)
    
    # Delete related todos
    db.query(Todo).filter(
        Todo.user_id == current_user.id,
        Todo.university_id == university_id
    ).delete()
    
    db.commit()
    
    return {"message": "University unlocked successfully"}


@app.get("/api/todos")
async def get_todos(current_user: User = Depends(verify_token), db: Session = Depends(get_db)):
    todos = db.query(Todo).filter(Todo.user_id == current_user.id).order_by(Todo.created_at.desc()).all()
    
    return {
        "todos": [
            {
                "id": todo.id,
                "title": todo.title,
                "description": todo.description,
                "category": todo.category,
                "completed": todo.completed,
                "university_id": todo.university_id,
                "due_date": todo.due_date,
                "created_at": todo.created_at
            }
            for todo in todos
        ]
    }


@app.post("/api/todos")
async def create_todo(
    todo_data: TodoCreate,
    current_user: User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    todo = Todo(
        user_id=current_user.id,
        title=todo_data.title,
        description=todo_data.description,
        category=todo_data.category,
        university_id=todo_data.university_id,
        due_date=todo_data.due_date
    )
    db.add(todo)
    db.commit()
    db.refresh(todo)
    
    return {"message": "Todo created", "id": todo.id}


@app.patch("/api/todos/{todo_id}")
async def update_todo(
    todo_id: int,
    update_data: TodoUpdate,
    current_user: User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    todo = db.query(Todo).filter(Todo.id == todo_id, Todo.user_id == current_user.id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    todo.completed = update_data.completed
    if update_data.completed:
        todo.completed_at = datetime.utcnow()
    else:
        todo.completed_at = None
    
    db.commit()
    
    return {"message": "Todo updated"}


@app.post("/api/chat")
async def chat(
    message_data: ChatMessageCreate,
    current_user: User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    # Get user profile
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=400, detail="Complete onboarding first")
    
    # Get chat history
    history = db.query(ChatMessage).filter(ChatMessage.user_id == current_user.id).order_by(ChatMessage.created_at).all()
    chat_history = [{"role": msg.role, "content": msg.content} for msg in history[-20:]]
    
    # Save user message
    user_msg = ChatMessage(user_id=current_user.id, role="user", content=message_data.message)
    db.add(user_msg)
    db.commit()
    
    # Get AI response
    ai_response = await get_ai_response(message_data.message, profile, chat_history, db)
    
    # Save AI message
    ai_msg = ChatMessage(user_id=current_user.id, role="assistant", content=ai_response)
    db.add(ai_msg)
    db.commit()
    
    return {
        "response": ai_response
    }


@app.get("/api/dashboard")
async def get_dashboard(current_user: User = Depends(verify_token), db: Session = Depends(get_db)):
    profile = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).first()
    shortlisted = db.query(ShortlistedUniversity).filter(ShortlistedUniversity.user_id == current_user.id).count()
    locked = db.query(LockedUniversity).filter(LockedUniversity.user_id == current_user.id).count()
    todos = db.query(Todo).filter(Todo.user_id == current_user.id).all()
    completed_todos = len([t for t in todos if t.completed])
    
    # Determine current stage
    if not profile or not profile.onboarding_complete:
        stage = "Building Profile"
    elif locked == 0:
        stage = "Discovering Universities"
    elif locked > 0 and len([t for t in todos if not t.completed]) > 5:
        stage = "Preparing Applications"
    else:
        stage = "Finalizing Universities"
    
    return {
        "stage": stage,
        "profile_strength": profile.profile_strength if profile else None,
        "shortlisted_count": shortlisted,
        "locked_count": locked,
        "todos_completed": completed_todos,
        "todos_total": len(todos)
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
