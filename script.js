/* =========================================
   PORTFOLIO SCRIPTS — ZEENAT LAWAL
   ========================================= */

// ---------- CUSTOM CURSOR ----------
const cursorDot = document.getElementById("cursorDot");
if (cursorDot) {
  document.addEventListener("mousemove", (e) => {
    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";
  });
  // hide on mobile
  if ("ontouchstart" in window) {
    cursorDot.style.display = "none";
    document.body.style.cursor = "auto";
  }
}

// ---------- STICKY NAV SHADOW ----------
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

// ---------- MOBILE MENU ----------
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", String(open));
  mobileMenu.setAttribute("aria-hidden", String(!open));
});

// close on link click
document.querySelectorAll(".mob-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  });
});

// ---------- SCROLL REVEAL ----------
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);
revealEls.forEach((el) => revealObserver.observe(el));

// ---------- ACTIVE NAV LINK ----------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id,
          );
        });
      }
    });
  },
  { threshold: 0.4 },
);
sections.forEach((sec) => sectionObserver.observe(sec));

// ---------- TYPED EFFECT (hero role line) ----------
const roleEl = document.querySelector(".hero-role");
if (roleEl) {
  const original = roleEl.textContent;
  const words = ["React", "Next.js", "TypeScript", "React Native"];
  let wIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const prefix = "Software Developer — ";

  function type() {
    const word = words[wIdx];
    if (!deleting) {
      charIdx++;
      roleEl.textContent = prefix + word.slice(0, charIdx);
      if (charIdx === word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      charIdx--;
      roleEl.textContent = prefix + word.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 60 : 110);
  }

  // slight delay before starting
  setTimeout(type, 1200);
}

// ---------- STAGGER REVEAL FOR CARDS ----------
document.querySelectorAll(".stack-grid, .projects-grid").forEach((grid) => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.1}s`;
  });
});
