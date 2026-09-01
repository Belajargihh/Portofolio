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

    this.start();
  }

  start() {
    const currentPhrase = this.phrases[this.phraseIdx];

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

    setTimeout(() => this.start(), nextSpeed);
  }
}
