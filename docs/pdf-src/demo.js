/* Baghbaan — composes the A4-landscape demo walkthrough from the live prototype screens. */
(function () {
  const { S, dxState, consoleView } = window.APP;
  const A = window.ART, ic = A.ic;
  const DEMO_URL = window.DEMO_URL || '';
  const base = { lang: 'en', dx: { area: 'leaves', answers: {} }, season: 'spring', online: true, pid: 'dodine', chrome: true };
  const st = (o) => Object.assign({}, base, o || {}, { dx: Object.assign({ area: 'leaves', answers: {} }, (o && o.dx) || {}) });
  const ANS2 = { velvety: 'yes', fruit_too: 'yes' };
  let pageNo = 0; const TOTAL = 24;

  function phone(id, o, opt) {
    opt = opt || {};
    return '<div class="ph" style="zoom:' + (opt.zoom || .6) + '"><div class="device' + (opt.marks ? ' marks' : '') + '" style="height:' + (opt.h || 784) + 'px">' + S[id](st(o)) + '</div></div>';
  }
  const cap = (n, title, text, w) => '<div class="dcap" style="width:' + (w || 250) + 'px"><b><span class="n">' + n + '</span>' + title + '</b>' + text + '</div>';
  const shot = (id, o, opt, c) => '<div class="shot">' + phone(id, o, opt) + (c || '') + '</div>';
  function page(eyebrow, title, deck, inner, cls) {
    pageNo++;
    return '<section class="pg' + (cls ? ' ' + cls : '') + '"><div class="pg-head"><div><p class="eyebrow">' + eyebrow + '</p><h2>' + title + '</h2>' + (deck ? '<p class="deck">' + deck + '</p>' : '') + '</div></div>' + inner +
      '<div class="pg-foot"><span class="bb">' + A.logo(14) + 'Baghbaan · demo app walkthrough · sample data</span><span>' + String(pageNo).padStart(2, '0') + ' / ' + TOTAL + '</span></div></section>';
  }
  const notes = (items, plain) => '<div class="notes">' + items.map((x, i) => '<div class="note' + (plain ? ' plain' : '') + '"><span class="m">' + (i + 1) + '</span><div><b>' + x[0] + '</b><p>' + x[1] + '</p></div></div>').join('') + '</div>';
  const arrow = '<span class="ar">' + ic('chevR', 's20') + '</span>';

  const P = [];
  /* 1 cover */
  pageNo++;
  P.push('<section class="pg cover"><span class="chinarbg">' + A.chinar(560, '#fff') + '</span><div class="in">' +
    '<div style="display:flex;align-items:center;gap:12px">' + A.logo(64) + '<span style="font:500 15px var(--f-body);color:#C9DCCF">Demo app · concept v0.1</span></div>' +
    '<h1>Baghbaan</h1><p class="ctag">Everything a Kashmiri apple grower needs, in one app: find what is wrong, buy the right medicine, learn, sell well and book help.</p>' +
    '<div class="facts"><span>Orchard Doctor: Yes / No diagnosis</span><span>Genuine inputs</span><span>Mandi, highway & weather</span><span>Trucks & labour</span><span>Kashmiri · Urdu · Hindi · English</span><span>Works offline</span></div>' +
    '<p class="cmeta"><b>Demo app walkthrough</b><br>November 2026 · All names, prices, rates and headlines are sample data.' + (DEMO_URL ? '<br>Clickable demo: ' + DEMO_URL : '') + '</p></div>' +
    '<div class="stack3">' +
    '<div class="ph" style="zoom:.6;left:60px;top:150px;transform:rotate(-7deg)"><div class="device">' + S.mandi(st()) + '</div></div>' +
    '<div class="ph" style="zoom:.6;left:600px;top:170px;transform:rotate(7deg)"><div class="device">' + S.dx_q(st({ dx: { answers: { velvety: 'yes' } } })) + '</div></div>' +
    '<div class="ph" style="zoom:.64;left:300px;top:40px"><div class="device">' + S.home(st()) + '</div></div></div></section>');

  /* 2 idea */
  const pillars = [['home', 'Orchard Doctor', 'The main page. Yes / No and picture questions find the cause of a problem, then say what to do now and how to stop it next year. Photo check and a human expert back it up.'],
    ['bag', 'Buy', 'Sprays, fertilizers, organic inputs, tools, nets, packing and saplings from licensed dealers. Dose calculator, group rotation, genuine-pack check and pay-after-harvest.'],
    ['book', 'Learn', 'Three-minute lessons with Kashmiri audio: soil, planting, high-density orchards, pruning, pests, safe spraying, harvest, selling and schemes. Saved for offline use.'],
    ['chart', 'Mandi & news', 'Daily mandi rates, a where-to-sell calculator, NH-44 and Mughal Road status, rail parcel, spray-window weather, disease risk and advisories.'],
    ['users', 'Services', 'Book trucks and shared loads, labour teams, spray services, tractors, expert visits, soil tests, cold storage, beehives and buyers. Verified and rated.'],
    ['tree', 'My orchard', 'Blocks, varieties, spray diary, costs and harvest records. It fills itself from what the grower already does, and the grower controls who sees it.']];
  P.push(page('The idea', 'One app for the whole orchard year',
    'Today a grower asks the dealer what to spray, hears prices from the commission agent, follows the highway on WhatsApp and phones around for trucks and labour. Baghbaan puts all of it in one place, built around the first question every grower has: what is wrong with my trees, and what do I do?',
    '<div class="cols c3" style="margin-top:16px">' + pillars.map(([i, h, p], k) => '<div class="box' + (k === 0 ? ' mist' : '') + '"><h3><span class="tile-ic sm ' + (k === 0 ? 'apple' : 'leaf') + '">' + ic(i, 's18') + '</span>' + h + '</h3><p>' + p + '</p></div>').join('') + '</div>' +
    '<p class="kicker" style="margin-top:18px">How the parts work together</p><div class="flow">' +
    [['Spot a problem', 'Home alert or own eyes'], ['Doctor finds it', '2–6 Yes / No questions'], ['Buy the right spray', 'Rotated group, exact dose'], ['Book a spray team', 'Verified, rated'], ['Saved to diary', 'Reused next time'], ['Sell at best mandi', 'Net price after freight']].map(([a, b], i) => (i ? arrow : '') + '<div class="st"><b>' + a + '</b>' + b + '</div>').join('') + '</div>'));

  /* 3 who */
  const persona = (ini, col, name, meta, rows) => '<div class="box persona"><div class="who"><span class="av" style="background:' + col[0] + ';color:' + col[1] + '">' + ini + '</span><div><h3 style="font:700 17px var(--f-display)">' + name + '</h3><span class="meta">' + meta + '</span></div></div><dl>' + rows.map(([a, b]) => '<dt>' + a + '</dt><dd>' + b + '</dd>').join('') + '</dl></div>';
  P.push(page('Who it is for', 'Built for the grower with a basic phone and little time',
    'Three illustrative growers shaped the design. None of them wants to fill a form. All of them want an answer they can trust, in their own language.',
    '<div class="cols c3" style="margin-top:14px">' +
    persona('GN', ['var(--leaf-soft)', 'var(--leaf)'], 'Ghulam Nabi, 58', 'Wachi, Shopian · 25 kanal, traditional + new high-density block', [['Speaks', 'Kashmiri; reads Urdu slowly. His son set up the phone.'], ['Worries', 'Scab after rain, fake medicine, the highway closing at harvest.'], ['Uses', 'Voice, Yes / No Doctor, spray alerts, truck booking.']]) +
    persona('IN', ['var(--chinar-soft)', 'var(--chinar)'], 'Insha, 27', 'Sopore · 12 kanal high-density, family orchard', [['Speaks', 'Urdu, English; agriculture graduate.'], ['Worries', 'Exact schedules for M9 plants, mandi spreads, records for buyers.'], ['Uses', 'Spray diary, where-to-sell, expert chat, lessons.']]) +
    persona('AR', ['var(--sky-soft)', 'var(--sky)'], 'Abdul Rashid, 45', 'Kulgam · 6 kanal, sells to a pre-harvest contractor', [['Speaks', 'Kashmiri; reads very little. Prefers phone calls.'], ['Worries', 'Credit from the dealer, labour at harvest, fair prices.'], ['Uses', 'Voice helpline, pay after harvest, labour teams.']]) + '</div>' +
    '<p class="kicker" style="margin-top:18px">Six design rules</p><div class="cols c3">' +
    [['mic', 'Voice and pictures first', 'Every question has a picture and a Listen button. In studies, low-literacy users finished no tasks with text menus but most with voice or pictures.'],
     ['wifioff', 'Works when the network does not', 'J&K has seen hundreds of internet shutdowns. Lessons, schedules and saved rates work offline; SMS and a voice line are backups.'],
     ['shield', 'Trust is built in', 'Licensed dealers only, genuine-pack checks, verified providers, sources shown on every rate and advisory.'],
     ['help', 'Ask little, give back first', 'No signup form. One question at a time, only when it improves the answer, always with a reason and a Skip.'],
     ['cal', 'Season-aware', 'The home screen follows the crop stage at the grower\'s altitude: dormant oil in March, scab in spring, mites in summer, urea at leaf fall.'],
     ['sliders', 'Local words and units', 'Kanal, peti (box), 200 L drum, ₹ per kg and per box, district and village names the grower uses.']].map(([i, h, p]) => '<div class="row top" style="gap:10px"><span class="tile-ic sm leaf">' + ic(i, 's18') + '</span><div><b style="font:700 14.5px var(--f-display)">' + h + '</b><p class="t-small" style="margin-top:2px;font-size:12.3px">' + p + '</p></div></div>').join('') + '</div>'));

  /* 4 app map */
  const col = (cls, icn, h, items) => '<div class="col ' + cls + '"><h3>' + ic(icn, 's18') + h + '</h3>' + items.map(x => '<span class="it">' + x + '</span>').join('') + '</div>';
  P.push(page('App map', 'Five tabs, one main question',
    'The bottom bar has five tabs. Home opens on the Orchard Doctor; every other tab links back to it, and its answers link out to products, lessons and services.',
    '<div class="map6" style="margin-top:14px">' +
    col('main', 'home', 'Home · Orchard Doctor', ['Today: alerts, crop stage, rates, highway', 'Start: where is the problem?', 'Yes / No and picture questions', 'Result: cause, do now, prevent', 'Photo check (beta)', 'Ask an expert · voice note', 'One quick question a day']) +
    col('', 'bag', 'Buy', ['Kit made for your orchard', 'Shop by need (12 categories)', 'Filter by problem and stage', 'Product: brands, dose, safety', 'Order: pickup or delivery', 'Pay: UPI, cash, after harvest', 'Genuine-pack QR check']) +
    col('', 'book', 'Learn', ['Continue a course', 'For this season', '12 topics, 120+ lessons', 'Soil sampling lesson + quiz', 'Pests & diseases library', 'Orchard year calendar', 'Saved for offline']) +
    col('', 'chart', 'Mandi & news', ['Rates by variety and grade', '30-day trend', 'Where should I sell?', 'Highway, Mughal Road, rail', 'Weather and spray window', 'Disease risk, hail alerts', 'Advisories and schemes']) +
    col('', 'users', 'Services', ['Trucks and shared loads', 'Labour and spray teams', 'Tractor and equipment', 'Expert visit, soil test', 'Cold storage (CA)', 'Beehives, nursery plants', 'Track a booking']) + '</div>' +
    '<div class="band leaf"><b>' + ic('tree', 's18') + ' My orchard</b><div class="items"><span>Blocks & varieties</span><span>Spray diary</span><span>Costs & income</span><span>Harvest record</span><span>Pest map near me</span><span>Privacy & data</span></div></div>' +
    '<div class="band sky"><b>' + ic('phone', 's18') + ' Other ways in</b><div class="items"><span>WhatsApp / SMS keywords</span><span>Missed-call voice line in Kashmiri</span><span>Assisted at Kisan Khidmat Ghars</span><span>Village helpers (Bagh Mitras)</span><span>Expert desk for advisors</span></div></div>'));

  /* 5 getting started */
  P.push(page('Getting started', 'Ready in three taps, no form to fill',
    'The grower picks a language, skips signup if they like, and names a village. That is all the app needs to give local advice.',
    '<div class="phones">' +
    shot('lang', {}, {}, cap(1, 'Choose a language', 'Kashmiri means Kashmiri voice with Urdu-script text, because more growers read Urdu than written Kashmiri. Every option can be heard.')) +
    shot('welcome', {}, {}, cap(2, 'Guest mode is fine', 'Mobile number is optional. No Aadhaar, bank or land papers are ever asked for.')) +
    shot('village', {}, {}, cap(3, 'Village, not GPS', 'The village sets weather, crop-stage timing and mandi rates. Exact location stays on the phone.')) + '</div>'));

  /* 6 home annotated */
  P.push(page('Home', 'The home screen answers "what should I do today?"',
    '', '<div class="split"><div>' + phone('home', {}, { zoom: .54, h: 1100, marks: true }) + '</div>' + notes([
      ['Greeting in the grower\'s language', 'Name only if they chose to give it. Date and village keep every message local.'],
      ['The main question, front and centre', 'Start opens the Orchard Doctor. The microphone takes a spoken problem in Kashmiri; the camera starts a photo check.'],
      ['Alerts that come with an action', 'Rain plus leaf wetness plus temperature gives a scab infection risk for the grower\'s own area. The button goes straight to the right sprays, rotated away from the last group used.'],
      ['Crop stage for this altitude', 'Higher orchards flower later. The strip shows where the season is and what spray is due next, read from the spray diary.'],
      ['Today\'s numbers', 'Mandi rate with trend, NH-44 status, the best spray window and free labour teams nearby. Each tile opens its full screen.'],
      ['One quick question a day', 'Optional, one tap, with the reason shown. Answers build village-level pictures (pollination, pests, crop size) that come back to growers as alerts.']]) + '</div>'));

  /* 7 season + language */
  P.push(page('Seasons and languages', 'The same home screen in May, in November and in three languages',
    'Content follows the orchard calendar and the language follows the grower. Urdu and Kashmiri modes switch the whole layout to right-to-left.',
    '<div class="phones" style="gap:22px">' +
    shot('home', {}, { zoom: .54 }, cap('A', 'May · fruitlet', 'Scab risk before rain, the fruitlet spray, a bee question.', 205)) +
    shot('home', { season: 'autumn' }, { zoom: .54 }, cap('B', 'November · leaf fall', 'Urea on leaves against next year\'s scab, frost alerts, CA storage space.', 205)) +
    shot('home', { lang: 'ur' }, { zoom: .54 }, cap('C', 'Urdu', 'Right-to-left layout, Nastaliq type, Urdu numbers kept in Western digits for prices.', 205)) +
    shot('home', { lang: 'hi' }, { zoom: .54 }, cap('D', 'Hindi', 'For non-Kashmiri workers, traders and family members who help.', 205)) + '</div>'));

  /* 8 doctor 1 */
  P.push(page('Orchard Doctor · 1', 'Yes or No, with a picture for every question',
    'The grower never has to name a disease. They point at where the problem is and answer short questions. Each picture shows what a Yes looks like next to what a No looks like.',
    '<div class="phones">' +
    shot('dx_area', { dx: { area: null } }, {}, cap(1, 'Where is the problem?', 'Leaves, fruit, flowers, bark or roots. Not sure? Take a photo or speak.')) +
    shot('dx_q', {}, {}, cap(2, 'The best next question', 'In May the likely causes on leaves are scab, aphids or mildew. The question that splits them best is asked first.')) +
    shot('dx_q', { dx: { answers: { velvety: 'yes' } } }, {}, cap(3, 'Narrowing down, live', 'One Yes moves scab from 33% to 91%. The next question checks the fruit to confirm.')) + '</div>'));

  /* 9 doctor result */
  P.push(page('Orchard Doctor · 2', 'A clear answer: what it is, what to do now, how to stop it',
    '', '<div class="split"><div style="display:flex;gap:26px">' + phone('dx_sev', {}, { zoom: .46, h: 1260 }) + phone('dx_result', { dx: { answers: ANS2 } }, { zoom: .46, h: 1260, marks: true }) + '</div>' + notes([
      ['Likely cause, with the reasons', 'The answers that led here are listed, so the grower can see why. Match strength is shown honestly.'],
      ['Urgency from the weather', 'The result knows tomorrow\'s rain. Acting before it is what matters most for scab.'],
      ['Steps in plain words', 'Personal: it knows the last spray from the diary and warns against repeating the same fungicide group.'],
      ['Products that fit', 'Only products on the SKUAST-K 2026 guide for this stage, with a label claim for apple. One tap to buy from a licensed dealer.'],
      ['Expert and diary', 'Escalate with all answers attached, or save the case to the spray diary. "Could also be" covers look-alikes.']]) + '</div>'));

  /* 10 doctor 3 */
  P.push(page('Orchard Doctor · 3', 'When answers are not enough: photo, expert, helpline',
    'Questions work for most cases and need no data connection. Photos and people take over for the rest.',
    '<div class="phones">' +
    shot('dx_photo', {}, {}, cap(1, 'Photo check (beta)', 'An on-phone model trained on Kashmir leaf images. It confirms, it does not replace, the questions.')) +
    shot('dx_expert', {}, {}, cap(2, 'Ask an expert', 'The case, photos and a Kashmiri voice note go to a crop doctor. Hard cases go to university or KVK scientists.')) +
    shot('chat', {}, {}, cap(3, 'Same help by SMS or chat', 'Keywords like SPRAY or RATE work on any phone. Voice notes are answered by call-back.')) + '</div>'));

  /* 11 how it thinks */
  const ds0 = dxState(st()), ds1 = dxState(st({ dx: { answers: { velvety: 'yes' } } })), ds2 = dxState(st({ dx: { answers: ANS2 } }));
  const names = { scab: 'Apple scab', aphids: 'Aphids', mildew: 'Powdery mildew', alternaria: 'Alternaria leaf blotch', marssonina: 'Marssonina blotch', caterpillars: 'Caterpillars', mites: 'Red spider mite', zinc: 'Zinc deficiency', burn: 'Spray injury' };
  const pr = (ds, c) => { const f = ds.ranked.find(r => r[0] === c); return f ? f[1] : 0; };
  const rowsC = ['scab', 'aphids', 'mildew', 'caterpillars', 'mites', 'alternaria'];
  const cell = (p) => '<td class="num" style="width:150px"><span class="bar' + (p > .5 ? '' : ' o') + '" style="width:' + Math.max(2, Math.round(p * 90)) + 'px"></span> ' + Math.round(p * 100) + '%</td>';
  P.push(page('How the Doctor thinks', 'A transparent scoring engine, written with experts',
    'The Doctor is a small, auditable model, not a black box. Experts write the questions and how likely each answer is for each problem. The app does the arithmetic.',
    '<div class="cols c2" style="margin-top:14px;gap:28px"><div class="stack g14">' + notes([
      ['Start from what is common now', 'Each problem has a starting score for the season, altitude and recent reports nearby. In May, scab leads on leaves.'],
      ['Update with every answer', 'A Yes or No multiplies each problem\'s score by how often that symptom appears with it (naive Bayes). "Not sure" leaves the scores as they are.'],
      ['Ask the most useful next question', 'The app picks the question that splits the remaining problems best (largest expected information gain). Clear cases end in 2–3 questions; the most it asks is 6.'],
      ['Stop, or hand over', 'It stops when one cause passes 90% after two real answers. If the answers do not point anywhere (below 35%), it says so and offers a photo check or an expert instead of a guess.'],
      ['Learn from every case', 'Expert confirmations and photo labels tune the scores each season. Every version of the question bank is signed off by the content partner.']], true) + '</div>' +
    '<div><p class="kicker">Worked example from this demo · leaves, mid-May</p><table class="t"><thead><tr><th>Possible cause</th><th class="num">Start</th><th class="num">After "velvety spots: Yes"</th><th class="num">After "spots on fruit: Yes"</th></tr></thead><tbody>' +
    rowsC.map(c => '<tr><td>' + names[c] + '</td>' + cell(pr(ds0, c)) + cell(pr(ds1, c)) + cell(pr(ds2, c)) + '</tr>').join('') + '</tbody></table>' +
    '<p class="src" style="margin-top:8px">Numbers are computed live by the prototype\'s engine with sample likelihoods. Real values will come from the content partner and labelled cases.</p>' +
    '<div class="box mist" style="margin-top:14px"><h3>' + ic('shield', 's18') + 'Safety rules in the engine</h3><ul><li>Only products registered for apple and on the current university schedule can be suggested.</li><li>Never an insecticide during bloom; never a banned or restricted molecule.</li><li>Root rot, fire-blight-like symptoms or a sudden spread always go to a human.</li></ul></div></div></div>'));

  /* 12 buy 1 */
  P.push(page('Buy · 1', 'A shop that knows the orchard',
    'The shop opens on a kit matched to the stage, the orchard size and the last spray. Products are sorted by problem, not by brand.',
    '<div class="phones">' +
    shot('shop', {}, {}, cap(1, 'Made for your orchard', 'Fruitlet kit sized for 25 kanal, rotated away from the fungicide used last time.')) +
    shot('shop_list', {}, {}, cap(2, 'Filtered by problem and stage', 'Each card shows the resistance group and the label claim, and greys out the group used last time.')) +
    shot('product', {}, {}, cap(3, 'Compare brands of the same medicine', 'Price per pack across licensed dealers, the dose for the grower\'s drums, safety and verified reviews.')) + '</div>'));

  /* 13 buy 2 */
  P.push(page('Buy · 2', 'Pay later, and know the pack is genuine',
    '', '<div class="split"><div style="display:flex;gap:26px">' + phone('cart', {}, { zoom: .56, h: 1040, marks: true }) + phone('verify', {}, { zoom: .56, h: 1040, marks: true }) + '</div>' + notes([
      ['Order from a licensed dealer', 'Pesticides can only be sold by licensed sellers. Baghbaan is a marketplace for them; the dealer\'s GST bill comes with every order.'],
      ['Pickup or delivery', 'Pickup at the village dealer keeps costs low and keeps dealers in the system instead of fighting it.'],
      ['Pay after harvest', 'Partner credit linked to the Kisan Credit Card replaces informal dealer credit, at known interest, approved in minutes.'],
      ['Genuine-pack check', 'Scan the QR on the pack: batch, dates and apple registration are checked against the maker\'s record. Fakes are reported to the department.']]) + '</div>'));

  /* 14 learn */
  P.push(page('Learn', 'Short lessons in Kashmiri, saved on the phone',
    'Three-minute videos and audio, step cards with pictures and a quick check at the end. Lessons appear when they matter in the season.',
    '<div class="phones" style="gap:22px">' +
    shot('learn', {}, { zoom: .54 }, cap(1, 'For this season', 'Thinning, the 20-leaf mite check, safe spraying near bees.', 205)) +
    shot('lesson', {}, { zoom: .54 }, cap(2, 'Step by step', 'Soil sampling in four picture steps, with one-tap booking of a soil test.', 205)) +
    shot('library', {}, { zoom: .54 }, cap(3, 'Pests & diseases', 'Each problem with the part it attacks and its season.', 205)) +
    shot('calendar', {}, { zoom: .54 }, cap(4, 'Orchard year', 'Month by month, adjusted for higher and lower belts.', 205)) + '</div>'));

  /* 15 mandi */
  P.push(page('Mandi', 'Rates that end in a decision: where should I sell?',
    '', '<div class="split"><div style="display:flex;gap:26px">' + phone('mandi', {}, { zoom: .6, marks: true }) + phone('sell', {}, { zoom: .6, marks: true }) + '</div>' + notes([
      ['Variety and grade', 'Rates per kg with the per-box figure next to it, because growers still think in boxes. Box weight is stated.'],
      ['30-day trend', 'Tap the chart for any day. The source and update time are always shown.'],
      ['All the mandis in one table', 'Sopore, Shopian, Parimpora, Narwal, Azadpur and other destination markets.'],
      ['Where should I sell?', 'Money in hand per box after freight, commission and unloading, for the grower\'s own load. Then one tap to book the truck.']]) + '</div>'));

  /* 16 roads weather news */
  P.push(page('Roads, weather and news', 'The things that decide a harvest week',
    'The 2025 NH-44 closure stranded thousands of fruit trucks. Highway, rail and weather now sit next to prices.',
    '<div class="phones">' +
    shot('roads', {}, {}, cap(1, 'Highway, Mughal Road, rail', 'Official advisory plus drivers\' reports. Alerts by app, SMS or voice call when status changes.')) +
    shot('weather', {}, {}, cap(2, 'Spray window and disease risk', 'Best hours to spray today, and scab, mildew and mite risk from local weather.')) +
    shot('news', {}, {}, cap(3, 'Advisories and schemes', 'Department advisories, scheme deadlines, quality alerts. Every item can be listened to.')) + '</div>'));

  /* 17 services */
  P.push(page('Services', 'Book trucks, teams and experts, safely',
    'Verified providers, fair-rate guides, shared loads and live tracking. Growers pay after the work is done.',
    '<div class="phones" style="gap:22px">' +
    shot('services', {}, { zoom: .54 }, cap(1, '12 kinds of help', 'From trucks to beehives, cold storage and buyers.', 205)) +
    shot('labour', {}, { zoom: .54 }, cap(2, 'Labour teams', 'Rates, ratings, skills; non-local workers shown with police registration.', 205)) +
    shot('truck', {}, { zoom: .54 }, cap(3, 'Share a truck', 'Pool part-loads with neighbours going to the same mandi.', 205)) +
    shot('booking', {}, { zoom: .54 }, cap(4, 'Track the trip', 'Checked driver and papers, live status, pay on delivery.', 205)) + '</div>'));

  /* 18 my orchard */
  P.push(page('My orchard', 'A record that builds itself',
    'Blocks, sprays, costs and harvests, filled in from what the grower already does in the app. The record becomes useful to buyers, exporters and banks.',
    '<div class="phones" style="gap:22px">' +
    shot('orchard', {}, { zoom: .54 }, cap(1, 'Orchard details', 'Optional, filled step by step. The meter shows what each detail improves.', 205)) +
    shot('diary', {}, { zoom: .54 }, cap(2, 'Spray diary', 'Every spray with group, drums and cost. Exports as a PDF record.', 205)) +
    shot('privacy', {}, { zoom: .54 }, cap(3, 'Your data, your choice', 'Plain switches, nothing shared with dealers by default, delete any time.', 205)) +
    shot('pestmap', {}, { zoom: .54 }, cap(4, 'Pest map near me', 'Counts by area only. Sharing a report brings back an alert.', 205)) + '</div>'));

  /* 19 data ladder */
  P.push(page('Listening without prying', 'How the app learns about growers without a single form',
    'Each question is asked once, at the moment it improves an answer, with the reason shown and a Skip. What the app already knows is never asked again.',
    '<div class="cols c2" style="margin-top:14px;gap:28px;grid-template-columns:1.35fr 1fr"><div class="ladder"><div class="rung hd"><span>When</span><span>What we ask</span><span>What the grower gets back</span></div>' +
    [['First open', 'Language, village', 'Local weather, crop stage, rates'], ['First diagnosis', 'Where the problem is, how many trees', 'A cause and a plan; urgency'], ['First purchase', 'Orchard size (kanal), sprayer drum', 'Exact quantity to buy; less waste'], ['Each spray', 'Product, date (tap from the order)', 'Group rotation, next-due reminder, spray record'], ['Once a day, optional', 'One tap: bees seen? pests seen?', 'Village alerts built from everyone\'s taps'], ['End of season', 'Crop better, same or worse?', 'Area crop estimate, price outlook'], ['Only if they want', 'Phone number, name', 'Expert call-back, bookings, credit']].map(([a, b, c]) => '<div class="rung"><span class="when">' + a + '</span><span class="q">' + b + '</span><span class="why">' + c + '</span></div>').join('') + '</div>' +
    '<div class="stack g14">' + notes([
      ['Value before questions', 'Every screen is useful in guest mode. Questions come after the app has helped.'],
      ['Never asked', 'Aadhaar, bank details, OTPs or land papers. Payments run through licensed partners.'],
      ['Aggregates only', 'Pest and crop reports leave the phone as counts by area, never as names or exact locations.'],
      ['Ready for India\'s data law', 'Itemised consent notice in Kashmiri, Urdu, Hindi and English; withdrawal as easy as consent; parental consent under 18; export and delete. The DPDP Rules\' main duties apply from May 2027.'],
      ['Shared phones, family helpers', 'Many households share one phone. A "helping someone" mode keeps the grower\'s own consent.']]) + '</div></div>'));

  /* 20 offline */
  P.push(page('Low connectivity', 'Works when the internet does not',
    '', '<div class="split"><div style="display:flex;gap:26px">' + phone('offline', {}, { zoom: .6, marks: true }) + phone('chat', {}, { zoom: .6 }) + '</div><div class="stack g14">' + notes([
      ['Questions wait, they do not fail', 'A diagnosis runs fully on the phone. Expert questions and orders queue and send when a signal returns.'],
      ['SMS and a voice line', 'Keyword SMS (SPRAY, RATE, ROAD) and a missed-call voice menu in Kashmiri, Urdu and Hindi reach basic phones too.'],
      ['Saved on the phone', 'Lessons, the pest library, the spray schedule and the last rates are cached and dated.']]) +
    '<div class="box mist" style="margin-top:6px"><h3>' + ic('info', 's18') + 'Why it matters here</h3><p>Jammu & Kashmir has had more internet shutdowns than any other part of India, including a 2019–2021 period of 550 days with no or partial mobile internet. An orchard app that only works online fails exactly when growers need it.</p></div></div></div>'));

  /* 21 expert desk */
  pageNo++;
  P.push('<section class="pg"><div class="pg-head"><div><p class="eyebrow">Behind the app</p><h2>The expert desk: one place to answer growers and warn them early</h2><p class="deck">Crop doctors approve AI-suggested answers, watch reports rise on the map and send advisories by app, SMS and Kashmiri voice call to exactly the growers who need them.</p></div></div>' +
    '<div style="margin-top:14px;display:flex;justify-content:center"><div style="zoom:.8">' + consoleView() + '</div></div>' +
    '<div class="pg-foot"><span class="bb">' + A.logo(14) + 'Baghbaan · demo app walkthrough · sample data</span><span>' + String(pageNo).padStart(2, '0') + ' / ' + TOTAL + '</span></div></section>');

  /* 22 roadmap */
  P.push(page('Roadmap', 'From a pilot in two districts to the whole valley',
    'Build what earns trust first (diagnosis, rates, roads, lessons), then the marketplace, then credit and data services.',
    '<div class="cols c3" style="margin-top:14px">' +
    '<div class="phase now"><span class="when">Phase 1 · months 0–6</span><h3>Pilot: Shopian and Baramulla</h3><ul><li>Orchard Doctor with 25 problems, question bank reviewed by a university partner</li><li>Mandi rates (Agmarknet / data.gov.in), highway and weather alerts</li><li>40 lessons with Kashmiri audio; offline mode; SMS keywords</li><li>Directory of verified transporters and labour leaders; booking by call</li><li>500 growers recruited through village helpers and Kisan Khidmat Ghars</li></ul></div>' +
    '<div class="phase"><span class="when">Phase 2 · months 6–12</span><h3>Marketplace and records</h3><ul><li>Licensed-dealer shop with pickup, delivery and genuine-pack checks</li><li>Spray diary, group rotation and dose calculator</li><li>In-app truck, team and cold-storage booking with tracking</li><li>Photo check (beta) trained on Kashmir datasets</li><li>Voice helpline in Kashmiri; expert desk for partners</li></ul></div>' +
    '<div class="phase"><span class="when">Phase 3 · months 12–24</span><h3>Scale and services</h3><ul><li>All apple districts; Ladakh and Himachal content later</li><li>Pay-after-harvest credit with a bank or NBFC; insurance if launched</li><li>Weather-station network for disease forecasting</li><li>Buyer and exporter links using spray records</li><li>Anonymised pest and crop intelligence for the department</li></ul></div></div>' +
    '<div class="cols c2" style="margin-top:14px"><div class="box"><h3>' + ic('users', 's18') + 'Partners to approach</h3><p>Content: SKUAST-Kashmir, ICAR-CITH Srinagar, KVKs. Advisories and schemes: Department of Horticulture. Supply: licensed dealers and manufacturers. Logistics: transporter unions, rail parcel. Money: banks/NBFCs for KCC-linked credit. Reach: FPOs, mandi associations, Kisan Khidmat Ghars.</p></div>' +
    '<div class="box"><h3>' + ic('target', 's18') + 'What we will measure</h3><p>Weekly active growers; diagnoses completed and confirmed right by experts; sprays saved by avoiding wrong products; share of genuine-checked purchases; truck days lost to closures avoided; repeat bookings; grower-reported net price per box.</p></div></div>'));

  /* 23 what's real */
  P.push(page('About this demo', 'What is working, what is sample, what needs checking',
    '', '<div class="cols c3" style="margin-top:14px">' +
    '<div class="box"><h3>' + ic('check', 's18 c-good') + 'Working in the clickable demo</h3><ul><li>All 34 screens and navigation between them</li><li>The Orchard Doctor engine: real scoring and question choice for leaves, fruit, flowers, bark and roots</li><li>Language switch with right-to-left Urdu and Kashmiri modes</li><li>Chart hover, toasts, bookings and booking states</li></ul></div>' +
    '<div class="box"><h3>' + ic('info', 's18 c-sky') + 'Sample data</h3><ul><li>All names, providers, prices, mandi rates, freight, headlines and reviews</li><li>Weather, disease risk and highway status</li><li>Likelihood values in the question bank</li><li>Product brands (shown as Brand A, B, C)</li></ul></div>' +
    '<div class="box"><h3>' + ic('alert', 's18 c-warn') + 'To verify before launch</h3><ul><li>Doses now follow the SKUAST-K 2026 guide, read from a copy of the booklet: check against the printed booklet and product labels</li><li>Kashmiri voice recordings by native speakers</li><li>Legal review: pesticide sales licensing, DPDP consent, platform-worker rules</li><li>The name "Baghbaan" (trademark search)</li></ul></div></div>' +
    '<div class="box mist" style="margin-top:16px"><h3>' + ic('file', 's18') + 'Companion documents</h3><p>The research and integration plan covers the market, the data sources and APIs, the technologies, datasets, regulations, competitors and partners in detail.' + (DEMO_URL ? ' Clickable demo: <b>' + DEMO_URL + '</b>.' : '') + ' Source code: <b>prototype/</b> in the project repository.</p></div>'));

  /* 24 thanks */
  pageNo++;
  P.push('<section class="pg cover"><span class="chinarbg">' + A.chinar(560, '#fff') + '</span><div class="in" style="display:flex;flex-direction:column;justify-content:center;padding-bottom:30mm">' + A.logo(72) +
    '<h1 style="font-size:56px">Bagh ka har kaam,<br>ek app mein.</h1><p class="ctag" style="max-width:34ch">Every orchard job, in one app. Next step: put this demo in front of twenty growers in Shopian and Sopore, and let them tell us what to change.</p></div>' +
    '<p class="cmeta"><b>Baghbaan</b> · concept demo v0.1 · November 2026</p></section>');

  document.getElementById('pages').innerHTML = P.join('');
})();
