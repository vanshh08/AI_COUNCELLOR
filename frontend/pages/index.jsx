import React, { useState, useEffect, useRef } from 'react';
import { Camera, User, LogOut, Lock, Unlock, CheckCircle, Circle, MessageSquare, Send, Loader, BookOpen, Target, TrendingUp, DollarSign, Calendar, Award, AlertCircle, ChevronRight, Home, Settings, Sparkles, Globe, Zap, Star, Users, ArrowRight } from 'lucide-react';

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
  const [previousView, setPreviousView] = useState(null);

  const navigate = (view) => {
    setPreviousView(currentView);
    setCurrentView(view);
  };

  const goBack = () => {
    if (previousView) {
      setCurrentView(previousView);
      setPreviousView(null);
    }
  };

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

  const LandingPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white overflow-hidden">
        {/* Multi-colored animated background elements - SUPER COLORFUL */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-blob" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-blob" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-blob" style={{ animationDelay: '3.5s' }}></div>
          <div className="absolute top-0 right-1/3 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '1.2s' }}></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">AI Counsellor</span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('login')} className="px-6 py-2 rounded-full border-2 border-white/50 hover:border-white hover:bg-white/10 transition duration-300 font-semibold backdrop-blur">
              Login
            </button>
            <button onClick={() => navigate('signup')} className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 transition duration-300 font-bold shadow-lg shadow-purple-600/50">
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative z-10 px-6 py-16 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="text-sm font-bold px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/30 to-cyan-600/30 border border-purple-500/50 text-purple-200">✨ AI-Powered Intelligence</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black leading-tight">
                Your Personal AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse">Study Abroad Guide</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Stop feeling overwhelmed. Start making confident decisions. Let AI guide every step of your study-abroad journey with personalized recommendations, smart matching, and real-time support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button 
                  onClick={() => navigate('signup')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-600/60 transition duration-300 flex items-center justify-center gap-2 group"
                >
                  Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button 
                  onClick={() => navigate('demo')}
                  className="px-8 py-4 border-2 border-white/50 rounded-full font-bold text-lg hover:border-white hover:bg-white/10 transition duration-300 backdrop-blur"
                >
                  See It In Action
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-3xl font-bold text-cyan-400">1000+</p>
                  <p className="text-sm text-gray-400">Universities Listed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-pink-400">50+</p>
                  <p className="text-sm text-gray-400">Countries Covered</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-400">99%</p>
                  <p className="text-sm text-gray-400">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-pink-600/40 to-cyan-600/40 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-2 border-purple-400/50 rounded-3xl p-8 backdrop-blur-lg shadow-2xl">
                <div className="space-y-6">
                  {/* Animated Card 1 */}
                  <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-purple-500/30 rounded-2xl p-6 transform hover:scale-105 transition duration-300 cursor-pointer">
                    <Target className="w-8 h-8 text-purple-300 mb-3" />
                    <p className="font-bold text-lg text-purple-200">Dream Universities</p>
                    <p className="text-sm text-gray-400 mt-2">Your top aspirations</p>
                  </div>

                  {/* Animated Card 2 */}
                  <div className="bg-gradient-to-br from-cyan-600/30 to-blue-600/30 border border-cyan-500/30 rounded-2xl p-6 transform hover:scale-105 transition duration-300 cursor-pointer">
                    <CheckCircle className="w-8 h-8 text-cyan-300 mb-3" />
                    <p className="font-bold text-lg text-cyan-200">Smart Matching</p>
                    <p className="text-sm text-gray-400 mt-2">AI-powered selections</p>
                  </div>

                  {/* Animated Card 3 */}
                  <div className="bg-gradient-to-br from-pink-600/30 to-rose-600/30 border border-pink-500/30 rounded-2xl p-6 transform hover:scale-105 transition duration-300 cursor-pointer">
                    <Zap className="w-8 h-8 text-pink-300 mb-3" />
                    <p className="font-bold text-lg text-pink-200">Real-Time Guidance</p>
                    <p className="text-sm text-gray-400 mt-2">Always here to help</p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-2xl opacity-30 animate-blob" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>

          {/* Features Section - Colorful Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-24">
            {/* Feature 1 */}
            <div className="group">
              <div className="bg-gradient-to-br from-purple-600/20 to-transparent border-2 border-purple-500/50 rounded-2xl p-8 backdrop-blur hover:border-purple-400 transition duration-300 hover:shadow-2xl hover:shadow-purple-600/40 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-purple-300">AI-Powered</h3>
                <p className="text-gray-300 leading-relaxed">Get personalized recommendations powered by advanced Claude AI technology for your perfect university match.</p>
                <div className="mt-4 text-sm text-purple-400 font-semibold">Learn more →</div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="bg-gradient-to-br from-cyan-600/20 to-transparent border-2 border-cyan-500/50 rounded-2xl p-8 backdrop-blur hover:border-cyan-400 transition duration-300 hover:shadow-2xl hover:shadow-cyan-600/40 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-cyan-300">Smart Matching</h3>
                <p className="text-gray-300 leading-relaxed">Discover Dream, Target, and Safe universities tailored to your profile, budget, and career goals.</p>
                <div className="mt-4 text-sm text-cyan-400 font-semibold">Explore →</div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="bg-gradient-to-br from-pink-600/20 to-transparent border-2 border-pink-500/50 rounded-2xl p-8 backdrop-blur hover:border-pink-400 transition duration-300 hover:shadow-2xl hover:shadow-pink-600/40 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-pink-300">Real-Time Tasks</h3>
                <p className="text-gray-300 leading-relaxed">Stay organized with AI-generated task lists that adapt to your progress every step of the way.</p>
                <div className="mt-4 text-sm text-pink-400 font-semibold">Get started →</div>
              </div>
            </div>
          </div>

          {/* Additional Features Row - RAINBOW COLORS */}
          <div className="grid md:grid-cols-4 gap-4 mt-16">
            <div className="bg-gradient-to-br from-yellow-500/30 via-orange-500/20 to-transparent border-2 border-yellow-500/60 rounded-xl p-6 backdrop-blur hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/30 transition duration-300">
              <BookOpen className="w-8 h-8 text-yellow-300 mb-3" />
              <p className="font-bold text-yellow-300">Personalized Profiles</p>
              <p className="text-xs text-gray-400 mt-1">Tailored to you</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/30 via-emerald-500/20 to-transparent border-2 border-green-500/60 rounded-xl p-6 backdrop-blur hover:border-green-400 hover:shadow-lg hover:shadow-green-500/30 transition duration-300">
              <Users className="w-8 h-8 text-green-300 mb-3" />
              <p className="font-bold text-green-300">Expert Support</p>
              <p className="text-xs text-gray-400 mt-1">24/7 Assistance</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/30 via-red-500/20 to-transparent border-2 border-orange-500/60 rounded-xl p-6 backdrop-blur hover:border-orange-400 hover:shadow-lg hover:shadow-orange-500/30 transition duration-300">
              <TrendingUp className="w-8 h-8 text-orange-300 mb-3" />
              <p className="font-bold text-orange-300">Success Tracking</p>
              <p className="text-xs text-gray-400 mt-1">Real-time Updates</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-transparent border-2 border-indigo-500/60 rounded-xl p-6 backdrop-blur hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/30 transition duration-300">
              <Star className="w-8 h-8 text-indigo-300 mb-3" />
              <p className="font-bold text-indigo-300">Premium Results</p>
              <p className="text-xs text-gray-400 mt-1">Elite Universities</p>
            </div>
          </div>

          {/* CTA Section - MEGA COLORFUL */}
          <div className="mt-24 text-center">
            <div className="inline-block w-full px-4">
              <div className="bg-gradient-to-r from-purple-600/40 via-pink-600/40 to-cyan-600/40 border-2 border-transparent bg-clip-padding backdrop-blur-lg rounded-3xl p-12 shadow-2xl relative overflow-hidden group hover:border-purple-400 transition">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-cyan-600/10 group-hover:from-purple-600/20 group-hover:via-pink-600/20 group-hover:to-cyan-600/20 rounded-3xl transition"></div>
                <div className="relative z-10">
                  <h2 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300">
                    Ready to Transform Your Future? ✨
                  </h2>
                  <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                    Join thousands of students who've found their perfect university match. Stop guessing, start succeeding with AI-powered guidance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => navigate('signup')}
                      className="px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-600/60 transition duration-300 inline-flex items-center justify-center gap-2 text-white"
                    >
                      Start Your Journey Now <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => navigate('demo')}
                      className="px-10 py-4 border-2 border-white rounded-full font-bold text-lg hover:bg-white hover:text-slate-900 transition duration-300"
                    >
                      View Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Cards - COLORFUL */}
          <div className="mt-20 grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border-2 border-blue-500/40 rounded-2xl p-6 backdrop-blur hover:border-blue-400 transition duration-300">
              <p className="text-sm text-gray-300 mb-4">⭐⭐⭐⭐⭐</p>
              <p className="text-gray-200 mb-4">"AI Counsellor helped me find my dream university in just 2 weeks!"</p>
              <p className="text-sm text-blue-300 font-bold">Sarah - Stanford '25</p>
            </div>
            <div className="bg-gradient-to-br from-pink-600/20 to-rose-600/10 border-2 border-pink-500/40 rounded-2xl p-6 backdrop-blur hover:border-pink-400 transition duration-300">
              <p className="text-sm text-gray-300 mb-4">⭐⭐⭐⭐⭐</p>
              <p className="text-gray-200 mb-4">"The AI recommendations were incredibly accurate to my profile."</p>
              <p className="text-sm text-pink-300 font-bold">Priya - MIT '26</p>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/10 border-2 border-green-500/40 rounded-2xl p-6 backdrop-blur hover:border-green-400 transition duration-300">
              <p className="text-sm text-gray-300 mb-4">⭐⭐⭐⭐⭐</p>
              <p className="text-gray-200 mb-4">"Real-time guidance made the entire process stress-free!"</p>
              <p className="text-sm text-green-300 font-bold">Alex - Cambridge '25</p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    );
  };

  const SignUpPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleSignup = (e) => {
      e.preventDefault();
      const newUser = { name: formData.name, email: formData.email };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('onboarding');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 border border-purple-500/30 rounded-3xl shadow-2xl p-8 backdrop-blur-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Join Now</h2>
              <p className="text-gray-400">Start your study-abroad journey today</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition duration-300 mt-2"
              >
                Create Account
              </button>
            </form>

            <p className="text-center mt-6 text-gray-400">
              Already have an account?{' '}
              <button onClick={() => navigate('login')} className="text-purple-400 font-bold hover:text-purple-300">
                Login here
              </button>
            </p>
            <div className="mt-4 pt-4 border-t border-purple-500/30">
              <button onClick={goBack} className="w-full text-center text-sm text-gray-400 hover:text-gray-300 transition">
                ← Back
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
        `}</style>
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
            navigate('dashboard');
          } else {
            navigate('onboarding');
          }
        }
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/50 border border-blue-500/30 rounded-3xl shadow-2xl p-8 backdrop-blur-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">Continue your journey</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transition duration-300 mt-2"
              >
                Sign In
              </button>
            </form>

            <p className="text-center mt-6 text-gray-400">
              Don't have an account?{' '}
              <button onClick={() => navigate('signup')} className="text-blue-400 font-bold hover:text-blue-300">
                Sign up here
              </button>
            </p>
            <div className="mt-4 pt-4 border-t border-blue-500/30">
              <button onClick={goBack} className="w-full text-center text-sm text-gray-400 hover:text-gray-300 transition">
                ← Back
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
        `}</style>
      </div>
    );
  };

  const OnboardingPage = () => {
    const [formData, setFormData] = useState({
      gpa: '',
      gre: '',
      toefl: '',
      workExperience: '',
      budget: '',
      preferredCountries: [],
      interestedProgram: ''
    });

    const steps = [
      { title: 'Academic Profile', icon: BookOpen },
      { title: 'Test Scores', icon: Award },
      { title: 'Preferences', icon: Target },
      { title: 'Budget & Location', icon: DollarSign }
    ];

    const handleComplete = () => {
      const newProfile = {
        ...formData,
        onboardingComplete: true,
        createdAt: new Date()
      };
      setProfile(newProfile);
      localStorage.setItem(`profile_${user.email}`, JSON.stringify(newProfile));
      navigate('dashboard');
    };

    const CurrentStepIcon = steps[onboardingStep].icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Let's Build Your Profile</h1>
            <p className="text-gray-400">Step {onboardingStep + 1} of {steps.length}</p>
          </div>

          {/* Progress bar */}
          <div className="mb-8 flex gap-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={index} className="flex-1">
                  <div className={`h-1 rounded-full mb-2 transition duration-300 ${index <= onboardingStep ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-slate-700'}`}></div>
                  <p className={`text-xs font-semibold text-center ${index <= onboardingStep ? 'text-white' : 'text-gray-500'}`}>{step.title}</p>
                </div>
              );
            })}
          </div>

          {/* Content */}
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <CurrentStepIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">{steps[onboardingStep].title}</h2>
            </div>

            <div className="space-y-6">
              {onboardingStep === 0 && (
                <>
                  <div>
                    <label className="block text-white font-semibold mb-2">Your GPA</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={formData.gpa}
                      onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                      placeholder="3.8"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Work Experience (years)</label>
                    <input
                      type="text"
                      value={formData.workExperience}
                      onChange={(e) => setFormData({ ...formData, workExperience: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                      placeholder="2-3 years"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Interested Program</label>
                    <input
                      type="text"
                      value={formData.interestedProgram}
                      onChange={(e) => setFormData({ ...formData, interestedProgram: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., MS Computer Science"
                    />
                  </div>
                </>
              )}

              {onboardingStep === 1 && (
                <>
                  <div>
                    <label className="block text-white font-semibold mb-2">GRE Score</label>
                    <input
                      type="number"
                      min="260"
                      max="340"
                      value={formData.gre}
                      onChange={(e) => setFormData({ ...formData, gre: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                      placeholder="320"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">TOEFL/IELTS Score</label>
                    <input
                      type="text"
                      value={formData.toefl}
                      onChange={(e) => setFormData({ ...formData, toefl: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., 110 TOEFL or 8.5 IELTS"
                    />
                  </div>
                </>
              )}

              {onboardingStep === 2 && (
                <div>
                  <label className="block text-white font-semibold mb-4">Preferred Countries</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['USA', 'Canada', 'Australia', 'Germany', 'UK', 'Singapore'].map(country => (
                      <button
                        key={country}
                        onClick={() => {
                          const updated = formData.preferredCountries.includes(country)
                            ? formData.preferredCountries.filter(c => c !== country)
                            : [...formData.preferredCountries, country];
                          setFormData({ ...formData, preferredCountries: updated });
                        }}
                        className={`py-3 rounded-xl font-semibold transition ${
                          formData.preferredCountries.includes(country)
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-slate-700/50 border border-purple-500/30 text-gray-300 hover:border-purple-500/60'
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {onboardingStep === 3 && (
                <div>
                  <label className="block text-white font-semibold mb-2">Annual Budget (USD)</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                    placeholder="$50,000 - $100,000"
                  />
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-purple-500/30">
              <button
                onClick={() => onboardingStep > 0 && setOnboardingStep(onboardingStep - 1)}
                className="flex-1 px-6 py-3 border border-purple-500/30 rounded-xl text-white font-semibold hover:bg-slate-700/50 transition disabled:opacity-50"
                disabled={onboardingStep === 0}
              >
                Back
              </button>
              {onboardingStep < steps.length - 1 ? (
                <button
                  onClick={() => setOnboardingStep(onboardingStep + 1)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
                >
                  Complete Setup
                </button>
              )}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
        `}</style>
      </div>
    );
  };

  const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('universities');

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Top Navigation */}
        <nav className="relative z-20 sticky top-0 bg-gradient-to-r from-slate-900/80 to-purple-900/80 backdrop-blur-xl border-b border-purple-500/20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate('dashboard')}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </button>
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold">AI Counsellor</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={goBack}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <button
                onClick={() => {
                  setUser(null);
                  setPreviousView(null);
                  navigate('landing');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
            <p className="text-gray-400">Continue building your study-abroad profile</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <StatCard icon={BookOpen} title="Profile Strength" value="85%" color="from-blue-600 to-cyan-600" />
            <StatCard icon={Target} title="Universities" value={shortlistedUniversities.length} color="from-purple-600 to-pink-600" />
            <StatCard icon={CheckCircle} title="Tasks Complete" value={todos.filter(t => t.completed).length} color="from-green-600 to-emerald-600" />
            <StatCard icon={Zap} title="AI Insights" value="12" color="from-orange-600 to-red-600" />
          </div>

          {/* Tabs */}
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 border border-purple-500/30 rounded-2xl backdrop-blur-xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-purple-500/20">
              {['universities', 'tasks', 'chat'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 font-semibold transition ${
                    activeTab === tab
                      ? 'bg-gradient-to-b from-purple-600/30 to-transparent border-b-2 border-purple-500 text-white'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'universities' && (
                <UniversitiesTab universities={sampleUniversities} shortlisted={shortlistedUniversities} locked={lockedUniversities} setShortlistedUniversities={setShortlistedUniversities} setLockedUniversities={setLockedUniversities} />
              )}
              {activeTab === 'tasks' && (
                <TasksTab todos={todos} setTodos={setTodos} user={user} />
              )}
              {activeTab === 'chat' && (
                <ChatTab chatMessages={chatMessages} setChatMessages={setChatMessages} />
              )}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
        `}</style>
      </div>
    );
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/60 transition">
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );

  const UniversitiesTab = ({ universities, shortlisted, locked, setShortlistedUniversities, setLockedUniversities }) => {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {universities.map(uni => {
          const isShortlisted = shortlisted.find(s => s.id === uni.id);
          const isLocked = locked.find(l => l.id === uni.id);

          return (
            <div key={uni.id} className={`bg-gradient-to-br border rounded-2xl p-6 transition hover:shadow-lg ${
              isLocked
                ? 'from-pink-500/10 to-transparent border-pink-500/30 hover:shadow-pink-500/20'
                : isShortlisted
                ? 'from-purple-500/10 to-transparent border-purple-500/30 hover:shadow-purple-500/20'
                : 'from-slate-700/50 to-transparent border-purple-500/20 hover:border-purple-500/40'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold">{uni.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      uni.category === 'dream' ? 'bg-yellow-500/20 text-yellow-300' :
                      uni.category === 'target' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {uni.category.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <Globe className="w-4 h-4" /> {uni.country}
                  </p>
                </div>
                {isLocked ? <Unlock className="w-5 h-5 text-pink-400" /> : <Lock className="w-5 h-5 text-gray-500" />}
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Program</p>
                  <p className="text-white font-semibold">{uni.program}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Acceptance Rate</p>
                  <p className="text-white font-semibold">{uni.acceptanceRate}%</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const isAlreadyShortlisted = shortlisted.find(s => s.id === uni.id);
                    if (isAlreadyShortlisted) {
                      setShortlistedUniversities(shortlisted.filter(s => s.id !== uni.id));
                    } else {
                      setShortlistedUniversities([...shortlisted, uni]);
                    }
                  }}
                  className={`flex-1 py-2 rounded-lg font-semibold transition ${
                    isShortlisted
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                  }`}
                >
                  {isShortlisted ? '✓ Shortlisted' : 'Shortlist'}
                </button>
                <button
                  onClick={() => {
                    const isAlreadyLocked = locked.find(l => l.id === uni.id);
                    if (isAlreadyLocked) {
                      setLockedUniversities(locked.filter(l => l.id !== uni.id));
                    } else {
                      setLockedUniversities([...locked, uni]);
                    }
                  }}
                  className={`flex-1 py-2 rounded-lg font-semibold transition ${
                    isLocked
                      ? 'bg-pink-600 text-white hover:bg-pink-700'
                      : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                  }`}
                >
                  {isLocked ? '🔓 Locked' : 'Lock'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const TasksTab = ({ todos, setTodos, user }) => {
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
      if (newTask.trim()) {
        const task = {
          id: Date.now(),
          text: newTask,
          completed: false,
          createdAt: new Date()
        };
        setTodos([...todos, task]);
        localStorage.setItem(`todos_${user.email}`, JSON.stringify([...todos, task]));
        setNewTask('');
      }
    };

    return (
      <div>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            className="flex-1 px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Add a new task..."
          />
          <button
            onClick={handleAddTask}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center gap-4 bg-slate-700/30 border border-purple-500/20 rounded-xl p-4 hover:border-purple-500/40 transition">
              <button
                onClick={() => {
                  const updatedTodos = todos.map(t =>
                    t.id === todo.id ? { ...t, completed: !t.completed } : t
                  );
                  setTodos(updatedTodos);
                  localStorage.setItem(`todos_${user.email}`, JSON.stringify(updatedTodos));
                }}
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition ${
                  todo.completed
                    ? 'bg-purple-600 border-purple-600'
                    : 'border-purple-500/30 hover:border-purple-500/60'
                }`}
              >
                {todo.completed && <CheckCircle className="w-5 h-5" />}
              </button>
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                {todo.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ChatTab = ({ chatMessages, setChatMessages }) => {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);

    const handleSendMessage = () => {
      if (message.trim()) {
        setChatMessages([...chatMessages, { id: Date.now(), text: message, sender: 'user' }]);
        setMessage('');

        setTimeout(() => {
          setChatMessages(prev => [...prev, {
            id: Date.now() + 1,
            text: "I'm analyzing your profile and will provide personalized recommendations soon!",
            sender: 'ai'
          }]);
        }, 500);
      }
    };

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    return (
      <div className="flex flex-col h-96">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-slate-800/30 rounded-xl">
          {chatMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-center">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                Start chatting with your AI Counsellor!
              </p>
            </div>
          ) : (
            <>
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-slate-700/50 text-gray-300'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Ask me anything..."
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  // Demo Page Component
  const DemoPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Back Button */}
        <button
          onClick={goBack}
          className="relative z-20 m-6 flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition"
        >
          <ChevronRight className="w-5 h-5 rotate-180" /> Back
        </button>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Watch How It Works</h1>
            <p className="text-xl text-gray-400">Discover the power of AI-powered study abroad guidance</p>
          </div>

          {/* Video Demo Placeholder */}
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 border border-purple-500/30 rounded-3xl backdrop-blur-xl overflow-hidden mb-8">
            <div className="aspect-video w-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-24 h-24 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400">AI Counsellor Demo Video Coming Soon!</p>
                <p className="text-sm text-gray-500 mt-2">Check back to see our interactive walkthrough</p>
              </div>
            </div>
          </div>

          {/* Demo Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 rounded-2xl p-6 backdrop-blur hover:border-purple-500/60 transition">
              <BookOpen className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Profile Assessment</h3>
              <p className="text-gray-400">AI analyzes your academic profile and creates personalized recommendations</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30 rounded-2xl p-6 backdrop-blur hover:border-blue-500/60 transition">
              <Target className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Smart Matching</h3>
              <p className="text-gray-400">Get Dream, Target, and Safe universities matched to your profile</p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/30 rounded-2xl p-6 backdrop-blur hover:border-pink-500/60 transition">
              <Zap className="w-8 h-8 text-pink-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Real-Time Guidance</h3>
              <p className="text-gray-400">Get instant AI assistance with your application journey</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => navigate('signup')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition duration-300 inline-flex items-center gap-2"
            >
              Ready to Start? <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
        `}</style>
      </div>
    );
  };

  // Render the appropriate view
  if (!user) {
    if (currentView === 'demo') return <DemoPage />;
    if (currentView === 'login') return <LoginPage />;
    if (currentView === 'signup') return <SignUpPage />;
    return <LandingPage />;
  }

  if (currentView === 'onboarding') return <OnboardingPage />;
  return <DashboardPage />;
}
