/**
 * REMIND Portfolio - Animations JavaScript
 * AOS, Counter, Parallax, Magnetic Buttons
 */

(function() {
  'use strict';

  // === DOM Elements ===
  const aosElements = document.querySelectorAll('[data-aos]');
  const counterElements = document.querySelectorAll('[data-count]');

  // === AOS (Animate On Scroll) ===
  function initAOS() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    aosElements.forEach(el => observer.observe(el));
  }

  // === Counter Animation ===
  function initCounters() {
    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counterElements.forEach(el => observer.observe(el));
  }

  function animateCounter(element) {
    const target = parseFloat(element.dataset.count);
    const duration = 2000;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: ease-out-expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const current = target * easeProgress;
      
      if (isDecimal) {
        element.textContent = current.toFixed(1);
      } else {
        element.textContent = Math.round(current);
      }
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // === Parallax Effect ===
  function initParallax() {
    const heroVisual = document.querySelector('.hero__visual');
    if (!heroVisual) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      
      if (scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${rate}px)`;
      }
    }, { passive: true });
  }

  // === Magnetic Buttons ===
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn--primary');
    
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });
      
      btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  }

  // === Phone Send Count Animation ===
  function initPhoneSendAnimation() {
    const sendCountEl = document.getElementById('sendCount');
    if (!sendCountEl) return;

    let currentCount = 1;
    const maxCount = 10;
    const progressDuration = 3000; // 3초 (CSS animation과 동일)

    // 3초마다 숫자 증가 (진행바 애니메이션과 동기화)
    setInterval(() => {
      currentCount++;
      if (currentCount > maxCount) {
        currentCount = 1; // 15 이후 1로 리셋
      }
      sendCountEl.textContent = currentCount;
    }, progressDuration);
  }

  // Export functions
  window.Animations = {
    initAOS,
    initCounters,
    initParallax,
    initMagneticButtons,
    initPhoneSendAnimation
  };

})();
