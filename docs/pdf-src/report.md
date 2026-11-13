# Baghbaan: research and integration plan

**An all-in-one app for Kashmir's apple growers: what it should contain, and which tools, data, technologies and partners to build it with.**

Companion to the *Baghbaan demo app walkthrough* (PDF) and the clickable prototype (claude.ai/artifact/T7wV1p9vo63Sqa659bEQCG; source in `prototype/`). Prepared November 2026.

<div class="callout">
<b>How to read this report.</b> Part 1 is the recommendation: what the app should contain and how each part works. Part 2 catalogues what we can integrate: data sources and APIs, technologies, datasets, apps to learn from, competitors and regulations. Part 3 covers architecture, business model, roadmap and risks. Appendices A–C hold the full desk research with a source link next to each fact. Facts marked <b>[V]</b> were read at the source, <b>[S]</b> come from search summaries and should be re-checked, and <b>UNVERIFIED</b> items are leads only. Crop-protection content in section 4 is general practice and must be checked against the current SKUAST-K Package of Practices before anything reaches growers.
</div>

## Summary

- **The opportunity is large and concentrated.** Jammu & Kashmir grew 21.10 lakh tonnes of apple on 1.73 lakh hectares in 2024-25, roughly 70–80% of India's apples. Seven to seven and a half lakh families and about 35 lakh people depend on horticulture, worth ₹10,000–12,000 crore a year (J&K Economic Survey 2025-26; Assembly reply, Sept 2026; Appendix B §1).
- **Growers lose money at five predictable points:** disease (2026 was a bad scab year, with B/C grades selling at ₹200–250 a box at Sopore against ₹1,000–1,300 for premium fruit), spurious inputs, highway closures (the 26 Aug–17 Sep 2025 NH-44 closure stranded 2,000+ trucks; traders put losses at ₹500–700 crore and freight jumped from ₹70–100 to ₹200–300 a box), weak price information, and labour and transport at harvest. There is no crop insurance for apple today (scheme on hold, Sept 2026) (Appendix B §2–5).
- **Recommendation: build Baghbaan around one question, "what is wrong with my orchard and what do I do?"** The home screen is the **Orchard Doctor**, a Yes / No and picture-based diagnosis that works offline. Around it sit **Buy** (licensed-dealer marketplace), **Learn** (short Kashmiri-audio lessons), **Mandi & news** (rates, where-to-sell, highway, rail, weather, advisories) and **Services** (trucks, labour, spray teams, equipment, experts, cold storage). **My orchard** quietly builds a spray diary and orchard record from what growers already do.
- **Design for the real conditions:** voice and pictures first; Kashmiri voice with Urdu-script text; offline-first with SMS and a missed-call voice line, because J&K has had more internet shutdowns than any other part of India; no signup form, and data asked only when it improves an answer.
- **Integrate first:** SKUAST-K's spray schedule as the advice rule base; data.gov.in / Agmarknet mandi prices; IMD and a commercial weather API for spray windows and a Mills-type scab model; Bhashini and IndicTrans2 for Kashmiri; Kashmir-specific CC BY 4.0 leaf-image datasets for a later photo model; J&K Traffic Police advisories plus driver reports for roads; and partnerships with the Department of Horticulture's Kisan Khidmat Ghars for assisted onboarding.
- **Competition exists but leaves the core gap open.** Orchardly (claims 15,000+ growers), Farmit by Qul, Apple Doc and others offer advisory or IoT. None found offers Kashmiri voice, a neutral licensed-dealer marketplace, and labour and transport booking in one app (Appendix C §2).
- **Start with a two-district pilot** (Shopian and Baramulla/Sopore, the two largest dispatch mandis), earn trust with free diagnosis, rates and alerts, then add the marketplace and credit.

# Part 1 · What the app should contain

## 1. The grower and the problem

**Who uses it.** Owners of small family orchards (often 5–40 kanal; 1 hectare ≈ 19.8 kanal), many over fifty, many more comfortable speaking Kashmiri than reading any script; their sons and daughters who handle the phone; younger agriculture graduates running new high-density blocks; and the people around them: dealers, transporters, labour leaders, commission agents and extension staff.

**Where the money is lost.**

