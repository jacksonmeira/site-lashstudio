/*
  JS:
  - Link do WhatsApp com mensagem pronta
  - Botões com data-whats
  - Accordion FAQ
  - Menu mobile (abre/fecha)
*/

(function () {
  // =========================
  // CONFIGURAÇÃO
  // =========================
  const TELEFONE_WHATS = "5511959003069";
  const MSG_PADRAO = "Olá, vim pelo seu site!";

  function makeWhatsLink(message) {
    return `https://wa.me/${TELEFONE_WHATS}?text=${encodeURIComponent(message)}`;
  }

  // =========================
  // ANO NO RODAPÉ
  // =========================
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // =========================
  // LINKS PRINCIPAIS DO WHATSAPP
  // =========================
  const idsWhats = [
    "ctaHeaderWhats",
    "ctaMobileWhats",
    "ctaHeroWhats",
    "ctaAboutWhats",
    "ctaResultsWhats",
    "ctaTestiWhats",
    "ctaFaqWhats",
    "ctaLocationWhats",
    "ctaFooterWhats",
    "whatsFloat"
  ];

  idsWhats.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = makeWhatsLink(MSG_PADRAO);
  });

  // =========================
  // BOTÕES COM data-whats
  // =========================
  document.querySelectorAll("[data-whats]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const msg = btn.getAttribute("data-whats") || MSG_PADRAO;
      window.open(makeWhatsLink(msg), "_blank", "noopener");
    });
  });

  // =========================
  // ACCORDION (FAQ)
  // =========================
  const accButtons = document.querySelectorAll(".acc__btn");

  accButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const isOpen = btn.classList.contains("is-open");

      // fecha todos
      accButtons.forEach((b) => {
        b.classList.remove("is-open");
        const p = b.nextElementSibling;
        if (p) p.style.maxHeight = "0px";
        const icon = b.querySelector(".acc__icon");
        if (icon) icon.textContent = "+";
      });

      // abre o clicado
      if (!isOpen && panel) {
        btn.classList.add("is-open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        const icon = btn.querySelector(".acc__icon");
        if (icon) icon.textContent = "—";
      }
    });
  });

  // =========================
  // MENU MOBILE (hamburger)
  // =========================
  const btnMenu = document.getElementById("btnMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  function toggleMobileMenu() {
    if (!btnMenu || !mobileMenu) return;

    const isVisible = mobileMenu.style.display === "block";

    mobileMenu.style.display = isVisible ? "none" : "block";
    mobileMenu.setAttribute("aria-hidden", isVisible ? "true" : "false");
    btnMenu.setAttribute("aria-expanded", isVisible ? "false" : "true");

    // animação do ícone (vira X)
    btnMenu.classList.toggle("is-open", !isVisible);
  }

  if (btnMenu) btnMenu.addEventListener("click", toggleMobileMenu);

  // fecha o menu ao clicar em um link
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileMenu.style.display = "none";
        mobileMenu.setAttribute("aria-hidden", "true");
        btnMenu?.setAttribute("aria-expanded", "false");
        btnMenu?.classList.remove("is-open");
      });
    });
  }
})();