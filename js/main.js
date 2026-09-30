/* Hare & Grouse — shared site script */
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const page = document.body.dataset.page || 'home';
const ARROW = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 9L9 3M4 3h5v5"/></svg>';
const COMPASS = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M8.5 3.5 7 7 3.5 8.5 5 5z"/></svg>';
window.HG = { ARROW, COMPASS };

/* ---------- collection data ---------- */
const WORKS = [
  { t: 'Before the Divide', a: 'Adaeze Okafor', cat: 'Painting', y: 2024, m: 'Oil on linen', s: '90 × 120 cm', p: '£4,800', k: 0 },
  { t: 'Loom & Thread', a: 'Kofi Mensah', cat: 'Textile', y: 2023, m: 'Hand-woven cotton & silk', s: '140 × 60 cm', p: '£2,900', k: 1 },
  { t: 'Vessel No. 7', a: 'Hana Ibrahim', cat: 'Ceramics', y: 2022, m: 'Wood-fired stoneware', s: 'H 42 cm', p: '£1,650', k: 2 },
  { t: 'Grouse at Dusk', a: 'Thomas Elridge', cat: 'Painting', y: 2021, m: 'Egg tempera on panel', s: '50 × 70 cm', p: '£3,400', k: 3 },
  { t: 'The Hare', a: 'Mairi Campbell', cat: 'Sculpture', y: 2024, m: 'Cast bronze', s: 'H 36 cm', p: 'Bid', k: 4 },
  { t: '6th Sense', a: 'Tunde Bakare', cat: 'Painting', y: 2023, m: 'Acrylic on canvas', s: '100 × 100 cm', p: '£5,200', k: 5 },
  { t: 'New Life', a: 'Esi Owusu', cat: 'Painting', y: 2024, m: 'Oil & charcoal', s: '80 × 110 cm', p: '£3,900', k: 0 },
  { t: 'Broken Rose', a: 'Lena Morrow', cat: 'Painting', y: 2022, m: 'Oil on canvas', s: '60 × 80 cm', p: 'Sold', k: 5 },
  { t: 'Ancestral Weave', a: 'Amara Diallo', cat: 'Textile', y: 2021, m: 'Indigo-dyed strip cloth', s: '200 × 110 cm', p: '£4,100', k: 1 },
  { t: 'Twin Urns', a: 'Hana Ibrahim', cat: 'Ceramics', y: 2023, m: 'Burnished earthenware', s: 'H 30 cm (pair)', p: '£2,200', k: 2 },
  { t: 'Moorland Watch', a: 'Thomas Elridge', cat: 'Painting', y: 2024, m: 'Oil on board', s: '40 × 50 cm', p: '£2,600', k: 3 },
  { t: 'Guardian Mask', a: 'Workshop of Ife', cat: 'Sculpture', y: 1960, m: 'Carved hardwood, pigment', s: 'H 48 cm', p: 'Bid', k: 6 },
];
window.HG.WORKS = WORKS;

