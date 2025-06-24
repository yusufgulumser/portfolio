import React, { useState, useEffect } from 'react';
import './Header.css';
import { useLanguage } from '../hooks/useLanguage';
import { trackScrollToSection, trackLanguageChange } from '../utils/analytics';

const Header = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, currentLanguage, changeLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      
      // Track navigation
      trackScrollToSection(sectionId);
    }
  };

  const navItems = [
    { name: t('header.nav.home'), href: 'home' },
    { name: t('header.nav.about'), href: 'about' },
    { name: t('header.nav.skills'), href: 'skills' },
    { name: t('header.nav.projects'), href: 'projects' },
    { name: t('header.nav.contact'), href: 'contact' },
  ];

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'tr' : 'en';
    changeLanguage(newLanguage);
    
    // Track language change
    trackLanguageChange(newLanguage);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-text">YusufDev</span>
            <span className="logo-bracket">/&gt;</span>
          </div>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="nav-link"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <button 
              className="language-toggle"
              onClick={toggleLanguage}
              aria-label="Change language"
              title={`Switch to ${currentLanguage === 'en' ? 'Türkçe' : 'English'}`}
            >
              <div className="language-icons">
                <span className={`lang-flag ${currentLanguage === 'en' ? 'active' : ''}`}>EN</span>
                <span className={`lang-flag ${currentLanguage === 'tr' ? 'active' : ''}`}>TR</span>
              </div>
            </button>
            
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              <div className="theme-icons">
                <i className="fas fa-sun sun-icon"></i>
                <i className="fas fa-moon moon-icon"></i>
              </div>
            </button>
            
            <button
              className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 