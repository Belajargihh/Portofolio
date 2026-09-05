/* ==========================================================================
   ACADEMIC JOURNALS & RESEARCH ARTICLES (3x2 GRID WITH PAGINATION & SAFE ICONS)
   ========================================================================== */

import { journalsData } from '../data/journals.js';

let currentJournalPage = 1;
function getItemsPerPage() { return window.innerWidth < 768 ? 2 : 3; }

export function renderJournals(page = 1) {
  currentJournalPage = page;
  const container = document.getElementById('journals-grid');
  const paginationContainer = document.getElementById('journals-pagination');
  if (!container) return;

  const totalPages = Math.ceil(journalsData.length / getItemsPerPage()) || 1;
  if (currentJournalPage > totalPages) currentJournalPage = totalPages;

  const startIndex = (currentJournalPage - 1) * getItemsPerPage();
  const paginatedItems = journalsData.slice(startIndex, startIndex + getItemsPerPage());

  container.innerHTML = paginatedItems.map(journal => {
    const doiUrl = (journal.doi || '').startsWith('http') ? journal.doi : `https://doi.org/${journal.doi}`;
    return `
      <div class="project-card journal-card" data-tilt data-cursor="pointer">
        <div class="project-body">
          <div class="journal-top-banner">
            <div class="journal-badges-group">
              ${journal.accreditation ? `<div class="journal-sinta-badge"><i data-lucide="shield-check"></i> ${journal.accreditation}</div>` : ''}
              <div class="journal-year-badge"><i data-lucide="book-open"></i> ${journal.year}</div>
            </div>
            <div class="project-tags">
              ${(journal.tags || []).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
          </div>
          <div class="journal-publisher"><i data-lucide="award"></i> ${journal.publisher}</div>
          <h3 class="project-title">${journal.title}</h3>
          <p class="project-desc">${journal.abstract}</p>
          <div class="journal-doi">
            <strong>DOI:</strong> 
            <a href="${doiUrl}" target="_blank" rel="noopener" class="doi-link" title="Buka DOI artikel di tab baru">
              <span>${journal.doi}</span>
              <i data-lucide="external-link" style="width:12px; height:12px; display:inline-block;"></i>
            </a>
          </div>
          <div class="project-footer" style="margin-top:16px;">
            <a href="${journal.pdfUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
              <span>Baca Jurnal / PDF</span>
              <i data-lucide="file-text"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  renderJournalPaginationControls(paginationContainer, totalPages, currentJournalPage, (newPage) => {
    renderJournals(newPage);
    const section = document.getElementById('journals');
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

function renderJournalPaginationControls(container, totalPages, currentPage, onPageChange) {
  if (!container) return;
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" id="jrn-prev" data-cursor="pointer"><i data-lucide="chevron-left"></i> Prev</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}" data-cursor="pointer">${i}</button>`;
  }

  html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" id="jrn-next" data-cursor="pointer">Next <i data-lucide="chevron-right"></i></button>`;

  container.innerHTML = html;

  container.querySelectorAll('.page-number').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = parseInt(btn.getAttribute('data-page'));
      onPageChange(page);
    });
  });

  const prevBtn = container.querySelector('#jrn-prev');
  const nextBtn = container.querySelector('#jrn-next');

  if (prevBtn && currentPage > 1) {
    prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));
  }
  if (nextBtn && currentPage < totalPages) {
    nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));
  }
}