| Pain point | What happens today | What the app does |
|---|---|---|
| Disease and pests | Spray decisions come from the dealer or neighbours; sprays are mistimed relative to rain; the same fungicide group is repeated. | Orchard Doctor; weather-driven infection alerts; spray diary with group rotation; dose calculator. |
| Spurious or wrong inputs | Fake or mislabelled packs; products without an apple label claim; over-buying. | Licensed-dealer marketplace; brand comparison of the same molecule; genuine-pack QR check; buy-the-right-quantity. |
| Market information | Prices heard from the commission agent; no view across mandis or net of costs. | Daily rates by variety and grade; 30-day trends; "where should I sell?" net-of-freight calculator; price alerts. |
| Highway and logistics | NH-44 closures strand loaded trucks; freight spikes; no view of rail options. | Highway, Mughal Road and rail status with alerts; truck booking with shared loads; rail parcel option. |
| Labour and services | Phone calls to find teams; unclear rates; trust problems with unknown providers. | Verified, rated providers; fair-rate guides; booking and tracking; pay after work. |
| Knowledge | Package of Practices is a long PDF; extension staff are thinly spread. | Season-aware three-minute lessons with Kashmiri audio; library; calendar; expert escalation. |
| Credit | Informal credit from the dealer, tied to buying from him and settled at harvest. | Pay-after-harvest credit through a regulated lender, linked to the Kisan Credit Card. |

## 2. The app at a glance

Five tabs plus a personal record. Every screen described here is in the clickable prototype.

| Tab | Purpose | Key screens |
|---|---|---|
| **Home · Orchard Doctor** | The main page: today's alerts and the Yes / No diagnosis | Today (alert, crop stage, rates, highway, spray window, labour); Where is the problem?; questions; result; photo check; ask an expert |
| **Buy** | Genuine inputs from licensed dealers | Orchard kit; 12 categories; filtered lists; product (brands, dose, safety, reviews); order and payment; genuine-pack check |
| **Learn** | Practical knowledge, in Kashmiri | Continue; for this season; 12 topics; lesson with steps and quiz; pests & diseases library; orchard year |
| **Mandi & news** | Prices and the conditions that move them | Rates; where to sell; roads and rail; weather and disease risk; advisories, schemes and alerts |
| **Services** | Book help | Trucks and shared loads; labour and spray teams; equipment; expert visit; soil test; cold storage; beehives; nursery plants; buyers; booking tracker |
| **My orchard** (from the avatar) | The grower's own record | Blocks and varieties; spray diary; costs and income; harvest record; pest map; privacy and data |

**Other channels** reach growers the app cannot: SMS keywords (SPRAY, RATE, ROAD), a WhatsApp number, a missed-call voice line in Kashmiri, Urdu and Hindi, assisted sign-up at Kisan Khidmat Ghars, and trained village helpers ("Bagh Mitras").

## 3. Home and the Orchard Doctor (the main page)

### 3.1 Home

The home screen answers "what should I do today?" for this grower's village and altitude:

- **The main question** in a green card: "What's troubling your orchard today?" with Start, a microphone (speak the problem in Kashmiri) and a camera (photo check).
- **Quick chips** for common entry points: spots on leaves, insects and mites, fruit problem, tree drying, what to spray now.
- **An alert with an action**, e.g. "Scab infection risk on Wednesday: 14 mm rain, leaves wet ~18 h at 11–16 °C, your last spray was 9 days ago → Spray before Wednesday noon".
- **Crop stage for this altitude** (dormant → green tip → pink bud → bloom → petal fall → fruitlet → growth → harvest → leaf fall) and the next spray due.
- **Four tiles:** mandi rate and trend, NH-44 status, today's spray window, free spray teams nearby.
- **One quick question a day** (optional, one tap, reason shown): bees seen during bloom? pests seen this week? crop better or worse than last year?

The home content changes with the season: scab and bloom in spring, mites and Alternaria in summer, harvest, trucks and CA storage in autumn, urea on leaves and pruning in late autumn and winter.

### 3.2 How a diagnosis works

1. **Where is the problem?** Leaves, fruit, flowers, branches and bark, roots and whole tree, or "not sure: take a photo".
2. **Yes / No / Not sure questions,** each with two pictures: what a Yes looks like and what a No looks like, plus a Listen button.
3. **A live "narrowing down" panel** showing the top candidates.
4. **One multiple-choice step** for severity (a few trees, about half, most), while the last spray is read from the spray diary rather than asked again.
5. **The result:** most likely cause with match strength and the reasons ("velvety olive-green spots; spots on young fruit"), urgency from the forecast, what to do now, products that fit (registered for apple and on the university schedule), how to prevent it next season, look-alikes to rule out, and buttons to ask an expert or save to the diary.

**The engine.** A small, auditable naive-Bayes model. Each problem has a prior for the season, altitude band and recent nearby reports; each question has the probability of a Yes given each problem, written by experts. After each answer the scores update, and the next question is the one with the largest expected information gain, so most diagnoses end in 2–4 questions. The engine stops at 90% confidence, and hands over to a human when answers conflict, when nothing fits, or for problems that must always go to an expert (root rot, sudden spread, fire-blight-like symptoms). In the demo, two Yes answers move scab from 33% to 91% to 99%.

