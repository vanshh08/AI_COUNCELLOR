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
    const [formData, setFormData] = useState({
      gpa: '',
      major: '',
      degreeLevel: '',
      targetCountry: '',
      englishTest: '',
      englishScore: '',
      aptitudeTest: '',
      aptitudeScore: '',
      workExperience: '',
      preferredIntake: '',
      budget: ''
    });

    const majors = [
      'Computer Science',
      'Information Technology',
      'Data Science',
      'Artificial Intelligence',
      'Software Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Aerospace Engineering',
      'Biomedical Engineering',
      'Business Administration',
      'Finance',
      'Marketing',
      'Economics',
      'Accounting',
      'Human Resources',
      'Psychology',
      'Biology',
      'Chemistry',
      'Physics',
      'Mathematics',
      'Statistics',
      'Architecture',
      'Design',
      'Communications',
      'Journalism',
      'Law',
      'Medicine',
      'Nursing',
      'Pharmacy',
      'Public Health',
      'Environmental Science',
      'Political Science',
      'Sociology',
      'Other'
    ];

    const degreeLevels = [
      'Masters (MS/MA)',
      'MBA',
      'PhD',
      'Bachelors',
      'Associate Degree',
      'Diploma/Certificate'
    ];

    const countries = [
      'USA',
      'Canada',
      'United Kingdom',
      'Australia',
      'Germany',
      'Netherlands',
      'France',
      'Ireland',
      'New Zealand',
      'Singapore',
      'Multiple Countries'
    ];

    const englishTests = [
      'IELTS',
      'TOEFL',
      'PTE',
      'Duolingo',
      'Not Yet Taken',
      'Not Required'
    ];

    const aptitudeTests = [
      'GRE',
      'GMAT',
      'Not Yet Taken',
      'Not Required'
    ];

    const workExperienceOptions = [
      'No Experience',
      'Less than 1 year',
      '1-2 years',
      '2-3 years',
      '3-5 years',
      '5+ years'
    ];

    const intakeOptions = [
      'Fall 2026',
      'Spring 2026',
      'Fall 2027',
      'Spring 2027',
      'Not Sure Yet'
    ];

    const budgetOptions = [
      'Below $20,000/year',
      '$20,000 - $35,000/year',
      '$35,000 - $50,000/year',
      '$50,000 - $70,000/year',
      'Above $70,000/year',
      'Need Full Scholarship'
    ];

    const handleComplete = () => {
      setProfile({ ...formData, onboardingComplete: true });
      
      // Generate dynamic todos based on form data
      const generatedTodos = [];
      let todoId = 1;
      
      if (formData.englishTest === 'Not Yet Taken') {
        generatedTodos.push({ id: todoId++, title: 'Complete English proficiency exam (IELTS/TOEFL)', completed: false });
      } else if (formData.englishTest !== 'Not Required') {
        generatedTodos.push({ id: todoId++, title: `English exam completed (${formData.englishTest})`, completed: true });
      }
      
      if (formData.aptitudeTest === 'Not Yet Taken') {
        generatedTodos.push({ id: todoId++, title: 'Complete aptitude test (GRE/GMAT)', completed: false });
      } else if (formData.aptitudeTest !== 'Not Required') {
        generatedTodos.push({ id: todoId++, title: `Aptitude test completed (${formData.aptitudeTest})`, completed: true });
      }
      
      generatedTodos.push({ id: todoId++, title: 'Gather recommendation letters (2-3)', completed: false });
      generatedTodos.push({ id: todoId++, title: 'Research universities in ' + (formData.targetCountry || 'target countries'), completed: false });
      generatedTodos.push({ id: todoId++, title: 'Draft Statement of Purpose (SOP)', completed: false });
      generatedTodos.push({ id: todoId++, title: 'Prepare academic transcripts', completed: false });
      
      if (formData.budget === 'Need Full Scholarship') {
        generatedTodos.push({ id: todoId++, title: 'Research scholarship opportunities', completed: false });
      }
      
      setTodos(generatedTodos);
      setCurrentView('dashboard');
    };

    const isFormValid = formData.gpa && formData.major && formData.degreeLevel && formData.targetCountry;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">Complete Your Profile</h2>
            <p className="text-gray-400">Help us understand your background to provide personalized recommendations</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Academic Background */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Academic Background
                </h3>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">GPA (out of 4.0 or 10.0)</label>
                <input 
                  type="text" 
                  value={formData.gpa} 
                  onChange={(e) => setFormData({...formData, gpa: e.target.value})} 
                  placeholder="Enter your GPA (e.g., 3.5 or 8.5)"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-400 focus:ring-1 focus:ring-purple-400" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current/Completed Major</label>
                <select 
                  value={formData.major} 
                  onChange={(e) => setFormData({...formData, major: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800">Select your major</option>
                  {majors.map(major => (
                    <option key={major} value={major} className="bg-slate-800">{major}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Degree Level</label>
                <select 
                  value={formData.degreeLevel} 
                  onChange={(e) => setFormData({...formData, degreeLevel: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800">Select degree level</option>
                  {degreeLevels.map(level => (
                    <option key={level} value={level} className="bg-slate-800">{level}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Country</label>
                <select 
                  value={formData.targetCountry} 
                  onChange={(e) => setFormData({...formData, targetCountry: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800">Select target country</option>
                  {countries.map(country => (
                    <option key={country} value={country} className="bg-slate-800">{country}</option>
                  ))}
                </select>
              </div>

              {/* Test Scores */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" /> Test Scores
                </h3>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">English Proficiency Test</label>
                <select 
                  value={formData.englishTest} 
                  onChange={(e) => setFormData({...formData, englishTest: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800">Select test</option>
                  {englishTests.map(test => (
                    <option key={test} value={test} className="bg-slate-800">{test}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">English Test Score</label>
                <input 
                  type="text" 
                  value={formData.englishScore} 
                  onChange={(e) => setFormData({...formData, englishScore: e.target.value})} 
                  placeholder="e.g., 7.5 (IELTS) or 105 (TOEFL)"
                  disabled={formData.englishTest === 'Not Yet Taken' || formData.englishTest === 'Not Required'}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Aptitude Test</label>
                <select 
                  value={formData.aptitudeTest} 
                  onChange={(e) => setFormData({...formData, aptitudeTest: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800">Select test</option>
                  {aptitudeTests.map(test => (
                    <option key={test} value={test} className="bg-slate-800">{test}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Aptitude Test Score</label>
                <input 
                  type="text" 
                  value={formData.aptitudeScore} 
                  onChange={(e) => setFormData({...formData, aptitudeScore: e.target.value})} 
                  placeholder="e.g., 320 (GRE) or 700 (GMAT)"
                  disabled={formData.aptitudeTest === 'Not Yet Taken' || formData.aptitudeTest === 'Not Required'}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed" 
                />
              </div>

              {/* Experience & Preferences */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" /> Experience & Preferences
                </h3>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Work Experience</label>
                <select 
                  value={formData.workExperience} 
                  onChange={(e) => setFormData({...formData, workExperience: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800">Select experience</option>
                  {workExperienceOptions.map(exp => (
                    <option key={exp} value={exp} className="bg-slate-800">{exp}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Intake</label>
                <select 
                  value={formData.preferredIntake} 
                  onChange={(e) => setFormData({...formData, preferredIntake: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800">Select intake</option>
                  {intakeOptions.map(intake => (
                    <option key={intake} value={intake} className="bg-slate-800">{intake}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range (Tuition per year)</label>
                <select 
                  value={formData.budget} 
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800">Select budget range</option>
                  {budgetOptions.map(budget => (
                    <option key={budget} value={budget} className="bg-slate-800">{budget}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button 
              onClick={handleComplete} 
              disabled={!isFormValid}
              className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Complete Profile & Continue
            </button>
            
            {!isFormValid && (
              <p className="text-center text-gray-500 text-sm mt-3">
                Please fill in GPA, Major, Degree Level, and Target Country to continue
              </p>
            )}
          </div>
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
    const [isTyping, setIsTyping] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const messagesEndRef = useRef(null);

    // Quick suggestion categories
    const quickSuggestions = [
      { icon: '🎓', text: 'Recommend universities for me', category: 'universities' },
      { icon: '📝', text: 'How to prepare for GRE/IELTS?', category: 'exams' },
      { icon: '💰', text: 'Scholarship opportunities', category: 'scholarships' },
      { icon: '✍️', text: 'Help me write my SOP', category: 'sop' },
      { icon: '📊', text: 'Analyze my profile strength', category: 'profile' },
      { icon: '🛂', text: 'Visa process explained', category: 'visa' },
    ];

    // Context-aware follow-up suggestions based on last topic
    const getFollowUpSuggestions = (lastMessage) => {
      const msg = lastMessage?.toLowerCase() || '';
      
      if (msg.includes('university') || msg.includes('college')) {
        return [
          { text: 'Show me Dream universities', icon: '⭐' },
          { text: 'Show me Safe universities', icon: '✅' },
          { text: 'Compare tuition costs', icon: '💵' },
          { text: 'What are admission requirements?', icon: '📋' },
        ];
      }
      if (msg.includes('gre') || msg.includes('ielts') || msg.includes('exam')) {
        return [
          { text: 'Best study resources?', icon: '📚' },
          { text: 'How long to prepare?', icon: '⏰' },
          { text: 'What score do I need?', icon: '🎯' },
          { text: 'Online vs coaching classes?', icon: '🤔' },
        ];
      }
      if (msg.includes('scholarship') || msg.includes('funding')) {
        return [
          { text: 'Merit-based scholarships', icon: '🏆' },
          { text: 'Need-based financial aid', icon: '💳' },
          { text: 'Research assistantships', icon: '🔬' },
          { text: 'How to apply for scholarships?', icon: '📝' },
        ];
      }
      if (msg.includes('sop') || msg.includes('statement') || msg.includes('essay')) {
        return [
          { text: 'Review my SOP draft', icon: '📝' },
          { text: 'Common SOP mistakes', icon: '❌' },
          { text: 'SOP for specific university', icon: '🎓' },
          { text: 'How to make SOP stand out?', icon: '✨' },
        ];
      }
      if (msg.includes('visa') || msg.includes('immigration')) {
        return [
          { text: 'Documents needed for visa', icon: '📄' },
          { text: 'Visa interview tips', icon: '🎤' },
          { text: 'Processing times', icon: '⏳' },
          { text: 'Financial proof requirements', icon: '💰' },
        ];
      }
      // Default follow-ups
      return [
        { text: 'Tell me more', icon: '💬' },
        { text: 'What should I do next?', icon: '➡️' },
        { text: 'Any tips for me?', icon: '💡' },
        { text: 'Create a task for this', icon: '✅' },
      ];
    };

    const getAIResponse = (question) => {
      const q = question.toLowerCase();
      
      // Profile-aware responses
      const profileInfo = profile ? `Based on your profile (${profile.major || 'your field'}, targeting ${profile.targetCountry || 'abroad'}):` : '';
      
      // University/Colleges questions
      if (q.includes('university') || q.includes('college') || q.includes('recommend') || q.includes('which uni')) {
        return {
          text: `🎓 **University Recommendations** ${profileInfo}

Based on your profile, here's my strategic recommendation:

**🌟 Dream Schools (Reach):**
• Stanford, MIT, CMU - Top-tier but highly competitive
• Acceptance rate: 4-10%

**🎯 Target Schools (Good Match):**
• University of Toronto, TU Munich, Georgia Tech
• Acceptance rate: 15-25%

**✅ Safe Schools (Likely Admit):**
• Arizona State, University of Arizona
• Acceptance rate: 35%+

**💡 My Advice:**
Build a balanced list with 2-3 from each category. Don't put all eggs in one basket!

Would you like me to explain why specific universities fit your profile?`,
          actions: ['View Universities', 'Shortlist Universities'],
        };
      }
      
      // Exam questions
      if (q.includes('exam') || q.includes('gre') || q.includes('gmat') || q.includes('ielts') || q.includes('toefl') || q.includes('test') || q.includes('prepare')) {
        return {
          text: `📝 **Exam Preparation Strategy**

Let me create a personalized study plan for you:

**🎯 Target Scores:**
| Exam | Good | Competitive | Top Schools |
|------|------|-------------|-------------|
| GRE | 310+ | 320+ | 330+ |
| IELTS | 6.5 | 7.0 | 7.5+ |
| TOEFL | 90+ | 100+ | 110+ |
| GMAT | 650+ | 700+ | 730+ |

**📅 Recommended Timeline:**
• **Month 1-2:** Learn fundamentals, take diagnostic test
• **Month 3-4:** Practice sections, mock tests weekly
• **Month 5:** Final revision, official test

**🔥 Top Resources:**
• GRE: Magoosh, Manhattan Prep, ETS Official
• IELTS: British Council, IDP practice tests
• TOEFL: ETS TOEFL Go!

**💡 Pro Tip:** Start with a diagnostic test to identify weak areas. Focus 70% of time on weaknesses!

Which exam are you targeting? I can create a detailed study schedule.`,
          actions: ['Create Study Plan', 'Add Exam Task'],
        };
      }
      
      // GPA questions
      if (q.includes('gpa') || q.includes('grade') || q.includes('academic') || q.includes('cgpa')) {
        const gpaValue = profile?.gpa || 'your GPA';
        return {
          text: `📊 **GPA Analysis & Strategy**

${profile?.gpa ? `Your GPA: **${profile.gpa}** - Let me analyze this:` : 'Let me help you understand GPA requirements:'}

**📈 GPA Benchmarks:**
| GPA Range | What It Means | Strategy |
|-----------|---------------|----------|
| 3.8+ | Excellent! Top schools accessible | Leverage this strength |
| 3.5-3.8 | Very Good | Strong for most programs |
| 3.0-3.5 | Average | Focus on other areas |
| <3.0 | Needs Support | Strong GRE + experience needed |

**🔧 If Your GPA is Lower:**
1. ✅ Ace remaining semesters
2. ✅ Get 320+ on GRE to compensate
3. ✅ Strong work experience (2+ years)
4. ✅ Research publications help a lot
5. ✅ Compelling SOP explaining circumstances

**💡 Good News:** Many successful admits have 3.0-3.3 GPA but stellar profiles otherwise!

Want me to suggest universities that match your academic profile?`,
          actions: ['Find Matching Universities', 'Improve Profile Tips'],
        };
      }
      
      // Recommendation letter questions
      if (q.includes('recommendation') || q.includes('letter') || q.includes('recommender') || q.includes('lor')) {
        return {
          text: `💼 **Recommendation Letter Masterclass**

Strong LoRs can make or break your application!

**👥 Who to Ask (Priority Order):**
1. Professor who supervised your thesis/project
2. Professor in whose class you excelled
3. Work supervisor (relevant industry)
4. Research mentor

**📋 What to Provide Your Recommender:**
• Your updated resume
• Statement of Purpose draft
• List of universities & deadlines
• Key achievements to highlight
• Why you chose them

**⏰ Timeline:**
| Action | When |
|--------|------|
| Identify recommenders | 2 months before |
| Request formally | 6 weeks before |
| Send materials | 5 weeks before |
| Gentle reminder | 2 weeks before |
| Thank you note | After submission |

**🚫 Avoid:**
• Asking professors who barely know you
• Last-minute requests
• Not providing context

**💡 Pro Tip:** Schedule a 15-min meeting to discuss your goals. Professors write better when they understand your story!

Need help drafting a request email?`,
          actions: ['Draft Request Email', 'Add LoR Task'],
        };
      }
      
      // Visa questions
      if (q.includes('visa') || q.includes('immigration') || q.includes('permit') || q.includes('f1') || q.includes('f-1')) {
        return {
          text: `🛂 **Visa Application Guide**

Let me walk you through the visa process:

**📋 Required Documents:**
✅ Valid passport (6+ months validity)
✅ University acceptance letter (I-20/CAS)
✅ Financial proof ($30,000-60,000)
✅ Academic transcripts
✅ English test scores
✅ Passport-size photos
✅ Visa fee receipt

**⏰ Country-wise Processing:**
| Country | Visa Type | Time | Fee |
|---------|-----------|------|-----|
| 🇺🇸 USA | F-1 | 2-4 weeks | $185 |
| 🇨🇦 Canada | Study Permit | 4-8 weeks | $150 |
| 🇬🇧 UK | Student Visa | 3 weeks | $400 |
| 🇦🇺 Australia | Student | 2-4 weeks | $450 |
| 🇩🇪 Germany | Student | 4-6 weeks | $75 |

**🎤 Interview Tips (for USA):**
• Be confident & concise
• Know your program details
• Explain career plans clearly
• Show strong ties to home country
• Bring organized documents

**💡 Pro Tip:** Apply for visa slot immediately after receiving I-20. Summer slots fill fast!

Which country's visa do you need help with?`,
          actions: ['Create Visa Checklist', 'Calculate Financial Proof'],
        };
      }
      
      // Tuition/Cost questions
      if (q.includes('tuition') || q.includes('cost') || q.includes('fee') || q.includes('expensive') || q.includes('afford') || q.includes('budget') || q.includes('money')) {
        return {
          text: `💰 **Cost Analysis & Budgeting**

Let me break down the real costs for you:

**📊 Annual Tuition (USD):**
| Country | Public | Private |
|---------|--------|---------|
| 🇺🇸 USA | $25-45K | $45-70K |
| 🇨🇦 Canada | $15-30K | $25-45K |
| 🇬🇧 UK | $20-35K | $30-50K |
| 🇦🇺 Australia | $20-40K | $35-55K |
| 🇩🇪 Germany | FREE-5K | $10-20K |

**🏠 Living Expenses (Monthly):**
• Housing: $800-2000
• Food: $300-500
• Transport: $50-150
• Insurance: $100-200
• Miscellaneous: $200-400

**💡 Money-Saving Strategies:**
1. 🎓 Apply for scholarships (can cover 25-100%)
2. 💼 On-campus jobs (20 hrs/week allowed)
3. 🏠 Shared housing saves $500+/month
4. 📚 Buy used textbooks
5. 🍳 Cook at home

**🔥 Hidden Gems (Low Cost, High Quality):**
• Germany: Often FREE tuition!
• Canada: Affordable + work permits
• Netherlands: €2,000/year for some programs

${profile?.budget ? `Based on your budget (${profile.budget}), I can suggest specific universities.` : 'Tell me your budget and I\'ll find matching universities!'}`,
          actions: ['Calculate Total Cost', 'Find Affordable Universities'],
        };
      }
      
      // Scholarship questions
      if (q.includes('scholarship') || q.includes('funding') || q.includes('financial aid') || q.includes('grant') || q.includes('assistantship')) {
        return {
          text: `🏆 **Scholarship & Funding Guide**

Great news - there's a LOT of money available!

**📚 Types of Funding:**

**1. University Scholarships**
• Merit-based: GPA 3.5+, GRE 320+
• Need-based: Demonstrate financial need
• Diversity scholarships
• Department fellowships

**2. External Scholarships**
| Scholarship | Amount | Eligibility |
|-------------|--------|-------------|
| Fulbright | Full funding | Excellent academics |
| DAAD (Germany) | €850/month | Any field |
| Chevening (UK) | Full funding | Leadership experience |
| Australia Awards | Full funding | Developing countries |
| Rotary Foundation | $30,000 | Service-oriented |

**3. Assistantships (Get Paid to Study!)**
• Teaching Assistant (TA): $15-25K/year
• Research Assistant (RA): $20-35K/year
• Graduate Assistant: $12-20K/year
• Often includes tuition waiver!

**⏰ Application Timeline:**
• Start searching: 8-10 months before
• Apply: 6-8 months before intake
• Most deadlines: October-February

**💡 Pro Tips:**
1. Apply to MANY scholarships (it's a numbers game)
2. Tailor each application
3. Start essays early
4. Get strong recommendations

Want me to find scholarships matching your profile?`,
          actions: ['Find Scholarships', 'Set Deadline Reminders'],
        };
      }
      
      // Statement of Purpose/Essay questions
      if (q.includes('statement') || q.includes('sop') || q.includes('essay') || q.includes('motivation') || q.includes('personal statement')) {
        return {
          text: `✍️ **Statement of Purpose Masterclass**

Your SOP is your voice - let's make it powerful!

**📝 Perfect SOP Structure (500-1000 words):**

**Para 1: The Hook (10%)**
• Start with a compelling story/moment
• What sparked your interest in this field?

**Para 2-3: Academic Journey (30%)**
• Key courses & projects
• Research experience
• Academic achievements

**Para 4: Professional Experience (25%)**
• Work experience & learnings
• Skills developed
• Industry insights gained

**Para 5: Why This Program? (20%)**
• Specific professors/research
• Unique program features
• How it fits your goals

**Para 6: Future Goals (15%)**
• Career objectives (short & long term)
• How you'll contribute
• Why this university specifically

**✅ DO:**
• Be specific & personal
• Show, don't tell
• Research the program
• Connect past → present → future
• Proofread multiple times!

**❌ DON'T:**
• Use clichés ("Since childhood...")
• Be generic (could apply anywhere)
• Focus only on rankings
• Exceed word limit
• Submit without feedback

**💡 Pro Tip:** Write 3 drafts minimum. Get feedback from mentors, professors, and peers.

Would you like me to review your SOP draft or help you outline one?`,
          actions: ['SOP Outline Generator', 'Common Mistakes to Avoid'],
        };
      }
      
      // Profile/Overall questions
      if (q.includes('profile') || q.includes('strong application') || q.includes('chances') || q.includes('competitive') || q.includes('analyze')) {
        return {
          text: `👤 **Profile Strength Analysis**

${profile ? `Let me analyze your profile, ${user?.name}:` : 'Here\'s how to build a strong profile:'}

**📊 Your Profile Breakdown:**

| Component | Weight | Your Status |
|-----------|--------|-------------|
| GPA | 25% | ${profile?.gpa ? (profile.gpa >= 3.5 ? '✅ Strong' : profile.gpa >= 3.0 ? '⚠️ Average' : '❌ Needs work') : '❓ Not set'} |
| Test Scores | 20% | ${profile?.englishTest && profile.englishTest !== 'Not Yet Taken' ? '✅ Completed' : '⚠️ Pending'} |
| Work Experience | 20% | ${profile?.workExperience ? '✅ ' + profile.workExperience : '❓ Not set'} |
| SOP & Essays | 15% | 📝 In progress |
| Recommendations | 10% | 📝 Need to secure |
| Extracurriculars | 10% | Adds uniqueness |

**🎯 Your Estimated Profile Strength: ${profile?.gpa >= 3.5 ? '75-85%' : profile?.gpa >= 3.0 ? '60-70%' : '50-60%'}**

**💪 Your Strengths:**
${profile?.gpa >= 3.5 ? '• Strong academic foundation' : ''}
${profile?.workExperience && profile.workExperience !== 'No Experience' ? '• Professional experience' : ''}
${profile?.englishTest && profile.englishTest !== 'Not Yet Taken' ? '• English proficiency completed' : ''}

**🔧 Areas to Improve:**
${profile?.gpa < 3.5 ? '• Boost GPA or compensate with GRE' : ''}
${!profile?.workExperience || profile.workExperience === 'No Experience' ? '• Gain relevant experience' : ''}
${profile?.englishTest === 'Not Yet Taken' ? '• Complete English proficiency test' : ''}

**🚀 Action Plan:**
1. Focus on your top 2-3 improvement areas
2. Build a balanced university list
3. Start SOP 3 months before deadline
4. Secure strong recommendations

Want me to create a personalized action plan?`,
          actions: ['Create Action Plan', 'Find Matching Universities'],
        };
      }
      
      // Application timeline questions
      if (q.includes('application') || q.includes('deadline') || q.includes('timeline') || q.includes('when to apply') || q.includes('process')) {
        return {
          text: `📋 **Application Timeline & Checklist**

Here's your 12-month roadmap to success:

**📅 Timeline Overview:**

| Month | Tasks |
|-------|-------|
| **12-10 months** | Research universities, start GRE/IELTS prep |
| **9-7 months** | Take standardized tests, shortlist 8-12 universities |
| **6-5 months** | Write SOP drafts, request recommendations |
| **4-3 months** | Finalize applications, gather documents |
| **2-1 months** | Submit applications, pay fees |
| **After submit** | Track status, prepare for interviews |

**✅ Complete Application Checklist:**
- [ ] Transcripts (official)
- [ ] Test scores (GRE/GMAT/IELTS/TOEFL)
- [ ] Statement of Purpose
- [ ] Resume/CV
- [ ] 2-3 Recommendation Letters
- [ ] Passport copy
- [ ] Financial documents
- [ ] Application fee ($50-150 per university)

**⚠️ Important Deadlines:**
• **Fall intake:** December - February
• **Spring intake:** August - October
• Scholarship deadlines are often EARLIER!

**💡 Pro Tips:**
1. Apply to 8-12 universities (mix of dream/target/safe)
2. Submit before deadline (servers crash!)
3. Track everything in a spreadsheet
4. Keep copies of all documents

Shall I create a personalized timeline for your target intake?`,
          actions: ['Create My Timeline', 'Set Deadline Reminders'],
        };
      }
      
      // Help/advice general or greeting
      if (q.includes('help') || q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('start')) {
        return {
          text: `👋 **Hello ${user?.name || 'there'}! I'm your AI Study Abroad Counsellor!**

I'm here to guide you through every step of your journey. Here's what I can help with:

**🎯 What I Can Do:**
• 🎓 Recommend universities based on your profile
• 📝 Guide you through exam preparation
• 💰 Find scholarships & funding
• ✍️ Help with SOP & essays
• 🛂 Explain visa processes
• 📋 Create action plans & timelines
• 📊 Analyze your profile strength

**💬 Try asking me:**
• "Which universities should I apply to?"
• "How do I prepare for GRE in 3 months?"
• "Find scholarships for my profile"
• "Help me write my SOP"
• "What's my profile strength?"

${profile?.targetCountry ? `I see you're targeting **${profile.targetCountry}** - great choice! Let's make it happen.` : 'Tell me about your goals and I\'ll create a personalized plan!'}

What would you like to explore first?`,
          actions: ['Analyze My Profile', 'Explore Universities'],
        };
      }
      
      // Career questions
      if (q.includes('career') || q.includes('job') || q.includes('salary') || q.includes('work') || q.includes('placement') || q.includes('after')) {
        return {
          text: `🚀 **Career & Job Prospects**

Let's look at what awaits after graduation:

**💼 Average Starting Salaries (USD):**
| Field | USA | Canada | UK | Germany |
|-------|-----|--------|-----|---------|
| CS/IT | $85-130K | $65-90K | £40-60K | €50-70K |
| MBA | $100-150K | $70-100K | £50-80K | €60-90K |
| Engineering | $75-110K | $60-85K | £35-55K | €45-65K |
| Data Science | $90-140K | $70-100K | £45-70K | €55-80K |

**📊 Work Visa Options:**
| Country | Post-Study Work |
|---------|-----------------|
| 🇺🇸 USA | OPT: 1-3 years |
| 🇨🇦 Canada | PGWP: 1-3 years |
| 🇬🇧 UK | Graduate Route: 2 years |
| 🇦🇺 Australia | 2-4 years |
| 🇩🇪 Germany | 18 months |

**🎯 Top Employers:**
• Tech: Google, Microsoft, Amazon, Meta
• Finance: Goldman Sachs, JPMorgan
• Consulting: McKinsey, BCG, Bain
• Healthcare: Johnson & Johnson, Pfizer

**💡 Career Boosting Tips:**
1. Do internships during studies
2. Network at career fairs
3. Build LinkedIn presence
4. Join professional associations
5. Get relevant certifications

What career path are you considering?`,
          actions: ['Universities with Best Placements', 'Internship Opportunities'],
        };
      }
      
      // Default helpful response
      return {
        text: `🤔 **Great question!**

I want to give you the best advice possible. Could you tell me more about what specifically you'd like to know?

**Here are some topics I specialize in:**

📚 **Academics & Tests**
• GRE, GMAT, IELTS, TOEFL preparation
• GPA requirements and improvement

🎓 **Universities**
• Personalized recommendations
• Dream vs Target vs Safe schools
• Application requirements

💰 **Finances**
• Tuition costs by country
• Scholarships & funding
• Budgeting tips

📝 **Applications**
• Statement of Purpose guidance
• Recommendation letters
• Application timeline

🛂 **After Admission**
• Visa processes
• Pre-departure checklist
• Career prospects

Just ask me anything specific and I'll dive deep into it!`,
        actions: ['Start with Profile Analysis', 'Explore Universities'],
      };
    };

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
      scrollToBottom();
    }, [chatMessages, isTyping]);

    const handleSendMessage = (messageText = null) => {
      const messageToSend = messageText || input;
      if (!messageToSend.trim()) return;
      
      setShowSuggestions(false);
      setChatMessages(prev => [...prev, { role: 'user', content: messageToSend }]);
      setInput('');
      setIsLoading(true);
      setIsTyping(true);
      
      // Simulate typing delay for more natural feel
      setTimeout(() => {
        const response = getAIResponse(messageToSend);
        setIsTyping(false);
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: response.text,
          actions: response.actions,
          followUps: getFollowUpSuggestions(response.text)
        }]);
        setIsLoading(false);
      }, 1200 + Math.random() * 800); // Random delay between 1.2-2s
    };

    const handleActionClick = (action) => {
      if (action === 'View Universities' || action === 'Explore Universities' || action === 'Find Matching Universities' || action === 'Find Affordable Universities') {
        setCurrentView('universities');
      } else if (action === 'Shortlist Universities') {
        setCurrentView('universities');
      } else {
        handleSendMessage(action);
      }
    };

    // Render message content with markdown-like formatting
    const renderMessageContent = (content) => {
      return content.split('\n').map((line, i) => {
        // Handle headers
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="font-bold text-lg mt-3 mb-2">{line.replace(/\*\*/g, '')}</p>;
        }
        // Handle bullet points
        if (line.startsWith('•') || line.startsWith('-') || line.startsWith('✅') || line.startsWith('✓') || line.startsWith('❌') || line.startsWith('⚠️')) {
          return <p key={i} className="ml-2 my-1">{line}</p>;
        }
        // Handle numbered items
        if (/^\d+\./.test(line)) {
          return <p key={i} className="ml-2 my-1">{line}</p>;
        }
        // Handle table-like content (keep as is for now)
        if (line.includes('|')) {
          return <p key={i} className="font-mono text-sm my-1 text-gray-300">{line}</p>;
        }
        // Regular line
        if (line.trim()) {
          return <p key={i} className="my-1">{line}</p>;
        }
        return <br key={i} />;
      });
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <nav className="bg-black/30 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <button onClick={() => setCurrentView('dashboard')} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"><Home className="w-5 h-5" /> Back to Dashboard</button>
              <span className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" /> AI Counsellor
              </span>
            </div>
            <button onClick={handleLogout} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">{user?.name} - Logout</button>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col h-[calc(100vh-180px)]">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">AI Counsellor Chat</h1>
                  <p className="text-gray-400 text-sm">Your personal study abroad guide • Always here to help</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Initial suggestions when no messages */}
              {chatMessages.length === 0 && showSuggestions && (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Welcome, {user?.name}! 👋</h3>
                    <p className="text-gray-400 max-w-md mx-auto">I'm your AI counsellor. Ask me anything about studying abroad, or click one of the quick options below to get started!</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {quickSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(suggestion.text)}
                        className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 rounded-xl transition text-left group"
                      >
                        <span className="text-2xl mb-2 block">{suggestion.icon}</span>
                        <span className="text-sm text-gray-300 group-hover:text-white transition">{suggestion.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat messages */}
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${msg.role === 'user' ? '' : ''}`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-400">AI Counsellor</span>
                      </div>
                    )}
                    <div className={`rounded-2xl p-4 ${msg.role === 'user' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-white/10 text-gray-100 border border-white/10'}`}>
                      <div className="whitespace-pre-wrap">{renderMessageContent(msg.content)}</div>
                      
                      {/* Action buttons */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                          {msg.actions.map((action, actionIdx) => (
                            <button
                              key={actionIdx}
                              onClick={() => handleActionClick(action)}
                              className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 hover:text-white rounded-lg text-sm font-medium transition flex items-center gap-1"
                            >
                              <Zap className="w-3 h-3" /> {action}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Follow-up suggestions */}
                    {msg.role === 'assistant' && msg.followUps && idx === chatMessages.length - 1 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.followUps.map((followUp, fIdx) => (
                          <button
                            key={fIdx}
                            onClick={() => handleSendMessage(followUp.text)}
                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-full text-xs text-gray-400 hover:text-white transition flex items-center gap-1"
                          >
                            <span>{followUp.icon}</span> {followUp.text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/10 rounded-2xl px-4 py-3 border border-white/10">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 border-t border-white/10">
              {/* Quick reply chips when chatting */}
              {chatMessages.length > 0 && !isLoading && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {['Recommend universities', 'Scholarship options', 'Exam tips', 'Analyze my profile'].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-400 hover:text-white transition"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()} 
                  placeholder="Ask me anything about studying abroad..." 
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-purple-400 focus:ring-1 focus:ring-purple-400" 
                />
                <button 
                  onClick={() => handleSendMessage()} 
                  disabled={isLoading || !input.trim()} 
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
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
