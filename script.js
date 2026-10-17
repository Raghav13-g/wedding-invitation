/* Joshini & Siddesh — wedding e-invitation
   Minimal vanilla JavaScript:
   1. Opens the cover like a card cover, then scrolls to the invitation.
   2. Fades sections in as they are scrolled into view.
   Everything is readable without JavaScript (the cover is simply hidden). */
(function () {
  'use strict';

  var root = document.documentElement;
  var cover = document.getElementById('cover');
  var openBtn = document.getElementById('open-btn');
  var page = document.getElementById('invitation');
  var start = document.getElementById('invitation-start');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');

  root.classList.add('js');

  /* ---------- Fade-in on scroll ---------- */
  var revealStarted = false;
  function startReveal() {
    if (revealStarted) return;
    revealStarted = true;

    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Cover ---------- */
  if (!cover || !openBtn || !page) {
    startReveal();
    return;
  }

  // Keep the page behind the cover still and unreachable until it is opened.
  root.classList.add('is-locked');
  page.setAttribute('inert', '');
  var closing = document.querySelector('.closing');
  if (closing) closing.setAttribute('inert', '');

  var opened = false;

  function finishOpening() {
    cover.hidden = true;
    root.classList.remove('is-locked');
    page.removeAttribute('inert');
    if (closing) closing.removeAttribute('inert');

    if (start) {
      start.focus({ preventScroll: true });
      start.scrollIntoView({ behavior: motion.matches ? 'auto' : 'smooth', block: 'start' });
    }
  }

  function openInvitation() {
    if (opened) return;
    opened = true;
    openBtn.disabled = true;

    cover.classList.add('is-open');
    startReveal();   // sections begin to fade in while the cover swings open

    // transitionend can be skipped (hidden tab, reduced motion), so a timer backs it up.
    var done = false;
    function once() { if (done) return; done = true; finishOpening(); }
    var card = cover.querySelector('.cover__card');
    card.addEventListener('transitionend', function (e) {
      if (e.target === card && e.propertyName === 'opacity') once();
    });
    window.setTimeout(once, motion.matches ? 400 : 1700);
  }

  openBtn.addEventListener('click', openInvitation);
})();
