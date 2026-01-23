/**
 * REMIND Portfolio - Core JavaScript
 * Cursor, Header, Mobile Menu, Smooth Scroll
 */

(function() {
  'use strict';

  // === DOM Elements ===
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  // === Cursor ===
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  function initCursor() {
    if (!cursor || !cursorDot) return;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instant dot follow
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    // Smooth cursor follow
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const hoverTargets = document.querySelectorAll('a, button, .feature, .step, .result');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // === Header Scroll ===
  function initHeader() {
    let lastScroll = 0;
    
    function updateHeader() {
      const currentScroll = window.scrollY;
      
      if (currentScroll > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // === Mobile Menu ===
  function initMobileMenu() {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // === Smooth Scroll ===
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offset = header.offsetHeight + 20;
          const position = target.getBoundingClientRect().top + window.scrollY - offset;
          
          window.scrollTo({
            top: position,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Export functions
  window.Core = {
    initCursor,
    initHeader,
    initMobileMenu,
    initSmoothScroll
  };

})();
