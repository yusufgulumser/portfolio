import React, { useState } from 'react';
import './Skills.css';
import { useLanguage } from '../hooks/useLanguage';
import { trackSkillFilter } from '../utils/analytics';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const { t } = useLanguage();

  const skillCategories = {
    frontend: {
      title: t('skills.categories.frontend'),
      icon: 'fas fa-mobile-alt',
      skills: [
        { name: 'React Native', level: 90, icon: 'fab fa-react', color: '#61dafb' },
        { name: 'JavaScript', level: 90, icon: 'fab fa-js-square', color: '#f7df1e' },
        { name: 'React', level: 85, icon: 'fab fa-react', color: '#61dafb' },
        { name: 'TypeScript', level: 90, icon: 'fab fa-js-square', color: '#3178c6' },
        { name: 'HTML5', level: 85, icon: 'fab fa-html5', color: '#e34f26' },
        { name: 'CSS3', level: 80, icon: 'fab fa-css3-alt', color: '#1572b6' },
      ]
    },
    backend: {
      title: t('skills.categories.backend'),
      icon: 'fas fa-server',
      skills: [
        { name: 'Node.js', level: 75, icon: 'fab fa-node-js', color: '#68a063' },
        { name: 'Express.js', level: 75, icon: 'fas fa-code', color: '#000000' },
        { name: 'Nest.js', level: 75, icon: 'fas fa-code', color: '#e0234e' },
        { name: 'MongoDB', level: 70, icon: 'fas fa-database', color: '#47a248' },
        { name: 'REST API', level: 75, icon: 'fas fa-plug', color: '#ff6b35' },
        { name: 'Firebase', level: 70, icon: 'fas fa-fire', color: '#ffca28' },
      ]
    },
    languages: {
      title: t('skills.categories.languages'),
      icon: 'fas fa-code',
      skills: [
        { name: 'JavaScript', level: 90, icon: 'fab fa-js-square', color: '#f7df1e' },
        { name: 'TypeScript', level: 90, icon: 'fab fa-js-square', color: '#3178c6' },
        { name: 'Java', level: 75, icon: 'fab fa-java', color: '#ed8b00' },
        { name: 'C++', level: 70, icon: 'fas fa-code', color: '#00599c' },
        { name: 'Kotlin', level: 65, icon: 'fas fa-mobile-alt', color: '#7f52ff' },
        { name: 'Python', level: 60, icon: 'fab fa-python', color: '#3776ab' },
      ]
    },
    tools: {
      title: t('skills.categories.tools'),
      icon: 'fas fa-tools',
      skills: [
        { name: 'Git', level: 85, icon: 'fab fa-git-alt', color: '#f05032' },
        { name: 'VS Code', level: 95, icon: 'fas fa-code', color: '#007acc' },
        { name: 'Android Studio', level: 80, icon: 'fab fa-android', color: '#3ddc84' },
        { name: 'Xcode', level: 75, icon: 'fab fa-apple', color: '#000000' },
        { name: 'OpenAI API', level: 70, icon: 'fas fa-robot', color: '#00a67e' },
        { name: 'FCM', level: 70, icon: 'fas fa-bell', color: '#ff9900' },
      ]
    }
  };

  const softSkills = [
    { name: t('skills.expertise.problemSolving'), icon: 'fas fa-puzzle-piece' },
    { name: t('skills.expertise.mobileUX'), icon: 'fas fa-mobile-alt' },
    { name: t('skills.expertise.apiIntegration'), icon: 'fas fa-plug' },
    { name: t('skills.expertise.creativity'), icon: 'fas fa-lightbulb' },
    { name: t('skills.expertise.continuousLearning'), icon: 'fas fa-brain' },
    { name: t('skills.expertise.academicSuccess'), icon: 'fas fa-graduation-cap' },
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="skills-header">
          <span className="section-subtitle">{t('skills.subtitle')}</span>
          <h2 className="section-title">{t('skills.title')}</h2>
          <p className="section-description">
            {t('skills.description')}
          </p>
        </div>

        <div className="skills-content">
          {/* Technical Skills */}
          <div className="skill-category animate-on-scroll">
            <div className="category-header">
              <i className={skillCategories[activeTab].icon}></i>
              <h3>{skillCategories[activeTab].title}</h3>
            </div>
            
            <div className="skills-tabs">
              {Object.keys(skillCategories).map((category) => (
                <button
                  key={category}
                  className={`skill-tab ${activeTab === category ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(category);
                    trackSkillFilter(category);
                  }}
                >
                  <i className={skillCategories[category].icon}></i>
                  <span>{skillCategories[category].title}</span>
                </button>
              ))}
            </div>

            <div className="skills-grid">
              {skillCategories[activeTab].skills.map((skill, index) => (
                <div key={index} className="skill-card">
                  <div className="skill-header">
                    <div className="skill-icon" style={{ color: skill.color }}>
                      <i className={skill.icon}></i>
                    </div>
                    <div className="skill-info">
                      <h4>{skill.name}</h4>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                  </div>
                  <div className="skill-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(135deg, ${skill.color}, ${skill.color}80)`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="soft-skills animate-on-scroll">
            <h3>{t('skills.expertise.title')}</h3>
            <div className="soft-skills-grid">
              {softSkills.map((skill, index) => (
                <div key={index} className="soft-skill-item">
                  <div className="soft-skill-icon">
                    <i className={skill.icon}></i>
                  </div>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="certifications animate-on-scroll">
          <h3>{t('skills.services.title')}</h3>
          <div className="certifications-grid">
            <div className="certification-item">
              <div className="cert-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <div className="cert-content">
                <h4>{t('skills.services.mobileApp.title')}</h4>
                <p>{t('skills.services.mobileApp.description')}</p>
              </div>
            </div>
            
            <div className="certification-item">
              <div className="cert-icon">
                <i className="fas fa-globe"></i>
              </div>
              <div className="cert-content">
                <h4>{t('skills.services.webDev.title')}</h4>
                <p>{t('skills.services.webDev.description')}</p>
              </div>
            </div>
            
            <div className="certification-item">
              <div className="cert-icon">
                <i className="fas fa-server"></i>
              </div>
              <div className="cert-content">
                <h4>{t('skills.services.backend.title')}</h4>
                <p>{t('skills.services.backend.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 