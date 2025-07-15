import { useState, useEffect } from 'react';
import { ChevronDown, IndianRupee, TrendingUp, Shield, Smartphone, BarChart3, PieChart, Calendar, ArrowRight, Star, Check } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center mb-6 mx-auto animate-pulse">
              <IndianRupee className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-600 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">ExpenseTracker</h2>
          <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-slate-600 to-slate-800 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-600 mt-4 animate-pulse">Loading your financial dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden">
      /* Navigation */
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-slate-700 to-slate-900 rounded-lg flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">ExpenseTracker</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button
              className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/register')}
            >
              Sign up
            </button>
            <button
              className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/login')}
            >
              Sign in
            </button>
          </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-slate-100/20 to-gray-100/20"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              Master Your
              <span className="block bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Track expenses, manage budgets, and achieve your financial goals with our intelligent expense tracking platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/register')} className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                Start Using Free
              </button>
              <button className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-slate-400 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Floating Dashboard Preview */}
          <div className="mt-16 relative">
            <div 
              className="transform transition-all duration-1000"
              style={{
                transform: `translateY(${scrollY * 0.2}px) rotateX(${scrollY * 0.02}deg)`,
              }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-slate-700 to-slate-900 rounded-lg flex items-center justify-center">
                      <IndianRupee className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-semibold text-slate-900">ExpenseTracker</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Total Income</p>
                        <p className="text-2xl font-bold text-emerald-700">₹5,247.80</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-emerald-600" />
                    </div>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Total Expenses</p>
                        <p className="text-2xl font-bold text-rose-700">₹3,182.45</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-rose-600" />
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Current Balance</p>
                        <p className="text-2xl font-bold text-slate-800">₹2,065.35</p>
                      </div>
                      <PieChart className="w-8 h-8 text-slate-600" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Recent Transactions</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-sm text-slate-600">Grocery Shopping</span>
                        <span className="text-sm font-medium text-rose-700">-₹125.5</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-sm text-slate-600">Salary Deposit</span>
                        <span className="text-sm font-medium text-emerald-700">+₹2,500</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-slate-600">Coffee Shop</span>
                        <span className="text-sm font-medium text-rose-700">-₹8.75</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Budget Overview</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">Monthly Rent</span>
                          <span className="text-slate-900">₹1,200 / ₹1,200</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-slate-600 h-2 rounded-full w-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">Groceries</span>
                          <span className="text-slate-900">₹285 / ₹400</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-emerald-600 h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Powerful Features for
              <span className="block text-slate-700">Smart Money Management</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to take control of your finances, all in one beautiful and intuitive platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Smart Analytics",
                description: "Get deep insights into your spending patterns with AI-powered analytics and personalized recommendations.",
                color: "from-slate-600 to-slate-800"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Bank-Level Security",
                description: "Your financial data is protected with 256-bit encryption and industry-leading security measures.",
                color: "from-emerald-600 to-emerald-800"
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Mobile First",
                description: "Access your finances anywhere with our responsive design and native mobile apps.",
                color: "from-stone-600 to-stone-800"
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Budget Planning",
                description: "Create and track budgets with intelligent forecasting and automated alerts.",
                color: "from-amber-600 to-amber-800"
              },
              {
                icon: <PieChart className="w-8 h-8" />,
                title: "Visual Reports",
                description: "Beautiful charts and graphs that make understanding your finances simple and engaging.",
                color: "from-blue-600 to-blue-800"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Goal Tracking",
                description: "Set financial goals and track your progress with motivating visualizations and milestones.",
                color: "from-indigo-600 to-indigo-800"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-slate-200 ${
                  visibleSections.has('features') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white" data-animate>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            visibleSections.has('pricing') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Completely Free
              <span className="block text-slate-700">No Hidden Costs</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              ExpenseTracker is 100% free for everyone. No subscriptions, no premium features, no limitations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Personal",
                price: "Free Forever",
                description: "Perfect for individual users",
                features: ["Unlimited transactions", "Advanced analytics", "Mobile app access", "Budget planning", "Goal tracking", "Email support", "Data export", "Custom categories"],
                color: "border-slate-300 ring-2 ring-slate-300",
                button: "bg-gradient-to-r from-slate-700 to-slate-900 text-white hover:shadow-lg",
                popular: true
              },
              {
                name: "Business",
                price: "Free Forever",
                description: "For teams and businesses",
                features: ["Everything in Personal", "Team collaboration", "Advanced reporting", "Multi-user access", "Priority support", "API access", "Custom integrations", "Dedicated dashboard"],
                color: "border-slate-400 ring-2 ring-slate-400",
                button: "bg-gradient-to-r from-slate-600 to-slate-800 text-white hover:shadow-lg",
                popular: true
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-8 shadow-lg ${plan.color} transition-all duration-500 transform hover:scale-105 ${
                  visibleSections.has('pricing') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      100% Free
                    </div>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-slate-900 mb-2">{plan.price}</div>
                  <p className="text-slate-600">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${plan.button}`}>
                  Get Started - Free
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-700 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already taken control of their financial future with ExpenseTracker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/register')} className="bg-white text-slate-900 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                Start Using Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ExpenseTracker</span>
              </div>
              <p className="text-slate-400">
                Empowering you to take control of your financial future with intelligent expense tracking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;