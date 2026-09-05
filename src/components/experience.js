import * as lucide from 'lucide';
import { experienceData } from '../data/experience.js';

let currentExpPage = 1;
function getItemsPerPage() { return window.innerWidth < 768 ? 2 : 3; }

export function renderExperience(page = 1) {
  currentExpPage = page;
  const container = document.getElementById('experience-grid');
  const paginationContainer = document.getElementById('experience-pagination');
  if (!container) return;

  const totalPages = Math.ceil(experienceData.length / getItemsPerPage()) || 1;
  if (currentExpPage > totalPages) currentExpPage = totalPages;

  const startIndex = (currentExpPage - 1) * getItemsPerPage();
  const paginatedItems = experienceData.slice(startIndex, startIndex + getItemsPerPage());

  container.innerHTML = paginatedItems.map(item => `
    <div class="project-card exp-card" data-tilt data-cursor="pointer">
      <div class="project-body exp-body">
        <div class="exp-top-banner">
          <div class="exp-period-badge"><i data-lucide="calendar"></i> ${item.period}</div>
          <div class="project-tags">
            ${(item.tags || []).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
        </div>
        
        <div class="exp-header-info">
          <h3 class="exp-company-title">
            <i data-lucide="building-2"></i> ${item.company}
          </h3>
          ${item.location ? `
            <div class="exp-location">
              <i data-lucide="map-pin"></i> ${item.location}
            </div>
          ` : ''}
          <div class="exp-role-badge">
            <i data-lucide="briefcase"></i> ${item.role}
          </div>
        </div>

        <ul class="exp-bullet-list">
          ${(item.highlights || []).map(h => `
            <li class="exp-bullet-item">
              <i data-lucide="check-circle-2"></i>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  renderExpPaginationControls(paginationContainer, totalPages, currentExpPage, (newPage) => {
    renderExperience(newPage);
    const section = document.getElementById('experience');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  });

  try {
    if (lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons({ icons: lucide });
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
