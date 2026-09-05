/* ==========================================================================
   PORTFOLIO MAIN ENTRY FILE (Bulletproof Isolated Execution)
   ========================================================================== */

import * as lucide from 'lucide';
import { LanyardPhysicsEngine } from './components/lanyard.js';
import { CustomCursorEngine } from './components/cursor.js';
import { TypewriterEngine } from './components/typing.js';
import { init3DTiltEffect } from './components/tilt.js';
import { initSkillsTabs } from './components/skills.js';
import { SkillsPuzzleEngine } from './components/puzzle.js';
import { renderProjects, initProjectFilters, initModalEvents } from './components/projects.js';
import { renderExperience } from './components/experience.js';
import { renderJournals } from './components/journals.js';
import { initContactForm, initClock } from './components/contact.js';

function initApp() {
  // 1. Global Lucide Icon Initialization
  try {
    window.lucide = lucide;
    if (lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons({ icons: lucide });
    }
  } catch (e) {
    console.warn('Lucide init warning:', e);
  }

  // 2. Initialize Skills Tab Filter
  try {
    initSkillsTabs();
  } catch (e) {
    console.error('Skills tabs init error:', e);
  }

  // 2b. Initialize Puzzle Engine (separate try-catch + delay to ensure DOM is settled)
  try {
    setTimeout(() => {
      try {
        const puzzleEngine = new SkillsPuzzleEngine('skills-grid');
        console.log('[Puzzle] Engine started, visible cards:', puzzleEngine.gridContainer ? puzzleEngine.getCards().length : 0);
      } catch (pe) {
        console.error('Puzzle engine init error:', pe);
      }
    }, 500);
  } catch (e) {
    console.error('Puzzle setup error:', e);
  }

  // 3. Initialize Interactive Lanyard Physics Engine (Desktop Only)
  try {
    if (window.innerWidth >= 768) {
      new LanyardPhysicsEngine('lanyard-canvas');
    }
  } catch (e) {
    console.error('Lanyard engine error:', e);
  }

  // 4. Initialize Custom Cursor & Spotlight Tracking
  try {
    new CustomCursorEngine();
  } catch (e) {
    console.error('Cursor engine error:', e);
  }

  // 5. Initialize Dynamic Typewriter Effect
  try {
    new TypewriterEngine('typing-element', [
      'Junior Full-Stack',
      'Fresh Graduate',
      'Frontend & Backend',
      'AI-Assisted Coder'
    ]);
  } catch (e) {
    console.error('Typewriter error:', e);
  }

  // 6. Initialize Projects Showcase (3x2 Grid + Pagination)
  try {
    renderProjects('all', 1);
    initProjectFilters();
    initModalEvents();
  } catch (e) {
    console.error('Projects init error:', e);
  }

  // 7. Initialize Experience / Past Projects (3x2 Grid + Pagination)
  try {
    renderExperience(1);
  } catch (e) {
    console.error('Experience init error:', e);
  }

  // 8. Initialize Scientific Journals Section (3x2 Grid + Pagination)
  try {
    renderJournals(1);
  } catch (e) {
    console.error('Journals init error:', e);
  }

  // 9. Initialize 3D Tilt Effect
  try {
    init3DTiltEffect();
  } catch (e) {
    console.error('Tilt init error:', e);
  }

  // 10. Initialize Form & Clock Utilities
  try {
    initContactForm();
    initClock();
  } catch (e) {
    console.error('Utilities init error:', e);
  }

  // 11. Navbar Scroll & Active Link Observer + Mobile Toggle
  try {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
      });

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
        });
      });
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      let currentSec = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          currentSec = sec.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSec}`) {
          link.classList.add('active');
        }
      });
    });
  } catch (e) {
    console.error('Navbar error:', e);
  }

  // 12. Back To Top Button
  try {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  } catch (e) {
    console.error(e);
  }

  // 13. Sound Toggle Utility
  try {
    let soundEnabled = true;
    const soundBtn = document.getElementById('sound-toggle');

    const playBeepSound = () => {
      if (!soundEnabled) return;
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } catch (err) {}
    };

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundBtn.style.color = soundEnabled ? 'var(--accent-red)' : 'var(--text-dim)';
        playBeepSound();
      });

      document.querySelectorAll('.btn, .nav-link, .tab-btn, .filter-btn, .page-number, .page-btn').forEach(el => {
        el.addEventListener('mouseenter', () => playBeepSound());
      });
    }
  } catch (e) {
    console.error(e);
  }

  // 14. Counter Animation for Stats
  try {
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const animateCounters = () => {
      if (animated) return;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = target / 30;

        const update = () => {
          count += speed;
          if (count < target) {
            counter.textContent = Math.ceil(count);
            setTimeout(update, 30);
          } else {
            counter.textContent = target;
          }
        };
        update();
      });
      animated = true;
    };

    animateCounters();
  } catch (e) {
    console.error(e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
