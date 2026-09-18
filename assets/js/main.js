/* ============================================================
   main.js — สร้างเนื้อหาบนหน้าเว็บจาก data.js + อนิเมชันทั้งหมด
   ปกติไม่ต้องแก้ไฟล์นี้ (แก้ข้อความที่ data.js พอ)
   ============================================================ */

/* ข้อความประจำหน้าเว็บ (เมนู หัวข้อ ปุ่ม) */
const UI = {
  nav:        { th: ["ผลงาน", "ทักษะ", "ประสบการณ์", "ติดต่อ"],
                en: ["Work", "Skills", "Experience", "Contact"] },
  available:  { th: "เปิดรับงานอยู่", en: "Available for work" },
  ctaWork:    { th: "ดูผลงาน", en: "See my work" },
  ctaContact: { th: "ติดต่อฉัน", en: "Get in touch" },
  kWork:      { th: "ผลงานที่ผ่านมา", en: "Selected work" },
  hWork:      { th: "โปรเจกต์ที่ภูมิใจ", en: "Projects I'm proud of" },
  kSkills:    { th: "สิ่งที่ถนัด", en: "What I do" },
  hSkills:    { th: "ทักษะของฉัน", en: "My skills" },
  kExp:       { th: "เส้นทางที่ผ่านมา", en: "The journey" },
  hExp:       { th: "ประสบการณ์และการศึกษา", en: "Experience & education" },
  footer:     { th: "ขอบคุณที่แวะเข้ามาชม 💛", en: "Thanks for stopping by 💛" },
  viewMore:   { th: "ดูเพิ่มเติม →", en: "View more →" }
};

/* ไอคอนโซเชียล */
const ICONS = {
  facebook:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none"/></svg>',
  threads:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M16.3 11.5c-.3-2-1.7-3-3.8-3-1.6 0-2.8.6-3.4 1.7"/><path d="M12.2 12.2c2 0 3.4.8 3.4 2.3 0 1.4-1.1 2.3-2.5 2.3-1.5 0-2.4-.9-2.4-2 0-1.5 1.6-2.4 4.2-2.6 2.6-.2 3.9 1 3.9 3 0 3-2.4 4.8-6.4 4.8C7.5 20 5 17.2 5 12S7.6 4 12.4 4c3 0 5.1 1.1 6.2 3"/></svg>',
  mail:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 7 9 6 9-6"/></svg>',
  line:      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 5.6 2 10c0 4 3.6 7.3 8.4 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.6s5.9-3.5 8-6c1.4-1.5 2-3.1 2-4.9C22 5.6 17.5 2 12 2Z"/></svg>',
  link:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>'
};

/* เคารพการตั้งค่า "ลดการเคลื่อนไหว" ของเครื่องผู้ใช้ */
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- ตัวช่วย ---------- */

/* ภาษาปัจจุบัน: จำค่าที่ผู้ใช้เลือกไว้ */
let lang = "th";
try {
  const saved = localStorage.getItem("lang");
  if (saved === "th" || saved === "en") lang = saved;
} catch (e) { /* โหมดส่วนตัว / ปิดคุกกี้ — ใช้ค่าเริ่มต้น */ }

/* หยิบข้อความตามภาษา: รับได้ทั้ง "ข้อความ" และ { th, en } */
const t = (v) => (v && typeof v === "object" && !Array.isArray(v)) ? (v[lang] ?? v.th ?? "") : (v ?? "");

const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const initials = (name) =>
  String(name).trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase() || "★";

/* ---------- วาดแต่ละส่วนของหน้า ---------- */

function renderNav() {
  const labels = UI.nav[lang];
  const ids = ["work", "skills", "experience", "contact"];
  document.getElementById("nav-links").innerHTML =
    ids.map((id, i) => `<a href="#${id}">${esc(labels[i])}</a>`).join("");
  document.getElementById("brand").textContent =
    t(SITE_DATA.profile.nickname) || t(SITE_DATA.profile.name);
  document.getElementById("lang-btn").textContent = lang === "th" ? "EN" : "ไทย";
}