/* ---------- procedural grayscale artwork ---------- */
function rng(s) { return () => (s = (s * 16807) % 2147483647) / 2147483647; }
let uid = 0;
function art(seed, kind = seed % 7, w = 400, h = 500) {
  const r = rng(seed * 991 + 7), id = 'a' + (uid++);
  const g = v => { const c = Math.round(v); return `rgb(${c},${c},${c})`; };
  const bgT = 200 + r() * 40, bgB = 90 + r() * 60;
  let s = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${g(bgT)}"/><stop offset="1" stop-color="${g(bgB)}"/></linearGradient>
  <radialGradient id="${id}r" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>
  <filter id="${id}n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .22 0"/></filter></defs>
  <rect width="${w}" height="${h}" fill="url(#${id}g)"/>`;
  if (kind === 0) { // landscape w/ figure
    s += `<circle cx="${w * (.3 + r() * .4)}" cy="${h * .28}" r="${40 + r() * 30}" fill="${g(245)}" opacity=".8"/>`;
    for (let i = 0; i < 4; i++) {
      const y = h * (.45 + i * .12), c = 150 - i * 35; let d = `M0 ${y}`;
      for (let x = 0; x <= w; x += w / 6) d += ` Q${x + w / 12} ${y - 20 - r() * 50} ${x + w / 6} ${y + r() * 20 - 10}`;
      s += `<path d="${d} V${h} H0Z" fill="${g(c)}"/>`;
    }
    const fx = w * (.35 + r() * .3), fy = h * .78;
    s += `<g fill="${g(20)}"><ellipse cx="${fx}" cy="${fy - 70}" rx="11" ry="13"/><path d="M${fx - 16} ${fy - 55} Q${fx} ${fy - 62} ${fx + 16} ${fy - 55} L${fx + 20} ${fy} H${fx - 20}Z"/></g>`;
  } else if (kind === 1) { // woven textile
    const rows = 14, cols = 10;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const cw = w / cols, ch = h / rows, c = ((x + y) % 2 ? 40 : 210) + r() * 30;
      s += `<rect x="${x * cw}" y="${y * ch}" width="${cw}" height="${ch}" fill="${g(c)}"/>`;
      if ((x * y + y) % 3 === 0) s += `<path d="M${x * cw + cw / 2} ${y * ch + 4} L${x * cw + cw - 4} ${y * ch + ch / 2} L${x * cw + cw / 2} ${y * ch + ch - 4} L${x * cw + 4} ${y * ch + ch / 2}Z" fill="${g(c > 120 ? 30 : 230)}"/>`;
    }
    for (let y = 0; y < h; y += 6) s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#000" stroke-opacity=".08"/>`;
  } else if (kind === 2) { // ceramic vessel
    s += `<rect y="${h * .72}" width="${w}" height="${h * .28}" fill="${g(70)}"/>`;
    const cx = w / 2, bw = 90 + r() * 40, nk = 30 + r() * 12, top = h * .22, bot = h * .74;
    s += `<path d="M${cx - nk} ${top} C${cx - nk} ${top + 60} ${cx - bw - 30} ${top + 90} ${cx - bw} ${(top + bot) / 2 + 30} S${cx - 40} ${bot} ${cx} ${bot} S${cx + bw} ${bot - 20} ${cx + bw} ${(top + bot) / 2 + 30} S${cx + nk} ${top + 60} ${cx + nk} ${top}Z" fill="${g(35)}"/>
    <ellipse cx="${cx}" cy="${top}" rx="${nk + 6}" ry="8" fill="${g(15)}"/>
    <path d="M${cx - bw + 20} ${(top + bot) / 2} Q${cx} ${(top + bot) / 2 + 30} ${cx + bw - 20} ${(top + bot) / 2}" stroke="${g(200)}" stroke-width="3" fill="none" stroke-dasharray="10 6"/>
    <path d="M${cx - bw + 30} ${(top + bot) / 2 + 26} Q${cx} ${(top + bot) / 2 + 56} ${cx + bw - 30} ${(top + bot) / 2 + 26}" stroke="${g(200)}" stroke-width="2" fill="none"/>
    <ellipse cx="${cx - bw / 2}" cy="${(top + bot) / 2 - 10}" rx="14" ry="40" fill="#fff" opacity=".15"/>`;
  } else if (kind === 3) { // grouse on moor
    s += `<path d="M0 ${h * .7} Q${w / 2} ${h * .6} ${w} ${h * .72} V${h} H0Z" fill="${g(60)}"/>`;
    for (let i = 0; i < 40; i++) { const x = r() * w, y = h * .7 + r() * h * .3; s += `<path d="M${x} ${y} l-4 -${10 + r() * 14} M${x} ${y} l3 -${8 + r() * 10}" stroke="${g(25)}" stroke-width="1.4"/>`; }
    const bx = w * .5, by = h * .64;
    s += `<g fill="${g(22)}"><ellipse cx="${bx}" cy="${by}" rx="62" ry="40"/><circle cx="${bx + 50}" cy="${by - 42}" r="20"/><path d="M${bx + 38} ${by - 30} L${bx + 55} ${by - 10} L${bx + 20} ${by}Z"/><path d="M${bx - 55} ${by - 10} L${bx - 105} ${by - 26} L${bx - 60} ${by + 12}Z"/><path d="M${bx + 68} ${by - 44} l12 4 l-12 4Z"/></g>
    <path d="M${bx + 42} ${by - 54} q8 -6 14 0" stroke="${g(200)}" stroke-width="3" fill="none"/>
    <path d="M${bx - 40} ${by - 5} q40 -20 80 0 M${bx - 36} ${by + 10} q36 -18 72 0" stroke="${g(90)}" stroke-width="2" fill="none"/>`;
  } else if (kind === 4) { // hare
    s += `<circle cx="${w * .5}" cy="${h * .42}" r="${w * .32}" fill="${g(235)}" opacity=".55"/>
    <rect y="${h * .76}" width="${w}" height="${h * .24}" fill="${g(55)}"/>`;
    const x = w * .45, y = h * .6;
    s += `<g fill="${g(20)}"><ellipse cx="${x}" cy="${y + 20}" rx="70" ry="52"/><ellipse cx="${x + 62}" cy="${y - 40}" rx="30" ry="24"/><path d="M${x + 58} ${y - 58} C${x + 40} ${y - 170} ${x + 60} ${y - 190} ${x + 70} ${y - 62}Z"/><path d="M${x + 72} ${y - 60} C${x + 90} ${y - 170} ${x + 110} ${y - 170} ${x + 84} ${y - 54}Z"/><ellipse cx="${x - 20}" cy="${y + 66}" rx="44" ry="12"/><circle cx="${x - 70}" cy="${y + 20}" r="12"/></g>
    <circle cx="${x + 74}" cy="${y - 44}" r="3.5" fill="${g(230)}"/>`;
  } else if (kind === 5) { // abstract modernist
    for (let i = 0; i < 7; i++) {
      const c = r() * 230, x = r() * w, y = r() * h, sz = 60 + r() * 160;
      s += r() < .5 ? `<circle cx="${x}" cy="${y}" r="${sz / 2}" fill="${g(c)}" opacity=".85"/>` : `<rect x="${x - sz / 2}" y="${y - sz / 2}" width="${sz}" height="${sz * (0.5 + r())}" rx="${r() < .5 ? sz / 2 : 0}" fill="${g(c)}" opacity=".85"/>`;
    }
    s += `<path d="M0 ${h * r()} L${w} ${h * r()}" stroke="${g(10)}" stroke-width="4"/>`;
  } else { // mask
    const cx = w / 2, cy = h * .48;
    s += `<rect width="${w}" height="${h}" fill="${g(35)}" opacity=".6"/>
    <path d="M${cx} ${cy - 170} C${cx + 110} ${cy - 170} ${cx + 100} ${cy + 80} ${cx} ${cy + 170} C${cx - 100} ${cy + 80} ${cx - 110} ${cy - 170} ${cx} ${cy - 170}Z" fill="${g(170)}"/>
    <path d="M${cx - 55} ${cy - 20} q25 -20 45 0 q-20 12 -45 0Z M${cx + 10} ${cy - 20} q25 -20 45 0 q-20 12 -45 0Z" fill="${g(20)}"/>
    <path d="M${cx} ${cy - 10} L${cx - 12} ${cy + 60} H${cx + 12}Z" fill="${g(110)}"/>
    <path d="M${cx - 30} ${cy + 95} q30 14 60 0" stroke="${g(20)}" stroke-width="7" fill="none"/>
    ${[0, 1, 2].map(i => `<line x1="${cx - 70 + i * 6}" y1="${cy - 80 + i * 16}" x2="${cx + 70 - i * 6}" y2="${cy - 80 + i * 16}" stroke="${g(40)}" stroke-width="3"/>`).join('')}
    <path d="M${cx} ${cy - 170} V${cy - 110}" stroke="${g(40)}" stroke-width="4"/>`;
  }
  s += `<rect width="${w}" height="${h}" fill="url(#${id}r)" style="mix-blend-mode:overlay"/><rect width="${w}" height="${h}" filter="url(#${id}n)"/></svg>`;
  return s;
}
window.HG.art = art;

