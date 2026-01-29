'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Camera, User, LogOut, Lock, Unlock, CheckCircle, Circle, MessageSquare, Send, Loader, BookOpen, Target, TrendingUp, DollarSign, Calendar, Award, AlertCircle, ChevronRight, Home, Settings, X, Play, Sparkles, BarChart3, FileText, Clock, Zap, Globe } from 'lucide-react';

export default function AICountellorApp() {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [shortlistedUniversities, setShortlistedUniversities] = useState([]);
  const [lockedUniversities, setLockedUniversities] = useState([]);
  const [todos, setTodos] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showDemoVideo, setShowDemoVideo] = useState(false);

  const sampleUniversities = [
    { id: 1, name: "Stanford University", country: "USA", program: "MS Computer Science", tuitionPerYear: 55000, category: "dream", acceptanceRate: 4, why: "Top-tier research opportunities", risks: "Extremely competitive" },
    { id: 2, name: "University of Toronto", country: "Canada", program: "MS Computer Science", tuitionPerYear: 28000, category: "target", acceptanceRate: 15, why: "Strong CS program", risks: "Cold weather" },
    { id: 3, name: "Arizona State University", country: "USA", program: "MS Computer Science", tuitionPerYear: 32000, category: "safe", acceptanceRate: 35, why: "Good acceptance rate", risks: "Less prestigious" },
    { id: 4, name: "Technical University of Munich", country: "Germany", program: "MS Computer Science", tuitionPerYear: 5000, category: "target", acceptanceRate: 20, why: "Low tuition", risks: "Language barrier" },
    { id: 5, name: "University of Melbourne", country: "Australia", program: "MS Computer Science", tuitionPerYear: 35000, category: "target", acceptanceRate: 25, why: "Quality education", risks: "Distance from home" }
  ];

  const handleLogout = () => {
    setUser(null);
    setProfile(null);
    setTodos([]);
    setChatMessages([]);
    setCurrentView('landing');
  };

  // LANDING PAGE
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <nav className="relative z-10 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">AI Counsellor</span>
          </div>
          <button onClick={() => setCurrentView('login')} className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition">
            Login
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-7xl font-bold leading-tight">
            Your Personal Study<br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Abroad Counsellor</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stop feeling overwhelmed. Get personalized, AI-powered guidance from profile building to university applications.
          </p>
          
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('signup')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition shadow-2xl"
            >
              Get Started Free
            </button>
            <button
              onClick={() => setShowDemoVideo(true)}
              className="px-8 py-4 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition">
              <User className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Build Profile</h3>
              <p className="text-gray-400">Share your academic background and goals</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition">
              <Target className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
              <p className="text-gray-400">Get personalized university suggestions</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition">
              <CheckCircle className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Application Management</h3>
              <p className="text-gray-400">Track and manage your applications</p>
            </div>
          </div>
        </div>
      </div>

      {showDemoVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl p-8 max-w-3xl w-full border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">AI Counsellor Demo</h3>
              <button onClick={() => setShowDemoVideo(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video bg-black rounded-xl flex items-center justify-center">
              <iframe
                className="w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // SIGNUP PAGE
  const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleSignup = (e) => {
      e.preventDefault();
      const newUser = { name: formData.name, email: formData.email };
      setUser(newUser);
      setCurrentView('onboarding');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Create Account</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="Password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">Sign Up</button>
          </form>
          <button onClick={() => setCurrentView('login')} className="text-center mt-6 w-full text-blue-600 hover:underline">Already have an account? Login</button>
        </div>
      </div>
    );
  };

  // LOGIN PAGE
  const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleLogin = (e) => {
      e.preventDefault();
      setCurrentView('onboarding');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome Back</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="Password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">Login</button>
          </form>
          <button onClick={() => setCurrentView('signup')} className="text-center mt-6 w-full text-blue-600 hover:underline">Don't have an account? Sign Up</button>
        </div>
      </div>
    );
  };

  // ONBOARDING PAGE
  const OnboardingPage = () => {
    const [formData, setFormData] = useState({ gpa: '3.5', major: 'CS', ielts: 'completed', gre: 'completed' });

    const handleComplete = () => {
      setProfile({ ...formData, onboardingComplete: true });
      setTodos([
        { id: 1, title: 'Complete IELTS exam', completed: true },
        { id: 2, title: 'Complete GRE exam', completed: true },
        { id: 3, title: 'Gather recommendation letters', completed: false },
        { id: 4, title: 'Research universities', completed: false }
      ]);
      setCurrentView('dashboard');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6">Complete Your Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">GPA</label>
              <input type="text" value={formData.gpa} onChange={(e) => setFormData({...formData, gpa: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Major</label>
              <input type="text" value={formData.major} onChange={(e) => setFormData({...formData, major: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            </div>
          </div>
          <button onClick={handleComplete} className="w-full mt-8 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">Complete Setup</button>
        </div>
      </div>
    );
  };

  // DASHBOARD
  const Dashboard = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-white">Welcome, {user?.name}! 👋</h2>
              <p className="text-gray-400 mt-2">Your study-abroad journey in progress</p>
            </div>
            <button onClick={handleLogout} className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">Logout</button>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
              <Zap className="w-8 h-8 mb-4" />
              <p className="text-white/80 text-sm">Profile Strength</p>
              <p className="text-3xl font-bold mt-2">85%</p>
              <div className="w-full bg-white/20 rounded-full h-2 mt-4"><div className="bg-white h-2 rounded-full" style={{width: '85%'}}></div></div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
              <BarChart3 className="w-8 h-8 mb-4" />
              <p className="text-white/80 text-sm">Application Progress</p>
              <p className="text-3xl font-bold mt-2">45%</p>
              <div className="w-full bg-white/20 rounded-full h-2 mt-4"><div className="bg-white h-2 rounded-full" style={{width: '45%'}}></div></div>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
              <CheckCircle className="w-8 h-8 mb-4" />
              <p className="text-white/80 text-sm">Exams Completed</p>
              <p className="text-3xl font-bold mt-2">2/2</p>
              <div className="w-full bg-white/20 rounded-full h-2 mt-4"><div className="bg-white h-2 rounded-full" style={{width: '100%'}}></div></div>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-6 text-white shadow-xl">
              <Globe className="w-8 h-8 mb-4" />
              <p className="text-white/80 text-sm">Universities</p>
              <p className="text-3xl font-bold mt-2">{lockedUniversities.length}</p>
              <div className="w-full bg-white/20 rounded-full h-2 mt-4"><div className="bg-white h-2 rounded-full" style={{width: `${Math.min((lockedUniversities.length/5)*100, 100)}%`}}></div></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <button onClick={() => setCurrentView('ai-counsellor')} className="p-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-400/30 rounded-2xl hover:border-purple-400/60 transition text-left">
              <MessageSquare className="w-8 h-8 text-purple-400 mb-3" />
              <h4 className="font-semibold text-white mb-2">Chat with AI</h4>
              <p className="text-sm text-gray-400">Get personalized advice</p>
            </button>
            <button onClick={() => setCurrentView('universities')} className="p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-2xl hover:border-blue-400/60 transition text-left">
              <Globe className="w-8 h-8 text-blue-400 mb-3" />
              <h4 className="font-semibold text-white mb-2">Explore Universities</h4>
              <p className="text-sm text-gray-400">Find your perfect match</p>
            </button>
            <button onClick={() => setShowDemoVideo(true)} className="p-6 bg-gradient-to-br from-pink-600/20 to-orange-600/20 border border-pink-400/30 rounded-2xl hover:border-pink-400/60 transition text-left">
              <Play className="w-8 h-8 text-pink-400 mb-3" />
              <h4 className="font-semibold text-white mb-2">Watch Tutorial</h4>
              <p className="text-sm text-gray-400">Learn how to get started</p>
            </button>
          </div>
        </div>

        {showDemoVideo && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-2xl p-8 max-w-3xl w-full border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Tutorial Demo</h3>
                <button onClick={() => setShowDemoVideo(false)} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <div className="aspect-video bg-black rounded-xl">
                <iframe className="w-full h-full rounded-xl" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // AI COUNSELLOR
  const AICounsellor = () => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const getAIResponse = (question) => {
      const q = question.toLowerCase();
      
      // University/Colleges questions
      if (q.includes('university') || q.includes('college') || q.includes('unis') || q.includes('which university')) {
        return '🎓 Choosing the right university is crucial! I recommend considering: 1) Program Quality & Rankings 2) Location & Campus Culture 3) Tuition & Scholarships 4) Admission Requirements 5) Alumni Network. Dream schools are prestigious but competitive. Target schools have good chances. Safety schools are likely admits. I can help you build a balanced list! What\'s your field of study?';
      }
      
      // Exam questions
      if (q.includes('exam') || q.includes('gre') || q.includes('gmat') || q.includes('ielts') || q.includes('toefl') || q.includes('sat') || q.includes('test')) {
        return '📝 Exam Preparation Guide:\n\n🎯 English Exams:\n- IELTS: 6.5-7.5 typically needed\n- TOEFL: 100+ preferred\n\n🎯 Aptitude Exams:\n- GRE: Quant 155-170, Verbal 155-170\n- GMAT: 700+ competitive\n\n📅 Timeline: Start 4-5 months before applications\n💡 Tip: Take mock tests weekly, focus on weak areas, consider coaching if needed. Which exam are you targeting?';
      }
      
      // GPA questions
      if (q.includes('gpa') || q.includes('grade') || q.includes('academic')) {
        return '📊 GPA Guidelines:\n\n✅ Strong: 3.7+ GPA opens doors to top universities\n✅ Competitive: 3.5-3.7 good for most universities\n⚠️ Moderate: 3.0-3.5 focus on other areas\n❌ Low: Below 3.0 needs strong test scores/experience\n\n💡 How to improve:\n- Nail upcoming semesters\n- Get strong recommendation letters\n- Build impressive projects & internships\n- Write compelling essays\n\nDon\'t worry - low GPA can be offset by strong test scores and experience!';
      }
      
      // Recommendation letter questions
      if (q.includes('recommendation') || q.includes('letter') || q.includes('recommender') || q.includes('lor')) {
        return '💼 Recommendation Letter Strategy:\n\n👥 Choose 3-4 recommenders who:\n- Know you well (professors/managers)\n- Can speak to your strengths\n- Have strong academic/professional standing\n\n📋 What to provide them:\n- Your resume\n- Your SOP (Statement of Purpose)\n- University requirements\n- Application deadline\n\n⏰ Timeline: Ask 3 weeks before deadline\n💡 Tip: Build relationships with professors through participation, office hours, and projects. Strong LoRs are gold!';
      }
      
      // Visa questions
      if (q.includes('visa') || q.includes('immigration') || q.includes('permit') || q.includes('f1') || q.includes('student visa')) {
        return '🛂 Visa & Immigration Checklist:\n\n📄 Documents needed:\n✓ Acceptance letter from university\n✓ Proof of financial support ($25k-60k depending on country)\n✓ Valid passport (6+ months validity)\n✓ Medical insurance\n✓ Proof of English proficiency\n\n⏰ Processing times:\n- USA (F-1): 2-4 weeks\n- Canada (Study Permit): 4-8 weeks\n- Australia (Student Visa): 2-3 weeks\n- UK (Student Visa): 3 weeks\n\n💡 Apply immediately after acceptance!';
      }
      
      // Tuition/Cost questions
      if (q.includes('tuition') || q.includes('cost') || q.includes('fee') || q.includes('expensive') || q.includes('afford') || q.includes('budget')) {
        return '💰 Tuition Cost Breakdown (Per Year):\n\n🇺🇸 USA: $25k-60k (Masters), $40k-80k (Engineering)\n🇨🇦 Canada: $15k-35k (affordable option!)\n🇦🇺 Australia: $20k-45k\n🇬🇧 UK: $20k-40k\n🇩🇪 Germany: FREE-$5k (great value!)\n\n💡 Money-saving tips:\n- Apply for scholarships early\n- Look for part-time work allowances\n- Consider countries with low tuition\n- Many unis offer assistantships\n\nDon\'t let cost stop you - there\'s funding available!';
      }
      
      // Scholarship questions
      if (q.includes('scholarship') || q.includes('funding') || q.includes('financial aid') || q.includes('grant') || q.includes('free money')) {
        return '🏆 Scholarship Opportunities:\n\n🎯 University Scholarships:\n- Merit-based (GPA, test scores)\n- Need-based (financial need)\n- Program-specific (STEM, etc.)\n\n🌍 External Scholarships:\n- Government grants\n- NGO scholarships\n- Corporate sponsorships\n- Fulbright Program\n\n⏰ Application Timeline:\n- Start searching 6-9 months early\n- Application deadlines vary (Oct-Feb usually)\n- Need strong profile + essay\n\n💡 Estimated free money: $5k-30k per year. Multiple scholarships can be combined!';
      }
      
      // Statement of Purpose/Essay questions
      if (q.includes('statement') || q.includes('sop') || q.includes('essay') || q.includes('motivation') || q.includes('why')) {
        return '✍️ Statement of Purpose Guide:\n\n📝 Must Include:\n1. Background & Why this field?\n2. Academic goals & career aspirations\n3. Why this specific university?\n4. How the program fits your goals\n5. Unique qualities/experiences\n\n✅ Best Practices:\n- Be specific & authentic (NOT generic)\n- Show passion for your field\n- Connect past to future\n- 300-500 words optimal\n- Get feedback from mentors\n\n❌ Avoid:\n- Clichés or generic statements\n- Grammatical errors\n- Being too casual or too formal\n- Focusing on salary/prestige only\n\nYour SOP is crucial - spend 2-3 weeks perfecting it!';
      }
      
      // Profile/Overall questions
      if (q.includes('profile') || q.includes('strong application') || q.includes('chances') || q.includes('competitive')) {
        return '👤 Building a Strong Profile:\n\n📊 Academic (40%):\n- GPA: 3.5+ preferred\n- Test Scores: GRE/GMAT/IELTS\n\n💼 Professional (30%):\n- Work/Internship experience (1-3 years)\n- Relevant projects\n- Technical skills\n\n✍️ Soft Skills (20%):\n- Strong SOP & recommendations\n- Passion for field\n- Leadership/unique traits\n\n🌟 Extra (10%):\n- Publications/research\n- Certifications\n- Volunteer work\n\n💡 Balance is key! Even with lower GPA, strong experience + test scores = admission!';
      }
      
      // Application timeline questions
      if (q.includes('application') || q.includes('deadline') || q.includes('timeline') || q.includes('when to apply') || q.includes('process')) {
        return '📋 Application Timeline (12-month plan):\n\n📅 Months 1-3: Research & Prepare\n- List 10-15 universities (dream/target/safe)\n- Prepare for exams\n- Build application materials\n\n📅 Months 4-6: Exams & Documents\n- Complete GRE/GMAT/IELTS\n- Get recommendation letters\n- Write Statement of Purpose\n\n📅 Months 7-9: Applications\n- Fill application forms\n- Submit all materials\n- Pay application fees\n\n📅 Months 10-12: Results & Decisions\n- Wait for acceptances (3-4 weeks typical)\n- Compare offers\n- Accept offer & apply for visa\n\n💡 Pro tip: Early applications have better chances!';
      }
      
      // Help/advice general
      if (q.includes('help') || q.includes('advice') || q.includes('suggest') || q.includes('how') || q.includes('can you')) {
        return '🤖 I\'m here to help! I can provide guidance on:\n\n🎓 Universities & Programs\n📝 Exams (GRE, GMAT, IELTS, TOEFL)\n📊 GPA & Academic Profile\n💼 Work Experience & Internships\n💰 Tuition, Costs & Scholarships\n🛂 Visa & Immigration\n✍️ Essays & Statement of Purpose\n💭 Recommendation Letters\n📋 Application Process & Timeline\n🎯 Career Planning\n\nJust ask me anything about studying abroad! What specific topic interests you most?';
      }
      
      // Career questions
      if (q.includes('career') || q.includes('job') || q.includes('salary') || q.includes('work') || q.includes('placement')) {
        return '🚀 Career Planning for Abroad Studies:\n\n💼 Typical Outcomes:\n- Average salary increase: 50-150%\n- MS in CS: $100k-180k starting\n- MBA: $120k-200k starting\n- MS in Business: $80k-150k\n\n🌍 Work Options:\n- USA: OPT (12-36 months)\n- Canada: Work permit (24-36 months)\n- Australia: 2+ year visas\n- UK: Visa extensions available\n\n💡 Networking Tips:\n- Join university clubs\n- Attend job fairs\n- Connect on LinkedIn\n- Internships during studies\n\nStudying abroad opens global career opportunities!';
      }
      
      // Default helpful response
      return '🤖 Great question! To give you better advice, I need more details. Are you asking about:\n\n✅ Universities & Programs?\n✅ Exams (GRE, IELTS, etc.)?\n✅ GPA & Academic Profile?\n✅ Scholarships & Funding?\n✅ Application Process?\n✅ Visa & Immigration?\n✅ Career Planning?\n✅ Costs & Affordability?\n\nFeel free to ask about any of these topics - I\'m here to guide you through your study abroad journey! 🌍';
    };

    const handleSendMessage = () => {
      if (!input.trim()) return;
      setChatMessages([...chatMessages, { role: 'user', content: input }]);
      setInput('');
      setIsLoading(true);
      setTimeout(() => {
        const aiResponse = getAIResponse(input);
        setChatMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
        setIsLoading(false);
      }, 1000);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <nav className="bg-black/30 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <button onClick={() => setCurrentView('dashboard')} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"><Home className="w-5 h-5" /> Back to Dashboard</button>
              <span className="text-xl font-bold text-white">AI Counsellor</span>
            </div>
            <button onClick={handleLogout} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">{user?.name} - Logout</button>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col h-[calc(100vh-180px)]">
            <div className="p-6 border-b border-white/10">
              <h1 className="text-2xl font-bold text-white">AI Counsellor Chat</h1>
              <p className="text-gray-400">Get personalized guidance for your study-abroad journey</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.length === 0 && <div className="text-center text-gray-400 py-12">Start your conversation...</div>}
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-white/10 text-gray-100 border border-white/10'}`}>
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-center text-gray-400">AI is thinking...</div>}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 border-t border-white/10">
              <div className="flex gap-3">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ask me anything..." className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-purple-400" />
                <button onClick={handleSendMessage} disabled={isLoading || !input.trim()} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50"><Send className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // UNIVERSITIES PAGE
  const UniversitiesPage = () => {
    const [filter, setFilter] = useState('all');

    const filteredUniversities = filter === 'all' ? sampleUniversities : sampleUniversities.filter(u => u.category === filter);

    const handleShortlist = (university) => {
      if (!shortlistedUniversities.find(u => u.id === university.id)) {
        setShortlistedUniversities([...shortlistedUniversities, university]);
      }
    };

    const handleLock = (university) => {
      if (!lockedUniversities.find(u => u.id === university.id)) {
        setLockedUniversities([...lockedUniversities, university]);
        setTodos([...todos, { id: Date.now(), title: `Apply to ${university.name}`, completed: false }]);
      }
    };

    const handleUnlock = (university) => {
      setLockedUniversities(lockedUniversities.filter(u => u.id !== university.id));
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <nav className="bg-black/30 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <button onClick={() => setCurrentView('dashboard')} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"><Home className="w-5 h-5" /> Back to Dashboard</button>
            <span className="text-xl font-bold text-white">AI Counsellor</span>
            <button onClick={handleLogout} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">{user?.name} - Logout</button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">Discover Universities</h1>
          <p className="text-gray-400 mb-8">Find the perfect universities that match your profile</p>

          <div className="flex gap-3 mb-8">
            {['all', 'dream', 'target', 'safe'].map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-3 rounded-xl font-semibold transition ${filter === cat ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20'}`}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {filteredUniversities.map(university => {
              const isShortlisted = shortlistedUniversities.find(u => u.id === university.id);
              const isLocked = lockedUniversities.find(u => u.id === university.id);

              return (
                <div key={university.id} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/30 transition">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{university.name}</h3>
                      <p className="text-gray-400 mt-1">{university.country} • {university.program}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r text-white text-xs font-bold ${university.category === 'dream' ? 'from-purple-600 to-pink-600' : university.category === 'target' ? 'from-blue-600 to-cyan-600' : 'from-green-600 to-emerald-600'}`}>
                      {university.category.toUpperCase()}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-white/5 rounded-xl">
                    <div><p className="text-xs text-gray-400">Tuition/Year</p><p className="text-lg font-bold text-white">${university.tuitionPerYear.toLocaleString()}</p></div>
                    <div><p className="text-xs text-gray-400">Acceptance Rate</p><p className="text-lg font-bold text-white">{university.acceptanceRate}%</p></div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3"><p className="text-xs font-semibold text-green-400">✓ Why This Fits</p><p className="text-sm text-gray-300">{university.why}</p></div>
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3"><p className="text-xs font-semibold text-orange-400">⚠ Potential Risks</p><p className="text-sm text-gray-300">{university.risks}</p></div>
                  </div>

                  <div className="flex gap-3">
                    {!isLocked && (
                      <button onClick={() => handleShortlist(university)} disabled={isShortlisted} className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${isShortlisted ? 'bg-white/10 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg'}`}>
                        {isShortlisted ? '✓ Shortlisted' : 'Shortlist'}
                      </button>
                    )}
                    {isLocked ? (
                      <button onClick={() => handleUnlock(university)} className="flex-1 px-4 py-3 bg-red-600/20 text-red-400 rounded-lg font-semibold hover:bg-red-600/30 border border-red-500/30 flex items-center justify-center gap-2">
                        <Unlock className="w-4 h-4" /> Unlock
                      </button>
                    ) : (
                      <button onClick={() => handleLock(university)} disabled={!isShortlisted} className={`flex-1 px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${!isShortlisted ? 'bg-white/10 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg'}`}>
                        <Lock className="w-4 h-4" /> Lock & Apply
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // MAIN ROUTER
  return (
    <>
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'signup' && <SignupPage />}
      {currentView === 'login' && <LoginPage />}
      {currentView === 'onboarding' && <OnboardingPage />}
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'ai-counsellor' && <AICounsellor />}
      {currentView === 'universities' && <UniversitiesPage />}
    </>
  );
}
