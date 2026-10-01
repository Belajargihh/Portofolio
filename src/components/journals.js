/* ==========================================================================
   ACADEMIC JOURNALS & RESEARCH ARTICLES (COMPACT CARDS + DETAIL MODAL & i18n)
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
  const viewDetailsText = getTranslation('journals.viewDetails', lang) || 'Lihat Detail';

  container.innerHTML = paginatedItems.map(journal => {
    const title = localize(journal.title, lang);

    return `
      <div class="project-card journal-card" data-journal-id="${journal.id}" data-cursor="pointer">
        <div class="project-body journal-body">
          <div class="journal-top-banner">
            <div class="journal-badges-group">
              ${journal.accreditation ? `<div class="journal-sinta-badge"><i data-lucide="shield-check"></i> ${journal.accreditation}</div>` : ''}
              <div class="journal-year-badge"><i data-lucide="calendar"></i> ${journal.year}</div>
            </div>
          </div>

          <div class="journal-publisher">
            <i data-lucide="award"></i>
            <span>${journal.publisher}</span>
          </div>

          <h3 class="project-title journal-title">${title}</h3>

          <div class="journal-card-footer">
            <button class="journal-detail-btn" data-journal-id="${journal.id}" data-cursor="pointer">
              <span>${viewDetailsText}</span>
              <i data-lucide="chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach card click events to open modal
  container.querySelectorAll('.journal-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const journalId = parseInt(card.getAttribute('data-journal-id'));
      const item = journalsData.find(j => j.id === journalId);
      if (item) {
        openJournalModal(item);
      }
    });
  });

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

export function openJournalModal(journal) {
  const modal = document.getElementById('journal-modal');
  const modalBody = document.getElementById('journal-modal-body');
  if (!modal || !modalBody) return;

  const lang = getCurrentLang();
  const title = localize(journal.title, lang);
  const abstract = localize(journal.abstract, lang);
  const doiUrl = journal.doiUrl || ((journal.doi || '').startsWith('http') ? journal.doi : `https://doi.org/${journal.doi}`);
  const readJournalText = getTranslation('journals.readJournal', lang) || 'Baca Jurnal / PDF';
  const modalAbstractText = getTranslation('journals.modalAbstract', lang) || 'Abstrak Penelitian';
  const modalTagsText = getTranslation('journals.modalTags', lang) || 'Topik & Kata Kunci';
  const liveDemoText = getTranslation('projects.liveDemo', lang) || 'Live Demo';
  const liveBtnLabel = journal.liveLabel ? localize(journal.liveLabel, lang) : liveDemoText;

  modalBody.innerHTML = `
    <div class="journal-modal-header">
      <div class="journal-modal-badges">
        ${journal.accreditation ? `<div class="journal-sinta-badge"><i data-lucide="shield-check"></i> ${journal.accreditation}</div>` : ''}
        <div class="journal-year-badge"><i data-lucide="calendar"></i> ${journal.year}</div>
      </div>
      <h2 class="journal-modal-title">${title}</h2>
      <div class="journal-modal-publisher">
        <i data-lucide="award"></i>
        <span>${journal.publisher}</span>
      </div>
    </div>

    ${journal.tags && journal.tags.length ? `
      <div class="journal-modal-section">
        <h4 class="journal-modal-section-title"><i data-lucide="tag"></i> ${modalTagsText}</h4>
        <div class="project-tags">
          ${journal.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
      </div>
    ` : ''}

    <div class="journal-modal-section">
      <h4 class="journal-modal-section-title"><i data-lucide="file-text"></i> ${modalAbstractText}</h4>
      <p class="journal-modal-abstract">${abstract}</p>
    </div>

    ${journal.doi ? `
      <div class="journal-modal-doi">
        <strong>DOI:</strong>
        <a href="${doiUrl}" target="_blank" rel="noopener" class="doi-link" title="Buka tautan artikel">
          <span>${journal.doi}</span>
          <i data-lucide="external-link" style="width:13px; height:13px; display:inline-block;"></i>
        </a>
      </div>
    ` : ''}

    <div class="journal-modal-actions">
      <a href="${journal.pdfUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
        <i data-lucide="file-text"></i>
        <span>${readJournalText}</span>
      </a>
      ${journal.liveUrl ? `
        <a href="${journal.liveUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
          <i data-lucide="external-link"></i>
          <span>${liveBtnLabel}</span>
        </a>
      ` : ''}
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

export function initJournalModalEvents() {
  const modal = document.getElementById('journal-modal');
  const closeBtn = document.getElementById('journal-modal-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) modal.classList.remove('open');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  }

  // Escape key support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });
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
