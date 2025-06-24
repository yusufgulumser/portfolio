import React from 'react';
import './Contact.css';
import { useLanguage } from '../hooks/useLanguage';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-header">
          <span className="section-subtitle">{t('contact.subtitle')}</span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-description">
            {t('contact.description')}
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info animate-on-scroll">
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fab fa-github"></i>
              </div>
              <div className="contact-details">
                <h3>GitHub</h3>
                <p>@yusufgulumser</p>
                <a href="https://github.com/yusufgulumser" target="_blank" rel="noopener noreferrer" className="contact-link">
                  {t('contact.githubAction')}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>gulumseryusuf1@gmail.com</p>
                <a href="mailto:gulumseryusuf1@gmail.com" className="contact-link">
                  {t('contact.emailAction')}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fab fa-linkedin"></i>
              </div>
              <div className="contact-details">
                <h3>LinkedIn</h3>
                <p>@yusufgulumser</p>
                <a href="https://linkedin.com/in/yusufgulumser" target="_blank" rel="noopener noreferrer" className="contact-link">
                  {t('contact.linkedinAction')}
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-details">
                <h3>{t('contact.location')}</h3>
                <p>{t('contact.locationDetails')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 