**Getting smarter.** Expert confirmations and photo labels from real cases re-estimate the likelihoods each season. The question bank is versioned, and each version is signed off by the content partner.

**Photo check (phase 2).** An on-phone image model (LiteRT, MobileNet-class) trained on Kashmir field images (Appendix C §3–4) confirms, but does not replace, the questions. Models trained only on PlantVillage lab images drop sharply in accuracy on field photos, so field images must be collected with consent through the app.

**Safety rules hard-coded in the engine:** suggest only products with a CIB&RC label claim for apple and on the current SKUAST-K schedule; never an insecticide during bloom; never a banned or restricted molecule; show "read the label" with every product; escalate uncertain or high-consequence cases.

## 4. The problem library (diagnosis knowledge base, first version)

General symptom and management notes for the most important problems in Kashmir's apple belt. **Management lines are deliberately at the level of practice and product class; doses and product names must come from the current SKUAST-K schedule.**

| Problem | Part | Distinguishing signs (become Yes / No questions) | Season / trigger | Look-alikes | Management direction |
|---|---|---|---|---|---|
| Apple scab (*Venturia inaequalis*) | Leaves, fruit | Olive-green to black, velvety spots; dark, corky, cracking spots on fruit | Spring rains, green tip to fruitlet; infection needs hours of leaf wetness that depend on temperature | Alternaria, Marssonina, spray burn | Protective sprays timed before rain from green tip; rotate fungicide groups; urea on leaves at leaf fall or destroy fallen leaves; open canopy |
| Alternaria leaf blotch (*A. mali*) | Leaves | Small round brown spots, some with a darker ring ("frog-eye"); defoliation | Warm, humid summer; worse after mite damage | Scab, Marssonina, mites | Summer cover sprays as per schedule; control mites; balanced nutrition |
| Marssonina blotch / premature leaf fall (*Diplocarpon coronariae*) | Leaves | Dark brown blotches on upper surface; leaves yellow with green islands and drop early | July–September after wet spells | Alternaria, mites | Timely summer sprays; sanitation; urea at leaf fall |
| Powdery mildew (*Podosphaera leucotricha*) | Shoots, flowers | White powder on young leaves, shoot tips, flower clusters; narrow curled leaves | Spring growth | Aphid curl | Prune out infected shoots in winter; sprays at pink bud / petal fall as per schedule |
| European red mite / two-spotted spider mite | Leaves | Dull, bronze leaves; tiny moving dots under leaves; fine webbing | Hot, dry June–August | Alternaria, nutrient problems | Dormant oil at silver tip–green tip; 20-leaf threshold check; rotate acaricide groups; protect predators |
| San Jose scale | Bark, fruit | Grey crusty bumps on bark; red spots with grey centres on fruit | All year | Woolly aphid | Horticultural mineral oil at dormancy; prune heavily infested wood |
| Woolly apple aphid | Bark, roots | White cotton-like masses on wounds and cuts; galls on roots | All year | Scale | Brush colonies; listed insecticide; resistant rootstocks (MM106, MM111) in new plantings |
| Aphids (green, rosy) | Leaves | Curled young leaves, sticky honeydew, ants | Spring | Mildew | Prune affected tips; spray only if widespread; never in bloom |
| Leaf-eating caterpillars (Indian gypsy moth, tent caterpillar) | Leaves | Eaten leaves, nests, egg masses | Spring | — | Destroy nests and egg masses; listed insecticide if spreading |
| Cankers (smoky blight, papery bark, others) | Bark | Sunken, cracked or peeling dead bark | All year | Borer damage | Scrape to healthy wood, paste wounds, burn debris; paint pruning cuts |
| Apple stem borer / root borer | Trunk, roots | Holes with sawdust-like frass; grubs on roots; declining tree | All year / summer | Canker | Clean and plug holes; destroy grubs; expert advice for soil treatment |
| Collar rot (*Phytophthora cactorum*) | Trunk base | Brown, soft, rotting bark at soil level; yellowing tree; wet soil | Wet spring and autumn | White root rot | Expose and scrape the collar, fungicide paste; drainage; keep manure off the trunk; *Trichoderma* |
| White root rot (*Dematophora necatrix*) | Roots | Sudden wilting; white fungal threads on roots; patches of dying trees | Summer | Collar rot | Expert visit; drench affected and neighbouring trees; isolation trench |
| Bitter pit (calcium) | Fruit | Small sunken brown spots, mostly at the calyx end, worse in storage | Pre-harvest, storage | Hail, scale | Calcium sprays in fruit growth; avoid excess nitrogen and heavy pruning |
| Boron / zinc deficiency | Fruit, leaves | Cracking, corky core (boron); small bunched leaves, rosettes (zinc) | Growth | Scab cracking | Soil test; foliar micronutrients as per schedule |
| Sooty blotch & flyspeck | Fruit | Grey smudges and clusters of tiny black dots that rub off | Wet late summer | Scab | Summer sprays; airflow; fruit can be cleaned |
| Hail, frost | Fruit, flowers | Dents and bruises after storms; black flower centres after a cold night | Spring and summer storms; bloom | Disease | Nets; alerts; protective spray after hail; record damage |
| Poor fruit set | Flowers | Flowers drop without setting; few bees; cold rainy bloom | Bloom | Frost | Pollinizers (~1 in 9 trees); beehives; no insecticide in bloom |
| Codling moth (quarantine pest) | Fruit | Entry holes with frass | Reported from Ladakh, not established in the Kashmir valley (to confirm) | — | Report immediately; quarantine rules |
| Fire blight | Shoots, blossoms | Blackened blossoms and shoot tips bent like a shepherd's crook | Status in J&K to confirm | Frost, canker | Always escalate to the department |

