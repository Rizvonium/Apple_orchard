/* Baghbaan prototype — screens, Orchard Doctor engine and render helpers.
   Every screen is a pure function of state, so the live demo and the PDF showcase render the same markup. */
(function (G) {
  const A = G.ART, D = G.DATA, ic = A.ic;

  /* ---------- helpers ---------- */
  const rtl = (st) => st.lang === 'ur' || st.lang === 'ks';
  const t = (st, k) => (D.T[st.lang] || D.T.en)[k] || D.T.en[k] || k;
  const L = (st, k) => rtl(st) ? '<span class="ur">' + t(st, k) + '</span>' : t(st, k);
  const money = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
  const mk = (n) => ' data-mark="' + n + '"';
  function art(spec, w, h, seed) {
    const [type, kind] = spec;
    if (type === 'leaf') return A.leaf(kind, w, h, seed);
    if (type === 'fruit') return A.fruit(kind, w, h, seed);
    if (type === 'bark') return A.bark(kind, w, h, seed);
    if (type === 'roots') return A.roots(kind, w, h);
    if (type === 'tree') return A.tree(kind, w, h);
    if (type === 'flowers') return A.flowers(kind, w, h);
    if (type === 'icon') return iconArt(kind, h);
    return '';
  }
  function iconArt(name, size, color) { return '<span style="display:grid;place-items:center;width:100%;height:' + size + 'px;color:' + (color || 'var(--sky)') + '">' + ic(name).replace('class="ic"', 'class="ic" style="width:' + Math.round(size * .48) + 'px;height:' + Math.round(size * .48) + 'px"') + '</span>'; }
  function artAny(spec, w, h, seed) { return spec[0] === 'icon' ? iconArt(spec[1], h) : art(spec, w, h, seed); }

  const TABS = [['home', 'home', 'home'], ['shop', 'bag', 'buy'], ['learn', 'book', 'learn'], ['mandi', 'chart', 'mandi'], ['services', 'users', 'services']];
  function statusbar(dark) {
    return '<div class="sb"' + (dark ? ' style="color:#fff"' : '') + '><span class="num">10:24</span><span class="sbr">' + ic('signal') + '<span style="font-size:11px;font-weight:800">4G</span>' + ic('battery') + '</span></div>';
  }
  function appbar(st, o) {
    const back = o.back ? '<button class="iconbtn" data-back aria-label="Back">' + ic('back', 'flip') + '</button>' : '';
    return '<header class="ab">' + back + '<h1>' + o.title + (o.sub ? '<span class="sub">' + o.sub + '</span>' : '') + '</h1>' + (o.right || '') + '</header>';
  }
  function tabbar(st, cur) {
    return '<nav class="tb" aria-label="Main sections">' + TABS.map(([id, icn, key]) => '<button class="' + (cur === id ? 'on' : '') + '" data-go="' + id + '"' + (cur === id ? ' aria-current="page"' : '') + '><span class="tic">' + ic(icn) + '</span><span' + (rtl(st) ? ' class="ur"' : '') + '>' + t(st, key) + '</span></button>').join('') + '</nav>';
  }
  function frame(st, o) {
    return '<div class="screen' + (o.cls ? ' ' + o.cls : '') + '" dir="' + (rtl(st) ? 'rtl' : 'ltr') + '" data-screen="' + o.id + '">' +
      (st.chrome === false ? '' : statusbar(o.darkbar)) +
      (st.online === false ? '<div class="offline-bar">' + ic('wifioff', 's16') + 'No internet · showing info saved at 7:10 AM</div>' : '') +
      (o.appbar != null ? o.appbar : appbar(st, o)) +
      '<main class="sc' + (o.bodyCls ? ' ' + o.bodyCls : '') + '">' + o.body + '</main>' + (o.footer || '') +
      (o.tab ? tabbar(st, o.tab) : '') + (o.sheet || '') + (st.toast ? '<div class="toast" role="status">' + ic('check', 's18') + st.toast + '</div>' : '') + '</div>';
  }
  const tog = (st, key, dflt) => (st.toggles && key in st.toggles) ? st.toggles[key] : dflt;
  const stars = (r) => '<span class="stars" aria-label="' + r + ' stars">' + [1, 2, 3, 4, 5].map(i => ic('star', i <= Math.round(r) ? '' : 'faint')).join('') + '</span>';
  const pillFor = (lvl, text) => '<span class="pill ' + lvl + '">' + (lvl === 'risk' ? ic('alert') : lvl === 'good' ? ic('check') : lvl === 'warn' ? ic('alert') : ic('info')) + text + '</span>';

  /* ---------- Orchard Doctor engine (naive Bayes + information gain) ---------- */
  const WHY = { velvety: 'Velvety olive-green to black spots', fruit_too: 'Dark, rough spots on young fruit too', after_rain: 'Started after rainy spring days', frogeye: 'Small round spots with a ring', blotch: 'Dark patches, leaves yellow and fall', powder: 'White powder on shoots', bronze: 'Dull, bronze leaves with tiny dots', curl: 'Curled, sticky leaves', holes: 'Eaten leaves', small: 'Small bunched leaves', after_spray: 'Marks soon after a spray', f_scab: 'Dark corky spots on fruit', f_pit: 'Sunken brown spots near the bottom', f_smudge: 'Smudges that rub off', f_halo: 'Red spots with grey centres', f_storm: 'Appeared after hail', f_crack: 'Fruit cracking', b_black: 'Black flower centres after cold night', b_noset: 'Flowers falling without fruit', b_bees: 'Few bees / cold rainy bloom', b_powder: 'White powder on flowers', k_cotton: 'White cotton masses', k_crust: 'Grey crusty bumps', k_sunken: 'Sunken, cracked dead bark', k_holes: 'Holes with sawdust', r_collar: 'Rotting bark at soil level', r_threads: 'White threads on roots', r_grubs: 'White grubs on roots', r_wet: 'Water stands after rain', k_wa_roots: 'Cotton masses on roots' };
  function dxState(st) {
    const area = st.dx.area || 'leaves';
    const conds = Object.keys(D.conditions).filter(c => D.conditions[c].areas.includes(area));
    const qs = D.questions.filter(q => q.area === area);
    const ans = st.dx.answers || {};
    let post = {};
    conds.forEach(c => post[c] = D.conditions[c].prior);
    const lik = (q, c) => (q.p[c] != null ? q.p[c] : q.dflt);
    Object.entries(ans).forEach(([qid, a]) => {
      const q = qs.find(x => x.id === qid); if (!q || a === 'unsure') return;
      conds.forEach(c => post[c] *= a === 'yes' ? lik(q, c) : 1 - lik(q, c));
    });
    const norm = (d) => { const s = Object.values(d).reduce((a, b) => a + b, 0) || 1; Object.keys(d).forEach(k => d[k] /= s); return d; };
    norm(post);
    const ranked = conds.map(c => [c, post[c]]).sort((a, b) => b[1] - a[1]);
    const remaining = qs.filter(q => !(q.id in ans));
    const nAns = Object.keys(ans).length;
    const informative = Object.values(ans).filter(a => a !== 'unsure').length;
    const H = (d) => -Object.values(d).reduce((s, p) => s + (p > 0 ? p * Math.log2(p) : 0), 0);
    const done = !remaining.length || nAns >= 6 || (ranked[0][1] >= .9 && informative >= 2);
    let next = null, best = -1;
    if (!done) remaining.forEach(q => {
      const py = conds.reduce((s, c) => s + post[c] * lik(q, c), 0);
      if (py <= 1e-9 || py >= 1 - 1e-9) return;
      const yes = {}, no = {};
      conds.forEach(c => { yes[c] = post[c] * lik(q, c) / py; no[c] = post[c] * (1 - lik(q, c)) / (1 - py); });
      const gain = H(post) - (py * H(yes) + (1 - py) * H(no));
      if (gain > best + 1e-9) { best = gain; next = q; }
    });
    /* answers that point towards the leading cause (used for "Why we think so") */
    const top = ranked[0][0];
    const supports = Object.entries(ans).filter(([qid, a]) => {
      const q = qs.find(x => x.id === qid); if (!q || a === 'unsure') return false;
      return a === 'yes' ? lik(q, top) > q.dflt : lik(q, top) < q.dflt;
    }).map(([qid, a]) => [qid, a]);
    const sure = informative > 0 && ranked[0][1] >= .35;
    return { area, ranked, next: done ? null : next, done: done || !next, nAns, informative, supports, sure, entropy: H(post) };
  }
  const level = (p) => p >= .75 ? ['Strong match', 'good'] : p >= .35 ? ['Possible', 'warn'] : ['Less likely', 'neutral'];

  /* ---------- screens ---------- */
  const S = {};

  S.lang = (st) => frame(st, { id: 'lang', appbar: '', body:
    '<div class="row" style="gap:12px;padding-top:22px">' + A.logo(54) + '<div><div class="t-huge" style="color:var(--leaf)">Baghbaan</div><div class="t-small">Your orchard companion</div></div></div>' +
    '<div><p class="t-title" style="font-size:18px">Choose your language</p><p class="ur" style="font-size:16px;color:var(--ink-2);margin:0">اپنی زبان چنیں · अपनी भाषा चुनें</p></div>' +
    '<div class="stack"' + mk(1) + '>' + D.langs.map(l => '<button class="opt ' + (st.lang === l.id ? 'on' : '') + '" data-lang="' + l.id + '"><span class="grow"><span class="tt' + (l.rtl ? ' ur' : '') + '" style="font-size:' + (l.rtl ? 19 : 18) + 'px;display:block;line-height:' + (l.rtl ? 1.9 : 1.3) + '">' + l.native + '</span><span class="st">' + l.name + ' · ' + l.note + '</span></span><span class="iconbtn" style="background:var(--leaf-soft);color:var(--leaf)" aria-label="Listen">' + ic('speaker', 's20') + '</span></button>').join('') + '</div>' +
    '<button class="btn block" data-go="welcome">Continue ' + ic('chevR', 'flip') + '</button>' +
    '<p class="t-micro" style="text-align:center">Voice guidance is on. Change language any time.</p>' });

  S.welcome = (st) => frame(st, { id: 'welcome', appbar: '', body:
    '<div class="art fluid" style="height:176px;margin-top:10px;border:0">' + A.orchardScene(330, 176) + '</div>' +
    '<h2 class="t-big">Everything for your orchard, in one place</h2>' +
    '<div class="stack g6">' + [['shield', 'Find what is wrong with your trees by answering Yes or No'], ['bag', 'Buy genuine sprays and fertilizer from licensed dealers'], ['chart', 'Mandi rates, highway status and weather for your village'], ['users', 'Book trucks, labour teams and experts']].map(([i, x]) => '<div class="row"><span class="tile-ic sm leaf">' + ic(i, 's18') + '</span><span class="t-body">' + x + '</span></div>').join('') + '</div>' +
    '<div class="stack g6"' + mk(1) + '><button class="btn block" data-go="village">' + ic('phone', 's18') + ' Continue with mobile number</button><button class="btn block ghost" data-go="village">Continue as guest</button></div>' +
    '<p class="t-micro" style="text-align:center">' + ic('lock', 's16') + ' No Aadhaar, bank or land papers needed.</p>' });

  S.village = (st) => frame(st, { id: 'village', back: true, title: 'Where is your orchard?', body:
    '<p class="t-small">We use this only for local weather, spray timing and mandi rates. Your exact location is never shared.</p>' +
    '<div class="search"' + mk(1) + '>' + ic('search', 's20') + '<span class="grow" style="color:var(--ink)">Wachi</span><span class="mic">' + ic('mic', 's18') + '</span></div>' +
    '<div class="card tight hr-list">' +
      '<div class="listrow"><span class="tile-ic sm leaf">' + ic('pin', 's18') + '</span><span class="grow"><span class="tt">Wachi</span><br><span class="st">Shopian district · South Kashmir</span></span>' + ic('check', 'c-leaf') + '</div>' +
      '<div class="listrow"><span class="tile-ic sm plain">' + ic('mountain', 's18') + '</span><span class="grow"><span class="tt">Not in the list?</span><br><span class="st">Pick the spot on a map instead</span></span>' + ic('chevR', 'chev flip') + '</div></div>' +
    '<p class="t-label">Or choose your district</p>' +
    '<div class="chips">' + ['Shopian', 'Pulwama', 'Kulgam', 'Anantnag', 'Baramulla', 'Kupwara', 'Budgam', 'Ganderbal', 'Bandipora', 'Srinagar'].map(d => '<span class="chip ' + (d === 'Shopian' ? 'on' : '') + '">' + d + '</span>').join('') + '</div>' +
    '<div class="banner info"' + mk(2) + '>' + ic('mountain', 's18') + '<span>Spray timing will follow the crop stage at your orchard\'s height. Higher orchards flower later than those in the plains.</span></div>' +
    '<button class="btn block" data-go="home">Save and continue</button><button class="link" data-go="home" style="align-self:center">Skip for now</button>' });

  function stageStrip(cur) {
    const st = ['Dormant', 'Green tip', 'Pink bud', 'Bloom', 'Petal fall', 'Fruitlet', 'Growth', 'Harvest', 'Leaf fall'];
    const ci = st.indexOf(cur);
    return '<div class="season" aria-label="Crop stage: ' + cur + '">' + st.map((s, i) => '<div class="st ' + (i < ci ? 'done' : i === ci ? 'now' : '') + '"><i></i>' + (i === ci || i === 0 || i === st.length - 1 ? '<span>' + s + '</span>' : '<span>&nbsp;</span>') + '</div>').join('') + '</div>';
  }

  const HOME = {
    en: { app: 'Baghbaan', place: 'Wachi, Shopian', greet: 'Assalamu Alaikum, Ghulam Nabi', date: 'Tue, 12 May', dateA: 'Thu, 12 Nov',
      quick: ['Spots on leaves', 'Insects & mites', 'Fruit problem', 'Tree drying', 'What to spray now?'], quickA: ['Leaves yellow early', 'Storage rot', 'Fertilizer for winter', 'Pruning help'],
      alertL: 'Disease alert', high: 'High risk', alertT: 'Scab infection risk on Wednesday', alertB: '14 mm rain expected. Leaves may stay wet about 18 hours at 11–16 °C. Your last spray was 9 days ago.', sprayBtn: 'Spray before Wednesday\'s rain', why: 'Why?',
      stageL: 'Crop stage · Wachi', upd: 'Updated today', stage: 'Fruitlet stage', next: 'Next spray: <b>before Wednesday\'s rain</b>, from the fruitlet list',
      mandiL: 'Mandi · Sopore', perkg: '/kg', variety: 'Delicious A (CA)', hwL: 'NH-44 highway', open: 'Open', hw: 'Trucks: Srinagar → Jammu today', swL: 'Spray window', sw: '4 – 7 PM', swS: 'Calm and dry · 21° / 8°', teamL: 'Spray teams', team: '3 free this evening', teamS: 'within 7 km of you',
      mqL: 'One quick question', skip: 'Skip', mq: 'Did you see bees in your orchard during bloom?', mqA: ['Many', 'A few', 'None'], mqWhy: 'Why we ask: to warn growers near you about poor fruit set. Only totals are shared.' },
    ur: { app: 'باغبان', place: 'واچی، شوپیاں', greet: 'السلام علیکم، غلام نبی', date: 'منگل، 12 مئی', dateA: 'جمعرات، 12 نومبر',
      quick: ['پتوں پر دھبے', 'کیڑے اور مائٹ', 'پھل کا مسئلہ', 'درخت سوکھ رہا ہے', 'ابھی کیا اسپرے کریں؟'], quickA: ['پتے جلدی پیلے', 'اسٹوریج میں سڑن', 'سردیوں کی کھاد', 'کٹائی میں مدد'],
      alertL: 'بیماری کا الرٹ', high: 'زیادہ خطرہ', alertT: 'بدھ کو اسکیب لگنے کا خطرہ', alertB: '14 ملی میٹر بارش متوقع ہے۔ 11 سے 16 ڈگری پر پتے تقریباً 18 گھنٹے گیلے رہ سکتے ہیں۔ آپ کا پچھلا اسپرے 9 دن پہلے ہوا تھا۔', sprayBtn: 'بدھ کی بارش سے پہلے اسپرے کریں', why: 'کیوں؟',
      stageL: 'فصل کا مرحلہ · واچی', upd: 'آج اپ ڈیٹ ہوا', stage: 'چھوٹے پھل کا مرحلہ', next: 'اگلا اسپرے: <b>بدھ کی بارش سے پہلے</b>',
      mandiL: 'منڈی · سوپور', perkg: 'فی کلو', variety: 'ڈیلیشس اے (سی اے)', hwL: 'شاہراہ NH-44', open: 'کھلی ہے', hw: 'ٹرک آج سرینگر سے جموں', swL: 'اسپرے کا وقت', sw: 'شام 4 سے 7', swS: 'ہوا کم، موسم خشک', teamL: 'اسپرے ٹیمیں', team: 'آج شام 3 دستیاب', teamS: '7 کلومیٹر کے اندر',
      mqL: 'ایک چھوٹا سا سوال', skip: 'چھوڑیں', mq: 'کیا پھول کے دنوں میں آپ کے باغ میں شہد کی مکھیاں نظر آئیں؟', mqA: ['بہت', 'کچھ', 'کوئی نہیں'], mqWhy: 'ہم کیوں پوچھتے ہیں: تاکہ آس پاس کے باغبانوں کو کم پھل لگنے سے خبردار کر سکیں۔ صرف کل تعداد شیئر ہوتی ہے۔' },
    hi: { app: 'बाग़बान', place: 'वाची, शोपियां', greet: 'अस्सलामु अलैकुम, ग़ुलाम नबी', date: 'मंगल, 12 मई', dateA: 'गुरु, 12 नवंबर',
      quick: ['पत्तों पर धब्बे', 'कीड़े और माइट', 'फल की समस्या', 'पेड़ सूख रहा है', 'अभी क्या स्प्रे करें?'], quickA: ['पत्ते जल्दी पीले', 'स्टोरेज में सड़न', 'सर्दियों की खाद', 'छंटाई में मदद'],
      alertL: 'बीमारी अलर्ट', high: 'ज़्यादा ख़तरा', alertT: 'बुधवार को स्कैब का ख़तरा', alertB: '14 मि.मी. बारिश की संभावना। 11–16 °C पर पत्ते लगभग 18 घंटे गीले रह सकते हैं। आपका पिछला स्प्रे 9 दिन पहले हुआ था।', sprayBtn: 'बुधवार की बारिश से पहले स्प्रे करें', why: 'क्यों?',
      stageL: 'फ़सल की अवस्था · वाची', upd: 'आज अपडेट', stage: 'छोटे फल की अवस्था', next: 'अगला स्प्रे: <b>बुधवार की बारिश से पहले</b>',
      mandiL: 'मंडी · सोपोर', perkg: '/किलो', variety: 'डिलीशियस A (CA)', hwL: 'NH-44 हाईवे', open: 'खुला', hw: 'ट्रक आज श्रीनगर → जम्मू', swL: 'स्प्रे का समय', sw: 'शाम 4 – 7', swS: 'हवा कम, मौसम सूखा', teamL: 'स्प्रे टीमें', team: 'आज शाम 3 ख़ाली', teamS: '7 कि.मी. के अंदर',
      mqL: 'एक छोटा सवाल', skip: 'छोड़ें', mq: 'फूल के दिनों में क्या आपके बाग़ में मधुमक्खियाँ दिखीं?', mqA: ['बहुत', 'कुछ', 'एक भी नहीं'], mqWhy: 'हम क्यों पूछते हैं: ताकि आसपास के बाग़बानों को कम फल लगने से सावधान कर सकें। सिर्फ़ कुल गिनती साझा होती है।' }
  };

  S.home = (st) => {
    const autumn = st.season === 'autumn';
    const lang = st.lang === 'ks' ? 'ur' : st.lang;
    const H = HOME[lang] || HOME.en, E = HOME.en;
    const u = rtl(st) ? ' class="ur"' : '';
    const local = lang !== 'en' && !autumn;
    const X = (k) => (local ? H[k] : E[k]);
    const ab = '<header class="ab"><span style="display:grid">' + A.logo(36) + '</span><h1>' + (lang === 'en' ? 'Baghbaan' : '<span' + u + '>' + H.app + '</span>') + '<span class="sub" style="display:flex;align-items:center;gap:3px">' + ic('pin', 's16') + '<span' + u + '>' + H.place + '</span>' + ic('chevD', 's16') + '</span></h1>' +
      '<button class="iconbtn" data-go="news" aria-label="Alerts">' + ic('bell') + '<span class="dot"></span></button>' +
      '<button class="iconbtn" data-go="orchard" aria-label="My orchard" style="background:var(--leaf-soft);color:var(--leaf);font-weight:800;font-size:14px">' + D.user.initials + '</button></header>';
    const alert = autumn
      ? '<section class="card"' + mk(3) + '><div class="row between"><span class="t-label">This week\'s task</span>' + pillFor('info', 'Leaf fall') + '</div><p class="t-title" style="margin-top:6px">Spray 3–4% urea when half the leaves are yellow</p><p class="t-small">It speeds up the rotting of fallen leaves, where scab survives winter. Fewer scab spores next spring (SKUAST-K 2026 guide).</p><div class="row" style="margin-top:10px;gap:8px"><button class="btn sm" data-go="calendar">How to mix</button><button class="btn sm ghost" data-go="shop">Buy urea</button></div></section>'
      : '<section class="card"' + mk(3) + '><div class="row between"><span class="t-label"' + (local ? u : '') + '>' + X('alertL') + '</span>' + pillFor('risk', '<span' + (local ? u : '') + '>' + X('high') + '</span>') + '</div><p class="t-title' + (local && rtl(st) ? ' ur' : '') + '" style="margin-top:6px">' + X('alertT') + '</p><p class="t-small' + (local && rtl(st) ? ' ur' : '') + '">' + X('alertB') + '</p><div class="row" style="margin-top:10px;gap:8px"><button class="btn sm" data-go="shop_list"><span' + (local ? u : '') + '>' + X('sprayBtn') + '</span></button><button class="btn sm ghost" data-go="weather"><span' + (local ? u : '') + '>' + X('why') + '</span></button></div></section>';
    const quick = autumn ? E.quickA : X('quick');
    const QT = autumn ? ['data-area="leaves"', 'data-area="fruit"', 'data-go="calendar"', 'data-go="lesson"'] : ['data-area="leaves"', 'data-area="leaves"', 'data-area="fruit"', 'data-area="roots"', 'data-go="shop_list"'];
    const body = (st.tourChip ? '<button class="chip tour-chip" data-act="tour">' + ic('grid') + 'Demo tour: jump to any screen</button>' : '') +
      '<p class="t-small"' + mk(1) + '><span' + u + '>' + H.greet + ' · ' + (autumn ? H.dateA : H.date) + '</span></p>' +
      '<section class="ask"' + mk(2) + '><span class="motif">' + A.chinar(150, '#fff') + '</span><h2' + (rtl(st) ? ' class="ur" style="font-size:20px;line-height:1.9"' : '') + '>' + t(st, 'ask') + '</h2><p' + (rtl(st) ? ' class="ur"' : '') + '>' + t(st, 'askSub') + '</p>' +
      '<div class="acts"><button class="btn" data-go="dx_area">' + L(st, 'start') + ic('chevR', 'flip') + '</button><button class="btn sq" data-go="chat" aria-label="Speak">' + ic('mic') + '</button><button class="btn sq" data-go="dx_photo" aria-label="Take a photo">' + ic('camera') + '</button></div>' +
      (st.lang === 'ks' ? '<p style="margin-top:10px;font-size:12.5px;opacity:.9">' + ic('speaker', 's16') + ' Kashmiri voice guidance is on</p>' : '') + '</section>' +
      '<div class="chips scroll">' + quick.map((q, i) => '<button class="chip" ' + QT[i] + '><span' + (local ? u : '') + '>' + q + '</span></button>').join('') + '</div>' +
      alert +
      '<section class="card"' + mk(4) + '><div class="row between"><span class="t-label"' + (local ? u : '') + '>' + X('stageL') + '</span><span class="t-micro"' + (local ? u : '') + '>' + X('upd') + '</span></div><p class="t-title' + (local && rtl(st) ? ' ur' : '') + '" style="margin:6px 0 10px">' + (autumn ? 'Leaf fall · after harvest' : X('stage')) + '</p>' + stageStrip(autumn ? 'Leaf fall' : 'Fruitlet') +
      '<button class="row" data-go="diary" style="margin-top:12px;width:100%"><span class="tile-ic sm leaf">' + ic('cal', 's18') + '</span><span class="t-small grow' + (local && rtl(st) ? ' ur' : '') + '">' + (autumn ? 'Next: <b>winter pruning</b> from mid-December' : X('next')) + '</span>' + ic('chevR', 'chev flip') + '</button></section>' +
      '<div class="grid2"' + mk(5) + '>' +
        '<button class="card tight stack g6" data-go="mandi"><span class="t-label"' + (local ? u : '') + '>' + X('mandiL') + '</span><span class="t-big num">₹' + (autumn ? 78 : 92) + '<small style="font-size:13px;color:var(--ink-3);font-weight:600"' + (local ? u : '') + '> ' + X('perkg') + '</small></span><span class="t-micro"><span' + (local ? u : '') + '>' + (autumn ? 'Delicious A' : X('variety')) + '</span> <b class="' + (autumn ? 'down' : 'up') + '">' + (autumn ? '▼ 2%' : '▲ 2%') + '</b></span></button>' +
        '<button class="card tight stack g6" data-go="roads"><span class="t-label"' + (local ? u : '') + '>' + X('hwL') + '</span><span>' + pillFor('good', '<span' + (local ? u : '') + '>' + X('open') + '</span>') + '</span><span class="t-micro"' + (local ? u : '') + '>' + X('hw') + '</span></button>' +
        '<button class="card tight stack g6" data-go="weather"><span class="t-label"' + (local ? u : '') + '>' + (autumn ? 'Tonight' : X('swL')) + '</span><span class="t-title"' + (local ? u : '') + '>' + (autumn ? 'Frost, −1 °C' : X('sw')) + '</span><span class="t-micro"' + (local ? u : '') + '>' + (autumn ? 'Cover young HDP plants' : X('swS')) + '</span></button>' +
        '<button class="card tight stack g6" data-go="' + (autumn ? 'services' : 'labour') + '"><span class="t-label"' + (local ? u : '') + '>' + (autumn ? 'CA storage' : X('teamL')) + '</span><span class="t-title"' + (local ? u : '') + '>' + (autumn ? '2 stores free' : X('team')) + '</span><span class="t-micro"' + (local ? u : '') + '>' + (autumn ? 'within 25 km' : X('teamS')) + '</span></button></div>' +
      '<section class="card"' + mk(6) + '><div class="row between"><span class="t-label"' + (local ? u : '') + '>' + X('mqL') + '</span><button class="link"' + (local ? u : '') + '>' + X('skip') + '</button></div><p class="t-title' + (local && rtl(st) ? ' ur' : '') + '" style="margin-top:6px">' + (autumn ? 'How was this year\'s crop compared to last year?' : X('mq')) + '</p>' +
      '<div class="chips" style="margin-top:10px">' + (autumn ? ['Better', 'Same', 'Worse'] : X('mqA')).map(x => '<button class="chip" data-mq><span' + (local ? u : '') + '>' + x + '</span></button>').join('') + '</div>' +
      '<p class="t-micro row" style="margin-top:10px;gap:6px;align-items:flex-start">' + ic('info', 's16') + '<span' + (local ? u : '') + '>' + (autumn ? 'Why we ask: it helps estimate this year\'s crop for your area. Only totals are shared.' : X('mqWhy')) + '</span></p></section>';
    return frame(st, { id: 'home', tab: 'home', appbar: ab, body });
  };

  /* ---------- Orchard Doctor ---------- */
  function dots(n, of) { return '<div class="progress-dots" aria-label="Step ' + n + ' of ' + of + '">' + Array.from({ length: of }, (_, i) => '<i class="' + (i < n ? 'on' : '') + '"></i>').join('') + '</div>'; }

  S.dx_area = (st) => frame(st, { id: 'dx_area', back: true, title: 'Orchard Doctor', sub: 'Step 1 · Where is the problem?', body:
    dots(1, 4) +
    '<h2 class="t-big">Where do you see the problem?</h2><p class="t-small" style="margin-top:-8px">Tap a picture. You can also speak, or take a photo.</p>' +
    '<div class="areagrid"' + mk(1) + '>' + D.areas.map(a => '<button class="area ' + (st.dx.area === a.id ? 'on' : '') + '" data-area="' + a.id + '"><span class="art" style="height:70px">' + art(a.art, 64, 64, 3) + '</span>' + a.name + '<small>' + a.sub + '</small></button>').join('') +
    '<button class="area" data-go="dx_photo"><span class="art" style="height:70px;color:var(--leaf)">' + ic('camera', 's30') + '</span>Not sure<small>take a photo</small></button></div>' +
    '<button class="btn block ghost"' + mk(2) + '>' + ic('mic') + ' Speak in Kashmiri instead</button>' });

  S.dx_q = (st) => {
    const ds = dxState(st);
    const area = D.areas.find(a => a.id === ds.area);
    if (!ds.next) {
      return frame(st, { id: 'dx_q', back: true, title: 'Orchard Doctor', sub: area.name, body: dots(3, 4) +
        '<section class="card"><p class="t-title">We have enough answers</p><p class="t-small" style="margin-top:4px">One last question about how much of the orchard is affected.</p></section>' +
        '<button class="btn block" data-go="dx_sev">Continue ' + ic('chevR', 'flip') + '</button>' });
    }
    const q = ds.next;
    const panel = (spec, i) => '<div>' + artAny(spec, 120, 112, 5 + i) + '<span class="cap">' + (i === 0 ? '<span class="c-good">' + ic('check', 's16') + '</span> ' : '<span class="c-risk">' + ic('x', 's16') + '</span> ') + spec[2] + '</span></div>';
    const top = ds.ranked.slice(0, 3);
    const body = dots(2, 4) +
      '<section class="qcard"' + mk(1) + '><div class="qart">' + q.art.map(panel).join('') + '</div><div class="qbody"><p class="t-label">Question ' + (ds.nAns + 1) + '</p><h2 style="margin-top:4px">' + q.q + '</h2>' +
      '<button class="chip" style="margin-top:10px" aria-label="Listen to the question">' + ic('speaker') + L(st, 'listen') + '</button></div></section>' +
      '<div class="answers"' + mk(2) + '><button class="answer yes" data-ans="yes" data-q="' + q.id + '">' + ic('check') + L(st, 'yes') + '</button><button class="answer no" data-ans="no" data-q="' + q.id + '">' + ic('x') + L(st, 'no') + '</button><button class="answer unsure" data-ans="unsure" data-q="' + q.id + '">' + ic('help') + L(st, 'unsure') + '</button></div>' +
      '<section class="card tight"' + mk(3) + '><div class="row between" style="margin-bottom:8px"><span class="t-label">Narrowing down</span><span class="t-micro">' + ds.nAns + ' answer' + (ds.nAns === 1 ? '' : 's') + ' so far</span></div><div class="candidates">' +
      top.map(([c, p]) => { const lv = level(p); return '<div class="cand"><b>' + D.conditions[c].name.replace(/ \(.*\)/, '') + '</b><span class="meter ' + (lv[1] === 'good' ? '' : 'warn') + '"><i style="width:' + Math.max(4, Math.round(p * 100)) + '%"></i></span><span class="pc">' + Math.round(p * 100) + '%</span></div>'; }).join('') + '</div></section>' +
      '<button class="link" data-go="dx_expert" style="align-self:center">' + ic('phone', 's16') + ' Talk to an expert instead</button>';
    return frame(st, { id: 'dx_q', back: true, title: 'Orchard Doctor', sub: area.name + ' · question ' + (ds.nAns + 1), body });
  };

  const SEV = { 1: 'a few trees', 2: 'about half the orchard', 3: 'most of the orchard' };
  S.dx_sev = (st) => frame(st, { id: 'dx_sev', back: true, title: 'Orchard Doctor', sub: 'Last step', body:
    dots(4, 4) + '<h2 class="t-big">How many trees show this?</h2>' +
    '<div class="stack"' + mk(1) + '>' + [['A few trees', 'Less than 10', 1], ['About half the orchard', 'Spread across blocks', 2], ['Most of the orchard', 'Nearly every tree', 3]].map(([a, b, k]) => '<button class="opt ' + ((st.dx.sev || 2) === k ? 'on' : '') + '" data-sev="' + k + '" aria-pressed="' + ((st.dx.sev || 2) === k) + '"><span class="row" style="gap:0;width:100px;flex:none;color:' + ((st.dx.sev || 2) === k ? 'var(--leaf)' : 'var(--ink-3)') + '">' + Array.from({ length: 5 }, (_, i) => ic('tree', 's20').replace('class="ic s20"', 'class="ic s20" style="opacity:' + (i < [1, 3, 5][k - 1] ? 1 : .22) + '"')).join('') + '</span><span class="grow"><span class="tt">' + a + '</span><br><span class="st">' + b + '</span></span></button>').join('') + '</div>' +
    '<section class="card tight"' + mk(2) + '><div class="row between"><span class="t-label">Your last spray · from your diary</span><button class="link" data-go="diary">Change</button></div><div class="row" style="margin-top:8px"><span class="tile-ic sm sky">' + ic('spray', 's18') + '</span><span class="grow"><b>3 May · Difenoconazole 25% EC</b><br><span class="t-small">Petal fall · 10 drums · both blocks</span></span></div>' +
    '<p class="t-micro" style="margin-top:8px">We did not ask you this again. It came from the spray you saved on 3 May.</p></section>' +
    '<button class="btn block" data-go="dx_result">See what it is ' + ic('chevR', 'flip') + '</button>' });

  S.dx_result = (st) => {
    const ds = dxState(st);
    const [cid, p] = ds.ranked[0];
    const c = D.conditions[cid];
    const lv = level(p);
    if (!ds.sure) {
      const body = '<section class="card lift"' + mk(1) + '><span class="t-label">Not sure yet</span><h2 class="t-big" style="margin-top:4px">We couldn\'t narrow it down</h2><p class="t-small" style="margin-top:6px">Your answers fit several problems. A photo or an expert will settle it. Don\'t spray until you know what it is.</p></section>' +
        '<section class="card"><p class="t-title">Still possible</p><div class="hr-list" style="margin-top:4px">' + ds.ranked.slice(0, 3).map(([oid, op]) => '<div class="listrow"><span class="art" style="width:44px;height:52px;flex:none">' + art(D.conditions[oid].art, 40, 50, 4) + '</span><span class="grow"><span class="tt" style="font-size:14px">' + D.conditions[oid].name + '</span><br><span class="st">' + D.conditions[oid].season + '</span></span><span class="pc t-micro">' + Math.round(op * 100) + '%</span></div>').join('') + '</div></section>' +
        '<div class="grid2"' + mk(2) + '><button class="btn" data-go="dx_photo">' + ic('camera', 's18') + ' Photo check</button><button class="btn ghost" data-go="dx_expert">' + ic('phone', 's18') + ' Ask an expert</button></div>';
      return frame(st, { id: 'dx_result', back: true, title: 'Orchard Doctor', sub: 'Result', body });
    }
    const why = ds.supports.map(([q, a]) => [a, WHY[q]]).filter(x => x[1]);
    const prods = c.products.map(id => [id, D.products[id]]).filter(x => x[1]);
    const body =
      '<section class="card lift"' + mk(1) + '><div class="row top" style="gap:14px"><div class="art" style="width:92px;height:112px;flex:none">' + art(c.art, 84, 108, 9) + '</div><div class="grow stack g6"><span class="t-label">Most likely</span><h2 class="t-big">' + c.name + '</h2><span class="t-micro"><i>' + c.sci + '</i> · ' + c.kind + '</span><span>' + pillFor(lv[1], lv[0] + ' · ' + Math.round(p * 100) + '%') + '</span></div></div>' +
      (why.length ? '<div class="divider" style="margin:12px 0 10px"></div><p class="t-label">Why we think so</p><div class="stack g6" style="margin-top:6px">' + why.map(([a, y]) => '<div class="row" style="gap:8px"><span class="' + (a === 'yes' ? 'c-good' : 'faint') + '">' + ic(a === 'yes' ? 'check' : 'x', 's18') + '</span><span class="t-small" style="color:var(--ink)">' + (a === 'yes' ? y : 'Not seen: ' + y.charAt(0).toLowerCase() + y.slice(1)) + '</span></div>').join('') + '</div>' : '') + '</section>' +
      (cid === 'scab' ? '<div class="banner risk"' + mk(2) + '>' + ic('alert', 's20') + '<span><b>Act before Wednesday\'s rain.</b> SKUAST-K advises spraying before rain at every stage; rain on young leaves and fruit now can start a severe infection.</span></div>' : '') +
      '<section class="card"' + mk(3) + '><p class="t-title">What to do now</p><ol class="stack g6" style="margin:8px 0 0;padding-inline-start:20px">' + c.now.map(x => '<li class="t-small" style="color:var(--ink)">' + x + '</li>').join('') + '</ol></section>' +
      (prods.length ? '<section class="card"' + mk(4) + '><div class="row between"><p class="t-title">Sprays that fit now</p><span class="tag">SKUAST-K 2026</span></div><div class="hr-list" style="margin-top:6px">' + prods.map(([id, pr]) => '<div class="listrow"><span style="flex:none">' + A.pack(pr.pack[0], pr.pack[1], pr.pack[2], 34, 42) + '</span><span class="grow"><span class="tt" style="font-size:14px">' + pr.name + '</span><br><span class="st">' + pr.group + (pr.dose ? ' · ' + pr.dose + ' ' + pr.doseUnit + ' per 100 L' : '') + (pr.lastUsed ? ' · used last time' : '') + '</span></span><button class="btn xs soft" data-go="product" data-pid="' + id + '">' + money(pr.price) + '</button></div>').join('') + '</div><p class="t-micro" style="margin-top:6px">Choose one. Always read the label. Doses from the SKUAST-K 2026 management guide.</p></section>' : '') +
      '<section class="card"><p class="t-title">Stop it next season</p><ul class="stack g6" style="margin:8px 0 0;padding-inline-start:20px">' + c.prevent.map(x => '<li class="t-small" style="color:var(--ink)">' + x + '</li>').join('') + '</ul></section>' +
      (c.also.length ? '<section class="card"><p class="t-title">Could also be</p><div class="hr-list" style="margin-top:4px">' + c.also.map(([oid, hint]) => '<div class="listrow"><span class="art" style="width:44px;height:52px;flex:none">' + art(D.conditions[oid].art, 40, 50, 4) + '</span><span class="grow"><span class="tt" style="font-size:14px">' + D.conditions[oid].name + '</span><br><span class="st">' + hint + '</span></span></div>').join('') + '</div></section>' : '') +
      '<div class="grid2"' + mk(5) + '><button class="btn ghost" data-go="dx_expert">' + ic('phone', 's18') + ' Ask an expert</button><button class="btn" data-act="save-diary">' + ic('file', 's18') + ' Save to diary</button></div>' +
      '<div class="row between card tight"><span class="t-small">Was this answer right?</span><span class="row" style="gap:6px"><button class="chip" data-act="feedback">' + ic('check') + 'Yes</button><button class="chip" data-act="feedback">' + ic('x') + 'No</button></span></div>';
    return frame(st, { id: 'dx_result', back: true, title: 'Orchard Doctor', sub: 'Result', body });
  };

  S.dx_photo = (st) => {
    const answered = st.dx && st.dx.area && Object.keys(st.dx.answers || {}).length > 0;
    const ds = answered ? dxState(st) : null;
    const agrees = ds && ds.ranked[0][0] === 'scab';
    const msg = agrees ? 'This agrees with your answers. The expert team reviews low-confidence photos.' : answered ? 'Your answers point elsewhere, so an expert will look at both.' : 'Answer two quick questions to confirm.';
    const body = '<div style="position:relative;flex:1;min-height:430px;border-radius:22px;overflow:hidden;background:radial-gradient(circle at 50% 40%,#3B5B33,#16241A 70%)"' + mk(1) + '>' +
      '<div style="position:absolute;inset:0;display:grid;place-items:center">' + A.leaf('scab', 210, 290, 12) + '</div>' +
      '<div style="position:absolute;inset:34px 36px 70px;border:2.5px dashed rgba(255,255,255,.85);border-radius:26px"></div>' +
      '<div style="position:absolute;left:0;right:0;top:12px;text-align:center;color:#fff;font-weight:700;font-size:14px">Hold one leaf flat, in daylight</div>' +
      '<div class="card" style="position:absolute;left:12px;right:12px;bottom:12px;padding:12px"' + mk(2) + '><div class="row between"><span class="t-label">Photo check · beta</span>' + pillFor('good', '87% match') + '</div><p class="t-title" style="margin-top:4px">Looks like apple scab</p><p class="t-small">' + msg + '</p>' + (answered ? '' : '<button class="btn sm" style="margin-top:8px" data-area="leaves">Confirm with questions</button>') + '</div></div>' +
      '<div class="row" style="justify-content:space-around;padding:6px 0 2px"><span class="iconbtn" style="color:#fff" aria-hidden="true">' + ic('grid') + '</span><button aria-label="Take photo" style="width:70px;height:70px;border-radius:50%;border:5px solid #fff;background:rgba(255,255,255,.25)"></button><span class="iconbtn" style="color:#fff" aria-hidden="true">' + ic('sparkle') + '</span></div>';
    return frame(st, { id: 'dx_photo', cls: 'cam', darkbar: true, appbar: '<header class="ab" style="color:#fff"><button class="iconbtn" data-back style="color:#fff" aria-label="Back">' + ic('x') + '</button><h1>Photo check</h1></header>', body });
  };

  S.dx_expert = (st) => {
    let caseArt = A.leaf('healthy', 52, 66, 12), caseText = '<b>No diagnosis yet</b><br>Add photos and a voice note; the expert will ask what they need.';
    if (st.dx && st.dx.area) {
      const ds = dxState(st), [cid, p] = ds.ranked[0], c = D.conditions[cid];
      caseArt = art(c.art, 52, 66, 12);
      caseText = '<b>' + c.name.replace(/ \(.*\)/, '') + '?</b> ' + level(p)[0] + '<br>' + D.areas.find(a => a.id === ds.area).name + ' · ' + SEV[st.dx.sev || 2] + ' · ' + ds.nAns + ' answers · last spray 3 May';
    }
    return frame(st, { id: 'dx_expert', back: true, title: 'Ask an expert', sub: 'Your case is ready to send', body:
      '<section class="card"' + mk(1) + '><p class="t-label">Your case</p><div class="row" style="margin-top:8px;gap:10px"><span class="art" style="width:58px;height:70px;flex:none">' + caseArt + '</span><span class="art" style="width:58px;height:70px;flex:none;color:var(--ink-3)">' + ic('camera', 's26') + '</span><span class="grow t-small" style="color:var(--ink)">' + caseText + '</span></div></section>' +
      '<section class="card tight"' + mk(2) + '><div class="row"><button class="tile-ic apple" aria-label="Record voice note">' + ic('mic') + '</button><span class="grow"><b>Voice note</b><br><span class="t-small">Speak in Kashmiri · 0:18 recorded</span></span><span style="display:flex;gap:2px;align-items:center;height:28px" aria-hidden="true">' + [8, 16, 11, 22, 14, 26, 10, 18, 24, 12, 20, 9].map(h => '<i style="width:3px;height:' + h + 'px;border-radius:2px;background:var(--leaf)"></i>').join('') + '</span></div></section>' +
      '<p class="t-label">Who should answer?</p><div class="stack"' + mk(3) + '>' + [['Crop doctor on Baghbaan', 'Free · replies in about 2 hours (8 AM–6 PM)', 'cap', 0], ['University / KVK scientist', 'Free · when available, for hard cases', 'beaker', 1], ['Field visit by an expert', '₹300 · tomorrow morning', 'pin', 2]].map(([a, b, i, k]) => { const on = (st.who || 0) === k; return '<button class="opt ' + (on ? 'on' : '') + '" data-who="' + k + '" aria-pressed="' + on + '"><span class="tile-ic sm ' + (on ? 'leaf' : 'plain') + '">' + ic(i, 's18') + '</span><span class="grow"><span class="tt">' + a + '</span><br><span class="st">' + b + '</span></span></button>'; }).join('') + '</div>' +
      '<p class="t-micro row" style="gap:6px">' + ic('lock', 's16') + 'Only the expert sees your photos and phone number.</p>' +
      '<button class="btn block" data-act="send-expert">' + ic('send', 's18') + ' Send to expert</button>' });
  };

  /* ---------- Buy ---------- */
  const cartOf = (st) => st.cart || Object.fromEntries(D.kit);
  const cartLines = (st) => Object.entries(cartOf(st)).filter(([id, q]) => q > 0 && D.products[id]);
  const cartSum = (st) => cartLines(st).reduce((a, [id, q]) => [a[0] + D.products[id].price * q, a[1] + (D.products[id].mrp - D.products[id].price) * q], [0, 0]);
  const fmtAmt = (v, u) => u === 'g' ? (v >= 1000 ? +(v / 1000).toFixed(2) + ' kg' : v + ' g') : u === 'ml' ? (v >= 1000 ? +(v / 1000).toFixed(2) + ' L' : v + ' ml') : v + ' ' + u;
  function need(p) { if (!p.dose) return null; const perDrum = p.dose * 2, total = perDrum * D.drums; return { perDrum, total, packs: p.amt ? Math.ceil(total / p.amt) : null }; }
  const brandsOf = (p) => p.brands || (['fung', 'mite', 'oil', 'insect'].includes(p.cat) ? [['Brand A', p.price], ['Brand B', Math.round(p.price * 1.05 / 5) * 5], ['Brand C', Math.round(p.price * 1.1 / 5) * 5]] : [['Licensed dealer, Shopian', p.price]]);
  const cartBtn = (st) => '<button class="iconbtn" data-go="cart" aria-label="Cart, ' + cartLines(st).length + ' items">' + ic('cart') + '<span class="dot" style="width:16px;height:16px;top:4px;right:4px;font:800 10px/16px var(--f-body);color:var(--on-apple);text-align:center" aria-hidden="true">' + cartLines(st).length + '</span></button>';
  S.shop = (st) => {
    const kitSum = D.kit.reduce((a, [id, q]) => a + D.products[id].price * q, 0);
    return frame(st, { id: 'shop', tab: 'shop', title: 'Buy', sub: 'Licensed dealers near Shopian', right: cartBtn(st), body:
    '<div class="search"' + mk(1) + '>' + ic('search', 's20') + '<span class="grow">Medicine, fertilizer, tool…</span><button class="mic" style="background:var(--card-2);color:var(--ink-2)" data-go="verify" aria-label="Scan a pack">' + ic('scan', 's18') + '</button><span class="mic" aria-hidden="true">' + ic('mic', 's18') + '</span></div>' +
    '<button class="card" style="background:var(--leaf-soft);border-color:transparent;text-align:start"' + mk(2) + ' data-act="kit"><div class="row top"><div class="grow stack g6"><span class="t-label" style="color:var(--leaf)">Made for your orchard</span><p class="t-title">Fruitlet spray kit</p><p class="t-small">Scab spray before Wednesday\'s rain, sized for 25 kanal (about 10 drums). Rotates away from Difenoconazole used on 3 May.</p><span class="row" style="gap:8px;margin-top:4px"><b class="t-title num">' + money(kitSum) + '</b><span class="pill leaf">' + D.kit.length + ' items</span></span></div><div style="display:flex;margin-top:4px">' + D.kit.map(([id]) => A.pack(D.products[id].pack[0], D.products[id].pack[1], D.products[id].pack[2], 40, 52)).join('') + '</div></div></button>' +
    '<div class="row" style="justify-content:space-between;gap:6px"' + mk(3) + '>' + [['shield', 'Licensed dealers only'], ['scan', 'Genuine-pack check'], ['file', 'Bill with every order']].map(([i, x]) => '<span class="row t-micro" style="gap:5px;color:var(--ink-2);font-weight:600">' + ic(i, 's16 c-leaf') + x + '</span>').join('') + '</div>' +
    '<div class="sec-h"><h2>Shop by need</h2></div><div class="grid4">' + D.cats.map(([id, n, i]) => '<button class="cat" data-go="shop_list"><span class="tile-ic sm leaf">' + ic(i, 's18') + '</span>' + n + '</button>').join('') + '</div>' +
    '<div class="sec-h"><h2>Bought near you this week</h2></div><div class="card tight hr-list">' + ['hmo', 'hexy', 'calcium'].map(id => { const p = D.products[id]; return '<button class="listrow" data-go="product" data-pid="' + id + '">' + A.pack(p.pack[0], p.pack[1], p.pack[2], 34, 42) + '<span class="grow"><span class="tt" style="font-size:14px">' + p.name + '</span><br><span class="st">' + p.size + ' · ' + stars(p.rating) + ' ' + p.n + '</span></span><b class="num">' + money(p.price) + '</b></button>'; }).join('') + '</div>' });
  };

  function prodCard(id) {
    const p = D.products[id];
    return '<button class="card tight prod" data-go="product" data-pid="' + id + '" style="text-align:start' + (p.lastUsed ? ';border-style:dashed' : '') + '"><span class="pack">' + A.pack(p.pack[0], p.pack[1], p.pack[2], 50, 62) + '</span><span class="stack g6" style="min-width:0"><span class="nm">' + p.name + '</span><span class="meta">' + p.for + '</span>' +
      '<span class="tagrow" style="margin-top:0"><span class="tag frac">' + p.group + '</span><span class="tag ok">' + ic('check', 's16').replace('class="ic s16"', 'class="ic" style="width:10px;height:10px;stroke-width:3"') + ' Label: ' + p.claim + '</span>' + (p.lastUsed ? '<span class="tag" style="background:var(--warn-soft);color:var(--warn);border-color:transparent">Used last time</span>' : '') + '</span>' +
      '<span class="row between"><span><span class="price num">' + money(p.price) + '</span><span class="mrp num">' + money(p.mrp) + '</span><span class="t-micro"> · ' + p.size + '</span></span><span class="t-micro">' + stars(p.rating) + ' ' + p.n + '</span></span></span></button>';
  }
  S.shop_list = (st) => frame(st, { id: 'shop_list', back: true, title: 'Fungicides', sub: 'For apple scab · fruitlet stage', right: cartBtn(st), body:
    '<div class="chips scroll"' + mk(1) + '><span class="chip on">' + ic('x') + 'Apple scab</span><span class="chip on">Fruitlet</span><span class="chip">Organic</span><span class="chip">' + ic('sliders') + 'Price</span></div>' +
    '<div class="banner warn"' + mk(2) + '>' + ic('layers', 's20') + '<span><b>Rotate.</b> You sprayed Difenoconazole (group 3) on 3 May. SKUAST-K says never use the same pesticide in two sprays in a row.</span></div>' +
    prodCard('dodine') + prodCard('fluxpyra') + prodCard('boscalid') + prodCard('difeno') });

  S.product = (st) => {
    const id = (st.pid && D.products[st.pid]) ? st.pid : 'dodine', p = D.products[id];
    const n = need(p), brands = brandsOf(p);
    const qty = (st.qty && st.qty[id]) || (n && n.packs) || 1;
    const body =
      '<div class="art" style="height:150px;background:var(--card)">' + A.pack(p.pack[0], p.pack[1], p.pack[2], 104, 132) + '</div>' +
      '<div class="stack g6"><h2 class="t-big">' + p.name + '</h2><p class="t-small">' + p.for + '</p><div class="tagrow"' + mk(1) + '><span class="tag frac">' + p.group + '</span><span class="tag ok">Label claim: ' + p.claim + '</span><span class="tag ok">Licensed seller</span></div></div>' +
      '<section class="card tight"' + mk(2) + '><div class="row between"><span class="t-label">' + (brands.length > 1 ? 'Same medicine · ' + brands.length + ' brands' : 'Sold by') + '</span><span class="t-micro">Shopian dealers</span></div><div class="hr-list" style="margin-top:4px">' + brands.map(([b, pr], i) => '<div class="listrow" style="padding:8px 0"><span class="grow"><b>' + b + '</b> <span class="t-micro">· ' + p.size + '</span></span>' + (i === 0 && brands.length > 1 ? '<span class="pill good">Lowest</span>' : '') + '<b class="num">' + money(pr) + '</b></div>').join('') + '</div></section>' +
      (n ? '<section class="card"' + mk(3) + '><div class="row between"><p class="t-title">How much do I need?</p><span class="tile-ic sm sky">' + ic('beaker', 's18') + '</span></div>' +
        '<div class="grid2" style="margin-top:10px"><div><p class="t-micro">Your orchard</p><b>25 kanal · ~' + D.drums + ' drums</b></div><div><p class="t-micro">Dose per 100 L</p><b>' + p.dose + ' ' + p.doseUnit + '</b></div><div><p class="t-micro">Per 200 L drum</p><b>' + fmtAmt(n.perDrum, p.doseUnit) + '</b></div><div><p class="t-micro">Total to buy</p><b class="c-leaf">' + fmtAmt(n.total, p.doseUnit) + (n.packs ? ' → ' + n.packs + ' × ' + p.size : '') + '</b></div></div>' +
        '<p class="t-micro" style="margin-top:8px">Dose from the SKUAST-K 2026 management guide (per 100 L); the drum figure is ours (× 2). ' + (p.note ? p.note : 'Check the label before use.') + '</p></section>' : '') +
      '<section class="card tight"' + mk(4) + '><p class="t-label">Use safely</p><div class="row wrap" style="gap:8px;margin-top:8px">' + [['shield', 'Gloves & mask'], ['bee', 'Not during bloom'], ['clock', p.phi ? 'Wait ' + p.phi + ' days before harvest' : 'Waiting days: see label'], ['drop', 'Keep from streams']].map(([i, x]) => '<span class="chip" style="font-size:12.5px;padding:7px 10px">' + ic(i) + x + '</span>').join('') + '</div></section>' +
      '<section class="card tight"' + mk(5) + '><div class="row between"><p class="t-title">' + p.rating + ' ' + stars(p.rating) + '</p><span class="t-micro">' + p.n + ' verified buyers</span></div><div class="stack g6" style="margin-top:8px"><p class="t-small" style="color:var(--ink)">"Sprayed before the rain, no new spots after." <span class="faint">— grower, Shopian · sample review</span></p><p class="t-small" style="color:var(--ink)">"Genuine pack, the QR matched." <span class="faint">— grower, Kulgam · sample review</span></p></div></section>';
    const footer = '<div class="row" style="padding:10px 16px;padding-bottom:max(12px, env(safe-area-inset-bottom, 0px));background:var(--card);border-top:1px solid var(--line)"><div class="stepper"><button data-act="qty-" aria-label="One pack fewer">' + ic('minus') + '</button><span class="num" aria-live="polite">' + qty + '</span><button data-act="qty+" aria-label="One pack more">' + ic('plus') + '</button></div><button class="btn grow" data-act="add-cart">' + ic('cart', 's18') + ' Add · ' + money(p.price * qty) + '</button></div>';
    return frame(st, { id: 'product', back: true, title: 'Product', right: cartBtn(st), body, footer });
  };

  S.cart = (st) => {
    const lines = cartLines(st), [sum, saved] = cartSum(st);
    if (!lines.length) return frame(st, { id: 'cart', back: true, title: 'Your order', body: '<section class="card"><p class="t-title">Your order is empty</p><p class="t-small" style="margin-top:4px">Add products from Buy or from an Orchard Doctor result.</p></section><button class="btn block" data-go="shop">Go to Buy</button>' });
    return frame(st, { id: 'cart', back: true, title: 'Your order', sub: lines.length + ' item' + (lines.length === 1 ? '' : 's'), body:
    '<div class="card tight hr-list"' + mk(1) + '>' + lines.map(([id, q]) => { const p = D.products[id]; return '<div class="listrow">' + A.pack(p.pack[0], p.pack[1], p.pack[2], 34, 42) + '<span class="grow"><span class="tt" style="font-size:14px">' + p.name + '</span><br><span class="st">' + q + ' × ' + p.size + '</span></span><b class="num">' + money(p.price * q) + '</b></div>'; }).join('') + '</div>' +
    '<p class="t-label">Get it</p><div class="stack"' + mk(2) + '>' + [['Pick up from dealer', 'Licensed dealer, Shopian · 2.5 km · ready 3 PM today', 'Free', 0], ['Deliver to my village', 'Tomorrow before 11 AM', '₹40', 1]].map(([a, b, c, k]) => { const on = (st.ship || 0) === k; return '<button class="opt ' + (on ? 'on' : '') + '" data-ship="' + k + '" aria-pressed="' + on + '"><span class="tile-ic sm ' + (on ? 'leaf' : 'plain') + '">' + ic(k ? 'truck' : 'pin', 's18') + '</span><span class="grow"><span class="tt">' + a + '</span><br><span class="st">' + b + '</span></span><b>' + c + '</b></button>'; }).join('') + '</div>' +
    '<p class="t-label">Pay</p><div class="stack"' + mk(3) + '>' + [['UPI', 'Any UPI app', 'wallet', 0], ['Cash at pickup', 'Pay the dealer', 'coin', 1], ['Pay after harvest', 'Partner credit, linked to your KCC · approval in minutes', 'handcoins', 2]].map(([a, b, i, k]) => { const on = (st.pay == null ? 1 : st.pay) === k; return '<button class="opt ' + (on ? 'on' : '') + '" data-pay="' + k + '" aria-pressed="' + on + '"><span class="tile-ic sm ' + (on ? 'leaf' : 'plain') + '">' + ic(i, 's18') + '</span><span class="grow"><span class="tt">' + a + '</span><br><span class="st">' + b + '</span></span></button>'; }).join('') + '</div>' +
    '<div class="card tight stack g6 num"><div class="row between t-small"><span>Items</span><span>' + money(sum) + '</span></div><div class="row between t-small"><span>Saved vs MRP</span><span class="c-good">− ' + money(saved) + '</span></div><div class="row between t-small"><span>Delivery</span><span>' + ((st.ship || 0) === 1 ? '₹40' : 'Free') + '</span></div><div class="row between"><b>Total</b><b class="t-title">' + money(sum + ((st.ship || 0) === 1 ? 40 : 0)) + '</b></div><p class="t-micro">GST bill from the licensed dealer comes with your order.</p></div>' +
    '<button class="btn block" data-act="place-order">Place order</button>' });
  };

  S.verify = (st) => frame(st, { id: 'verify', back: true, title: 'Genuine-pack check', body:
    '<div style="position:relative;height:200px;border-radius:20px;overflow:hidden;background:#17201B;display:grid;place-items:center"' + mk(1) + '>' + A.pack('pouch', '#2E6FA3', 'DODINE|65% WP', 120, 150) + '<div style="position:absolute;inset:40px 90px;border:3px solid #6EE7A8;border-radius:16px"></div><span style="position:absolute;bottom:10px;color:#fff;font-size:13px;font-weight:700">Point at the QR code on the pack</span></div>' +
    '<section class="card"' + mk(2) + '><div class="row"><span class="tile-ic leaf">' + ic('shield', 's26') + '</span><span class="grow"><span class="t-label" style="color:var(--good)">Genuine pack</span><p class="t-title">Dodine 65% WP · Brand A</p></span></div>' +
    '<div class="grid2" style="margin-top:12px">' + [['Batch', 'D-26-0412'], ['Made', 'Mar 2026'], ['Use before', 'Feb 2028'], ['Registered for apple', 'Yes']].map(([a, b]) => '<div><p class="t-micro">' + a + '</p><b>' + b + '</b></div>').join('') + '</div></section>' +
    '<div class="banner info">' + ic('info', 's18') + '<span>If a pack fails the check, do not use it. Report it here and we alert the Agriculture department and your dealer.</span></div>' +
    '<button class="btn block ghost">' + ic('alert', 's18') + ' Report a fake pack</button>' });

  /* ---------- Learn ---------- */
  S.learn = (st) => frame(st, { id: 'learn', tab: 'learn', title: 'Learn', sub: 'Short lessons · Kashmiri audio · offline', right: '<button class="iconbtn" aria-label="Search">' + ic('search') + '</button>', body:
    '<button class="card lift" data-go="lesson" style="text-align:start"' + mk(1) + '><div class="row"><span class="tile-ic chinar">' + ic('scissors', 's26') + '</span><span class="grow"><span class="t-label">Continue</span><p class="t-title">Pruning for better colour</p><span class="t-small">Lesson 3 of 6 · 4 min</span></span>' + ic('play', 's26 c-leaf') + '</div><div class="meter" style="margin-top:10px"><i style="width:45%"></i></div></button>' +
    '<div class="sec-h"><h2>For this season · May</h2></div><div class="chips scroll"' + mk(2) + '>' + [['Thinning: how many fruit to keep', 'apple'], ['The 20-leaf mite check', 'bug'], ['Spraying safely near bees', 'bee']].map(([x, i]) => '<button class="card tight" data-go="lesson" style="flex:none;width:180px;text-align:start"><span class="tile-ic sm leaf">' + ic(i, 's18') + '</span><p class="t-small" style="color:var(--ink);font-weight:700;margin-top:8px">' + x + '</p><span class="t-micro">3 min · video</span></button>').join('') + '</div>' +
    '<div class="sec-h"><h2>All topics</h2></div><div class="grid3"' + mk(3) + '>' + D.topics.map(([n, i, c], k) => '<button class="cat" data-go="' + (k === 0 ? 'calendar' : k === 5 ? 'library' : 'lesson') + '"><span class="tile-ic sm ' + (k % 3 === 0 ? 'leaf' : k % 3 === 1 ? 'chinar' : 'sky') + '">' + ic(i, 's18') + '</span>' + n + '<span class="t-micro">' + c + ' lessons</span></button>').join('') + '</div>' +
    '<div class="banner good">' + ic('download', 's18') + '<span>18 lessons saved on this phone. They play without internet.</span></div>' });

  S.lesson = (st) => frame(st, { id: 'lesson', back: true, title: 'Soil & manure', sub: 'Lesson 2 · 3 min 20 s', body:
    '<div class="fluid" style="position:relative;height:170px;border-radius:18px;overflow:hidden"' + mk(1) + '>' + A.orchardScene(330, 170) + '<div style="position:absolute;inset:0;background:linear-gradient(transparent 40%,rgba(10,20,14,.75))"></div><span style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:58px;height:58px;border-radius:50%;background:rgba(255,255,255,.92);display:grid;place-items:center;color:#134F33">' + ic('play', 's26') + '</span><span style="position:absolute;left:14px;bottom:10px;color:#fff;font-weight:700;font-size:14px">' + ic('headphones', 's16') + ' Kashmiri audio · 3:20</span></div>' +
    '<h2 class="t-big">How to take a soil sample</h2><p class="t-small" style="margin-top:-6px">A soil test tells you exactly which fertilizer your trees need, so you stop paying for what they don\'t.</p>' +
    '<div class="stack"' + mk(2) + '>' + [['Sample before manure', 'Take samples after harvest or in early spring, before you add manure or fertilizer.'], ['Many spots, two depths', 'Under 8–10 trees across the block, at the outer edge of the canopy, dig to 0–30 cm and 30–60 cm.'], ['Mix and take half a kilo', 'Mix each depth separately in a clean bucket. Remove stones and roots.'], ['Dry, pack, label', 'Dry in shade. Pack in a cloth bag with your name, village, block and date.']].map(([a, b], i) => '<div class="card tight row top"><span class="tile-ic sm leaf" style="font:800 16px var(--f-display)">' + (i + 1) + '</span><span class="grow"><b>' + a + '</b><br><span class="t-small">' + b + '</span></span></div>').join('') + '</div>' +
    '<button class="btn block" data-go="services">' + ic('beaker', 's18') + ' Book soil test pickup</button>' +
    '<section class="card"' + mk(3) + '><p class="t-label">Quick check</p><p class="t-title" style="margin-top:4px">When should you take the sample?</p><div class="stack g6" style="margin-top:10px"><button class="opt"><span class="grow">Right after adding manure</span></button><button class="opt on"><span class="grow"><b>Before manure and fertilizer</b></span>' + ic('check', 'c-leaf') + '</button></div></section>' });

  S.library = (st) => frame(st, { id: 'library', back: true, title: 'Pests & diseases', sub: '' + D.library.length + ' common problems · tap for details', body:
    '<div class="search">' + ic('search', 's20') + '<span class="grow">Search by name or symptom</span><span class="mic">' + ic('mic', 's18') + '</span></div>' +
    '<div class="chips scroll"><span class="chip on">All</span><span class="chip">Leaves</span><span class="chip">Fruit</span><span class="chip">Bark</span><span class="chip">Roots</span><span class="chip">In season now</span></div>' +
    '<div class="card tight hr-list"' + mk(1) + '>' + D.library.map(([cid, n, where, when, lv]) => '<div class="listrow"><span class="art" style="width:52px;height:56px;flex:none">' + art(D.conditions[cid].art, 46, 52, 6) + '</span><span class="grow"><span class="tt" style="font-size:14.5px">' + n + '</span><br><span class="st">' + where + '</span></span><span class="pill ' + lv + '">' + when + '</span></div>').join('') + '</div>' });

  S.calendar = (st) => frame(st, { id: 'calendar', back: true, title: 'Orchard year', sub: 'For higher belts of South Kashmir', body:
    '<div class="tl"' + mk(1) + '>' + D.calendar.map(([m, s, tasks], i) => '<div class="it ' + (i < 3 ? 'done' : i === 3 ? 'now' : '') + '"><span class="bul">' + (i < 3 ? ic('check') : i === 3 ? ic('target') : '') + '</span><div class="card tight" style="' + (i === 3 ? 'border-color:var(--leaf);box-shadow:0 0 0 1px var(--leaf)' : '') + '"><div class="row between"><b>' + m + '</b><span class="t-micro">' + s + '</span></div><ul style="margin:6px 0 0;padding-inline-start:18px" class="t-small">' + tasks.map(x => '<li>' + x + '</li>').join('') + '</ul></div></div>').join('') + '</div>' });

  /* ---------- Mandi & news ---------- */
  function seg(cur) {
    return '<div class="chips scroll" role="tablist">' + [['mandi', 'Prices', 'chart'], ['roads', 'Roads', 'road'], ['weather', 'Weather', 'cloudsun'], ['news', 'News', 'news']].map(([id, n, i]) => '<button class="chip ' + (cur === id ? 'on' : '') + '" data-go="' + id + '" role="tab" aria-selected="' + (cur === id) + '">' + ic(i) + n + '</button>').join('') + '</div>';
  }
  S.mandi = (st) => frame(st, { id: 'mandi', tab: 'mandi', title: 'Mandi & news', sub: 'Sample rates · updated 7:30 AM', body:
    seg('mandi') +
    '<div class="row between"' + mk(1) + '><div class="chips"><span class="chip on">Delicious</span><span class="chip">American</span><span class="chip">Maharaji</span></div></div>' +
    '<section class="card"' + mk(2) + '><div class="row between"><span class="t-label">Sopore · A grade · CA</span><span class="pill good">' + ic('trendUp') + '+10% in 30 days</span></div><div class="row" style="align-items:baseline;gap:8px;margin:6px 0 4px"><span class="t-huge num">₹92</span><span class="t-small">per kg · about ' + money(92 * 16) + ' per 16 kg box</span></div>' +
    '<div style="position:relative" class="chartwrap">' + A.lineChart(D.trend, { w: 320, h: 120, step: 2, fmt: v => '₹' + v, xlabels: [[0, '13 Apr'], [14, '27 Apr'], [29, '12 May']], label: 'Sopore Delicious A price, last 30 days' }) + '</div></section>' +
    '<section class="card tight"' + mk(3) + '><table class="ptable"><thead><tr><th>Mandi</th><th>₹ / kg</th><th>Week</th></tr></thead><tbody>' + D.mandis.map(([m, s, v, c]) => '<tr><td>' + m + '<span class="sub">' + s + '</span></td><td>' + v + '</td><td class="' + (c >= 0 ? 'up' : 'down') + '">' + (c >= 0 ? '▲ ' : '▼ ') + Math.abs(c) + '%</td></tr>').join('') + '</tbody></table></section>' +
    '<div class="grid2"' + mk(4) + '><button class="btn" data-go="sell">' + ic('route', 's18') + ' Where to sell?</button><button class="btn ghost">' + ic('bell', 's18') + ' Price alert</button></div>' });

  S.sell = (st) => {
    const max = Math.max(...D.sell.map(r => r[1]));
    return frame(st, { id: 'sell', back: true, title: 'Where should I sell?', sub: 'Money in hand per box, after costs', body:
      '<section class="card tight"' + mk(1) + '><div class="grid3">' + [['Load', '600 boxes'], ['Variety', 'Delicious A'], ['From', 'Wachi']].map(([a, b]) => '<div><p class="t-micro">' + a + '</p><b>' + b + '</b></div>').join('') + '</div></section>' +
      '<section class="card"' + mk(2) + '><p class="t-label" style="margin-bottom:10px">Net ₹ per box · after freight, commission & unloading</p><div class="stack g6">' + D.sell.map(([m, v, note], i) => '<div class="hbar"><span style="font-weight:700;font-size:12.5px;line-height:1.2">' + m + '</span><span class="trk"><i class="' + (i === 0 ? 'best' : 'other') + '" style="width:' + Math.round((v - 1150) / (max - 1150) * 100) + '%"></i></span><span class="v">' + money(v) + '</span></div><div class="t-micro" style="margin:-4px 0 4px;padding-inline-start:100px">' + note + '</div>').join('') + '</div><p class="t-micro" style="margin-top:6px">Bars start at ₹1,150 to show the differences.</p></section>' +
      '<div class="banner good"' + mk(3) + '>' + ic('trendUp', 's18') + '<span><b>Azadpur pays about ₹175 more per box</b> than Sopore today, even after ₹95 freight. Prices can move in the 2 days on the road.</span></div>' +
      '<div class="grid2"><button class="btn" data-go="truck">' + ic('truck', 's18') + ' Book a truck</button><button class="btn ghost" data-go="roads">' + ic('road', 's18') + ' Check highway</button></div>' });
  };

  S.roads = (st) => frame(st, { id: 'roads', tab: 'mandi', title: 'Mandi & news', sub: 'Roads & transport', body:
    seg('roads') +
    '<section class="card"' + mk(1) + '><div class="row between"><span class="row" style="gap:8px"><span class="tile-ic sm leaf">' + ic('road', 's18') + '</span><b>NH-44 Srinagar–Jammu</b></span>' + pillFor('good', 'Open') + '</div><div class="stack g6" style="margin-top:10px"><div class="row t-small" style="gap:8px">' + ic('truck', 's18 c-leaf') + '<span>Trucks allowed <b>Srinagar → Jammu</b> today</span></div><div class="row t-small" style="gap:8px">' + ic('clock', 's18 c-warn') + '<span>Slow near Ramban: one-lane stretch</span></div><div class="row t-small" style="gap:8px">' + ic('users', 's18') + '<span>Cars both ways</span></div></div><p class="t-micro" style="margin-top:8px">Source: traffic police advisory, 7:10 AM (sample)</p></section>' +
    '<section class="card tight row"' + mk(2) + '><span class="tile-ic sm chinar">' + ic('mountain', 's18') + '</span><span class="grow"><b>Mughal Road</b><br><span class="t-small">Open for light vehicles only</span></span>' + pillFor('warn', 'Limited') + '</section>' +
    '<section class="card tight row"' + mk(3) + '><span class="tile-ic sm sky">' + ic('train', 's18') + '</span><span class="grow"><b>Rail parcel to Delhi</b><br><span class="t-small">Budgam → Delhi parcel van, about ₹2.4/kg · next 6:40 PM (sample)</span></span>' + ic('chevR', 'chev flip') + '</section>' +
    '<section class="card tight row"' + mk(4) + '><span class="tile-ic sm apple">' + ic('bell', 's18') + '</span><span class="grow"><b>Tell me when it changes</b><br><span class="t-small">Alert by app, SMS or voice call</span></span><button type="button" class="toggle ' + (tog(st, 'road', true) ? 'on' : '') + '" role="switch" data-tog="road" aria-checked="' + tog(st, 'road', true) + '" aria-label="Tell me when highway status changes"></button></section>' +
    '<section class="card tight"><p class="t-label">Reported by drivers · last 2 h</p><div class="stack g6" style="margin-top:8px"><div class="row t-small" style="gap:8px">' + ic('alert', 's18 c-warn') + '<span>Queue of fruit trucks at Qazigund, about 40 min wait</span></div><div class="row t-small" style="gap:8px">' + ic('check', 's18 c-good') + '<span>Banihal tunnel moving normally</span></div></div></section>' });

  S.weather = (st) => frame(st, { id: 'weather', tab: 'mandi', title: 'Mandi & news', sub: 'Weather · Wachi', body:
    seg('weather') +
    '<section class="card tight"' + mk(1) + '><div class="wx">' + D.weather.map(([d, i, hi, lo, r], k) => '<div class="' + (k === 0 ? 'now' : '') + '"><span class="d">' + d + '</span>' + ic(i) + '<b class="num">' + hi + '°</b><span class="t-micro num">' + lo + '°</span><span class="rain num">' + (r ? r + ' mm' : '&nbsp;') + '</span></div>').join('') + '</div></section>' +
    '<section class="card"' + mk(2) + '><div class="row between"><p class="t-title">Best time to spray today</p>' + pillFor('good', 'Good') + '</div><p class="t-huge" style="margin:6px 0 2px">4 – 7 PM</p><div class="row wrap" style="gap:6px;margin-top:6px"><span class="chip">' + ic('wind') + 'Wind 6 km/h</span><span class="chip">' + ic('drop') + 'No rain for 20 h</span><span class="chip">' + ic('thermo') + '12–19 °C</span></div></section>' +
    '<section class="card"' + mk(3) + '><p class="t-title">Disease & pest risk · next 3 days</p><div class="stack" style="margin-top:10px">' + [['Apple scab', 'risk', 'High · Wed', 92], ['Powdery mildew', 'warn', 'Medium', 50], ['Red spider mite', 'good', 'Low', 18]].map(([n, lv, tx, w]) => '<div><div class="row between t-small" style="margin-bottom:4px"><b style="color:var(--ink)">' + n + '</b><span class="pill ' + lv + '">' + tx + '</span></div><div class="meter ' + (lv === 'good' ? '' : lv) + '"><i style="width:' + w + '%"></i></div></div>').join('') + '</div><p class="t-micro" style="margin-top:8px">From rain, leaf wetness and temperature (scab infection model).</p></section>' +
    '<div class="banner warn"' + mk(4) + '>' + ic('hail', 's20') + '<span><b>Hail possible Monday evening.</b> Keep anti-hail nets closed from Sunday night.</span></div>' });

  S.news = (st) => frame(st, { id: 'news', tab: 'mandi', title: 'Mandi & news', sub: 'Sample headlines', body:
    seg('news') + '<div class="chips scroll"><span class="chip on">All</span><span class="chip">Advisories</span><span class="chip">Schemes</span><span class="chip">Market</span><span class="chip">Roads</span></div>' +
    '<div class="stack"' + mk(1) + '>' + D.news.map(([tag, h, src, lv]) => '<article class="card tight"><div class="row between"><span class="pill ' + lv + '">' + tag + '</span><span class="iconbtn" style="width:32px;height:32px;color:var(--ink-3)" aria-label="Listen">' + ic('speaker', 's18') + '</span></div><p class="t-title" style="margin-top:6px;font-size:15.5px">' + h + '</p><p class="t-micro" style="margin-top:4px">' + src + '</p></article>').join('') + '</div>' });

  /* ---------- Services ---------- */
  S.services = (st) => frame(st, { id: 'services', tab: 'services', title: 'Services', sub: 'Book help for your orchard', body:
    '<div class="search">' + ic('search', 's20') + '<span class="grow">Truck, labour, expert…</span><span class="mic">' + ic('mic', 's18') + '</span></div>' +
    '<div class="grid3"' + mk(1) + '>' + D.services.map(([id, n, i, c]) => '<button class="cat" ' + ({ truck: 'data-go="truck"', labour: 'data-go="labour"', spray: 'data-go="labour"', expert: 'data-go="dx_expert"', soil: 'data-go="lesson"', buyers: 'data-go="sell"' }[id] || 'data-act="soon"') + '><span class="tile-ic ' + c + '">' + ic(i) + '</span>' + n + '</button>').join('') + '</div>' +
    '<div class="sec-h"><h2>Your bookings</h2></div><button class="card tight row" data-go="booking"' + mk(2) + '><span class="tile-ic sky">' + ic('truck') + '</span><span class="grow"><b>Truck to Azadpur</b><br><span class="t-small">Thu 14 May · 600 boxes · Bilal Ahmad</span></span>' + pillFor('good', 'Confirmed') + '</button>' +
    '<button class="card tight row" data-go="booking"><span class="tile-ic leaf">' + ic('spray') + '</span><span class="grow"><b>Spray team (4)</b><br><span class="t-small">Today · 4 PM · Ali Mohammad</span></span>' + pillFor('info', 'Today') + '</button>' +
    '<div class="banner good"' + mk(3) + '>' + ic('shield', 's18') + '<span>Every provider is ID-checked and rated by growers. Pay after the work is done.</span></div>' });

  S.labour = (st) => frame(st, { id: 'labour', back: true, title: 'Book a team', sub: 'Shopian · within 10 km', body:
    '<div class="chips scroll"' + mk(1) + '>' + ['Spraying', 'Pruning', 'Thinning', 'Harvest', 'Grading & packing'].map((x, i) => '<span class="chip ' + (i === 0 ? 'on' : '') + '">' + x + '</span>').join('') + '</div>' +
    '<section class="card tight"' + mk(2) + '><div class="grid3"><div><p class="t-micro">Date</p><b>Today</b></div><div><p class="t-micro">Start</p><b>4:00 PM</b></div><div><p class="t-micro">People</p><b>4</b></div></div><div class="divider" style="margin:10px 0"></div><div class="row t-small" style="gap:8px">' + ic('coin', 's18 c-leaf') + '<span>Usual rate in Shopian: <b>₹650–800 a day</b> per person (sample)</span></div></section>' +
    '<div class="stack"' + mk(3) + '>' + D.teams.map((tm, i) => '<section class="card tight"><div class="row top"><span class="tile-ic ' + (i === 0 ? 'leaf' : 'plain') + '" style="font:800 15px var(--f-display)">' + tm.name.split(' ').map(w => w[0]).slice(0, 2).join('') + '</span><span class="grow"><b>' + tm.name + '</b><br><span class="t-small">' + tm.size + ' people · ' + tm.dist + ' · ' + tm.langs + '</span><br><span class="t-micro">' + stars(tm.rating) + ' ' + tm.rating + ' · ' + tm.jobs + ' jobs</span></span><span style="text-align:end"><b class="num">' + money(tm.rate) + '</b><br><span class="t-micro">per person / day</span></span></div><div class="row between" style="margin-top:10px"><span class="tagrow" style="margin:0">' + tm.tags.map(x => '<span class="tag ok">' + x + '</span>').join('') + '</span><button class="btn xs" data-go="booking">Book</button></div></section>').join('') + '</div>' });

  S.truck = (st) => frame(st, { id: 'truck', back: true, title: 'Send apples', sub: 'Compare trucks and share loads', body:
    '<section class="card tight"' + mk(1) + '><div class="tl"><div class="it done"><span class="bul">' + ic('pin') + '</span><div><span class="t-micro">From</span><br><b>Wachi, Shopian</b></div></div><div class="it"><span class="bul">' + ic('target') + '</span><div><span class="t-micro">To</span><br><b>Azadpur mandi, Delhi</b></div></div></div><div class="divider" style="margin:6px 0 10px"></div><div class="grid3"><div><p class="t-micro">Load</p><b>600 boxes</b></div><div><p class="t-micro">Ready</p><b>Thu 14 May</b></div><div><p class="t-micro">Highway</p>' + pillFor('good', 'Open') + '</div></div></section>' +
    '<div class="stack"' + mk(2) + '>' + D.trucks.map(([n, d, r, when], i) => '<button class="opt ' + (i === 1 ? 'on' : '') + '"><span class="tile-ic sm ' + (i === 2 ? 'sky' : i === 1 ? 'leaf' : 'plain') + '">' + ic(i === 2 ? 'snow' : 'truck', 's18') + '</span><span class="grow"><span class="tt">' + n + '</span><br><span class="st">' + d + ' · ' + when + '</span></span><span style="text-align:end"><b class="num">₹' + r + '</b><br><span class="t-micro">per box</span></span></button>').join('') + '</div>' +
    '<div class="banner good"' + mk(3) + '>' + ic('users', 's18') + '<span><b>Share and save ₹13 a box.</b> A neighbour in Zainapora is sending 450 boxes to Azadpur the same night.</span></div>' +
    '<button class="btn block" data-go="booking">Book shared truck · ' + money(82 * 600) + '</button>' });

  S.booking = (st) => frame(st, { id: 'booking', back: true, title: 'Truck booking', sub: 'Booking #A-2291', body:
    '<section class="card"' + mk(1) + '><div class="row"><span class="tile-ic sky" style="font:800 15px var(--f-display)">BA</span><span class="grow"><b>Bilal Ahmad</b> · 10-wheeler<br><span class="t-small">JK-22 ●● 4417 · ' + stars(4.7) + ' 4.7 (210 trips)</span></span></div><div class="tagrow"><span class="tag ok">Licence checked</span><span class="tag ok">Truck papers checked</span><span class="tag ok">Load photos at pickup</span></div><div class="grid2" style="margin-top:12px"><button class="btn sm ghost">' + ic('phone', 's18') + ' Call</button><button class="btn sm ghost" data-go="chat">' + ic('chat', 's18') + ' Message</button></div></section>' +
    '<section class="card"' + mk(2) + '><p class="t-title" style="margin-bottom:10px">Trip status</p><div class="tl">' + [['Booked', 'Tue 10:02 AM', 'done'], ['Driver confirmed', 'Tue 10:15 AM · Bilal Ahmad', 'now'], ['Loading at your orchard', 'Thu 5 PM · 600 boxes', ''], ['On the highway', 'Leaves Thu 8 PM · alerts on', ''], ['At Azadpur mandi', 'Expected Sat early morning', ''], ['Paid', 'After unloading', '']].map(([a, b, s]) => '<div class="it ' + s + '"><span class="bul">' + (s === 'done' ? ic('check') : s === 'now' ? ic('clock') : '') + '</span><div><span class="tt">' + a + '</span><br><span class="st">' + b + '</span></div></div>').join('') + '</div></section>' +
    '<section class="card tight row"' + mk(3) + '><span class="tile-ic sm leaf">' + ic('wallet', 's18') + '</span><span class="grow"><b>' + money(38400) + '</b> · ₹64 per box<br><span class="t-small">Pay by UPI or cash after unloading</span></span></section>' +
    '<button class="btn block ghost">' + ic('send', 's18') + ' Share trip with my commission agent</button>' });

  /* ---------- My orchard, data & privacy ---------- */
  S.orchard = (st) => frame(st, { id: 'orchard', back: true, title: 'My orchard', sub: 'Wachi, Shopian · 25 kanal', right: '<button class="iconbtn" data-go="privacy" aria-label="Privacy">' + ic('lock') + '</button>', body:
    '<section class="card"' + mk(1) + '><div class="row between"><span class="t-label">Orchard details</span><span class="t-micro">5 of 8 added</span></div><div class="meter" style="margin:8px 0 10px"><i style="width:62%"></i></div><p class="t-small">Add a <b>soil test</b> to get a fertilizer plan made for your soil. <a class="link">Add</a></p></section>' +
    '<div class="stack"' + mk(2) + '>' + D.orchard.blocks.map(b => '<section class="card tight"><div class="row"><span class="tile-ic ' + (b.id === 'A' ? 'leaf' : 'chinar') + '">' + ic(b.id === 'A' ? 'tree' : 'grid') + '</span><span class="grow"><b>Block ' + b.id + ' · ' + b.name + '</b><br><span class="t-small">' + b.kind + ' · ' + b.kanal + ' kanal · ' + b.trees + '</span></span></div><div class="t-small" style="margin-top:8px">' + b.vars + '<br><span class="faint">' + b.root + ' · ' + b.age + '</span></div></section>').join('') + '</div>' +
    '<div class="grid2"' + mk(3) + '>' + [['diary', 'Spray diary', 'spray', '4 sprays this season'], ['soon', 'Costs & income', 'wallet', '₹41,600 spent'], ['soon', 'Harvest record', 'box', '2025: 2,350 boxes'], ['privacy', 'Privacy & data', 'lock', 'You decide']].map(([g, a, i, b]) => '<button class="card tight stack g6" ' + (g === 'soon' ? 'data-act="soon"' : 'data-go="' + g + '"') + '><span class="tile-ic sm leaf">' + ic(i, 's18') + '</span><b>' + a + '</b><span class="t-micro">' + b + '</span></button>').join('') + '</div>' });

  const DIARY = [['18 Mar · Delayed dormancy', 'hmo', 12, 'done'], ['3 Apr · Green tip (rain forecast)', 'mancozeb', 10, 'done'], ['16 Apr · Pink bud', 'metpyra', 10, 'done'], ['3 May · Petal fall', 'difeno', 10, 'done'], ['Due before Wed 13 May rain · Fruitlet', 'dodine', 10, 'now']];
  S.diary = (st) => frame(st, { id: 'diary', back: true, title: 'Spray diary', sub: '2026 season · both blocks', right: '<button class="iconbtn" aria-label="Export">' + ic('download') + '</button>', body:
    '<div class="tl"' + mk(1) + '>' + DIARY.map(([d, id, drums, s2]) => { const p = D.products[id], n = p.dose ? Math.ceil(p.dose * 2 * drums / p.amt) : 0; return '<div class="it ' + s2 + '"><span class="bul">' + (s2 === 'done' ? ic('check') : ic('clock')) + '</span><div class="card tight" style="' + (s2 === 'now' ? 'border-style:dashed' : '') + '"><span class="t-micro">' + d + '</span><br><b>' + (s2 === 'now' ? 'Pick one from the fruitlet list' : p.name) + '</b><br><span class="t-small">' + (s2 === 'now' ? 'Not Difenoconazole again · spray before the rain' : p.group + ' · ' + drums + ' drums · ' + n + ' × ' + p.size + ' · ' + money(n * p.price)) + '</span></div></div>'; }).join('') + '</div>' +
    '<div class="banner info"' + mk(2) + '>' + ic('file', 's18') + '<span>Your diary is a ready spray record for buyers, exporters and relief claims. Download it as PDF any time.</span></div>' +
    '<button class="btn block">' + ic('plus', 's18') + ' Add a spray</button>' });

  S.privacy = (st) => frame(st, { id: 'privacy', back: true, title: 'Your data, your choice', body:
    '<p class="t-small">You control what Baghbaan keeps. Turn things off any time. Advice still works.</p>' +
    '<div class="card tight hr-list"' + mk(1) + '>' + [['Use my village for weather and alerts', 'Needed for local advice', true, true], ['Share pest sightings to warn neighbours', 'Only counts by area, never your name', true, false], ['Let dealers send me offers', 'Off by default', false, false], ['Help research (anonymous)', 'Universities improve the Doctor', false, false]].map(([a, b, on, lock], k) => '<div class="listrow"><span class="grow"><span class="tt" style="font-size:14.5px">' + a + '</span><br><span class="st">' + b + '</span></span>' + (lock ? '<span class="t-micro" aria-hidden="true">' + ic('lock', 's16') + '</span>' : '') + '<button type="button" class="toggle ' + (tog(st, 'p' + k, on) ? 'on' : '') + '" role="switch" data-tog="p' + k + '"' + (lock ? ' aria-disabled="true"' : '') + ' aria-checked="' + tog(st, 'p' + k, on) + '" aria-label="' + a + '"></button></div>').join('') + '</div>' +
    '<section class="card tight"' + mk(2) + '><p class="t-label">We never ask for</p><div class="stack g6" style="margin-top:8px">' + ['Aadhaar number', 'Bank passwords or OTPs', 'Land papers or khasra numbers'].map(x => '<div class="row t-small" style="gap:8px">' + ic('x', 's18 c-risk') + '<span style="color:var(--ink)">' + x + '</span></div>').join('') + '</div></section>' +
    '<div class="grid2"' + mk(3) + '><button class="btn ghost sm">' + ic('download', 's18') + ' Get my data</button><button class="btn ghost sm" style="color:var(--risk)">' + ic('trash', 's18') + ' Delete all</button></div>' });

  S.pestmap = (st) => frame(st, { id: 'pestmap', back: true, title: 'Around you this week', sub: 'From growers\' reports · 5 km', body:
    '<div class="map" style="height:210px"' + mk(1) + '>' + A.areaMap(330, 210, [[150, 100, 16, '#B3261E'], [190, 124, 12, '#B3261E'], [214, 84, 10, '#B3261E'], [120, 132, 9, '#A3560C'], [246, 150, 7, '#A3560C'], [96, 84, 8, '#B3261E']]) + '</div>' +
    '<div class="card tight hr-list"' + mk(2) + '>' + [['Apple scab', '23 growers reported', 'risk', 'Rising'], ['Powdery mildew', '6 growers reported', 'warn', 'Steady'], ['Red spider mite', '2 growers reported', 'good', 'Low']].map(([a, b, lv, s]) => '<div class="listrow"><span class="grow"><span class="tt">' + a + '</span><br><span class="st">' + b + '</span></span><span class="pill ' + lv + '">' + s + '</span></div>').join('') + '</div>' +
    '<button class="btn block"' + mk(3) + '>' + ic('camera', 's18') + ' Report what I see</button>' +
    '<p class="t-micro" style="text-align:center">Reports show only as counts by area. No names or exact locations.</p>' });

  S.offline = (st) => frame(Object.assign({}, st, { online: false }), { id: 'offline', tab: 'home', title: 'Baghbaan', sub: 'Offline mode', body:
    '<section class="card"' + mk(1) + '><div class="row"><span class="tile-ic sky">' + ic('clock') + '</span><span class="grow"><b>Your question is saved</b><br><span class="t-small">"Spots on leaves" will go to the expert when the internet is back.</span></span></div></section>' +
    '<p class="t-label">Need help now?</p><div class="stack"' + mk(2) + '><div class="opt"><span class="tile-ic sm leaf">' + ic('sms', 's18') + '</span><span class="grow"><span class="tt">Send by SMS</span><br><span class="st">Text <b>SPRAY</b>, <b>RATE</b> or <b>ROAD</b> to the helpline number</span></span></div><div class="opt"><span class="tile-ic sm leaf">' + ic('phone', 's18') + '</span><span class="grow"><span class="tt">Call the free helpline</span><br><span class="st">Voice menu in Kashmiri, Urdu, Hindi</span></span></div></div>' +
    '<p class="t-label">Saved on this phone</p><div class="grid2"' + mk(3) + '>' + [['book', '18 lessons'], ['bug', 'Pest library'], ['cal', 'Spray schedule'], ['chart', 'Rates from 7:10 AM']].map(([i, x]) => '<div class="card tight row"><span class="tile-ic sm plain">' + ic(i, 's18') + '</span><b style="font-size:13.5px">' + x + '</b></div>').join('') + '</div>' });

  S.chat = (st) => frame(st, { id: 'chat', back: true, title: 'Baghbaan helpline', sub: 'Chat · also works by SMS', bodyCls: 'chatsc', body:
    '<div class="stack" style="gap:8px"' + mk(1) + '>' +
    '<div class="bubble out">spray<span class="tm">7:02</span></div>' +
    '<div class="bubble in">Wachi, Shopian: <b>fruitlet</b> stage. Scab risk is <b>high on Wednesday</b>.<br>Reply 1 for spray options, 2 for mandi rates, 3 to talk to an expert.<span class="tm">7:02</span></div>' +
    '<div class="bubble out">1<span class="tm">7:03</span></div>' +
    '<div class="bubble in">Fruitlet options from the SKUAST-K 2026 guide, per 100 L: Dodine 65 WP 60 g, Fluxapyroxad + Pyraclostrobin SC 20 ml, or Pyraclostrobin + Boscalid WG 30 g. You used Difenoconazole last time, so pick another.<span class="tm">7:03</span></div>' +
    '<div class="bubble out row" style="gap:8px">' + ic('play', 's16') + '<span style="display:flex;gap:2px;align-items:center">' + [6, 12, 9, 16, 10, 14, 7, 12, 15, 8].map(h => '<i style="width:3px;height:' + h + 'px;border-radius:2px;background:currentColor;opacity:.85"></i>').join('') + '</span> 0:09<span class="tm">7:04</span></div>' +
    '<div class="bubble in">Voice note received in Kashmiri. An expert will call you back within 2 hours.<span class="tm">7:04</span></div></div>' +
    '<div class="quick"' + mk(2) + '><span>1 · Spray options</span><span>2 · Mandi rates</span><span>3 · Expert</span></div>',
    footer: '<div class="row" style="padding:8px 12px 12px;gap:8px;background:var(--card);border-top:1px solid var(--line)"><span class="search grow" style="min-height:44px">Type or hold mic</span><button class="tile-ic leaf" aria-label="Record">' + ic('mic') + '</button></div>' });

  /* ---------- Expert console (desktop, for the showcase) ---------- */
  function consoleView() {
    const q = [['Scab or Alternaria? 2 photos', 'Shopian · 14 min ago', 'Scab 91%', 'risk'], ['Leaves turning yellow in HDP block', 'Pulwama · 32 min ago', 'Mites 64%', 'warn'], ['White cotton on pruning cuts', 'Kulgam · 1 h ago', 'Woolly aphid 96%', 'good'], ['Fruit dropping after bloom', 'Baramulla · 2 h ago', 'Pollination 58%', 'warn']];
    return '<div class="desk"><aside class="nav"><div class="row" style="gap:8px;margin-bottom:14px">' + A.logo(30) + '<b style="font:800 17px var(--f-display)">Baghbaan <span class="t-micro">Expert desk</span></b></div>' +
      [['grid', 'Overview', 1], ['msgq', 'Questions · 12', 0], ['send', 'Advisories', 0], ['bug', 'Pest reports', 0], ['chart', 'Mandi data', 0], ['users', 'Providers', 0], ['book', 'Lessons', 0], ['bag', 'Orders', 0]].map(([i, n, on]) => '<a class="' + (on ? 'on' : '') + '">' + ic(i, 's18') + n + '</a>').join('') + '</aside>' +
      '<div class="main"><div style="grid-column:1/-1" class="row between"><div><p class="t-label">South Kashmir · Tue 12 May</p><h2 class="t-big" style="font-size:24px">Scab reports are rising after the rain</h2></div><div class="row" style="gap:10px">' + [['Scab reports today', '214', '▲ 3.1×'], ['Questions waiting', '12', 'avg reply 1 h 40 m'], ['Growers reached', '48,200', 'this week']].map(([a, b, c]) => '<div class="card tight" style="min-width:150px"><p class="t-micro">' + a + '</p><p class="t-huge num" style="font-size:24px">' + b + '</p><p class="t-micro">' + c + '</p></div>').join('') + '</div></div>' +
      '<div class="stack" style="min-width:0"><div class="map" style="height:290px">' + A.areaMap(600, 290, [[150, 100, 22, '#B3261E'], [190, 124, 16, '#B3261E'], [214, 84, 14, '#B3261E'], [120, 132, 12, '#A3560C'], [246, 150, 9, '#A3560C'], [96, 84, 12, '#B3261E'], [60, 60, 8, '#A3560C'], [280, 60, 7, '#1D7A4B']]) + '</div>' +
      '<section class="card"><div class="row between"><p class="t-title">Send an advisory</p><span class="pill info">18,400 growers match</span></div><p class="t-small" style="margin-top:6px;color:var(--ink)"><b>Who:</b> Shopian + Kulgam · higher belt · stage: petal fall</p><p class="t-small" style="margin-top:4px;color:var(--ink)"><b>Message:</b> Rain expected Wednesday. Apply a scab spray from the petal-fall list before noon. Do not repeat the group you used last time.</p><div class="row" style="gap:8px;margin-top:10px"><span class="chip on">' + ic('bell') + 'App</span><span class="chip on">' + ic('sms') + 'SMS</span><span class="chip on">' + ic('phone') + 'Voice call · Kashmiri</span><span class="grow"></span><button class="btn sm">' + ic('send', 's18') + ' Send advisory</button></div></section></div>' +
      '<section class="card" style="min-width:0"><div class="row between"><p class="t-title">Questions from growers</p><span class="t-micro">AI suggestion → expert approves</span></div><div class="hr-list" style="margin-top:6px">' + q.map(([a, b, c, lv], i) => '<div class="listrow"><span class="art" style="width:46px;height:52px;flex:none">' + (i === 2 ? A.bark('woolly', 44, 34, 3) : i === 3 ? A.flowers('fallen', 44, 40) : A.leaf(i === 0 ? 'scab' : 'mites', 40, 50, 3 + i)) + '</span><span class="grow"><span class="tt" style="font-size:14px">' + a + '</span><br><span class="st">' + b + '</span></span><span class="pill ' + lv + '">' + c + '</span><button class="btn xs ' + (i ? 'ghost' : '') + '">' + (i ? 'Open' : 'Approve') + '</button></div>').join('') + '</div></section></div></div>';
  }

  G.APP = { S, dxState, frame, consoleView, art, level };
})(typeof window !== 'undefined' ? window : globalThis);
