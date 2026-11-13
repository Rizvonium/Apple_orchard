# Technology, tools, apps, datasets & regulations catalog: Kashmir apple-orchard app

Research date: 2026-11-12. Prepared for: the "orchard doctor" yes/no diagnosis wizard (later photo AI), agro-input shop, lessons, mandi/road/weather info and services marketplace.

## How to read this document

Every item has a source link. Evidence tags:

- **[V]**: I opened the linked page, file or API in this session and read the fact there.
- **[S]**: The fact comes from a search-engine summary of the linked page. I did not open the page myself, so check it before you rely on the fact.
- **[UNVERIFIED]**: The fact comes from memory or an unconfirmed lead, or the source could not be reached. Treat it as a lead only.
- **Analysis** marks my own recommendations, not sourced facts.

**Method and limits**

- Google Play numbers come from the Play Store page HTML for each app, fetched directly on 2026-11-12 with `hl=en&gl=IN`. I read the `ratingValue`, `ratingCount`, the "Downloads" badge and "Updated on". Only the three "most relevant" reviews Google serves without JavaScript were visible for each app, so the review notes are anecdotes, not a systematic analysis.
- Partway through, the session's shared web-search budget ran out. After that I used only direct fetches of known URLs. Several Indian government sites refused automated access during the session: consumeraffairs.nic.in, ppqs.gov.in, nrsc.gov.in, egazette.gov.in, indiacode.nic.in and skuastkashmir.ac.in. As a result, parts of sections 6 (orchard technology) and 7 (regulations) are thinner and are flagged. Section 9 lists what is still open.

---

## 0. Top picks to integrate first (Analysis)

| Priority | What | Why | Licence or cost note |
|---|---|---|---|
| 1 | **Bhashini APIs** (Kashmiri ASR, NMT, TTS) plus **AI4Bharat IndicTrans2** (kas_Arab and kas_Deva); Sarvam-Translate as a commercial alternative for translation | Bhashini is the only production API found that lists Kashmiri for speech (ASR and TTS); Sarvam-Translate also lists Kashmiri for text. Bhashini's Kashmiri TTS is listed only in **Devanagari** script, so you will need transliteration or your own TTS for Perso-Arabic. | Bhashini is a government platform (terms not checked). IndicTrans2 is MIT. |
| 2 | **Open-Meteo** (commercial plan) plus the **IMD API** (IP whitelisting) plus **ERA5** history | Hyperlocal forecasts to drive the spray-window and scab infection-period logic. | Open-Meteo data is CC BY 4.0, and commercial use needs a paid plan. ERA5 is CC BY 4.0 (since 2 July 2025). |
| 3 | **Training data for the photo AI**: Kashmir Indigenous dataset (7,569 images), ICAR-CITH Srinagar dataset, AppleLeaf9, PlantVillage (Mendeley CC0 copy) | Kashmir-specific field images with permissive licences. | All CC BY 4.0 or CC0. Avoid the NC-licensed sets (MinneApple, Fuji-SfM) for a commercial model. |
| 4 | **LiteRT** (formerly TensorFlow Lite) on-device model, MobileNetV3-class | Works offline in orchards. PlantVillage-only models generalise poorly to field photos, so collect your own field images with DPDP-compliant consent. | Apache-licensed runtime (licence not checked here). |
| 5 | **Agmarknet 2.0 / data.gov.in** mandi prices, plus a partnership with J&K's **Kisan Khidmat Ghar** | Prices and arrivals. KKG already offers orchard-wise weather and prices in J&K. | data.gov.in data is under GODL-India, which allows commercial use with attribution. |
| 6 | **SKUAST-K spray schedule / Package of Practices** as the advisory rule base | Every serious Kashmir competitor (Farmit by Qul, Applefy, AppleCare Kashmir) bases its advice on it. | Copyright and permission to reuse not checked [UNVERIFIED]. |
| 7 | **NHB National Nursery Portal** (accredited and licensed nurseries, searchable by crop "Apple") | Lets the shop verify sapling suppliers. | Public portal. |

---

## 1. Existing farmer apps and what to learn from them

### 1.1 Government and public apps (India)

All Play Store figures are [V], captured 2026-11-12.