**Spray-schedule backbone (by stage).** The Doctor, the home alerts and the shop all hang off the SKUAST-K schedule's stages: dormant / silver tip (horticultural mineral oil for scale and mite eggs), green tip and pink bud (scab protection), bloom (no insecticides; bees), petal fall and fruitlet (scab, mildew; thinning), fruit development (Alternaria, Marssonina, mites; calcium), pre-harvest, and post-harvest / leaf fall (urea on leaves; sanitation). The schedule is revised yearly and has high-density variants; the app must load the current edition and show its year on every recommendation.

## 5. Buy: a licensed-dealer marketplace

**Categories:** fungicides; insecticides; mite control (acaricides); spray oils (HMO); fertilizers (urea, DAP, MOP, NPK, CAN, SSP); micronutrients (boron, zinc, calcium); organic and biological (vermicompost, FYM, neem, *Trichoderma*, biofertilizers); tools and sprayers; hail nets and supports; packing (cartons, trays); saplings and rootstocks (NHB-accredited nurseries); safety kits (PPE).

**What makes it different from a general agri shop:**

- **Kits matched to the orchard:** stage + area + sprayer drum + last spray group → the right products in the right quantity.
- **Filter by problem and stage,** not by brand. Each card shows the FRAC/IRAC group, the label claim and whether the group was used last time.
- **Same molecule, several brands:** price per pack across licensed dealers.
- **Dose calculator** in local units (kanal, trees, 200-litre drums).
- **Genuine-pack check:** scan the pack QR, match batch and expiry to the manufacturer's record (needs manufacturer data partnerships; start with the companies that already print QR codes). Failed checks go to the department and the dealer.
- **Safety:** PPE, waiting period before harvest, bee and water warnings on every product.
- **Fulfilment:** pickup at the village dealer (cheap and keeps dealers on side) or delivery.
- **Payment:** UPI, cash at pickup, and pay-after-harvest credit through a regulated lender.
- **Reviews only from verified buyers,** shown with district.

**Compliance.** Pesticides may be sold only by licensed sellers; run the shop as a marketplace for licensed dealers, store each dealer's licence and show it on orders, and sell only products registered for apple. National platforms already operate this way. Fertilizer sales follow the Fertilizer Control Order through authorised dealers; urea and DAP have government-fixed MRPs. Confirm the current online-sale conditions for both with a lawyer (Appendix C §7, flagged UNVERIFIED there).

## 6. Learn: short lessons in Kashmiri

**Format.** Three-minute videos with Kashmiri audio (recorded by native speakers, not synthesized), picture step cards, a one-question check at the end, offline downloads, and lessons that surface by season. Digital Green's farmer-to-farmer video model has shown much higher adoption than conventional extension (Appendix A §1.2).

**Curriculum (12 topics, about 120 lessons):**

