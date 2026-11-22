/* Pinto — shared intro. Add once per page, inside <head>:
   <script src="pinto-intro.js"></script>
   Add the data-once attribute to play it only once per browser session. */
(() => {
  const sc = document.currentScript;
  try { if (sc && sc.hasAttribute('data-once')) { if (sessionStorage.getItem('pl-intro')) return; sessionStorage.setItem('pl-intro', '1'); } } catch (e) {}
  const d = document, root = d.documentElement, head = d.head || root;
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const lk = d.createElement('link'); lk.rel = 'stylesheet';
  lk.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Inter+Tight:wght@600&display=swap'; head.appendChild(lk);
  const st = d.createElement('style');
  st.textContent = `
@property --r{syntax:'<percentage>';inherits:false;initial-value:-20%}
html.pl-hold{overflow:hidden}
#pl-intro{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;overflow:hidden;background:#000;
-webkit-mask-image:radial-gradient(circle at 50% 50%,transparent var(--r,-20%),#000 calc(var(--r,-20%) + 18%));mask-image:radial-gradient(circle at 50% 50%,transparent var(--r,-20%),#000 calc(var(--r,-20%) + 18%));
animation:plBg .5s ease backwards,plIris 1.05s cubic-bezier(.65,0,.35,1) 2.85s forwards}
#pl-intro:before{content:"";position:absolute;inset:0;opacity:0;background:linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px) 0 0/64px 64px,linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px) 0 0/64px 64px;-webkit-mask-image:radial-gradient(circle,#000,transparent 62%);mask-image:radial-gradient(circle,#000,transparent 62%);animation:plFade 1.4s ease .2s forwards}
.pl-glow{position:absolute;width:76vmin;height:76vmin;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.17),rgba(170,175,190,.05) 50%,transparent 68%);opacity:0;animation:plGlow 3s ease .1s both}
.pl-lock{position:relative;display:flex;flex-direction:column;align-items:center;gap:22px;animation:plOut .75s ease 2.65s forwards}
.pl-word{position:relative;display:flex;font:600 clamp(64px,13vw,134px)/1 "Inter Tight",Inter,system-ui,sans-serif;letter-spacing:-.05em}
.pl-word i{font-style:normal;color:transparent;opacity:0;background:linear-gradient(105deg,transparent 42%,rgba(255,255,255,.95) 50%,transparent 58%) -150% 0/250% 100% no-repeat,linear-gradient(180deg,#fff,#6f6f76);-webkit-background-clip:text;background-clip:text;animation:plLetter 1s cubic-bezier(.2,.8,.2,1) calc(.25s + var(--i)*.1s) forwards,plShine 1.1s ease calc(1.7s + var(--i)*.08s) forwards}
.pl-star{position:absolute;right:-.3em;top:-.1em;width:.34em;height:.34em;background:linear-gradient(135deg,#fff,#8c8c94);clip-path:polygon(50% 0,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0 50%,40% 40%);opacity:0;animation:plStar 1.1s ease 1.2s forwards,plTwinkle 1.8s ease-in-out 2.3s infinite}
.pl-line{height:1px;width:min(260px,52vw);background:linear-gradient(90deg,transparent,#fff,transparent);transform:scaleX(0);animation:plLine 1s cubic-bezier(.6,0,.2,1) 1.1s forwards}
.pl-tag{font:500 clamp(12px,1.9vw,17px)/1 Inter,system-ui,sans-serif;color:#cfcfd6;padding-left:.32em;opacity:0;text-shadow:0 0 22px rgba(255,255,255,.45);animation:plTag 1.2s cubic-bezier(.2,.8,.2,1) 1.35s forwards}
@keyframes plBg{from{opacity:0}}
@keyframes plFade{to{opacity:1}}
@keyframes plGlow{0%{opacity:0;transform:scale(.6)}45%{opacity:1}100%{opacity:.75;transform:scale(1.15)}}
@keyframes plLetter{from{opacity:0;transform:translateY(.35em) scale(.9);filter:blur(14px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes plShine{to{background-position:150% 0,0 0}}
@keyframes plStar{from{opacity:0;transform:scale(0) rotate(-90deg)}to{opacity:1;transform:none}}
@keyframes plTwinkle{50%{transform:scale(.65) rotate(18deg);opacity:.65}}
@keyframes plLine{to{transform:scaleX(1)}}
@keyframes plTag{from{opacity:0;letter-spacing:.95em;filter:blur(6px)}to{opacity:.95;letter-spacing:.32em;filter:none}}
@keyframes plOut{to{opacity:0;transform:scale(1.1);filter:blur(12px)}}
@keyframes plIris{from{--r:-20%}to{--r:120%;opacity:0}}
@media(prefers-reduced-motion:reduce){#pl-intro{animation:plFade2 .5s ease 1.1s forwards!important}#pl-intro *{animation-duration:.01ms!important;animation-delay:0s!important;animation-iteration-count:1!important}.pl-lock{animation:none!important}@keyframes plFade2{to{opacity:0}}}`;
  head.appendChild(st);
  const el = d.createElement('div'); el.id = 'pl-intro'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<div class="pl-glow"></div><div class="pl-lock"><div class="pl-word">' + [...'Pinto'].map((c, i) => `<i style="--i:${i}">${c}</i>`).join('') + '<s class="pl-star"></s></div><div class="pl-line"></div><div class="pl-tag">DATA ENGINEER</div></div>';
  root.appendChild(el); root.classList.add('pl-hold');
  setTimeout(() => { el.remove(); st.remove(); lk.remove(); root.classList.remove('pl-hold'); }, reduce ? 1800 : 3980);
})();
