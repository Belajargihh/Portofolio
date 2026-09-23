import * as lucide from 'lucide';
import { experienceData } from '../data/experience.js';
import { getCurrentLang, getTranslation, localize } from '../i18n.js';

let currentExpPage = 1;
function getItemsPerPage() { return window.innerWidth < 768 ? 2 : 3; }

export function renderExperience(page = currentExpPage) {
  currentExpPage = page;
  const container = document.getElementById('experience-grid');
  const paginationContainer = document.getElementById('experience-pagination');
  if (!container) return;

  const totalPages = Math.ceil(experienceData.length / getItemsPerPage()) || 1;
  if (currentExpPage > totalPages) currentExpPage = totalPages;

  const startIndex = (currentExpPage - 1) * getItemsPerPage();
  const paginatedItems = experienceData.slice(startIndex, startIndex + getItemsPerPage());

  const lang = getCurrentLang();

  container.innerHTML = paginatedItems.map(item => {
    const role = localize(item.role, lang);
    const company = localize(item.company, lang);
    const location = localize(item.location, lang);
    const period = localize(item.period, lang);
    const highlights = Array.isArray(item.highlights)
      ? item.highlights
      : (item.highlights ? (item.highlights[lang] || item.highlights.id || []) : []);

    return `
      <div class="project-card exp-card" data-cursor="pointer">
        <div class="project-body exp-body">
          <div class="exp-top-banner">
            <div class="exp-period-badge"><i data-lucide="calendar"></i> ${period}</div>
            <div class="project-tags">
              ${(item.tags || []).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
          </div>
          
          <div class="exp-header-info">
            <h3 class="exp-company-title">
              <i data-lucide="building-2"></i> ${company}
            </h3>
            ${location ? `
              <div class="exp-location">
                <i data-lucide="map-pin"></i> ${location}
              </div>
            ` : ''}
            <div class="exp-role-badge">
              <i data-lucide="briefcase"></i> ${role}
            </div>
          </div>

          <ul class="exp-bullet-list">
            ${highlights.map(h => `
              <li class="exp-bullet-item">
                <i data-lucide="check-circle-2"></i>
                <span>${h}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;
  }).join('');

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

  const prevText = getTranslation('experience.prev');
  const nextText = getTranslation('experience.next');

  let html = `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" id="exp-prev" data-cursor="pointer"><i data-lucide="chevron-left"></i> ${prevText}</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}" data-cursor="pointer">${i}</button>`;
  }

  html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" id="exp-next" data-cursor="pointer">${nextText} <i data-lucide="chevron-right"></i></button>`;

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

// Bind language change listener once
if (typeof window !== 'undefined') {
  window.addEventListener('languageChanged', () => {
    renderExperience(currentExpPage);
  });
}