| Topic | Example lessons |
|---|---|
| Orchard calendar | Month by month for higher and lower belts |
| Soil & manure | Soil sampling; reading a Soil Health Card; manure and fertilizer by tree age |
| Planting & varieties | Rootstocks (seedling, M9, M26, MM106, MM111); varieties and pollinizers; planting a new block |
| High-density orchards | Trellis and drip; training feathered plants; fertigation; HDP subsidy |
| Pruning & training | Central leader and spindle; renewal pruning; wound care |
| Pests & diseases | One lesson per library entry; the 20-leaf mite check; scab and rain |
| Safe spraying | Calibration; mixing order; PPE; bees; waiting periods; disposing of packs |
| Water & drip | Irrigation in dry spells; mulching |
| Bees & pollination | Pollinizer ratios; renting hives; spraying around bloom |
| Harvest & storage | Maturity indices; grading and packing; CA storage |
| Selling smart | Per-box vs per-kg; reading mandi rates; commission and deductions; contracts with pre-harvest buyers |
| Schemes & insurance | HADP, HDP subsidy, KCC, Kisan Khidmat Ghars; insurance status |

**Content sources:** SKUAST-K Package of Practices and extension material; ICAR-CITH Srinagar; KVKs; Department of Horticulture; NHB; Dr YSP UHF Nauni (Himachal) for HDP practice. Reuse needs permission; each lesson is signed off by a named expert.

## 7. Mandi & news

| Feature | Data source | Notes |
|---|---|---|
| Daily rates by mandi, variety, grade | data.gov.in OGD API "Current Daily Price of Various Commodities from Various Markets (Mandi)", resource `9ef84268-d588-465a-a308-a864a43d0070` (free key; ₹/quintal); Agmarknet 2.0; e-NAM dashboard; NHB daily bulletin | Kashmir mandis report mainly August–March. J&K prices appear to be box prices converted at 16 kg; show ₹/kg and ₹/box and state the assumption. Add trained mandi reporters at Sopore, Shopian (Aglar), Parimpora, Narwal and Azadpur for same-day rates. |
| Where should I sell? | Rates + freight + commission + unloading | Net money per box for the grower's own load; show uncertainty while the truck is on the road. |
| Highway status | J&K Traffic Police advisories on X (@Traffic_hqrs), Traffic Control Unit phone lines, driver reports | No official API; parse advisories and confirm by staff; push changes by app, SMS and voice call. |
| Rail | Budgam–Delhi parcel train (since 13 Sep 2025; reported ~₹2.41/kg; 20,000+ t moved) | Show schedules and space; book through partners when possible. |
| Weather, spray window | IMD API (registration / IP whitelisting), commercial weather API (e.g. Open-Meteo paid plan), ERA5 for history | Spray window = wind, rain-free hours, temperature. |
| Disease risk | Scab infection model (Mills / modified Mills: leaf wetness hours × temperature); mite degree-days | Validate locally with SKUAST-K; later feed from in-orchard weather stations. |
| Advisories & schemes | Department of Horticulture, SKUAST-K, IMD Srinagar agromet bulletins | Every item can be listened to; dated and sourced. |

**Context the app should explain:** imports (India–New Zealand agreement in force from 20 Oct 2026 with apple quotas from 2027; Iranian, Turkish and US apples in Delhi), CA storage capacity (2.92 lakh t against a stated need of ~6 lakh t), and the 2025 closure's lessons (rail and shared loads as backups).

## 8. Services: a trusted marketplace for help

**What growers can book:** trucks (open, shared part-loads, refrigerated), rail parcel space, labour teams (pruning, spraying, thinning, harvest, grading and packing), spray services with power sprayers, tractors and equipment, expert visits, soil-test sample pickup, CA cold storage, beehives, certified nursery plants, packing material, and buyers for produce.

**Trust and safety** (patterns from Indian platforms, Appendix A §4):

- ID and document checks (driving licence, RC, insurance for trucks); police-registration status for non-local labour, which J&K Police requires.
- Ratings from verified bookings only; "jobs done" counts.
- Fair-rate guides by district and season, with the government transport corporation's freight as a benchmark.
- PIN-closed jobs (the grower enters a code when work is done); pay after work; dispute desk.
- Shared loads: pool part-loads going to the same mandi on the same night.
- Live trip status tied to highway alerts.

**Models to learn from:** Bharat Intelligence (WhatsApp/voice booking of labour gangs), the government CHC farm-machinery app (PIN-closed jobs), Vahak and BlackBuck (load boards), ColdKonnect (cold-storage listings). Labour and transport aggregators fall under the Social Security Code's platform-worker contribution (1–2% of turnover, capped at 5% of payouts).

## 9. My orchard and collecting information without being invasive

**Rules.**

