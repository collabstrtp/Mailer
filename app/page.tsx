"use client";

import { Mail, Send, FileText, Sparkles, Zap, Shield, Clock } from 'lucide-react';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".observe").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }

        .observe {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .observe.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .gradient-text {
          background: linear-gradient(120deg, #3b82f6, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-stat {
          background: linear-gradient(135deg, #2563eb, #4f46e5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Navbar */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Mailer
                </span>
              </div>

              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  How It Works
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Pricing
                </a>
              </div>

              <div className="flex items-center gap-4">
                <button onClick={() => router.push("/login")} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
                  Login
                </button>
                <button
                  onClick={() => router.push("/register")} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  AI-Powered Email Automation
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                  Send Thousands of{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Personalized Emails
                  </span>{' '}
                  in One Click
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Transform your cold email outreach with AI-generated content, bulk sending capabilities, and automatic attachment management. Perfect for job applications, marketing campaigns, and professional networking.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => router.push("/register")}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-xl transition-all font-semibold text-lg flex items-center justify-center gap-2">
                    Get Started Free
                    <Send className="w-5 h-5" />
                  </button>
                  <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all font-semibold text-lg">
                    Watch Demo
                  </button>
                </div>
                <div className="flex items-center gap-8 pt-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">Secure & Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-gray-600">Lightning Fast</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">AI Email Assistant</p>
                        <p className="text-sm text-gray-500">Crafting your message...</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-2">Recipients</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">john@company.com</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">jane@startup.io</span>
                          <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">+247 more</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-2">Attachments</p>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">Resume.pdf, Cover_Letter.pdf</span>
                        </div>
                      </div>
                      <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Send to All Recipients
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-white py-12 px-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-16 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-extrabold gradient-stat mb-2">
                10K+
              </div>
              <div className="text-gray-600 text-base uppercase tracking-wider font-medium">
                Emails Sent Daily
              </div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-extrabold gradient-stat mb-2">
                95%
              </div>
              <div className="text-gray-600 text-base uppercase tracking-wider font-medium">
                Delivery Rate
              </div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-extrabold gradient-stat mb-2">
                3x
              </div>
              <div className="text-gray-600 text-base uppercase tracking-wider font-medium">
                Faster Outreach
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-8 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-center font-extrabold mb-4 text-gray-900">
            Powerful Features for Modern Job Seekers
          </h2>
          <p className="text-center text-gray-600 text-xl max-w-2xl mx-auto mb-16">
            Everything you need to run professional, large-scale email campaigns without the hassle
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            {[
              {
                icon: <Sparkles className="text-white" />,
                title: "AI-Powered Email Automation",
                desc: "Generate personalized email content based on job descriptions and recipient profiles. Our AI crafts compelling messages that get responses."
              },
              {
                icon: "✉️",
                title: "Bulk Email Sending",
                desc: "Send to hundreds or thousands of recipients simultaneously. Upload email lists and let our system handle the distribution efficiently."
              },
              {
                icon: <FileText className="text-white" />,
                title: "Smart Attachments",
                desc: "Automatically attach resumes, cover letters, and documents to your emails. Manage multiple attachment sets for different campaigns."
              },
              {
                icon: "🔒",
                title: "Secure Authentication",
                desc: "Your credentials are hashed and encrypted. Use Gmail app passwords for secure access without exposing your main password."
              },
              {
                icon: <Clock className="text-white" />,
                title: "Time-Saving Automation",
                desc: "What used to take hours now takes minutes. Automate your entire email workflow and focus on what matters most."
              },
              {
                icon: "⚡",
                title: "One-Click Campaigns",
                desc: "Launch entire email campaigns with a single click. Perfect for job applications, cold outreach, and marketing campaigns."
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="observe bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>

                <div className="w-[70px] h-[70px] bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-blue-500/30">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24 px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-center font-extrabold mb-4 text-gray-900">
              How It Works
            </h2>
            <p className="text-center text-gray-600 text-xl mb-16">
              Get started in minutes, not hours
            </p>

            <div className="space-y-12">
              {[
                {
                  num: "1",
                  title: "Connect Your Email",
                  desc: "Login with your email and secure 16-digit app password. Your credentials are encrypted and stored safely."
                },
                {
                  num: "2",
                  title: "Craft Your Message",
                  desc: "Upload recipient lists, add your subject and content. Use our AI to generate personalized messages based on job descriptions."
                },
                {
                  num: "3",
                  title: "Send with Attachments",
                  desc: "Click send and reach hundreds of recipients instantly. Attach resumes and cover letters automatically."
                },
                {
                  num: "4",
                  title: "Track & Follow Up",
                  desc: "Monitor engagement in real-time. See whom you have sent your emails and track your interested recruiters directly from your dashboard."
                }
              ].map((step, i) => (
                <div
                  key={i}
                  className={`flex flex-col md:flex-row gap-8 items-start ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="flex-shrink-0">
                    <div className="min-w-[80px] h-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-blue-500/30">
                      {step.num}
                    </div>
                  </div>

                  <div className="flex-1 bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 py-24 px-8 text-center text-white relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.4),transparent_70%)] animate-pulse"></div>

          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              Ready to Transform Your Email Outreach?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals using Mailer to accelerate their job search and business growth
            </p>

            <a
              href="#"
              className="inline-block px-12 py-4 rounded-full bg-white text-blue-600 font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:bg-gray-50 transition-all duration-300"
            >
              Get Started Free
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-8 text-center">
          <p className="opacity-80 mb-4">
            &copy; 2026 Mailer. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            <a href="#" className="opacity-80 hover:opacity-100 hover:text-blue-400 transition-all">
              Privacy Policy
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 hover:text-blue-400 transition-all">
              Terms of Service
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 hover:text-blue-400 transition-all">
              Contact Us
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 hover:text-blue-400 transition-all">
              Documentation
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}