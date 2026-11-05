// Interações do portfólio (menu mobile, header on scroll, scroll reveal,
// carrossel de projetos e modais). Vanilla JS, sem dependências.

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Header: muda de estilo ao rolar + menu mobile ---------- */
  const header = document.querySelector(".header");
  const menuBtn = document.querySelector(".menu-btn");
  const navMobile = document.querySelector(".nav-mobile");

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll);

  const closeMobileMenu = () => {
    navMobile.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.innerHTML = ICONS.menu;
    document.body.style.overflow = "";
  };

  menuBtn.addEventListener("click", () => {
    const isOpen = navMobile.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.innerHTML = isOpen ? ICONS.x : ICONS.menu;
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Carrossel de projetos ---------- */
  const track = document.querySelector(".projects__track");
  const prevBtn = document.querySelector('[data-carousel="prev"]');
  const nextBtn = document.querySelector('[data-carousel="next"]');

  const scrollByCard = (direction) => {
    if (!track) return;
    const amount = track.clientWidth * 0.8;
    track.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (prevBtn) prevBtn.addEventListener("click", () => scrollByCard("left"));
  if (nextBtn) nextBtn.addEventListener("click", () => scrollByCard("right"));

  /* ---------- Modais (projetos + curiosidades) ---------- */
  const modals = document.querySelectorAll(".modal-overlay");

  const openModal = (modal) => {
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = (modal) => {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const closeAllModals = () => {
    modals.forEach((modal) => closeModal(modal));
  };

  document.querySelectorAll("[data-open-modal]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const id = trigger.getAttribute("data-open-modal");
      const modal = document.getElementById(id);
      if (modal) openModal(modal);
    });
  });

  modals.forEach((modal) => {
    const backdrop = modal.querySelector(".modal-backdrop");
    const closeBtn = modal.querySelector(".modal-close");
    if (backdrop) backdrop.addEventListener("click", () => closeModal(modal));
    if (closeBtn) closeBtn.addEventListener("click", () => closeModal(modal));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });
});

/* Ícones inline (equivalentes aos usados no site original via lucide-react) */
const ICONS = {
  menu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
  x: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
};
