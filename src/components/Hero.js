import React, { useEffect, useState } from 'react';
import './Hero.css';
import { useLanguage } from '../hooks/useLanguage';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const { t } = useLanguage();
  
  const words = t('hero.roles');
  const currentWord = words[currentWordIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < currentWord.length) {
        setDisplayText(currentWord.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        // Kelime tamamlandı, biraz bekle sonra sil
        setTimeout(() => {
          setDisplayText('');
          setCurrentIndex(0);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }, 2000);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentIndex, currentWord, currentWordIndex, words]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="particles"></div>
        <div className="gradient-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-greeting">
              <span className="greeting-emoji">👋</span>
              <span>{t('hero.greeting')}</span>
            </div>
            
            <h1 className="hero-name">
              <span className="firstname">{t('hero.name').split(' ')[0]}</span>
              <span className="lastname">{t('hero.name').split(' ')[1]}</span>
            </h1>
            
            <div className="hero-title">
              <span className="static-text">{t('hero.title')} </span>
              <span className="typing-text">{displayText}</span>
              <span className="cursor">|</span>
            </div>
            
            <p className="hero-description">
              {t('hero.description')}
            </p>
            
            <div className="hero-actions">
              <button 
                onClick={() => scrollToSection('projects')} 
                className="btn btn-primary"
              >
                <i className="fas fa-code"></i>
                {t('hero.viewProjects')}
              </button>
              
              <a 
                href="assets/resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <i className="fas fa-download"></i>
                {t('hero.downloadCV')}
              </a>
            </div>
            
            <div className="hero-social">
              <a href="https://github.com/yusufgulumser" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/yusufgulumser" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-image">
              <img 
                src="assets/photo.jpg" 
                alt="Yusuf Gülümser" 
                className="profile-photo"
              />
              <div className="floating-elements">
                <div className="floating-element element-1">
                  <i className="fab fa-react"></i>
                </div>
                <div className="floating-element element-2">
                  <i className="fab fa-js-square"></i>
                </div>
                <div className="floating-element element-3">
                  <i className="fab fa-node-js"></i>
                </div>
                <div className="floating-element element-4">
                  <i className="fab fa-mobile-alt"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>{t('hero.scrollDown')}</span>
        </div>
      </div>
    </section>
  );
};

export default Hero; 