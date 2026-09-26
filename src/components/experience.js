import * as lucide from 'lucide';
import { experienceData } from '../data/experience.js';
import { getCurrentLang, getTranslation, localize } from '../i18n.js';

export function renderExperience() {
  const container = document.getElementById('experience-grid');
  if (!container) return;

  // We change the class of experience-grid or container to timeline container
  container.className = 'experience-timeline-container';

  const lang = getCurrentLang();
  const viewDetailText = getTranslation('experience.viewDetails', lang) || 'Lihat Detail';

  let html = `
    <div class="timeline-central-spine"></div>
    <div class="timeline-items-wrapper">
  `;

  experienceData.forEach((item, index) => {
    const isEven = index % 2 === 0;
    const sideClass = isEven ? 'timeline-left' : 'timeline-right';
    const role = localize(item.role, lang);
    const category = item.category ? localize(item.category, lang) : 'EXPERIENCE';
    const company = localize(item.company, lang);
    const location = localize(item.location, lang);
    const year = item.year || (item.period ? localize(item.period, lang) : '');

    html += `
      <div class="timeline-row ${sideClass}">
        <!-- Node Dot on Central Line -->
        <div class="timeline-node-pin">
          <div class="timeline-node-core"></div>
        </div>

        <!-- Card Container -->
        <div class="timeline-card-box" data-exp-id="${item.id}" data-cursor="pointer">
          <div class="timeline-card-header">
            <span class="timeline-badge-pill">
              <i data-lucide="sparkles"></i> #${category}
            </span>
            <span class="timeline-year-tag">
              <i data-lucide="calendar"></i> ${year}
            </span>
          </div>

          <h3 class="timeline-role-title">${role}</h3>
          
          <div class="timeline-meta-row">
            <span class="timeline-company-name">${company}</span>
            ${location ? `<span class="timeline-meta-dot">•</span><span class="timeline-location-name"><i data-lucide="map-pin"></i> ${location}</span>` : ''}
          </div>

          <div class="timeline-card-actions">
            <button class="timeline-detail-btn" data-exp-id="${item.id}" data-cursor="pointer">
              <span>${viewDetailText}</span>
              <i data-lucide="chevron-down"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  html += `
    </div>
  `;

  container.innerHTML = html;

  // Hide pagination wrapper for experience since timeline shows natural journey flow
  const paginationContainer = document.getElementById('experience-pagination');
  if (paginationContainer) {
    paginationContainer.style.display = 'none';
  }

  // Attach click listeners to cards and detail buttons
  container.querySelectorAll('.timeline-detail-btn, .timeline-card-box').forEach(el => {
    el.addEventListener('click', (e) => {
      // Prevent bubbling twice if clicking the button inside card
      e.stopPropagation();
      const expId = parseInt(el.getAttribute('data-exp-id'));
      const item = experienceData.find(d => d.id === expId);
      if (item) {
        openExperienceModal(item);
      }
    });
  });

  try {
    if (lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons({ icons: lucide });
    }
  } catch (e) {
    console.warn(e);
  }
}

export function openExperienceModal(item) {
  const modal = document.getElementById('experience-modal');
  const modalBody = document.getElementById('experience-modal-body');
  if (!modal || !modalBody) return;

  const lang = getCurrentLang();
  const role = localize(item.role, lang);
  const company = localize(item.company, lang);
  const location = localize(item.location, lang);
  const period = localize(item.period, lang);
  const desc = localize(item.desc, lang);
  const category = item.category ? localize(item.category, lang) : 'EXPERIENCE';

  const highlights = Array.isArray(item.highlights)
    ? item.highlights
    : (item.highlights ? (item.highlights[lang] || item.highlights.id || []) : []);

  const docs = item.documentation || [];
  const modalDocHeader = getTranslation('experience.modalDoc', lang) || 'Dokumentasi & Galeri:';
  const modalHighlightsHeader = getTranslation('experience.modalHighlights', lang) || 'Tanggung Jawab & Kontribusi Kunci:';

  modalBody.innerHTML = `
    <div class="exp-modal-header">
      <div class="exp-modal-badges">
        <span class="timeline-badge-pill"><i data-lucide="sparkles"></i> #${category}</span>
        <span class="exp-modal-period"><i data-lucide="calendar"></i> ${period}</span>
      </div>
      <h2 class="exp-modal-title">${role}</h2>
      <div class="exp-modal-subline">
        <span class="exp-modal-company"><i data-lucide="building-2"></i> ${company}</span>
        ${location ? `<span class="timeline-meta-dot">•</span><span class="exp-modal-loc"><i data-lucide="map-pin"></i> ${location}</span>` : ''}
      </div>
    </div>

    <!-- Description -->
    <div class="exp-modal-section">
      <p class="exp-modal-desc">${desc}</p>
    </div>

    <!-- Tags / Tech Used -->
    ${item.tags && item.tags.length ? `
      <div class="exp-modal-tags">
        ${item.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
      </div>
    ` : ''}

    <!-- Highlights -->
    ${highlights.length ? `
      <div class="exp-modal-section">
        <h4 class="exp-modal-section-title"><i data-lucide="check-circle-2"></i> ${modalHighlightsHeader}</h4>
        <ul class="exp-modal-highlights">
          ${highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    ` : ''}

    <!-- Documentation & Visual Gallery -->
    ${docs.length ? `
      <div class="exp-modal-section">
        <h4 class="exp-modal-section-title"><i data-lucide="image"></i> ${modalDocHeader}</h4>
        <div class="exp-modal-gallery">
          ${docs.map(doc => {
            const caption = doc.caption ? localize(doc.caption, lang) : '';
            return `
              <div class="exp-gallery-item">
                <img src="${doc.url}" alt="${caption || role}" loading="lazy" />
                ${caption ? `<span class="exp-gallery-caption">${caption}</span>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : ''}
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

export function initExperienceModalEvents() {
  const modal = document.getElementById('experience-modal');
  const closeBtn = document.getElementById('experience-modal-close');

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

// Bind language change listener once
if (typeof window !== 'undefined') {
  window.addEventListener('languageChanged', () => {
    renderExperience();
  });
}
