"""
Database seed script - populates initial university data
Run this after creating the database
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import University, Base
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/ai_counsellor")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def seed_universities():
    db = SessionLocal()
    
    # Check if data already exists
    existing = db.query(University).count()
    if existing > 0:
        print(f"Database already has {existing} universities. Skipping seed.")
        return
    
    universities = [
        # USA - Dream
        University(
            name="Stanford University",
            country="USA",
            program="MS Computer Science",
            tuition_per_year=55000,
            category="dream",
            acceptance_rate=4.0,
            min_gpa=3.8,
            min_gre=325,
            min_toefl=110,
            min_ielts=7.5,
            why_fits="Top-tier research opportunities, Silicon Valley connections, world-class faculty in AI/ML, excellent placement record, strong alumni network",
            potential_risks="Extremely competitive admission (4% acceptance), very high cost of living in Bay Area ($2500+/month), intense academic pressure, visa challenges"
        ),
        University(
            name="MIT",
            country="USA",
            program="MS Computer Science",
            tuition_per_year=58000,
            category="dream",
            acceptance_rate=3.5,
            min_gpa=3.9,
            min_gre=330,
            min_toefl=110,
            min_ielts=7.5,
            why_fits="World's best engineering program, cutting-edge research, strong startup ecosystem, excellent faculty-student ratio",
            potential_risks="Highest competition globally, very high costs, Boston weather, extremely rigorous coursework"
        ),
        
        # USA - Target
        University(
            name="University of Southern California",
            country="USA",
            program="MS Computer Science",
            tuition_per_year=48000,
            category="target",
            acceptance_rate=18.0,
            min_gpa=3.4,
            min_gre=315,
            min_toefl=100,
            min_ielts=7.0,
            why_fits="Strong CS program, Los Angeles tech scene, good industry connections, diverse student body, practical curriculum",
            potential_risks="High living costs in LA, large class sizes, competitive job market, expensive overall"
        ),
        University(
            name="University of Texas at Austin",
            country="USA",
            program="MS Computer Science",
            tuition_per_year=38000,
            category="target",
            acceptance_rate=20.0,
            min_gpa=3.5,
            min_gre=318,
            min_toefl=95,
            min_ielts=7.0,
            why_fits="Excellent CS program, Austin tech hub, reasonable costs, strong research, good weather",
            potential_risks="Large university feel, Texas heat in summer, growing competition"
        ),
        
        # USA - Safe
        University(
            name="Arizona State University",
            country="USA",
            program="MS Computer Science",
            tuition_per_year=32000,
            category="safe",
            acceptance_rate=35.0,
            min_gpa=3.0,
            min_gre=300,
            min_toefl=90,
            min_ielts=6.5,
            why_fits="Good acceptance rate, reasonable requirements, growing tech scene in Phoenix, affordable tuition, innovative programs",
            potential_risks="Less prestigious brand, very hot climate, limited research compared to top schools"
        ),
        University(
            name="University of Florida",
            country="USA",
            program="MS Computer Science",
            tuition_per_year=28000,
            category="safe",
            acceptance_rate=32.0,
            min_gpa=3.2,
            min_gre=305,
            min_toefl=90,
            min_ielts=6.5,
            why_fits="Strong state university, good value, warm weather, decent CS program",
            potential_risks="Not in major tech hub, hurricane season, moderate brand recognition"
        ),
        
        # Canada - Target
        University(
            name="University of Toronto",
            country="Canada",
            program="MS Computer Science",
            tuition_per_year=28000,
            category="target",
            acceptance_rate=15.0,
            min_gpa=3.5,
            min_gre=315,
            min_toefl=100,
            min_ielts=7.0,
            why_fits="Top Canadian university, strong CS program, Toronto tech scene, PR pathway, reasonable costs, multicultural city",
            potential_risks="Cold winters (-20°C), competitive program, high living costs in Toronto"
        ),
        University(
            name="University of British Columbia",
            country="Canada",
            program="MS Computer Science",
            tuition_per_year=26000,
            category="target",
            acceptance_rate=18.0,
            min_gpa=3.4,
            min_gre=312,
            min_toefl=95,
            min_ielts=6.5,
            why_fits="Beautiful Vancouver location, good CS program, moderate climate, diverse community, work opportunities",
            potential_risks="Very high cost of living in Vancouver, rainy weather, competitive housing"
        ),
        
        # Canada - Safe
        University(
            name="University of Waterloo",
            country="Canada",
            program="MS Computer Science",
            tuition_per_year=24000,
            category="target",
            acceptance_rate=22.0,
            min_gpa=3.3,
            min_gre=310,
            min_toefl=95,
            min_ielts=6.5,
            why_fits="Strong co-op program, excellent tech connections, good CS reputation, affordable",
            potential_risks="Smaller city, cold winters, less international diversity"
        ),
        
        # UK - Target
        University(
            name="Imperial College London",
            country="UK",
            program="MS Computer Science",
            tuition_per_year=42000,
            category="dream",
            acceptance_rate=12.0,
            min_gpa=3.7,
            min_gre=320,
            min_toefl=105,
            min_ielts=7.0,
            why_fits="Top UK university, London location, strong industry ties, 1-year program, prestigious degree",
            potential_risks="Very expensive living in London, short program duration, competitive admission, difficult work visa"
        ),
        University(
            name="University of Edinburgh",
            country="UK",
            program="MS Computer Science",
            tuition_per_year=35000,
            category="target",
            acceptance_rate=20.0,
            min_gpa=3.4,
            min_gre=310,
            min_toefl=100,
            min_ielts=7.0,
            why_fits="Historic university, beautiful city, strong AI program, reasonable costs, 1-year degree",
            potential_risks="Scottish weather, limited tech job market compared to London, visa restrictions"
        ),
        
        # Germany - Target/Safe
        University(
            name="Technical University of Munich",
            country="Germany",
            program="MS Computer Science",
            tuition_per_year=5000,
            category="target",
            acceptance_rate=20.0,
            min_gpa=3.4,
            min_gre=310,
            min_toefl=95,
            min_ielts=6.5,
            why_fits="Minimal tuition fees, strong engineering, Munich tech scene, EU opportunities, quality education",
            potential_risks="Need to learn German for jobs, bureaucratic processes, cultural adjustment, teaching style"
        ),
        University(
            name="RWTH Aachen University",
            country="Germany",
            program="MS Computer Science",
            tuition_per_year=3000,
            category="safe",
            acceptance_rate=30.0,
            min_gpa=3.2,
            min_gre=305,
            min_toefl=90,
            min_ielts=6.5,
            why_fits="Very low costs, good engineering reputation, structured program, affordable living",
            potential_risks="Language barrier, smaller city, need German for daily life, job market challenges"
        ),
        
        # Australia - Target
        University(
            name="University of Melbourne",
            country="Australia",
            program="MS Computer Science",
            tuition_per_year=35000,
            category="target",
            acceptance_rate=25.0,
            min_gpa=3.3,
            min_gre=310,
            min_toefl=95,
            min_ielts=6.5,
            why_fits="Top Australian university, Melbourne lifestyle, good tech scene, work opportunities, multicultural",
            potential_risks="Far from home, expensive living, time zone differences, limited tech giants"
        ),
        University(
            name="Australian National University",
            country="Australia",
            program="MS Computer Science",
            tuition_per_year=32000,
            category="target",
            acceptance_rate=28.0,
            min_gpa=3.2,
            min_gre=308,
            min_toefl=90,
            min_ielts=6.5,
            why_fits="Research-focused, Canberra location, good scholarships, strong academics",
            potential_risks="Smaller city, less vibrant tech scene, distance from major hubs"
        ),
        
        # Netherlands - Target
        University(
            name="Delft University of Technology",
            country="Netherlands",
            program="MS Computer Science",
            tuition_per_year=18000,
            category="target",
            acceptance_rate=24.0,
            min_gpa=3.3,
            min_gre=310,
            min_toefl=95,
            min_ielts=6.5,
            why_fits="Excellent engineering, affordable EU education, English-taught, bike-friendly culture, work opportunities",
            potential_risks="Dutch weather, housing shortage, need to learn Dutch for some jobs"
        ),
        
        # Singapore - Dream/Target
        University(
            name="National University of Singapore",
            country="Singapore",
            program="MS Computer Science",
            tuition_per_year=25000,
            category="target",
            acceptance_rate=16.0,
            min_gpa=3.6,
            min_gre=318,
            min_toefl=100,
            min_ielts=7.0,
            why_fits="Top Asian university, Singapore tech hub, safe city, multicultural, close to India, work opportunities",
            potential_risks="Humid weather, high cost of living, competitive, small country"
        ),
        
        # Additional Safe Options
        University(
            name="University of Texas at Dallas",
            country="USA",
            program="MS Computer Science",
            tuition_per_year=29000,
            category="safe",
            acceptance_rate=38.0,
            min_gpa=3.0,
            min_gre=295,
            min_toefl=85,
            min_ielts=6.5,
            why_fits="Good location near Dallas tech companies, affordable, growing program, practical focus",
            potential_risks="Less brand recognition, Texas heat, newer program"
        ),
        University(
            name="San Jose State University",
            country="USA",
            program="MS Computer Science",
            tuition_per_year=25000,
            category="safe",
            acceptance_rate=42.0,
            min_gpa=2.9,
            min_gre=290,
            min_toefl=80,
            min_ielts=6.0,
            why_fits="Heart of Silicon Valley, excellent job placement, industry connections, affordable for location",
            potential_risks="Not prestigious, very high living costs, large classes, commuter school feel"
        )
    ]
    
    for uni in universities:
        db.add(uni)
    
    db.commit()
    print(f"Successfully seeded {len(universities)} universities!")
    db.close()


if __name__ == "__main__":
    print("Seeding database...")
    seed_universities()
    print("Done!")