1. **Value before questions.** Every screen works in guest mode. The app helps first, then asks.
2. **One question at a time, at the moment it improves an answer,** with "why we ask" and a Skip.
3. **Never ask twice.** Reuse what the grower already did: a purchase becomes a spray-diary entry; a diagnosis records the variety and block.
4. **Never ask** for Aadhaar, bank passwords, OTPs or land papers.
5. **Aggregate only.** Pest and crop reports leave the phone as counts by area.
6. **Reciprocity.** A shared report brings back a village alert.
7. **Shared phones.** A "helping someone" mode for family members, with the grower's own consent. Phone ownership is lower among women in rural J&K (58% vs 80% for men, 2025 survey), so design for shared devices.

**The ladder** (when → what we ask → what the grower gets): first open → language, village → local weather, stage, rates. First diagnosis → where, how many trees → a cause and plan. First purchase → orchard size, drum size → exact quantity. Each spray → product, date (from the order) → rotation, reminders, records. Daily, optional → one tap (bees, pests) → village alerts. Season end → crop better or worse → area estimate. Only if they want → phone, name → call-backs, bookings, credit.

**Law.** India's DPDP Act 2023 and DPDP Rules 2025: consent-manager provisions from about November 2026, main obligations from about May 2027. The app needs an itemised plain-language consent notice (in Kashmiri, Urdu, Hindi, English), withdrawal as easy as consent, breach reporting within 72 hours, log retention, a grievance channel, and verifiable parental consent for users under 18. Penalties reach ₹250 crore (Appendix C §7.1).

## 10. Designing for Kashmir's growers and networks

- **Pictures and voice first.** In studies, low-literacy users completed no tasks with text interfaces but most with voice or picture-based ones; illiterate farmers preferred audio-only advice (Appendix A §1.1).
- **Kashmiri voice, Urdu-script text.** Kashmiri speech recognition and synthesis are still limited (Bhashini lists Kashmiri; its Kashmiri TTS is Devanagari-script only), so pre-record prompts with native speakers and use Urdu script for reading.
- **Offline-first.** J&K has had several hundred internet shutdowns, including 550 days of no or partial mobile internet from August 2019. Diagnosis, lessons, schedules and last-known rates live on the phone; questions and orders queue; SMS keywords and a missed-call voice line are backups.
- **Simple screens.** Large targets, few levels, a replay button, Western digits for prices, long pauses before voice input stops.
- **Assisted channels.** Kisan Khidmat Ghars (2,000+ J&K farmer service centres), village helpers, dealers and FPOs as onboarding points. In GSMA's study of the IFFCO Kisan app, a signup profile form put off first-time users and most left within two months; avoid that.

# Part 2 · Tools, technologies and data to integrate

## 11. Integration shortlist

| Priority | Integrate | For | Access / licence |
|---|---|---|---|
| 1 | SKUAST-K spray schedule and Package of Practices | Doctor rules, alerts, shop filters, lessons | Partnership and reuse permission needed |
| 2 | data.gov.in / Agmarknet 2.0, e-NAM, NHB bulletin | Mandi rates | GODL-India (commercial use with attribution) |
| 3 | IMD API + commercial weather API + ERA5 | Spray windows, scab model, alerts | IMD registration; Open-Meteo paid for commercial use; ERA5 CC BY 4.0 |
| 4 | Bhashini (ASR, translation, TTS), AI4Bharat IndicTrans2 (Kashmiri in Arabic and Devanagari scripts) | Voice input, translation of content | Government platform; IndicTrans2 MIT |
| 5 | Kashmir apple leaf datasets (7,569-image Kashmir set; ICAR-CITH Srinagar set), AppleLeaf9, PlantVillage CC0 copy | Photo model | CC BY 4.0 / CC0; avoid non-commercial sets (MinneApple, Fuji-SfM) |
| 6 | LiteRT (TensorFlow Lite) on-device inference | Offline photo check | Open source |
| 7 | J&K Traffic Police advisories (@Traffic_hqrs), TCU lines | Road status | No API; parse and verify |
| 8 | Kisan Khidmat Ghar / Kisan Sathi portal | Assisted onboarding, scheme info | Partnership |
| 9 | SKUAST-K e-Plant Health Clinic | Expert escalation | Partnership |
| 10 | NHB National Nursery Portal | Verified sapling sellers | Public |
| 11 | UPI payments; NBFC / bank partner | Payments, pay-after-harvest | Licensed partners |
| 12 | WhatsApp Business API, SMS gateway, IVR provider | Channels beyond the app | Commercial |

## 12. Technologies for better orchards (what to explain, offer or partner on)

