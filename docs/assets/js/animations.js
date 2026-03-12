/**
 * AI Whisperers Portfolio - Animation Engine
 * Handles scroll animations, particle effects, and interactive elements
 */

(function() {
  'use strict';

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initScrollReveal();
    initNavigation();
    initProgressBars();
    initTimeline();
    initSmoothScroll();
  });

  /**
   * Create floating particles in hero section
   */
  function initParticles() {
    const containers = document.querySelectorAll('.particles');
    
    containers.forEach(container => {
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 20) + 's';
        container.appendChild(particle);
      }
    });
  }

  /**
   * Scroll reveal animation using Intersection Observer
   */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /**
   * Navigation scroll effect
   */
  function initNavigation() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let ticking = false;

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (window.scrollY > 50) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Animate progress bars when they come into view
   */
  function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target.getAttribute('data-target');
          if (target) {
            setTimeout(() => {
              entry.target.style.width = target + '%';
            }, 200);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
  }

  /**
   * Animate timeline items
   */
  function initTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Typewriter effect for hero text
   * Usage: Add 'typewriter' class to element with data-text attribute
   */
  window.Typewriter = function(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  };

  /**
   * Counter animation for statistics
   * Usage: Add 'counter' class to element with data-target attribute
   */
  window.animateCounter = function(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    function update() {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(update);
      } else {
        element.textContent = target.toLocaleString();
      }
    }

    update();
  };

  /**
   * Parallax effect for elements with 'parallax' class
   */
  window.initParallax = function() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }, { passive: true });
  };

})();
