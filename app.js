(function () {
  const D = window.DATA, B = document.body, pg = B.dataset.page, N = +B.dataset.bai || 0, $ = s => document.querySelector(s);
  const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x !== undefined) e.textContent = x; return e; };
  const add = (p, ...k) => { k.flat().forEach(n => n && p.append(n)); return p; };
  const img = (src, hint) => { const i = el("img"); i.src = src; i.alt = "Ảnh đại diện"; i.onerror = () => i.replaceWith(el("div", "ph", hint)); return i; };
  const items = (tag, arr, cls) => add(el(tag, cls), (arr || ["[...]"]).map(x => el("li", "", x)));
  const sec = (label, title) => { const s = el("section", "sec rv"); add(s, el("p", "lab", label), el("h2", "", title)); return s; };
  const proj = D.projects, mk = (n) => "bai-" + n + ".html";
  document.documentElement.classList.add("js");
  document.title = (N ? "Bài " + N + ": " + proj[N - 1].title : { home: "Giới thiệu", projects: "Dự án", summary: "Tổng kết" }[pg]) + " – Portfolio " + D.name;

  // Menu phím đàn piano
  const cur = pg === "bai" ? "projects" : pg;
  const hd = $("#hd"), bar = el("div", "bar"), brand = el("a", "brand", "♪ " + D.name); brand.href = "index.html";
  const keys = el("nav", "keys"); keys.setAttribute("aria-label", "Menu chính");
  [["index.html", "Giới thiệu", "home"], ["du-an.html", "Dự án", "projects"], ["tong-ket.html", "Tổng kết", "summary"]].forEach(k => {
    const a = el("a", "key", k[1]); a.href = k[0]; if (k[2] === cur) a.setAttribute("aria-current", "page"); keys.appendChild(a);
  });
  hd.appendChild(add(bar, brand, keys));
  $("#ft").textContent = D.name + " – MSSV " + D.id + " – Lớp " + D.cls + " – Học phần " + D.course;

  const tracklist = () => {
    const ol = el("ol", "tracks");
    proj.forEach((p, i) => {
      const li = el("li"), a = el("a", "track"); a.href = mk(i + 1);
      const t = el("div"); add(t, el("b", "", "Bài " + (i + 1) + ": " + p.title), el("small", "", p.sum));
      add(a, el("span", "no", "0" + (i + 1)), t, el("span", "tg", p.tag), el("span", "go", "▶")); ol.appendChild(add(li, a));
    });
    return ol;
  };
  const header = (label, title, extra) => { const h = el("div", "head staff"); add(h, extra, el("p", "lab", label), el("h1", "", title)); return h; };
  const main = $("#app");

  const pages = {
    home() {
      const hero = el("section", "hero staff"), L = el("div"), eq = el("span", "eq");
      add(eq, el("i"), el("i"), el("i"), el("i"));
      const lab = el("p", "lab", "Overture · Giới thiệu"); lab.appendChild(eq);
      const cta = el("a", "btn", "Xem các dự án →"); cta.href = "du-an.html";
      add(L, lab, el("h1", "", D.name), el("p", "role", D.major + " · " + D.school), add(el("div", "chips"), D.hobbies.map(h => el("span", "chip", (h.icon ? h.icon + " " : "") + (h.name || h)))), el("p", "lead", D.intro), cta);
      const V = el("div", "vinyl"), vl = el("div", "vl"); vl.appendChild(img(D.avatar, D.avatar)); V.appendChild(vl);
      main.appendChild(add(hero, L, V));
      const f = sec("Về mình", "Thông tin cá nhân");
      const aboutGrid = el("div", "about-grid");
      const dl = el("dl", "facts");
      [["Họ và tên", D.name], ["Ngành học", D.major], ["Trường", D.school], ["Lớp", D.cls], ["Học phần", D.course]].forEach(r => {
        const row = el("div", "fr");
        add(row, el("dt", "", r[0]), el("dd", "", r[1]));
        dl.appendChild(row);
      });
      const picBox = el("div", "portrait-box");
      picBox.appendChild(img(D.portrait || D.avatar, (D.portrait || D.avatar)));
      main.appendChild(add(f, add(aboutGrid, dl, picBox)));
      main.appendChild(add(sec("Mục tiêu", "Mục tiêu học tập"), items("ol", D.goals, "rom")));
      main.appendChild(add(sec("Hướng đi", "Định hướng phát triển cá nhân"), items("ol", D.direction, "rom")));
      const m = sec("Portfolio", "Mục tiêu của Portfolio"), mov = el("div", "mov");
      D.portfolioGoals.forEach(x => add(mov, add(el("div"), el("b", "", x.t), el("p", "", x.d))));
      main.appendChild(add(m, mov));
    },
    projects() {
      const h1 = header("Tracklist · Dự án", "Dự án"); h1.appendChild(el("p", "role", "Sáu bài tập của học phần " + D.course + ". Bấm vào từng bài để xem quy trình thực hiện và sản phẩm cuối cùng.")); main.appendChild(h1);
      main.appendChild(add(el("section", "sec rv"), tracklist()));
    },
    bai() {
      const p = proj[N - 1], c = el("p", "crumb"), a = el("a", "", "Dự án"); a.href = "du-an.html";
      add(c, a, document.createTextNode(" / Bài " + N));
      const h = header("Bài " + N + " · " + p.tag, p.title, c); h.appendChild(el("p", "lead", p.sum)); main.appendChild(h);
      main.appendChild(add(sec("Chương I", "Mục tiêu"), items("ol", p.goals, "rom")));
      const sl = el("ol", "score"); (p.steps || ["[Bước 1: bạn đã làm gì?]"]).forEach(s => { const li = el("li"); if (typeof s === "string") li.textContent = s; else add(li, el("b", "", s.t), el("br"), document.createTextNode(s.d)); sl.appendChild(li); });
      main.appendChild(add(sec("Chương II", "Quy trình thực hiện"), sl));
      main.appendChild(add(sec("Chương III", "Công cụ đã dùng"), add(el("div", "chips"), (p.tools || ["[Công cụ]"]).map(t => el("span", "chip", t)))));
      const pr = sec("Chương IV", "Sản phẩm cuối cùng");
      if (p.pdf) { const f = el("iframe", "frame"); f.src = p.pdf; f.title = "Báo cáo Bài " + N; const l = el("a", "", "Mở báo cáo ở tab mới"); l.href = p.pdf; l.target = "_blank"; add(pr, f, el("p", "", "")); pr.lastChild.appendChild(l); }
      if (p.video) { const v = el("iframe", "frame video"); v.src = p.video; v.title = "Video Bài " + N; v.allowFullscreen = true; pr.appendChild(v); }
      main.appendChild(pr);
      const rf = sec("Coda", "Nhìn lại bài tập");
      add(rf, el("p", "", "Bài học rút ra: " + (p.lesson || "[...]")), el("p", "", "Khó khăn đã gặp: " + (p.hard || "[...]")), el("p", "", "Hướng cải thiện lần sau: " + (p.next || "[...]")));
      main.appendChild(rf);
      const pg2 = el("nav", "pager"), pv = N > 1 ? "bai-" + (N - 1) + ".html" : "du-an.html", nx = N < proj.length ? mk(N + 1) : "tong-ket.html";
      const A = (h, t) => { const x = el("a", "", t); x.href = h; return x; };
      main.appendChild(add(pg2, A(pv, N > 1 ? "← Bài " + (N - 1) : "← Tất cả dự án"), A(nx, N < proj.length ? "Bài " + (N + 1) + " →" : "Tổng kết →")));
    },
    summary() {
      const S = D.summary;
      const h2 = header("Coda · Tổng kết", "Tổng kết"); h2.appendChild(el("p", "role", "Nhìn lại quá trình làm Portfolio.")); main.appendChild(h2);
      main.appendChild(add(sec("Trải nghiệm", "Trải nghiệm và cảm nhận cá nhân"), el("blockquote", "q", S.feel)));
      const k = sec("Điều đọng lại", "Kiến thức và kỹ năng quan trọng nhất đã tiếp thu"), mov = el("div", "mov");
      S.key.forEach(x => add(mov, add(el("div"), el("b", "", x.t), el("p", "", x.d)))); main.appendChild(add(k, mov));
      const t = sec("Nhìn lại", "Điểm tâm đắc nhất và thách thức đã gặp"), two = el("div", "two"), a = el("div"), b = el("div");
      add(a, el("p", "lab", "Điểm tâm đắc nhất"), el("p", "", S.proud)); add(b, el("p", "lab", "Thách thức đã gặp"), el("p", "", S.hard));
      main.appendChild(add(t, add(two, a, b)));
      main.appendChild(add(sec("Liên kết", "Các trang bài tập đã hoàn thành"), tracklist()));
    }
  };
  pages[pg]();

  // Hiệu ứng ánh sáng theo chuột trong khung thông tin
  const fx = document.querySelector(".facts");
  if (fx) {
    fx.addEventListener("pointermove", e => { const r = fx.getBoundingClientRect(); fx.style.setProperty("--mx", (e.clientX - r.left) + "px"); fx.style.setProperty("--my", (e.clientY - r.top) + "px"); });
    fx.addEventListener("pointerleave", () => { fx.style.setProperty("--mx", "-200px"); fx.style.setProperty("--my", "-200px"); });
  }

  // Nốt nhạc bay lơ lửng ở nền
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const layer = el("div", "notes"); layer.setAttribute("aria-hidden", "true");
    const g = ["♪", "♫", "♩", "♬"];
    for (let i = 0; i < 16; i++) {
      const s = el("span", "", g[i % g.length]), st = s.style;
      st.left = Math.random() * 100 + "%"; st.fontSize = (24 + Math.random() * 34) + "px";
      st.animationDuration = (18 + Math.random() * 16) + "s"; st.animationDelay = (-Math.random() * 34) + "s";
      st.color = i % 3 ? "var(--wine)" : "var(--gold)";
      st.setProperty("--sw", (Math.random() * 90 - 45) + "px"); st.setProperty("--dx", (Math.random() * 120 - 60) + "px");
      st.setProperty("--r", (Math.random() * 50 - 25) + "deg"); st.setProperty("--o", (0.14 + Math.random() * 0.16).toFixed(2));
      layer.appendChild(s);
    }
    document.body.prepend(layer);
  }

  const rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
    rv.forEach(e => io.observe(e));
  } else rv.forEach(e => e.classList.add("in"));
})();