/* ---------- cultural pattern backdrop (adinkra-inspired + tartan-line glyphs) ---------- */
const GLYPHS = [
  '<circle cx="50" cy="50" r="30"/><circle cx="50" cy="50" r="12"/>' + [...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<line x1="${50 + Math.cos(a) * 34}" y1="${50 + Math.sin(a) * 34}" x2="${50 + Math.cos(a) * 46}" y2="${50 + Math.sin(a) * 46}"/>`; }).join(''),
  '<path d="M20 20h60v60H20z M35 35h30v30H35z M20 20l15 15 M80 20 65 35 M20 80l15-15 M80 80 65 65"/>',
  '<path d="M50 10v80 M10 50h80 M25 25c15 10 35 10 50 0 M25 75c15-10 35-10 50 0"/>',
  '<path d="M30 15c-20 20-20 50 0 70 M70 15c20 20 20 50 0 70 M30 50h40"/><circle cx="50" cy="50" r="6"/>',
  '<path d="M10 80 30 20l20 60 20-60 20 60"/>',
  '<path d="M50 12 88 50 50 88 12 50Z M50 30 70 50 50 70 30 50Z"/>',
  '<path d="M50 15c-25 0-35 25-20 35s35 5 30-10-25-10-25 0"/><path d="M50 85c25 0 35-25 20-35"/>',
  '<path d="M15 30h70 M15 50h70 M15 70h70 M30 15v70 M50 15v70 M70 15v70" stroke-dasharray="6 5"/>',
];
function glyph(i, stroke = '#000') { return `<svg viewBox="0 0 100 100" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round">${GLYPHS[i % GLYPHS.length]}</svg>`; }
window.HG.glyph = glyph;
const tile = (() => {
  let s = '<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round">';
  const pos = [[20, 20], [200, 10], [110, 130], [270, 150], [10, 230], [190, 250]];
  pos.forEach(([x, y], i) => s += `<g transform="translate(${x} ${y}) scale(.9)">${GLYPHS[(i * 3) % GLYPHS.length]}</g>`);
  return 'url("data:image/svg+xml,' + encodeURIComponent(s + '</svg>') + '")';
})();
$$('.pattern').forEach(p => p.style.backgroundImage = tile);

/* ---------- chrome: loader, nav, footer ---------- */
const LINKS = [['home', 'index.html', 'Homepage'], ['collection', 'collection.html', 'Collection'], ['exhibitions', 'exhibitions.html', 'Exhibitions'], ['craft', 'craft.html', 'Heritage Craft'], ['about', 'about.html', 'About Us'], ['participate', 'participate.html', 'Take Part'], ['contact', 'contact.html', 'Contact']];
document.body.insertAdjacentHTML('afterbegin', `
<div id="loader"><img src="assets/logo.png" alt=""></div>
<div class="cursor"></div>
<nav class="nav" aria-label="Main"><div class="nav-bar">
  <a href="index.html" class="brand"><img src="assets/logo.png" alt="">Hare &amp; Grouse</a>
  <ul class="nav-links">${LINKS.filter(l => l[0] !== 'contact').map(([k, h, n]) => `<li><a href="${h}" class="${k === page ? 'active' : ''}">${n}</a></li>`).join('')}</ul>
  <a href="collection.html" class="btn btn-pill"><span class="ico">${COMPASS}</span>Explore Collections</a>
  <button class="menu-btn" aria-label="Menu"><span></span><span></span></button>
</div></nav>
<div class="mobile-menu">${LINKS.map(([k, h, n], i) => `<a href="${h}" class="${k === page ? 'active' : ''}" style="transition-delay:${.15 + i * .05}s">${n}</a>`).join('')}</div>`);
document.body.insertAdjacentHTML('beforeend', `
<footer class="footer"><div class="foot-grid">
  <div><img class="foot-logo" src="assets/logo.png" alt="Hare &amp; Grouse"><p>Exhibiting and promoting historical and cultural arts and crafts through research, exhibitions and cultural education.</p></div>
  <div><h5>Explore</h5><ul>${LINKS.slice(0, 5).map(([, h, n]) => `<li><a href="${h}">${n}</a></li>`).join('')}</ul></div>
  <div><h5>Take Part</h5><ul><li><a href="participate.html#buy">Purchase or Bid</a></li><li><a href="participate.html#exhibit">Exhibit With Us</a></li><li><a href="participate.html#register">Register Artwork</a></li><li><a href="contact.html">Contact</a></li></ul></div>
  <div><h5>Newsletter</h5><p>Exhibition openings, new acquisitions and talks — a few letters a season.</p><form class="news" data-form><input type="email" required placeholder="Your email" aria-label="Email"><button>Subscribe</button></form><p class="form-note" style="margin-top:8px"></p></div>
</div>
<div class="big" aria-hidden="true">Hare &amp; Grouse</div>
<div class="foot-bottom"><span>© ${new Date().getFullYear()} Hare &amp; Grouse. All rights reserved.</span><span><a href="mailto:info@hareandgrouse.com">info@hareandgrouse.com</a></span></div></footer>
<button class="to-top" aria-label="Back to top"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 10V2M2.5 5.5 6 2l3.5 3.5"/></svg></button>`);

window.addEventListener('load', () => setTimeout(() => $('#loader').classList.add('done'), 300));
setTimeout(() => $('#loader').classList.add('done'), 2500);

$('.menu-btn').addEventListener('click', () => document.body.classList.toggle('menu-open'));
const nav = $('.nav'), toTop = $('.to-top'); let lastY = 0;
addEventListener('scroll', () => {
  const y = scrollY;
  nav.classList.toggle('hide', y > lastY && y > 300 && !document.body.classList.contains('menu-open'));
  toTop.classList.toggle('on', y > 600); lastY = y;
}, { passive: true });
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

/* cursor */
const cur = $('.cursor');
addEventListener('pointermove', e => { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; });
document.addEventListener('pointerover', e => cur.classList.toggle('big', !!e.target.closest('a,button,.art-card,.curve-card,.exh')));

/* ---------- fill [data-art] ---------- */
$$('[data-art]').forEach(el => { const [seed, kind] = el.dataset.art.split(',').map(Number); el.insertAdjacentHTML('afterbegin', art(seed, isNaN(kind) ? undefined : kind)); });
$$('[data-glyph]').forEach(el => el.innerHTML = glyph(+el.dataset.glyph));

/* ---------- split headings ---------- */
$$('[data-split]').forEach(el => {
  el.innerHTML = el.innerHTML.split('<br>').map((l, i) => `<span class="split-line"><span style="transition-delay:${.1 + i * .12}s">${l.trim()}</span></span>`).join('');
  el.classList.add('reveal-split');
});

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15, rootMargin: '0px 0px -40px' });
$$('.reveal,.reveal-split,.t-item').forEach(el => io.observe(el));

