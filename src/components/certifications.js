/* ==========================================================================
   CERTIFICATIONS 3D STACKING DECK CAROUSEL (CoverFlow Perspective Animation)
   Matches Featured Projects Showcase Design Aesthetics
   ========================================================================== */

import * as lucide from 'lucide';
import { certificationsData } from '../data/certifications.js';
import { getCurrentLang, getTranslation, localize } from '../i18n.js';

let activeCertIndex = 0;
let currentCertFilter = 'all';
let filteredCerts = [...certificationsData];

export function renderCertifications(filter = currentCertFilter, initialIndex = 0) {
  currentCertFilter = filter;
  const container = document.getElementById('certifications-grid');
  const paginationContainer = document.getElementById('certifications-pagination');
  if (!container) return;

  filteredCerts = filter === 'all'
    ? certificationsData
    : certificationsData.filter(c => Array.isArray(c.category) ? c.category.includes(filter) : c.category === filter);

  if (filteredCerts.length === 0) {
    container.className = 'projects-grid';
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: var(--text-muted);">
        <i data-lucide="award" style="width: 48px; height: 48px; margin: 0 auto 16px; display: block; opacity: 0.5;"></i>
        <p style="font-size: 1.1rem; margin-bottom: 8px;">${getTranslation('certifications.emptyTitle') || 'Belum ada sertifikat di kategori ini.'}</p>
        <p style="font-size: 0.9rem; opacity: 0.7;">${getTranslation('certifications.emptySub') || 'Sertifikat baru akan segera ditambahkan.'}</p>
      </div>
    `;
    if (paginationContainer) paginationContainer.innerHTML = '';
    try {
      if (lucide && typeof lucide.createIcons === 'function') lucide.createIcons({ icons: lucide });
    } catch (e) {}
    return;
  }

  activeCertIndex = Math.max(0, Math.min(initialIndex, filteredCerts.length - 1));

  // Use the same 3D stack stage container as Featured Projects
  container.className = 'projects-stack-stage certs-stack-stage';

  const lang = getCurrentLang();
  const viewDetailsText = getTranslation('certifications.viewDetails', lang) || 'Detail Sertifikat';
  const verifyText = getTranslation('certifications.verify', lang) || 'Verifikasi Resmi';

  let cardsHtml = `
    <div class="projects-stack-viewport certs-stack-viewport" id="certs-stack-viewport">
  `;

  filteredCerts.forEach((cert, idx) => {
    const title = localize(cert.title, lang);
    const badgeText = cert.badge || (cert.tags && cert.tags[0] ? cert.tags[0] : 'CERTIFICATION');
    const certNum = idx < 9 ? `'0${idx + 1}` : `'${idx + 1}`;

    cardsHtml += `
      <div class="project-stack-card cert-stack-card" data-index="${idx}" data-cursor="pointer">
        <!-- Top Pill Tag & Year/Number badge -->
        <div class="stack-card-badge-row cert-card-badge-row">
          <span class="stack-card-pill cert-card-pill">
            <i data-lucide="award"></i> #${badgeText}
          </span>
          <span class="stack-card-num">${certNum}</span>
        </div>

        <!-- Certificate Screenshot / Preview Image -->
        <div class="stack-card-img-wrapper cert-card-img-wrapper">
          <img src="${cert.image}" alt="${title}" class="stack-card-img cert-card-img" loading="lazy" />
          <div class="stack-card-overlay">
            <button class="btn btn-primary btn-sm stack-details-btn cert-details-btn" data-id="${cert.id}">
              <span>${viewDetailsText}</span>
              <i data-lucide="eye"></i>
            </button>
            ${cert.verifyUrl ? `
            <a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" onclick="event.stopPropagation();">
              <span>${verifyText}</span>
              <i data-lucide="shield-check"></i>
            </a>` : ''}
            ${cert.pdfUrl ? `
            <a href="${cert.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm cert-pdf-btn" onclick="event.stopPropagation();" title="Buka PDF">
              <i data-lucide="file-text"></i>
            </a>` : ''}
          </div>
        </div>

        <!-- Card Content Body -->
        <div class="stack-card-body cert-card-body">
          <div class="cert-issuer-meta">
            <img src="${cert.issuerLogo}" alt="${cert.issuer}" class="cert-issuer-icon" onerror="this.style.display='none'" />
            <span class="cert-issuer-name">${cert.issuer}</span>
            <span class="cert-meta-dot">&bull;</span>
            <span class="cert-issue-date">${cert.issueDate}</span>
          </div>
          <h3 class="stack-card-title cert-card-title">${title}</h3>
          <div class="project-tags">
            ${(cert.tags || []).slice(0, 5).map(tag => `<span class="project-tag cert-tag">${tag}</span>`).join('')}
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
  renderCertStackControls(paginationContainer, filteredCerts.length, activeCertIndex);

  // Apply 3D perspective transforms
  updateCertStackPositions();

  // Attach card click handlers
  container.querySelectorAll('.cert-stack-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'));
      if (idx !== activeCertIndex) {
        goToCertSlide(idx);
      }
    });
  });

  // Attach detail buttons
  container.querySelectorAll('.cert-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute('data-id'));
      openCertModal(id);
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

function updateCertStackPositions() {
  const cards = document.querySelectorAll('.cert-stack-card');
  const total = cards.length;
  if (!total) return;

  const isMobile = window.innerWidth < 768;

  cards.forEach((card, idx) => {
    const diff = idx - activeCertIndex;

    card.classList.remove('is-active', 'is-next', 'is-prev', 'is-hidden');

    if (diff === 0) {
      card.classList.add('is-active');
      card.style.transform = `translateX(0px) translateZ(0px) scale(1) rotateY(0deg)`;
      card.style.zIndex = '30';
      card.style.opacity = '1';
      card.style.pointerEvents = 'auto';
    } else if (diff > 0) {
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
  document.querySelectorAll('.cert-stack-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === activeCertIndex);
  });

  // Update Prev / Next buttons
  const prevBtn = document.getElementById('cert-stack-prev-btn');
  const nextBtn = document.getElementById('cert-stack-next-btn');
  if (prevBtn) prevBtn.classList.toggle('disabled', activeCertIndex === 0);
  if (nextBtn) nextBtn.classList.toggle('disabled', activeCertIndex === total - 1);
}

function goToCertSlide(newIndex) {
  if (newIndex < 0 || newIndex >= filteredCerts.length) return;
  activeCertIndex = newIndex;
  updateCertStackPositions();
}

function renderCertStackControls(container, total, currentIndex) {
  if (!container) return;
  if (total <= 1) {
    container.innerHTML = '';
    return;
  }

  const prevText = getTranslation('certifications.prev') || 'Prev';
  const nextText = getTranslation('certifications.next') || 'Next';

  let dotsHtml = '';
  for (let i = 0; i < total; i++) {
    dotsHtml += `<button class="stack-dot cert-stack-dot ${i === currentIndex ? 'active' : ''}" data-index="${i}" aria-label="Certificate ${i+1}" data-cursor="pointer"></button>`;
  }

  container.innerHTML = `
    <div class="stack-controls-wrapper cert-controls-wrapper">
      <button class="stack-nav-btn ${currentIndex === 0 ? 'disabled' : ''}" id="cert-stack-prev-btn" data-cursor="pointer">
        <i data-lucide="chevron-left"></i>
        <span>${prevText}</span>
      </button>

      <div class="stack-dots-container">
        ${dotsHtml}
      </div>

      <button class="stack-nav-btn ${currentIndex === total - 1 ? 'disabled' : ''}" id="cert-stack-next-btn" data-cursor="pointer">
        <span>${nextText}</span>
        <i data-lucide="chevron-right"></i>
      </button>
    </div>
  `;

  const prevBtn = container.querySelector('#cert-stack-prev-btn');
  const nextBtn = container.querySelector('#cert-stack-next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (activeCertIndex > 0) goToCertSlide(activeCertIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (activeCertIndex < total - 1) goToCertSlide(activeCertIndex + 1);
    });
  }

  container.querySelectorAll('.cert-stack-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'));
      goToCertSlide(idx);
    });
  });

  try {
    if (lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons({ icons: lucide });
    }
  } catch (e) {}
}

