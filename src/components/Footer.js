import React from 'react';
import './Footer.css';
import { useLanguage } from '../hooks/useLanguage';
import { trackCVDownload } from '../utils/analytics';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="footer-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="container">
        <div className="footer-content">
          <div className="animated-waves">
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
            <div className="wave wave-3"></div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>
                © {currentYear} Yusuf Gülümser. {t('footer.copyright')}
              </p>
            </div>
            <div className="footer-bottom-links">
              <a 
                href="assets/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cv-download-btn"
                onClick={() => trackCVDownload()}
              >
                <i className="fas fa-download"></i>
                <span>{t('footer.cvDownload')}</span>
              </a>
            </div>
          </div>
        </div>

        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Yukarı git">
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
    </footer>
  );
};

export default Footer; 