document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var navPrimary = document.querySelector('.nav-primary');
  if (toggle && navPrimary) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navPrimary.classList.toggle('is-open');
      document.body.classList.toggle('nav-locked', !expanded);
    });
  }

  /* ---------- Dropdown: click-to-open on touch/mobile, hover on desktop (CSS handles hover) ---------- */
  var dropdownParents = document.querySelectorAll('li.has-dropdown > .nav-link');
  dropdownParents.forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 960px)').matches) {
        e.preventDefault();
        var parent = link.parentElement;
        var wasOpen = parent.classList.contains('is-open');
        document.querySelectorAll('li.has-dropdown.is-open').forEach(function (li) {
          if (li !== parent) li.classList.remove('is-open');
        });
        parent.classList.toggle('is-open', !wasOpen);
      }
    });
  });

  /* ---------- Close mobile nav when a real link is followed ---------- */
  document.querySelectorAll('.nav-primary a:not(.nav-link)').forEach(function (a) {
    a.addEventListener('click', function () {
      if (window.matchMedia('(max-width: 960px)').matches) {
        navPrimary.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ---------- Highlight current nav link ---------- */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(function (link) {
    if (link.getAttribute('data-page') === path) {
      link.classList.add('is-active');
    }
  });

  /* ---------- Horizontal scroller (Industry Solutions) ---------- */
  document.querySelectorAll('.scroller-wrap').forEach(function (wrap) {
    var scroller = wrap.querySelector('.scroller');
    var prev = wrap.querySelector('.scroller-btn.prev');
    var next = wrap.querySelector('.scroller-btn.next');
    if (!scroller) return;
    function scrollByCard(dir) {
      var card = scroller.querySelector('.solution-card');
      var amount = card ? card.getBoundingClientRect().width + 24 : 300;
      scroller.scrollBy({ left: dir * amount, behavior: 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { scrollByCard(-1); });
    if (next) next.addEventListener('click', function () { scrollByCard(1); });
  });

  /* ---------- Accordion (Services detail) ---------- */
  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var trigger = item.querySelector('.accordion-trigger');
    var panel = item.querySelector('.accordion-panel');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      item.closest('.accordion').querySelectorAll('.accordion-item').forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.accordion-panel').style.maxHeight = null;
        other.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Open a service accordion item if URL has a matching hash */
  if (window.location.hash) {
    var target = document.querySelector(window.location.hash);
    if (target && target.classList.contains('accordion-item')) {
      target.classList.add('is-open');
      var p = target.querySelector('.accordion-panel');
      if (p) p.style.maxHeight = p.scrollHeight + 'px';
      var t = target.querySelector('.accordion-trigger');
      if (t) t.setAttribute('aria-expanded', 'true');
      setTimeout(function () { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
    }
  }

  /* ---------- Contact form (static demo submit) ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.getElementById('form-success');
      if (success) {
        success.classList.add('is-visible');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
