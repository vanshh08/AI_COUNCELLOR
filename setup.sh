#!/bin/bash

# AI Counsellor - Quick Start Script
# This script sets up the entire project for local development

set -e

echo "🎓 AI Counsellor - Quick Start Setup"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if required commands exist
command -v python3 >/dev/null 2>&1 || { echo -e "${RED}❌ Python 3 is required but not installed.${NC}" >&2; exit 1; }
command -v node >/dev/null 2>&1 || { echo -e "${RED}❌ Node.js is required but not installed.${NC}" >&2; exit 1; }
command -v psql >/dev/null 2>&1 || { echo -e "${YELLOW}⚠️  PostgreSQL not found. You can use Docker instead.${NC}"; }

echo -e "${GREEN}✓ Prerequisites check passed${NC}"
echo ""

# Ask for Anthropic API Key
echo "📝 Please enter your Anthropic API Key:"
echo "(Get one at: https://console.anthropic.com)"
read -p "API Key: " ANTHROPIC_KEY

if [ -z "$ANTHROPIC_KEY" ]; then
    echo -e "${RED}❌ API Key is required${NC}"
    exit 1
fi

# Setup Backend
echo ""
echo "🔧 Setting up Backend..."
echo "========================"

cd backend

# Create virtual environment
echo "Creating Python virtual environment..."
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

# Create .env file
echo "Creating backend .env file..."
cat > .env << EOF
DATABASE_URL=postgresql://ai_user:ai_password@localhost:5432/ai_counsellor
SECRET_KEY=$(openssl rand -hex 32)
ANTHROPIC_API_KEY=$ANTHROPIC_KEY
EOF

echo -e "${GREEN}✓ Backend setup complete${NC}"

# Setup Database
echo ""
echo "🗄️  Setting up Database..."
echo "========================="

# Check if PostgreSQL is running
if command -v psql >/dev/null 2>&1; then
    # Create database
    echo "Creating database..."
    createdb ai_counsellor 2>/dev/null || echo "Database may already exist"
    
    # Run migrations and seed
    echo "Running database migrations and seed..."
    python seed_db.py
    
    echo -e "${GREEN}✓ Database setup complete${NC}"
else
    echo -e "${YELLOW}⚠️  PostgreSQL not detected. Using Docker...${NC}"
    cd ..
    docker-compose up -d db
    sleep 5
    cd backend
    python seed_db.py
fi

cd ..

# Setup Frontend
echo ""
echo "🎨 Setting up Frontend..."
echo "========================"

cd frontend

# Install dependencies
echo "Installing Node dependencies..."
npm install --silent

# Create .env.local
echo "Creating frontend .env.local file..."
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000/api
EOF

echo -e "${GREEN}✓ Frontend setup complete${NC}"

cd ..

# Create run script
echo ""
echo "📝 Creating run script..."

cat > run.sh << 'EOF'
#!/bin/bash

# Start backend in background
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

# Start frontend in background
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ AI Counsellor is running!"
echo "============================"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
EOF

chmod +x run.sh

# Final instructions
echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "===================="
echo ""
echo "To start the application:"
echo ""
echo -e "  ${YELLOW}./run.sh${NC}"
echo ""
echo "Or start services individually:"
echo ""
echo "Backend:"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  uvicorn main:app --reload"
echo ""
echo "Frontend:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
echo ""
echo -e "${GREEN}Happy hacking! 🚀${NC}"
