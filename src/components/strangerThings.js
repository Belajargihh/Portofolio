/* ==========================================================================
   STRANGER THINGS ATMOSPHERE ENGINE (THE UPSIDE DOWN SPORES & NEON BLOOM)
   --------------------------------------------------------------------------
   Lightweight 60fps canvas simulation of floating glowing embers & spores
   drifting in the dark red Hawkins / Upside Down dimension.
   ========================================================================== */

export class UpsideDownAtmosphere {
  constructor(canvasId = 'upside-down-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = window.innerWidth < 768 ? 26 : 48;
    this.animationFrameId = null;
    this.mouse = { vx: 0, vy: 0 };
    this.lastMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.isVisible = true;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Subtle atmospheric breeze when cursor moves
    window.addEventListener('mousemove', (e) => {
      this.mouse.vx = (e.clientX - this.lastMouse.x) * 0.04;
      this.mouse.vy = (e.clientY - this.lastMouse.y) * 0.04;
      this.lastMouse.x = e.clientX;
      this.lastMouse.y = e.clientY;
    });

    // Pause when page is hidden to save CPU/battery
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
      if (this.isVisible && !this.animationFrameId) {
        this.animate();
      }
    });

    this.createParticles();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    const isCrimsonEmber = Math.random() > 0.35;
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * 2.4 + 0.8,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.4 + 0.15), // Drifts gently upward like floating embers
      alpha: Math.random() * 0.55 + 0.2,
      targetAlpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.015 + 0.005,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.015,
      color: isCrimsonEmber
        ? (Math.random() > 0.4 ? '239, 68, 68' : '249, 115, 22') // Hawkins Red / Amber
        : '254, 202, 202' // Subtle pale spore
    };
  }

  animate() {
    if (!this.isVisible) {
      this.animationFrameId = null;
      return;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Subtle natural drifting wave
      p.angle += p.angleSpeed;
      p.x += p.vx + Math.sin(p.angle) * 0.3 + (this.mouse.vx || 0) * 0.12;
      p.y += p.vy + (this.mouse.vy || 0) * 0.12;

      // Soft glow pulse
      p.alpha += (p.targetAlpha - p.alpha) * p.pulseSpeed;
      if (Math.abs(p.targetAlpha - p.alpha) < 0.04) {
        p.targetAlpha = Math.random() * 0.6 + 0.2;
      }

      // Wrap around bounds
      if (p.y < -20) {
        p.y = this.height + 15;
        p.x = Math.random() * this.width;
      }
      if (p.x < -20) p.x = this.width + 15;
      if (p.x > this.width + 20) p.x = -15;

      // Outer glow halo
      const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
      grad.addColorStop(0, 'rgba(' + p.color + ', ' + p.alpha + ')');
      grad.addColorStop(0.45, 'rgba(' + p.color + ', ' + (p.alpha * 0.35) + ')');
      grad.addColorStop(1, 'rgba(' + p.color + ', 0)');

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
      this.ctx.fillStyle = grad;
      this.ctx.fill();

      // Bright ember core
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius * 0.75, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(255, 255, 255, ' + (p.alpha * 0.85) + ')';
      this.ctx.fill();
    }

    // Decay mouse breeze
    this.mouse.vx *= 0.92;
    this.mouse.vy *= 0.92;

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
