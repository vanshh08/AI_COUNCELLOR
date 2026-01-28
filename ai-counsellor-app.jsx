import React, { useState, useEffect, useRef } from 'react';
import { Camera, User, LogOut, Lock, Unlock, CheckCircle, Circle, MessageSquare, Send, Loader, BookOpen, Target, TrendingUp, DollarSign, Calendar, Award, AlertCircle, ChevronRight, Home, Settings } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Target className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">AI Counsellor</span>
          </div>
          <button
            onClick={() => setCurrentView('login')}
            className="px-6 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            Login
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold text-gray-900 leading-tight">
            Plan your study-abroad<br />journey with a guided<br />AI counsellor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stop feeling overwhelmed. Get personalized guidance from profile building to university applications—all powered by AI that understands your unique goals.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setCurrentView('signup')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Get Started Free
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Your Profile</h3>
              <p className="text-gray-600">Share your academic background, goals, and preferences</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get AI Guidance</h3>
              <p className="text-gray-600">Receive personalized university recommendations and strategy</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Take Action</h3>
              <p className="text-gray-600">Follow guided tasks to complete your applications</p>
            </div>
          </div>
        </div>
      </div>
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

  // Dashboard Component
  const Dashboard = () => {
    const getProfileStrength = () => {
      if (!profile) return { academics: 'weak', exams: 'weak', documents: 'weak' };
      
      const gpaNum = parseFloat(profile.gpa);
      const academics = gpaNum >= 3.5 ? 'strong' : gpaNum >= 3.0 ? 'average' : 'weak';
      const exams = profile.ielts === 'completed' && profile.gre === 'completed' ? 'strong' : 
                    profile.ielts === 'completed' || profile.gre === 'completed' ? 'average' : 'weak';
      const documents = profile.sopStatus === 'ready' ? 'strong' : 
                       profile.sopStatus === 'draft' ? 'average' : 'weak';
      
      return { academics, exams, documents };
    };

    const strength = getProfileStrength();
    const stage = getCurrentStage();

    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Target className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold">AI Counsellor</span>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-4 py-2 rounded-lg ${currentView === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Home className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentView('ai-counsellor')}
                  className={`px-4 py-2 rounded-lg ${currentView === 'ai-counsellor' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentView('universities')}
                  className={`px-4 py-2 rounded-lg ${currentView === 'universities' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <BookOpen className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.name}</span>
              <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg">
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600">Here's your study-abroad journey progress</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Current Stage */}
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <h2 className="text-xl font-semibold mb-4">Current Stage</h2>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600">{stage}</span>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className={`h-2 rounded ${stage.includes('Building') ? 'bg-blue-600' : 'bg-blue-200'}`} />
                  <div className={`h-2 rounded ${stage.includes('Discovering') ? 'bg-blue-600' : 'bg-blue-200'}`} />
                  <div className={`h-2 rounded ${stage.includes('Finalizing') ? 'bg-blue-600' : 'bg-blue-200'}`} />
                  <div className={`h-2 rounded ${stage.includes('Preparing') ? 'bg-blue-600' : 'bg-blue-200'}`} />
                </div>
              </div>

              {/* Profile Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <h2 className="text-xl font-semibold mb-4">Profile Summary</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Education</p>
                    <p className="font-semibold">{profile?.degree} in {profile?.major}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Target Degree</p>
                    <p className="font-semibold">{profile?.targetDegree}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Target Year</p>
                    <p className="font-semibold">{profile?.targetYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget Range</p>
                    <p className="font-semibold">${profile?.budgetRange}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Preferred Countries</p>
                    <p className="font-semibold">{profile?.preferredCountries?.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Profile Strength */}
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <h2 className="text-xl font-semibold mb-4">Profile Strength</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Academics</span>
                      <span className={`font-semibold ${strength.academics === 'strong' ? 'text-green-600' : strength.academics === 'average' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {strength.academics.toUpperCase()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${strength.academics === 'strong' ? 'bg-green-600 w-full' : strength.academics === 'average' ? 'bg-yellow-600 w-2/3' : 'bg-red-600 w-1/3'}`} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Exams</span>
                      <span className={`font-semibold ${strength.exams === 'strong' ? 'text-green-600' : strength.exams === 'average' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {strength.exams.toUpperCase()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${strength.exams === 'strong' ? 'bg-green-600 w-full' : strength.exams === 'average' ? 'bg-yellow-600 w-2/3' : 'bg-red-600 w-1/3'}`} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Documents</span>
                      <span className={`font-semibold ${strength.documents === 'strong' ? 'text-green-600' : strength.documents === 'average' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {strength.documents.toUpperCase()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${strength.documents === 'strong' ? 'bg-green-600 w-full' : strength.documents === 'average' ? 'bg-yellow-600 w-2/3' : 'bg-red-600 w-1/3'}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Universities Status */}
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <h2 className="text-xl font-semibold mb-4">Universities</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">{shortlistedUniversities.length}</p>
                    <p className="text-sm text-gray-600 mt-1">Shortlisted</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">{lockedUniversities.length}</p>
                    <p className="text-sm text-gray-600 mt-1">Locked</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600">{todos.filter(t => t.completed).length}/{todos.length}</p>
                    <p className="text-sm text-gray-600 mt-1">Tasks Done</p>
                  </div>
                </div>
              </div>
            </div>

            {/* To-Do List Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border">
                <h2 className="text-xl font-semibold mb-4">Your To-Do List</h2>
                <div className="space-y-3">
                  {todos.slice(0, 8).map(todo => (
                    <div key={todo.id} className="flex items-start space-x-3">
                      <button
                        onClick={() => {
                          setTodos(todos.map(t => 
                            t.id === todo.id ? { ...t, completed: !t.completed } : t
                          ));
                        }}
                        className="mt-1"
                      >
                        {todo.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                          {todo.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentView('ai-counsellor')}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Talk to AI Counsellor
                </button>
              </div>

              {lockedUniversities.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <AlertCircle className="w-6 h-6 text-yellow-600 mb-2" />
                  <h3 className="font-semibold text-yellow-900 mb-2">Action Required</h3>
                  <p className="text-sm text-yellow-800 mb-4">
                    You haven't locked any universities yet. Lock at least one university to unlock application guidance.
                  </p>
                  <button
                    onClick={() => setCurrentView('universities')}
                    className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                  >
                    Browse Universities
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // AI Counsellor Chat Component
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
        // Simulate AI response (in production, call actual API)
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
        return `Based on your profile, here's my assessment:\n\n**Academic Strength**: Your ${userProfile?.gpa} GPA in ${userProfile?.major} shows ${parseFloat(userProfile?.gpa) >= 3.5 ? 'strong' : 'moderate'} academic performance.\n\n**Exam Status**: ${userProfile?.ielts === 'completed' ? 'Great! Your IELTS is complete.' : 'You need to complete your IELTS exam.'} ${userProfile?.gre === 'completed' ? 'GRE is also done.' : 'GRE is still pending.'}\n\n**Recommendations**: ${parseFloat(userProfile?.gpa) >= 3.5 ? 'You can aim for top-tier universities.' : 'Focus on target and safe universities while preparing for exams to strengthen your profile.'}`;
      }
      
      if (input.includes('recommend') || input.includes('university') || input.includes('universities')) {
        const budget = userProfile?.budgetRange || '20000-40000';
        const maxBudget = parseInt(budget.split('-')[1]) || 40000;
        
        const recommendations = sampleUniversities
          .filter(uni => uni.tuitionPerYear <= maxBudget)
          .slice(0, 3);
        
        let response = `Based on your budget of $${budget} and preferences for ${userProfile?.preferredCountries?.join(', ')}, here are my recommendations:\n\n`;
        
        recommendations.forEach(uni => {
          response += `**${uni.name}** (${uni.country}) - ${uni.category.toUpperCase()}\n`;
          response += `• ${uni.program}\n`;
          response += `• Tuition: $${uni.tuitionPerYear.toLocaleString()}/year\n`;
          response += `• Why: ${uni.why}\n`;
          response += `• Risks: ${uni.risks}\n\n`;
        });
        
        return response + "Would you like me to shortlist any of these universities for you?";
      }
      
      if (input.includes('shortlist')) {
        const uniName = sampleUniversities.find(u => input.includes(u.name.toLowerCase()));
        if (uniName && !shortlist.find(u => u.id === uniName.id)) {
          setShortlistedUniversities([...shortlist, uniName]);
          return `I've added ${uniName.name} to your shortlist! You now have ${shortlist.length + 1} universities shortlisted. Would you like to explore more options or lock one for application?`;
        }
        return "I can help you shortlist universities. Which university would you like to add to your shortlist?";
      }
      
      if (input.includes('lock')) {
        if (shortlist.length === 0) {
          return "You need to shortlist universities first before locking them. Would you like me to recommend some universities?";
        }
        const uniName = shortlist[0];
        if (!locked.find(u => u.id === uniName.id)) {
          setLockedUniversities([...locked, uniName]);
          
          // Add application-specific todos
          const newTodos = [
            { id: Date.now() + 1, title: `Complete application form for ${uniName.name}`, completed: false, category: 'application' },
            { id: Date.now() + 2, title: `Prepare SOP for ${uniName.name}`, completed: false, category: 'documents' },
            { id: Date.now() + 3, title: `Get recommendation letters for ${uniName.name}`, completed: false, category: 'documents' },
            { id: Date.now() + 4, title: `Prepare financial documents for ${uniName.name}`, completed: false, category: 'documents' }
          ];
          setTodos([...todos, ...newTodos]);
          
          return `Excellent! I've locked ${uniName.name} for you. This means you're committing to apply here. I've added specific tasks to your to-do list for this application. Let's make sure your profile is strong enough for this university!`;
        }
      }
      
      if (input.includes('task') || input.includes('todo')) {
        const incompleteTasks = todos.filter(t => !t.completed);
        if (incompleteTasks.length === 0) {
          return "Great job! You've completed all your current tasks. Focus on researching universities and improving your profile.";
        }
        return `You have ${incompleteTasks.length} pending tasks:\n\n${incompleteTasks.slice(0, 5).map(t => `• ${t.title}`).join('\n')}\n\nLet me know if you need help with any of these!`;
      }
      
      return `I'm here to help you with your study-abroad journey! I can help you:\n\n• Analyze your profile strengths and gaps\n• Recommend universities based on your goals\n• Shortlist and lock universities\n• Create and manage tasks\n• Answer questions about applications\n\nWhat would you like to know?`;
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Target className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold">AI Counsellor</span>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <Home className="w-5 h-5" />
                </button>
                <button className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600">
                  <MessageSquare className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentView('universities')}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <BookOpen className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.name}</span>
              <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg">
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white rounded-xl shadow-sm border min-h-[600px] flex flex-col">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold text-gray-900">AI Counsellor Chat</h1>
              <p className="text-gray-600 mt-1">Ask me anything about your study-abroad journey</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Start a conversation</h3>
                  <p className="text-gray-500">Ask me about university recommendations, profile analysis, or application guidance</p>
                </div>
              )}

              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-4 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <Loader className="w-5 h-5 animate-spin text-gray-600" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 border-t">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
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

  // Universities Page Component
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
        
        // Add application tasks
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

    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Target className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold">AI Counsellor</span>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <Home className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentView('ai-counsellor')}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
                <button className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600">
                  <BookOpen className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.name}</span>
              <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-lg">
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Universities</h1>
            <p className="text-gray-600">Find the best universities that match your profile and goals</p>
          </div>

          <div className="flex gap-3 mb-6">
            {['all', 'dream', 'target', 'safe'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === cat 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 border hover:bg-gray-50'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {filteredUniversities.map(university => {
              const isShortlisted = shortlistedUniversities.find(u => u.id === university.id);
              const isLocked = lockedUniversities.find(u => u.id === university.id);

              return (
                <div key={university.id} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{university.name}</h3>
                      <p className="text-gray-600">{university.country} • {university.program}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      university.category === 'dream' ? 'bg-purple-100 text-purple-700' :
                      university.category === 'target' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {university.category.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm">
                      <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">${university.tuitionPerYear.toLocaleString()}/year</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Target className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">Acceptance: {university.acceptanceRate}%</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Why this fits:</p>
                    <p className="text-sm text-gray-600">{university.why}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Potential risks:</p>
                    <p className="text-sm text-gray-600">{university.risks}</p>
                  </div>

                  <div className="flex gap-3">
                    {!isLocked && (
                      <button
                        onClick={() => handleShortlist(university)}
                        disabled={isShortlisted}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                          isShortlisted
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                      >
                        {isShortlisted ? 'Shortlisted' : 'Shortlist'}
                      </button>
                    )}
                    {isLocked ? (
                      <button
                        onClick={() => handleUnlock(university)}
                        className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition flex items-center justify-center gap-2"
                      >
                        <Unlock className="w-4 h-4" />
                        Unlock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleLock(university)}
                        disabled={!isShortlisted}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                          !isShortlisted
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
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
