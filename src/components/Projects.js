import React, { useState } from 'react';
import './Projects.css';
import { useLanguage } from '../hooks/useLanguage';
import { trackProjectFilter, trackProjectDemo, trackProjectGithub } from '../utils/analytics';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: 'Gülümser Halı Yıkama',
      category: 'mobile',
      image: 'assets/glmsr.jpg',
      description: 'Halı yıkama hizmetleri için geliştirilmiş tam özellikli mobil uygulama. Müşteri ve admin panelleri ile sipariş yönetimi sistemi.',
      longDescription: 'React Native ile geliştirilen bu uygulama, halı yıkama hizmetlerini yönetmek için kapsamlı bir çözüm sunuyor. Express.js backend, kullanıcı doğrulama, sipariş yönetimi ve gerçek zamanlı güncellemeler sağlıyor. Firebase entegrasyonu ile push bildirimleri ve canlı sipariş takibi mümkün.',
      technologies: ['React Native', 'Express.js', 'MongoDB', 'Firebase', 'FCM'],
      features: [
        'Kullanıcı doğrulama sistemi',
        'Sipariş oluşturma ve takip',
        'Gerçek zamanlı durum güncellemeleri',
        'Admin paneli ile sipariş yönetimi',
        'Push bildirimi entegrasyonu',
        'Gelir hesaplama ve raporlama'
      ],
      github: 'https://github.com/yusufgulumser',
      live: 'https://play.google.com/store/apps/details?id=com.fergodyr.client',
      status: 'Google Play Store\'da Yayında',
      featured: true,
      gallery: ['assets/glmsr.jpg', 'assets/glmsr2.jpg']
    },
    {
      id: 2,
      title: 'ReportBack - Eteration',
      category: 'professional',
      image: 'assets/rb.jpg',
      description: 'Eteration şirketinde staj sürecimde AI chat desteği eklenmesine katkıda bulunduğum profesyonel raporlama uygulaması.',
      longDescription: 'Profesyonel iş ortamında geliştirdiğim mobil uygulama projesi. React Native kullanılarak geliştirilmiş, özellikle AI-powered chat sistemi entegrasyonu ve UI geliştirme konularında önemli katkılar sağladığım proje.',
      technologies: ['React Native', 'TypeScript', 'AI Integration', 'REST API'],
      features: [
        'AI destekli sohbet sistemi',
        'Modern UI/UX tasarım',
        'Rapor oluşturma sistemi',
        'Kullanıcı arayüzü geliştirme',
        'API entegrasyonu',
        'Responsive tasarım'
      ],
      github: 'https://github.com/yusufgulumser',
      live: 'https://play.google.com/store/apps/details?id=ca.reportback.mobile',
      status: 'Profesyonel Proje - Eteration',
      featured: true,
      gallery: ['assets/rb.jpg']
    },
    {
      id: 3,
      title: 'NotlyAi - AI Not Uygulaması',
      category: 'mobile',
      image: 'assets/notly.jpg',
      description: 'OpenAI entegrasyonlu akıllı not alma uygulaması. AI destekli not kategorilendirme, özetleme ve akıllı sohbet özellikleri.',
      longDescription: 'React Native ile geliştirilen bu AI destekli not uygulaması, kullanıcıların notlarını akıllıca kategorilendirmelerine, özetlemelerine yardımcı oluyor. OpenAI entegrasyonu ile doğal dil işleme, içerik özetleme, dil düzeltme ve notlar üzerinden hatırlatıcı oluşturma özellikleri sunuyor.',
      technologies: ['React Native', 'OpenAI API', 'Node.js', 'MongoDB'],
      features: [
        'AI destekli not kategorilendirme',
        'Akıllı içerik özetleme',
        'Dil düzeltme ve öneriler',
        'Not analizi ile hatırlatıcılar',
        'Çok dil desteği',
        'Tema özelleştirme',
        'Dinamik dil seçimi'
      ],
      github: 'https://github.com/yusufgulumser',
      live: '#',
      status: 'Geliştirme Aşamasında',
      featured: true,
      gallery: ['assets/notly.jpg']
    },
    {
      id: 4,
      title: 'Dream Catcher AI',
      category: 'mobile',
      image: 'assets/dr.jpg',
      description: 'AI tabanlı rüya analizi uygulaması. Kullanıcıların rüyalarını kaydedip AI ile analiz edebilecekleri benzersiz bir mobil deneyim.',
      longDescription: 'OpenAI API kullanılarak geliştirilen bu özgün uygulama, kullanıcıların rüyalarını kaydetmelerine ve yapay zeka ile analizini yapmalarına olanak tanıyor. Modern arayüz tasarımı ve kullanıcı odaklı deneyim sunuyor.',
      technologies: ['React Native', 'OpenAI API', 'Node.js', 'Express.js'],
      features: [
        'Rüya kaydetme sistemi',
        'AI tabanlı rüya analizi',
        'Rüya geçmişi ve istatistikler',
        'Tema özelleştirme',
        'Kullanıcı dostu arayüz',
        'Veri güvenliği'
      ],
      github: 'https://github.com/yusufgulumser',
      live: '#',
      status: 'Kişisel Proje',
      featured: false,
      gallery: ['assets/dr.jpg']
    }
  ];

  const filters = [
    { key: 'all', label: t('projects.filters.all'), icon: 'fas fa-th' },
    { key: 'mobile', label: t('projects.filters.mobile'), icon: 'fas fa-mobile-alt' },
    { key: 'professional', label: t('projects.filters.professional'), icon: 'fas fa-briefcase' },
    { key: 'featured', label: t('projects.filters.featured'), icon: 'fas fa-star' }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    return project.category === activeFilter;
  });

  const handleNextImage = (projectId) => {
    setActiveImageIndex(prev => {
      const currentIndex = prev[projectId] || 0;
      const project = projects.find(p => p.id === projectId);
      const nextIndex = (currentIndex + 1) % project.gallery.length;
      return { ...prev, [projectId]: nextIndex };
    });
  };

  const handlePrevImage = (projectId) => {
    setActiveImageIndex(prev => {
      const currentIndex = prev[projectId] || 0;
      const project = projects.find(p => p.id === projectId);
      const prevIndex = (currentIndex - 1 + project.gallery.length) % project.gallery.length;
      return { ...prev, [projectId]: prevIndex };
    });
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="projects-header">
          <span className="section-subtitle">{t('projects.subtitle')}</span>
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-description">
            {t('projects.description')}
          </p>
        </div>

        <div className="projects-filters">
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(filter.key);
                trackProjectFilter(filter.key);
              }}
            >
              <i className={filter.icon}></i>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                {project.gallery && project.gallery.length > 0 ? (
                  <div className="project-images">
                    {project.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${project.title} - ${index + 1}`}
                        className={`project-img ${index === (activeImageIndex[project.id] || 0) ? 'active' : ''}`}
                      />
                    ))}
                    {project.gallery.length > 1 && (
                      <>
                        <div className="gallery-navigation">
                          <button className="gallery-btn" onClick={(e) => {
                            e.preventDefault();
                            handlePrevImage(project.id);
                          }}>
                            <i className="fas fa-chevron-left"></i>
                          </button>
                          <button className="gallery-btn" onClick={(e) => {
                            e.preventDefault();
                            handleNextImage(project.id);
                          }}>
                            <i className="fas fa-chevron-right"></i>
                          </button>
                        </div>
                        <div className="image-gallery-indicator">
                          <i className="fas fa-images"></i>
                          <span>{(activeImageIndex[project.id] || 0) + 1}/{project.gallery.length}</span>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="image-placeholder">
                    <i className="fas fa-mobile-alt"></i>
                    <span>{t('projects.common.mobileApp')}</span>
                  </div>
                )}
                <div className="project-overlay">
                  <div className="project-links">
                    {project.id === 2 ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        title={t('projects.buttons.demo')}
                        onClick={() => trackProjectDemo(project.title)}
                      >
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    ) : (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                        title={t('projects.buttons.detail')}
                        onClick={() => trackProjectGithub(project.title)}
                    >
                      <i className="fab fa-github"></i>
                    </a>
                    )}
                    {project.live !== '#' && project.id !== 2 && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      title={t('projects.buttons.demo')}
                      onClick={() => trackProjectDemo(project.title)}
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                    )}
                    {project.gallery && project.gallery.length > 1 && (
                      <button
                        className="project-link gallery-btn"
                        title={t('projects.common.gallery')}
                        onClick={() => console.log('Galeri açılacak:', project.gallery)}
                      >
                        <i className="fas fa-images"></i>
                      </button>
                    )}
                  </div>
                </div>
                {project.featured && (
                  <div className="featured-badge">
                    <i className="fas fa-star"></i>
                  </div>
                )}
              </div>

              <div className="project-content">
                <h3 className="project-title">{t(`projects.projectDetails.${project.id === 1 ? 'carpet' : project.id === 2 ? 'reportback' : project.id === 3 ? 'notly' : 'dreamCatcher'}.title`)}</h3>
                <p className="project-description">{t(`projects.projectDetails.${project.id === 1 ? 'carpet' : project.id === 2 ? 'reportback' : project.id === 3 ? 'notly' : 'dreamCatcher'}.description`)}</p>
                
                <div className="project-tags">
                  {project.technologies.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  {project.id === 2 ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      onClick={() => trackProjectDemo(project.title)}
                    >
                      <i className="fas fa-eye"></i>
                      {t('projects.buttons.demo')}
                    </a>
                  ) : (
                    <>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                        onClick={() => trackProjectGithub(project.title)}
                  >
                    <i className="fab fa-github"></i>
                        {t('projects.buttons.detail')}
                  </a>
                      {project.live !== '#' && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                        onClick={() => trackProjectDemo(project.title)}
                  >
                    <i className="fas fa-eye"></i>
                        {t('projects.buttons.demo')}
                  </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <h3>{t('projects.moreProjects.title')}</h3>
          <p>{t('projects.moreProjects.description')}</p>
          <a
            href="https://github.com/yusufgulumser"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <i className="fab fa-github"></i>
            {t('projects.moreProjects.button')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects; 