function renderHero() {
  const p = SITE_DATA.profile;

  document.getElementById("available").textContent = t(UI.available);
  document.getElementById("hero-name").textContent = t(p.name);
  document.getElementById("hero-bio").textContent = t(p.bio);
  document.getElementById("cta-work").textContent = t(UI.ctaWork);
  document.getElementById("cta-contact").textContent = t(UI.ctaContact);

  const badge = document.getElementById("badge-year");
  badge.textContent = t(p.badge) || "";
  badge.style.display = t(p.badge) ? "" : "none";

  const av = document.getElementById("avatar");
  if (p.avatar) {
    av.innerHTML = `<img src="${esc(p.avatar)}" alt="${esc(t(p.name))}"
                         style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
  } else {
    av.textContent = initials(t(p.name));
  }

  // ช่องที่ value เป็น 0 ถือว่า "ยังไม่ได้ใส่ข้อมูล" — ซ่อนไว้ก่อน
  const stats = (p.stats || []).filter((s) => Number(s.value) > 0);
  document.getElementById("stats").innerHTML = stats.map((s, i) => `
    <div class="stat stagger" style="--d:${i * 110}ms">
      <b data-to="${Number(s.value)}" data-suffix="${esc(s.suffix || "")}"
         data-raw="${s.raw ? 1 : 0}">0</b>
      <span>${esc(t(s.label))}</span>
    </div>`).join("");
}

/* คำวิ่ง — ทำซ้ำสองชุดเพื่อให้วนต่อเนื่องไม่มีรอยต่อ */
function renderMarquee() {
  const words = SITE_DATA.marquee || [];
  if (!words.length) return;
  const one = words.map((w) => `<span>${esc(t(w))}</span>`).join("");
  document.getElementById("marquee").innerHTML = one + one;
}

function renderPortfolio() {
  document.getElementById("k-work").textContent = t(UI.kWork);
  document.getElementById("h-work").textContent = t(UI.hWork);

  document.getElementById("work-grid").innerHTML = (SITE_DATA.portfolio || []).map((w, i) => {
    const media = w.image
      ? `<div class="card-media"><img src="${esc(w.image)}" alt="${esc(t(w.title))}"></div>`
      : `<div class="card-media"><span class="emoji">${esc(w.emoji || "✨")}</span></div>`;
    const tags = (w.tags || []).map((x) => `<span class="tag">${esc(t(x))}</span>`).join("");
    const more = w.link ? `<div class="card-link">${esc(t(UI.viewMore))}</div>` : "";
    const attrs = `class="card stagger" style="--d:${i * 90}ms"`;
    const open = w.link
      ? `<a ${attrs} href="${esc(w.link)}" target="_blank" rel="noopener noreferrer">`
      : `<div ${attrs}>`;
    return `${open}${media}
      <div class="card-body">
        <h3>${esc(t(w.title))}</h3>
        <p>${esc(t(w.desc))}</p>
        <div class="tags">${tags}</div>${more}
      </div>${w.link ? "</a>" : "</div>"}`;
  }).join("");
}

function renderSkills() {
  document.getElementById("k-skills").textContent = t(UI.kSkills);
  document.getElementById("h-skills").textContent = t(UI.hSkills);

  document.getElementById("skill-groups").innerHTML = (SITE_DATA.skills || []).map((g, i) => `
    <div class="skill-card stagger" style="--d:${i * 120}ms">
      <h3>${esc(t(g.group))}</h3>
      ${(g.items || []).map((s) => `
        <div class="skill-row">
          <div class="top">
            <span>${esc(t(s.name))}</span>
            <span data-pct="${Number(s.level) || 0}">0%</span>
          </div>
          <div class="bar"><i data-level="${Number(s.level) || 0}"></i></div>
        </div>`).join("")}
    </div>`).join("");
}

function renderExperience() {
  document.getElementById("k-exp").textContent = t(UI.kExp);
  document.getElementById("h-exp").textContent = t(UI.hExp);

  document.getElementById("timeline").innerHTML = (SITE_DATA.experience || []).map((e) => `
    <div class="tl-item">
      <span class="tl-period">${esc(t(e.period))}</span>
      <h3>${esc(t(e.role))}</h3>
      <div class="tl-org">${esc(t(e.org))}</div>
      <p class="tl-desc">${esc(t(e.desc))}</p>
    </div>`).join("");
}

function renderFooter() {
  document.getElementById("footer-note").textContent = t(UI.footer);
  document.getElementById("copyright").textContent =
    `© ${new Date().getFullYear()} ${t(SITE_DATA.profile.name)}`;

  document.getElementById("socials").innerHTML = (SITE_DATA.links || [])
    .filter((l) => l.url)
    .map((l, i) => `<a class="social" style="transition-delay:${i * 90}ms"
        href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">
        ${ICONS[l.icon] || ICONS.link}<span>${esc(l.label)}</span></a>`).join("");
}

/* ============================================================
   อนิเมชัน
   ============================================================ */

/* ตัวช่วย: ทำอะไรบางอย่างครั้งเดียวเมื่อ element เลื่อนเข้ามาในจอ */
function onceVisible(nodes, fn, threshold = .25) {
  const list = [...nodes];
  if (REDUCED || !("IntersectionObserver" in window)) { list.forEach(fn); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { fn(en.target); io.unobserve(en.target); }
    });
  }, { threshold });
  list.forEach((n) => io.observe(n));
}

/* 1. คำโปรยพิมพ์ทีละตัว แล้ววนไปบรรทัดถัดไป */
let typingTimer = null;
function typeTaglines() {
  clearTimeout(typingTimer);
  const out = document.getElementById("typed");
  const lines = (SITE_DATA.profile.taglines || []).map(t).filter(Boolean);
  if (!lines.length) { out.textContent = ""; return; }

  if (REDUCED) { out.textContent = lines[0]; return; }

  let li = 0, ci = 0, deleting = false;
  const step = () => {
    const line = lines[li];
    ci += deleting ? -1 : 1;
    out.textContent = line.slice(0, ci);

    let wait = deleting ? 35 : 65;
    if (!deleting && ci === line.length) { deleting = true; wait = 1800; }
    else if (deleting && ci === 0)      { deleting = false; li = (li + 1) % lines.length; wait = 350; }

    typingTimer = setTimeout(step, wait);
  };
  step();
}

/* 2. ตัวเลขนับขึ้น */
function countUp() {
  onceVisible(document.querySelectorAll(".stat b"), (node) => {
    const to  = Number(node.dataset.to) || 0;
    const suf = node.dataset.suffix || "";
    const raw = node.dataset.raw === "1";   // ปีเกิด ฯลฯ — ไม่ใส่ตัวคั่นหลักพัน
    const fmt = (n) => (raw ? String(n) : n.toLocaleString()) + suf;

    if (REDUCED || to === 0) { node.textContent = fmt(to); return; }

    const dur = 1100, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);      // ช้าลงตอนท้าย
      node.textContent = fmt(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, .4);
}

/* 3. แถบทักษะ: เติมความยาว + เปอร์เซ็นต์นับขึ้นพร้อมกัน */
function animateBars() {
  onceVisible(document.querySelectorAll(".skill-row"), (row) => {
    const bar = row.querySelector(".bar > i");
    const pct = row.querySelector("[data-pct]");
    const to  = Number(bar.dataset.level) || 0;

    bar.style.width = to + "%";
    if (REDUCED) { pct.textContent = to + "%"; return; }

    const dur = 1100, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      pct.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + "%";
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, .3);
}

/* 4. ไทม์ไลน์: ลากเส้นลงมา แล้วแต่ละรายการเลื่อนเข้าทีละอัน */
function animateTimeline() {
  const tl = document.getElementById("timeline");
  onceVisible([tl], () => tl.classList.add("drawn"), .12);
  onceVisible(tl.querySelectorAll(".tl-item"), (item) => {
    const i = [...tl.children].indexOf(item);
    setTimeout(() => item.classList.add("shown"), REDUCED ? 0 : i * 150);
  }, .25);
}

/* 5. เนื้อหาค่อย ๆ ปรากฏตอนเลื่อน (section + การ์ดที่มี .stagger) */
function revealOnScroll() {
  onceVisible(document.querySelectorAll(".reveal, .footer"),
    (n) => n.classList.add("shown"), .12);
  onceVisible(document.querySelectorAll(".stagger"),
    (n) => n.classList.add("shown"), .15);
}

/* 6. แถบความคืบหน้าด้านบน + เมนูไฮไลต์หัวข้อที่กำลังอ่าน */
function scrollEffects() {
  const bar = document.getElementById("progress");
  const links = [...document.querySelectorAll(".nav-links a")];
  const targets = links.map((a) => document.querySelector(a.getAttribute("href")));
  let ticking = false;

  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";

    let active = -1;
    targets.forEach((sec, i) => {
      if (sec && sec.getBoundingClientRect().top <= innerHeight * 0.4) active = i;
    });
    links.forEach((a, i) => a.classList.toggle("active", i === active));
  };

  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

/* 7. แสงตามเมาส์ + รูปโปรไฟล์เอียงตามเมาส์ */
function pointerEffects() {
  if (REDUCED || matchMedia("(hover: none)").matches) return;

  const spot = document.getElementById("spotlight");
  const ring = document.querySelector(".avatar-ring");
  const copy = document.getElementById("hero-copy");
  let pending = false, px = 0, py = 0;

  /* หมุนกี่องศา เมื่อเมาส์อยู่ห่างจากจุดกึ่งกลางของ el
     ต้อง clamp ไว้ ไม่งั้นตอน el เลื่อนพ้นจอ ระยะห่างจะโตจนเอียงเกิน 45° แล้วดูพัง */
  const clamp = (v, max) => Math.max(-max, Math.min(max, v));
  const tiltFrom = (el, max) => {
    const r = el.getBoundingClientRect();
    return {
      ry: clamp(((px - (r.left + r.width / 2)) / innerWidth) * max * 2, max),
      rx: clamp((-(py - (r.top + r.height / 2)) / innerHeight) * max * 2, max)
    };
  };

  addEventListener("pointermove", (e) => {
    px = e.clientX; py = e.clientY;
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      spot.style.setProperty("--mx", px + "px");
      spot.style.setProperty("--my", py + "px");

      const a = tiltFrom(ring, 20);
      ring.style.setProperty("--ary", a.ry.toFixed(2) + "deg");
      ring.style.setProperty("--arx", a.rx.toFixed(2) + "deg");

      /* ข้อความในส่วนหัวเอียงตามเมาส์ — แต่ละชั้นลึกไม่เท่ากันจึงเลื่อนไม่เท่ากัน */
      const h = tiltFrom(copy, 13);
      copy.style.setProperty("--hry", h.ry.toFixed(2) + "deg");
      copy.style.setProperty("--hrx", h.rx.toFixed(2) + "deg");
    });
  }, { passive: true });

  /* การ์ดทักษะเอียงตามเมาส์ของตัวเอง */
  document.addEventListener("pointerover", (e) => {
    const c = e.target.closest && e.target.closest(".skill-card");
    if (!c || c.dataset.tilt) return;
    c.dataset.tilt = "1";
    c.addEventListener("pointermove", (ev) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--sry", (((ev.clientX - r.left) / r.width - .5) * 13).toFixed(2) + "deg");
      c.style.setProperty("--srx", ((.5 - (ev.clientY - r.top) / r.height) * 13).toFixed(2) + "deg");
    });
    c.addEventListener("pointerleave", () => {
      c.style.setProperty("--sry", "0deg");
      c.style.setProperty("--srx", "0deg");
    });
  });
}

/* 9. หัวข้อแต่ละ section เอียงตามตำแหน่งที่เลื่อนมาถึง */
function scroll3D() {
  if (REDUCED) return;
  const heads = [...document.querySelectorAll(".sec-head")];
  if (!heads.length) return;
  let ticking = false;

  const update = () => {
    ticking = false;
    heads.forEach((h) => {
      const r = h.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      /* p = 1 เมื่ออยู่ล่างสุดของจอ → 0 เมื่อขึ้นมาถึงกลางจอ */
      const p = Math.max(0, Math.min(1, (r.top - innerHeight * .45) / (innerHeight * .55)));
      h.style.setProperty("--secrx", (p * 22).toFixed(2) + "deg");
    });
  };

  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

/* 8. การ์ดผลงาน: เอียง 3 มิติ + จุดแสงตามเมาส์ */
function cardTilt() {
  if (REDUCED || matchMedia("(hover: none)").matches) return;

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--ry", ((x - .5) * 11).toFixed(2) + "deg");
      card.style.setProperty("--rx", ((.5 - y) * 11).toFixed(2) + "deg");
      card.style.setProperty("--cx", (x * 100).toFixed(1) + "%");
      card.style.setProperty("--cy", (y * 100).toFixed(1) + "%");
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
    });
  });
}

/* ---------- วาดทั้งหน้า ---------- */
function renderAll() {
  document.documentElement.lang = lang;
  renderNav();
  renderHero();
  renderMarquee();
  renderPortfolio();
  renderSkills();
  renderExperience();
  renderFooter();
  document.title = t(SITE_DATA.profile.name);

  typeTaglines();
  countUp();
  animateBars();
  animateTimeline();
  revealOnScroll();
  cardTilt();
}

/* ---------- ปุ่มสลับภาษา / โหมดสี ---------- */
document.getElementById("lang-btn").addEventListener("click", () => {
  lang = lang === "th" ? "en" : "th";
  try { localStorage.setItem("lang", lang); } catch (e) {}
  renderAll();
});

(function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById("theme-btn");

  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  const isDark = () =>
    root.getAttribute("data-theme") === "dark" ||
    (!root.hasAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);

  const paint = () => { btn.textContent = isDark() ? "☀️" : "🌙"; };
  paint();

  btn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    paint();
  });
})();

renderAll();
scrollEffects();
pointerEffects();
scroll3D();