| App (link) | What it does | Play rating (ratings) / downloads / last update | Notes from reviews and studies |
|---|---|---|---|
| **Kisan Suvidha** (MoA&FW) [Play listing](https://play.google.com/store/apps/details?id=in.cdac.bharatd.agriapp), [MyGov page](https://secure.mygov.in/group-issue/kisan-suvidha-smart-mobile-app-farmers/?page=0%2C7) | Six areas: weather, dealers, market prices, plant protection, agro-advisory and Kisan Call Centre [S]. | **The listing returns HTTP 404 on Google Play** [V]. It appears to have been withdrawn. | A 2023 Tamil Nadu study found farmers adopted 70% of technologies via Kisan Suvidha, versus 64% (Farmer Mobile App) and 60% (e-NAM) [S] ([PDF](https://ageconsearch.umn.edu/record/367859/files/Yamunarani41122023AJAEES111385.pdf)). An older MyGov comment said the weather and price tabs were not updating [S]. A critical commentary noted about 2.75 lakh downloads at the time [S] ([TNM](https://www.thenewsminute.com/amp/story/news/are-modi-govt-s-snazzy-kisan-apps-really-helping-indian-farmer-62001)). |
| **Meghdoot** (IMD, IITM, ICAR; built by ICRISAT) [Play](https://play.google.com/store/apps/details?id=com.aas.meghdoot) | District- and crop-wise agromet advisories from AMFUs every Tuesday and Friday, plus forecast and historic weather [V]. | **3.0** (1,266) / 500K+ / Aug 13, 2026 | Visible reviews: slow; "sarkari-office" UX; district-level only (not town); forced sign-up; registration form bugs (Oct 2026) [V]. A MoES parliamentary reply describes its purpose [S] ([PDF](https://moes.gov.in/sites/default/files/RS-English-1629-03082021.pdf)). |
| **Mausam** (IMD) [Play](https://play.google.com/store/apps/details?id=com.imd.masuam) | Observed weather, forecasts, radar and warnings from mausam.imd.gov.in [V]. | **3.7** (4,617) / 1M+ / Oct 27, 2026 | Recent 1-star reviews: no data shown for the entered location; menus empty; fails if the "Fused Location" permission is refused [V]. |
| **Damini: Lightning Alert** (IITM Pune/ESSO) [Play](https://play.google.com/store/apps/details?id=com.lightening.app.damini) | GPS lightning alerts within 20 and 40 km, plus safety dos and don'ts [V]. | **4.2** (315) / 100K+ / Aug 30, 2026 | Mixed reviews: one reports a strike with no warning; others praise it [V]. |
| **PM-KISAN app / Kisan e-Mitra chatbot** [Play](https://play.google.com/store/apps/details?id=com.nic.project.pmkisan), [Wadhwani AI](https://www.wadhwaniai.org/empowering-millions-of-indian-farmers-with-instant-ai-chatbot-support/) | Scheme chatbot with text, FAQ-click and voice input; 11 languages; 49 query categories; translation via Bhashini's IndicTrans2; NLP intent detection, then LLM answers filled into templates with beneficiary data [V]. | PM-KISAN app: **3.8** (85,019) / 10M+ / Apr 25, 2026 | 2.69 million queries in 186 days and about 13,000 queries a day (Wadhwani AI, page dated 6 Nov 2025) [V]. Launched 21 Sep 2023 [S] ([AIR](https://newsonair.gov.in/union-minister-kailash-choudhary-launches-pm-kisan-ai-chatbot-kisan-e-mitra-in-new-delhi)). **Kashmiri and Urdu are not among the 11 languages** [V]. |
| **e-NAM** (SFAC) [Play](https://play.google.com/store/apps/details?id=in.gov.enam) | Remote bidding for traders; mandi list, arrivals and prices for farmers; the app has limited features compared with the web version [V]. | **3.1** (1,947) / 500K+ / Mar 9, 2026 | Visible reviews: login failures, wrong prices, painful registration ("480 clicks" to enter a birth date) [V]. e-NAM transaction value in J&K (per the HADP article) rose from ₹14 lakh (2020–21) to over ₹670 crore [V] ([FreshPlaza, 2 Feb 2026](https://www.freshplaza.com/asia/article/9807105/)). |
| **Agmarknet 2.0** (MoA&FW) [Play](https://play.google.com/store/apps/details?id=in.gov.agmarknet) | Mainly a data-entry app for officials at APMC yards. Data is published on agmarknet.gov.in [V]. | **3.4** (27) / 10K+ / Sep 4, 2026 | Reviews: historic prices removed, crops missing, "not working properly" [V]. The portal was upgraded to 2.0 in November 2025 and 4,367 mandis are linked [S] ([india.gov.in](https://www.india.gov.in/category/agriculture-rural-environment/subcategory/agricultural-produce/details/prices-arrival-reports-agmarknet), [AgriTimes](https://agritimes.co.in/agmarknet-2-0-e-nam-boost-real-time-mandi-price-transparency)). |
| **Kisan Sarathi** (MeitY, ICAR, DIC, IASRI) [Play](https://play.google.com/store/apps/details?id=com.kisansarthi.farmer) | Raise queries to experts with images, call KCC/KVK experts, multimedia advisories from KVKs in local language, weather, prices and schemes [V]. | **4.1** (276) / 100K+ / Oct 27, 2026 | A model for "ask a KVK expert" escalation. |
| **Bharat VISTAAR** (MoA&FW) [Play](https://play.google.com/store/apps/details?id=com.vistaar.gov.in) | AI "digital public infrastructure": ICAR advisories, IMD forecasts, Agmarknet prices, Soil Health Card advice, NPSS pest advisories [V]. Voice helpline **155261** ("Bharati"); Hindi and English first; Phase I launched 17 Feb 2026; ₹150 crore allocated for 2026-27 [S] ([The Week](https://www.theweek.in/wire-updates/business/2026/02/01/govt-to-launch-multi-lingual-ai-tool-bharat-vistaar-for-agri-sector.html), [FPJ](https://www.freepressjournal.in/amp/tech/bharat-vistaar-agriculture-ai-tool-launched-in-india-heres-all-you-need-to-know)). | **3.7** (47) / 10K+ / Feb 18, 2026 | Reviews: "very little information", photo upload broken (Oct 2026) [V]. **Analysis:** it is a likely future data or API partner and also a competitor for generic advice. |
| **MahaVISTAAR-AI** (Govt of Maharashtra) [Play](https://play.google.com/store/apps/details?id=in.gov.mahapocra.mahavistaarai) | State AI advisory: weather, prices, pest ID, agromet advisories, warehouse and CHC information [V]. | **3.8** (2,487) / 1M+ / Sep 24, 2026 | The state-level template that Bharat VISTAAR follows. |
| **NPSS: National Pest Surveillance System** (DPPQS and ICAR-NRCIPM) [Vikaspedia](https://en.vikaspedia.in/viewcontent/agriculture/ict-applications-in-agriculture/national-pest-surveillance-system-ict-applications-in-agriculture-3?lgn=en) | Photo-based pest ID: 61 crops for identification, advisories for 15 crops, 6 languages; launched 15 Aug 2024 [S]. | Not checked | Whether it covers apple is UNVERIFIED. |
| **Kisan Khidmat Ghar** (J&K, built by BISAG-N/MeitY) [Play](https://play.google.com/store/apps/details?id=com.bisagn.kkg) | **Orchard-wise weather prediction**, farm inputs, farm guide, schemes, skilling, expert support, chatbot [V]. Under HADP it supplies live wholesale price data; FreshPlaza's summary also mentions price and pest forecasting [V]/[S] ([FreshPlaza](https://www.freshplaza.com/asia/article/9807105/)). | **3.4** (151) / 50K+ / Aug 20, 2026 | Reviews: registration and login failures; usernames with digits or "#" in passwords rejected; long "Krishi Udyami" usernames break login [V]. **This is the J&K government's own digital channel to apple growers.** |
| **Horticulture Procurement MIS (HPMIS)**, Himachal [Play](https://play.google.com/store/apps/details?id=com.hpmc.mis), [news](https://himachalheadlines.com/news/hpmis-portal-brought-transparency-in-procurement-of-apples-sukhu/) | End-to-end digital apple Market Intervention Scheme: one-time farmer registration, digital receipts by SMS, DBT payment, real-time tracking. Over 17,000 farmers registered and over 8,000 MT procured; 213 collection centres; procurement 1 Aug–31 Oct 2026 [V]. | **3.7** (18) / 10K+ / Sep 30, 2026 | A model for the digital-receipt and DBT flow. |

### 1.2 Private agri-input and advisory apps (India)

| App (link) | What it does | Play rating (ratings) / downloads / last update [V] | Review and study notes |
|---|---|---|---|
| **Plantix** [Play](https://play.google.com/store/apps/details?id=com.peat.GartenBank), [apple library](https://plantix.net/en/library/crops/apple), [API toolkit](https://plantix.net/en/b2b-solutions/api-toolkit) | Photo crop diagnosis, treatment, community, input retail via "Plantix Partner" dealers [V]. **Its apple library includes Apple Scab, Marssonina Blotch, Alternaria, Powdery Mildew, Woolly Aphid, San Jose Scale, European Red Mite and Codling Moth**: 19 fungal, 27 insect and 4 mite problems plus 10 deficiencies [V]. | **4.1** (143,107) / 10M+ / Oct 16, 2026 | Visible reviews praise fast, accurate diagnosis; an older one complains about limited crop options [V]. An AgEcon study found it the most effective of the apps compared ("informative, simple, easy to use") [S] ([AgEcon](https://ageconsearch.umn.edu/record/368065)). **It is the main photo-AI competitor and already covers Kashmir's key apple diseases.** |
| **AgroStar** [Play](https://play.google.com/store/apps/details?id=com.ulink.agrostar) | Agronomy advice plus input e-commerce; "missed call" access; operates in Gujarat, Maharashtra, Rajasthan, MP and UP [V]. | **4.2** (79,832) / 5M+ / Oct 30, 2026 | Visible reviews: notifications fail to open, cannot change language or location, missing prices, no call-back after a missed call [V]. |
| **BigHaat** [Play](https://play.google.com/store/apps/details?id=com.BigHaat) | Input e-commerce (seeds, fertilizers, pesticides, machinery), fertilizer calculator, expert advice [V]. | **4.3** (14,878) / 1M+ / Nov 2, 2026 | Recent 1-star reviews: wrong product delivered, returns ignored, items out of stock while listed in stock, weak IVR support [V]. **Lesson: fulfilment and stock accuracy drive ratings.** |
| **Gramophone** [Play](https://play.google.com/store/apps/details?id=agstack.gramophone) | Advisory, inputs with home delivery, community of 5 lakh+ farmers [V]. | **4.4** (7,175) / 500K+ / **last updated Jun 19, 2023** | The listing looks stale; whether a newer app replaced it is UNVERIFIED. |
| **DeHaat Kisan** [Play](https://play.google.com/store/apps/details?id=app.intspvt.com.farmer) | Inputs, a "Crop Doctor" photo answer "in under 30 minutes", satellite farm monitoring, crop calendar, nearby DeHaat centres [V]. | **3.8** (1,280) / 100K+ / Jul 15, 2026 | Reviews: praise for doorstep centres and credit; complaints that English mode still shows non-English crop names, and bugs [V]. |
| **Fasal** [Play](https://play.google.com/store/apps/details?id=com.wolkus.fasalapp), [site](https://fasal.co/) | Horticulture farm app plus "Fasal Sense" IoT; disease and pest predictions; irrigation automation (FasalJet). **Apple is listed** among its crops; its sensors are soil moisture, soil temperature and a weather station. Leaf-wetness sensing is not mentioned on the site [V]. | **4.5** (222) / 10K+ / Nov 12, 2026 | Older 1-star reviews (2020–22): crashes, unresponsive support [V]. A Kashmir deployment was not confirmed [UNVERIFIED]. |
| **Cropin Grow** (formerly SmartFarm Plus) [Play](https://play.google.com/store/apps/details?id=com.cropin.smartfarmplus) | Enterprise (B2B) farm digitisation. Company says it serves "100+ enterprises across 92 countries" [V]. | **3.7** (121) / 10K+ / Nov 9, 2026 | A B2B model, not farmer-facing. |

### 1.3 AI chat assistants

| Assistant | Facts | Link |
|---|---|---|
| **FarmerChat** (Digital Green) | Text, voice and photo questions [V]. Play: **3.9** (2,087) / 1M+ / Oct 13, 2026 [V]. A 2024 paper reports 15,000+ farmers and 300,000+ queries [V]. An Oct 2024 Hugging Face case study reports 20k+ farmers, 340k+ queries, 6+ languages and 50 value chains, and benchmarks LLMs on faithfulness: Gemini-1.5-Pro 91%, Gemini-1.5-Flash 89% (chosen; 4.5% unanswered), GPT-4-turbo 88%, Llama-3-70B 78% [V]. Digital Green says it has "over a million farmers" (Rural21, Mar 2026). The IFPRI–Digital Green user testing (2025–27) has not published results yet [V]. | [Play](https://play.google.com/store/apps/details?id=org.digitalgreen.farmer.chat), [arXiv 2409.08916](https://arxiv.org/abs/2409.08916), [HF blog](https://www.huggingface.co/blog/digital-green-llm-judge), [Rural21](https://www.rural21.com/english/news/detail/article/testing-ai-advisory-services-insights-from-farmerchat-in-india-and-kenya.html) |
| **KissanAI** (Titodi Infotech) | Play lists 9 Indic languages (Gujarati, Marathi, Tamil, Telugu, Kannada, Malayalam, Punjabi, Bangla, Hindi); **no Kashmiri or Urdu** [V]. **4.0** (99) / 10K+ [V]. It publishes "Dhenu" agri-LLMs (1B–8B; Llama 3.1/3.2 based) on Hugging Face, with no licence shown on the org page [V]. | [Play](https://play.google.com/store/apps/details?id=com.kissangpt), [HF](https://huggingface.co/KissanAI) |
| **Jugalbandi** (Microsoft, AI4Bharat, OpenNyAI) | WhatsApp bot for government schemes, typed or spoken; 10 languages; 171 schemes (May 2023) [V]. | [Microsoft](https://news.microsoft.com/source/asia/features/with-help-from-next-generation-ai-indian-villagers-gain-easier-access-to-government-services/) |

### 1.4 Lessons from section 1 (Analysis)

1. Government apps lose trust through **broken registration and login**, empty data screens and stale prices (Meghdoot, Mausam, e-NAM, Agmarknet 2.0, Kisan Khidmat Ghar). Allow use **without registration**, use OTP-only login, and show a fallback when an API returns nothing.
2. Never hard-fail when **location permission** is denied. Offer a district or village picker (Mausam complaint).
3. **Language** must be switchable independently of location (AgroStar and DeHaat complaints). None of the national apps checked offers Kashmiri.
4. E-commerce ratings collapse on **wrong items, stock errors and unanswered returns** (BigHaat).
5. **Expert escalation** within an hour is valued (Orchardly reviews, section 2). DeHaat promises 30 minutes.
6. Weather-only apps rate poorly. Value comes from translating weather into **actions** (spray or don't spray, frost or hail alerts).

### 1.5 Global apple-specific decision tools

| Tool | What it does | Business model | Link |
|---|---|---|---|
| **RIMpro** (NL) | Simulates scab ascospore maturation, release and infection from station weather plus a forecast up to 10 days; needs a green-tip biofix [S]. VT guidance: spray at **≥100 RIM** if scab was present last year and **≥300 RIM** if not; RIM/100 ≈ % of the season's ascospores causing infection [V]. FiBL/BIOFRUITNET recommends RIMpro or Simscab for timing organic sprays; sulfur works only above 12 °C [V]. | Subscription: about €220/yr including one station plus about €165 per extra station (VT page) [V]; older figure about €250/yr [S]. | [rimpro.cloud](https://rimpro.cloud), [VT](https://treefruitpathology.spes.vt.edu/?p=770), [MSU](https://www.canr.msu.edu/news/how-to-interpret-a-rimpro-apple-scab-forecast), [FiBL PDF](https://orgprints.org/44111/16/2.PA_BIOFRUITNET_Apple_scab_RIMpro_revised_CBO_Eng%20%28002%29.pdf) |
| **Cornell NEWA** | Apple scab tool (ascospore maturity, discharge, infection events), fire blight (Cougarblight and EIP/"Maryblyt-like"), carbohydrate thinning model [V]/[S]. VT note: with NEWA alone, a "major" event is >15% ascospore discharge [V]. A NEWA station licence for feeding RIMpro costs $50 [V]. | Free public network | [newa.cornell.edu/apple-scab](https://newa.cornell.edu/apple-scab), [thinning](https://www.newa.cornell.edu/apple-carbohydrate-thinning) |
| **WSU Decision Aid System (DAS) and AgWeatherNet** | 11 insect, 7 horticultural and 5 disease models driven by AgWeatherNet stations; codling moth (95%) and fire blight (85%) are the most-used models (2013 survey) [S]. The WSU tree-fruit site was "temporarily unavailable" on 2026-11-12 [V]. | Public (cost UNVERIFIED) | [WSU DAS](https://treefruit.wsu.edu/tools-resources/wsu-das/), [2013 survey](https://tfrec.cahnrs.wsu.edu/vpjones/2013-das-survey) |
| **Trapview** (EFOS, Slovenia) | Camera pheromone traps; ML identification over 90% accuracy (vendor/EU summary); thousands of traps in 40+ countries [S]. Croatian and South Tyrol trials found it equivalent to Delta traps for codling moth [S]. **No India deployment found.** | Hardware plus subscription | [CORDIS](https://cordis.europa.eu/project/rcn/205267/brief/en), [FAO observatory](https://agritechobservatory.review.fao.org/ar/trapview), [MDPI review](https://www2.mdpi.com/2077-0472/12/10/1721) |
| **FruitScout** | Smartphone images of each tree: trunk cross-section, then buds, flowers and fruitlets, giving thinning recommendations (based on the Cornell crop-load model) [S]. | Commercial | [Fruit Growers News](https://fruitgrowersnews.com/article/fruitscout-pinpoints-cropping-targets/), [Good Fruit](https://goodfruit.com/phoning-in-precision) |
| **Aerobotics** | Smartphone fruit sizing and forecasting ("TrueFruit Size"); claims packouts up to 5% higher [V]. | Commercial | [aerobotics.com](https://www.aerobotics.com/) |
| **Tevel** | Tethered "flying autonomous robots" picking apples and other fruit; Series C of $18M (Dec 2025) [S]; deployments in Italy, US, Chile and Israel [S]; slower than humans [S]. | Robot-as-a-service (UNVERIFIED) | [tevel-tech.com](https://www.tevel-tech.com/home), [Fruitnet](https://www.fruitnet.com/eurofruit/tevel-secures-funding-for-flying-robot-harvesters/271009.article) |
| **Croptracker** (Ontario) | Traceability to block and employee, spray records, harvest and labour tracking, packhouse QC, Crop Load Vision [V]. | SaaS (prices not public) | [croptracker.com](https://www.croptracker.com/) |
| **CSIR Apple Orchard Water Use** (South Africa) | FAO-56 ETo-based forecast of orchard water needs 1–7 days ahead from canopy cover, height, soil and cover crop [V]. | Free app | [Play](https://play.google.com/store/apps/details?id=com.teqoa.csir.orchardwateruse.app) |

---

## 2. Competitive landscape: Kashmir and Himachal apple apps and startups

Coordinator request. The "Gaps our app could fill" notes are Analysis.

### 2.1 Orchardly (Fruitbee Agritech Pvt Ltd, Srinagar). This is the same team ThePrint/ANI called "Orchadly".
- **Offers:** Weather alerts, pest and disease prediction, irrigation and fertigation, spray advisories, soil testing, agronomy, inputs and own stores, drone services, pruning and orchard management, procurement and **QR-based traceability**, nurseries and genetics, R&D [V] ([Startuppedia](https://startuppedia.in/startup-stories/kashmiri-entrepreneurs-build-an-os-for-indias-apple-industry-clock-rs-19-cr-in-fy26-12440645)). Runs **40 community micro-weather stations**; it dropped per-farm stations because small growers would not pay for them [V]. In the 2022 ThePrint/ANI story the founders (Ehsan Quddusi of Tral, Izhan and Uzair Javaid of Shopian) described 30 micro-weather zones, free soil testing, "Orchadly Mandi" rate alerts, a planned "Orchadly procure" and barcode traceability, with 6,000 farmers in six months [V] ([ThePrint](https://theprint.in/india/mobile-app-that-connects-kashmiri-farmers-to-save-grow-sell-apples/1157350/), [ANI](https://www.aninews.in/news/national/general-news/mobile-app-that-connects-kashmiri-farmers-to-save-grow-sell-apples20221006230338/)).
- **Traction:** Company claims 15,000+ growers and about 13,500 acres; revenue ₹15.24 cr (FY25) and ₹19.04 cr (FY26), EBITDA positive, bootstrapped, 20+ staff [V] (company figures). Tracxn reports ₹13.4 cr for FY25, which conflicts with the company figure [S] ([Tracxn](https://tracxn.com/d/companies/orchardly/__PvK1_YzkWr4KaNubnk8-PgLUO4Q2ENjoLDLTp435-V4)). Named Top Emerging Startup at the J&K Startup Awards, Jan 2026 [S] ([Greater Kashmir](https://www.greaterkashmir.com/jammu-kashmir/orchardly-named-top-emerging-startup-at-jk-startup-awards)). Play: **4.2** (441) / 10K+ [V] ([Play](https://play.google.com/store/apps/details?id=com.orchardly)). YourStory, July 2026: "The $2 Million Startup Building an Operating System for India's Apple Industry" ([link](https://yourstory.com/2026/07/orchardly-kashmir-apple-startup); returned 403 to my fetch).
- **Gaps we could fill:** Reviewers ask for **faster expert responses** [V]. No Kashmiri-language voice is mentioned. There is no transparent self-serve diagnostic wizard; advice is expert- and service-led. Orchardly is vertically integrated (it sells its own inputs), so a **neutral marketplace** with price comparison and an open services marketplace is a different position.

### 2.2 Farmit by Qul (Qul Fruits, Kashmir)
- **Offers:** Personalised spray schedules from orchard age, density, yield history and stage, "based on Qul's SKUAST-K validated Package of Practice". **AI chat in Urdu and English**, voice input in Urdu or English, **crop-stage identification from two photos**, a weather check before each spray recommendation, **automatic blocking of insecticide advice during full bloom**, activity logging and export, offline caching, and "privacy-first AI" (name and phone never sent to the AI service) [V] ([Play](https://play.google.com/store/apps/details?id=com.qulfruits.farmit), [App Store](https://apps.apple.com/in/app/farmit-by-qul/id6761651692)).
- **Traction:** Play 1K+ downloads, no rating yet, updated Jul 23, 2026 [V]. Qul (founded 2009, CEO Khuram Mir) says it works with 15,000+ growers across 2,500 acres, has 14 post-harvest hubs ("Qulgahs") and raised ₹60 cr from Incofin and Fielding. It describes Farmit as a "re-launch" and is targeting 100,000 farmers in 5 years [V] ([Global Indian](https://www.globalindian.com/story/cover-story/making-kashmir-qul-how-khuram-mir-took-kashmiri-apples-and-orchards-to-the-world/)). Qul is also planting about 1.5 million high-density trees in 2026 [S] ([FreshPlaza](https://www.freshplaza.com/asia/article/9819928/kashmir-plans-1-5-million-high-density-apple-trees-in-2026/)).
- **Possible predecessor:** **FarmIT** (Kashmir Life, Feb 2022) was built by a five-person team (Mursaleen, Ashraf, Adnan; pathologist Ruqaiya; orchard manager Iqra). It offered orchard mapping, photo diagnosis against preloaded images, video guidance, experts and weather alerts. Prescriptions were checked by pathologists before release. Android only; no user numbers given [V] ([Kashmir Life](https://kashmirlife.net/android-orchards-287323/)). **Whether FarmIT and Qul's Farmit are the same product is UNVERIFIED.**
- **Gaps we could fill:** No Kashmiri language (Urdu and English only). Farmit is tied to Qul's HD-orchard business, so it fits traditional orchards and non-Qul growers less well. No marketplace for labour or transport is mentioned.

### 2.3 Apple Doc (Dr Basharat Ahmad Bhat, incubated at SKIIE/SKUAST-K)
- **Offers:** An "AI-driven decision support system" with hourly and real-time weather advisories, spray and fertiliser timing, irrigation by soil moisture, soil-test-based advice, satellite-linked orchard data, expert chat, video calls or visits (KVK experts for remote areas), SMS updates that work offline, and links to input suppliers, schemes and banks [V] ([Greater Kashmir](https://www.greaterkashmir.com/business/basharat-develops-app-to-help-apple-growers/), [Business Kashmir](https://www.businesskashmir.com/2022/04/23/apple-doc-at-growers-fingertips/), [Kashmir Reader](https://kashmirreader.com/2022/02/26/skuast-launches-ai-based-app-apple-doc-for-precision-farming-of-apples/)). Funded with ₹50 lakh under BIRAC-BIG; launched 7 Mar 2022 [V]. Planned drone precision spraying and expansion to rice, cherry and walnut [V].
- **Traction:** No user numbers were published. **I could not find a current Play Store listing** in Play searches on 2026-11-12, so its current availability is UNVERIFIED.
- **Gaps:** It may be dormant, and no published evidence shows the image-based AI works. The market for SKUAST-linked decision support is open.

### 2.4 Kash Crop (Hazik Hussain, Norpora, Tral)
- **Offers:** GPS plus an in-app AI assistant; weather, plant-protection product information, disease identification, market rates, soil testing, customer care; apple first [V] ([FreshPlaza, 4 Dec 2025](https://www.freshplaza.com/asia/article/9791367/kashmir-developer-launches-horticulture-support-app/), [ETV Bharat](https://www.etvbharat.com/en/state/kashcrop-kashmir-youth-develops-app-to-help-out-apple-farmers-enn25120303879)). Release was announced for New Year's Day 2026.
- **Traction:** No listing found in Play searches on 2026-11-12 [V], so its status is UNVERIFIED. Rising Kashmir credits a "Haziq Hussain" as developer of SKUAST-K's new Plant Health Clinic app (May 2026) [V]. **Whether this is the same person is UNVERIFIED.**
- **Gaps:** It is an early-stage solo project. It shows that local developers are building similar feature sets.

### 2.5 SKUAST-K e-Plant Health Clinic (Directorate of Extension)
- **Offers:** Case creation with crop photos and location, expert review, **live video consultation with SKUAST-K scientists**, messaging, feedback and reopening cases. The store text calls AI guidance "decision support". Launched 18 May 2026 by the VC [V] ([Rising Kashmir](https://risingkashmir.com/skuast-k-launches-ai-driven-plant-health-clinic/), [Play](https://play.google.com/store/apps/details?id=com.skuast.planthealthclinic.app)).
- **Traction:** Play shows **10+ downloads** [V].
- **Gap or partnership:** This is the natural **expert-escalation partner** for our yes/no wizard. Analysis: integrate a "send case to SKUAST-K clinic" hand-off rather than competing with it.

### 2.6 HADP apple value-chain restructuring and Kisan Khidmat Ghar (J&K government)
- **Facts** [V] ([FreshPlaza, 2 Feb 2026](https://www.freshplaza.com/asia/article/9807105/)):
  - **HADP Project-21** (designer plants for high density): 10,000+ applications, 4,500 approvals, 1,500+ units in two years.
  - Nurseries moving to rootstock banks and mother orchards; small grading units near production areas.
  - Investment in CA storage and reefer transport; first rail apple consignment from the Valley in 2025.
  - Output above 2.1 million t.
  - **Kisan Khidmat Ghar** provides live wholesale prices.
- **Gaps:** The KKG app has registration and login problems (reviews) [V]. Analysis: our app can **complement or feed** KKG and HADP rather than replicate them, for example by linking HADP subsidies, designer-plant suppliers and grading units into lessons and the services marketplace.

### 2.7 Other Kashmir and Himachal items

| Item | Facts | Link |
|---|---|---|
| **Applefy** | Live spray windows and weather, a growth-stage checklist, multiple orchards, a marketplace for saplings, sprays, fertilizer and tools. Follows the "SKUAST Integrated Management Guide for Apple Orchards, Kashmir". Android only; SMS OTP login; team not named [V]. No Play listing found by search [V]. | [applefy.in/faq](https://applefy.in/faq/) |
| **AppleCare Kashmir** (GitHub, open source) | FastAPI plus Flutter. A MobileNetV3-Large classifier for 6 classes (scab, Alternaria leaf blotch, powdery mildew, black rot/canker, cedar apple rust, healthy) trained on "Kashmir indigenous and PlantVillage" data; reports 98.04% test accuracy and about 15 ms in ONNX. SKUAST-K stage advisories with doses per 100 L; spray-safe weather windows for 10 districts; **voice advisories in Urdu, Kashmiri and English**; rejects non-plant images. **No licence file** [V]. | [GitHub](https://github.com/munazimashraf/Kashmir-Apple_care) |
| **Kashmir Apple Market & Orchads** | Market rates and orchard information. Developer "Financial Knowledge Pro". **4.7** (12) / 500+ [V]. | [Play](https://play.google.com/store/apps/details?id=com.kashmir.applemarket) |
| **Orchive: Smart Apple Farming AI** | Planting-density calculator, elevation insights, variety and pollination guide, "Orchive Vision" image analysis, satellite insights. Developer Sawan Chauhan (location not stated). **5.0** (7) / 100+ [V]. | [Play](https://play.google.com/store/apps/details?id=com.qdagrw.applearc) |
| **Himachal agromet advisories** | Dr YSP UHF Nauni and CSK HPKV run 4 AMFUs with IMD. About **50 WhatsApp groups reach about 5,000 farmers**; frost and fog alerts for apple orchards [V]. Nauni asks growers to email symptom photos to hodmpp@uhf.ac.in [S]. | [Tribune, 15 Jul 2025](https://www.tribuneindia.com/news/himachal/from-forecast-to-farm-himachals-agro-advisories-empower-growers), [News Himachal](https://thenewshimachal.com/2026/07/nauni-university-scientists-visit-apple-orchards-issue-advisory-on-disease-management/) |
| **Plantix** | Already covers apple scab, Marssonina and Alternaria (section 1.2). | [library](https://plantix.net/en/library/crops/apple) |

**Overall gap map (Analysis).** None of the Kashmir products found combines all of the following:

1. **Kashmiri voice** in both Perso-Arabic and Devanagari scripts. Only the AppleCare prototype mentions it.
2. A **transparent yes/no diagnostic wizard** with confidence levels and escalation to the SKUAST-K clinic.
3. A **neutral input marketplace** that checks licences.
4. A **services marketplace** for labour, spray teams, drones and transport.
5. **Road status for the Srinagar–Jammu highway and other routes**, plus Delhi and Kashmir mandi price comparison.

---

## 3. Datasets

### 3.1 Apple leaf and fruit disease image datasets

| Dataset | Content | Licence | Link | Notes |
|---|---|---|---|---|
| **Indigenous Dataset for Apple Leaf Disease Detection and Classification** (Yatoo & Sharma; Kashmir) | **7,569 field images**, Healthy / Alternaria / Apple-Mosaic; expert-reviewed; Keras-augmented [V]. Data in Brief vol. 53 (2024) [S]. | **CC BY 4.0** [V] | [Mendeley DOI 10.17632/9m2dcb5mmr.3](https://data.mendeley.com/datasets/9m2dcb5mmr/3), [article](https://pmc.ncbi.nlm.nih.gov/articles/PMC10877676/) | Kashmir field conditions. No scab or Marssonina class. Includes augmented images, so de-duplicate before you split into train and test. |
| **Apple Leaf Diseases Image Dataset of ICAR-CITH** (Sajad Un Nabi, Ronit Jaiswal) | Alternaria leaf blotch, powdery mildew and mosaic from **ICAR-CITH experimental fields, Srinagar**; scab images taken from Kaggle; 11 Aug 2025 [V] | **CC BY 4.0** [V] | [Mendeley DOI 10.17632/gm6mfz8fz6.1](https://data.mendeley.com/datasets/gm6mfz8fz6/1) | Image counts not shown on the page. Check the origin and licence of the scab images. |
| **D-KAP Kashmiri Apple Plant Disease Dataset** (H. Sharma, D. Padha, N. Bashir) | Scab, rot and Alternaria leaf blotch plus healthy; about 419 images [S] | **ODbL (database) + DbCL (contents)** per Kaggle metadata [V] | [Kaggle](https://www.kaggle.com/datasets/hsmcaju/d-kap) | ODbL is share-alike for the database. |
| **AppleScab-LT** (Hilal, Sofi, Goel; SKUAST-K and a Shopian orchard, Apr–Sep 2025 [S]) | 21 longitudinal leaf sequences, 2,101 images, polygon annotations, severity [V] | Not stated; hosting not stated [V] | [arXiv 2608.14235](https://arxiv.org/abs/2608.14235) | Valuable for scab-progression or severity models. Contact the authors. |
| **SKUAST-K orchard dataset** (Khan, Quadri, Banday) | Scab, Alternaria, mosaic, **Marssonina leaf blotch** and powdery mildew (1,556 scab, 1,312 MLB images) [S]; CNN accuracy about 97.18% [V] | Availability and licence not stated [V] | [arXiv 2007.02980](https://arxiv.org/abs/2007.02980) | The only Marssonina-labelled Kashmir set found. It is not public. |
| **Himachal and Uttarakhand set** (research article) | "50,000 images" from HP and Uttarakhand apple farms; Marssonina and scab [S] | Not public (UNVERIFIED) | [ScienceDirect](https://www.sciencedirect.com/org/science/article/pii/S1546221821000916) | Lead only. |
| **PlantVillage** (Hughes & Salathé) | 54,303 images, 38 classes in TFDS. The original source is no longer available, so TFDS uses a republished copy [V]. Apple classes (scab, black rot, cedar apple rust, healthy) [UNVERIFIED] | Original image terms unclear: the GitHub repo has no licence, and the arXiv page shows CC BY-NC-SA 4.0 for the paper only [V] | [arXiv 1511.08060](https://arxiv.org/abs/1511.08060), [GitHub](https://github.com/spMohanty/PlantVillage-Dataset), [TFDS](https://www.tensorflow.org/datasets/catalog/plant_village) | **Lab backgrounds. Mohanty et al. 2016: 99.35% held-out accuracy fell to 31.4% on images from other sources** [S] ([arXiv 1604.03169](https://arxiv.org/abs/1604.03169)). |
| **PlantVillage, augmented copy** (Arun Pandian & Gopal 2019) | 61,486 images, 39 classes including apple, with augmentation [V] | **CC0 1.0** [V] | [Mendeley 10.17632/tywbtsjrjv.1](https://data.mendeley.com/datasets/tywbtsjrjv/1) | The cleanest licence route to PlantVillage images. |
| **Plant Pathology 2020 (FGVC7)** (Cornell; Thapa et al., *Applications in Plant Sciences* 8(9):e11390) | 3,651 images: 1,200 scab, 1,399 cedar apple rust, 187 complex, 865 healthy [S] | **Governed by Kaggle competition rules; data licence UNVERIFIED.** The article is CC BY 4.0 [V]. | [Kaggle](https://www.kaggle.com/c/plant-pathology-2020-fgvc7), [article](https://pmc.ncbi.nlm.nih.gov/articles/PMC7526434/) | Check the competition "Rules" tab before commercial use. |
| **Plant Pathology 2021 (FGVC8)** | 18,632 images; adds two diseases [S] | Per competition rules (UNVERIFIED); mirrors list "Unknown" [S] | [Kaggle](https://www.kaggle.com/competitions/plant-pathology-2021-fgvc8/data) | Same caution. |
| **AppleLeaf9** (Yang, Duan, Wang 2022, *Agronomy* 12:2784) | 14,582 images (94% in the wild), 9 classes: healthy, Alternaria leaf spot, brown spot, frogeye, grey spot, mosaic, powdery mildew, rust, scab [V] | **CC BY 4.0** [V] | [GitHub](https://www.github.com/JasonYangCode/AppleLeaf9) | Built from PlantVillage, ATLDSD, PP2020 and PP2021, so the upstream terms may still apply. |
| **ATLDSD**, Apple Tree Leaf Disease Segmentation (Feng & Chao 2022) | About 1,641 image and mask pairs with pixel-level masks [S] | UNVERIFIED | [Science Data Bank DOI 10.11922/sciencedb.01627](https://doi.org/10.11922/sciencedb.01627) | Useful for lesion-area severity scoring. |
| **A Dual-Dataset Framework for Apple Leaf Analysis** (pest lifecycle and disease) | Not inspected | UNVERIFIED | [Mendeley r56kb9t3t4](https://data.mendeley.com/datasets/r56kb9t3t4/1) | Lead only. |

### 3.2 Fruit detection and yield datasets

| Dataset | Content | Licence | Link |
|---|---|---|---|
| **MinneApple** (Häni, Roy, Isler) | Detection, segmentation and counting benchmark; about 1,000 images with 41,000+ annotated instances per the abstract [S] | **CC BY-NC-SA 3.0 US** per the DRUM record [S]. The code repo is MIT [V]. | [GitHub](https://github.com/nicolaihaeni/MinneApple), [DRUM DOI 10.13020/8ecp-3r13](https://conservancy.umn.edu/handle/11299/206575) |
| **Fuji-SfM** (GRAP, Univ. Lleida) | Mask R-CNN training images, SfM images of 11 Fuji trees, 3D point cloud with apple ground truth (Spain, 2017) [S] | **Conflict:** Zenodo metadata says CC BY 4.0, but the bundled **LICENSE.txt says CC BY-NC-SA 4.0** [V], and the GRAP page says research and education only [S]. Treat it as **non-commercial**. | [Zenodo 3712808](https://zenodo.org/record/3712808), [Data in Brief](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7184157/) |
| Other GRAP sets (KFuji RGB-DS, PFuji-Size) | Not inspected | UNVERIFIED | [GRAP publications](https://grap.udl.cat/en/publications/fuji-sfm-dataset/) |

### 3.3 Weather

| Source | Facts | Licence and terms | Link |
|---|---|---|---|
| **IMD API** | Endpoints under `api.imd.gov.in/api/v1/` [V]: `cityforecast`, `cityforecastloc`, `current_wx`, `districtnowcast`, `stationnowcast`, **`aws_data`**, `districtwarning`, `districtrainfall`, `sunmoon`, among others. Agromet advisory, radar and lightning are also listed. | **IP whitelisting** via a request form and confirmation email [S]. The newer portal mentions JWT and key-based access [S]. Rate limits not stated. | [API reference](https://api.imd.gov.in/public/api_reference.html), [whitelisting form](https://city.imd.gov.in/citywx/api_request.php) |
| **IMD gridded data** | 0.25° daily rainfall 1901–2024 (135×129 grid); NetCDF, GRD and ASCII; cite Pai et al. (2014); IMD disclaims liability [S] | Formal licence not found; some products are "restricted" on IRI [S] (UNVERIFIED) | [IMD Pune NetCDF](https://imdpune.gov.in/cmpg/Griddata/Rainfall_25_NetCDF.html) |
| **ERA5 / ERA5-Land** (Copernicus C3S) | Global hourly reanalysis | **CC BY 4.0 since 2 July 2025**, replacing the Copernicus licence. Credit "Generated using Copernicus Climate Change Service data [Year]…" [S] | [ECMWF forum](https://forum.ecmwf.int/t/cc-by-licence-to-replace-licence-to-use-copernicus-products-on-02-july-2025/13464), [access conditions](https://apps.ecmwf.int/datasets/licences/era5) |
| **Open-Meteo** | Forecast, historical, ensemble APIs | Data **CC BY 4.0, attribution required even for commercial use** [V]. Free tier is **non-commercial only**: under 10,000 calls/day, 5,000/hour, 600/minute; apps with subscriptions or ads count as commercial [V]. Paid tiers: Standard 1M, Professional 5M, Enterprise 50M+ calls/month (prices only at checkout) [V]. Server is **AGPLv3**, so you can self-host [V]. | [Terms](https://open-meteo.com/en/terms), [Pricing](https://open-meteo.com/en/pricing) |

### 3.4 Market prices

| Source | Facts | Licence | Link |
|---|---|---|---|
| **Agmarknet 2.0** | Upgraded Nov 2025; 4,367 mandis linked [S]. Ministry points users to the Agmarknet 2.0 dashboard and UPAg [S]. | Official API for 2.0: UNVERIFIED | [agmarknet.gov.in](https://agmarknet.gov.in), [india.gov.in](https://www.india.gov.in/category/agriculture-rural-environment/subcategory/agricultural-produce/details/prices-arrival-reports-agmarknet) |
| **data.gov.in, "Current Daily Price of Various Commodities from Various Markets (Mandi)"** | Daily min, max and modal wholesale prices from Agmarknet [S]. The page snippet says "The API for this resource does not exist… Request API" [S]. Community wrappers exist. | **GODL-India**: worldwide, royalty-free, **commercial use allowed** with attribution; notified Feb 2017 [S]. AIKosh lists the same data under the Open Government License, India [S]. | [data.gov.in resource](https://data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi), [AIKosh](https://aikosh.indiaai.gov.in/home/datasets/details/variety_wise_daily_market_prices_of_commodity.html), [GODL (Wikipedia)](https://en.wikipedia.org/wiki/National_Data_Sharing_and_Accessibility_Policy) |
| **e-NAM** | Mandi-wise arrivals and prices in the app [V]. J&K e-NAM value over ₹670 cr [V]. | Terms UNVERIFIED | [enam.gov.in](https://enam.gov.in), [Play](https://play.google.com/store/apps/details?id=in.gov.enam) |
| **Kisan Khidmat Ghar** (J&K) | Live wholesale prices from major markets [V] | Partnership needed | [FreshPlaza](https://www.freshplaza.com/asia/article/9807105/) |

### 3.5 Soil

| Source | Facts | Licence | Link |
|---|---|---|---|
| **Soil Health Card portal** | Per-farmer card PDFs (state, district, village, then name or ID); national nutrient dashboard [S]. Village-level J&K datasets appear on third-party portals (Dataful; India Data Portal CKAN "Soil Nutrient Analysis", updated 26 Aug 2025) [S]. | Third-party portal terms UNVERIFIED | [soilhealth.dac.gov.in](https://soilhealth.dac.gov.in), [Dataful](https://dataful.in/datasets/24070/), [IDP CKAN](https://ckandev.indiadataportal.com/dataset/soil-health-card), [AIKosh SHC](https://aikosh.indiaai.gov.in/home/datasets/details/shc_dataset.html) |
| **SoilGrids 2.0** (ISRIC, 250 m) | pH, SOC, bulk density, texture, CEC, N at six depths. **The REST API is paused with no restoration date.** Use WCS, GeoTIFF or Google Earth Engine instead [S]. | **CC BY 4.0** [S] | [ISRIC docs](https://docs.isric.org/globaldata/soilgrids/) |
| ICAR-NBSS&LUP soil maps | Not checked | UNVERIFIED | (no source gathered) |

### 3.6 Satellite

| Source | Facts | Licence | Link |
|---|---|---|---|
| **Sentinel-2** (Copernicus) | 10 m multispectral | "Free, full and open"; modified products must carry **"Contains modified Copernicus Sentinel data [Year]"** [S] | [Legal notice](https://sentinel.esa.int/documents/247904/690755/Sentinel_Data_Legal_Notice), [CDSE T&C](https://dataspace.copernicus.eu/node/10) |
| **Landsat** (USGS) | 30 m | **No restrictions** on use or redistribution; citation requested [S] | [USGS FAQ](https://www.usgs.gov/faqs/are-there-any-restrictions-use-or-redistribution-landsat-data) |
| **ISRO Bhuvan / NOEDA, Bhoonidhi** | Free registration. AWiFS (56 m) and LISS-III (23.5 m) are free with about a **2-year lag**. LISS-IV was priced per a NIAS brief. A blog reports the LISS-IV archive was opened on Bhoonidhi [S]. | NRSC data policy (UNVERIFIED) | [Bhuvan free data](https://bhuvan.nrsc.gov.in/wiki/index.php/Free_Satellite_Data_Download), [Bhoonidhi FAQ](https://bhoonidhi.nrsc.gov.in/bhoonidhi/htmls/FAQ.html), [LISS-IV blog](https://spatialthoughts.com/2023/12/25/liss4-processing-xarray/) |

### 3.7 Kashmiri speech and language datasets

| Item | Facts | Licence | Link |
|---|---|---|---|
| **Bolbosh** (Kashmiri TTS; GAASH Lab) | First open neural Kashmiri TTS (Matcha-TTS, OT-CFM). **MOS 3.63 vs 1.86** for zero-shot Indic baselines [V] (arXiv 2603.07513, Mar 2026). | Dataset CC BY 4.0; GAASH Kashmiri Matcha-TTS model MIT [S] | [arXiv](https://arxiv.org/abs/2603.07513), [project](https://gaash-lab.github.io/Bolbosh), [HF dataset](https://huggingface.co/datasets/GAASH-Lab/Bolbosh), [HF model](https://huggingface.co/GAASH-Lab/Matcha-TTS-Kashmiri) |

---

## 4. AI and language technology for Kashmiri, Urdu and Hindi users

### 4.1 Language support matrix

| Provider / model | Kashmiri | Urdu / Hindi | Licence and access | Source |
|---|---|---|---|---|
| **Bhashini** (MeitY) | **ASR:** `bhashini/ai4bharat/conformer-multilingual-asr`, `bhashini/bodhan/asr-transcribe-flex` and `-core`. **NMT:** `bhashini/iiith/nmt-all`, `ai4bharat/indictrans-v2-all-gpu--t4`, `bhashini/bodhan/Indic-trans-v4`, `bhashini/iitp/coild/nmt` (all source and target); `Bhashini/IIITH/Trans/V1` (target only). **TTS:** `Bhashini/IITM/TTS` "**Kashmiri (Devanagari Script)**", `bhashini/bodhan/indic-tts`. Also transliteration (IndicXlit), printed-text OCR, and audio and text language ID [V]. | Yes (multiple) | Government API platform; the docs page was about 9 months old [S]. Usage terms UNVERIFIED. | [Bhashini API docs](https://dibd-bhashini.gitbook.io/bhashini-apis/available-models-for-usage) |
| **AI4Bharat IndicTrans2** | **kas_Arab and kas_Deva** [S] | Yes | **MIT** checkpoints; training data CC0 / CC BY 4.0 [S] | [GitHub](https://github.com/AI4Bharat/IndicTrans2), [HF](https://huggingface.co/ai4bharat/indictrans2-indic-indic-1B) |
| **AI4Bharat IndicConformer 600M multilingual** (ASR) | Kashmiri (ks) listed among 22 languages; a separate monolingual `indicconformer_stt_ks_hybrid_ctc_rnnt_large` exists [S] | Yes | **MIT**; **gated** on HF (accept terms) [S] | [HF](https://huggingface.co/ai4bharat/indic-conformer-600m-multilingual), [GitHub](https://github.com/AI4Bharat/IndicConformerASR) |
| **AI4Bharat Indic Parler-TTS** | Kashmiri only **"unofficial" support** [S] | Urdu officially supported [S] | Apache-2.0 per model card; AIKosh lists MIT (conflict) [S] | [HF](https://huggingface.co/ai4bharat/indic-parler-tts) |
| **Meta MMS** | **Language ID only; no ASR or TTS** for `kas` [V] | Urdu ASR and TTS (Arabic, Devanagari and Latin scripts) [V] | **CC-BY-NC 4.0, non-commercial** [S] | [MMS coverage table](https://dl.fbaipublicfiles.com/mms/misc/language_coverage_mms.html) |
| **Google Cloud Translation / Google Translate** | **Not on the Cloud Translation supported-language page** (checked 2026-11-12; Dogri, Konkani, Maithili, Manipuri, Sindhi and Urdu are) [V]. The June 2024 expansion added 7 Indian languages, not Kashmiri [S]. | Yes | Commercial API | [Cloud languages](https://cloud.google.com/translate/docs/languages), [Google blog](https://blog.google/intl/en-in/google-translate-new-languages-2024/) |
| **Sarvam AI** | **Sarvam-Translate and Sarvam Vision list `ks-IN` and `ur-IN`.** Saaras v3 ASR covers "23 languages"; Kashmiri is likely but not confirmed for v3 [V]. **Bulbul TTS v3 and v4 do not cover Kashmiri or Urdu** [V]. | Partly | Commercial API | [Sarvam models](https://docs.sarvam.ai/api-reference-docs/getting-started/models) |
| **Kashmiri ASR quality** | A search summary attributes to the Bolbosh paper a best tested Kashmiri ASR WER of 41.2% (66.6% with diacritics) [UNVERIFIED: not visible on the abstract page] | | | [arXiv 2603.07513](https://arxiv.org/abs/2603.07513) |

**Implications (Analysis):**
- Kashmiri voice output is the weakest link. Bhashini TTS is Devanagari-only, while most Kashmiri readers use Perso-Arabic script, and Bolbosh is research-grade.
- Plan for: pre-recorded Kashmiri audio for the fixed yes/no wizard prompts (the most reliable option); Bhashini or IndicTrans2 for dynamic text; Urdu TTS as a fallback; and human-reviewed translations of safety-critical text (doses, PHI).
- Avoid MMS in a commercial product because of its NC licence.

### 4.2 WhatsApp, voice and chat channels in Indian agriculture
- **WhatsApp:** Jugalbandi [V]. Himachal AMFU WhatsApp groups (human-run) [V]. Orchardly grew out of WhatsApp advice to growers [V].
- **Voice helpline:** Bharat VISTAAR on 155261 [S]. Kisan e-Mitra accepts voice input [V].
- **App plus LLM:** FarmerChat, KissanAI, Farmit (Urdu chat and voice) [V].

### 4.3 Evaluations of LLM farm advisors

| Evaluation | Finding | Link |
|---|---|---|
| Digital Green LLM-as-judge (Oct 2024) | Binary RAG-faithfulness judge built on atomic facts correlated highly with humans on about 360 questions. Results on about 700 queries: Gemini-1.5-Pro 91%, Flash 89%, GPT-4-turbo 88%, Llama-3-70B 78%. Track **unanswered rate** alongside faithfulness [V]. | [HF blog](https://www.huggingface.co/blog/digital-green-llm-judge) |
| DG-Eval / fine-tuning paper (Feb–Mar 2026) | Separates fact retrieval (LoRA SFT on expert "golden facts") from a delivery "stitching" layer. Atomic-fact recall, precision and contradiction metrics. A smaller fine-tuned model matched or beat frontier models on factual quality at lower cost (qualitative claims; Bihar data) [V]. | [arXiv 2603.03294](https://arxiv.org/abs/2603.03294) |
| Assorted 2025 studies | Headline accuracies of 91–97% come from small closed benchmarks, for example a Dhenu2 RAG study at 95.2% on 504 questions [S]. **Kisan-BiQAS (KCC data): LLaMA F1 ≈ 0.45; Qwen F1 ≈ 0.15 with ≈58% hallucination** [S]; the exact paper behind this figure was not identified among the results (UNVERIFIED source). | [ResearchGate (Dhenu2)](https://www.researchgate.net/publication/394096501_Empowering_Indian_Farmers_with_Multilingual_AI_A_Voice-Enabled_ChatBot_Using_Dhenu2), [Frontiers review](https://www.frontiersin.org/journals/remote-sensing/articles/10.3389/frsen.2026.1839369/full) |
| IFPRI and Digital Green user testing (2025–27) | Preliminary: local specificity (crop stage, weather, available inputs) drives trust; voice matters for low-literacy users; women benefit from assisted onboarding; low bandwidth slows image and voice uploads [V]. | [Rural21](https://www.rural21.com/english/news/detail/article/testing-ai-advisory-services-insights-from-farmerchat-in-india-and-kenya.html) |

### 4.4 On-device image models
- **LiteRT** is TensorFlow Lite renamed on **4 Sep 2024**. It is the same runtime with a new package name (Python `ai-edge-litert`), and it now accepts PyTorch, JAX and Keras models. Apps using TFLite through Play Services needed no changes [S] ([Google dev blog](https://developers.googleblog.com/en/tensorflow-lite-is-now-litert/)).
- **PlantVillage Nuru** (cassava, offline) [S] ([Frontiers 2020](https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2020.590889/text)):
  - With six leaves examined, symptom-recognition accuracy was 74–88%.
  - Field accuracy was 65% (2020), against 40–58% for extension agents and 18–31% for farmers.
- **Generalisation warning:** a model trained on PlantVillage reached 99.35% on held-out images but **31.4%** on images from other sources [S] ([arXiv 1604.03169](https://arxiv.org/abs/1604.03169)). Lightweight apple models such as CC-MobileViT (98.10%) are reported mostly on curated sets [S] ([Frontiers 2025](https://frontiersin.org/journals/plant-science/articles/10.3389/fpls.2025.1545875/pdf)).
- **Analysis:** Collect Kashmir field photos through the wizard with explicit DPDP consent and record the GPS location. Use "unknown / see expert" outputs, and add a non-plant rejector (as AppleCare Kashmir does).

---

## 5. Disease and pest forecasting

### 5.1 Apple scab infection models
- **Mills table** (Mills & Laplante 1944, 1951), **modified by Jones 1980**, with Mills's criteria **revised by MacHardy & Gadoury 1989** (journal citation *Phytopathology* 79:304 is from memory, UNVERIFIED). The Virginia Tech extension page reproduces a simplified Mills table and links the MacHardy & Gadoury PDF. It recommends Mills charts when growers do not use digital models [V] ([VT](https://treefruitpathology.spes.vt.edu/?p=770)). **The hour-by-temperature thresholds were not transcribed in this session.** Take them from the primary paper (UNVERIFIED here).
- **Low-temperature revision** by Stensvand et al. 1997 (Phytopathology): reference from memory [UNVERIFIED].
- **RIMpro:** see section 1.5.
- **NEWA apple scab:** ascospore maturity, discharge and infection events; also a "potential ascospore dose" threshold of 53 infected leaves per 600 shoots for skipping the green-tip spray in low-inoculum orchards [V] ([NEWA](https://newa.cornell.edu/apple-scab)).

### 5.2 Marssonina, Alternaria and mite models
- **Not researched in this session** (search budget exhausted).
- Leads to follow up: weather-based Marssonina coronaria and Alternaria mali infection models from Korea, China, Italy and India (SKUAST-K/ICAR-CITH); degree-day models for European red mite and two-spotted spider mite egg hatch.
- All UNVERIFIED. Plantix lists Marssonina Blotch, Alternaria, European Red Mite and Spider Mites in its apple library [V], but that covers identification, not forecasting.

### 5.3 Weather-station and IoT networks: Kashmir and Himachal

| Network | Facts | Link |
|---|---|---|
| Orchardly (Kashmir) | 40 community micro-weather stations; ML-based preventive and curative advice from weather, soil, crop stage and disease patterns [V] | [Startuppedia](https://startuppedia.in/startup-stories/kashmiri-entrepreneurs-build-an-os-for-indias-apple-industry-clock-rs-19-cr-in-fy26-12440645) |
| Kisan Khidmat Ghar (J&K govt) | "Orchard-wise weather prediction" [V]; pest and disease forecasting linked to local weather (FreshPlaza summary) [S] | [Play](https://play.google.com/store/apps/details?id=com.bisagn.kkg), [FreshPlaza](https://www.freshplaza.com/asia/article/9807105/) |
| Apple Doc | Satellite-based weather advisories; "very good accuracy" claimed without data [V] | [Business Kashmir](https://www.businesskashmir.com/2022/04/23/apple-doc-at-growers-fingertips/) |
| Fasal | IoT units with disease and pest predictions; apple listed; Kashmir not confirmed [V] | [fasal.co](https://fasal.co/) |
| Himachal AMFUs (Nauni, Palampur, with IMD) | Frost and fog alerts for apple; WhatsApp distribution; growers acting on advisories report fewer losses (qualitative) [V] | [Tribune](https://www.tribuneindia.com/news/himachal/from-forecast-to-farm-himachals-agro-advisories-empower-growers) |
| SKUAST-K and HADP automatic weather stations for scab forecasting | **UNVERIFIED.** Not found before the search budget ran out. | (none) |

**Analysis:** Implement a Mills/MacHardy infection-period engine using hourly forecast temperature, precipitation and RH, and estimate leaf wetness from RH and rain. Calibrate it against SKUAST-K/ICAR-CITH observations, and label outputs as "risk", not certainty.

---

## 6. Orchard technology

### 6.1 Drones
- **Drone Rules, 2021** (PIB release 26 Aug 2021; replaced the UAS Rules of March 2021) [V] ([PIB 1749154](https://www.pib.gov.in/PressReleasePage.aspx?PRID=1749154)):
  - **Approvals and paperwork:** forms cut from 25 to 5; fee types cut from 72 to 4; remote pilot licence fee ₹100, valid 10 years.
  - **Airspace:** Digital Sky airspace map with green, yellow and red zones; **no permission needed in green zones** (up to 120 m); yellow zone cut to 12 km from airport perimeters.
  - **Coverage:** extended to drones up to 500 kg.
  - **Licensing:** remote pilot certificate from DGCA-authorised drone schools.
  - **Penalties:** maximum ₹1 lakh.
  - **Future requirements:** NPNT and geo-fencing to be notified later.
- **Pesticide spraying by drone:** the MoA&FW SOP for drone pesticide and nutrient application and the CIB&RC interim approvals for drone use of registered pesticides are **UNVERIFIED in this session** (sources blocked). Confirm the current status on [ppqs.gov.in](https://ppqs.gov.in) (CIB&RC) and [agriwelfare.gov.in](https://agriwelfare.gov.in).
- **Kashmir and Himachal drone-spray trials:** UNVERIFIED (not found). Orchardly lists "drone-based services" [V]; Apple Doc planned drone precision spraying [V].
- **Analysis:** Before offering drone services in J&K, check the airspace zones on [Digital Sky](https://digitalsky.dgca.gov.in) for each orchard location. Much of J&K may sit in yellow or red zones (UNVERIFIED).

### 6.2 Remote sensing of orchards
- Sentinel-2, Landsat and Bhuvan: section 3.6.
- In-market satellite features: DeHaat (farm health, moisture, stress) [V]; Orchive ("satellite-based insights") [V]; Orchardly (multispectral monitoring "upcoming") [V].
- ISRO's **CHAMAN** horticulture programme page ([nrsc.gov.in/chaman](https://www.nrsc.gov.in/chaman)) could not be loaded. Whether CHAMAN mapped J&K apple is UNVERIFIED.

### 6.3 Hail nets and anti-hail systems
UNVERIFIED. No sources were gathered before the search budget ran out.

### 6.4 Sprayer types (air-blast, tower, tunnel)
UNVERIFIED. No sources were gathered. Related: the HADP article mentions canopy management and **targeted application** demonstrated in model orchards to cut pesticide use [V] ([FreshPlaza](https://www.freshplaza.com/asia/article/9807105/)).

### 6.5 Smart pheromone traps
Trapview: section 1.5. A 2022 MDPI review of camera traps for codling moth is a good primer [S] ([MDPI](https://www2.mdpi.com/2077-0472/12/10/1721)). No Indian deployments were found.

### 6.6 Harvesting robots, platforms and crop-load tools
Tevel (flying pickers), FruitScout (crop load), Aerobotics (sizing) and Croptracker Crop Load Vision: section 1.5. Harvest-assist platforms were not researched (UNVERIFIED).

### 6.7 Grading, CA storage and logistics (J&K)
HADP [V] ([FreshPlaza](https://www.freshplaza.com/asia/article/9807105/)):
- Small-scale grading units near production areas enable grade-based pricing.
- Investment in CA storage and refrigerated transport.
- First rail apple consignment from the Valley in 2025.
- High-density designer-plant units (Project-21).

CA capacity figures, 1-MCP/SmartFresh and dynamic CA were not researched (UNVERIFIED).

### 6.8 Traceability, QR and blockchain
- Orchardly runs **QR-based traceability** recording sprays, fertiliser and harvest [V].
- Orchardly's 2022 plan included barcode-based supply-chain traceability [V].
- HPMIS (Himachal) issues digital receipts plus DBT [V].
- Croptracker provides traceability to block and employee [V].
- APEDA export traceability (HortiNet) and blockchain pilots: UNVERIFIED.

### 6.9 GI tags relevant to Kashmir apples
UNVERIFIED. The GI registry list page returned 404 when fetched. Check the GI Registry at [ipindia.gov.in](https://ipindia.gov.in) for any "Kashmir apple" or variety-level application.

---

## 7. Regulations that shape the app

### 7.1 Digital Personal Data Protection Act 2023 and DPDP Rules 2025 (verified from the gazette text)

**Commencement** [V] ([MeitY Rules PDF, G.S.R. 846(E)](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf), [commencement notification G.S.R. 843(E)](https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf), [PIB 14 Nov 2025](https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2190014)):
- The Rules are dated 13 Nov 2025.
- Rules 1, 2 and 17–21 (the Data Protection Board and related) took effect on publication.
- **Rule 4 (Consent Managers) takes effect one year after publication, about 13–14 Nov 2026.**
- **Rules 3 and 5–16, 22 and 23 (notice, security, breach, retention, children, rights and related) take effect 18 months after publication, about 13–14 May 2027.**
- Under the Act: sections 3–5, 6(1)–(8), 6(10), 7–17 and others come into force 18 months after publication; section 6(9) and section 27(1)(d) after one year.

**Key obligations** [V] (rules text):

| Area | Requirement | Product implication (Analysis) |
|---|---|---|
| **Notice** (Rule 3) | Standalone, plain-language notice with an **itemised list of personal data**, the specified purpose(s) and the goods or services enabled. Give a link and the means to **withdraw consent as easily as it was given**, to exercise rights and to complain to the Board. | Separate consent screens for (a) account, (b) photo diagnosis and AI training, (c) location, (d) marketing. Make the notice available in Kashmiri, Urdu, Hindi and English. |
| **Security** (Rule 6) | Encryption, obfuscation or masking, access control, logging and monitoring, backups. **Retain logs and personal data for one year** for detecting unauthorised access. Include security clauses in processor contracts. | Vendor contracts with LLM, SMS and cloud providers. |
| **Breach** (Rule 7) | Inform affected users without delay. Inform the **Board without delay, with a detailed report within 72 hours**. | Incident-response runbook. |
| **Retention** (Rule 8) | The Third Schedule's 3-year inactivity erasure applies to **e-commerce entities with 20 million (2 crore) or more registered users in India**, with a **48-hour pre-erasure notice**. All data fiduciaries must keep processing logs for at least **one year**. | Below the threshold at launch; plan for it. |
| **Contact** (Rule 9) | Publish the DPO's contact, or that of a person who can answer processing questions. | In-app "Privacy contact". |
| **Children** (Rule 10) | **Verifiable parental consent** before processing a child's data (under 18). | Age gate. Youth may use family phones. |
| **Rights and grievances** (Rule 14) | Publish how to exercise rights. **Respond to grievances within 90 days.** Allow nomination. | |
| **Penalties** (Act Schedule) [V] ([Act PDF](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf)) | Security-safeguard failure: up to **₹250 crore**. Breach-notice failure: up to ₹200 crore. Children's obligations: up to ₹200 crore. Other breaches: up to ₹50 crore. | |

### 7.2 Consumer Protection (E-Commerce) Rules, 2020 [UNVERIFIED in this session: consumeraffairs.nic.in was unreachable]

Official text: [consumeraffairs.nic.in PDF](https://consumeraffairs.nic.in/sites/default/files/E%20commerce%20rules.pdf). From memory, to be verified:
- Notified July 2020; applies to marketplace and inventory models.
- Marketplace duties: a grievance officer who **acknowledges complaints within 48 hours and resolves them within one month**; display of seller details; country-of-origin information; no price manipulation.

Also check (UNVERIFIED):
- The CCPA's 2023 Guidelines on Dark Patterns.
- IT (Intermediary) Rules 2021 grievance timelines.
- Legal Metrology e-commerce declarations.
- GST TCS for e-commerce operators.
- RBI rules if you handle payments.

### 7.3 Pesticides
- **Insecticides Act, 1968 and Insecticides Rules, 1971:**
  - Selling, stocking or exhibiting insecticides for sale requires a licence from the state licensing officer (section 13 of the Act, from memory) [UNVERIFIED].
  - **Whether an amendment expressly permits or regulates e-commerce sale, and on what conditions, could not be verified** [UNVERIFIED]. Confirm with CIB&RC/DPPQS ([ppqs.gov.in](https://ppqs.gov.in)) and the J&K Department of Agriculture/Horticulture licensing officer.
- **In practice:** national platforms openly list pesticides for online sale: BigHaat, Gramophone, DeHaat and AgroStar [V] (Play descriptions).
- **Pesticide Management Bill, 2020:** would replace the 1968 Act. Introduced in the Rajya Sabha 23 Mar 2020; Standing Committee report 21 Dec 2021 [V] ([PRS](https://prsindia.org/billtrack/the-pesticide-management-bill-2020)). Status after 2021: UNVERIFIED.
- **Analysis:** Use a **licensed-dealer marketplace model**. Verify each seller's licence and keep the licence number on file. Sell only CIB&RC-registered products with label claims for apple, and show the label dose and PHI. Copy Farmit's "**no insecticide recommendation at full bloom**" rule.

### 7.4 Fertilizers
**Fertiliser (Control) Order, 1985**: dealer registration and authorisation for each source; Aadhaar/PoS-based retail of subsidised fertilizers (urea, DAP) [UNVERIFIED in this session]. The Department of Fertilizers is at [fert.nic.in](https://fert.nic.in).

**Analysis:** Limit online sales to non-subsidised specialty fertilizers (water-soluble, micronutrients) through registered dealers until you have legal confirmation.

### 7.5 Nursery plants and saplings
- **NHB National Nursery Portal** [V] ([nhb.gov.in/nnp](https://nhb.gov.in/nnp/)): **1,553 accredited nurseries** (NHB, CIH, DCCD, DASD), **174 state-licensed nurseries**, 186 meeting minimum quality criteria, 10,168 registered buyers; searchable by crop ("Apple") and location. There is also an NHB **Nursery Rating System**, "Find a Star Nursery" ([nhb.gov.in](https://nhb.gov.in/)).
- **J&K nursery registration law or rules:** UNVERIFIED (not found).
- **HADP Project-21** "designer plants" scheme and the shift to rootstock banks and mother orchards [V] ([FreshPlaza](https://www.freshplaza.com/asia/article/9807105/)).
- **Clean Plant Programme** (central; approved 2024): UNVERIFIED in this session.
- **Analysis:** List saplings only from NHB-accredited or state-licensed nurseries, and show the rootstock and certification.

### 7.6 Platforms that book labour or transport
- **Code on Social Security, 2020** [V] ([PRS summary](https://prsindia.org/billtrack/the-code-on-social-security-2020)). The PRS page summarises the 2020 Bill; I did not compare it with the enacted text (UNVERIFIED that nothing changed):
  - Defines **gig and platform workers**.
  - Schemes are funded partly by **aggregators at 1–2% of annual turnover, capped at 5% of the amounts paid or payable to gig and platform workers**.
  - Aggregators are listed in **Schedule 7, which has nine categories** including ride sharing, food and grocery delivery, content and media, and **e-marketplaces**.
  - Gig and platform workers must be registered.
  - Wikipedia lists commencement dates of 3 May 2021 and **21 November 2025** [V] ([Wikipedia](https://en.wikipedia.org/wiki/Code_on_Social_Security,_2020)). Exactly which sections took effect on 21 Nov 2025 is UNVERIFIED.
- **Also check (all UNVERIFIED):** the e-Shram registration process ([eshram.gov.in](https://eshram.gov.in)); the MoRTH Motor Vehicle Aggregator Guidelines (2020, updated 2025?) for passenger transport; goods-carriage permits for truck booking; OSH Code contract-labour licensing; any J&K-specific rules.
- **Analysis:** If the services marketplace onboards pruning or spray workers or truck drivers as platform workers, expect aggregator obligations. Structure early as a lead-generation directory, or take legal advice.

### 7.7 Drones
See 6.1: Drone Rules 2021 [V]. The pesticide-application SOP and interim CIB&RC approvals are UNVERIFIED.

---

## 8. Quick reference: other sources used

- Kashmir Life, "Android Orchards" (FarmIT): https://kashmirlife.net/android-orchards-287323/
- ThePrint / ANI "Orchadly" (2022): https://theprint.in/india/mobile-app-that-connects-kashmiri-farmers-to-save-grow-sell-apples/1157350/
- Startuppedia on Orchardly: https://startuppedia.in/startup-stories/kashmiri-entrepreneurs-build-an-os-for-indias-apple-industry-clock-rs-19-cr-in-fy26-12440645
- FreshPlaza HADP (2 Feb 2026): https://www.freshplaza.com/asia/article/9807105/
- FreshPlaza Kash Crop: https://www.freshplaza.com/asia/article/9791367/kashmir-developer-launches-horticulture-support-app/
- Studies on apps: Tamil Nadu 2023 (https://ageconsearch.umn.edu/record/367859/files/Yamunarani41122023AJAEES111385.pdf); MDPI AgriEngineering 2022 evaluation of smartphone apps for Indian farmers (https://mdpi.com/2624-7402/4/3/42) [S, findings not extracted].

---

## 9. Not verified or not covered (follow-up list)

The shared web-search budget ran out mid-task, and several .gov.in sites blocked automated fetches. The items below need a follow-up pass:

1. **Pesticide e-commerce rules:** any amendment to the Insecticides Rules 1971 on online sale, the licence conditions, and the current status of the Pesticide Management Bill.
2. **FCO 1985 online-sale conditions** and PoS/DBT constraints.
3. **J&K nursery law or rules**; Clean Plant Programme details.
4. **Consumer Protection (E-Commerce) Rules 2020** text and amendments; dark-patterns guidelines; IT Rules grievance timelines.
5. **Motor Vehicle Aggregator Guidelines 2025**, goods-transport booking rules, e-Shram obligations, and which Social Security Code sections took effect on 21 Nov 2025.
6. **Drone pesticide SOP and CIB&RC interim approvals**; Kashmir and Himachal drone-spray trials; J&K airspace zones.
7. **Marssonina and Alternaria infection models**; mite degree-day models; Mills-table thresholds (transcribe from MacHardy & Gadoury 1989).
8. **SKUAST-K and HADP AWS or IoT scab-forecast networks** and their reported results; Fasal deployments in Kashmir.
9. Hail nets and anti-hail guns, sprayer types, CA storage capacity in Kashmir, APEDA traceability, **GI status of Kashmir apples**, ISRO CHAMAN apple mapping.
10. Dataset licences: the Plant Pathology 2020/2021 Kaggle rules, ATLDSD, the original PlantVillage terms, and AppleScab-LT availability.
11. Current availability of **Apple Doc** and **Kash Crop** (not found on Play on 2026-11-12); whether FarmIT (2022) is Qul's Farmit; whether Hazik Hussain (Kash Crop) is the "Haziq Hussain" behind SKUAST-K's clinic app.
12. Bhashini usage terms and SLAs; whether Saaras v3 covers Kashmiri; whether the Kashmiri ASR WER figures appear in the Bolbosh paper.
