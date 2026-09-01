/* ==========================================================================
   SKILLS & TOOLS STACK (DOM TAB FILTERING)
   ========================================================================== */

export function initSkillsTabs() {
  const tabs = document.querySelectorAll('.skills-tabs .tab-btn');
  const cards = document.querySelectorAll('#skills-grid .skill-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const selectedCategory = tab.getAttribute('data-tab');

      cards.forEach(card => {
        const itemCat = card.getAttribute('data-category');
        if (selectedCategory === 'all' || itemCat === selectedCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
