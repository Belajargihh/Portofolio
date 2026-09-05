/* ==========================================================================
   CONTACT FORM & UTILITY ENGINE
   ========================================================================== */

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const responseDiv = document.getElementById('form-response');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Mengirim...</span> <i data-lucide="loader-2" class="spin"></i>`;
    if (window.lucide) window.lucide.createIcons();

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '46da7871-a59c-4499-b34e-9b481efc6152',
          name,
          email,
          subject,
          message,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const data = await res.json();

      if (data.success) {
        submitBtn.innerHTML = `<span>Pesan Terkirim!</span> <i data-lucide="check"></i>`;
        responseDiv.className = 'form-response success';
        responseDiv.textContent = `Terima kasih ${name}! Pesan Anda telah berhasil terkirim. Saya akan segera menghubungi Anda melalui ${email}.`;
        form.reset();
      } else {
        throw new Error(data.message || 'Gagal mengirim pesan');
      }
    } catch (err) {
      submitBtn.innerHTML = `<span>Gagal Mengirim</span> <i data-lucide="alert-circle"></i>`;
      responseDiv.className = 'form-response';
      responseDiv.style.color = '#ef4444';
      responseDiv.textContent = `Maaf, terjadi kesalahan: ${err.message}. Silakan coba lagi atau hubungi langsung via email.`;
    } finally {
      if (window.lucide) window.lucide.createIcons();
      submitBtn.disabled = false;

      setTimeout(() => {
        submitBtn.innerHTML = `<span>Kirim Pesan</span> <i data-lucide="send"></i>`;
        if (window.lucide) window.lucide.createIcons();
      }, 4000);
    }
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
