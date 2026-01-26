"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Intersection Observer for scroll animations
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

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600&display=swap');
        
        :root {
          --primary: #1a1a2e;
          --accent: #0f4c75;
          --highlight: #3282b8;
          --light: #f8f9fa;
          --warning: #ff6b6b;
          --success: #51cf66;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          color: var(--primary);
          background: var(--light);
          overflow-x: hidden;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f4c75 0%, #1a1a2e 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .hero::before {
          content: '';
          position: absolute;
          width: 150%;
          height: 150%;
          background: 
            radial-gradient(circle at 20% 50%, rgba(50, 130, 184, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(255, 107, 107, 0.2) 0%, transparent 50%);
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }

        .hero-content {
          max-width: 1200px;
          position: relative;
          z-index: 1;
          text-align: center;
          animation: fadeInUp 1s ease-out;
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

        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 900;
          color: white;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        .hero h1 span {
          background: linear-gradient(120deg, #3282b8, #51cf66);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero p {
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
          animation: fadeInUp 1s ease-out 0.4s both;
        }

        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease-out 0.6s both;
        }

        .btn {
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3282b8, #51cf66);
          color: white;
          box-shadow: 0 10px 30px rgba(50, 130, 184, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(50, 130, 184, 0.6);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
        }

        /* Stats Bar */
        .stats {
          background: white;
          padding: 3rem 2rem;
          display: flex;
          justify-content: center;
          gap: 4rem;
          flex-wrap: wrap;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.05);
        }

        .stat-item {
          text-align: center;
          animation: fadeInUp 1s ease-out both;
        }

        .stat-item:nth-child(1) { animation-delay: 0.8s; }
        .stat-item:nth-child(2) { animation-delay: 1s; }
        .stat-item:nth-child(3) { animation-delay: 1.2s; }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 900;
          background: linear-gradient(135deg, var(--accent), var(--highlight));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #666;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
        }

        /* Features Section */
        .features {
          padding: 6rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          text-align: center;
          margin-bottom: 1rem;
          font-weight: 900;
        }

        .section-subtitle {
          text-align: center;
          color: #666;
          font-size: 1.2rem;
          margin-bottom: 4rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
          margin-top: 3rem;
        }

        .feature-card {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, var(--accent), var(--highlight));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-icon {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, var(--accent), var(--highlight));
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 30px rgba(50, 130, 184, 0.3);
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .feature-card p {
          color: #666;
          line-height: 1.7;
          font-size: 1rem;
        }

        /* How It Works */
        .how-it-works {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 6rem 2rem;
        }

        .steps {
          max-width: 1000px;
          margin: 4rem auto 0;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .step {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
          animation: fadeInLeft 0.8s ease-out both;
        }

        .step:nth-child(even) {
          flex-direction: row-reverse;
          animation: fadeInRight 0.8s ease-out both;
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .step-number {
          min-width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--accent), var(--highlight));
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 900;
          box-shadow: 0 10px 30px rgba(50, 130, 184, 0.4);
          flex-shrink: 0;
        }

        .step-content {
          flex: 1;
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .step-content h3 {
          font-size: 1.5rem;
          margin-bottom: 0.8rem;
          font-weight: 700;
        }

        .step-content p {
          color: #666;
          line-height: 1.7;
        }

        /* CTA Section */
        .final-cta {
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #1a1a2e 0%, #0f4c75 100%);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .final-cta::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(50, 130, 184, 0.4) 0%, transparent 70%);
          top: -100px;
          right: -100px;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .final-cta h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          color: white;
          margin-bottom: 1.5rem;
          font-weight: 900;
          position: relative;
          z-index: 1;
        }

        .final-cta p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.3rem;
          margin-bottom: 2.5rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }

        /* Footer */
        footer {
          background: var(--primary);
          color: white;
          padding: 3rem 2rem;
          text-align: center;
        }

        footer p {
          opacity: 0.8;
          margin-bottom: 1rem;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }

        .footer-links a {
          color: white;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .footer-links a:hover {
          opacity: 1;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero {
            padding: 2rem 1.5rem;
          }

          .stats {
            gap: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .step {
            flex-direction: column !important;
          }

          .step-number {
            min-width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }
        }

        /* Scroll Animation Observer */
        .observe {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .observe.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>
              Reach <span>Every Recruiter.</span>
              <br />
              Scale <span>Every Opportunity.</span>
            </h1>
            <p>
              Send personalized cold emails to hundreds of recruiters at once.
              Save time, stay professional, and land your dream job faster.
            </p>
            <div className="cta-buttons">
              <a href="/register" className="btn btn-primary">
                Start Free Trial
              </a>
              <a href="#how-it-works" className="btn btn-secondary">
                See How It Works
              </a>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="stats">
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Emails Sent Daily</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Delivery Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3x</div>
            <div className="stat-label">Faster Outreach</div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2 className="section-title">
            Powerful Features for Modern Job Seekers
          </h2>
          <p className="section-subtitle">
            Everything you need to run professional, large-scale email campaigns
            without the hassle
          </p>

          <div className="features-grid">
            <div className="feature-card observe">
              <div className="feature-icon">✉️</div>
              <h3>Smart Personalization</h3>
              <p>
                Customize each email with recruiter names, companies, roles, and
                more. Our AI ensures every message feels personal and genuine.
              </p>
            </div>

            <div className="feature-card observe">
              <div className="feature-icon">📊</div>
              <h3>Bulk Upload & Manage</h3>
              <p>
                Import hundreds of contacts via CSV or Excel. Organize, segment,
                and manage your recruiter database effortlessly.
              </p>
            </div>

            <div className="feature-card observe">
              <div className="feature-icon">⚡</div>
              <h3>Automated Scheduling</h3>
              <p>
                Set it and forget it. Schedule campaigns, control send rates, and
                avoid spam filters with intelligent throttling.
              </p>
            </div>

            <div className="feature-card observe">
              <div className="feature-icon">📈</div>
              <h3>Real-Time Analytics</h3>
              <p>
                Track opens, clicks, and responses. Know exactly which recruiters
                are engaging with your outreach.
              </p>
            </div>

            <div className="feature-card observe">
              <div className="feature-icon">🔒</div>
              <h3>Gmail Integration</h3>
              <p>
                Seamlessly connect with Gmail API. Secure, reliable, and respects
                sending limits to protect your account.
              </p>
            </div>

            <div className="feature-card observe">
              <div className="feature-icon">✅</div>
              <h3>Compliance Built-In</h3>
              <p>
                Automatic unsubscribe links, GDPR compliance, and CAN-SPAM
                adherence. Stay professional and legal.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works" id="how-it-works">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started in minutes, not hours</p>

          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Upload Your Contacts</h3>
                <p>
                  Import recruiter emails from CSV, Excel, or manually add them.
                  Include details like name, company, and role for better
                  personalization.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Craft Your Message</h3>
                <p>
                  Create email templates with dynamic variables. Preview how each
                  email will look before sending to ensure quality.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Schedule & Send</h3>
                <p>
                  Set your sending schedule, control the pace, and let ReachScale
                  handle the rest. We'll ensure optimal deliverability.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Track & Follow Up</h3>
                <p>
                  Monitor engagement in real-time. See who opened your emails and
                  respond to interested recruiters directly from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta">
          <h2>Ready to Transform Your Job Search?</h2>
          <p>
            Join thousands of job seekers who've accelerated their career journey
            with ReachScale
          </p>
          <div className="cta-buttons">
            <a href="#" className="btn btn-primary">
              Get Started Free
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <p>&copy; 2026 ReachScale. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
            <a href="#">Documentation</a>
          </div>
        </footer>
      </div>
    </>
  );
}