| Technology | What it does | How Baghbaan uses it |
|---|---|---|
| High-density planting (M9/M26/MM106 rootstocks, trellis, drip) | Earlier and higher yields, better fruit; HD fruit fetched ≥₹1,600 per 10 kg box vs ≤₹1,200 per 16–20 kg traditional box in Aug 2025 | Lessons, subsidy guide, certified nursery marketplace, HDP-specific schedules |
| Disease forecasting (scab infection periods, mite degree-days) | Spray when infection is likely instead of by calendar | Home alerts; later a network of in-orchard weather stations with leaf-wetness sensors |
| Anti-hail nets | Protect fruit from spring and summer hail | Shop category, installer booking, hail alerts |
| Better sprayers (air-blast, tower), calibration | Even coverage, less chemical, less drift | Lessons, rental, calibration service |
| Drones | Mapping, scouting; spraying in tall traditional canopies is limited | Pilot only, under Drone Rules 2021 and current pesticide-drone SOPs; check J&K flying zones |
| Satellite remote sensing (Sentinel-2, Landsat, Bhuvan) | Orchard mapping, stress and damage detection | Area-level crop and damage estimates for the department and lenders |
| Smart pheromone traps | Automatic pest counts | Pilot with partners for key pests |
| CA storage and grading lines | Longer selling season, better grades | Booking, price outlook, grading-team booking |
| Traceability (QR on boxes, spray records) | Buyers and exporters see the spray history | Spray diary export; buyer links in phase 3 |
| LLM assistants | Answers in natural language | Only on top of the vetted knowledge base, with expert review of new answer types |

## 13. Apps and competitors

**Public and national apps to link or learn from:** Kisan Suvidha, Meghdoot, Mausam, Damini (lightning), Agmarknet and e-NAM apps, Kisan e-Mitra, Kisan Call Centre (1800-180-1551), J&K's Kisan Khidmat Ghar / Kisan Sathi. **Private:** Plantix (photo diagnosis; covers scab and Marssonina), DeHaat, AgroStar, BigHaat, Gramophone, Farmer.CHAT (Digital Green), KissanAI. **Global apple tools:** RIMpro, WSU Decision Aid System, Cornell NEWA, Trapview, FruitScout, Aerobotics, Croptracker. Reviews of the national apps repeatedly mention login problems, stale data and English-only content (Appendix C §1).

**Kashmir and Himachal competitors** (details in Appendix C §2):

| Player | Offer | Gap Baghbaan fills |
|---|---|---|
| Orchardly (Fruitbee Agritech, Srinagar) | Advisory, smart devices, services; claims 15,000+ growers and ₹19 crore revenue (FY26) | Neutral licensed-dealer marketplace; free offline diagnosis; logistics |
| Farmit by Qul | Urdu AI chat; SKUAST-based advice; blocks insecticides in bloom | Kashmiri voice; services marketplace; mandi decisions |
| Apple Doc (SKUAST-K incubated) | AI decision support for precision apple farming | Breadth beyond advisory |
| Kash Crop | GPS, weather, AI assistant | Scale, trust, marketplace |
| SKUAST-K e-Plant Health Clinic | Expert diagnosis | A partner, not a competitor |

**Positioning:** the neutral, Kashmiri-first "one app for the orchard year", partnering with SKUAST-K and the department rather than competing with them.

## 14. Datasets

| Dataset | Use | Licence |
|---|---|---|
| Kashmir apple leaf disease set (7,569 images) | Photo model training | CC BY 4.0 |
| ICAR-CITH Srinagar apple disease set | Photo model training | CC BY 4.0 |
| AppleLeaf9 | Training (9 classes) | CC BY 4.0 |
| PlantVillage (CC0 copy) | Pre-training only; poor field generalisation | CC0 |
| Plant Pathology 2020/2021 (Kaggle) | Benchmarking | Check competition terms |
| MinneApple, Fuji-SfM | Yield/fruit detection research | Non-commercial: avoid in product |
| data.gov.in mandi prices | Rates, trends | GODL-India |
| IMD gridded data, ERA5 | Weather history, model calibration | IMD terms; CC BY 4.0 |
| Soil Health Card data, SoilGrids | Soil context | Government / CC BY |
| Sentinel-2, Landsat, Bhuvan | Remote sensing | Open |
| J&K Economic Survey | District statistics | Public |

## 15. Regulations that shape the app

