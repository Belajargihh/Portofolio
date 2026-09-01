/* ==========================================================================
   PROJECTS GALLERY WITH 3x2 GRID & PAGINATION ENGINE (Safe Icons)
   ========================================================================== */

import { projectsData, getProjectImage } from '../data/projects.js';

let currentProjectsPage = 1;
const ITEMS_PER_PAGE = 3;
let currentCategoryFilter = 'all';

export function renderProjects(filter = 'all', page = 1) {
  currentCategoryFilter = filter;
  currentProjectsPage = page;

  const container = document.getElementById('projects-grid');
  const paginationContainer = document.getElementById('projects-pagination');
  if (!container) return;

  const filtered = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  if (currentProjectsPage > totalPages) currentProjectsPage = totalPages;

  const startIndex = (currentProjectsPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  container.innerHTML = paginatedItems.map(proj => {
    const imageUrl = getProjectImage(proj);
    return `
      <div class="project-card" data-tilt data-cursor="pointer">
        <div class="project-img-wrapper">
          <img src="${imageUrl}" alt="${proj.title}" class="project-img" loading="lazy" />
          <div class="project-overlay">
            <button class="btn btn-primary btn-sm view-details-btn" data-id="${proj.id}">
              <span>Detail Proyek</span>
              <i data-lucide="eye"></i>
            </button>
          </div>
        </div>
        <div class="project-body">
          <div class="project-tags">
            ${(proj.tags || []).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.desc}</p>
          <div class="project-footer">
            <a href="${proj.liveUrl || '#'}" target="_blank" rel="noopener" class="project-link">
              <span>Live Demo</span>
              <i data-lucide="external-link"></i>
            </a>
            <a href="${proj.githubUrl || '#'}" target="_blank" rel="noopener" class="project-link">
              <i data-lucide="git-branch"></i>
              <span>Source Code</span>
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
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
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

  let html = `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" id="proj-prev" data-cursor="pointer"><i data-lucide="chevron-left"></i> Prev</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}" data-cursor="pointer">${i}</button>`;
  }

  html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" id="proj-next" data-cursor="pointer">Next <i data-lucide="chevron-right"></i></button>`;

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

  const imageUrl = getProjectImage(proj);
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');

  modalBody.innerHTML = `
    <div class="modal-header">
      <img src="${imageUrl}" alt="${proj.title}" style="width:100%; height:280px; object-fit:cover; border-radius:12px; margin-bottom:20px;" />
      <div class="project-tags" style="margin-bottom:10px;">
        ${(proj.tags || []).map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      <h2 style="font-size:1.8rem; margin-bottom:12px;">${proj.title}</h2>
      <p style="color:var(--text-muted); margin-bottom:24px;">${proj.desc}</p>
    </div>
    
    <div style="margin-bottom:24px;">
      <h4 style="margin-bottom:12px; color:var(--accent-cyan);">Highlight & Fitur Utama:</h4>
      <ul style="list-style:disc; padding-left:20px; color:var(--text-muted);">
        ${(proj.highlights || []).map(h => `<li style="margin-bottom:6px;">${h}</li>`).join('')}
      </ul>
    </div>

    <div style="display:flex; gap:16px; flex-wrap:wrap;">
      <a href="${proj.liveUrl || '#'}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
        <span>Buka Live Demo</span>
        <i data-lucide="external-link"></i>
      </a>
      <a href="${proj.githubUrl || '#'}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
        <i data-lucide="git-branch"></i>
        <span>Lihat Source Code</span>
      </a>
    </div>
  `;

  modal.classList.add('open');
  try {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
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
