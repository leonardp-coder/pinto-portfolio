/* Pinto — shared intro (v2). Add once per page, inside <head>:
   <script src="pinto-intro.js"></script>
   Add the data-once attribute to play it only once per browser session.
   Sequence: grid + scan line -> particles swirl in and form the wordmark -> chrome letters resolve
   -> orbit rings, star, tagline -> wordmark dissolves into dust as the iris opens onto the page. */
(() => {
  const sc = document.currentScript;
  try { if (sc && sc.hasAttribute('data-once')) { if (sessionStorage.getItem('pl-intro')) return; sessionStorage.setItem('pl-intro', '1'); } } catch (e) {}
  const d = document, root = d.documentElement, head = d.head || root;
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  // fonts: wait (briefly) so the particle shape matches the real wordmark
  const lk = d.createElement('link'); lk.rel = 'stylesheet';
  lk.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Inter+Tight:wght@600&display=swap';
  const fontsReady = new Promise(res => {
    let done = false; const fin = () => { if (!done) { done = true; res(); } };
    lk.addEventListener('load', () => { (d.fonts && d.fonts.load ? Promise.all([d.fonts.load('600 100px "Inter Tight"'), d.fonts.load('500 16px Inter')]) : Promise.resolve()).then(fin, fin); });
    lk.addEventListener('error', fin); setTimeout(fin, 1100);
  });
  head.appendChild(lk);

  const st = d.createElement('style');
  st.textContent = `
@property --r{syntax:'<percentage>';inherits:false;initial-value:-20%}
html.pl-hold{overflow:hidden}
#pl-intro{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;overflow:hidden;background:#000;
-webkit-mask-image:radial-gradient(circle at 50% 50%,transparent var(--r,-20%),#000 calc(var(--r,-20%) + 18%));mask-image:radial-gradient(circle at 50% 50%,transparent var(--r,-20%),#000 calc(var(--r,-20%) + 18%));animation:plBg .35s ease backwards}
#pl-intro.go{animation:plIris 1.05s cubic-bezier(.65,0,.35,1) 3.2s forwards}
#pl-intro:before{content:"";position:absolute;inset:0;opacity:0;background:linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px) 0 0/64px 64px,linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px) 0 0/64px 64px;-webkit-mask-image:radial-gradient(circle,#000,transparent 62%);mask-image:radial-gradient(circle,#000,transparent 62%)}
#pl-intro.go:before{animation:plFade 1.2s ease .1s forwards}
#pl-intro:after{content:"";position:absolute;left:0;right:0;top:-2px;height:1px;opacity:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.7),transparent);box-shadow:0 0 28px 2px rgba(255,255,255,.25)}
#pl-intro.go:after{animation:plScan 2.1s cubic-bezier(.5,0,.3,1) .1s}
.pl-glow{position:absolute;width:76vmin;height:76vmin;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.17),rgba(170,175,190,.05) 50%,transparent 68%);opacity:0}
.go .pl-glow{animation:plGlow 3.4s ease both}
.pl-cv{position:absolute;inset:0;width:100%;height:100%}
.pl-c{position:absolute;width:20px;height:20px;border:0 solid rgba(255,255,255,.38);opacity:0}
.pl-c.a{top:5vmin;left:5vmin;border-width:1px 0 0 1px}.pl-c.b{top:5vmin;right:5vmin;border-width:1px 1px 0 0}.pl-c.c{bottom:5vmin;left:5vmin;border-width:0 0 1px 1px}.pl-c.d{bottom:5vmin;right:5vmin;border-width:0 1px 1px 0}
.go .pl-c{animation:plCorner .9s cubic-bezier(.2,.8,.2,1) .15s forwards,plFadeOut .5s ease 3.05s forwards}
.pl-foot{position:absolute;left:calc(5vmin + 38px);right:calc(5vmin + 38px);bottom:calc(5vmin + 2px);display:flex;justify-content:space-between;align-items:center;font:500 11px/1 Inter,system-ui,sans-serif;letter-spacing:.22em;color:#8b8b93;opacity:0}
.go .pl-foot{animation:plFoot .6s ease .2s forwards,plFadeOut .5s ease 3.05s forwards}
.pl-count{font-variant-numeric:tabular-nums;color:#d4d4d8;letter-spacing:.12em}
.pl-bar{position:absolute;display:block;left:0;right:0;bottom:-15px;height:1px;background:rgba(255,255,255,.12)}
.pl-bar u{display:block;height:100%;background:linear-gradient(90deg,transparent,#fff);box-shadow:0 0 12px #fff;transform-origin:left;transform:scaleX(0)}
.pl-lock{position:relative;display:flex;flex-direction:column;align-items:center;gap:22px}
.go .pl-lock{animation:plOut .75s ease 3.05s forwards}
.pl-word{position:relative;display:flex;font:600 clamp(64px,13vw,134px)/1 "Inter Tight",Inter,system-ui,sans-serif;letter-spacing:-.05em}
.pl-word i{font-style:normal;color:transparent;opacity:0;background:linear-gradient(105deg,transparent 42%,rgba(255,255,255,.95) 50%,transparent 58%) -150% 0/250% 100% no-repeat,linear-gradient(180deg,#fff,#6f6f76);-webkit-background-clip:text;background-clip:text}
.go .pl-word i{animation:plLetter 1.05s cubic-bezier(.2,.8,.2,1) calc(1.45s + var(--i)*.09s) forwards,plShine 1.1s ease calc(2.15s + var(--i)*.07s) forwards}
.pl-star{position:absolute;right:-.3em;top:-.1em;width:.34em;height:.34em;background:linear-gradient(135deg,#fff,#8c8c94);clip-path:polygon(50% 0,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0 50%,40% 40%);opacity:0}
.go .pl-star{animation:plStar 1.0s ease 1.85s forwards,plTwinkle 1.8s ease-in-out 2.85s infinite}
.pl-rings{position:absolute;inset:0;pointer-events:none;perspective:1000px;opacity:0}
.go .pl-rings{animation:plRingIn 1s ease 1.8s forwards}
.pl-rings b{position:absolute;left:50%;top:50%;width:132%;aspect-ratio:1;border-radius:50%;border:1px solid rgba(255,255,255,.28);transform:translate(-50%,-50%) rotateX(72deg);animation:plOrbit 14s linear infinite}
.pl-rings b:before{content:"";position:absolute;top:-3.5px;left:50%;width:7px;height:7px;margin-left:-3.5px;border-radius:50%;background:#fff;box-shadow:0 0 14px #fff}
.pl-rings b+b{width:104%;border-style:dashed;border-color:rgba(255,255,255,.2);animation-duration:20s;animation-direction:reverse}
.pl-line{height:1px;width:min(260px,52vw);background:linear-gradient(90deg,transparent,#fff,transparent);transform:scaleX(0)}
.go .pl-line{animation:plLine 1s cubic-bezier(.6,0,.2,1) 2.0s forwards}
.pl-tag{font:500 clamp(12px,1.9vw,17px)/1 Inter,system-ui,sans-serif;color:#cfcfd6;padding-left:.32em;opacity:0;text-shadow:0 0 22px rgba(255,255,255,.45)}
.go .pl-tag{animation:plTag 1.2s cubic-bezier(.2,.8,.2,1) 2.15s forwards}
/* reduced motion: simple fade */
#pl-intro.rm{animation:plFade2 .5s ease 1.1s forwards}
.rm .pl-word i{opacity:1;background:linear-gradient(180deg,#fff,#6f6f76);-webkit-background-clip:text;background-clip:text}
.rm .pl-star{opacity:1}.rm .pl-line{transform:none}.rm .pl-tag{opacity:.95;letter-spacing:.32em}.rm .pl-glow{opacity:.75}.rm .pl-cv,.rm .pl-c,.rm .pl-foot,.rm .pl-rings{display:none}
@keyframes plBg{from{opacity:0}}
@keyframes plFade{to{opacity:1}}
@keyframes plFade2{to{opacity:0}}
@keyframes plFadeOut{to{opacity:0}}
@keyframes plGlow{0%{opacity:0;transform:scale(.6)}45%{opacity:1}100%{opacity:.75;transform:scale(1.15)}}
@keyframes plScan{0%{top:-2px;opacity:0}12%{opacity:1}100%{top:100%;opacity:0}}
@keyframes plCorner{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:none}}
@keyframes plFoot{to{opacity:1}}
@keyframes plLetter{from{opacity:0;transform:translateY(.35em) scale(.9);filter:blur(14px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes plShine{to{background-position:150% 0,0 0}}
@keyframes plStar{from{opacity:0;transform:scale(0) rotate(-90deg)}to{opacity:1;transform:none}}
@keyframes plTwinkle{50%{transform:scale(.65) rotate(18deg);opacity:.65}}
@keyframes plRingIn{to{opacity:1}}
@keyframes plOrbit{to{transform:translate(-50%,-50%) rotateX(72deg) rotateZ(360deg)}}
@keyframes plLine{to{transform:scaleX(1)}}
@keyframes plTag{from{opacity:0;letter-spacing:.95em;filter:blur(6px)}to{opacity:.95;letter-spacing:.32em;filter:none}}
@keyframes plOut{to{opacity:0;transform:scale(1.1);filter:blur(12px)}}
@keyframes plIris{from{--r:-20%}to{--r:120%;opacity:0}}
@media(max-width:480px){.pl-foot{font-size:10px;letter-spacing:.14em}}`;
  head.appendChild(st);

  const el = d.createElement('div'); el.id = 'pl-intro'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<div class="pl-glow"></div><canvas class="pl-cv"></canvas>'
    + '<b class="pl-c a"></b><b class="pl-c b"></b><b class="pl-c c"></b><b class="pl-c d"></b>'
    + '<div class="pl-lock"><div class="pl-word">' + [...'Pinto'].map((c, i) => `<i style="--i:${i}">${c}</i>`).join('')
    + '<s class="pl-star"></s><span class="pl-rings"><b></b><b></b></span></div><div class="pl-line"></div><div class="pl-tag">DATA ENGINEER</div></div>'
    + '<div class="pl-foot"><span>PINTO LEONARD · PORTFOLIO</span><span class="pl-count">000</span><em class="pl-bar"><u></u></em></div>';
  root.appendChild(el); root.classList.add('pl-hold');

  let dead = false, W = 0, H = 0;
  const cv = el.querySelector('.pl-cv'), ctx = cv.getContext('2d');
  const fit = () => { const k = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * k; cv.height = H * k; ctx.setTransform(k, 0, 0, k, 0, 0); };
  const cleanup = () => { dead = true; removeEventListener('resize', fit); el.remove(); st.remove(); lk.remove(); root.classList.remove('pl-hold'); };

  if (reduce) { el.classList.add('rm'); setTimeout(cleanup, 1800); return; }

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ez = u => u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;

  // sample the wordmark so particles can form it
  const buildParticles = () => {
    const wordEl = el.querySelector('.pl-word'), letters = [...wordEl.querySelectorAll('i')];
    const wr = wordEl.getBoundingClientRect(), F = parseFloat(getComputedStyle(letters[0]).fontSize), pad = 20;
    const oc = d.createElement('canvas'); oc.width = Math.ceil(wr.width) + pad * 2; oc.height = Math.ceil(wr.height) + pad * 2;
    const o = oc.getContext('2d', { willReadFrequently: true });
    o.font = `600 ${F}px "Inter Tight",Inter,system-ui,sans-serif`; o.textBaseline = 'alphabetic'; o.fillStyle = '#fff';
    const m = o.measureText('Pinto'), asc = m.fontBoundingBoxAscent || F * .8, desc = m.fontBoundingBoxDescent || F * .2;
    const base = pad + (F - (asc + desc)) / 2 + asc;
    letters.forEach(l => o.fillText(l.textContent, pad + l.offsetLeft, base));
    const img = o.getImageData(0, 0, oc.width, oc.height).data, step = F > 110 ? 3 : 2, P = [];
    for (let y = 0; y < oc.height; y += step) for (let x = 0; x < oc.width; x += step) {
      if (img[(y * oc.width + x) * 4 + 3] < 128) continue;
      const tx = wr.left - pad + x + Math.random() * step, ty = wr.top - pad + y + Math.random() * step;
      const a = Math.random() * 6.283, R = Math.max(W, H) * (.55 + Math.random() * .35);
      const sx = W / 2 + Math.cos(a) * R, sy = H / 2 + Math.sin(a) * R * .8;
      const vx = tx - sx, vy = ty - sy, len = Math.hypot(vx, vy) || 1;
      const ox = tx - W / 2, oy = ty - H / 2, ol = Math.hypot(ox, oy) || 1, r = Math.random();
      P.push({ tx, ty, sx, sy, px: -vy / len, py: vx / len, sw: (Math.random() - .5) * 280,
        d: .12 + clamp((tx - wr.left) / wr.width) * .5 + Math.random() * .18, du: 1 + Math.random() * .4,
        g: r < .55 ? 0 : r < .85 ? 1 : 2, sz: 1.1 + Math.random() * 1.4, ph: Math.random() * 6.283,
        bx: ox / ol + (Math.random() - .5) * .9, by: oy / ol + (Math.random() - .5) * .9, bs: .5 + Math.random() });
    }
    return P.sort((a, b) => a.g - b.g);
  };

  const start = () => {
    if (dead) return;
    el.classList.add('go');
    const T0 = performance.now(); setTimeout(cleanup, 4350);
    let P = [];
    try { fit(); addEventListener('resize', fit); P = buildParticles(); } catch (e) { P = []; }
    if (!P.length) return;
    const dust = Array.from({ length: innerWidth < 620 ? 220 : 480 }, () => ({ x: Math.random() * W, y: Math.random() * H, v: 6 + Math.random() * 16, ph: Math.random() * 6.283 }));
    const fills = ['rgb(255,255,255)', 'rgb(205,210,226)', 'rgb(150,156,172)'], gain = [.95, .75, .55];
    const cnt = el.querySelector('.pl-count'), bar = el.querySelector('.pl-bar u'); let lastPct = -1;
    const frame = now => {
      if (dead) return;
      const t = (now - T0) / 1000;
      ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,.24)'; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      // drifting dust for depth
      const dk = clamp(t / .8) * (1 - clamp((t - 2.9) / .5));
      if (dk > .01) {
        ctx.fillStyle = fills[1];
        for (const q of dust) {
          ctx.globalAlpha = (.18 + .16 * Math.sin(t * 1.6 + q.ph)) * dk;
          const y = (((q.y - t * q.v) % H) + H) % H;
          ctx.fillRect(q.x + Math.sin(t * .5 + q.ph) * 26, y + Math.cos(t * .4 + q.ph * 1.3) * 22, 1.4, 1.4);
        }
      }
      // wordmark particles: swirl in, hold, hand over to the real letters, then burst outward
      const fo = 1 - clamp((t - 1.8) / .75); let lastG = -1;
      for (const p of P) {
        let x, y, a;
        if (t < 3) {
          const u = clamp((t - p.d) / p.du); if (u <= 0) continue;
          const e = 1 - Math.pow(1 - u, 3), arc = Math.sin(Math.PI * u) * p.sw * (1 - e * .4);
          x = p.sx + (p.tx - p.sx) * e + p.px * arc; y = p.sy + (p.ty - p.sy) * e + p.py * arc;
          if (u >= 1) { x += Math.sin(t * 3.1 + p.ph) * .7; y += Math.cos(t * 2.7 + p.ph) * .7; }
          a = clamp(u * 4) * fo;
        } else {
          const b = t - 3, k = b * 70 + b * b * 520 * p.bs;
          x = p.tx + p.bx * k; y = p.ty + p.by * k; a = clamp(b * 9) * (1 - clamp(b)) * .9;
        }
        if (a < .02) continue;
        if (p.g !== lastG) { ctx.fillStyle = fills[p.g]; lastG = p.g; }
        ctx.globalAlpha = a * gain[p.g];
        ctx.fillRect(x - p.sz / 2, y - p.sz / 2, p.sz, p.sz);
      }
      ctx.globalAlpha = 1;
      const pct = Math.round(ez(clamp(t / 3)) * 100);
      if (pct !== lastPct) { lastPct = pct; cnt.textContent = String(pct).padStart(3, '0'); bar.style.transform = `scaleX(${pct / 100})`; }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  fontsReady.then(start);
})();
