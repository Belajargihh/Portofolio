/* ==========================================================================
   PROJECTS 3D STACKING DECK CAROUSEL (CoverFlow Perspective Animation)
   ========================================================================== */

import * as lucide from 'lucide';
import { projectsData, getProjectImage } from '../data/projects.js';
import { getCurrentLang, getTranslation, localize } from '../i18n.js';

let activeProjectIndex = 0;
let currentFilter = 'all';
let filteredProjects = [...projectsData];

export function renderProjects(filter = currentFilter, initialIndex = 0) {
  currentFilter = filter;
  const container = document.getElementById('projects-grid');
  const paginationContainer = document.getElementById('projects-pagination');
  if (!container) return;

  filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => Array.isArray(p.category) ? p.category.includes(filter) : p.category === filter);

  if (filteredProjects.length === 0) {
    container.className = 'projects-grid';
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: var(--text-muted);">
        <i data-lucide="folder-x" style="width: 48px; height: 48px; margin: 0 auto 16px; display: block; opacity: 0.5;"></i>
        <p style="font-size: 1.1rem; margin-bottom: 8px;">${getTranslation('projects.emptyTitle')}</p>
        <p style="font-size: 0.9rem; opacity: 0.7;">${getTranslation('projects.emptySub')}</p>
      </div>
    `;
    if (paginationContainer) paginationContainer.innerHTML = '';
    try {
      if (lucide && typeof lucide.createIcons === 'function') lucide.createIcons({ icons: lucide });
    } catch (e) {}
    return;
  }

  // Ensure index is within range
  activeProjectIndex = Math.max(0, Math.min(initialIndex, filteredProjects.length - 1));

  // Change container class to deck container
  container.className = 'projects-stack-stage';

  const lang = getCurrentLang();
  const viewDetailsText = getTranslation('projects.viewDetails', lang) || 'Detail Proyek';
  const sourceCodeText = getTranslation('projects.sourceCode', lang) || 'Source Code';

  let cardsHtml = `
    <div class="projects-stack-viewport" id="projects-stack-viewport">
  `;

  filteredProjects.forEach((proj, idx) => {
    const imageUrl = getProjectImage(proj);
    const title = localize(proj.title, lang);
    const desc = localize(proj.desc, lang);
    const liveLabel = localize(proj.liveLabel, lang) || getTranslation('projects.liveDemo', lang);
    const firstTag = proj.tags && proj.tags[0] ? proj.tags[0] : 'PROJECT';

    cardsHtml += `
      <div class="project-stack-card" data-index="${idx}" data-cursor="pointer">
        <!-- Top Pill Tag & Year/Number badge -->
        <div class="stack-card-badge-row">
          <span class="stack-card-pill">
            <i data-lucide="sparkles"></i> #${firstTag}
          </span>
          <span class="stack-card-num">'0${idx + 1}</span>
        </div>

        <!-- Website Screenshot / Preview Image -->
        <div class="stack-card-img-wrapper">
          <img src="${imageUrl}" alt="${title}" class="stack-card-img" loading="lazy" />
          <div class="stack-card-overlay">
            <button class="btn btn-primary btn-sm stack-details-btn" data-id="${proj.id}">
              <span>${viewDetailsText}</span>
              <i data-lucide="eye"></i>
            </button>
            ${proj.liveUrl ? `
            <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" onclick="event.stopPropagation();">
              <span>${liveLabel}</span>
              <i data-lucide="external-link"></i>
            </a>` : ''}
          </div>
        </div>

        <!-- Card Content Body -->
        <div class="stack-card-body">
          <div class="project-tags">
            ${(proj.tags || []).slice(0, 3).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
          <h3 class="stack-card-title">${title}</h3>
          <p class="stack-card-desc">${desc}</p>
          
          <div class="stack-card-footer">
            ${proj.liveUrl ? `
            <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link" style="color:var(--accent-cyan);" onclick="event.stopPropagation();">
              <span>${liveLabel}</span>
              <i data-lucide="external-link"></i>
            </a>` : ''}
            <a href="${proj.githubUrl || '#'}" target="_blank" rel="noopener noreferrer" class="project-link" onclick="event.stopPropagation();">
              <i data-lucide="git-branch"></i>
              <span>${sourceCodeText}</span>
            </a>
          </div>
        </div>
      </div>
    `;
  });

  cardsHtml += `
    </div>
  `;

  container.innerHTML = cardsHtml;

  // Render navigation controls in pagination container
  renderStackControls(paginationContainer, filteredProjects.length, activeProjectIndex);

  // Apply 3D perspective transforms
  updateStackPositions();

  // Attach card click handlers: clicking a card in background brings it to front!
  container.querySelectorAll('.project-stack-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'));
      if (idx !== activeProjectIndex) {
        goToSlide(idx);
      }
    });
  });

  // Attach detail buttons
  container.querySelectorAll('.stack-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute('data-id'));
      openProjectModal(id);
    });
  });

  try {
    if (lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons({ icons: lucide });
    }
  } catch (e) {
    console.warn('Lucide icon warning:', e);
  }
}

function updateStackPositions() {
  const cards = document.querySelectorAll('.project-stack-card');
  const total = cards.length;
  if (!total) return;

  const isMobile = window.innerWidth < 768;

  cards.forEach((card, idx) => {
    const diff = idx - activeProjectIndex;

    // Reset base classes
    card.classList.remove('is-active', 'is-next', 'is-prev', 'is-hidden');

    if (diff === 0) {
      // FRONT ACTIVE CARD
      card.classList.add('is-active');
      card.style.transform = `translateX(0px) translateZ(0px) scale(1) rotateY(0deg)`;
      card.style.zIndex = '30';
      card.style.opacity = '1';
      card.style.pointerEvents = 'auto';
    } else if (diff > 0) {
      // CARDS BEHIND TO THE RIGHT
      const step = Math.min(diff, 3);
      const xOffset = isMobile ? step * 25 : step * 75;
      const zOffset = -step * 100;
      const scale = 1 - step * 0.12;
      const opacity = Math.max(0.2, 1 - step * 0.28);
      const rotateY = isMobile ? -5 : -10;

      card.classList.add('is-next');
      card.style.transform = `translateX(${xOffset}px) translateZ(${zOffset}px) scale(${scale}) rotateY(${rotateY}deg)`;
      card.style.zIndex = `${30 - step * 5}`;
      card.style.opacity = `${opacity}`;
      card.style.pointerEvents = step === 1 ? 'auto' : 'none';
      if (diff > 3) card.classList.add('is-hidden');
    } else {
      // PREVIOUS CARDS RECEDING TO THE LEFT / BEHIND
      const step = Math.min(Math.abs(diff), 3);
      const xOffset = isMobile ? -step * 30 : -step * 90;
      const zOffset = -step * 140;
      const scale = 1 - step * 0.15;
      const opacity = Math.max(0, 0.4 - step * 0.15);
      const rotateY = isMobile ? 5 : 12;

      card.classList.add('is-prev');
      card.style.transform = `translateX(${xOffset}px) translateZ(${zOffset}px) scale(${scale}) rotateY(${rotateY}deg)`;
      card.style.zIndex = `${10 - step}`;
      card.style.opacity = `${opacity}`;
      card.style.pointerEvents = 'none';
      if (Math.abs(diff) > 2) card.classList.add('is-hidden');
    }
  });

  // Update dots indicator
  document.querySelectorAll('.stack-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === activeProjectIndex);
  });

  // Update Prev / Next buttons disabled states
  const prevBtn = document.getElementById('stack-prev-btn');
  const nextBtn = document.getElementById('stack-next-btn');
  if (prevBtn) prevBtn.classList.toggle('disabled', activeProjectIndex === 0);
  if (nextBtn) nextBtn.classList.toggle('disabled', activeProjectIndex === total - 1);
}

function goToSlide(newIndex) {
  if (newIndex < 0 || newIndex >= filteredProjects.length) return;
  activeProjectIndex = newIndex;
  updateStackPositions();
}

function renderStackControls(container, total, currentIndex) {
  if (!container) return;
  if (total <= 1) {
    container.innerHTML = '';
    return;
  }

  const prevText = getTranslation('projects.prev') || 'Prev';
  const nextText = getTranslation('projects.next') || 'Next';

  let dotsHtml = '';
  for (let i = 0; i < total; i++) {
    dotsHtml += `<button class="stack-dot ${i === currentIndex ? 'active' : ''}" data-index="${i}" aria-label="Project ${i+1}" data-cursor="pointer"></button>`;
  }

  container.innerHTML = `
    <div class="stack-controls-wrapper">
      <button class="stack-nav-btn ${currentIndex === 0 ? 'disabled' : ''}" id="stack-prev-btn" data-cursor="pointer">
        <i data-lucide="chevron-left"></i>
        <span>${prevText}</span>
      </button>

      <div class="stack-dots-container">
        ${dotsHtml}
      </div>

      <button class="stack-nav-btn ${currentIndex === total - 1 ? 'disabled' : ''}" id="stack-next-btn" data-cursor="pointer">
        <span>${nextText}</span>
        <i data-lucide="chevron-right"></i>
      </button>
    </div>
  `;

  // Bind controls
  const prevBtn = container.querySelector('#stack-prev-btn');
  const nextBtn = container.querySelector('#stack-next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (activeProjectIndex > 0) goToSlide(activeProjectIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (activeProjectIndex < total - 1) goToSlide(activeProjectIndex + 1);
    });
  }

  container.querySelectorAll('.stack-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'));
      goToSlide(idx);
    });
  });

  try {
    if (lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons({ icons: lucide });
    }
  } catch (e) {}
}

export function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filters .filter-btn');

  filterBtns.forEach(btn => {
    const filter = btn.getAttribute('data-filter');
    if (filter !== 'all') {
      const hasProjects = projectsData.some(p => 
        Array.isArray(p.category) ? p.category.includes(filter) : p.category === filter
      );
      if (!hasProjects) {
        btn.style.display = 'none';
      } else {
        btn.style.display = '';
      }
    }
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter, 0);
    });
  });
}

export function openProjectModal(id) {
  const proj = projectsData.find(p => p.id === id);
  if (!proj) return;

  const lang = getCurrentLang();
  const imageUrl = getProjectImage(proj);
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');

  const title = localize(proj.title, lang);
  const desc = localize(proj.desc, lang);
  const highlightsList = Array.isArray(proj.highlights)
    ? proj.highlights
    : (proj.highlights ? (proj.highlights[lang] || proj.highlights.id || []) : []);
  const modalLiveLabel = localize(proj.modalLiveLabel, lang) || localize(proj.liveLabel, lang) || getTranslation('projects.modalLiveDefault', lang);
  const modalSourceCodeText = getTranslation('projects.modalSourceCode', lang);
  const modalHighlightsHeader = getTranslation('projects.modalHighlights', lang);

  modalBody.innerHTML = `
    <div class="modal-header">
      <img src="${imageUrl}" alt="${title}" style="width:100%; height:280px; object-fit:cover; border-radius:12px; margin-bottom:20px;" />
      <div class="project-tags" style="margin-bottom:10px;">
        ${(proj.tags || []).map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      <h2 style="font-size:1.8rem; margin-bottom:12px;">${title}</h2>
      <p style="color:var(--text-muted); margin-bottom:24px;">${desc}</p>
    </div>
    
    <div style="margin-bottom:24px;">
      <h4 style="margin-bottom:12px; color:var(--accent-cyan);">${modalHighlightsHeader}</h4>
      <ul style="list-style:disc; padding-left:20px; color:var(--text-muted);">
        ${highlightsList.map(h => `<li style="margin-bottom:6px;">${h}</li>`).join('')}
      </ul>
    </div>

    <div style="display:flex; gap:16px; flex-wrap:wrap;">
      ${proj.liveUrl ? `
      <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
        <span>${modalLiveLabel}</span>
        <i data-lucide="external-link"></i>
      </a>` : ''}
      <a href="${proj.githubUrl || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
        <i data-lucide="git-branch"></i>
        <span>${modalSourceCodeText}</span>
      </a>
    </div>
  `;

  modal.classList.add('open');
  try {
    if (lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons({ icons: lucide });
    }
  } catch (e) {
    console.warn(e);
  }
}

export function initModalEvents() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }
}

// Window resize listener to recompute 3D spacing
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    updateStackPositions();
  });
  window.addEventListener('languageChanged', () => {
    renderProjects(currentFilter, activeProjectIndex);
  });
}
