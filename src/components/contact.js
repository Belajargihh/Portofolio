/* ==========================================================================
   CONTACT FORM & UTILITY ENGINE
   ========================================================================== */

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const responseDiv = document.getElementById('form-response');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Mengirim...</span> <i data-lucide="loader-2" class="spin"></i>`;
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Pesan Terkirim!</span> <i data-lucide="check"></i>`;
      if (window.lucide) window.lucide.createIcons();

      responseDiv.className = 'form-response success';
      responseDiv.textContent = `Terima kasih ${name}! Pesan Anda telah berhasil terkirim. Saya akan segera menghubungi Anda melalui ${email}.`;

      // Open default mail client fallback
      const mailtoUrl = `mailto:billysorong112@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`)}`;
      window.open(mailtoUrl, '_blank');

      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = `<span>Kirim Pesan</span> <i data-lucide="send"></i>`;
        if (window.lucide) window.lucide.createIcons();
      }, 4000);
    }, 1200);
  });
}

export function initClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  const updateClock = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Jakarta'
    });
    clockEl.textContent = `${timeStr} WIB`;
  };

  updateClock();
  setInterval(updateClock, 1000);
}
