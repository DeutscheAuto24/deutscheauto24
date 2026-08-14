/* ==============================================================
   EDIT YOUR CONTACT DETAILS HERE — this one file controls every page.
   ============================================================== */
const CONFIG = {
  phoneDisplay: '+49 179 1603951',
  phoneLink: '+491791603951',
  email: 'main.auto24.branch@gmail.com',
  /* WhatsApp number: country code + number, digits only, NO +, NO spaces, NO leading 0 after the country code (e.g. 0170 1234567 -> 4917012345678) */
  whatsappNumber: '491791603951'
};

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.querySelectorAll('[data-phone-link]').forEach(el => el.href = 'tel:' + CONFIG.phoneLink);
  document.querySelectorAll('[data-phone-text]').forEach(el => el.textContent = '☎ ' + CONFIG.phoneDisplay);
  document.querySelectorAll('[data-email-link]').forEach(el => el.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(CONFIG.email));
  document.querySelectorAll('[data-wa-link]').forEach(el => el.href = 'https://wa.me/' + CONFIG.whatsappNumber);

  const trackClick = aktion => {
    const body = new URLSearchParams({ 'form-name': 'kontakt-klick', aktion, seite: location.pathname });
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() }).catch(() => {});
  };
  document.querySelectorAll('[data-phone-link]').forEach(el => el.addEventListener('click', () => trackClick('Anruf')));
  document.querySelectorAll('[data-wa-link]').forEach(el => el.addEventListener('click', () => trackClick('WhatsApp')));
  document.querySelectorAll('[data-email-link]').forEach(el => el.addEventListener('click', () => trackClick('E-Mail')));

  const form = document.getElementById('vehicle-form');
  if (form) {
    const statusEl = form.querySelector('[data-form-status]');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (statusEl) statusEl.textContent = 'Wird gesendet …';
      try {
        const response = await fetch('/', { method: 'POST', body: new FormData(form) });
        if (response.ok) {
          if (statusEl) statusEl.textContent = 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.';
          form.reset();
        } else {
          if (statusEl) statusEl.textContent = 'Es gab ein Problem beim Senden. Bitte rufen Sie uns an oder schreiben Sie uns direkt.';
        }
      } catch (err) {
        if (statusEl) statusEl.textContent = 'Es gab ein Problem beim Senden. Bitte rufen Sie uns an oder schreiben Sie uns direkt.';
      }
    });
  }
});