/* ---------- counters ---------- */
const cio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; cio.unobserve(e.target);
  const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
  const step = t => { const k = Math.min(1, (t - t0) / 1600), v = Math.round(end * (1 - Math.pow(1 - k, 3))); el.textContent = v + suf; if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}), { threshold: .6 });
$$('[data-count]').forEach(el => cio.observe(el));

/* ---------- curved 3D carousel ---------- */
$$('.curve').forEach(curve => {
  const track = $('.curve-track', curve), n = +curve.dataset.n || 14;
  const list = [...Array(n)].map((_, i) => WORKS[i % WORKS.length]);
  track.innerHTML = list.map((w, i) => `<figure class="curve-card" data-i="${i % WORKS.length}">${art(i * 3 + 11, w.k)}<figcaption><span>${w.t}</span><span>${w.a}</span></figcaption></figure>`).join('');
  const cards = $$('.curve-card', track);
  let off = 0, vel = .25, drag = false, sx = 0, so = 0, moved = 0;
  function render() {
    const cw = cards[0].offsetWidth, gap = cw * 1.06, W = curve.offsetWidth, total = gap * n;
    cards.forEach((c, i) => {
      let x = ((i * gap + off) % total + total) % total - total / 2;
      const k = x / (W / 2);                           // -1..1 across viewport
      const ry = -k * 32, z = Math.abs(k) * 150, yy = 0;
      c.style.transform = `translate(-50%,-50%) translate3d(${x}px,${yy}px,${z}px) rotateY(${ry}deg)`;
      c.style.zIndex = Math.round(100 - Math.abs(k) * 50);
    });
  }
  function loop() { if (!drag) { off -= vel; vel += (.35 - vel) * .02; } render(); requestAnimationFrame(loop); }
  curve.addEventListener('pointerdown', e => { drag = true; sx = e.clientX; so = off; moved = 0; curve.classList.add('dragging'); curve.setPointerCapture(e.pointerId); });
  curve.addEventListener('pointermove', e => { if (!drag) return; const d = e.clientX - sx; moved = Math.abs(d); const prev = off; off = so + d; vel = -(off - prev); });
  const end = () => { drag = false; curve.classList.remove('dragging'); };
  curve.addEventListener('pointerup', e => { end(); if (moved < 5) { const c = document.elementsFromPoint(e.clientX, e.clientY).find(x => x.classList && x.classList.contains('curve-card')); c && openWork(+c.dataset.i); } });
  curve.addEventListener('pointercancel', end);
  loop();
});

