import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  IndianRupee,
  Smartphone,
  ArrowRight,
  Globe,
  Shield,
  TrendingUp,
  PlusCircle,
  BarChart3,
  Calculator,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id^="section-"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">₹</span>
              </div>
              <span className="text-xl font-bold text-slate-800">
                ExpenseTracker
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("section-features")}
                className="cursor-pointer text-slate-600 hover:text-slate-800 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("section-how-it-works")}
                className="cursor-pointer text-slate-600 hover:text-slate-800 transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("section-pricing")}
                className="cursor-pointer text-slate-600 hover:text-slate-800 transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("section-contact")}
                className="cursor-pointer text-slate-600 hover:text-slate-800 transition-colors"
              >
                Contact
              </button>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex space-x-3 ">
              <button
                onClick={() => navigate("/login")}
                className="cursor-pointer px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate("/register")}
                className="cursor-pointer px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Sign up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t animate-slide-down">
            <div className="px-4 py-2 space-y-2">
              <button
                onClick={() => scrollToSection("section-features")}
                className="cursor-pointer block w-full text-left py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("section-how-it-works")}
                className="cursor-pointer block w-full text-left py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("section-pricing")}
                className="cursor-pointer block w-full text-left py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("section-contact")}
                className="cursor-pointer block w-full text-left py-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                Contact
              </button>
              <div className="pt-2 border-t flex space-x-2">
                <button
                  onClick={() => navigate("/login")}
                  className="cursor-pointer px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="cursor-pointer px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-41 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Master Your
                <span className="text-slate-700 block">Financial Future</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Track expenses, manage budgets, and achieve your financial goals
                with our intelligent expense tracking platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/register")}
                  className="cursor-pointer bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-800 transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Using Free
                </button>
                <button className="cursor-pointer border border-slate-300 text-slate-600 px-8 py-4 rounded-lg font-semibold hover:bg-slate-50 transition-all">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Side - App Preview */}
            <div className="relative animate-fade-in-up animation-delay-300">
              {/* Desktop View */}
              <div className="hidden md:block relative">
                <div className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">₹</span>
                    </div>
                    <span className="font-bold text-slate-800">
                      ExpenseTracker
                    </span>
                    <div className="ml-auto flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">
                        Total Income
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        ₹5,247.80
                      </div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">
                        Total Expenses
                      </div>
                      <div className="text-2xl font-bold text-red-600">
                        ₹3,182.45
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">
                        Current Balance
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        ₹2,065.35
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-lg font-semibold text-slate-800 mb-3">
                        Recent Transactions
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">Food</span>
                          <span className="text-sm text-red-600">-₹650</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">Rent</span>
                          <span className="text-sm text-red-600">-₹2,000</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-slate-800 mb-3">
                        Budget Overview
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">July 2025</div>
                        <div className="text-sm">Opening Balance: ₹5,000</div>
                        <div className="text-sm font-semibold text-green-600">
                          Current Balance: ₹2,350
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Views */}
              <div className="md:hidden flex justify-center space-x-4">
                <div className="w-48 bg-black rounded-3xl p-2 transform hover:scale-105 transition-transform duration-500 rotate-3">
                  <div className="bg-white rounded-2xl h-96 overflow-hidden">
                    <div className="bg-gray-100 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-xs">4:56 PM</div>
                        <div className="text-xs">5G</div>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-6 h-6 bg-slate-700 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            ₹
                          </span>
                        </div>
                        <span className="text-sm font-bold">
                          ExpenseTracker
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-600">
                          Total Income
                        </div>
                        <div className="text-lg font-bold text-green-600">
                          ₹200
                        </div>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-600">
                          Total Expenses
                        </div>
                        <div className="text-lg font-bold text-red-600">
                          ₹101
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-600">
                          Current Balance
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          ₹5,099
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-48 bg-black rounded-3xl p-2 transform hover:scale-105 transition-transform duration-500 -rotate-3">
                  <div className="bg-white rounded-2xl h-96 overflow-hidden">
                    <div className="bg-gray-100 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-xs">4:57 PM</div>
                        <div className="text-xs">5G</div>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-6 h-6 bg-slate-700 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            ₹
                          </span>
                        </div>
                        <span className="text-sm font-bold">
                          ExpenseTracker
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="text-sm font-semibold mb-3">
                        Recent Transactions
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-xs">Food</span>
                          <span className="text-xs text-red-600">-₹650</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-xs">Rent</span>
                          <span className="text-xs text-red-600">-₹2,000</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-sm font-semibold mb-2">
                          Budget Overview
                        </div>
                        <div className="text-xs text-gray-600">July 2025</div>
                        <div className="text-xs">Opening Balance: ₹5,000</div>
                        <div className="text-xs font-semibold text-green-600">
                          Current Balance: ₹2,350
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-16 animate-bounce">
          <ChevronDown size={32} className="mx-auto text-slate-400" />
        </div>
      </section>

      {/* Features Section */}
      <section
        id="section-features"
        className={`py-16 bg-white transition-all duration-1000 ${
          isVisible["section-features"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage your personal finances effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-8 h-8 text-white" />,
                title: "Smart Analytics",
                description:
                  "Get deep insights into your spending patterns with AI-powered analytics and personalized recommendations.",
                bgColor: "bg-slate-700",
              },
              {
                icon: <Shield className="w-8 h-8 text-white" />,
                title: "Bank-Level Security",
                description:
                  "Your financial data is protected with 256-bit encryption and industry-leading security measures.",
                bgColor: "bg-emerald-600",
              },
              {
                icon: <Smartphone className="w-8 h-8 text-white" />,
                title: "Mobile First",
                description:
                  "Access your finances anywhere with our responsive design and native mobile apps.",
                bgColor: "bg-slate-600",
              },
              {
                icon: <Calculator className="w-8 h-8 text-white" />,
                title: "Budget Planning",
                description:
                  "Create and track budgets with intelligent forecasting and automated alerts.",
                bgColor: "bg-orange-600",
              },
              {
                icon: <PlusCircle className="w-8 h-8 text-white" />,
                title: "Visual Reports",
                description:
                  "Beautiful charts and graphs that make understanding your finances simple and engaging.",
                bgColor: "bg-blue-600",
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-white" />,
                title: "Goal Tracking",
                description:
                  "Set financial goals and track your progress with motivating visualizations and milestones.",
                bgColor: "bg-purple-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div
                  className={`mx-auto mb-4 w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="section-how-it-works"
        className={`py-16 bg-gray-50 transition-all duration-1000 ${
          isVisible["section-how-it-works"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up",
                description: "Create your free account and set up your profile",
              },
              {
                step: "02",
                title: "Add Transactions",
                description: "Start logging your income and expenses",
              },
              {
                step: "03",
                title: "Track & Analyze",
                description: "Monitor your spending and achieve your goals",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="section-pricing"
        className={`py-16 bg-white transition-all duration-1000 ${
          isVisible["section-pricing"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Simple Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Start for free. No hidden charges. No subscription fees.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center border-2 border-slate-200 shadow-lg">
              <div className="mb-6">
                <div className="text-5xl font-bold text-slate-700 mb-2">
                  FREE
                </div>
                <div className="text-slate-600">Forever</div>
              </div>
              <div className="flex justify-center">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-slate-700 rounded-full"></div>
                    <span>Unlimited transactions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-slate-700 rounded-full"></div>
                    <span>Budget tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-slate-700 rounded-full"></div>
                    <span>Expense analytics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-slate-700 rounded-full"></div>
                    <span>All devices support</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => navigate("/register")}
                className="w-full cursor-pointer bg-slate-700 text-white py-4 rounded-lg font-semibold hover:bg-slate-800 transition-all transform hover:scale-105"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Compatibility */}
      <section
        className={`py-16 bg-gray-900 text-white transition-all duration-1000 ${
          isVisible["section-pricing"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Available Everywhere
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Access your expense tracker from any device, anywhere
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-12 h-12 text-emerald-400" />,
                title: "Web App",
                description: "Access from any browser on desktop or mobile",
              },
              {
                icon: <Smartphone className="w-12 h-12 text-blue-400" />,
                title: "Mobile App",
                description: "Native iOS and Android apps coming soon",
              },
              {
                icon: <Shield className="w-12 h-12 text-purple-400" />,
                title: "Secure & Private",
                description: "Your data is encrypted and secure",
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="mx-auto mb-4 w-20 h-20 bg-gray-800 rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="section-contact"
        className={`py-16 bg-emerald-50 transition-all duration-1000 ${
          isVisible["section-contact"]
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already taken control of their
              financial future with ExpenseTracker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/register")}
                className="bg-slate-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Start Using Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="border-2 border-slate-700 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-700 hover:text-white transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ExpenseTracker</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your personal finance companion
            </p>
            {/* <p className="text-gray-500 text-sm">
              © 2025 ExpenseTracker. All rights reserved.
            </p> */}
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }

        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
