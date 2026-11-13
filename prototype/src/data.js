/* Baghbaan prototype — demo content. Every price, rate, name and headline here is SAMPLE data for the prototype. */
(function (G) {
  const D = {};

  D.demoDate = 'Tue, 12 May';
  D.user = { name: 'Ghulam Nabi', initials: 'GN', village: 'Wachi', district: 'Shopian' };
  D.orchard = {
    total: 25,
    blocks: [
      { id: 'A', name: 'Home orchard', kind: 'Traditional', kanal: 20, trees: '~240 trees', age: '25 yrs', vars: 'Delicious · American Trel · Maharaji', root: 'Seedling rootstock' },
      { id: 'B', name: 'New block', kind: 'High-density', kanal: 5, trees: '~560 plants', age: 'Planted 2023', vars: 'Gala · Scarlet Spur II', root: 'M9, 3 × 1.5 m, trellis + drip' }
    ]
  };

  /* ---------- i18n (prototype covers the main strings) ---------- */
  D.T = {
    en: { home: 'Home', buy: 'Buy', learn: 'Learn', mandi: 'Mandi', services: 'Services', hello: 'Assalamu Alaikum', ask: "What's troubling your orchard today?", askSub: "Answer a few Yes / No questions. We'll find the cause and what to do.", start: 'Start', yes: 'Yes', no: 'No', unsure: 'Not sure', listen: 'Listen', today: 'Today in your orchard' },
    ur: { home: 'گھر', buy: 'خریدیں', learn: 'سیکھیں', mandi: 'منڈی', services: 'خدمات', hello: 'السلام علیکم', ask: 'آج آپ کے باغ میں کیا مسئلہ ہے؟', askSub: 'چند ہاں / نہیں سوالوں کے جواب دیں۔ ہم وجہ اور علاج بتائیں گے۔', start: 'شروع کریں', yes: 'ہاں', no: 'نہیں', unsure: 'پتہ نہیں', listen: 'سنیں', today: 'آج آپ کے باغ میں' },
    hi: { home: 'घर', buy: 'ख़रीदें', learn: 'सीखें', mandi: 'मंडी', services: 'सेवाएँ', hello: 'अस्सलामु अलैकुम', ask: 'आज आपके बाग़ में क्या परेशानी है?', askSub: 'कुछ हाँ / नहीं सवालों के जवाब दें। हम कारण और इलाज बताएँगे।', start: 'शुरू करें', yes: 'हाँ', no: 'नहीं', unsure: 'पता नहीं', listen: 'सुनें', today: 'आज आपके बाग़ में' }
  };
  D.T.ks = D.T.ur; /* Kashmiri mode: Kashmiri voice + Urdu-script text (see report) */
  D.langs = [
    { id: 'ks', native: 'کٲشُر', name: 'Kashmiri', note: 'Voice in Kashmiri · text in Urdu script', rtl: true },
    { id: 'ur', native: 'اردو', name: 'Urdu', note: 'Text and voice', rtl: true },
    { id: 'hi', native: 'हिन्दी', name: 'Hindi', note: 'Text and voice', rtl: false },
    { id: 'en', native: 'English', name: 'English', note: 'Text and voice', rtl: false }
  ];

  /* ---------- Orchard Doctor knowledge base ---------- */
  D.areas = [
    { id: 'leaves', name: 'Leaves', sub: 'spots, colour, curl', art: ['leaf', 'healthy'] },
    { id: 'fruit', name: 'Fruit', sub: 'spots, cracks, marks', art: ['fruit', 'healthy'] },
    { id: 'flowers', name: 'Flowers', sub: 'bloom, fruit set', art: ['flowers', 'healthy'] },
    { id: 'bark', name: 'Branches & bark', sub: 'cotton, crust, holes', art: ['bark', 'healthy'] },
    { id: 'roots', name: 'Roots & whole tree', sub: 'drying, weak tree', art: ['tree', 'sick'] }
  ];
  /* prior = how common in mid-May in the higher belt of South Kashmir (prototype values) */
  D.conditions = {
    scab: { name: 'Apple scab', sci: 'Venturia inaequalis', areas: ['leaves', 'fruit'], prior: .30, art: ['leaf', 'scab'], season: 'Apr–Jun, after rain', kind: 'Fungal disease',
      now: ['Spray a scab fungicide before Wednesday\'s rain. Your last spray was 9 days ago (3 May).', 'Pick a product from the SKUAST-K schedule for the petal-fall stage. Do not repeat Mancozeb (group M3), which you used last time.', 'Cover both sides of the leaves and the young fruit. Spray in the calm morning window (6–11 AM).'],
      prevent: ['At leaf fall in autumn, spray 5% urea on the leaves or rake and destroy fallen leaves. The fungus survives winter in them.', 'Prune to open the canopy so leaves dry faster after rain.', 'Start protection at green tip next spring; the app will remind you before each rain.'],
      also: [['alternaria', 'Spots are small, round and brown with a darker ring'], ['marssonina', 'Dark blotches in July–Aug, leaves turn yellow and drop']],
      products: ['dodine', 'captan', 'difeno'] },
    alternaria: { name: 'Alternaria leaf blotch', sci: 'Alternaria mali', areas: ['leaves'], prior: .05, art: ['leaf', 'alternaria'], season: 'Jun–Aug, warm & humid', kind: 'Fungal disease',
      now: ['Spray a fungicide listed for Alternaria in the SKUAST-K schedule.', 'Check for mites too. Mite-damaged leaves get Alternaria more easily.'], prevent: ['Keep mites under control in June–July.', 'Balanced nutrition; avoid excess nitrogen.'], also: [['scab', 'Velvety olive spots after spring rain'], ['marssonina', 'Large dark blotches, yellowing, early leaf fall']], products: ['trifloxy', 'mancozeb'] },
    marssonina: { name: 'Marssonina blotch (premature leaf fall)', sci: 'Diplocarpon coronariae', areas: ['leaves'], prior: .03, art: ['leaf', 'marssonina'], season: 'Jul–Sep, after wet spells', kind: 'Fungal disease',
      now: ['Spray a fungicide listed for premature leaf fall in the SKUAST-K schedule.', 'Collect and destroy fallen leaves.'], prevent: ['Keep sprays on time in June–August, especially after rain.', 'Urea spray at leaf fall also reduces carry-over.'], also: [['alternaria', 'Small round spots with a ring'], ['mites', 'Bronze, dusty leaves']], products: ['trifloxy', 'mancozeb'] },
    mildew: { name: 'Powdery mildew', sci: 'Podosphaera leucotricha', areas: ['leaves', 'flowers'], prior: .12, art: ['leaf', 'mildew'], season: 'Apr–Jun, new shoots', kind: 'Fungal disease',
      now: ['Cut out white, infected shoot tips and remove them from the orchard.', 'Spray a fungicide listed for powdery mildew.'], prevent: ['Remove infected shoots during winter pruning.'], also: [['aphids', 'Curled leaves with sticky liquid']], products: ['difeno'] },
    mites: { name: 'Red spider mite / European red mite', sci: 'Panonychus ulmi, Tetranychus urticae', areas: ['leaves'], prior: .07, art: ['leaf', 'mites'], season: 'Jun–Aug, hot & dry', kind: 'Pest',
      now: ['Do the 20-leaf check: look under 20 leaves with a hand lens. Spray only if you find mites on most leaves.', 'Use a mite killer (acaricide) from the schedule. Rotate groups.'], prevent: ['Horticultural oil at dormant / green-tip stage kills overwintering eggs.', 'Avoid unnecessary insecticides that kill the mites\' natural enemies.'], also: [['alternaria', 'Brown spots with a ring']], products: ['hexy', 'hmo'] },
    aphids: { name: 'Aphids (green / rosy apple aphid)', sci: 'Aphis pomi, Dysaphis plantaginea', areas: ['leaves'], prior: .14, art: ['leaf', 'aphids'], season: 'Apr–Jun', kind: 'Pest',
      now: ['If only a few shoots are affected, cut them off or wash with water.', 'Spray an insecticide listed for aphids only if many shoots are curled. Never spray insecticides during bloom.'], prevent: ['Protect ladybirds and hoverflies; they eat aphids.'], also: [['mildew', 'White powder on shoot tips']], products: ['neem'] },
    caterpillars: { name: 'Leaf-eating caterpillars', sci: 'Gypsy moth, tent caterpillar', areas: ['leaves'], prior: .08, art: ['leaf', 'holes'], season: 'Apr–Jun', kind: 'Pest',
      now: ['Remove and destroy caterpillar nests and egg masses by hand.', 'Spray a listed insecticide if damage is spreading.'], prevent: ['Scrape egg masses off bark in winter.'], also: [], products: ['neem'] },
    zinc: { name: 'Zinc deficiency (little leaf)', sci: 'Nutrient disorder', areas: ['leaves'], prior: .06, art: ['leaf', 'zinc'], season: 'Spring growth', kind: 'Nutrient',
      now: ['Spray zinc sulphate as per the schedule.', 'Get a soil test to confirm.'], prevent: ['Add well-rotted manure every year.'], also: [], products: ['zinc'] },
    burn: { name: 'Spray injury (phytotoxicity)', sci: 'Chemical burn', areas: ['leaves', 'fruit'], prior: .05, art: ['leaf', 'burn'], season: 'Any time', kind: 'Spray problem',
      now: ['Do not spray again on these trees for a week.', 'Check the dose and mixing in your spray diary. Too strong a mix or mixing products that do not go together causes burns.'], prevent: ['Use the dose calculator. Spray in cool hours.'], also: [], products: [] },
    bitterpit: { name: 'Bitter pit (calcium shortage)', sci: 'Nutrient disorder', areas: ['fruit'], prior: .05, art: ['fruit', 'bitterpit'], season: 'Pre-harvest & storage', kind: 'Nutrient',
      now: ['Sort out spotted fruit before storage.', 'Plan calcium sprays during fruit growth next season.'], prevent: ['Avoid heavy pruning and too much nitrogen. Keep crop load even.'], also: [['hail', 'Dents after a storm']], products: ['calcium'] },
    sooty: { name: 'Sooty blotch & flyspeck', sci: 'Fungal complex', areas: ['fruit'], prior: .05, art: ['fruit', 'sooty'], season: 'Jul–Oct, wet weather', kind: 'Fungal disease',
      now: ['Marks are on the skin only. Fruit can be cleaned for sale.', 'Keep summer sprays on time.'], prevent: ['Prune for air flow.'], also: [], products: ['captan'] },
    sjs: { name: 'San Jose scale', sci: 'Quadraspidiotus perniciosus', areas: ['fruit', 'bark'], prior: .12, art: ['fruit', 'sjs'], season: 'All year', kind: 'Pest',
      now: ['Mark affected trees for a dormant-oil spray.', 'Cut out badly crusted branches.'], prevent: ['Horticultural mineral oil at the dormant / silver-tip stage.'], also: [['woolly', 'White cotton masses']], products: ['hmo'] },
    hail: { name: 'Hail injury', sci: 'Weather damage', areas: ['fruit'], prior: .20, art: ['fruit', 'hail'], season: 'Apr–Jul storms', kind: 'Weather',
      now: ['Photograph the damage today. Dated photos help with any relief claim.', 'A protective fungicide spray within 24 h helps prevent rot entering the wounds.'], prevent: ['Anti-hail nets. The app warns you before storms.'], also: [], products: ['captan'] },
    crack: { name: 'Fruit cracking', sci: 'Boron shortage or uneven water', areas: ['fruit'], prior: .05, art: ['fruit', 'crack'], season: 'Fruit growth', kind: 'Nutrient',
      now: ['Check boron in your soil test; spray boron as per the schedule.', 'Water evenly in dry spells.'], prevent: ['Mulch around trees to keep moisture even.'], also: [], products: ['boron'] },
    frost: { name: 'Frost injury at bloom', sci: 'Weather damage', areas: ['flowers'], prior: .25, art: ['flowers', 'frost'], season: 'Bloom', kind: 'Weather',
      now: ['Nothing can save flowers with black centres. Do not spray to "cure" them.', 'Count healthy flowers before planning thinning.'], prevent: ['The app sends frost alerts the evening before.'], also: [['pollination', 'Flowers fall without setting fruit']], products: [] },
    pollination: { name: 'Poor pollination', sci: 'Few pollinizers or bees', areas: ['flowers'], prior: .35, art: ['flowers', 'fallen'], season: 'Bloom', kind: 'Orchard management',
      now: ['Book beehives for next bloom (2–3 per acre is a common rule of thumb).', 'Never spray insecticides during bloom.'], prevent: ['Plant or graft pollinizer varieties (about 1 in 9 trees).'], also: [['frost', 'Black flower centres after a cold night']], products: [] },
    woolly: { name: 'Woolly apple aphid', sci: 'Eriosoma lanigerum', areas: ['bark', 'roots'], prior: .30, art: ['bark', 'woolly'], season: 'All year', kind: 'Pest',
      now: ['Brush off the colonies on cuts and wounds.', 'Use an insecticide listed for woolly aphid if colonies are many; root colonies need a soil treatment.'], prevent: ['Plant on resistant rootstocks (MM106, MM111) in new orchards.'], also: [['sjs', 'Grey crusty bumps on bark']], products: ['neem'] },
    canker: { name: 'Canker (smoky blight, papery bark)', sci: 'Fungal canker', areas: ['bark'], prior: .25, art: ['bark', 'canker'], season: 'All year', kind: 'Fungal disease',
      now: ['Scrape the dead bark back to healthy wood and paint the wound with a fungicide paste.', 'Burn the removed bark; do not leave it in the orchard.'], prevent: ['Paint all big pruning cuts. Avoid bark injuries.'], also: [['borer', 'Holes with sawdust']], products: ['captan'] },
    borer: { name: 'Apple stem borer', sci: 'Aeolesthes sarta', areas: ['bark'], prior: .15, art: ['bark', 'borer'], season: 'All year', kind: 'Pest',
      now: ['Clean the hole with a wire to kill the grub.', 'Plug the hole with cotton soaked in a listed insecticide and seal with mud.'], prevent: ['Check trunks every month in summer.'], also: [], products: [] },
    collar: { name: 'Collar rot', sci: 'Phytophthora cactorum', areas: ['roots'], prior: .30, art: ['roots', 'collar'], season: 'Wet soils, spring & autumn', kind: 'Fungal disease',
      now: ['Remove soil from the trunk base, scrape the rotten bark and paint with a listed fungicide paste.', 'Improve drainage so water does not stand near the trunk.'], prevent: ['Do not pile manure against the trunk. Trichoderma with manure helps.'], also: [['rootrot', 'White threads on roots, sudden wilting']], products: ['tricho'] },
    rootrot: { name: 'White root rot', sci: 'Dematophora necatrix', areas: ['roots'], prior: .25, art: ['roots', 'rootrot'], season: 'Summer', kind: 'Fungal disease',
      now: ['Call an expert. White root rot spreads through soil to nearby trees.', 'Drench the root zone of affected and neighbouring trees as advised.'], prevent: ['Dig a trench around infected trees to stop spread. Trichoderma helps.'], also: [['collar', 'Rotten bark at soil level']], products: ['tricho'] },
    rootborer: { name: 'Root borer', sci: 'Dorysthenes hugelii', areas: ['roots'], prior: .20, art: ['roots', 'grubs'], season: 'Summer', kind: 'Pest',
      now: ['Dig and destroy the grubs around the tree.', 'Ask an expert about a soil treatment.'], prevent: ['Collect adult beetles at night in June–July.'], also: [], products: [] }
  };
  /* p = probability of a "Yes" answer when the condition is present; dflt for all other conditions */
  D.questions = [
    { id: 'velvety', area: 'leaves', q: 'Are there olive-green to black spots with a soft, velvety look?', art: [['leaf', 'scab', 'Like this'], ['leaf', 'alternaria', 'Not like this']], p: { scab: .9, alternaria: .12, marssonina: .2 }, dflt: .03 },
    { id: 'fruit_too', area: 'leaves', q: 'Do you also see dark, rough spots on the young fruit?', art: [['fruit', 'scab', 'Dark, rough spots'], ['fruit', 'healthy', 'Clean fruit']], p: { scab: .78, alternaria: .08 }, dflt: .05 },
    { id: 'after_rain', area: 'leaves', q: 'Did it start after rainy days this spring?', art: [['icon', 'rain', 'Rainy spell'], ['icon', 'sun', 'Dry weather']], p: { scab: .85, mildew: .35, alternaria: .3, marssonina: .45, aphids: .3 }, dflt: .25 },
    { id: 'frogeye', area: 'leaves', q: 'Are the spots small, round and brown, some with a darker ring?', art: [['leaf', 'alternaria', 'Like this'], ['leaf', 'scab', 'Not like this']], p: { alternaria: .88, marssonina: .25, scab: .12, burn: .2 }, dflt: .03 },
    { id: 'blotch', area: 'leaves', q: 'Do leaves get dark brown patches, then turn yellow and fall early?', art: [['leaf', 'marssonina', 'Like this'], ['leaf', 'healthy', 'Healthy leaf']], p: { marssonina: .9, alternaria: .45, mites: .3, scab: .25 }, dflt: .05 },
    { id: 'powder', area: 'leaves', q: 'Is there a white powder on young leaves or shoot tips?', art: [['leaf', 'mildew', 'White powder'], ['leaf', 'healthy', 'Healthy leaf']], p: { mildew: .95 }, dflt: .03 },
    { id: 'bronze', area: 'leaves', q: 'Do leaves look dull or bronze, with tiny moving dots underneath?', art: [['leaf', 'mites', 'Bronze, dusty'], ['leaf', 'healthy', 'Healthy leaf']], p: { mites: .92, alternaria: .1 }, dflt: .05 },
    { id: 'curl', area: 'leaves', q: 'Are young leaves curled, with sticky liquid or ants?', art: [['leaf', 'aphids', 'Curled, sticky'], ['leaf', 'healthy', 'Healthy leaf']], p: { aphids: .92, mildew: .25, zinc: .1 }, dflt: .04 },
    { id: 'holes', area: 'leaves', q: 'Are leaves eaten, with holes or caterpillars?', art: [['leaf', 'holes', 'Eaten leaves'], ['leaf', 'healthy', 'Healthy leaf']], p: { caterpillars: .95 }, dflt: .04 },
    { id: 'small', area: 'leaves', q: 'Are new leaves very small and bunched at the shoot tips?', art: [['leaf', 'zinc', 'Small, bunched'], ['leaf', 'healthy', 'Normal leaf']], p: { zinc: .9, mildew: .15, aphids: .1 }, dflt: .03 },
    { id: 'after_spray', area: 'leaves', q: 'Did the marks appear 1–3 days after a spray?', art: [['leaf', 'burn', 'Burnt edges'], ['icon', 'spray', 'After spraying']], p: { burn: .9 }, dflt: .1 },
    { id: 'f_scab', area: 'fruit', q: 'Are there dark, rough, corky spots on the fruit, some cracked?', art: [['fruit', 'scab', 'Like this'], ['fruit', 'healthy', 'Clean fruit']], p: { scab: .9, hail: .15, crack: .3 }, dflt: .05 },
    { id: 'f_pit', area: 'fruit', q: 'Are there small sunken brown spots, mostly near the bottom?', art: [['fruit', 'bitterpit', 'Like this'], ['fruit', 'healthy', 'Clean fruit']], p: { bitterpit: .9, hail: .25, sjs: .1 }, dflt: .05 },
    { id: 'f_smudge', area: 'fruit', q: 'Are there grey-black smudges or tiny black dots that rub off?', art: [['fruit', 'sooty', 'Like this'], ['fruit', 'healthy', 'Clean fruit']], p: { sooty: .92 }, dflt: .03 },
    { id: 'f_halo', area: 'fruit', q: 'Are there red spots, each with a tiny grey dot in the middle?', art: [['fruit', 'sjs', 'Like this'], ['fruit', 'healthy', 'Clean fruit']], p: { sjs: .92 }, dflt: .04 },
    { id: 'f_storm', area: 'fruit', q: 'Did the marks appear after a hailstorm?', art: [['fruit', 'hail', 'Dents, bruises'], ['icon', 'hail', 'Hailstorm']], p: { hail: .95 }, dflt: .05 },
    { id: 'f_crack', area: 'fruit', q: 'Is the fruit cracking open?', art: [['fruit', 'crack', 'Cracks'], ['fruit', 'healthy', 'Clean fruit']], p: { crack: .85, scab: .35 }, dflt: .05 },
    { id: 'b_black', area: 'flowers', q: 'After a cold night, are flower centres turning black?', art: [['flowers', 'frost', 'Black centres'], ['flowers', 'healthy', 'Healthy bloom']], p: { frost: .92 }, dflt: .05 },
    { id: 'b_noset', area: 'flowers', q: 'Are flowers falling off without setting fruit?', art: [['flowers', 'fallen', 'Flowers dropping'], ['flowers', 'healthy', 'Healthy bloom']], p: { pollination: .85, frost: .5 }, dflt: .1 },
    { id: 'b_bees', area: 'flowers', q: 'Were there few bees, or cold and rain, during bloom?', art: [['icon', 'bee', 'Few bees'], ['icon', 'rain', 'Cold, rainy bloom']], p: { pollination: .85, frost: .5 }, dflt: .2 },
    { id: 'b_powder', area: 'flowers', q: 'Is there white powder on the flower clusters?', art: [['flowers', 'mildew', 'White powder'], ['flowers', 'healthy', 'Healthy bloom']], p: { mildew: .9 }, dflt: .03 },
    { id: 'k_cotton', area: 'bark', q: 'Are there white, cotton-like masses on bark, cuts or wounds?', art: [['bark', 'woolly', 'Like this'], ['bark', 'healthy', 'Clean bark']], p: { woolly: .95 }, dflt: .03 },
    { id: 'k_crust', area: 'bark', q: 'Is the bark covered with tiny grey, crusty bumps?', art: [['bark', 'sjs', 'Like this'], ['bark', 'healthy', 'Clean bark']], p: { sjs: .9 }, dflt: .05 },
    { id: 'k_sunken', area: 'bark', q: 'Are there sunken, cracked or peeling patches of dead bark?', art: [['bark', 'canker', 'Like this'], ['bark', 'healthy', 'Clean bark']], p: { canker: .9, borer: .2 }, dflt: .05 },
    { id: 'k_holes', area: 'bark', q: 'Are there holes with sawdust-like powder below them?', art: [['bark', 'borer', 'Like this'], ['bark', 'healthy', 'Clean bark']], p: { borer: .93 }, dflt: .04 },
    { id: 'r_collar', area: 'roots', q: 'Is the bark at soil level brown, soft or rotting?', art: [['roots', 'collar', 'Like this'], ['roots', 'healthy', 'Healthy base']], p: { collar: .9, rootrot: .3, rootborer: .2 }, dflt: .05 },
    { id: 'r_threads', area: 'roots', q: 'Dig near the roots: are there white fungal threads on them?', art: [['roots', 'rootrot', 'White threads'], ['roots', 'healthy', 'Clean roots']], p: { rootrot: .9, collar: .2, rootborer: .05 }, dflt: .05 },
    { id: 'r_grubs', area: 'roots', q: 'Do you find big white grubs feeding on the roots?', art: [['roots', 'grubs', 'Like this'], ['roots', 'healthy', 'Clean roots']], p: { rootborer: .92 }, dflt: .05 },
    { id: 'r_wet', area: 'roots', q: 'Does water stand in this part of the orchard after rain?', art: [['roots', 'wet', 'Standing water'], ['roots', 'healthy', 'Drains well']], p: { collar: .75, rootrot: .55, rootborer: .2 }, dflt: .3 },
    { id: 'k_wa_roots', area: 'roots', q: 'Are there white cotton-like masses or knots on the roots?', art: [['bark', 'woolly', 'Cotton masses'], ['roots', 'healthy', 'Clean roots']], p: { woolly: .9 }, dflt: .04 }
  ];

  /* ---------- Shop ---------- */
  D.cats = [
    ['fung', 'Fungicides', 'shield'], ['insect', 'Insecticides', 'bug'], ['mite', 'Mite control', 'target'], ['oil', 'Spray oils', 'drop'],
    ['fert', 'Fertilizers', 'sack'], ['micro', 'Micro-nutrients', 'beaker'], ['org', 'Organic & bio', 'sprout'], ['tools', 'Tools & sprayers', 'scissors'],
    ['hail', 'Hail nets', 'grid'], ['pack', 'Packing', 'box'], ['plants', 'Saplings', 'tree'], ['safety', 'Safety kit', 'shield']
  ];
  /* prices are sample prices for the prototype */
  D.products = {
    dodine: { name: 'Dodine 65% WP', for: 'Scab — protects and stops new infections', group: 'FRAC U12', cat: 'fung', pack: ['pouch', '#2E6FA3', 'DODINE|65% WP'], size: '250 g', price: 495, mrp: 560, rating: 4.4, n: 212, claim: 'Apple scab', stages: ['Green tip', 'Pink bud', 'Petal fall'], dose: 60, doseUnit: 'g', phi: 'See label', brands: [['Brand A', 495], ['Brand B', 520], ['Brand C', 548]] },
    captan: { name: 'Captan 50% WP', for: 'Scab and fruit rots — protective', group: 'FRAC M4', cat: 'fung', pack: ['pouch', '#C2621A', 'CAPTAN|50% WP'], size: '500 g', price: 345, mrp: 390, rating: 4.2, n: 188, claim: 'Apple scab', stages: ['Petal fall', 'Fruit set'], dose: 300, doseUnit: 'g' },
    mancozeb: { name: 'Mancozeb 75% WP', for: 'Scab, leaf spots — protective', group: 'FRAC M3', cat: 'fung', pack: ['pouch', '#B8862B', 'MANCOZEB|75% WP'], size: '1 kg', price: 520, mrp: 580, rating: 4.3, n: 341, claim: 'Apple scab', stages: ['Green tip', 'Petal fall', 'Fruit growth'], dose: 300, doseUnit: 'g', lastUsed: true },
    difeno: { name: 'Difenoconazole 25% EC', for: 'Scab, powdery mildew — stops early infection', group: 'FRAC 3', cat: 'fung', pack: ['bottle', '#7A2E8C', 'DIFENO|25% EC'], size: '250 ml', price: 765, mrp: 840, rating: 4.5, n: 156, claim: 'Scab, powdery mildew', stages: ['Pink bud', 'Petal fall'], dose: 30, doseUnit: 'ml' },
    trifloxy: { name: 'Trifloxystrobin 25% + Tebuconazole 50% WG', for: 'Scab, Alternaria, leaf fall', group: 'FRAC 11 + 3', cat: 'fung', pack: ['pouch', '#1C6A46', 'TRIFLOXY|+ TEBU WG'], size: '100 g', price: 540, mrp: 610, rating: 4.6, n: 97, claim: 'Scab, Alternaria', stages: ['Fruit growth'], dose: 40, doseUnit: 'g' },
    hexy: { name: 'Hexythiazox 5.45% EC', for: 'Mites — kills eggs and young mites', group: 'IRAC 10A', cat: 'mite', pack: ['bottle', '#B3261E', 'HEXY|5.45 EC'], size: '250 ml', price: 690, mrp: 760, rating: 4.3, n: 74, claim: 'Red spider mite', stages: ['Fruit growth'], dose: 40, doseUnit: 'ml' },
    hmo: { name: 'Horticultural mineral oil', for: 'San Jose scale, mite eggs — dormant spray', group: 'Oil', cat: 'oil', pack: ['can', '#C2A23A', 'SPRAY|OIL'], size: '5 L', price: 1150, mrp: 1290, rating: 4.4, n: 263, claim: 'Scale, mite eggs', stages: ['Dormant', 'Green tip'], dose: 2, doseUnit: 'L' },
    neem: { name: 'Neem oil 1500 ppm', for: 'Aphids, caterpillars — organic', group: 'Organic', cat: 'org', pack: ['bottle', '#4E7A2E', 'NEEM|OIL'], size: '1 L', price: 420, mrp: 470, rating: 4.0, n: 118, claim: 'Soft-bodied insects', stages: ['Any'], dose: 500, doseUnit: 'ml', organic: true },
    tricho: { name: 'Trichoderma (bio-fungicide)', for: 'Collar & root rot — mix with manure', group: 'Biological', cat: 'org', pack: ['bag', '#6E8E3A', 'TRICHO|1 kg'], size: '1 kg', price: 260, mrp: 300, rating: 4.1, n: 66, claim: 'Soil-borne rots', stages: ['Spring', 'Autumn'], organic: true },
    urea: { name: 'Urea 46% N (neem coated)', for: 'Nitrogen for growth', group: 'Fertilizer', cat: 'fert', pack: ['bag', '#E8E2D0', 'UREA|45 kg'], size: '45 kg', price: 267, mrp: 267, rating: 4.5, n: 512, claim: 'Govt. fixed MRP', stages: ['Spring'] },
    dap: { name: 'DAP 18-46-0', for: 'Phosphorus at planting & spring', group: 'Fertilizer', cat: 'fert', pack: ['bag', '#2E6FA3', 'DAP|50 kg'], size: '50 kg', price: 1350, mrp: 1350, rating: 4.4, n: 290, claim: 'Govt. fixed MRP', stages: ['Spring'] },
    mop: { name: 'MOP — Potash 60%', for: 'Fruit size and colour', group: 'Fertilizer', cat: 'fert', pack: ['bag', '#B3261E', 'MOP|50 kg'], size: '50 kg', price: 1750, mrp: 1800, rating: 4.3, n: 201, claim: 'Potassium', stages: ['Spring'] },
    boron: { name: 'Boron 20% (disodium octaborate)', for: 'Fruit set, cracking, corky core', group: 'Micro-nutrient', cat: 'micro', pack: ['pouch', '#4A5C51', 'BORON|20%'], size: '1 kg', price: 310, mrp: 350, rating: 4.2, n: 143, claim: 'Boron', stages: ['Pink bud', 'Petal fall'] },
    zinc: { name: 'Zinc sulphate 21%', for: 'Little leaf, rosette', group: 'Micro-nutrient', cat: 'micro', pack: ['pouch', '#6B7B86', 'ZINC|21%'], size: '1 kg', price: 140, mrp: 160, rating: 4.1, n: 87, claim: 'Zinc', stages: ['Dormant', 'Spring'] },
    calcium: { name: 'Calcium chloride (spray grade)', for: 'Bitter pit, storage life', group: 'Micro-nutrient', cat: 'micro', pack: ['pouch', '#8A9AA8', 'CALCIUM|CHLORIDE'], size: '1 kg', price: 180, mrp: 210, rating: 4.0, n: 59, claim: 'Calcium', stages: ['Fruit growth'] },
    sprayer: { name: 'HTP power sprayer (petrol)', for: 'For 200 L drum, 2 guns', group: 'Equipment', cat: 'tools', pack: ['tool', '#1C6A46', 'spray'], size: '1 unit', price: 18500, mrp: 21000, rating: 4.3, n: 41, claim: '1-year warranty', stages: ['Any'] },
    pruner: { name: 'Pruning secateurs (forged)', for: 'Clean cuts up to 20 mm', group: 'Tool', cat: 'tools', pack: ['tool', '#4A5C51', 'scissors'], size: '1 unit', price: 690, mrp: 850, rating: 4.5, n: 133, claim: 'Replaceable blade', stages: ['Winter'] },
    carton: { name: 'Universal apple carton', for: 'Standard size, 5-ply', group: 'Packing', cat: 'pack', pack: ['carton'], size: '100 pcs', price: 4200, mrp: 4500, rating: 4.1, n: 64, claim: 'Bulk discounts', stages: ['Harvest'] },
    m9: { name: 'Feathered plant on M9', for: 'Gala / Fuji / Scarlet Spur — certified nursery', group: 'Sapling', cat: 'plants', pack: ['plant'], size: '1 plant', price: 450, mrp: 520, rating: 4.4, n: 52, claim: 'Virus-tested stock', stages: ['Mar planting'] }
  };

  /* ---------- Learn ---------- */
  D.topics = [
    ['Orchard calendar', 'cal', 12], ['Soil & manure', 'beaker', 9], ['Planting & varieties', 'sprout', 11], ['High-density orchards', 'grid', 14],
    ['Pruning & training', 'scissors', 10], ['Pests & diseases', 'bug', 24], ['Safe spraying', 'shield', 8], ['Water & drip', 'drop', 6],
    ['Bees & pollination', 'bee', 5], ['Harvest & storage', 'box', 9], ['Selling smart', 'chart', 7], ['Schemes & insurance', 'file', 8]
  ];
  D.calendar = [
    ['Dec–Feb', 'Dormant', ['Prune; paint big cuts', 'Apply well-rotted manure', 'Scrape canker and egg masses']],
    ['Mar', 'Silver tip → green tip', ['Horticultural oil for scale & mite eggs', 'First scab protection at green tip', 'Fertilizer as per soil test']],
    ['Apr', 'Pink bud → bloom', ['Scab spray at pink bud', 'Beehives in the orchard', 'No insecticides during bloom']],
    ['May', 'Petal fall → fruit set', ['Petal-fall spray', 'Watch for aphids & mildew', 'Plan thinning']],
    ['Jun', 'Fruitlet', ['Thin fruit clusters', 'Mite checks start', 'Scab & leaf spot cover sprays']],
    ['Jul–Aug', 'Fruit growth', ['Watch Alternaria & leaf fall', 'Calcium sprays for storage', 'Irrigate in dry spells']],
    ['Aug–Oct', 'Harvest', ['Pick by maturity, not date', 'Grade and pack', 'Book trucks / CA storage']],
    ['Nov', 'Leaf fall', ['5% urea on leaves against scab', 'Collect fallen leaves', 'Soil test before manure']]
  ];
  D.library = [
    ['scab', 'Apple scab', 'Leaves & fruit', 'Apr–Jun', 'risk'], ['alternaria', 'Alternaria leaf blotch', 'Leaves', 'Jun–Aug', 'warn'],
    ['marssonina', 'Premature leaf fall', 'Leaves', 'Jul–Sep', 'warn'], ['mildew', 'Powdery mildew', 'Shoots & flowers', 'Apr–Jun', 'warn'],
    ['mites', 'Red spider mite', 'Leaves', 'Jun–Aug', 'neutral'], ['woolly', 'Woolly apple aphid', 'Bark & roots', 'All year', 'neutral'],
    ['sjs', 'San Jose scale', 'Bark & fruit', 'All year', 'neutral'], ['collar', 'Collar rot', 'Trunk base', 'Wet soils', 'neutral'],
    ['canker', 'Canker', 'Bark', 'All year', 'neutral']
  ];

  /* ---------- Mandi (sample rates, ₹ per kg, Delicious A grade, CA stored) ---------- */
  D.mandis = [
    ['Sopore', 'Baramulla', 92, 3], ['Shopian', 'Aglar', 90, 2], ['Parimpora', 'Srinagar', 89, 1],
    ['Narwal', 'Jammu', 98, -2], ['Azadpur', 'Delhi', 112, 4], ['Bengaluru', 'Karnataka', 124, 1]
  ];
  D.trend = [84, 85, 84, 86, 85, 87, 86, 86, 88, 87, 86, 88, 89, 88, 90, 89, 88, 89, 90, 91, 90, 89, 90, 91, 92, 91, 90, 91, 92, 92];
  D.sell = [ /* net ₹ per box (≈16 kg) after freight, commission & unloading — sample */
    ['Azadpur, Delhi', 1545, 'Freight ₹95 · 2 days'], ['Bengaluru', 1490, 'Freight ₹290 · 4 days'], ['Narwal, Jammu', 1395, 'Freight ₹60 · 1 day'], ['Sopore', 1370, 'Local · same day'], ['Shopian', 1350, 'Local · same day']
  ];
  D.weather = [
    ['Today', 'sun', 21, 8, 0], ['Wed', 'rain', 15, 9, 14], ['Thu', 'rain', 17, 7, 4], ['Fri', 'cloudsun', 20, 8, 0], ['Sat', 'sun', 22, 9, 0], ['Sun', 'sun', 23, 10, 0], ['Mon', 'storm', 19, 9, 6]
  ];
  D.news = [
    ['Advisory', 'Scab alert for higher belts after three days of rain', 'Horticulture advisory · 2 h ago', 'risk'],
    ['Schemes', 'High-density plantation subsidy: applications open till 30 June', 'Dept. notice · Yesterday', 'info'],
    ['Roads', 'Fruit trucks to get priority movement on NH-44 during harvest', 'Traffic advisory · Yesterday', 'neutral'],
    ['Quality', 'Spurious pesticides seized — scan the pack QR before you buy', 'District news · 2 days ago', 'warn'],
    ['Market', 'Sopore mandi closed on Friday for cleaning', 'Mandi association · 3 days ago', 'neutral']
  ];

  /* ---------- Services ---------- */
  D.services = [
    ['truck', 'Truck & load carrier', 'truck', 'sky'], ['labour', 'Labour team', 'users', 'leaf'], ['spray', 'Spray service', 'spray', 'leaf'],
    ['equip', 'Tractor & equipment', 'tractor', 'chinar'], ['expert', 'Expert visit', 'cap', 'sky'], ['soil', 'Soil testing', 'beaker', 'chinar'],
    ['ca', 'Cold storage (CA)', 'snow', 'sky'], ['nursery', 'Nursery plants', 'sprout', 'leaf'], ['bees', 'Beehives', 'bee', 'chinar'],
    ['packing', 'Grading & packing', 'box', 'chinar'], ['buyers', 'Sell to buyers', 'handcoins', 'apple'], ['repair', 'Sprayer repair', 'sliders', 'plain']
  ];
  D.teams = [
    { name: 'Ali Mohammad & team', size: 4, rating: 4.8, jobs: 112, dist: '3 km', rate: 750, tags: ['ID verified', 'Own power sprayer'], langs: 'Kashmiri, Urdu' },
    { name: 'Showkat Ahmad & team', size: 6, rating: 4.6, jobs: 86, dist: '5 km', rate: 700, tags: ['ID verified', 'Pruning experts'], langs: 'Kashmiri' },
    { name: 'Rakesh Kumar & team', size: 5, rating: 4.5, jobs: 64, dist: '7 km', rate: 680, tags: ['ID verified', 'Police registration done'], langs: 'Hindi, Urdu' }
  ];
  D.trucks = [
    ['6-wheeler truck', 'Fits ~650 boxes · open body', 95, 'Leaves Thu 6 PM'],
    ['Shared 10-wheeler', 'Your 600 boxes + a neighbour\'s 450', 82, 'Leaves Thu 8 PM'],
    ['Refrigerated truck', 'Fits ~900 boxes · keeps 2–4 °C', 140, 'Leaves Fri 7 AM']
  ];

  G.DATA = D;
})(typeof window !== 'undefined' ? window : globalThis);
