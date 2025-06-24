// Google Analytics utility functions

// Google Analytics Measurement ID (değiştirilmesi gerekiyor)
export const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID'; // Bu değeri gerçek GA ID ile değiştirin

// GA initialization check
export const isGAInitialized = () => {
  return typeof window !== 'undefined' && window.gtag;
};

// Page view tracking
export const trackPageView = (path) => {
  if (isGAInitialized()) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
};

// Event tracking
export const trackEvent = (action, category, label = null, value = null) => {
  if (isGAInitialized()) {
    const eventData = {
      event_category: category,
      event_label: label,
      value: value,
    };

    // Remove null values
    Object.keys(eventData).forEach(key => {
      if (eventData[key] === null) {
        delete eventData[key];
      }
    });

    window.gtag('event', action, eventData);
  }
};

// Specific tracking functions for portfolio actions
export const trackProjectView = (projectName) => {
  trackEvent('view_project', 'portfolio', projectName);
};

export const trackProjectDemo = (projectName) => {
  trackEvent('click_demo', 'portfolio', projectName);
};

export const trackProjectGithub = (projectName) => {
  trackEvent('click_github', 'portfolio', projectName);
};

export const trackCVDownload = () => {
  trackEvent('download_cv', 'engagement');
};

export const trackContactFormSubmit = () => {
  trackEvent('submit_form', 'contact');
};

export const trackSocialLink = (platform) => {
  trackEvent('click_social', 'engagement', platform);
};

export const trackSkillFilter = (filter) => {
  trackEvent('filter_skills', 'navigation', filter);
};

export const trackProjectFilter = (filter) => {
  trackEvent('filter_projects', 'navigation', filter);
};

export const trackThemeToggle = (theme) => {
  trackEvent('toggle_theme', 'ui', theme);
};

export const trackLanguageChange = (language) => {
  trackEvent('change_language', 'ui', language);
};

export const trackScrollToSection = (section) => {
  trackEvent('scroll_to_section', 'navigation', section);
};

// User engagement tracking
export const trackTimeOnSite = () => {
  const startTime = Date.now();
  
  const trackExitTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackEvent('time_on_site', 'engagement', null, timeSpent);
  };

  // Track on page unload
  window.addEventListener('beforeunload', trackExitTime);
  
  // Track on visibility change (user switches tabs)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      trackExitTime();
    }
  });
};

// Performance tracking
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && window.performance) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loadTime = Math.round(window.performance.timing.loadEventEnd - window.performance.timing.navigationStart);
        trackEvent('page_load_time', 'performance', null, loadTime);
      }, 0);
    });
  }
};

// Error tracking
export const trackError = (error, context = 'unknown') => {
  trackEvent('javascript_error', 'error', `${context}: ${error.message}`);
}; 