/* ---------- artwork cards + modal ---------- */
function card(w, i) {
  return `<article class="art-card reveal" data-d="${i % 4}" data-cat="${w.cat}" data-i="${i}">
    <div class="frame"><span class="tag">${w.cat}</span>${art(i * 5 + 3, w.k)}<span class="quick">${ARROW}</span></div>
    <div class="meta"><div><h4>${w.t}</h4><p>${w.a}, ${w.y}</p></div><span class="price">${w.p}</span></div></article>`;
}
$$('[data-works]').forEach(el => {
  const lim = +el.dataset.works || WORKS.length;
  el.innerHTML = WORKS.slice(0, lim).map(card).join('');
  $$('.art-card', el).forEach(c => { io.observe(c); c.addEventListener('click', () => openWork(+c.dataset.i)); });
});
document.body.insertAdjacentHTML('beforeend', `<div class="modal" role="dialog" aria-modal="true"><div class="scrim"></div><div class="box"><button class="x" aria-label="Close">✕</button><div class="m-art"></div><div class="info"></div></div></div>`);
const modal = $('.modal');
function openWork(i) {
  const w = WORKS[i], box = $('.box', modal);
  $('.m-art', box).innerHTML = art(i * 5 + 3, w.k);
  $('.info', box).innerHTML = `<span class="eyebrow">${w.cat}</span><h2 class="display" style="font-size:32px">${w.t}</h2><p style="color:var(--muted)">${w.a}</p>
   <dl><dt>Year</dt><dd>${w.y}</dd><dt>Medium</dt><dd>${w.m}</dd><dt>Size</dt><dd>${w.s}</dd><dt>Price</dt><dd>${w.p === 'Bid' ? 'Open to bids' : w.p}</dd></dl>
   <p style="font-size:14px;color:var(--muted)">Every work in the Hare &amp; Grouse collection is accompanied by a research note on its maker, materials and cultural context.</p>
   <div class="cta-row" style="justify-content:flex-start;margin-top:auto">${w.p === 'Sold' ? '<span class="btn btn-light" style="pointer-events:none">Sold — enquire about similar</span>' : `<a href="participate.html#buy" class="btn btn-dark"><span class="ico">${ARROW}</span>${w.p === 'Bid' ? 'Place a Bid' : 'Enquire to Purchase'}</a>`}</div>`;
  modal.classList.add('on'); document.documentElement.style.overflow = 'hidden';
}
window.HG.openWork = openWork;
const closeModal = () => { modal.classList.remove('on'); document.documentElement.style.overflow = ''; };
$('.scrim', modal).onclick = closeModal; $('.x', modal).onclick = closeModal;
addEventListener('keydown', e => e.key === 'Escape' && closeModal());

