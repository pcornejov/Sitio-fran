/**
 * Francisca Espinoza — Sitio web
 * Comportamiento del header (scroll) y menú móvil (hamburguesa).
 * Vanilla JS, sin dependencias.
 */

(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var mobileMenuClose = document.querySelector('.mobile-menu__close');
  var body = document.body;

  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  var lastFocusedElement = null;

  /* ===== Header: clase .is-scrolled tras 10px ===== */
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  if (header) {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ===== Menú móvil ===== */
  function getFocusableMenuItems() {
    if (!mobileMenu) return [];
    return Array.prototype.slice.call(
      mobileMenu.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function openMenu() {
    if (!mobileMenu || !hamburger) return;
    lastFocusedElement = document.activeElement;

    mobileMenu.classList.add('is-open');
    mobileMenu.removeAttribute('hidden');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Cerrar menú');
    body.classList.add('menu-open');

    var focusables = getFocusableMenuItems();
    if (focusables.length) {
      // Foco atrapado: el primer link recibe el foco al abrir.
      focusables[0].focus();
    }

    document.addEventListener('keydown', onKeydown);
    document.addEventListener('click', onClickOutside, true);
  }

  function closeMenu() {
    if (!mobileMenu || !hamburger) return;

    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menú');
    body.classList.remove('menu-open');

    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onClickOutside, true);

    var restoreFocus = lastFocusedElement || hamburger;

    var afterClose = function () {
      mobileMenu.setAttribute('hidden', '');
      restoreFocus.focus();
    };

    if (prefersReducedMotion) {
      afterClose();
    } else {
      setTimeout(afterClose, 250);
    }
  }

  function toggleMenu() {
    if (!mobileMenu) return;
    var isOpen = mobileMenu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function onKeydown(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      closeMenu();
      return;
    }

    // Atrapar el foco dentro del menú móvil mientras está abierto.
    if (event.key === 'Tab') {
      var focusables = getFocusableMenuItems();
      if (!focusables.length) return;

      var first = focusables[0];
      var last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  function onClickOutside(event) {
    if (!mobileMenu) return;
    var isClickInsideMenu = mobileMenu.contains(event.target);
    var isClickOnHamburger = hamburger && hamburger.contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger) {
      closeMenu();
    }
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', toggleMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMenu);
  }

  // Cerrar el menú al hacer click en un link (navegación entre páginas).
  if (mobileMenu) {
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(function (link) {
      link.addEventListener('click', function () {
        body.classList.remove('menu-open');
      });
    });
  }
})();
