/* ==========================================================================
   CUSTOM CURSOR TRACKING & DYNAMIC SPOTLIGHT SYSTEM
   ========================================================================== */

export class CustomCursorEngine {
  constructor() {
    this.cursor = document.getElementById('custom-cursor');
    this.dot = document.getElementById('cursor-dot');
    this.spotlight = document.getElementById('bg-spotlight');

    if (!this.cursor || !this.dot) return;

    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.pos = { x: this.mouse.x, y: this.mouse.y };
    this.dotPos = { x: this.mouse.x, y: this.mouse.y };

    this.bindEvents();
    this.startRenderLoop();
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      // Update ambient spotlight background (Brighter light glow following cursor)
      if (this.spotlight) {
        this.spotlight.style.background = `radial-gradient(circle 750px at ${e.clientX}px ${e.clientY}px, rgba(239, 68, 68, 0.35), rgba(220, 38, 38, 0.12) 40%, transparent 80%)`;
      }
    });

    // Handle interactive hover states
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const cursorType = target.getAttribute('data-cursor');
        if (cursorType === 'pointer') {
          this.cursor.classList.add('active');
        } else if (cursorType === 'drag') {
          this.cursor.classList.add('drag-mode');
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        this.cursor.classList.remove('active', 'drag-mode');
      }
    });
  }

  startRenderLoop() {
    const render = () => {
      // Lerp interpolation for smooth fluid spring cursor
      this.pos.x += (this.mouse.x - this.pos.x) * 0.15;
      this.pos.y += (this.mouse.y - this.pos.y) * 0.15;

      this.dotPos.x += (this.mouse.x - this.dotPos.x) * 0.45;
      this.dotPos.y += (this.mouse.y - this.dotPos.y) * 0.45;

      this.cursor.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0) translate(-50%, -50%)`;
      this.dot.style.transform = `translate3d(${this.dotPos.x}px, ${this.dotPos.y}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(render);
    };
    render();
  }
}