/* ---------- filters ---------- */
$$('.filters').forEach(f => f.addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  $$('.chip', f).forEach(c => c.classList.toggle('on', c === b));
  const cat = b.dataset.f;
  $$('.art-card').forEach(c => { const show = cat === 'All' || c.dataset.cat === cat; c.classList.toggle('hidden', !show); if (show) { c.classList.remove('in'); requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('in'))); } });
}));

/* ---------- tabs ---------- */
$$('.tabs').forEach(tabs => {
  const pill = $('.pill', tabs), btns = $$('.tab', tabs);
  const go = b => { btns.forEach(x => x.classList.toggle('on', x === b)); pill.style.left = b.offsetLeft + 'px'; pill.style.width = b.offsetWidth + 'px'; pill.style.top = b.offsetTop + 'px'; pill.style.height = b.offsetHeight + 'px'; $$('.panel').forEach(p => p.classList.toggle('on', p.id === b.dataset.t)); };
  btns.forEach(b => b.addEventListener('click', () => { go(b); history.replaceState(null, '', '#' + b.dataset.t); }));
  const init = btns.find(b => '#' + b.dataset.t === location.hash) || btns[0];
  requestAnimationFrame(() => go(init)); addEventListener('resize', () => go($('.tab.on', tabs)));
});

