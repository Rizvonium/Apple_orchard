/* Baghbaan prototype — live demo controller (navigation, answers, cart, toasts, chart hover, device fitting). */
(function () {
  const { S, dxState } = window.APP;
  const A = window.ART, D = window.DATA, ic = A.ic;
  const dev = document.getElementById('device');
  const guide = document.getElementById('guide');
  const PHONE = '(max-width: 560px), (max-height: 500px) and (pointer: coarse)';
  const st = { lang: 'en', route: 'home', stack: [], dx: { area: null, answers: {} }, season: 'spring', online: true, pid: 'dodine', chrome: true, toast: null, sheet: null, tourChip: true, cart: Object.fromEntries(D.kit), qty: {}, toggles: {} };
  try { const l = localStorage.getItem('bb-lang'); if (l && D.T[l]) st.lang = l; } catch (e) { /* storage unavailable */ }

  const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const isScreen = (id) => id === 'home_autumn' || own(S, id);
  const toId = (h) => h.replace(/^#/, '').replace(/-/g, '_');
  const toHash = (id) => '#' + id.replace(/_/g, '-');
  const TOUR = [
    ['Getting started', [['lang', 'Choose language'], ['welcome', 'Welcome'], ['village', 'Pick your village']]],
    ['Orchard Doctor', [['dx_area', 'Start a diagnosis'], ['dx_photo', 'Photo check'], ['dx_expert', 'Ask an expert']]],
    ['Buy', [['shop', 'Shop'], ['shop_list', 'Fungicides for scab'], ['product', 'Product & dose'], ['cart', 'Order & pay later'], ['verify', 'Genuine-pack check']]],
    ['Learn', [['learn', 'Lessons'], ['lesson', 'Soil sampling lesson'], ['library', 'Pests & diseases'], ['calendar', 'Orchard year']]],
    ['Mandi & news', [['mandi', 'Prices'], ['sell', 'Where to sell'], ['roads', 'Highway status'], ['weather', 'Spray window'], ['news', 'News']]],
    ['Services', [['services', 'All services'], ['labour', 'Book a team'], ['truck', 'Send apples'], ['booking', 'Track a truck']]],
    ['My orchard & data', [['orchard', 'My orchard'], ['diary', 'Spray diary'], ['privacy', 'Privacy'], ['pestmap', 'Pest map']]],
    ['Low connectivity', [['offline', 'Offline mode'], ['chat', 'SMS / chat helpline']]],
    ['Seasons', [['home', 'Home in May'], ['home_autumn', 'Home in November']]]
  ];
  const sampleDx = () => ({ area: 'leaves', answers: { velvety: 'yes', fruit_too: 'yes' }, sev: 2 });

  /* ---------- rendering ---------- */
  function focusKey(el) {
    if (!el || !dev.contains(el)) return null;
    for (const a of ['data-go', 'data-act', 'data-ans', 'data-sev', 'data-tog', 'data-who', 'data-ship', 'data-pay', 'data-lang', 'data-area', 'aria-label']) if (el.hasAttribute(a)) return '[' + a + '="' + CSS.escape(el.getAttribute(a)) + '"]';
    return null;
  }
  function render(opts) {
    opts = opts || {};
    const id = own(S, st.route) ? st.route : 'home';
    let html;
    try { html = S[id](st); } catch (err) { console.error(err); st.toast = 'This screen is not ready in the demo'; html = S.home(st); }
    if (st.sheet === 'tour') html = html.replace(/<\/div>$/, tourSheet() + '</div>');
    const oldSc = dev.querySelector('.sc'), keep = opts.keepScroll && oldSc ? oldSc.scrollTop : 0;
    const fk = opts.focus === 'same' ? focusKey(document.activeElement) : null;
    dev.innerHTML = html;
    const sc = dev.querySelector('.sc'); if (sc) sc.scrollTop = keep;
    const scr = dev.querySelector('.screen');
    if (st.sheet === 'tour' && scr) {
      scr.querySelectorAll(':scope > :not(.scrim)').forEach(n => { n.inert = true; });
      const c = scr.querySelector('.sheet [data-act="close-sheet"]'); if (c) c.focus();
    } else if (fk && dev.querySelector(fk)) dev.querySelector(fk).focus();
    else if (opts.focus === 'title') { const h = dev.querySelector('.ab h1'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } }
    wireCharts();
    if (guide) guide.querySelectorAll('[data-guide]').forEach(b => b.classList.toggle('on', b.dataset.guide === (st.route === 'home' && st.season === 'autumn' ? 'home_autumn' : st.route)));
    if (st.toast) {
      clearTimeout(render.t);
      render.t = setTimeout(() => { st.toast = null; const t = dev.querySelector('.toast'); if (t) t.remove(); }, 2800);
    }
  }
  function tourSheet() {
    return '<div class="scrim" data-act="close-sheet"><div class="sheet" role="dialog" aria-modal="true" aria-label="Demo tour" data-stop><span class="grab"></span><div class="row between"><p class="t-title">Demo tour</p><button class="iconbtn" data-act="close-sheet" aria-label="Close">' + ic('x') + '</button></div>' +
      TOUR.map(([g, items]) => '<div><p class="t-label" style="margin-bottom:6px">' + g + '</p><div class="chips">' + items.map(([id, n]) => '<button class="chip" data-go="' + id + '">' + n + '</button>').join('') + '</div></div>').join('') + '</div></div>';
  }
  function go(id, push) {
    if (!isScreen(id)) id = 'home';
    if (id === 'home_autumn') { st.season = 'autumn'; id = 'home'; }
    else if (id === 'home' && push !== false && st.sheet === 'tour') st.season = 'spring';
    if (id === st.route && !st.sheet) { if (id === 'home') render({ focus: 'title' }); return; }
    if (push !== false && st.route !== id) st.stack.push(st.route);
    st.route = id; st.sheet = null; st.toast = null;
    if (['home', 'shop', 'learn', 'mandi', 'services'].includes(id)) st.stack = [];
    try { history.replaceState(null, '', toHash(id === 'home' && st.season === 'autumn' ? 'home_autumn' : id)); } catch (e) { /* ignore */ }
    render({ focus: 'title' });
  }
  function back() {
    const keys = Object.keys(st.dx.answers || {});
    if (st.route === 'dx_q' && keys.length) { delete st.dx.answers[keys[keys.length - 1]]; return render({ focus: 'title' }); }
    if (st.route === 'dx_sev' && keys.length) delete st.dx.answers[keys[keys.length - 1]];
    go(st.stack.pop() || 'home', false);
  }
  function answer(q, a) {
    st.dx.answers[q] = a;
    if (dxState(st).done) go('dx_sev'); else render({ focus: 'title' });
  }
  function setLang(l) {
    if (!D.T[l]) return;
    st.lang = l;
    try { localStorage.setItem('bb-lang', l); } catch (x) { /* ignore */ }
    if (guide) guide.querySelectorAll('[data-glang]').forEach(x => x.classList.toggle('on', x.dataset.glang === l));
    render({ keepScroll: true, focus: 'same' });
  }
  function toast(msg) { st.toast = msg; render({ keepScroll: true, focus: 'same' }); }

  dev.addEventListener('click', (e) => {
    const el = e.target.closest('[data-go],[data-back],[data-lang],[data-area],[data-ans],[data-sev],[data-who],[data-ship],[data-pay],[data-act],[data-mq],[data-tog],[data-stop]');
    if (!el) return;
    if (el.hasAttribute('data-stop') && !e.target.closest('[data-go],[data-act]')) return;
    if (el.dataset.pid) st.pid = el.dataset.pid;
    if (el.hasAttribute('data-back')) return back();
    if (el.dataset.lang) return setLang(el.dataset.lang);
    if (el.dataset.area) { st.dx = { area: el.dataset.area, answers: {} }; return go('dx_q'); }
    if (el.dataset.ans) return answer(el.dataset.q, el.dataset.ans);
    if (el.dataset.sev) { st.dx.sev = +el.dataset.sev; return render({ keepScroll: true, focus: 'same' }); }
    if (el.dataset.who) { st.who = +el.dataset.who; return render({ keepScroll: true, focus: 'same' }); }
    if (el.dataset.ship) { st.ship = +el.dataset.ship; return render({ keepScroll: true, focus: 'same' }); }
    if (el.dataset.pay) { st.pay = +el.dataset.pay; return render({ keepScroll: true, focus: 'same' }); }
    if (el.hasAttribute('data-mq')) return toast('Thanks. This helps growers near you.');
    if (el.dataset.tog) {
      if (el.getAttribute('aria-disabled') === 'true') return toast('Needed for local advice. You can delete your village under Delete all.');
      st.toggles[el.dataset.tog] = el.getAttribute('aria-checked') !== 'true';
      return render({ keepScroll: true, focus: 'same' });
    }
    if (el.dataset.go) {
      if (el.dataset.go === 'dx_area') st.dx = { area: null, answers: {} };
      if ((el.dataset.go === 'dx_result' || el.dataset.go === 'dx_sev') && !st.dx.area) st.dx = sampleDx();
      return go(el.dataset.go);
    }
    const act = el.dataset.act;
    const pid = own(D.products, st.pid) ? st.pid : 'dodine';
    if (act === 'tour') { st.sheet = 'tour'; return render(); }
    if (act === 'close-sheet') { st.sheet = null; render(); const t = dev.querySelector('.tour-chip'); if (t) t.focus(); return; }
    if (act === 'qty+' || act === 'qty-') {
      const cur = st.qty[pid] || +((dev.querySelector('.stepper .num') || {}).textContent) || 1;
      st.qty[pid] = Math.max(1, cur + (act === 'qty+' ? 1 : -1));
      return render({ keepScroll: true, focus: 'same' });
    }
    if (act === 'add-cart') {
      const q = st.qty[pid] || +((dev.querySelector('.stepper .num') || {}).textContent) || 1;
      st.cart[pid] = q;
      return toast(q + ' × ' + D.products[pid].name + ' in your order');
    }
    if (act === 'kit') { st.cart = Object.fromEntries(D.kit); return go('cart'); }
    if (act === 'place-order') { st.cart = {}; return toast('Order placed. Pickup ready at 3 PM today'); }
    const toasts = { 'save-diary': 'Saved to your spray diary', 'send-expert': 'Sent. An expert will reply in about 2 hours', soon: 'Booking for this opens in the next version of the demo', feedback: 'Thanks. Experts use this to improve the Doctor' };
    if (toasts[act]) return toast(toasts[act]);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && st.sheet) { st.sheet = null; render(); const t = dev.querySelector('.tour-chip'); if (t) t.focus(); }
  });

  /* chart hover: crosshair + tooltip, positioned in % so device zoom does not shift it */
  function wireCharts() {
    dev.querySelectorAll('svg.chart[data-chart]').forEach(svg => {
      const m = JSON.parse(svg.dataset.chart), vals = svg.dataset.values.split(',').map(Number);
      const wrap = svg.parentElement; let tip = wrap.querySelector('.chart-tip');
      if (!tip) { tip = document.createElement('div'); tip.className = 'chart-tip'; tip.hidden = true; wrap.appendChild(tip); }
      const cross = svg.querySelector('.cross'), dot = svg.querySelector('.hov');
      const xOf = i => m.padL + (m.W - m.padL - m.padR) * i / (m.n - 1);
      const yOf = v => m.padT + (m.H - m.padT - m.padB) * (1 - (v - m.lo) / (m.hi - m.lo));
      const day = (i) => { const d = new Date(2026, 3, 13 + i); return d.getDate() + ' ' + d.toLocaleString('en', { month: 'short' }); };
      const move = (ev) => {
        const r = svg.getBoundingClientRect(), sx = (ev.clientX - r.left) * (m.W / r.width);
        const i = Math.max(0, Math.min(m.n - 1, Math.round((sx - m.padL) / ((m.W - m.padL - m.padR) / (m.n - 1)))));
        const x = xOf(i), y = yOf(vals[i]);
        cross.setAttribute('x1', x); cross.setAttribute('x2', x); cross.setAttribute('visibility', 'visible');
        dot.setAttribute('cx', x); dot.setAttribute('cy', y); dot.setAttribute('visibility', 'visible');
        tip.hidden = false; tip.textContent = day(i) + ' · ₹' + vals[i] + ' /kg';
        tip.style.left = (x / m.W * 100) + '%'; tip.style.top = (y / m.H * 100) + '%';
      };
      const leave = () => { cross.setAttribute('visibility', 'hidden'); dot.setAttribute('visibility', 'hidden'); tip.hidden = true; };
      svg.addEventListener('pointermove', move); svg.addEventListener('pointerleave', leave);
    });
  }

  /* desktop guide */
  const gl = document.getElementById('glogo'); if (gl) gl.innerHTML = A.logo(48);
  if (guide) {
    guide.querySelector('.tour').innerHTML = TOUR.map(([g, items]) => '<div><p class="t-label" style="margin-bottom:6px">' + g + '</p><div class="chips">' + items.map(([id, n]) => '<button class="chip" data-guide="' + id + '">' + n + '</button>').join('') + '</div></div>').join('');
    guide.addEventListener('click', (e) => {
      const b = e.target.closest('[data-guide],[data-glang]'); if (!b) return;
      if (b.dataset.glang) return setLang(b.dataset.glang);
      const id = b.dataset.guide;
      if (id === 'dx_area') st.dx = { area: null, answers: {} };
      if (['dx_q', 'dx_sev', 'dx_result'].includes(id) && !st.dx.area) st.dx = sampleDx();
      if (id === 'home') st.season = 'spring';
      st.sheet = 'x'; go(id); st.sheet = null;
    });
    guide.querySelectorAll('[data-glang]').forEach(x => x.classList.toggle('on', x.dataset.glang === st.lang));
  }

  /* fit the framed device to short desktop windows; phones get the full-bleed app */
  function fit() {
    if (window.matchMedia(PHONE).matches) { dev.style.zoom = ''; return; }
    const z = Math.min(1, (window.innerHeight - 40) / 784);
    dev.style.zoom = z < 1 ? z.toFixed(3) : '';
  }
  window.addEventListener('resize', fit);
  function openFromHash() {
    const id = toId(location.hash || '');
    if (!id || !isScreen(id)) return false;
    if (['dx_q', 'dx_sev', 'dx_result'].includes(id) && !st.dx.area) st.dx = id === 'dx_q' ? { area: 'leaves', answers: {} } : sampleDx();
    if (id === 'home_autumn') { st.season = 'autumn'; st.route = 'home'; } else st.route = id;
    return true;
  }
  window.addEventListener('hashchange', () => {
    const id = toId(location.hash || '');
    const cur = st.route === 'home' && st.season === 'autumn' ? 'home_autumn' : st.route;
    if (id && isScreen(id) && id !== cur) { if (['dx_q', 'dx_sev', 'dx_result'].includes(id) && !st.dx.area) st.dx = sampleDx(); st.sheet = 'x'; go(id); st.sheet = null; }
  });

  openFromHash();
  fit(); render();
})();
