/* ==========================================================================
   SKILLS & TOOLS STACK (DOM TAB FILTERING & 5x3 SHOW MORE/LESS)
   ========================================================================== */

export function initSkillsTabs() {
  const tabs = document.querySelectorAll('.skills-tabs .tab-btn');
  const cards = Array.from(document.querySelectorAll('#skills-grid .skill-card'));
  const toggleBtn = document.getElementById('skills-toggle-btn');
  const toggleText = document.getElementById('skills-toggle-text');
  const toggleIcon = document.getElementById('skills-toggle-icon');

  if (!tabs.length || !cards.length) return;

  function getDefaultLimit() { return window.innerWidth < 768 ? 8 : 15; }
  let currentCategory = 'all';
  let isExpanded = false;

  function updateSkillsDisplay() {
    // 1. Get matching cards for current category
    const matchingCards = cards.filter(card => {
      const itemCat = card.getAttribute('data-category');
      return currentCategory === 'all' || itemCat === currentCategory;
    });

    // 2. Hide non-matching cards
    cards.forEach(card => {
      const itemCat = card.getAttribute('data-category');
      if (currentCategory !== 'all' && itemCat !== currentCategory) {
        card.style.display = 'none';
      }
    });

    // 3. Handle matching cards display based on limit & expanded state
    matchingCards.forEach((card, index) => {
      if (!isExpanded && index >= getDefaultLimit()) {
        card.style.display = 'none';
      } else {
        card.style.display = 'flex';
      }
    });

    // 4. Update toggle button state
    if (toggleBtn) {
      if (matchingCards.length > getDefaultLimit()) {
        toggleBtn.style.display = 'inline-flex';
        const remainingCount = matchingCards.length - getDefaultLimit();

        if (isExpanded) {
          if (toggleText) toggleText.textContent = 'Show Less';
          if (toggleIcon) toggleIcon.setAttribute('data-lucide', 'chevron-up');
        } else {
          if (toggleText) toggleText.textContent = 'Show More';
          if (toggleIcon) toggleIcon.setAttribute('data-lucide', 'chevron-down');
        }

        try {
          if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
          }
        } catch (e) {
          console.warn('Lucide re-render warning:', e);
        }
      } else {
        toggleBtn.style.display = 'none';
      }
    }
  }

  // Bind tab click events
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-tab');
      isExpanded = false; // Reset expansion state when changing tab
      updateSkillsDisplay();
    });
  });

  // Bind toggle button click event
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      updateSkillsDisplay();

      if (!isExpanded) {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
          skillsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // Initial render
  updateSkillsDisplay();
}

