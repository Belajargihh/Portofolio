/* ==========================================================================
   ACADEMIC JOURNALS & RESEARCH ARTICLES (3x2 GRID WITH PAGINATION & i18n)
   ========================================================================== */

import * as lucide from 'lucide';
import { journalsData } from '../data/journals.js';
import { getCurrentLang, getTranslation, localize } from '../i18n.js';

let currentJournalPage = 1;
function getItemsPerPage() { return window.innerWidth < 768 ? 2 : 3; }

export function renderJournals(page = currentJournalPage) {
  currentJournalPage = page;
  const container = document.getElementById('journals-grid');
  const paginationContainer = document.getElementById('journals-pagination');
  if (!container) return;

  const totalPages = Math.ceil(journalsData.length / getItemsPerPage()) || 1;
  if (currentJournalPage > totalPages) currentJournalPage = totalPages;

  const startIndex = (currentJournalPage - 1) * getItemsPerPage();
  const paginatedItems = journalsData.slice(startIndex, startIndex + getItemsPerPage());

  const lang = getCurrentLang();
  const readJournalText = getTranslation('journals.readJournal', lang);

  container.innerHTML = paginatedItems.map(journal => {
    const doiUrl = (journal.doi || '').startsWith('http') ? journal.doi : `https://doi.org/${journal.doi}`;
    const title = localize(journal.title, lang);
    const abstract = localize(journal.abstract, lang);

    return `
      <div class="project-card journal-card" data-cursor="pointer">
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
          <h3 class="project-title">${title}</h3>
          <p class="project-desc">${abstract}</p>
          <div class="journal-doi">
            <strong>DOI:</strong> 
            <a href="${doiUrl}" target="_blank" rel="noopener" class="doi-link" title="Buka DOI artikel di tab baru">
              <span>${journal.doi}</span>
              <i data-lucide="external-link" style="width:12px; height:12px; display:inline-block;"></i>
            </a>
          </div>
          <div class="project-footer" style="margin-top:16px;">
            <a href="${journal.pdfUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
              <span>${readJournalText}</span>
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
    if (lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons({ icons: lucide });
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

  const prevText = getTranslation('journals.prev');
  const nextText = getTranslation('journals.next');

  let html = `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" id="jrn-prev" data-cursor="pointer"><i data-lucide="chevron-left"></i> ${prevText}</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}" data-cursor="pointer">${i}</button>`;
  }

  html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" id="jrn-next" data-cursor="pointer">${nextText} <i data-lucide="chevron-right"></i></button>`;

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

// Bind language change listener once
if (typeof window !== 'undefined') {
  window.addEventListener('languageChanged', () => {
    renderJournals(currentJournalPage);
  });
}
