/* ============================================================
   Головна логіка сайту: галерея робіт, фільтри, модали,
   таби програми, мобільне меню, scroll-анімації.
   (Цей файл редагувати не потрібно — дані у works-data.js)
   ============================================================ */

(function () {
  "use strict";

  // ---------- Метадані типів робіт ----------
  const TYPE_META = {
    python:  { badge: "🐍 Python",  emoji: "🐍", action: "▶ Запустити програму" },
    scratch: { badge: "🐱 Scratch", emoji: "🐱", action: "▶ Грати" },
    image:   { badge: "📷 Фото",    emoji: "📷", action: "🔍 Переглянути" },
    video:   { badge: "🎬 Відео",   emoji: "🎬", action: "▶ Дивитися" },
  };

  // ---------- Рендер галереї ----------
  const grid = document.getElementById("worksGrid");

  function renderWorks(filter) {
    const works = (typeof WORKS !== "undefined" ? WORKS : []).filter(
      (w) => filter === "all" || w.type === filter
    );

    grid.innerHTML = "";

    if (!works.length) {
      grid.innerHTML =
        '<p class="works-grid__empty">Поки що немає робіт цього типу — додайте їх у файлі <code>js/works-data.js</code> 😉</p>';
      return;
    }

    works.forEach((work) => {
      const meta = TYPE_META[work.type] || TYPE_META.image;
      const card = document.createElement("article");
      card.className = "work-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${work.title} — ${meta.action}`);

      const preview =
        work.type === "image" && work.file
          ? `<img src="${escapeHtml(work.file)}" alt="${escapeHtml(work.title)}" loading="lazy">`
          : meta.emoji;

      card.innerHTML = `
        <div class="work-card__preview work-card__preview--${work.type}">
          ${preview}
          <span class="work-card__badge">${meta.badge}</span>
        </div>
        <div class="work-card__body">
          <h3 class="work-card__title">${escapeHtml(work.title)}</h3>
          <p class="work-card__author">${escapeHtml(work.author || "")}</p>
          <p class="work-card__desc">${work.description}</p>
          <p class="work-card__action">${meta.action}</p>
        </div>`;

      const open = () => openWork(work);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });

      grid.appendChild(card);
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }

  // ---------- Фільтр ----------
  const filterBox = document.getElementById("worksFilter");
  filterBox.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    filterBox.querySelectorAll(".works-filter__btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderWorks(btn.dataset.filter);
  });

  // ---------- Відкриття роботи ----------
  function openWork(work) {
    if (work.type === "python") {
      window.PythonRunner.open(work);
      return;
    }

    const modal = document.getElementById("mediaModal");
    const body = document.getElementById("mediaModalBody");
    document.getElementById("mediaModalTitle").textContent = work.title;
    document.getElementById("mediaModalAuthor").textContent = work.author || "";
    document.getElementById("mediaModalDesc").innerHTML = work.description || "";

    if (work.type === "image") {
      body.innerHTML = `<img src="${escapeHtml(work.file)}" alt="${escapeHtml(work.title)}">`;
    } else if (work.type === "video") {
      body.innerHTML = `<video src="${escapeHtml(work.file)}" controls autoplay playsinline></video>`;
    } else if (work.type === "scratch") {
      // TurboWarp embed — програвач Scratch-проєктів, який можна вбудовувати
      body.innerHTML = `<iframe src="https://turbowarp.org/${encodeURIComponent(work.scratchId)}/embed"
        allowfullscreen allow="autoplay" title="${escapeHtml(work.title)}"></iframe>`;
    }

    openModal(modal);
  }

  // ---------- Модали (загальне) ----------
  function openModal(modal) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // зупиняємо відео/scratch при закритті
    const media = modal.querySelector(".modal__media");
    if (media) media.innerHTML = "";
  }

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) closeModal(modal);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape")
      document.querySelectorAll(".modal.is-open").forEach(closeModal);
  });

  window.openModal = openModal; // використовується python-runner.js

  // ---------- Таби програми ----------
  // const tabs = document.getElementById("curriculumTabs");
  // tabs.addEventListener("click", (e) => {
  //   const btn = e.target.closest("[data-tab]");
  //   if (!btn) return;
  //   tabs.querySelectorAll(".tabs__btn").forEach((b) => {
  //     b.classList.remove("is-active");
  //     b.setAttribute("aria-selected", "false");
  //   });
  //   tabs.querySelectorAll(".tabs__panel").forEach((p) => p.classList.remove("is-active"));
  //   btn.classList.add("is-active");
  //   btn.setAttribute("aria-selected", "true");
  //   document.getElementById(btn.dataset.tab).classList.add("is-active");
  // });

  // ---------- Мобільне меню ----------
  const burger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");
  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  // ---------- Scroll reveal ----------
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // ---------- Контакти з конфігу ----------
  function renderContacts() {
    const box = document.getElementById("contactsCards");
    if (typeof SITE_CONFIG === "undefined") return;
    box.innerHTML = SITE_CONFIG.contacts
      .map((c) => {
        const value = c.href
          ? `<a href="${escapeHtml(c.href)}">${escapeHtml(c.value)}</a>`
          : escapeHtml(c.value);
        return `<div class="contact-card">
          <p class="contact-card__label">${escapeHtml(c.label)}</p>
          <p class="contact-card__value">${value}</p>
        </div>`;
      })
      .join("");

    const footer = document.getElementById("footerSchool");
    if (footer) footer.textContent = SITE_CONFIG.schoolNameFull;
  }

  // ---------- Старт ----------
  renderWorks("all");
  renderContacts();
})();