| Area | What applies | Product decision |
|---|---|---|
| Personal data | DPDP Act 2023, DPDP Rules 2025 (main duties ~May 2027) | Itemised consent in four languages; minimal data; export/delete; breach process; under-18 consent |
| Pesticide sales | Insecticides Act 1968 and rules: licensed sellers, registered products, label claims | Marketplace for licensed dealers only; apple-registered products only |
| Fertilizer sales | Fertilizer Control Order; fixed MRPs for some products | Authorised dealers; show MRP |
| Saplings | Nursery registration / accreditation | Sell only from NHB-accredited or J&K-licensed nurseries |
| E-commerce | Consumer Protection (E-Commerce) Rules 2020 | Seller details, grievance officer, returns policy |
| Labour and transport platforms | Social Security Code (platform workers); motor-vehicle rules; J&K Police labour registration | Contributions; document checks; registration status |
| Drones | Drone Rules 2021; pesticide-drone SOPs | Pilots only, with certified operators |

# Part 3 · Building it

## 16. Architecture

- **App:** Android first (Flutter or React Native), small install, offline database (SQLite), background sync, works on 2 GB RAM phones; a light PWA for sharing links.
- **Content:** a headless CMS with an expert review workflow: question bank, likelihood tables, lessons, products, advisories, each versioned and signed off.
- **Doctor engine:** shared rules library that runs identically on the phone and the server (the prototype's engine is ~60 lines of JavaScript).
- **Data services:** price ingestion (data.gov.in + reporters), weather ingestion (IMD + commercial API), road-status desk, risk models.
- **Channels:** WhatsApp Business API, SMS gateway, IVR in Kashmiri, Urdu and Hindi; an expert desk web app for advisors and the department.
- **Marketplace:** dealer and provider onboarding with document checks; orders, bookings, PIN-closed jobs; payments through a licensed payment aggregator; lender integration for credit.
- **Privacy:** consent records, data minimisation, encryption at rest and in transit, data in India, role-based access for experts.

## 17. Business model

| Stream | Notes |
|---|---|
| Commission on input orders | From licensed dealers, not from growers; keep advice neutral by never ranking products by margin |
| Booking fees | Small fee on trucks, teams, storage |
| Credit partnerships | Origination fee from the lender for pay-after-harvest |
| Premium services | Weather stations, field visits, record exports for exporters |
| Institutional | Expert desk and anonymised area insights for the department, insurers (when apple insurance launches) and researchers |

**Lessons from others:** BharatAgri shut down in November 2025 after high acquisition costs and low repeat orders; Otipy also failed. Keep acquisition cheap (assisted onboarding, dealers, FPOs), earn repeat use with free daily value (alerts, rates, roads), and do not hold inventory early.

## 18. Roadmap and measures

| Phase | Scope |
|---|---|
| **1 · months 0–6: pilot in Shopian and Baramulla** | Orchard Doctor (25 problems) reviewed with a university partner; mandi rates, highway and weather alerts; 40 Kashmiri-audio lessons; offline mode and SMS keywords; directory of verified transporters and labour leaders; 500 growers via village helpers and Kisan Khidmat Ghars |
| **2 · months 6–12: marketplace and records** | Licensed-dealer shop; spray diary, rotation and dose calculator; in-app bookings with tracking; photo check beta; Kashmiri voice line; expert desk |
| **3 · months 12–24: scale** | All apple districts; pay-after-harvest credit; weather-station network; buyer and exporter links; anonymised intelligence for the department |

**Measures:** weekly active growers; diagnoses completed and confirmed right by experts; repeat use in the second season; share of purchases genuine-checked; sprays avoided or rotated; truck-days lost to closures avoided; repeat bookings; grower-reported net price per box.

## 19. Risks and how to handle them

| Risk | Mitigation |
|---|---|
| Wrong advice harms crops or people | University-signed content; conservative engine; label-first; expert escalation; audit trail |
| Dealers see the app as a threat | Make them the fulfilment network: pickup orders, credit through partners, visibility |
| Low trust in a new app | Free value first; local helpers; department and university partners visible in the app |
| Shutdowns and weak networks | Offline-first, SMS and IVR |
| Data misuse fears | Minimal data, aggregates, DPDP-grade consent, no selling of personal data |
| Price data gaps (seasonal reporting) | Mandi reporters; clearly dated rates |
| Regulatory change (pesticide e-commerce, platform workers) | Legal review before Phase 2; licensed partners |
| Kashmiri language technology gaps | Recorded audio; Urdu text; collect consented speech for future models |

## 20. Open questions to settle next

1. Partnership and reuse terms for the SKUAST-K schedule and lessons.
2. Current HDP subsidy rates and whether the scheme continues after March 2026.
3. Current online-sale conditions for pesticides and fertilizers.
4. Labour wage rates by district and task (not found in desk research).
5. Status of fire blight and codling moth in the Kashmir valley.
6. Whether apple crop insurance will relaunch, and in what form.
7. Grower testing: show the demo to 20 growers in Shopian and Sopore and record what they change.
