import React, { useState, useEffect, useRef } from 'react';
import { Camera, User, LogOut, Lock, Unlock, CheckCircle, Circle, MessageSquare, Send, Loader, BookOpen, Target, TrendingUp, DollarSign, Calendar, Award, AlertCircle, ChevronRight, Home, Settings, X, Play, Sparkles, BarChart3, FileText, Clock, Zap, Globe } from 'lucide-react';

// Main App Component
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
  const [analyticsData, setAnalyticsData] = useState({
    profileStrength: 0,
    applicationProgress: 0,
    examsCompleted: 0
  });

  // Sample University Data
  const sampleUniversities = [
    {
      id: 1,
      name: "Stanford University",
      country: "USA",
      program: "MS Computer Science",
      tuitionPerYear: 55000,
      category: "dream",
      acceptanceRate: 4,
      requirements: { gpa: 3.8, gre: 325, toefl: 110 },
      why: "Top-tier research opportunities, Silicon Valley connections, world-class faculty",
      risks: "Extremely competitive, high cost of living, very low acceptance rate"
    },
    {
      id: 2,
      name: "University of Toronto",
      country: "Canada",
      program: "MS Computer Science",
      tuitionPerYear: 28000,
      category: "target",
      acceptanceRate: 15,
      requirements: { gpa: 3.5, gre: 315, toefl: 100 },
      why: "Strong CS program, reasonable cost, good job market, PR pathway",
      risks: "Cold weather, competitive program, long winters"
    },
    {
      id: 3,
      name: "Arizona State University",
      country: "USA",
      program: "MS Computer Science",
      tuitionPerYear: 32000,
      category: "safe",
      acceptanceRate: 35,
      requirements: { gpa: 3.0, gre: 300, toefl: 90 },
      why: "Good acceptance rate, reasonable requirements, growing tech scene",
      risks: "Less prestigious, hot climate, limited research funding"
    },
    {
      id: 4,
      name: "Technical University of Munich",
      country: "Germany",
      program: "MS Computer Science",
      tuitionPerYear: 5000,
      category: "target",
      acceptanceRate: 20,
      requirements: { gpa: 3.4, gre: 310, toefl: 95 },
      why: "Low tuition, strong engineering, EU job market access",
      risks: "Language barrier, bureaucracy, cultural adjustment"
    },
    {
      id: 5,
      name: "University of Melbourne",
      country: "Australia",
      program: "MS Computer Science",
      tuitionPerYear: 35000,
      category: "target",
      acceptanceRate: 25,
      requirements: { gpa: 3.3, gre: 310, toefl: 95 },
      why: "Quality education, work opportunities, good lifestyle",
      risks: "Distance from home, moderate cost, visa challenges"
    }
  ];

  // Initialize app
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      loadUserData(userData.email);
    }
  }, []);

  const loadUserData = (email) => {
    const savedProfile = localStorage.getItem(`profile_${email}`);
    const savedShortlist = localStorage.getItem(`shortlist_${email}`);
    const savedLocked = localStorage.getItem(`locked_${email}`);
    const savedTodos = localStorage.getItem(`todos_${email}`);

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedShortlist) setShortlistedUniversities(JSON.parse(savedShortlist));
    if (savedLocked) setLockedUniversities(JSON.parse(savedLocked));
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  };

  const saveUserData = () => {
    if (user) {
      localStorage.setItem(`profile_${user.email}`, JSON.stringify(profile));
      localStorage.setItem(`shortlist_${user.email}`, JSON.stringify(shortlistedUniversities));
      localStorage.setItem(`locked_${user.email}`, JSON.stringify(lockedUniversities));
      localStorage.setItem(`todos_${user.email}`, JSON.stringify(todos));
    }
  };

  useEffect(() => {
    saveUserData();
  }, [profile, shortlistedUniversities, lockedUniversities, todos]);

  // Navigation
  const handleLogout = () => {
    setUser(null);
    setProfile(null);
    setShortlistedUniversities([]);
    setLockedUniversities([]);
    setTodos([]);
    setChatMessages([]);
    setCurrentView('landing');
    localStorage.removeItem('user');
  };

  const getCurrentStage = () => {
    if (!profile || !profile.onboardingComplete) return 'Building Profile';
    if (lockedUniversities.length === 0) return 'Discovering Universities';
    if (lockedUniversities.length > 0 && todos.filter(t => !t.completed).length > 5) return 'Preparing Applications';
    return 'Finalizing Universities';
  };

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      <nav className="relative z-10 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">AI Counsellor</span>
          </div>
          <button
            onClick={() => setCurrentView('login')}
            className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition backdrop-blur-sm"
          >
            Login
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30">
            <p className="text-sm font-semibold text-purple-300">✨ Powered by Advanced AI</p>
          </div>
          
          <h1 className="text-7xl font-bold leading-tight">
            Your Personal Study<br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Abroad Counsellor</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stop feeling overwhelmed. Get personalized, AI-powered guidance from profile building to university applications. Make informed decisions with confidence.
          </p>
          
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('signup')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition shadow-2xl hover:shadow-purple-500/50"
            >
              Get Started Free
            </button>
            <button
              onClick={() => setShowDemoVideo(true)}
              className="px-8 py-4 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition flex items-center gap-2 backdrop-blur-sm"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              { icon: User, title: "Build Profile", desc: "Share your academic background and goals" },
              { icon: Target, title: "AI Recommendations", desc: "Get personalized university suggestions" },
              { icon: CheckCircle, title: "Application Management", desc: "Track and manage your applications" }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition group">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Video Modal */}
      {showDemoVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl p-8 max-w-3xl w-full border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">AI Counsellor Demo Video</h3>
              <button onClick={() => setShowDemoVideo(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video bg-black rounded-xl flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-white text-lg font-semibold">Demo Video Playing</p>
                <p className="text-gray-400 text-sm mt-2">Watch how AI Counsellor helps students succeed</p>
                <p className="text-gray-500 text-xs mt-4">Video placeholder - In production this would embed YouTube or video player</p>
              </div>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Auth Components
  const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleSignup = (e) => {
      e.preventDefault();
      const newUser = { name: formData.name, email: formData.email };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setCurrentView('onboarding');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600 mt-2">Start your study-abroad journey</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <button onClick={() => setCurrentView('login')} className="text-blue-600 font-semibold hover:underline">
              Login
            </button>
          </p>
        </div>
      </div>
    );
  };

  const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleLogin = (e) => {
      e.preventDefault();
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        if (userData.email === formData.email) {
          setUser(userData);
          loadUserData(userData.email);
          
          const savedProfile = localStorage.getItem(`profile_${userData.email}`);
          if (savedProfile && JSON.parse(savedProfile).onboardingComplete) {
            setCurrentView('dashboard');
          } else {
            setCurrentView('onboarding');
          }
        }
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Continue your journey</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <button onClick={() => setCurrentView('signup')} className="text-blue-600 font-semibold hover:underline">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    );
  };

  // Onboarding Component
  const OnboardingPage = () => {
    const [formData, setFormData] = useState({
      education: '',
      degree: '',
      major: '',
      graduationYear: '',
      gpa: '',
      targetDegree: '',
      fieldOfStudy: '',
      targetYear: '',
      preferredCountries: [],
      budgetRange: '',
      fundingPlan: '',
      ielts: '',
      gre: '',
      sopStatus: ''
    });

    const steps = [
      {
        title: 'Academic Background',
        fields: ['education', 'degree', 'major', 'graduationYear', 'gpa']
      },
      {
        title: 'Study Goals',
        fields: ['targetDegree', 'fieldOfStudy', 'targetYear', 'preferredCountries']
      },
      {
        title: 'Budget Planning',
        fields: ['budgetRange', 'fundingPlan']
      },
      {
        title: 'Exam Readiness',
        fields: ['ielts', 'gre', 'sopStatus']
      }
    ];

    const handleComplete = () => {
      const newProfile = {
        ...formData,
        onboardingComplete: true,
        createdAt: new Date().toISOString()
      };
      setProfile(newProfile);
      
      // Generate initial todos
      const initialTodos = [
        { id: 1, title: 'Complete IELTS/TOEFL exam', completed: formData.ielts === 'completed', category: 'exams' },
        { id: 2, title: 'Complete GRE/GMAT exam', completed: formData.gre === 'completed', category: 'exams' },
        { id: 3, title: 'Draft Statement of Purpose', completed: formData.sopStatus === 'ready', category: 'documents' },
        { id: 4, title: 'Gather recommendation letters', completed: false, category: 'documents' },
        { id: 5, title: 'Research universities', completed: false, category: 'research' }
      ];
      setTodos(initialTodos);
      
      setCurrentView('dashboard');
    };

    const currentStepFields = steps[onboardingStep]?.fields || [];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{steps[onboardingStep].title}</h2>
              <div className="flex gap-2 mt-4">
                {steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 flex-1 rounded ${idx <= onboardingStep ? 'bg-blue-600' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {currentStepFields.includes('education') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Education Level</label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="postgraduate">Postgraduate</option>
                  </select>
                </div>
              )}

              {currentStepFields.includes('degree') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Bachelor of Technology"
                  />
                </div>
              )}

              {currentStepFields.includes('major') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                  <input
                    type="text"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Computer Science"
                  />
                </div>
              )}

              {currentStepFields.includes('graduationYear') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                  <input
                    type="text"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="2024"
                  />
                </div>
              )}

              {currentStepFields.includes('gpa') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GPA / Percentage</label>
                  <input
                    type="text"
                    value={formData.gpa}
                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="3.5 / 85%"
                  />
                </div>
              )}

              {currentStepFields.includes('targetDegree') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Degree</label>
                  <select
                    value={formData.targetDegree}
                    onChange={(e) => setFormData({ ...formData, targetDegree: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="bachelors">Bachelor's</option>
                    <option value="masters">Master's</option>
                    <option value="mba">MBA</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>
              )}

              {currentStepFields.includes('fieldOfStudy') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                  <input
                    type="text"
                    value={formData.fieldOfStudy}
                    onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Computer Science, Business Analytics"
                  />
                </div>
              )}

              {currentStepFields.includes('targetYear') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Intake Year</label>
                  <select
                    value={formData.targetYear}
                    onChange={(e) => setFormData({ ...formData, targetYear: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              )}

              {currentStepFields.includes('preferredCountries') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Countries</label>
                  <div className="space-y-2">
                    {['USA', 'Canada', 'UK', 'Germany', 'Australia'].map(country => (
                      <label key={country} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.preferredCountries.includes(country)}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...formData.preferredCountries, country]
                              : formData.preferredCountries.filter(c => c !== country);
                            setFormData({ ...formData, preferredCountries: updated });
                          }}
                          className="w-4 h-4 text-blue-600 mr-2"
                        />
                        <span>{country}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {currentStepFields.includes('budgetRange') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range (per year)</label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="0-20000">$0 - $20,000</option>
                    <option value="20000-40000">$20,000 - $40,000</option>
                    <option value="40000-60000">$40,000 - $60,000</option>
                    <option value="60000+">$60,000+</option>
                  </select>
                </div>
              )}

              {currentStepFields.includes('fundingPlan') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Funding Plan</label>
                  <select
                    value={formData.fundingPlan}
                    onChange={(e) => setFormData({ ...formData, fundingPlan: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="self">Self-Funded</option>
                    <option value="scholarship">Scholarship-Dependent</option>
                    <option value="loan">Loan-Dependent</option>
                    <option value="mixed">Mixed Funding</option>
                  </select>
                </div>
              )}

              {currentStepFields.includes('ielts') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IELTS/TOEFL Status</label>
                  <select
                    value={formData.ielts}
                    onChange={(e) => setFormData({ ...formData, ielts: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="not-started">Not Started</option>
                    <option value="preparing">Preparing</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              )}

              {currentStepFields.includes('gre') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GRE/GMAT Status</label>
                  <select
                    value={formData.gre}
                    onChange={(e) => setFormData({ ...formData, gre: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="not-started">Not Started</option>
                    <option value="preparing">Preparing</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              )}

              {currentStepFields.includes('sopStatus') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statement of Purpose Status</label>
                  <select
                    value={formData.sopStatus}
                    onChange={(e) => setFormData({ ...formData, sopStatus: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="not-started">Not Started</option>
                    <option value="draft">Draft</option>
                    <option value="ready">Ready</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              {onboardingStep > 0 && (
                <button
                  onClick={() => setOnboardingStep(onboardingStep - 1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Previous
                </button>
              )}
              {onboardingStep < steps.length - 1 ? (
                <button
                  onClick={() => setOnboardingStep(onboardingStep + 1)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Complete Setup
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard Component - ADVANCED VERSION
  const Dashboard = () => {
    const [showWatchDemo, setShowWatchDemo] = useState(false);

    useEffect(() => {
      if (profile) {
        const gpaScore = parseFloat(profile.gpa) || 0;
        const examsScore = (profile.ielts === 'completed' ? 1 : 0.5) + (profile.gre === 'completed' ? 1 : 0.5);
        const profileStrength = Math.min(((gpaScore / 4) * 0.5 + (examsScore / 2) * 0.5) * 100, 100);
        
        const applicationProgress = lockedUniversities.length > 0 
          ? (todos.filter(t => t.completed).length / todos.length) * 100 
          : 0;

        setAnalyticsData({
          profileStrength: Math.round(profileStrength),
          applicationProgress: Math.round(applicationProgress),
          examsCompleted: (profile.ielts === 'completed' ? 1 : 0) + (profile.gre === 'completed' ? 1 : 0)
        });
      }
    }, [profile, lockedUniversities, todos]);

    const StatCard = ({ icon: Icon, label, value, color, percent }) => (
      <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1`}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">{percent}%</span>
        </div>
        <p className="text-white/80 text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        <div className="w-full bg-white/20 rounded-full h-2 mt-4">
          <div className={`bg-white h-2 rounded-full transition-all duration-500`} style={{ width: `${percent}%` }}></div>
        </div>
      </div>
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-900/80 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">AI Counsellor</h1>
              <p className="text-xs text-purple-300">Advanced</p>
            </div>
          </div>

          <nav className="space-y-3">
            {[
              { label: 'Dashboard', icon: Home, action: () => setCurrentView('dashboard') },
              { label: 'AI Chat', icon: MessageSquare, action: () => setCurrentView('ai-counsellor') },
              { label: 'Universities', icon: BookOpen, action: () => setCurrentView('universities') },
              { label: 'Tasks & Goals', icon: CheckCircle, action: () => {} },
              { label: 'Analytics', icon: BarChart3, action: () => {} },
              { label: 'Settings', icon: Settings, action: () => {} }
            ].map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition group"
              >
                <item.icon className="w-5 h-5 group-hover:text-purple-400 transition" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name}! 👋</h2>
              <p className="text-gray-400">Your study-abroad journey in progress</p>
            </div>
            <button
              onClick={() => setShowWatchDemo(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Zap}
              label="Profile Strength"
              value={`${analyticsData.profileStrength}%`}
              color="from-blue-600 to-cyan-600"
              percent={analyticsData.profileStrength}
            />
            <StatCard
              icon={BarChart3}
              label="Application Progress"
              value={`${analyticsData.applicationProgress}%`}
              color="from-purple-600 to-pink-600"
              percent={analyticsData.applicationProgress}
            />
            <StatCard
              icon={CheckCircle}
              label="Exams Completed"
              value={`${analyticsData.examsCompleted}/2`}
              color="from-green-600 to-emerald-600"
              percent={(analyticsData.examsCompleted / 2) * 100}
            />
            <StatCard
              icon={Globe}
              label="Universities"
              value={lockedUniversities.length}
              color="from-orange-600 to-red-600"
              percent={Math.min((lockedUniversities.length / 5) * 100, 100)}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Recent Activity */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {todos.slice(0, 4).map((todo, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                      {todo.completed && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                      {todo.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Your Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 text-sm">Profile Completion</span>
                    <span className="text-purple-400 font-semibold">{analyticsData.profileStrength}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all" style={{ width: `${analyticsData.profileStrength}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 text-sm">Shortlisted Universities</span>
                    <span className="text-blue-400 font-semibold">{shortlistedUniversities.length}</span>
                  </div>
                  <p className="text-xs text-gray-500">{5 - shortlistedUniversities.length} more to explore</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 text-sm">Locked for Application</span>
                    <span className="text-green-400 font-semibold">{lockedUniversities.length}</span>
                  </div>
                  <p className="text-xs text-gray-500">Ready to apply</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Buttons */}
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => setCurrentView('ai-counsellor')}
              className="p-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-400/30 rounded-2xl hover:border-purple-400/60 transition text-left group"
            >
              <MessageSquare className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition" />
              <h4 className="font-semibold text-white mb-2">Chat with AI</h4>
              <p className="text-sm text-gray-400">Get personalized advice instantly</p>
            </button>
            <button
              onClick={() => setCurrentView('universities')}
              className="p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-2xl hover:border-blue-400/60 transition text-left group"
            >
              <Globe className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition" />
              <h4 className="font-semibold text-white mb-2">Explore Universities</h4>
              <p className="text-sm text-gray-400">Find your perfect match</p>
            </button>
            <button
              onClick={() => setShowWatchDemo(true)}
              className="p-6 bg-gradient-to-br from-pink-600/20 to-orange-600/20 border border-pink-400/30 rounded-2xl hover:border-pink-400/60 transition text-left group"
            >
              <Play className="w-8 h-8 text-pink-400 mb-3 group-hover:scale-110 transition" />
              <h4 className="font-semibold text-white mb-2">Watch Tutorial</h4>
              <p className="text-sm text-gray-400">Learn how to get started</p>
            </button>
          </div>
        </main>

        {/* Demo Video Modal */}
        {showWatchDemo && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-2xl p-8 max-w-3xl w-full border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Tutorial Demo</h3>
                <button onClick={() => setShowWatchDemo(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="aspect-video bg-black rounded-xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <p className="text-white text-lg font-semibold">Demo Video Playing</p>
                  <p className="text-gray-400 text-sm mt-2">Watch how to use AI Counsellor</p>
                </div>
                <iframe
                  className="w-full h-full absolute inset-0"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 'none' }}
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // AI Counsellor Chat Component - ENHANCED
  const AICounsellor = () => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [chatMessages]);

    const handleSendMessage = async () => {
      if (!input.trim()) return;

      const userMessage = { role: 'user', content: input };
      setChatMessages([...chatMessages, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const response = generateAIResponse(input, profile, shortlistedUniversities, lockedUniversities);
        setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const generateAIResponse = (userInput, userProfile, shortlist, locked) => {
      const input = userInput.toLowerCase();
      
      if (input.includes('profile') || input.includes('strength')) {
        return `📊 **Profile Analysis**\n\nBased on your profile, here's my assessment:\n\n✓ **Academic Strength**: Your ${userProfile?.gpa} GPA in ${userProfile?.major} shows ${parseFloat(userProfile?.gpa) >= 3.5 ? 'strong' : 'moderate'} academic performance.\n\n✓ **Exam Status**: ${userProfile?.ielts === 'completed' ? '✅ IELTS/TOEFL is complete!' : '⏳ You need to complete your IELTS/TOEFL exam'} ${userProfile?.gre === 'completed' ? '✅ GRE is also done!' : '⏳ GRE is still pending'}\n\n💡 **Recommendations**: ${parseFloat(userProfile?.gpa) >= 3.5 ? 'You can aim for top-tier universities.' : 'Focus on target and safe universities while preparing for exams.'}`;
      }
      
      if (input.includes('recommend') || input.includes('university') || input.includes('universities')) {
        const budget = userProfile?.budgetRange || '20000-40000';
        const maxBudget = parseInt(budget.split('-')[1]) || 40000;
        
        const recommendations = sampleUniversities
          .filter(uni => uni.tuitionPerYear <= maxBudget)
          .slice(0, 3);
        
        let response = `🎯 **University Recommendations**\n\nBased on your budget ($${budget}) and preferences for ${userProfile?.preferredCountries?.join(', ')}, here are my top picks:\n\n`;
        
        recommendations.forEach(uni => {
          response += `**${uni.name}** (${uni.country})\n`;
          response += `• Program: ${uni.program}\n`;
          response += `• Tuition: $${uni.tuitionPerYear.toLocaleString()}/year\n`;
          response += `• Category: ${uni.category.toUpperCase()}\n\n`;
        });
        
        return response + "Would you like me to help you shortlist any of these?";
      }
      
      if (input.includes('shortlist')) {
        return `✨ **Shortlisting Help**\n\nI can help you add universities to your shortlist! You can:\n\n1. Go to the Universities page and click "Shortlist" button\n2. You'll have ${5 - shortlist.length} more universities to explore\n3. Once shortlisted, you can lock universities for final applications\n\nWhich universities are you interested in?`;
      }
      
      if (input.includes('lock')) {
        if (shortlist.length === 0) {
          return `🔒 **Locking Universities**\n\nYou need to shortlist universities first before locking them.\n\nHere's the process:\n1. Explore universities → Shortlist promising ones\n2. Once shortlisted → Click "Lock & Apply"\n3. This commits you to apply and creates application tasks\n\nWould you like me to recommend universities first?`;
        }
        return `🔒 **Application Lock Status**\n\nYou have ${shortlist.length} shortlisted universities.\nYou have ${locked.length} locked for application.\n\nReady to lock one? Head to the Universities page!`;
      }
      
      if (input.includes('task') || input.includes('todo')) {
        const incompleteTasks = todos.filter(t => !t.completed);
        if (incompleteTasks.length === 0) {
          return `🎉 **Excellent Progress!**\n\nYou've completed all your current tasks! Your next steps:\n\n✓ Research and shortlist universities\n✓ Explore the Universities page\n✓ Lock universities for application\n✓ Follow the guided tasks for each application\n\nYou're on track! Keep going! 🚀`;
        }
        return `📋 **Your Pending Tasks**\n\nYou have ${incompleteTasks.length} tasks to complete:\n\n${incompleteTasks.slice(0, 5).map(t => `${t.completed ? '✅' : '⏳'} ${t.title}`).join('\n')}\n\nLet me know if you need help with any of these!`;
      }
      
      return `🤖 **AI Counsellor at Your Service**\n\nI'm here to guide you through your study-abroad journey! I can help with:\n\n📊 Profile Analysis - Assess your strengths\n🎯 University Recommendations - Find perfect matches\n📋 Task Management - Track your progress\n💡 Application Strategy - Get personalized advice\n❓ Answer Questions - About any aspect of your journey\n\nWhat would you like to explore?`;
    };

    const QuickAction = ({ label, icon: Icon, onClick }) => (
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-gray-300 hover:text-white transition border border-white/10"
      >
        <Icon className="w-4 h-4" />
        {label}
      </button>
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Nav */}
        <nav className="bg-black/30 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AI Counsellor</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCurrentView('dashboard')} className="p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition">
                  <Home className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-white/10 text-purple-400">
                  <MessageSquare className="w-5 h-5" />
                </button>
                <button onClick={() => setCurrentView('universities')} className="p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition">
                  <BookOpen className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{user?.name}</span>
              <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col h-[calc(100vh-180px)]">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <h1 className="text-2xl font-bold text-white mb-2">AI Counsellor Chat</h1>
              <p className="text-gray-400">Get personalized guidance for your study-abroad journey</p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-400/30">
                      <MessageSquare className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Start Your Conversation</h3>
                    <p className="text-gray-400 max-w-xs">Ask me anything about university selection, application strategy, or your profile</p>
                  </div>
                </div>
              )}

              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-white/10 text-gray-100 border border-white/10'}`}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-white/10">
              {chatMessages.length === 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  <QuickAction label="Analyze my profile" icon={BarChart3} onClick={() => setInput('Can you analyze my profile and strengths?')} />
                  <QuickAction label="Recommend universities" icon={Target} onClick={() => setInput('Can you recommend some universities for me?')} />
                  <QuickAction label="Help with tasks" icon={CheckCircle} onClick={() => setInput('What tasks should I focus on next?')} />
                </div>
              )}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Universities Page Component - ENHANCED
  const UniversitiesPage = () => {
    const [filter, setFilter] = useState('all');

    const filteredUniversities = filter === 'all' 
      ? sampleUniversities 
      : sampleUniversities.filter(u => u.category === filter);

    const handleShortlist = (university) => {
      if (!shortlistedUniversities.find(u => u.id === university.id)) {
        setShortlistedUniversities([...shortlistedUniversities, university]);
      }
    };

    const handleLock = (university) => {
      if (!lockedUniversities.find(u => u.id === university.id)) {
        setLockedUniversities([...lockedUniversities, university]);
        
        const newTodos = [
          { id: Date.now() + 1, title: `Complete application for ${university.name}`, completed: false },
          { id: Date.now() + 2, title: `Prepare SOP for ${university.name}`, completed: false },
          { id: Date.now() + 3, title: `Get recommendations for ${university.name}`, completed: false }
        ];
        setTodos([...todos, ...newTodos]);
      }
    };

    const handleUnlock = (university) => {
      setLockedUniversities(lockedUniversities.filter(u => u.id !== university.id));
      setTodos(todos.filter(t => !t.title.includes(university.name)));
    };

    const getCategoryColor = (category) => {
      switch(category) {
        case 'dream': return 'from-purple-600 to-pink-600';
        case 'target': return 'from-blue-600 to-cyan-600';
        case 'safe': return 'from-green-600 to-emerald-600';
        default: return 'from-gray-600 to-gray-700';
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header Nav */}
        <nav className="bg-black/30 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AI Counsellor</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCurrentView('dashboard')} className="p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition">
                  <Home className="w-5 h-5" />
                </button>
                <button onClick={() => setCurrentView('ai-counsellor')} className="p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition">
                  <MessageSquare className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-white/10 text-purple-400">
                  <BookOpen className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{user?.name}</span>
              <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Discover Universities</h1>
            <p className="text-gray-400">Find the perfect universities that match your profile and aspirations</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {[
              { key: 'all', label: 'All Universities', color: 'from-gray-600 to-gray-700' },
              { key: 'dream', label: 'Dream Universities', color: 'from-purple-600 to-pink-600' },
              { key: 'target', label: 'Target Universities', color: 'from-blue-600 to-cyan-600' },
              { key: 'safe', label: 'Safe Universities', color: 'from-green-600 to-emerald-600' }
            ].map(cat => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-6 py-3 rounded-xl font-semibold transition transform hover:scale-105 ${
                  filter === cat.key 
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                    : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Universities Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredUniversities.map(university => {
              const isShortlisted = shortlistedUniversities.find(u => u.id === university.id);
              const isLocked = lockedUniversities.find(u => u.id === university.id);

              return (
                <div key={university.id} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/30 transition group">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{university.name}</h3>
                      <p className="text-gray-400 mt-1">{university.country} • {university.program}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getCategoryColor(university.category)} text-white text-xs font-bold`}>
                      {university.category.toUpperCase()}
                    </div>
                  </div>

                  {/* Key Info */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-white/5 rounded-xl">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">Tuition/Year</p>
                        <p className="text-lg font-bold text-white">${university.tuitionPerYear.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">Acceptance Rate</p>
                        <p className="text-lg font-bold text-white">{university.acceptanceRate}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Why & Risks */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <p className="text-xs font-semibold text-green-400 mb-1">✓ Why This Fits</p>
                      <p className="text-sm text-gray-300">{university.why}</p>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                      <p className="text-xs font-semibold text-orange-400 mb-1">⚠ Potential Risks</p>
                      <p className="text-sm text-gray-300">{university.risks}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {!isLocked && (
                      <button
                        onClick={() => handleShortlist(university)}
                        disabled={isShortlisted}
                        className={`flex-1 px-4 py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
                          isShortlisted
                            ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
                        }`}
                      >
                        {isShortlisted ? '✓ Shortlisted' : 'Shortlist'}
                      </button>
                    )}
                    {isLocked ? (
                      <button
                        onClick={() => handleUnlock(university)}
                        className="flex-1 px-4 py-3 bg-red-600/20 text-red-400 rounded-lg font-semibold hover:bg-red-600/30 transition flex items-center justify-center gap-2 border border-red-500/30"
                      >
                        <Unlock className="w-4 h-4" />
                        Unlock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleLock(university)}
                        disabled={!isShortlisted}
                        className={`flex-1 px-4 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 transform hover:scale-105 ${
                          !isShortlisted
                            ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/50'
                        }`}
                      >
                        <Lock className="w-4 h-4" />
                        Lock & Apply
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

  // Main Router
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
