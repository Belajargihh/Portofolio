/* ==========================================================================
   DYNAMIC TYPEWRITER EFFECT
   ========================================================================== */

export class TypewriterEngine {
  constructor(elementId, phrases) {
    this.el = document.getElementById(elementId);
    this.phrases = phrases || [
      'Creative Full-Stack Developer',
      'UI/UX Architecture Specialist',
      'Building High-Performance Web Apps',
      'Interactive Physics & Animation Expert'
    ];
    if (!this.el) return;

    this.phraseIdx = 0;
    this.charIdx = 0;
    this.isDeleting = false;
    this.typeSpeed = 80;
    this.deleteSpeed = 40;
    this.delayBetweenPhrases = 2000;
    this.timeoutId = null;

    this.start();
  }

  setPhrases(newPhrases) {
    if (!newPhrases || !newPhrases.length) return;
    this.phrases = newPhrases;
    this.phraseIdx = 0;
    this.charIdx = 0;
    this.isDeleting = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.el) this.el.textContent = '';
    this.start();
  }

  start() {
    if (!this.el) return;
    const currentPhrase = this.phrases[this.phraseIdx];
    if (!currentPhrase) return;

    if (this.isDeleting) {
      this.el.textContent = currentPhrase.substring(0, this.charIdx - 1);
      this.charIdx--;
    } else {
      this.el.textContent = currentPhrase.substring(0, this.charIdx + 1);
      this.charIdx++;
    }

    let nextSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.charIdx === currentPhrase.length) {
      nextSpeed = this.delayBetweenPhrases;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIdx === 0) {
      this.isDeleting = false;
      this.phraseIdx = (this.phraseIdx + 1) % this.phrases.length;
      nextSpeed = 400;
    }

    this.timeoutId = setTimeout(() => this.start(), nextSpeed);
  }
}
