/* ==========================================================================
   SMOOTH POSITION-SWAPPING ANIMATION ENGINE (Fast Multi-Pair Card Swapper)
   ========================================================================== */

export class SkillsPuzzleEngine {
  constructor(gridId) {
    this.gridContainer = document.getElementById(gridId);
    if (!this.gridContainer) return;

    this.isPaused = false;
    this.isSwapping = false;
    this.timer = null;

    this.init();
  }

  init() {
    // Remove old puzzle game mode elements if present
    this.gridContainer.classList.remove('skills-puzzle-active');
    this.gridContainer.style.height = '';
    this.gridContainer.style.position = '';

    const emptySlot = this.gridContainer.querySelector('.empty-slot-indicator');
    if (emptySlot) emptySlot.remove();

    // Set fast smooth transition for all skill cards
    const cards = this.gridContainer.querySelectorAll('.skill-card');
    cards.forEach(card => {
      card.style.position = '';
      card.style.transform = '';
      card.style.width = '';
      card.style.height = '';
      card.style.transition = 'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s, box-shadow 0.3s';
    });

    this.bindHoverEvents();
    this.startSwapLoop();
  }

  bindHoverEvents() {
    this.gridContainer.addEventListener('mouseenter', () => {
      this.isPaused = true;
    });

    this.gridContainer.addEventListener('mouseleave', () => {
      this.isPaused = false;
    });
  }

  getCards() {
    return Array.from(this.gridContainer.querySelectorAll('.skill-card:not([style*="display: none"])'));
  }

  swapMultiplePairs(pairCount = 2) {
    if (this.isPaused || this.isSwapping) return;

    const cards = this.getCards();
    if (cards.length < 4) return;

    const usedIndices = new Set();
    const pairsToSwap = [];

    for (let p = 0; p < pairCount; p++) {
      const availableIndices = cards
        .map((_, i) => i)
        .filter(i => !usedIndices.has(i));

      if (availableIndices.length < 2) break;

      // Pick a random card A from available ones
      const indexA = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      
      // Find valid adjacent neighbor B that hasn't been used in this batch
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

    // 1. Calculate positions and trigger smooth transform glides simultaneously
    pairsToSwap.forEach(({ cardA, cardB }) => {
      const rectA = cardA.getBoundingClientRect();
      const rectB = cardB.getBoundingClientRect();

      const dxA = rectB.left - rectA.left;
      const dyA = rectB.top - rectA.top;

      const dxB = rectA.left - rectB.left;
      const dyB = rectA.top - rectB.top;

      cardA.style.zIndex = '10';
      cardB.style.zIndex = '10';
      cardA.style.transform = `translate3d(${dxA}px, ${dyA}px, 0)`;
      cardB.style.transform = `translate3d(${dxB}px, ${dyB}px, 0)`;
    });

    // 2. After 380ms transition, swap DOM order cleanly
    setTimeout(() => {
      pairsToSwap.forEach(({ cardA, cardB }) => {
        cardA.style.transition = 'none';
        cardB.style.transition = 'none';
        cardA.style.transform = '';
        cardB.style.transform = '';
        cardA.style.zIndex = '';
        cardB.style.zIndex = '';

        const siblingA = cardA.nextSibling === cardB ? cardA : cardA.nextSibling;
        this.gridContainer.insertBefore(cardA, cardB);
        this.gridContainer.insertBefore(cardB, siblingA);
      });

      requestAnimationFrame(() => {
        cards.forEach(c => {
          c.style.transition = 'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s, box-shadow 0.3s';
        });
        this.isSwapping = false;
      });
    }, 400);
  }

  startSwapLoop() {
    this.stopSwapLoop();
    this.timer = setInterval(() => {
      // Swaps 2 pairs simultaneously every 1.4 seconds!
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