export function initCertificateFilters() {
  const filterBtns = document.querySelectorAll('.certificate-filters .filter-btn');

  filterBtns.forEach(btn => {
    const filter = btn.getAttribute('data-filter');
    if (filter !== 'all') {
      const hasCerts = certificationsData.some(c =>
        Array.isArray(c.category) ? c.category.includes(filter) : c.category === filter
      );
      if (!hasCerts) {
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
      renderCertifications(filter, 0);
    });
  });
}

export function openCertModal(id) {
  const cert = certificationsData.find(c => c.id === id);
  if (!cert) return;

  const lang = getCurrentLang();
  const modal = document.getElementById('certificate-modal');
  const modalBody = document.getElementById('certificate-modal-body');
  if (!modal || !modalBody) return;

  const title = localize(cert.title, lang);
  const desc = localize(cert.desc, lang);
  const highlightsList = cert.highlights
    ? (cert.highlights[lang] || cert.highlights.id || [])
    : [];

  const verifyLabel = getTranslation('certifications.verifyOfficial', lang) || 'Verifikasi di freeCodeCamp.org';
  const openPdfLabel = getTranslation('certifications.viewPdf', lang) || 'Buka PDF Asli';
  const downloadPdfLabel = getTranslation('certifications.downloadPdf', lang) || 'Download PDF';
  const competenciesHeader = getTranslation('certifications.competencies', lang) || 'Kompetensi & Proyek yang Diselesaikan:';
  const issuedByLabel = getTranslation('certifications.issuedBy', lang) || 'Diterbitkan oleh';
  const issueDateLabel = getTranslation('certifications.issueDate', lang) || 'Tanggal Terbit';
  const hoursLabel = getTranslation('certifications.hours', lang) || 'Beban Pembelajaran';
  const credentialIdLabel = getTranslation('certifications.credentialId', lang) || 'ID Kredensial';

  modalBody.innerHTML = `
    <div class="modal-header">
      <!-- Certificate Preview Container -->
      <div class="cert-modal-preview-wrapper">
        <img src="${cert.image}" alt="${title}" class="cert-modal-image" />
        <a href="${cert.pdfUrl}" target="_blank" rel="noopener noreferrer" class="cert-modal-overlay-badge" title="${openPdfLabel}">
          <i data-lucide="maximize-2"></i>
          <span>${openPdfLabel}</span>
        </a>
      </div>

      <!-- Tags & Meta -->
      <div class="project-tags" style="margin-bottom:12px;">
        ${(cert.tags || []).map(t => `<span class="project-tag cert-tag">${t}</span>`).join('')}
      </div>

      <h2 style="font-size:1.8rem; margin-bottom:12px; line-height:1.3;">${title}</h2>
      
      <!-- Key Meta Badges -->
      <div class="cert-modal-meta-grid">
        <div class="cert-meta-card">
          <span class="cert-meta-label">${issuedByLabel}</span>
          <span class="cert-meta-val"><img src="${cert.issuerLogo}" alt="" class="cert-mini-icon" onerror="this.style.display='none'"/> ${cert.issuer}</span>
        </div>
        <div class="cert-meta-card">
          <span class="cert-meta-label">${issueDateLabel}</span>
          <span class="cert-meta-val">${cert.issueDate}</span>
        </div>
        <div class="cert-meta-card">
          <span class="cert-meta-label">${hoursLabel}</span>
          <span class="cert-meta-val">${cert.hours}</span>
        </div>
        <div class="cert-meta-card">
          <span class="cert-meta-label">${credentialIdLabel}</span>
          <span class="cert-meta-val font-mono">${cert.credentialId}</span>
        </div>
      </div>

      <p style="color:var(--text-muted); margin-bottom:24px; font-size:0.95rem; line-height:1.6;">${desc}</p>
    </div>
    
    <!-- Competencies & Highlights -->
    <div style="margin-bottom:28px;">
      <h4 style="margin-bottom:14px; color:var(--accent-cyan); display:flex; align-items:center; gap:8px;">
        <i data-lucide="check-circle-2"></i>
        <span>${competenciesHeader}</span>
      </h4>
      <ul class="cert-competencies-list">
        ${highlightsList.map(h => `<li><i data-lucide="check"></i> <span>${h}</span></li>`).join('')}
      </ul>
    </div>

    <!-- Actions -->
    <div style="display:flex; gap:16px; flex-wrap:wrap;">
      ${cert.verifyUrl ? `
      <a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
        <i data-lucide="shield-check"></i>
        <span>${verifyLabel}</span>
      </a>` : ''}
      ${cert.pdfUrl ? `
      <a href="${cert.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
        <i data-lucide="file-text"></i>
        <span>${openPdfLabel}</span>
      </a>
      <a href="${cert.pdfUrl}" download="${(cert.title?.eng || 'Certificate').replace(/[^a-zA-Z0-9]/g, '-')}-Billy-Jes.pdf" class="btn btn-outline btn-sm">
        <i data-lucide="download"></i>
        <span>${downloadPdfLabel}</span>
      </a>` : ''}
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

export function initCertificateModalEvents() {
  const modal = document.getElementById('certificate-modal');
  const closeBtn = document.getElementById('certificate-modal-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal && modal.classList.remove('open'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }
}

// Window resize listener and language change listener
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    updateCertStackPositions();
  });
  window.addEventListener('languageChanged', () => {
    renderCertifications(currentCertFilter, activeCertIndex);
  });
}
