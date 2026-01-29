/**
 * REMIND Portfolio - Main JavaScript
 * Initialization and entry point
 */

(function() {
  'use strict';

  // === Initialize ===
  function init() {
    // Core functionality
    if (window.Core) {
      window.Core.initCursor();
      window.Core.initHeader();
      window.Core.initMobileMenu();
      window.Core.initSmoothScroll();
    }

    // Animations
    if (window.Animations) {
      window.Animations.initAOS();
      window.Animations.initCounters();
      window.Animations.initParallax();
      window.Animations.initMagneticButtons();
      window.Animations.initPhoneSendAnimation();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
