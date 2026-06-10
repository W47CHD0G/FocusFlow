const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
const form = document.getElementById("survey-form");
const message = document.getElementById("form-message");
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }
    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

if (form && message) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (!data.get("yearOfStudy") || !data.get("fieldOfStudy")) {
      message.textContent = "Please complete all required fields.";
      return;
    }
    message.textContent = "Thanks for your feedback! We’ll reach out with FocusFlow beta updates.";
    form.reset();
  });
}
