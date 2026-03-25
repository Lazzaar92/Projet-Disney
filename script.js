/**
 * Disney+ – script.js
 * Vanilla JS uniquement (sans framework ni bibliothèque)
 */

/* ============================================================
   1. HEADER – Effet de fond au scroll
   ============================================================ */
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 60) {
      header.style.background = 'rgba(4, 11, 24, 0.98)';
    } else {
      header.style.background =
        'linear-gradient(to bottom, rgba(4,11,24,0.98) 70%, transparent)';
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();


/* ============================================================
   2. HERO FORM – Validation e-mail & retour utilisateur
   ============================================================ */
(function () {
  const form = document.querySelector('.hero-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const input = form.querySelector('.hero-input');
    const email = input ? input.value.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Supprime tout message précédent
    const oldMsg = form.querySelector('.form-feedback');
    if (oldMsg) oldMsg.remove();

    const msg = document.createElement('p');
    msg.className = 'form-feedback';

    if (!emailRegex.test(email)) {
      msg.textContent = 'Veuillez saisir une adresse e-mail valide.';
      msg.style.cssText =
        'color:#ff6b6b;font-size:.85rem;margin-top:.5rem;width:100%;text-align:center;';
      input.style.borderColor = '#ff6b6b';
    } else {
      msg.textContent =
        '✓ Merci ! Vous allez recevoir un e-mail de confirmation.';
      msg.style.cssText =
        'color:#02D6E8;font-size:.85rem;margin-top:.5rem;width:100%;text-align:center;';
      input.style.borderColor = '#02D6E8';
      input.value = '';
    }

    form.appendChild(msg);

    // Retire le message après 5 secondes
    setTimeout(() => {
      msg.style.transition = 'opacity .4s';
      msg.style.opacity = '0';
      setTimeout(() => msg.remove(), 400);
      if (input) input.style.borderColor = '';
    }, 5000);
  });
})();


/* ============================================================
   3. CONTENT STRIP – Duplication pour boucle infinie
   ============================================================ */
(function () {
  const track = document.querySelector('.strip-track');
  if (!track) return;

  // Duplique les cartes pour créer l'illusion d'infini
  const cards = Array.from(track.children);
  cards.forEach(function (card) {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
})();


/* ============================================================
   4. SCROLL ARROW – Smooth scroll vers les plans
   ============================================================ */
(function () {
  const arrow = document.querySelector('.scroll-arrow');
  if (!arrow) return;

  arrow.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector('#plans');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})();


/* ============================================================
   5. FAQ – Ferme les autres <details> quand on en ouvre un
   ============================================================ */
(function () {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        items.forEach(function (other) {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });
  });
})();


/* ============================================================
   6. INTERSECTION OBSERVER – Animation d'entrée au scroll
   ============================================================ */
(function () {
  if (!('IntersectionObserver' in window)) return;

  // Injecte le style d'animation une seule fois
  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity .55s ease, transform .55s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: none;
    }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    '.feature-card, .device-item, .faq-item, .plans-table, .exclusive-inner'
  );

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(function (el, i) {
    el.classList.add('reveal');
    // Décalage léger pour les grilles
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    observer.observe(el);
  });
})();
