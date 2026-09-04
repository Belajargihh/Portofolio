/* ==========================================================================
   SMOOTH POSITION-SWAPPING ANIMATION ENGINE (Fast Multi-Pair Card Swapper)
   ========================================================================== */

export class SkillsPuzzleEngine {
  constructor(gridId) {
    this.gridContainer = document.getElementById(gridId);
    if (!this.gridContainer) {
      console.error('[Puzzle] Grid container not found:', gridId);
      return;
    }

    this.isSwapping = false;
    this.timer = null;
    this.swapCount = 0;

    console.log('[Puzzle] Constructor OK, grid found');
    this.init();
  }

  init() {
    this.gridContainer.classList.remove('skills-puzzle-active');
    this.gridContainer.style.height = '';
    this.gridContainer.style.position = '';

    const emptySlot = this.gridContainer.querySelector('.empty-slot-indicator');
    if (emptySlot) emptySlot.remove();

    const cards = this.gridContainer.querySelectorAll('.skill-card');
    console.log('[Puzzle] Total skill-card elements:', cards.length);

    cards.forEach(card => {
      card.style.position = '';
      card.style.transform = '';
      card.style.width = '';
      card.style.height = '';
    });

    this.startSwapLoop();
  }

  getCards() {
    // Simple filter: only include cards whose inline display is NOT 'none'
    return Array.from(this.gridContainer.querySelectorAll('.skill-card')).filter(card => {
      return card.style.display !== 'none';
    });
  }

  swapMultiplePairs(pairCount = 2) {
    if (this.isSwapping) return;

    const cards = this.getCards();
    if (cards.length < 4) {
      console.warn('[Puzzle] Not enough visible cards:', cards.length);
      return;
    }

    // Log first 3 ticks for debugging
    this.swapCount++;
    if (this.swapCount <= 3) {
      console.log(`[Puzzle] Tick #${this.swapCount}, visible cards: ${cards.length}`);
    }

    const usedIndices = new Set();
    const pairsToSwap = [];

    for (let p = 0; p < pairCount; p++) {
      const availableIndices = cards
        .map((_, i) => i)
        .filter(i => !usedIndices.has(i));

      if (availableIndices.length < 2) break;

      const indexA = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      
      const possibleNeighbors = [indexA - 1, indexA + 1, indexA - 5, indexA + 5, indexA - 4, indexA + 4].filter(
        i => i >= 0 && i < cards.length && !usedIndices.has(i)
      );

      if (possibleNeighbors.length === 0) continue;

      const indexB = possibleNeighbors[Math.floor(Math.random() * possibleNeighbors.length)];

      usedIndices.add(indexA);
      usedIndices.add(indexB);
      pairsToSwap.push({ cardA: cards[indexA], cardB: cards[indexB] });
    }

    if (pairsToSwap.length === 0) return;

    this.isSwapping = true;

    // 1. Calculate deltas and animate
    pairsToSwap.forEach(({ cardA, cardB }) => {
      cardA.dataset.swapping = 'true';
      cardB.dataset.swapping = 'true';

      const rectA = cardA.getBoundingClientRect();
      const rectB = cardB.getBoundingClientRect();

      const dxA = rectB.left - rectA.left;
      const dyA = rectB.top - rectA.top;
      const dxB = rectA.left - rectB.left;
      const dyB = rectA.top - rectB.top;

      // Force reset before animating
      cardA.style.transition = 'none';
      cardB.style.transition = 'none';
      cardA.style.transform = '';
      cardB.style.transform = '';

      cardA.style.zIndex = '30';
      cardB.style.zIndex = '30';

      // Force reflow
      void cardA.offsetHeight;

      // Now set transition and target transform
      cardA.style.transition = 'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)';
      cardB.style.transition = 'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)';

      // Force reflow again so browser registers the transition
      void cardA.offsetHeight;

      cardA.style.transform = `translate3d(${dxA}px, ${dyA}px, 0)`;
      cardB.style.transform = `translate3d(${dxB}px, ${dyB}px, 0)`;
    });

    // 2. After transition ends, swap DOM order
    setTimeout(() => {
      pairsToSwap.forEach(({ cardA, cardB }) => {
        // Remove animation
        cardA.style.transition = 'none';
        cardB.style.transition = 'none';
        cardA.style.transform = '';
        cardB.style.transform = '';
        cardA.style.zIndex = '';
        cardB.style.zIndex = '';

        // Swap DOM positions using placeholder
        if (cardA.parentNode && cardB.parentNode && cardA.parentNode === cardB.parentNode) {
          const placeholder = document.createComment('swap');
          cardA.parentNode.insertBefore(placeholder, cardA);
          cardB.parentNode.insertBefore(cardA, cardB);
          placeholder.parentNode.insertBefore(cardB, placeholder);
          placeholder.remove();
        }

        delete cardA.dataset.swapping;
        delete cardB.dataset.swapping;
      });

      // Restore transition for future animations
      requestAnimationFrame(() => {
        this.isSwapping = false;
      });
    }, 400);
  }

  startSwapLoop() {
    this.stopSwapLoop();
    console.log('[Puzzle] Starting swap loop');
    this.timer = setInterval(() => {
      this.swapMultiplePairs(2);
    }, 1400);
  }

  stopSwapLoop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}






