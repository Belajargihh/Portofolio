/* ==========================================================================
   PROJECTS GALLERY WITH 3x2 GRID & PAGINATION ENGINE (Safe Icons & i18n)
   ========================================================================== */

import * as lucide from 'lucide';
import { projectsData, getProjectImage } from '../data/projects.js';
import { getCurrentLang, getTranslation, localize } from '../i18n.js';

let currentProjectsPage = 1;
function getItemsPerPage() { return window.innerWidth < 768 ? 2 : 3; }
let currentCategoryFilter = 'all';

export function renderProjects(filter = currentCategoryFilter, page = currentProjectsPage) {
  currentCategoryFilter = filter;
  currentProjectsPage = page;

  const container = document.getElementById('projects-grid');
  const paginationContainer = document.getElementById('projects-pagination');
  if (!container) return;

  const filtered = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => Array.isArray(p.category) ? p.category.includes(filter) : p.category === filter);

  const totalPages = Math.ceil(filtered.length / getItemsPerPage()) || 1;
  if (currentProjectsPage > totalPages) currentProjectsPage = totalPages;

  const startIndex = (currentProjectsPage - 1) * getItemsPerPage();
  const paginatedItems = filtered.slice(startIndex, startIndex + getItemsPerPage());

  if (paginatedItems.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: var(--text-muted);">
        <i data-lucide="folder-x" style="width: 48px; height: 48px; margin: 0 auto 16px; display: block; opacity: 0.5;"></i>
        <p style="font-size: 1.1rem; margin-bottom: 8px;">${getTranslation('projects.emptyTitle')}</p>
        <p style="font-size: 0.9rem; opacity: 0.7;">${getTranslation('projects.emptySub')}</p>
      </div>
    `;
    if (paginationContainer) paginationContainer.innerHTML = '';
    try {
      if (lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons({ icons: lucide });
      }
    } catch (e) {}
    return;
  }

  const lang = getCurrentLang();

  container.innerHTML = paginatedItems.map(proj => {
    const imageUrl = getProjectImage(proj);
    const title = localize(proj.title, lang);
    const desc = localize(proj.desc, lang);
    const liveLabel = localize(proj.liveLabel, lang) || getTranslation('projects.liveDemo', lang);
    const viewDetailsText = getTranslation('projects.viewDetails', lang);
    const sourceCodeText = getTranslation('projects.sourceCode', lang);

    return `
      <div class="project-card" data-cursor="pointer">
        <div class="project-img-wrapper">
          <img src="${imageUrl}" alt="${title}" class="project-img" loading="lazy" />
          <div class="project-overlay">
            <button class="btn btn-primary btn-sm view-details-btn" data-id="${proj.id}">
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
        <div class="project-body">
          <div class="project-tags">
            ${(proj.tags || []).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
          <h3 class="project-title">${title}</h3>
          <p class="project-desc">${desc}</p>
          <div class="project-footer">
            ${proj.liveUrl ? `
            <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link" style="color:var(--accent-cyan);">
              <span>${liveLabel}</span>
              <i data-lucide="external-link"></i>
            </a>` : `
            <a href="${proj.liveUrl || '#'}" target="_blank" rel="noopener noreferrer" class="project-link" style="opacity:0.45;">
              <span>${getTranslation('projects.liveDemo', lang)}</span>
              <i data-lucide="external-link"></i>
            </a>`}
            <a href="${proj.githubUrl || '#'}" target="_blank" rel="noopener noreferrer" class="project-link">
              <i data-lucide="git-branch"></i>
              <span>${sourceCodeText}</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  renderPaginationControls(paginationContainer, totalPages, currentProjectsPage, (newPage) => {
    renderProjects(currentCategoryFilter, newPage);
    const section = document.getElementById('projects');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  });

  try {
    if (lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons({ icons: lucide });
    }
  } catch (e) {
    console.warn('Lucide icon warning:', e);
  }

  // Bind detail buttons
  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute('data-id'));
      openProjectModal(id);
    });
  });
}

function renderPaginationControls(container, totalPages, currentPage, onPageChange) {
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  const prevText = getTranslation('projects.prev');
  const nextText = getTranslation('projects.next');

  let html = `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" id="proj-prev" data-cursor="pointer"><i data-lucide="chevron-left"></i> ${prevText}</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}" data-cursor="pointer">${i}</button>`;
  }

  html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" id="proj-next" data-cursor="pointer">${nextText} <i data-lucide="chevron-right"></i></button>`;

  container.innerHTML = html;

  container.querySelectorAll('.page-number').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = parseInt(btn.getAttribute('data-page'));
      onPageChange(page);
    });
  });

  const prevBtn = container.querySelector('#proj-prev');
  const nextBtn = container.querySelector('#proj-next');

  if (prevBtn && currentPage > 1) {
    prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));
  }
  if (nextBtn && currentPage < totalPages) {
    nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));
  }
}

export function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filters .filter-btn');

  // Sembunyikan tab kategori yang belum memiliki proyek dengan link demo
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
      renderProjects(filter, 1);
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

  // Listen to language changes and re-render projects
  window.addEventListener('languageChanged', () => {
    renderProjects(currentCategoryFilter, currentProjectsPage);
  });
}
