import React, { useState, useEffect } from 'react';
import './App.css';
import { LanguageProvider } from './hooks/useLanguage';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { trackPageView, trackTimeOnSite, trackPerformance, trackError } from './utils/analytics';

// Loading Screen Component
const LoadingScreen = () => (
    <div className="loading-screen">
    <div className="loading-animation">
      <div className="loading-spinner"></div>
      <p>Loading Portfolio...</p>
      </div>
    </div>
  );

// Main App Content
const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Initialize Google Analytics tracking
    trackPageView(window.location.pathname);
    trackTimeOnSite();
    trackPerformance();
    
    // Error boundary for analytics
    window.addEventListener('error', (event) => {
      trackError(event.error, 'global');
    });
    
    // Loading screen timer
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Scroll animasyonlarını loading tamamlandıktan sonra başlat
      setTimeout(() => {
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        }, observerOptions);

        // Animasyon yapılacak elementleri seç
        const animateElements = document.querySelectorAll(
          '.project-card, .skill-category, .contact-info, .contact-form-container, .about-text, .about-timeline, .about-stats, .soft-skills, .certifications, .timeline-item, .quality-item, .stat-card'
        );

        animateElements.forEach(el => {
          observer.observe(el);
        });

        // Cleanup function'ı return et
        return () => {
          animateElements.forEach(el => observer.unobserve(el));
        };
      }, 100);
      
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Track theme toggle
    const { trackThemeToggle } = require('./utils/analytics');
    trackThemeToggle(newTheme);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
