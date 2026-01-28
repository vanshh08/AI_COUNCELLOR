"""
Comprehensive database seed script with realistic university data
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import University, Base
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./counsellor.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

UNIVERSITIES = [
    # DREAM UNIVERSITIES (USA - TOP 5)
    {
        "name": "Stanford University",
        "country": "USA",
        "program": "MS Computer Science",
        "tuition_per_year": 57000,
        "category": "dream",
        "acceptance_rate": 4,
        "min_gpa": 3.8,
        "min_gre": 325,
        "min_toefl": 110,
        "why_fits": "Elite CS program, top-tier research, Silicon Valley connections, world-class faculty",
        "potential_risks": "Extremely competitive, high cost of living, very low acceptance rate"
    },
    {
        "name": "MIT",
        "country": "USA",
        "program": "MS Computer Science",
        "tuition_per_year": 59000,
        "category": "dream",
        "acceptance_rate": 3.2,
        "min_gpa": 3.9,
        "min_gre": 330,
        "min_toefl": 115,
        "why_fits": "Legendary engineering school, cutting-edge research, strong tech industry connections",
        "potential_risks": "Most selective school globally, extremely expensive, competitive environment"
    },
    {
        "name": "Carnegie Mellon University",
        "country": "USA",
        "program": "MS Computer Science",
        "tuition_per_year": 61000,
        "category": "dream",
        "acceptance_rate": 5,
        "min_gpa": 3.8,
        "min_gre": 322,
        "min_toefl": 105,
        "why_fits": "Top-ranked CS program, strong AI/ML focus, excellent faculty, Pittsburgh tech hub",
        "potential_risks": "Very selective, high tuition, competitive student body"
    },
    {
        "name": "Princeton University",
        "country": "USA",
        "program": "MS Computer Science",
        "tuition_per_year": 56000,
        "category": "dream",
        "acceptance_rate": 4,
        "min_gpa": 3.85,
        "min_gre": 328,
        "min_toefl": 110,
        "why_fits": "Ivy League prestige, excellent research opportunities, strong alumni network",
        "potential_risks": "Highly selective, very expensive, limited scholarships for internationals"
    },
    {
        "name": "Harvard University",
        "country": "USA",
        "program": "MS Computer Science",
        "tuition_per_year": 53000,
        "category": "dream",
        "acceptance_rate": 3.5,
        "min_gpa": 3.9,
        "min_gre": 332,
        "min_toefl": 115,
        "why_fits": "World's best university, legendary prestige, exceptional faculty, unmatched alumni network",
        "potential_risks": "Most competitive, extremely expensive, very selective"
    },

    # TARGET UNIVERSITIES (USA)
    {
        "name": "UC Berkeley",
        "country": "USA",
        "program": "MS Computer Science",
        "tuition_per_year": 45000,
        "category": "target",
        "acceptance_rate": 12,
        "min_gpa": 3.6,
        "min_gre": 315,
        "min_toefl": 100,
        "why_fits": "Excellent public university, strong CS program, Silicon Valley proximity, good funding",
        "potential_risks": "High competition, California cost of living, large student body"
    },
    {
        "name": "University of Washington",
        "country": "USA",
        "program": "MS Computer Science",
        "tuition_per_year": 38000,
        "category": "target",
        "acceptance_rate": 15,
        "min_gpa": 3.5,
        "min_gre": 310,
        "min_toefl": 95,
        "why_fits": "Top-ranked public university, strong tech ecosystem (Seattle), reasonable tuition",
        "potential_risks": "Rainy weather, competitive program, limited work visa options"
    },
    {
        "name": "University of Texas at Austin",
        "country": "USA",
        "program": "MS Computer Science",
        "tuition_per_year": 35000,
        "category": "target",
        "acceptance_rate": 18,
        "min_gpa": 3.4,
        "min_gre": 305,
        "min_toefl": 90,
        "why_fits": "Large tech community, growing startup scene, affordable compared to coasts",
        "potential_risks": "Very large program, hot weather, less research funding"
    },
    {
        "name": "University of Michigan",
        "country": "USA",
        "program": "MS Computer Science",
        "tuition_per_year": 42000,
        "category": "target",
        "acceptance_rate": 16,
        "min_gpa": 3.6,
        "min_gre": 312,
        "min_toefl": 98,
        "why_fits": "Strong public research university, good CS program, reasonable cost",
        "potential_risks": "Cold winters, midwest location, moderate prestige"
    },
    {
        "name": "University of Toronto",
        "country": "Canada",
        "program": "MS Computer Science",
        "tuition_per_year": 28000,
        "category": "target",
        "acceptance_rate": 15,
        "min_gpa": 3.5,
        "min_gre": 315,
        "min_toefl": 100,
        "why_fits": "Canada's top university, strong CS program, PR pathway, reasonable tuition",
        "potential_risks": "Cold weather, visa processing time, competitive program"
    },

    # TARGET UNIVERSITIES (Europe)
    {
        "name": "Technical University of Munich",
        "country": "Germany",
        "program": "MS Computer Science",
        "tuition_per_year": 4000,
        "category": "target",
        "acceptance_rate": 20,
        "min_gpa": 3.4,
        "min_gre": 310,
        "min_toefl": 95,
        "why_fits": "Extremely low tuition, world-class engineering, EU job market access",
        "potential_risks": "Language barrier, bureaucratic processes, cultural adjustment"
    },
    {
        "name": "ETH Zurich",
        "country": "Switzerland",
        "program": "MS Computer Science",
        "tuition_per_year": 730,
        "category": "target",
        "acceptance_rate": 22,
        "min_gpa": 3.5,
        "min_gre": 315,
        "min_toefl": 100,
        "why_fits": "Incredibly low tuition, top-tier engineering, strong tech industry",
        "potential_risks": "Expensive cost of living, highly competitive, language requirements"
    },
    {
        "name": "Imperial College London",
        "country": "United Kingdom",
        "program": "MSc Computing",
        "tuition_per_year": 35000,
        "category": "target",
        "acceptance_rate": 18,
        "min_gpa": 3.6,
        "min_gre": 320,
        "min_toefl": 105,
        "why_fits": "Excellent CS program, London tech hub, strong industry connections",
        "potential_risks": "High tuition, work visa limited, very competitive"
    },
    {
        "name": "University of Amsterdam",
        "country": "Netherlands",
        "program": "MSc Computer Science",
        "tuition_per_year": 18000,
        "category": "target",
        "acceptance_rate": 25,
        "min_gpa": 3.3,
        "min_gre": 305,
        "min_toefl": 90,
        "why_fits": "Strong program, affordable tuition, English-taught, tech-friendly city",
        "potential_risks": "Dutch language useful, moderate prestige"
    },

    # TARGET UNIVERSITIES (Asia Pacific)
    {
        "name": "University of Melbourne",
        "country": "Australia",
        "program": "MS Computer Science",
        "tuition_per_year": 35000,
        "category": "target",
        "acceptance_rate": 25,
        "min_gpa": 3.3,
        "min_gre": 310,
        "min_toefl": 95,
        "why_fits": "Quality education, work opportunities, good lifestyle, PR pathway",
        "potential_risks": "Distance from home, moderate cost, visa processing"
    },
    {
        "name": "University of Sydney",
        "country": "Australia",
        "program": "MSc Computer Science",
        "tuition_per_year": 32000,
        "category": "target",
        "acceptance_rate": 28,
        "min_gpa": 3.2,
        "min_gre": 308,
        "min_toefl": 92,
        "why_fits": "Good program, better acceptance rate, Sydney lifestyle, work opportunities",
        "potential_risks": "Distance, visa processing, fewer scholarships"
    },
    {
        "name": "National University of Singapore",
        "country": "Singapore",
        "program": "MSc Computer Science",
        "tuition_per_year": 40000,
        "category": "target",
        "acceptance_rate": 20,
        "min_gpa": 3.4,
        "min_gre": 312,
        "min_toefl": 95,
        "why_fits": "Asia's top university, strong tech ecosystem, good job market, English-taught",
        "potential_risks": "Expensive cost of living, competitive, limited PR pathway"
    },

    # SAFE UNIVERSITIES (USA)
    {
        "name": "Arizona State University",
        "country": "USA",
        "program": "MS Computer Science",
        "tuition_per_year": 32000,
        "category": "safe",
        "acceptance_rate": 35,
        "min_gpa": 3.0,
        "min_gre": 300,
        "min_toefl": 90,
        "why_fits": "Good acceptance rate, reasonable requirements, growing tech scene, affordable",
        "potential_risks": "Less prestigious, hot climate, moderate research funding"
    },
    {
        "name": "Oregon State University",
        "country": "USA",
        "program": "MS Computer Science",
        "tuition_per_year": 28000,
        "category": "safe",
        "acceptance_rate": 40,
        "min_gpa": 2.9,
        "min_gre": 295,
        "min_toefl": 85,
        "why_fits": "Good acceptance rate, reasonable cost, nice campus, friendly community",
        "potential_risks": "Lower prestige, rural location, limited tech industry"
    },
    {
        "name": "University of Cincinnati",
        "country": "USA",
        "program": "MS Computer Science",
        "tuition_per_year": 30000,
        "category": "safe",
        "acceptance_rate": 38,
        "min_gpa": 3.0,
        "min_gre": 298,
        "min_toefl": 88,
        "why_fits": "Good acceptance rate, affordable, co-op opportunities, established program",
        "potential_risks": "Midwest location, moderate prestige, limited startup ecosystem"
    },
    {
        "name": "George Mason University",
        "country": "USA",
        "program": "MS Computer Science",
        "tuition_per_year": 35000,
        "category": "safe",
        "acceptance_rate": 42,
        "min_gpa": 2.8,
        "min_gre": 290,
        "min_toefl": 85,
        "why_fits": "Accessible program, Northern Virginia tech hub, flexible admission",
        "potential_risks": "Lower-ranked school, limited scholarship, competitive job market"
    },

    # SAFE UNIVERSITIES (Canada)
    {
        "name": "University of British Columbia",
        "country": "Canada",
        "program": "MSc Computer Science",
        "tuition_per_year": 25000,
        "category": "safe",
        "acceptance_rate": 35,
        "min_gpa": 3.1,
        "min_gre": 305,
        "min_toefl": 92,
        "why_fits": "Good program, affordable tuition, PR pathway, beautiful location",
        "potential_risks": "Weather, visa processing, moderate research funding"
    },
    {
        "name": "McMaster University",
        "country": "Canada",
        "program": "MSc Computer Science",
        "tuition_per_year": 22000,
        "category": "safe",
        "acceptance_rate": 40,
        "min_gpa": 3.0,
        "min_gre": 300,
        "min_toefl": 90,
        "why_fits": "Very affordable, accessible program, PR eligible, good reputation",
        "potential_risks": "Less prestigious, smaller tech hub, fewer scholarships"
    },

    # SAFE UNIVERSITIES (Europe)
    {
        "name": "University of Groningen",
        "country": "Netherlands",
        "program": "MSc Computer Science",
        "tuition_per_year": 16000,
        "category": "safe",
        "acceptance_rate": 45,
        "min_gpa": 2.9,
        "min_gre": 295,
        "min_toefl": 88,
        "why_fits": "Very affordable, good program, English-taught, student-friendly city",
        "potential_risks": "Smaller city, limited tech industry, moderate prestige"
    },
    {
        "name": "University of Debrecen",
        "country": "Hungary",
        "program": "MSc Computer Science",
        "tuition_per_year": 3500,
        "category": "safe",
        "acceptance_rate": 50,
        "min_gpa": 2.7,
        "min_gre": 290,
        "min_toefl": 85,
        "why_fits": "Extremely affordable, accessible, good program, EU education",
        "potential_risks": "Less known internationally, limited tech ecosystem, visa needed"
    },
]


def seed_database():
    """Seed database with university data"""
    db = SessionLocal()
    
    try:
        # Check if universities already exist
        count = db.query(University).count()
        if count > 0:
            print(f"✅ Database already has {count} universities. Skipping seed.")
            return
        
        # Add universities
        for uni_data in UNIVERSITIES:
            university = University(**uni_data)
            db.add(university)
        
        db.commit()
        print(f"✅ Successfully seeded {len(UNIVERSITIES)} universities into the database!")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
