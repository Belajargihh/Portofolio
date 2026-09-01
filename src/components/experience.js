/* ==========================================================================
   EXPERIENCE / PAST WORK PROJECTS (3x2 GRID WITH PAGINATION & SAFE ICONS)
   ========================================================================== */

import { experienceData } from '../data/experience.js';

let currentExpPage = 1;
const ITEMS_PER_PAGE = 3;

export function renderExperience(page = 1) {
  currentExpPage = page;
  const container = document.getElementById('experience-grid');
  const paginationContainer = document.getElementById('experience-pagination');
  if (!container) return;

  const totalPages = Math.ceil(experienceData.length / ITEMS_PER_PAGE) || 1;
  if (currentExpPage > totalPages) currentExpPage = totalPages;

  const startIndex = (currentExpPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = experienceData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  container.innerHTML = paginatedItems.map(item => `
    <div class="project-card exp-card" data-tilt data-cursor="pointer">
      <div class="project-img-wrapper">
        <img src="${item.image}" alt="${item.title}" class="project-img" loading="lazy" />
        <div class="exp-period-badge"><i data-lucide="calendar"></i> ${item.period}</div>
      </div>
      <div class="project-body">
        <div class="project-tags">
          ${(item.tags || []).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <div class="exp-company"><i data-lucide="building-2"></i> ${item.company}</div>
        <h3 class="project-title" style="font-size:1.15rem;">${item.role}</h3>
        <p class="project-desc"><strong>${item.title}:</strong> ${item.desc}</p>
        <div class="exp-highlights">
          ${(item.highlights || []).map(h => `<div class="exp-bullet"><i data-lucide="check-circle-2"></i> <span>${h}</span></div>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  renderExpPaginationControls(paginationContainer, totalPages, currentExpPage, (newPage) => {
    renderExperience(newPage);
    const section = document.getElementById('experience');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  });

  try {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  } catch (e) {
    console.warn(e);
  }
}

function renderExpPaginationControls(container, totalPages, currentPage, onPageChange) {
  if (!container) return;
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" id="exp-prev" data-cursor="pointer"><i data-lucide="chevron-left"></i> Prev</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}" data-cursor="pointer">${i}</button>`;
  }

  html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" id="exp-next" data-cursor="pointer">Next <i data-lucide="chevron-right"></i></button>`;

  container.innerHTML = html;

  container.querySelectorAll('.page-number').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = parseInt(btn.getAttribute('data-page'));
      onPageChange(page);
    });
  });

  const prevBtn = container.querySelector('#exp-prev');
  const nextBtn = container.querySelector('#exp-next');

  if (prevBtn && currentPage > 1) {
    prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));
  }
  if (nextBtn && currentPage < totalPages) {
    nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));
  }
}
