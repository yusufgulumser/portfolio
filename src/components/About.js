import React from 'react';
import './About.css';
import { useLanguage } from '../hooks/useLanguage';

const About = () => {
  const { t } = useLanguage();
  const experiences = [
    {
      id: 1,
      year: t('about.experience.eteration.period'),
      title: t('about.experience.eteration.title'),
      company: t('about.experience.eteration.company'),
      description: t('about.experience.eteration.description'),
    },
    {
      id: 2,
      year: t('about.experience.personal.period'),
      title: t('about.experience.personal.title'),
      company: t('about.experience.personal.company'),
      description: t('about.experience.personal.description'),
    },
    {
      id: 3,
      year: t('about.experience.education.period'),
      title: t('about.experience.education.title'),
      company: t('about.experience.education.company'),
      description: t('about.experience.education.description'),
    },
  ];

  const stats = [
    { number: '6+', label: t('about.stats.projects') },
    { number: '3+', label: t('about.stats.experience') },
    { number: '5+', label: t('about.stats.clients') },
    { number: '100%', label: t('about.stats.success') },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-header">
          <span className="section-subtitle">{t('about.subtitle')}</span>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-description">
            {t('about.description')}
          </p>
        </div>

        <div className="about-content">
          <div className="about-text animate-on-scroll">
            <div className="about-story">
              <h3>{t('about.story.title')}</h3>
              <p>
                {t('about.story.para1')}
              </p>
              <p>
                {t('about.story.para2')}
              </p>
              <p>
                {t('about.story.para3')}
              </p>
            </div>

            <div className="about-qualities">
              <h3>{t('about.values.title')}</h3>
              <div className="qualities-grid">
                <div className="quality-item">
                  <div className="quality-icon">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="quality-content">
                    <h4>{t('about.values.continuousLearning.title')}</h4>
                    <p>{t('about.values.continuousLearning.description')}</p>
                  </div>
                </div>
                
                <div className="quality-item">
                  <div className="quality-icon">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="quality-content">
                    <h4>{t('about.values.mobileFocused.title')}</h4>
                    <p>{t('about.values.mobileFocused.description')}</p>
                  </div>
                </div>
                
                <div className="quality-item">
                  <div className="quality-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <div className="quality-content">
                    <h4>{t('about.values.innovativeSolutions.title')}</h4>
                    <p>{t('about.values.innovativeSolutions.description')}</p>
                  </div>
                </div>
                
                <div className="quality-item">
                  <div className="quality-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className="quality-content">
                    <h4>{t('about.values.passion.title')}</h4>
                    <p>{t('about.values.passion.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="about-timeline animate-on-scroll">
            <h3>{t('about.experience.title')}</h3>
            <div className="timeline">
              {experiences.map((exp) => (
                <div key={exp.id} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-year">{exp.year}</div>
                    <h4 className="timeline-title">{exp.title}</h4>
                    <div className="timeline-company">{exp.company}</div>
                    <p className="timeline-description">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about-stats animate-on-scroll">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 