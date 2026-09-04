/* ==========================================================================
   3D PERSPECTIVE TILT EFFECT
   ========================================================================== */

export function init3DTiltEffect() {
  const elements = document.querySelectorAll('[data-tilt]');

  elements.forEach((el) => {
    el.style.transformStyle = 'preserve-3d';

    el.addEventListener('mousemove', (e) => {
      if (el.dataset.swapping === 'true') return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    el.addEventListener('mouseleave', () => {
      if (el.dataset.swapping === 'true') return;

      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      el.style.transition = 'transform 0.5s ease';
    });

    el.addEventListener('mouseenter', () => {
      if (el.dataset.swapping === 'true') return;

      el.style.transition = 'none';
    });
  });
}