/* ---------- faq ---------- */
$$('.faq-q').forEach(q => q.addEventListener('click', () => q.parentElement.classList.toggle('open')));

/* ---------- forms (static demo) ---------- */
document.addEventListener('submit', e => {
  const f = e.target; if (!f.matches('[data-form]')) return; e.preventDefault();
  const note = f.querySelector('.form-note') || f.nextElementSibling;
  if (note) note.textContent = 'Thank you — we\'ll be in touch shortly.'; f.reset();
});

/* ---------- exhibitions hover thumb ---------- */
const exhs = $$('.exh[data-thumb]');
if (exhs.length) {
  document.body.insertAdjacentHTML('beforeend', '<div class="exh-thumb"></div>');
  const th = $('.exh-thumb');
  exhs.forEach(x => {
    x.addEventListener('pointerenter', () => { const [s, k] = x.dataset.thumb.split(',').map(Number); th.innerHTML = art(s, k); th.classList.add('on'); });
    x.addEventListener('pointerleave', () => th.classList.remove('on'));
    x.addEventListener('pointermove', e => { th.style.left = e.clientX + 'px'; th.style.top = e.clientY + 'px'; });
  });
}

/* ---------- scroll-lit quote ---------- */
$$('.quote [data-words]').forEach(q => {
  q.innerHTML = q.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span> `).join('');
  const ws = $$('.w', q);
  const upd = () => { const r = q.getBoundingClientRect(), k = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .4))); ws.forEach((w, i) => w.classList.toggle('lit', i / ws.length < k)); };
  addEventListener('scroll', upd, { passive: true }); upd();
});

/* ---------- timeline progress ---------- */
$$('.timeline').forEach(t => {
  const p = $('.prog', t);
  const upd = () => { const r = t.getBoundingClientRect(); p.style.height = Math.min(r.height, Math.max(0, innerHeight * .6 - r.top)) + 'px'; };
  addEventListener('scroll', upd, { passive: true }); upd();
});

/* ---------- parallax ---------- */
const par = $$('[data-parallax]');
if (par.length) addEventListener('scroll', () => par.forEach(el => { const r = el.getBoundingClientRect(); el.style.transform = `translateY(${(r.top + r.height / 2 - innerHeight / 2) * -(+el.dataset.parallax)}px)`; }), { passive: true });
})();
