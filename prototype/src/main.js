/* Baghbaan prototype — live demo controller (navigation, answers, toasts, chart hover, device scaling). */
(function () {
  const { S, dxState } = window.APP;
  const A = window.ART, ic = A.ic;
  const dev = document.getElementById('device');
  const st = { lang: 'en', route: 'home', stack: [], dx: { area: null, answers: {} }, season: 'spring', online: true, pid: 'dodine', chrome: true, toast: null, sheet: null };
  try { const l = localStorage.getItem('bb-lang'); if (l) st.lang = l; } catch (e) { /* storage unavailable */ }

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

  function render() {
    const id = st.route === 'home_autumn' ? 'home' : st.route;
    const view = Object.assign({}, st, { season: st.route === 'home_autumn' ? 'autumn' : 'spring' });
    let html = (S[id] || S.home)(view);
    if (st.sheet === 'tour') html = html.replace(/<\/div>$/, tourSheet() + '</div>');
    dev.innerHTML = html;
    const scr = dev.querySelector('.screen');
    if (scr && (id === 'home') && window.innerWidth < 900) {
      const sc = scr.querySelector('.sc');
      sc.insertAdjacentHTML('afterbegin', '<button class="chip" data-act="tour" style="align-self:flex-start;border-style:dashed">' + ic('grid') + 'Demo tour: jump to any screen</button>');
    }
    wireCharts();
    document.querySelectorAll('[data-guide]').forEach(b => b.classList.toggle('on', b.dataset.guide === st.route));
    if (st.toast) { clearTimeout(render.t); render.t = setTimeout(() => { st.toast = null; render(); }, 2600); }
  }
  function tourSheet() {
    return '<div class="scrim" data-act="close-sheet"><div class="sheet" role="dialog" aria-label="Demo tour" data-stop><span class="grab"></span><div class="row between"><p class="t-title">Demo tour</p><button class="iconbtn" data-act="close-sheet" aria-label="Close">' + ic('x') + '</button></div>' +
      TOUR.map(([g, items]) => '<div><p class="t-label" style="margin-bottom:6px">' + g + '</p><div class="chips">' + items.map(([id, n]) => '<button class="chip" data-go="' + id + '">' + n + '</button>').join('') + '</div></div>').join('') + '</div></div>';
  }
  function go(id, push) {
    if (id === st.route && !st.sheet) return;
    if (push !== false && st.route !== id) st.stack.push(st.route);
    st.route = id; st.sheet = null;
    if (['home', 'shop', 'learn', 'mandi', 'services'].includes(id)) st.stack = [];
    try { history.replaceState(null, '', toHash(id)); } catch (e) { /* ignore */ }
    render();
    const sc = dev.querySelector('.sc'); if (sc) sc.scrollTop = 0;
  }
  function back() {
    if (st.route === 'dx_q') {
      const keys = Object.keys(st.dx.answers);
      if (keys.length) { delete st.dx.answers[keys[keys.length - 1]]; render(); return; }
    }
    go(st.stack.pop() || 'home', false);
  }
  function answer(q, a) {
    st.dx.answers[q] = a;
    const ds = dxState(st);
    if (ds.done) go('dx_sev'); else { render(); const sc = dev.querySelector('.sc'); if (sc) sc.scrollTop = 0; }
  }

  dev.addEventListener('click', (e) => {
    const el = e.target.closest('[data-go],[data-back],[data-lang],[data-area],[data-ans],[data-sev],[data-act],[data-mq],.toggle,[data-stop]');
    if (!el) return;
    if (el.hasAttribute('data-stop') && !e.target.closest('[data-go],[data-act]')) return;
    if (el.dataset.pid) st.pid = el.dataset.pid;
    if (el.hasAttribute('data-back')) return back();
    if (el.dataset.lang) { st.lang = el.dataset.lang; try { localStorage.setItem('bb-lang', st.lang); } catch (x) { /* ignore */ } return render(); }
    if (el.dataset.area) { st.dx = { area: el.dataset.area, answers: {} }; return go('dx_q'); }
    if (el.dataset.ans) return answer(el.dataset.q, el.dataset.ans);
    if (el.dataset.sev) { st.dx.sev = +el.dataset.sev; return render(); }
    if (el.hasAttribute('data-mq')) { st.toast = 'Thanks. This helps growers near you.'; return render(); }
    if (el.classList.contains('toggle')) { el.classList.toggle('on'); el.setAttribute('aria-checked', el.classList.contains('on')); return; }
    if (el.dataset.go) {
      if (el.dataset.go === 'dx_area') st.dx = { area: null, answers: {} };
      if (el.dataset.go === 'dx_result' && !st.dx.area) st.dx = { area: 'leaves', answers: { velvety: 'yes', fruit_too: 'yes' }, sev: 2 };
      return go(el.dataset.go);
    }
    const act = el.dataset.act;
    const toasts = { 'save-diary': 'Saved to your spray diary', 'send-expert': 'Sent. An expert will reply in about 2 hours', 'add-cart': 'Added 5 packs to your order', 'place-order': 'Order placed. Pickup ready at 4 PM' };
    if (act === 'tour') { st.sheet = 'tour'; return render(); }
    if (act === 'close-sheet') { st.sheet = null; return render(); }
    if (toasts[act]) { st.toast = toasts[act]; if (act === 'add-cart') st.cartCount = 4; return render(); }
  });

  /* chart hover: crosshair + tooltip */
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
        tip.style.left = (x * r.width / m.W) + 'px'; tip.style.top = (y * r.height / m.H) + 'px';
      };
      const leave = () => { cross.setAttribute('visibility', 'hidden'); dot.setAttribute('visibility', 'hidden'); tip.hidden = true; };
      svg.addEventListener('pointermove', move); svg.addEventListener('pointerleave', leave);
    });
  }

  /* desktop guide */
  const guide = document.getElementById('guide');
  const gl = document.getElementById('glogo'); if (gl) gl.innerHTML = A.logo(48);
  if (guide) {
    guide.querySelector('.tour').innerHTML = TOUR.map(([g, items]) => '<div><p class="t-label" style="margin-bottom:6px">' + g + '</p><div class="chips">' + items.map(([id, n]) => '<button class="chip" data-guide="' + id + '">' + n + '</button>').join('') + '</div></div>').join('');
    guide.addEventListener('click', (e) => {
      const b = e.target.closest('[data-guide],[data-glang]'); if (!b) return;
      if (b.dataset.glang) { st.lang = b.dataset.glang; try { localStorage.setItem('bb-lang', st.lang); } catch (x) { /* ignore */ } guide.querySelectorAll('[data-glang]').forEach(x => x.classList.toggle('on', x === b)); return render(); }
      const id = b.dataset.guide;
      if (id === 'dx_area') st.dx = { area: null, answers: {} };
      go(id);
    });
    guide.querySelectorAll('[data-glang]').forEach(x => x.classList.toggle('on', x.dataset.glang === st.lang));
  }

  /* fit the device to short desktop windows */
  function fit() {
    if (window.innerWidth <= 560) { dev.style.zoom = ''; return; }
    const z = Math.min(1, (window.innerHeight - 40) / 784);
    dev.style.zoom = z < 1 ? z.toFixed(3) : '';
  }
  window.addEventListener('resize', fit);
  window.addEventListener('hashchange', () => { const id = toId(location.hash); if (id && (S[id] || id === 'home_autumn') && id !== st.route) go(id); });

  const start = toId(location.hash || '');
  if (start && (S[start] || start === 'home_autumn')) {
    st.route = start;
    if (start.startsWith('dx_') && start !== 'dx_area' && start !== 'dx_photo' && start !== 'dx_expert') st.dx = { area: 'leaves', answers: start === 'dx_q' ? {} : { velvety: 'yes', fruit_too: 'yes' }, sev: 2 };
  }
  fit(); render();
})();
