# Kashmir Apple-Grower App: Evidence on UX, Non-Invasive Data Collection, Connectivity and a Services Marketplace

Prepared 12 Nov 2026. Scope: design guidance for a mobile app for apple orchard growers in Kashmir (users often older, some with low literacy; Kashmiri, Urdu, Hindi, English), with a services marketplace (trucks, labour gangs, spray services, equipment, experts, cold storage).

**How to read the evidence tags**

- **[V]**: I opened and read the cited page or PDF in this session.
- **[S]**: taken from a search-engine extract of the cited page. I did not re-open the page, so treat exact numbers with some care.
- **UNVERIFIED**: the sources conflict, the source is secondary or undated, or I could not confirm the fact.
- **"Proposal"**: my own design synthesis, not a sourced fact.

**Limitation:** the session's shared web-search budget ran out partway through. Some sub-topics are thinner than planned (see Section 6).

---

## 0. The 15 most actionable design rules (with evidence)

1. **Don't build a text-first app. Lead with pictures and voice, and offer text as an optional layer.**
   - In a mobile-banking test, no low-literacy subject could complete a transaction with a text interface. 72% completed it with spoken dialogue and 100% with a graphical UI. [V] https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ToCHI2711_Medhi.pdf
   - In FarmChat, every illiterate participant preferred the audio-only interface. 16 of the literate or semi-literate participants preferred audio plus text. The authors recommend a hybrid: two big buttons plus an optional chat-history view. [V] https://ubicomplab.cs.washington.edu/pdfs/farmchat.pdf
2. **Keep navigation flat.**
   - Avoid menu hierarchies, scrolling, soft-key mappings and non-numeric text entry.
   - 56 of 90 low-literacy subjects could not navigate hierarchical menus. 48 of 90 did not understand scroll bars. [V] (Medhi et al., link above)
   - In FarmChat, digitally-illiterate users never scrolled. [V] (FarmChat PDF)
3. **Use voice, replay and pictures, with some specifics.**
   - Write numbers with English (Western) digits. In FarmChat, 11 of 23 literate or semi-literate users could not read Hindi numerals.
   - Show photos of the product package. Illiterate users valued these because they fear being sold the wrong pesticide.
   - Put a big "replay" button on every answer.
   - Allow 7–8 seconds of silence before speech input stops listening. [V] (FarmChat PDF)
4. **Push short, scheduled advisories and let farmers choose how often.**
   - When Gujarat farmers chose their own call frequency, pickup rose 7.6 percentage points (control 80.0%) and listening rose 9.4 pp (control 32.6%). [V] https://registry.precisiondev.org/registry_entry/frequency-a-b-test
   - A heads-up SMS 10 minutes before an advisory call raised pickup by 5.9 pp and listening by 4 pp in Odisha (about 32,000 users). [V] https://registry.precisiondev.org/registry_entry/impact-of-heads-up-sms-on-call-pickup-and-listening/
5. **Give value before asking for anything. Ask for each data item only when it is needed.**
   - In GSMA's case study of the IFFCO Kisan app, the drop-down profiling step was "a barrier for first time users". Nearly 80% of users churned within two months. GSMA recommended simplified profiling, auto-filling location, and personalising so users see the value of sharing. [V] https://www.gsma.com/mobilefordevelopment/wp-content/uploads/2016/10/IFFCO-Kisan-Agricultural-App.pdf
   - 18% of shoppers abandon checkout when forced to create an account. [V] https://baymard.com/blog/reduce-cart-abandonment
6. **Ask for permissions and consent in context.**
   - Ask at the moment the user starts the feature that needs it. Explain why, allow "not now", and degrade gracefully. [V] https://developer.android.com/training/permissions/requesting
   - The DPDP Act requires consent to be "free, specific, informed, unconditional and unambiguous", and withdrawal must be about as easy as giving consent. [V] https://dpdpa.com/dpdpa2023/chapter-2/section6.html
7. **Build offline-first, with three channels.** The channels are the app (offline cache and outbox), voice/IVR (missed call then free call-back, which works on basic phones), and assisted service at Kisan Khidmat Ghars (KKGs) or village-level entrepreneurs (VLEs).
   - SFLC.in counts 447 shutdowns in J&K. [V] https://alpha.internetshutdowns.in/static-page/jammu-kashmir/
   - In 2019, mobile and landline services were also shut, for a total of 550 days of no or partial connectivity. [V] https://pulse.internetsociety.org/en/shutdowns/internet-suspended-in-jammu-and-kashmir-india-5-august-2019/
   - Of rural J&K households with internet, 99.0% connect over mobile networks and only 6.3% have fixed/Wi-Fi. [V] https://www.mospi.gov.in/sites/default/files/publication_reports/CMST_report_m.pdf
8. **Use trusted local intermediaries for onboarding.** Examples: KKG agri-entrepreneurs, CSC VLEs, mandi shopkeepers. Budget for their cost.
   - GSMA found agent-led models effective for onboarding and trust in low-literacy settings, though costly. [S] https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/programme/agritech/five-key-lessons-from-scaling-digital-agriculture-services/
   - J&K already runs "over 2,000" entrepreneur-driven KKGs. [V] https://kashmirreader.com/2026/01/19/hadp-ushers-a-new-era-of-agricultural-transformation-across-jk/
9. **Design for shared phones and helpers.**
   - One FarmChat participant said: "My son doesn't let me use his phone…". 12 participants had only occasional access to a phone at home. [V] (FarmChat PDF)
   - The DPDP Rules let a person nominate someone to exercise their data rights. [V] https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf
   - Proposal: an explicit "helper" role, with the grower's own voice or PIN consent.
10. **Don't assume a woman in the household has her own smartphone.**
    - Rural J&K, age 15+: 58.0% of women own a mobile phone vs 79.7% of men. 61.8% of women used the internet in the last 3 months vs 75.1% of men. [V] (CMS:T 2025 PDF above)
    - Among rural women who own a phone, 22.7% own only a basic phone. [V] (same)
11. **Make pest reports two-way.**
    - Use photo + voice note + optional location, checked by an expert before any public alert. The reporter gets advice back immediately.
    - India's National Pest Surveillance System (NPSS, launched 15 Aug 2024) uses farmer photos analysed by experts and AI. [S] https://knnindia.co.in/news/newsdetails/sectors/agri-food/government-launches-ai-powered-national-pest-surveillance-system-to-empower-farmers
12. **If you use incentives, keep them small and immediate, such as airtime.**
    - Airtime incentives raised IVR survey response in Bangladesh and Uganda. Doubling the amount made no significant difference. [V] https://pmc.ncbi.nlm.nih.gov/articles/PMC6747927
13. **Build trust and safety in the marketplace with these features:**
    - verified providers (truck RC/KYC; police verification for non-local labour gangs, required in J&K);
    - ratings;
    - an upfront price checked against a public benchmark (e.g., J&K Road Transport Corporation (JKRTC) freight rates per box);
    - a PIN to close each job (as in the government CHC app);
    - documented payment terms.
    - Evidence:
      - Kashmir freight rose from about Rs 60 to Rs 200 per box in the Sept 2025 crisis. [V] https://kashmirlife.net/soaring-freight-charges-for-apples-continue-despite-govt-assurances-406072/
      - A J&K Police advisory (reported 6 Aug 2026) requires newly arriving labourers to register at the nearest police station. [V] https://www.wionews.com/india-news/j-k-police-issues-new-advisory-for-non-local-labourers-after-recent-terror-attacks-15-lakh-reward-announced-for-let-terrorist-1786002596846
      - The CHC/FARMS booking-closure PIN. [S] https://www.agrimachinery.nic.in/Files/FAQ_CHC_MobAPP.pdf
14. **Don't build the business on farmer subscriptions or thin input-commerce margins.**
    - BharatAgri shut down in Nov 2025, citing "High customer acquisition costs and low repeat orders". [V] https://www.peoplematters.in/news/business/bharatagri-shuts-shop-after-failing-to-secure-new-funding-round-47212
    - Arya.ag, which combines storage and finance, is profitable. [S] https://entrackr.com/fintrackr/aryaag-reports-rs-447-cr-revenue-in-fy25-profits-spike-70-9048421
15. **Plan for DPDP compliance by about May 2027.**
    - The Rules were notified 14 Nov 2025, with an 18-month phase-in. [V] (PIB link above)
    - Requirements:
      - a standalone, itemised consent notice;
      - an option to read it in English or any Eighth-Schedule language (Kashmiri, Urdu and Hindi qualify);
      - a link to withdraw consent;
      - parental consent for under-18s;
      - breach notification;
      - a response to data-rights requests within 90 days.
    - Sources: [V] https://dpdpa.com/dpdpa2023/chapter-2/section5.html ; [V] https://www.dpdpa.com/dpdparules/rule3.html

---

## 1. Designing for low-literacy, rural, multilingual farmers

### 1.1 Text vs graphics vs voice vs a human operator

- **Medhi et al. (ACM TOCHI 2011)** [V] https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ToCHI2711_Medhi.pdf
  - Ethnography with 90 low-literacy subjects in India, Kenya, the Philippines and South Africa, plus 2 quantitative studies with more than 70 subjects in India.
  - "textual interfaces are unusable by first-time low-literacy users, and error prone for literate but novice users."
  - Mobile banking: no low-literacy subject completed a transaction with the text UI. 72% completed it with spoken dialogue and 100% with a graphical UI. Spoken-dialogue users who succeeded were faster and needed less help.
  - Health data entry: a live operator was about 10 times more accurate than text entry.
  - Navigation findings: 56 of 90 could not navigate hierarchical menus (none of the 40 non-phone-users could). 48 of 90 did not understand scroll bars. 45 had trouble with soft keys.
  - Design recommendations:
    - graphical cues;
    - voice annotation;
    - local-language text and audio;
    - minimal hierarchy;
    - no non-numeric text input;
    - no scrolling menus;
    - minimal soft-key mappings;
    - human mediators to introduce the system.
- **Text-free UI (Medhi, Sagar, Toyama, ITID 2007)** [S] https://ideas.repec.org/a/tpr/itintd/v4y2007i1p37-50.html
  - Illiterate domestic workers in Bangalore strongly preferred text-free designs.
  - Confirmed the need for semi-abstracted graphics and voice feedback, and a consistent help system.
- **FarmChat (Jain et al., ACM IMWUT 2018)** [V] https://ubicomplab.cs.washington.edu/pdfs/farmchat.pdf
  - 34 potato farmers near Ranchi, with a knowledge base built from Kisan Call Centre logs.
  - All illiterate participants preferred audio-only. 16 literate or semi-literate participants preferred audio plus text, mainly to re-read medicine names and doses. 7 preferred audio-only ("nothing to read, so no tension").
  - 16 of 22 digitally-illiterate users preferred audio-only, and none of them scrolled.
  - Physical and environmental factors mattered:
    - sunlight makes the screen unreadable in the field;
    - tractor noise drowns out audio;
    - one older user had shaky hands and could not hit small buttons.
  - Images of medicine packages were highly valued.
  - 11 of 23 literate or semi-literate users could not read Hindi numerals; the authors recommend English digits.
  - Speech input needs a longer silence timeout (7–8 s).
  - Farmers were "highly skeptical" of advice from friends, shopkeepers and agri-apps, so trust has to be earned.
  - Recommended design: a hybrid of two large buttons plus an optional chat-history toggle, with picture-based multiple choice.
  - Agri-entrepreneurs preferred audio plus text for themselves but recommended audio-only for farmers in their village. This is an argument for a separate "assistant mode" UI for intermediaries.

### 1.2 Video-based extension (Digital Green)

- **2009 trial** [V] https://www.microsoft.com/en-us/research/?p=156320
  - 13 months, 16 villages, 1,470 households.
  - Digital Green's participatory, locally made videos increased adoption of some practices **seven-fold** over Training-and-Visit extension.
  - **10 times more effective per dollar** on a cost-per-adoption basis.
- **J-PAL RCT in Bihar (2014–2016)** [V] https://www.povertyactionlab.org/evaluation/evaluation-digital-greens-agricultural-extension-program-india
  - Women farmers in 420 villages.
  - Video did not raise measured System of Rice Intensification (SRI) adoption, possibly because the survey did not capture partial adoption.
  - Bayesian estimates show yields up 12–18% and profits up 9–24%. The video approach was cost-effective: additional profit was about 16 times the extra cost.
- **IFPRI RCT in Ethiopia** [S] https://essp.ifpri.info/2022/01/03/accelerating-technical-change-through-icts-evidence-from-a-video-mediated-extension-experiment-in-ethiopia/
  - Reached 24% more farmers and produced up to 44% higher uptake.
  - Cost about $4 per additional adoption. [S] https://bigdata.cgiar.org/digital-intervention/video-enabled-extension/
- **Implication for Kashmir:** short, locally filmed Kashmiri-language videos of real growers (scab spray timing, high-density orchard training, grading and packing) are well supported. They can be screened at KKGs or shared over WhatsApp, and should be cached for offline viewing.

### 1.3 IVR and voice services

- **Avaaj Otalo (Gujarat; CHI 2010)** [S] https://hci.stanford.edu/publications/paper.php?id=144
  - Voice forum used by 51 farmers over a 7-month pilot. The most popular feature was the Q&A forum where farmers ask questions and browse others' questions and answers.
- **Cole & Fernando (Economic Journal 2021)** [S] https://www.atai-research.org/wp-content/uploads/2020/06/ueaa084.pdf
  - RCT with 1,200 cotton farmers. More than half called the service in the first 7 months.
  - Treated farmers used more effective pesticides and spent less on ineffective or hazardous ones.
  - Trust in phone-based advice rose from near 0 to more than 6 on a 10-point scale.
  - Yield gains (cumin +28%, cotton +8.6% in a sub-group) are from the working paper. UNVERIFIED whether the published version keeps them.
  - Peer-effects follow-up: [S] https://voxdev.org/topic/agriculture/mobile-phone-based-extension-peer-interactions-and-farmer-information-exchange
- **Awaaz.De (Avaaj Otalo's successor)**
  - Its Khedut Saathi service let subscribers forward episodes to up to 5 friends (viral voice sharing). [S] https://www.slideshare.net/awaazde/khedut-saathi-viral-voice-messaging-for-small-farmers-in-india
- **Gram Vaani / Mobile Vaani** [V] https://solve.mit.edu/solutions/35346
  - The user gives a **missed call** and automatically receives a **free call-back**; navigation is by keypad.
  - Users can record messages; 3–4% of calls produce a recording. Machine learning plus human moderators filter content.
  - Scale: more than 100,000 monthly unique users before COVID-19 and more than 10,000 calls per day (self-reported).
  - Bihar evaluation: only about 23% of interviewed women had heard of Mobile Vaani. [S] https://bmjopen.bmj.com/content/12/10/e052336.full
  - A related Uttar Pradesh study found that how many messages women heard depended on phone ownership, ease of phone access and women's empowerment. [S] https://files.comminit.com/content/development-mhealth-behavior-change-communication-strategy-case-study-rural-uttar-pradesh
  - Lesson: voice channels need offline outreach, especially to reach women.
- **IFFCO Kisan "Green SIM"** [V] (GSMA PDF)
  - 3–4 daily push voice messages.
  - Average pickup rate 38–52% across 1.8 million active users; average listening about 42 seconds.
- **Implication:** an IVR line with missed-call call-back and short (under 1 minute) push voice messages in Kashmiri. It reaches basic-phone owners and keeps working when mobile data is cut, as long as voice is up.

### 1.4 WhatsApp and AI chat services in Indian agriculture

- **Digital Green FarmerChat** (WhatsApp, Telegram and web; generative AI over Digital Green's video transcripts and call-centre logs) [V] https://www.isdm.org.in/ekam/development-management-hub/ask-and-they-receive
  - More than 225,000 users, more than 160,000 of them in India; more than 20 languages.
  - **Voice queries are 5 times text queries.**
  - 30% of queries are about pests and diseases.
  - Features added from farmer feedback: text-to-speech, audio answers, follow-up questions, a weather widget.
  - Early rollout went through extension agents first, which added a human review step. [S] https://openai.com/index/digital-green
- **Oilseeds Kisaan Mitra** (ICAR-IIOR, Hyderabad): a WhatsApp AI advisory where farmers save a number and send questions. [S] https://agrospectrumindia.com/news/7/34198/oilseeds-kisaan-mitra-indias-first-nationwide-whatsapp-ai-advisory-for-oilseed-farmers.html
- **Kisan e-Mitra** (PM-KISAN scheme chatbot, launched 21 Sept 2023) [V] https://apolitical.co/en/navigator/case-studies/kisan-e-mitra-indias-voice-enabled-ai-support-for-farmers
  - Voice or typed questions in 11 languages, aiming for all 22.
  - More than 20,000 queries per day (April 2025).
  - Uses Bhashini for language. It can answer personal status questions because it is linked to structured beneficiary records.
- **Farm Vaidya** (Telugu voice AI agents; IFPRI was technical adviser) [S] https://www.ifpri.org/blog/generative-ai-powered-voice-technology-in-agricultural-advisory-services-lessons-from-india/
  - Farmers' local names for crops and pests are missing from standard datasets, so the team collected real farm speech to build speech-to-text.
  - Agents must adapt to the crop season.
- **Bharat Intelligence** (Nashik farm-labour platform) [V] https://thebetterindia.com/innovation/ai-farm-labour-platform-bharat-intelligence-labour-os-nashik-12108095
  - Booking happens on WhatsApp and by voice call. "There's no app to download."
- **Implication:** a WhatsApp number that accepts voice notes and photos and replies with voice notes is a low-friction second channel. Treat it as a front door into the same back end as the app. AI answers for scab or pest advice should be reviewed by experts until they are proven accurate.

### 1.5 Assisted ("agent") models

- **Kisan Khidmat Ghars (J&K's Holistic Agriculture Development Programme, HADP)**
  - Launch event (Greater Kashmir, 5 Aug 2024): [V] https://greaterkashmir.com/national/kisan-khidmat-ghars-will-serve-as-one-stop-service-hub-for-farmers-lg
    - 500 KKGs inaugurated in Aug 2024, with 1,500 more planned.
    - Services: input booking, soil health, plant diagnostics, market intelligence, custom hiring, artificial insemination.
    - A KKG app was launched offering credit support, price forecasting, scheme applications, **booking expert consultations**, a dealer locator and skilling courses.
    - The centres are run by "agri-entrepreneurs".
  - Status by Jan 2026 (Kashmir Reader): [V] https://kashmirreader.com/2026/01/19/hadp-ushers-a-new-era-of-agricultural-transformation-across-jk/
    - "Over 2,000" entrepreneur-driven, IT-enabled single-window centres.
    - Farmer onboarding runs through the **Kisan Sathi** portal: more than 3.7 lakh farmers registered, more than 5.9 lakh applications. Credit linkage is integrated.
  - In Rajouri, KKGs offer micro-ATMs and POS machines. [S] https://www.devdiscourse.com/article/headlines/3775688-j-k-140-new-kisan-khidmat-ghars-in-rajouri-district-to-bring-government-services-to-farmers-doorsteps
  - **This is the obvious assisted channel to partner with in J&K.**
- **Common Service Centres (CSCs)**
  - Village-level entrepreneurs (VLEs) offer scheme access, prices and weather. [S] https://epubs.icar.org.in/index.php/JAEM/article/view/168941
  - A 2025 MANAGE study found VLEs lack agri-specific training and that farmers know little about CSC services. [S] (same)
  - Sources disagree on the CSC count. One says more than 600,000 centres by Mar 2025: [S] https://www.constructionworld.in/policy-updates-and-economic-news/csc-celebrates-16-years-of-rural-digital-empowerment/76197 . Another says 4,07,122 in Gram Panchayats as of 30 Jun 2026. Both UNVERIFIED.
- **EM3 AgriServices** (pay-per-use farm machinery) [V] https://techcrunch.com/2017/08/15/em3
  - Call centres plus village representatives. "the majority of its business is offline" because "The majority of farmers are not on smartphones."
- **Digital Labour Chowk** [S] https://thebetterindia.com/startup/chandrashekhar-mandal-digital-labour-chowk-job-portal-daily-wage-workers-10469048
  - Signed up mobile-shop and grocery owners near labour chowks (informal day-labour hiring points) as "business associates" who register workers.
- **Intermediated use** (Sambasivan et al., CHI 2010) [S] https://microsoft.com/en-us/research/?p=159423
  - Low-income users often use technology through a digitally skilled intermediary, such as a mother reached through her daughter's phone.
  - Design for this explicitly rather than treating it as misuse.

### 1.6 What reduces drop-off (evidence summary)

| Lever | Evidence | Source |
|---|---|---|
| Fewer profiling questions at signup; auto-filled location | IFFCO Kisan: drop-down profiling a barrier; about 80% churned within 2 months (benchmark 61–80% drop-off over 3 months) | [V] https://www.gsma.com/mobilefordevelopment/wp-content/uploads/2016/10/IFFCO-Kisan-Agricultural-App.pdf |
| Push "bite-sized" notifications (weather alerts) instead of pull-only | Same GSMA report recommends personalised push to bring idle users back | [V] same |
| Let users pick message frequency | +7.6 pp pickup, +9.4 pp listening (Gujarat, n=3,788) | [V] https://registry.precisiondev.org/registry_entry/frequency-a-b-test |
| Heads-up SMS 10 minutes before a call | +5.9 pp pickup, +4 pp listening; larger effect for non-smartphone users | [V] https://registry.precisiondev.org/registry_entry/impact-of-heads-up-sms-on-call-pickup-and-listening/ |
| Fewer, better-framed recommendations | Pickup +4 pp over a 65% control mean (Odisha) | [S] https://registry.precisiondev.org/registry_entry/fewer-and-revised-recommendations/ |
| Simplicity over feature bloat; "friendly helper" guidance | GSMA AgriTech accelerator lessons | [S] https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/programme/agritech/five-key-lessons-from-scaling-digital-agriculture-services/ |
| Peer content and a Q&A forum | Avaaj Otalo's most-used feature was the farmer Q&A forum | [S] https://hci.stanford.edu/publications/paper.php?id=144 |
| Repeat purchase, not just installs | BharatAgri (more than 1 million users) closed because of high acquisition cost and low repeat orders | [V] https://www.peoplematters.in/news/business/bharatagri-shuts-shop-after-failing-to-secure-new-funding-round-47212 |

### 1.7 Kashmiri-language specifics

**Speakers**
- Census 2011 counted 6,797,587 Kashmiri speakers nationally, 6,680,837 of them in J&K. The figures include related dialects. [S] https://en.wikipedia.org/wiki/States_of_India_by_Kashmiri_speakers ; [S] https://kashmirtimes.com/are-there-26-lakh-hindi-speakers-and-only-20000-urdu-speakers-in-jk/

**Official status**
- Before 2019 only Urdu and English were official languages.
- The **J&K Official Languages Act 2020** made Kashmiri, Dogri, Urdu, Hindi and English official. [S] https://prsindia.org/billtrack/prs-products/prs-bill-summary-3595 ; [S] https://www.dailyexcelsior.com/news/archive/hindi-kashmiri-dogri-introduced-as-official-languages-in-addition-to-urdu-english

**Who reads Kashmiri vs Urdu**
- Literate Kashmiris have mostly been schooled in Urdu.
- A 2017 order made Kashmiri a compulsory subject for Classes 9–10, starting 2018–19. Only 5 of 27 sanctioned Kashmiri lecturer posts are filled. [V] https://www.outlookindia.com/national/teacher-shortage-hits-kashmiri-language-education-in-schools (21 Feb 2026)
- "Many Gen Z Kashmiris cannot read or write the Koshur script because it was not formally taught in many schools until recently". This is a qualitative claim. [V] https://kashmirlife.net/is-kashmiri-becoming-a-ghost-in-its-own-homeland-426308/
- A 2013 survey (Bhat, "Power of a written language…") reportedly found more than 95% of respondents can read and write Urdu but only 32.7% can do so in Kashmiri. UNVERIFIED: this comes from a search extract; I could not open the paper. https://www.academia.edu/5313616/POWER_OF_A_WRITTEN_LANGUAGE_A_CASE_OF_URDU_LITERACY_AND_DISCOURSE_IN_KASHMIR
- A claim attributed to Kak (2001), that 97% of educated Kashmiris cannot read Kashmiri script, is also UNVERIFIED.
- Both languages use Perso-Arabic script, so Urdu readers can partly decode Kashmiri text. [S] (same paper extract)
- **Implication:** use **Urdu (Nastaliq) as the default reading script**, with Kashmiri as **spoken audio** and Kashmiri text optional. Offer Hindi (Devanagari) and English.

**Keyboards**
- Gboard lists five Kashmiri options: Arabic script; Arabic script with transliteration; Devanagari script; Devanagari script with transliteration; and Latin script. [V] https://support.google.com/gboard/answer/6380730
- Whether Gboard voice typing supports Kashmiri: UNVERIFIED.
- Keyman offers a third-party Perso-Arabic Kashmiri keyboard. [S] https://help.keyman.com/keyboard/rac_kashmiri

**Speech recognition (ASR)**
- AI4Bharat's **IndicConformer 600M multilingual** lists Kashmiri (ks) among its 22 languages. It is MIT-licensed but gated, and **no Kashmiri word-error rate is published**. [V] https://huggingface.co/ai4bharat/indic-conformer-600m-multilingual
- The IndicVoices speech dataset includes Kashmiri. [S] https://huggingface.co/datasets/ai4bharat/IndicVoices/blob/main/README.md

**Text-to-speech (TTS)**
- AI4Bharat **Indic Parler-TTS** supports Kashmiri only **unofficially** ("Competitive results… like Kashmiri (55.30)"). [V] https://huggingface.co/ai4bharat/indic-parler-tts
- IndicVoices-R, an open TTS dataset, includes Kashmiri. [S] https://proceedings.neurips.cc/paper_files/paper/2024/file/7dfcaf4512bbf2a807a783b90afb6c09-Paper-Datasets_and_Benchmarks_Track.pdf
- Whether Bhashini offers Kashmiri ASR or TTS: UNVERIFIED.

**Machine translation**
- Microsoft Translator added Kashmiri on 5 Oct 2023. Speech support is not stated. [V] https://news.microsoft.com/source/asia/2023/10/05/microsoft-translator-expands-to-20-indian-languages-empowering-linguistic-diversity/
- Google Cloud Translation does **not** list Kashmiri. [V] https://docs.cloud.google.com/translate/docs/languages
- Kashmiri is not among Google Translate's 110 languages added in June 2024. [V] https://support.google.com/translate/answer/15139004?hl=en

**Implication (proposal)**
- For a fixed UI vocabulary (menus, confirmations, advisories), use **pre-recorded human Kashmiri audio**.
- Treat Kashmiri speech recognition as experimental. Always pair voice input with picture buttons, and fall back to Urdu or Hindi speech recognition.
- Collect consented local apple, pest and disease vocabulary, as Farm Vaidya did.
- Have local experts review all machine translation.

---

## 2. Connectivity realities in Kashmir

### 2.1 Shutdown history

**SFLC.in tracker (J&K page)** [V] https://alpha.internetshutdowns.in/static-page/jammu-kashmir/
- **447 internet shutdowns in J&K.** The page does not state an as-of date.
- Per year: 2012: 3 · 2013: 5 · 2014: 5 · 2015: 5 · 2016: 10 · 2017: 32 · 2018: 65 · 2019: 55 · **2020: 116** · 2021: 79 · 2022: 43 · 2023: 14 · 2024: 2 · 2025: 11 · 2026: 2.

**The 2019–21 shutdown**
- From 5 Aug 2019: "Internet, mobile, and landline services were shut down."
- Restoration: landlines 18 Aug 2019; postpaid mobile 14 Oct 2019; broadband for essential purposes 15 Jan 2020; 4G on 5 Feb 2021.
- In all, 550 days of partial or no connectivity, including 213 days with no internet. [V] https://pulse.internetsociety.org/en/shutdowns/internet-suspended-in-jammu-and-kashmir-india-5-august-2019/
- From Jan 2020, 2G only, on verified SIMs, with whitelisted websites. [V] (SFLC page)

**India-wide counts (Access Now)**
- 2024: 84 shutdowns (116 in 2023). [V] https://sabrangindia.in/india-saw-84-internet-shutdowns-in-2024-access-now-report/
- 2025: 65 shutdowns. [V] https://www.accessnow.org/press-release/one-region-half-the-worlds-shutdowns-internet-shutdowns-in-the-asia-pacific-in-2025/
- Press coverage says J&K had 12 shutdowns in 2024. [S] https://thewire.in/rights/india-top-democratic-country-internet-shutdowns-2024-report . This conflicts with SFLC's figure of 2 for 2024 (different methods), so the 2024 J&K count is UNVERIFIED.

**Design meaning**
- Shutdowns cluster around security events and can last months.
- In the worst case (2019), voice and SMS also went down. Offline capability plus assisted, paper or QR fallbacks therefore matter, not just IVR.

### 2.2 Phones and internet in J&K (NSS 80th round, CMS: Telecom, Jan–Mar 2025)

Source: [V] https://www.mospi.gov.in/sites/default/files/publication_reports/CMST_report_m.pdf (state tables in Appendix A; figures for age 15+)

| Indicator (J&K, age 15+) | Rural men | Rural women | Rural all | Urban all | J&K all |
|---|---|---|---|---|---|
| Used a mobile phone in last 3 months (Table 1) | 90.3% | 80.6% | 85.8% | 87.8% | 86.3% |
| **Owns** a mobile phone (Table 2) | 79.7% | **58.0%** | 69.7% | 82.5% | 72.7% |
| Owners with a basic phone only, no smartphone (Table 2.1) | 17.5% | 22.7% | 19.5% | 14.7% | 18.2% |
| Used internet in last 3 months (Table 3) | 75.1% | 61.8% | 68.9% | 74.4% | 70.3% |
| Self-reported: sent a message with an attachment (photo, document) (Table 6) | 77.2% | 64.7% | 71.4% | 79.5% | 73.3% |
| Self-reported: able to bank online (Table 12) | 63.5% | 45.5% | 55.2% | 68.0% | 58.2% |

Rural J&K **households** (Tables 13, 14, 14.1):
- Smartphone-only households: 53.2%. Basic-phone-only: 7.3%. Both: 39.2%. So **about 92% have at least one smartphone** and **about 47% still have a basic phone**.
- Landline: 2.1%.
- 92.5% have internet at home. Of those, **99.0% use mobile networks** and only 6.3% fixed or Wi-Fi.
- Of the 7.5% without internet, 48.0% say they "do not know how to use it".
- The ICT-skill figures are self-reported and were not tested. [V] (report section 2.2)

**Older figures**
- NFHS-5 (J&K surveyed in Phase I, 2019–20): 75.2% of women in J&K had a mobile phone they used themselves; 73.3% in rural areas. [S] https://www.thekashmirmonitor.net/nfhs-survey-57-3-of-women-own-houses-in-jk-84-have-bank-accounts-75-use-mobile-phones/
- TRAI: about 1.27 crore wireless subscribers in the J&K service area (Sept 2025). [S] https://m.greaterkashmir.com/article/reliance-jio-added-40000-mobile-subscribers-in-jk-service-area-in-september-trai/449178
- No figure for rural J&K over age 60 was found. UNVERIFIED for elderly growers.

### 2.3 Implications: offline-first, with SMS and IVR fallbacks (proposal, grounded in 2.1–2.2)

- **Offline-first app.**
  - Cache advisories, spray calendars, videos and price history.
  - Queue bookings and pest reports in an outbox that syncs when the network returns.
  - Show "sent / waiting for network" states with icons.
  - Store a booking token and PIN on the device so a job can close offline and reconcile later.
- **Voice/IVR line with missed-call call-back.**
  - Useful when data is down but voice works, and for the roughly 1 in 5 rural phone owners with basic phones only.
  - Precedent: the Mobile Vaani design. [V] https://solve.mit.edu/solutions/35346
- **SMS for confirmations** (booking IDs, PINs, prices) and **heads-up SMS before advisory calls**. [V] https://registry.precisiondev.org/registry_entry/impact-of-heads-up-sms-on-call-pickup-and-listening/
- **Assisted channel at KKGs.** The centre's entrepreneur can book on a grower's behalf and print or QR-code the booking. This survives total blackouts once local services resume. [V] https://kashmirreader.com/2026/01/19/hadp-ushers-a-new-era-of-agricultural-transformation-across-jk/
- **Keep the app light.** Most rural users rely on mobile data, so a small download and compressed media matter.

---

## 3. Non-invasive data collection

### 3.1 Progressive profiling and value before asking

- **IFFCO Kisan (GSMA 2016)** [V] https://www.gsma.com/mobilefordevelopment/wp-content/uploads/2016/10/IFFCO-Kisan-Agricultural-App.pdf
  - "user profiling can be a major roadblock to adoption and usage."
  - "the drop down profiling can be a barrier for first time users."
  - State and district had to be re-entered for weather and market modules.
  - "Personalising the app based on user profiles would show users the value of sharing their personal information."
- **Progressive disclosure (Nielsen, NN/g, 2006)** [V] https://www.nngroup.com/articles/progressive-disclosure/
  - "Initially, show users only a few of the most important options."
  - Keep to at most 2 disclosure levels.
- **Forced accounts:** 18% of users abandon checkout when forced to create an account. [V] https://baymard.com/blog/reduce-cart-abandonment
- **Ask preferences early:** asking farmers their preferences at the start of the season gave the highest engagement. [V] https://registry.precisiondev.org/registry_entry/frequency-a-b-test

**Proposed "data ladder" (proposal).** Each rung unlocks a visible benefit, explains "why we ask" in audio, and can be skipped or deleted.

| When | Ask | Benefit shown immediately |
|---|---|---|
| First open (no account) | Language (tap a flag or face plus audio); village or tehsil (tap a map or say the name; GPS optional with in-context permission) | Local weather, scab or frost alerts, mandi prices |
| First question or booking | Mobile number by OTP or missed call; name (may be recorded by voice) | Booking confirmations, call-backs |
| Opening the spray calendar | Varieties (picture cards); orchard age band; approximate tree count or area in local units (kanal/marla; conversion UNVERIFIED) | Personalised spray schedule, product dose calculator |
| Booking labour or trucks | Drop-pin of orchard gate or landmark; expected boxes | Quotes and arrival times |
| Only when the user asks for credit or schemes | Kisan Credit Card (KCC), bank, land records, via the KKG assisted mode | Scheme or credit application |

### 3.2 Just-in-time permissions and consent

- **Android guidance** [V] https://developer.android.com/training/permissions/requesting
  - "Ask for a permission in context, when the user starts to interact with the feature that requires it."
  - "Don't block the user."
  - Degrade gracefully if denied.
  - "persistent nagging to reconsider is not respectful of their choice."
  - Denying twice counts as a permanent denial, so ask only at the moment of need.
  - Use "Only this time" for location, camera and microphone.
- **Material Design:** request critical, obvious permissions up front; request others in context. [S] https://m1.material.io/patterns/permissions.html
- **Proposal:** ask for camera when the user taps "report pest", location when they tap "orchard pin", and microphone when they tap "speak". Each request comes with a 5-second Kashmiri audio explanation and an "I'll do it later" button.

### 3.3 Community and crowd-sourced pest reporting examples

- **National Pest Surveillance System (NPSS), India**
  - Launched 15 Aug 2024. Farmers photograph pests or damage, and experts and scientists analyse them, supported by AI. Aims to reduce farmers' dependence on pesticide retailers.
  - [S] https://knnindia.co.in/news/newsdetails/sectors/agri-food/government-launches-ai-powered-national-pest-surveillance-system-to-empower-farmers ; [S] https://visionias.in/current-affairs/monthly-magazine/2024-09-12/economy/national-pest-surveillance-system-npss
  - Crop coverage and user numbers are UNVERIFIED; sources conflict.
- **FAO FAMEWS (fall armyworm)**
  - A crowd-sourced field-scouting app. Data is validated by national focal points and mapped globally.
  - One FAO release reports 60,000 reports from 64 countries. A 2024 FAO brochure cites more than 10,000 users in more than 60 countries.
  - [S] https://www.fao.org/newsroom/detail/fall-armyworm-scaling-up-response-across-the-globe/en (UNVERIFIED that the 60,000 figure comes from this particular release) ; [S] https://www.fao.org/3/cd0185en/cd0185en.pdf
- **CROPSAP (Maharashtra)**
  - Scouts report from fixed and random plots twice a week. Experts analyse the data, and farmers get SMS advisories twice a week.
  - Started after a 2008–09 soybean pest outbreak.
  - [S] https://krishi.icar.gov.in/jspui/bitstream/123456789/22404/1/Tbu_Crp_Information%20and%20Communication%20Technology%20based%20Pest%20Surveillance.pdf
  - Subscriber counts (15–50 lakh) are UNVERIFIED; sources conflict.
- **SKUAST-K apple scab forecasting (Kashmir)**
  - About 20 automatic weather stations, 2 per district, for a disease forecasting and decision-support system. An app for growers was planned.
  - Launch status UNVERIFIED. [S] https://risingkashmir.com/skuast-k-installs-20-automatic-weather-stations-in-kashmir
  - In 2020, scab reportedly affected about 40% of the previous year's crop. [S] https://www.downtoearth.org.in/agriculture/fungal-scab-attack-can-spell-doom-for-kashmir-s-apple-growers-this-year-74631
- **Mobile Vaani:** user voice recordings are moderated before broadcast. [V] https://solve.mit.edu/solutions/35346
- **Proposal: "report and get help"**
  1. The grower sends a photo and/or voice note.
  2. They immediately get an answer: an automated first answer plus an expert follow-up.
  3. Aggregated, location-blurred reports feed village-level alerts ("scab reported in 3 orchards near you").
  4. Never show who reported. Precise GPS is used only with consent.

### 3.4 Incentive designs

- **Airtime for IVR surveys** [V] https://pmc.ncbi.nlm.nih.gov/articles/PMC6747927
  - Bangladesh: response rate 19.2% with no incentive vs 23.9% with 50 Taka (US$0.60) vs 24.8% with 100 Taka.
  - Uganda: 35.2% vs 39.3% vs 40.3%.
  - No significant difference between the two amounts.
- **Non-cash incentives (proposal):** earn priority booking slots, free expert call-backs, or a "verified grower" badge for completing your orchard profile or submitting validated pest reports.
- **Implication:** small, immediate, certain rewards beat large ones. Avoid making service access conditional on giving data, which DPDP also restricts (consent must be "unconditional").

### 3.5 DPDP Act 2023 and DPDP Rules 2025 (brief)

**Rules and timeline**
- Notified **14 Nov 2025**, with an **18-month phased compliance** period. [V] https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf
- Most obligations (Rules 3 and 5–16, including notice) apply about **13 May 2027**. Consent-manager registration applies after 12 months.
- [S] https://www.mondaq.com/india/data-protection/1713500/regulatory-update-notification-of-the-digital-personal-data-protection-rules-2025 ; [S] https://www.storyboard18.com/amp/digital/breaking-govt-notifies-final-dpdp-rules-sets-staggered-rollout-with-key-obligations-for-data-fiduciaries-84201.htm . The exact day is UNVERIFIED (13 or 14 May 2027).

**Consent (s.6(1))** [V] https://dpdpa.com/dpdpa2023/chapter-2/section6.html
- Must be "free, specific, informed, unconditional and unambiguous with a clear affirmative action".
- Limited to the data necessary for the stated purpose.
- Withdrawal must be about as easy as giving consent (s.6(4)).

**Notice (s.5)** [V] https://dpdpa.com/dpdpa2023/chapter-2/section5.html
- Must state the personal data and the purpose, how to exercise rights, and how to complain to the Data Protection Board.
- Must offer the notice "in English or any language specified in the Eighth Schedule". The Eighth Schedule includes Kashmiri, Urdu and Hindi; AI4Bharat lists Kashmiri (ks) among the "22 officially recognized languages of India". [V] https://huggingface.co/ai4bharat/indic-conformer-600m-multilingual

**Rule 3** [V] https://www.dpdpa.com/dpdparules/rule3.html
- The notice must be understandable **independently** of other information.
- It must give an **itemised** description of the data and the purposes.
- It must include a website or app link and other means to withdraw consent with comparable ease, exercise rights, and complain to the Board.

**Legitimate use without consent (s.7(a))** [V] https://dpdpa.com/dpdpa2023/chapter-2/section7.html
- A business may process data that a person voluntarily provided for a specified purpose, unless she indicated she does not consent. The Act's example is a pharmacy texting a payment receipt.
- This plausibly covers using a phone number to confirm a booking the grower requested. That is my interpretation and needs legal review.

**Children (s.9)** [V] https://dpdpa.com/dpdpa2023/chapter-2/section9.html
- Under-18s need **verifiable parental consent**.
- No tracking, behavioural monitoring or targeted advertising directed at children.
- This matters because younger family members often operate the phone for an elderly grower.

**Rights and duties under the Rules** [V] (PIB link above)
- Rights to access, correct, update and erase, and to nominate another person to act on one's behalf.
- Data-rights requests must be answered within **90 days**.
- Breaches must be notified to affected people in plain language "without delay".
- Organisations must display a contact person for data queries.
- Consent managers must be India-based.
- Penalties: up to **Rs 250 crore** for failing to maintain reasonable security safeguards; up to Rs 200 crore for breach-notification or child-related violations; up to Rs 50 crore for other violations.

**Proposal:** an audio consent notice in Kashmiri (with an Urdu/Hindi/English text version), itemising each data item next to its picture. Add a "Delete my data / Stop" option reachable within two taps, or via IVR or a KKG.

### 3.6 Gender

- **Phone access gap in rural J&K (age 15+):** phone ownership is 58.0% for women vs 79.7% for men. Internet use is 61.8% vs 75.1%. Self-reported online banking ability is 45.5% vs 63.5%. [V] (CMS:T 2025)
- **Women's roles in orchards**
  - Women help with picking, sorting and packing during harvest rushes. [S] https://www.deccanherald.com/amp/story/india/jammu-and-kashmir/kashmirs-apple-growers-race-against-weather-extend-working-hours-to-save-harvest-4183948
  - SheThePeople (Aug 2019) cites a 2014 report, *Women participation in Apple Cultivation in Rural Kashmir*:
    - women are 25% of the Kashmir apple industry workforce;
    - "Nearly all the apple picking is done by women only";
    - 68.5% of women in Shopian, 62% in Kupwara and 59% in Budgam take part in moving packed boxes to loading points.
    - [V] for the article https://www.shethepeople.tv/she-means-business/25-of-workforce-in-kashmirs-apple-industry-is-female/ ; the underlying 2014 report is UNVERIFIED (not seen, and its figures are internally inconsistent).
  - Women's role in farm decision-making is described as limited in Kashmir agriculture generally (not apple-specific). [S] https://www.jkpi.org/women-in-kashmirs-agricultural-economy-challenges-and-contributions/
  - Voice-programme reach among women depends on phone ownership, access and empowerment. [S] https://files.comminit.com/content/development-mhealth-behavior-change-communication-strategy-case-study-rural-uttar-pradesh
- **Proposal**
  - Don't make a personal phone a precondition. Support household phones, basic-phone IVR, and women-led KKG sessions.
  - Include content on post-harvest tasks (grading, packing, sorting) and women-led labour crews. About 50% of Bharat Intelligence's Nashik workers are women, often in husband-and-wife teams. [V] https://thebetterindia.com/innovation/ai-farm-labour-platform-bharat-intelligence-labour-os-nashik-12108095
  - Let women hold their own profile and own consent, separate from the male household head.

### 3.7 Elderly growers relying on younger family members

- **FarmChat evidence** [V] https://ubicomplab.cs.washington.edu/pdfs/farmchat.pdf
  - A participant: "My son doesn't let me use his phone as he thinks I might break it."
  - An older user with shaky hands preferred big buttons.
  - Agri-entrepreneurs used the app on others' behalf.
- **Intermediated use** is a normal pattern in low-income communities. [S] https://microsoft.com/en-us/research/?p=159423
- **The DPDP Rules let a person nominate someone to exercise their rights.** [V] (PIB link above)
- **Proposal: "family helper" mode**
  - The grower stays the account owner; consent is recorded in the grower's own voice or confirmed by an IVR call to their number.
  - The helper can act on their behalf, and every action is logged and read back by voice to the grower.
  - Helpers under 18 trigger the child rules.
  - Large text and big touch targets; voice read-back of every booking.

---

## 4. Services marketplace models (India) and how they handle trust and safety

### 4.1 Agricultural labour booking

- **Bharat Intelligence (Nashik, grapes; operating since 2025)** [V] https://thebetterindia.com/innovation/ai-farm-labour-platform-bharat-intelligence-labour-os-nashik-12108095
  - Booking: by WhatsApp or voice call; a whole season can be booked in advance.
  - Crews: workers organised into teams, guaranteed work across the season (up to 300 days a year).
  - Verification: skill and reliability are mapped through village data and local influencers (sarpanches, CSC operators). A formal process is not described.
  - Pricing and pay: farmers pay about Rs 25,000 per acre. Workers are paid by output, not daily wage.
  - Reported results:
    - 3,000 workers deployed;
    - 86% repeat-farmer rate;
    - about 50% of workers are women;
    - monthly earnings up from Rs 6–7k to about Rs 20k.
  - **This is the closest analogue for Kashmir pruning, spraying, picking and packing gangs.**
- **Digital Labour Chowk** (daily-wage, mainly construction) [S] https://thebetterindia.com/startup/chandrashekhar-mandal-digital-labour-chowk-job-portal-daily-wage-workers-10469048 ; [S] https://digitallabourchowk.com/?p=1034
  - Verified worker accounts; app in 15 languages.
  - Shopkeepers near labour chowks act as registration agents.
  - Says it charges no commission. Claims more than 1 lakh workers helped (self-reported).
- **Kerala "Kaarshika Labour Bank" app** (planned, with ratings and reviews): current status UNVERIFIED. [S] https://opendigest.in/farm-worker-is-just-a-click-away-kerala-to-launch-app-for-farm-labour-services/
- **Haryana "ShramMitra"** (state app replacing labour chowks): [S] https://currentaffairs.adda247.com/shrammitra-app-launched-in-haryana-to-replace-traditional-labour-chowk-system/
- **FarmbyAPP and FarmWork** advertise "verified labour crews". These are marketing claims only, UNVERIFIED. [S] https://www.farmbyapp.com/ ; https://farmworkindia.com/

### 4.2 Truck and load booking

- **Vahak** (load board / marketplace) [V] https://www.vahak.in/mob/online-load-booking
  - Says it is "100% free and has no commissions or hidden fees."
  - Users can check transporters' "ratings, connections, recommendations".
  - Its terms say "the parties are liable to each other for the payments, safety & security of the consignments". So the platform does not guarantee payment on that page.
  - Its app listing claims checks of RC and permit, GST and business ID, and driver KYC. [S] https://appgoblin.info/apps/search.find.lorries.invite.transporter.add.lorries.deliveries.codenicely.search.vahak
  - Press mentions "escrow payments". [S] https://www.maritimegateway.com/?p=39588 . Escrow is UNVERIFIED and not on Vahak's own page.
  - Revenue reportedly comes from add-ons (GPS, insurance, financial services, premium services). [S] https://www.itln.in/logistics/vahak-plans-premium-services-offer-cargo-insurance-1348213
- **BlackBuck (Zinka Logistics; listed company)** [S] https://inc42.com/buzz/blackbuck-posts-inr-280-cr-profit-in-q4-on-tax-credit ; [S] https://www.indianstartuptimes.com/?p=27336
  - Most revenue comes from tolling (FASTag) and telematics for truck owners, plus fuel payments and vehicle finance.
  - The load marketplace moved from classifieds to transactional booking ("SuperLoads") and is still small.
  - FY25 revenue about Rs 427–462 crore depending on source (UNVERIFIED exact).
  - Lesson: the money is in recurring services to truck owners, not in brokering loads.
- **TruckSuvidha**
  - Load and truck board. Verifies customers' mobile number, PAN card and service-tax number. [S] https://startuptalky.com/trucksuvidha-success-story/
  - Claims 40,000+ transporters (self-reported). [S] https://startinup.up.gov.in/crm/Welcome/startup_user_details/Mjc4MQ==
- **e-NAM** (the national online agri-market platform) lists institutional logistics providers integrated with it, BlackBuck among them. [S] https://enam.gov.in/eNAM-Logistics-Providers
- **Porter:** not researched; search budget exhausted. UNVERIFIED.

### 4.3 Farm machinery rental

- **Government CHC Farm Machinery app ("FARMS")** [S] https://www.agrimachinery.nic.in/Files/FAQ_CHC_MobAPP.pdf
  - Custom Hiring Centres (CHCs) get an in-app notification and SMS for each booking.
  - The farmer gives a **6-digit PIN** received at booking to close the job.
  - A claim of more than 40,000 CHCs and 1.2 lakh machines is UNVERIFIED (secondary source). [S] https://www.oliveboard.in/blog/chc-farm-machinery-app/
- **EM3 AgriServices** [V] https://techcrunch.com/2017/08/15/em3
  - Pay-per-use, priced per hour or per acre.
  - Call centres plus village representatives; 10 service centres and about 8,000 farms (2017).
  - Business mostly offline. Recent status UNVERIFIED.
- **Mahindra Trringo**
  - Launched 2016 as a franchise-based tractor and equipment rental, booked **by phone call**. [S] https://www.rushlane.com/mahindra-uber-for-tractors-launches-in-karnataka-12204416.html
  - More than 100,000 hours of work by early 2018. [S] https://www.mahindra.com/news-room/press-release/en/mahindra-trringo-touches-lives-of-india-s-farmers-by-crossing-1-lac-hour-of-work-in-the-field
  - Merged into M&M on 6 Jun 2024, with net worth of only Rs 1.82 crore, a signal of limited scale. [V] https://www.autocarpro.in/news/mahindra-heavy-engines-mahindra-two-wheelers-trringocom-complete-merger-with-mm-120906
- **KKGs in J&K** already list "custom hiring services". [V] https://greaterkashmir.com/national/kisan-khidmat-ghars-will-serve-as-one-stop-service-hub-for-farmers-lg

### 4.4 Expert tele-consultation

- **Kisan Call Centre (1800-180-1551)**
  - Toll-free from any phone, 6 am–10 pm, 7 days a week. Answers in 22 languages. [S] https://mkisan.gov.in/Home/KCCFeature
  - Whether **Kashmiri** is supported is UNVERIFIED.
  - FarmChat cites a report that about 40% of 1.11 million KCC calls went unanswered (year not captured). [V] (FarmChat PDF, ref. 3)
- **IFFCO Kisan "Ask Expert":** over 95% of queries answered on average. [V] (GSMA PDF)
- **KKG app:** "booking expert consultations". [V] https://greaterkashmir.com/national/kisan-khidmat-ghars-will-serve-as-one-stop-service-hub-for-farmers-lg
- **NPSS:** photo upload leading to expert advice. [S] (link in 3.3)
- **FarmerChat:** AI first, with extension-worker review. [V]/[S] (links in 1.4)
- **Proposal:** a tiered service.
  1. Instant AI or library answer (Kashmiri audio).
  2. Scheduled call-back from a SKUAST-K/KVK or horticulture expert within X hours.
  3. Paid or free orchard visit booked via a KKG.
  - Show the expert's name, photo and institution to build trust. FarmChat found trust requires "competency and unbiased viewpoints". [V]

### 4.5 Cold-storage booking

- **ColdKonnect (Hyderabad)** [V] https://thedailyguardian.com/india/cold-konnect-a-three-generation-bet-on-indias-farmers-769044/
  - Two apps: farmers and traders search and request storage or reefer trucks; storage owners and fleets get sensors and GPS.
  - Listings are verified before going live.
  - Partners pay a yearly subscription with "no commission on bookings or enquiries".
  - Scale is not disclosed; the article is a press release.
- **Coldtivate / Virtual Cold Chain Assistant:** pay-per-use cooling launched in India in Jan 2021. [S] https://www.climatepolicyinitiative.org/publication/cooling-as-a-service-with-virtual-cold-chain-assistant
- **Integrated Cold Chain Availability Platform (ICCAP):** a national database linking cold-chain assets. [S] https://en.vikaspedia.in/viewcontent/agriculture/post-harvest-technologies/integrated-cold-chain-availability-platform
- **Kashmir controlled-atmosphere (CA) capacity (Feb 2026)** [V] https://www.greaterkashmir.com/article/jk-to-expand-ca-storage-capacity-for-horticulture-cm-omar-abdullah/476631
  - 68 CA stores with **2.92 lakh MT**, against a requirement of **6.00 lakh MT**.
  - Plans: +15,000 MT in 2025–26 and +38,000 MT in 2026–27; about 40 new stores worth Rs 1,400 crore.
  - The article says nothing about how CA space is booked or what it costs.
  - Most capacity is in South Kashmir (55 stores, 2.57 lakh MT); north Kashmir has 5 stores (0.19 lakh MT). [S] https://kashmirlife.net/south-kashmir-apple-output-nears-9-5-lakh-mt-as-ca-storage-reaches-2-57-lakh-mt-425691/
  - Apple production was more than 21 lakh MT in 2024–25. [S] https://kashmirlife.net/apple-production-crosses-21-lakh-mts-in-jammu-kashmir-government-targets-expansion-of-cold-storage-capacity-411454/
- **Proposal:** CA space is scarce and concentrated. Start with a "request a slot / join waitlist" flow linked to CA operators, with transparent per-box rates (rates UNVERIFIED; not found), rather than instant booking.

### 4.6 Trust and safety patterns seen across platforms

| Mechanism | Who uses it | Source |
|---|---|---|
| Provider KYC and document checks (RC, permit, GST, PAN) | Vahak (claimed), TruckSuvidha | [S] links in 4.2 |
| Ratings and recommendations | Vahak; Kerala labour bank (planned) | [V] https://www.vahak.in/mob/online-load-booking ; [S] https://opendigest.in/farm-worker-is-just-a-click-away-kerala-to-launch-app-for-farm-labour-services/ |
| PIN or OTP to close a job | Government CHC/FARMS app | [S] https://www.agrimachinery.nic.in/Files/FAQ_CHC_MobAPP.pdf |
| Local influencer vetting of workers (sarpanch, CSC operator) | Bharat Intelligence | [V] https://thebetterindia.com/innovation/ai-farm-labour-platform-bharat-intelligence-labour-os-nashik-12108095 |
| Shopkeeper or agent registration desks | Digital Labour Chowk; EM3 village representatives | [S]/[V] links above |
| Verified listings before going live; subscription instead of commission | ColdKonnect | [V] link in 4.5 |
| Payment liability left to the parties (no guarantee) | Vahak's stated terms | [V] |
| Output-based pay for crews | Bharat Intelligence | [V] |

Not found in the sources:
- **Cancellation policies.** Porter, Vahak and the CHC app were not documented here; UNVERIFIED.
- **Proposal:** publish a simple, symmetric rule. Example: a free cancellation window; after it, a small fee to whichever side cancels. Weather-triggered cancellations (rain on harvest day) should be free for both sides. State the rule by voice when booking.

### 4.7 Kashmir-specific transport and labour context

**Freight shocks**
- In Sept 2025, highway disruption and a truck shortage pushed rates from about **Rs 60 to Rs 200 per box** (Shopian grower), and above Rs 200 via the Mughal Road. [V] https://kashmirlife.net/soaring-freight-charges-for-apples-continue-despite-govt-assurances-406072/
- Growers demanded uniform freight charges. JKRTC trucks were sent to the Shopian and Sopore mandis. [V] (same)
- Reported JKRTC concessional rates per box: Delhi Rs 130, Haryana Rs 120, Jalandhar Rs 90, Jammu Rs 70. Private trucks charged about Rs 200–230. [S] https://risingkashmir.com/index.php/fruit-on-the-brink-govt-deploys-rtc-fleet-to-rescue-apple-transport ; [S] https://www.etvbharat.com/en/!state/exorbitant-transportation-charges-put-kashmir-apple-growers-into-more-distress-enn25092103015
- The Shopian mega mandi shut amid the transport crunch. [S] https://m.greaterkashmir.com/article/shopians-mega-fruit-mandi-shuts-amid-transport-crunch-soaring-freight-charges/433617

**Unions and strikes**
- In the January 2024 nationwide truckers' strike, the **Kashmir Valley Fruit Growers-cum-Dealers Union** (chairman Bashir Ahmad Basheer) warned of losses and asked for negotiations. [V] https://kashmirlife.net/trucker-strike-triggers-apple-concerns-in-kashmir-336977/
- **No union-published rate card or formal booking system was found** (UNVERIFIED either way).
- **Implication:** a marketplace showing JKRTC benchmark rates next to private quotes, with verified trucks, addresses a real pain point. Expect pushback from incumbent transporters.

**Non-local labour**
- Orchardists, especially in south Kashmir, hire non-local workers for picking and packing. They come mostly from Bihar and Uttar Pradesh. [S] https://www.deccanherald.com/india/apples-left-hanging-as-kashmir-growers-halt-harvest-amid-highway-blockade-3730124
- At one large cold store, 150 of 210 workers are migrants. [S] https://themigrationstory.com/post/backbone-of-operations-how-migrants-keep-south-asias-largest-apple-cold-storage-running/
- Estimates of the non-local workforce range from about 4 lakh to 5–10 lakh. UNVERIFIED. [S] https://thekashmirimages.com/2025/02/24/kashmirs-labor-scenario-is-kashmir-shaping-a-mini-bihar
- Reported daily wages: Rs 800–900, up from Rs 450–500. Undated, so UNVERIFIED. [S] https://www.nationalheraldindia.com/india/panic-among-kashmirs-apple-orchardists-due-to-adverse-weather-forecast-high-cost-because-of-workers-exodus
- Supply collapses after attacks on migrants: the 2019 exodus, and later incidents. [S] https://www.deccanherald.com/national/north-and-central/kashmir-exodus-of-migrant-labourers-affect-harvesting-763613.html

**Police registration**
- After attacks in South Kashmir, a J&K Police advisory (article dated 6 Aug 2026) says newly arriving labourers must **"register at the nearest police station"**. Identity and place of stay undergo "strict security verification before permission is granted". Labourers are advised to relocate from isolated sites (e.g., brick kilns) and to stay indoors after dark. [V] https://www.wionews.com/india-news/j-k-police-issues-new-advisory-for-non-local-labourers-after-recent-terror-attacks-15-lakh-reward-announced-for-let-terrorist-1786002596846
- District orders (Samba, Kathua) require contractors and property owners to disclose or verify outside workers. Dates unclear. [S] https://m.greaterkashmir.com/article/disclosure-of-outsiders-working-residing-in-j-ks-samba-mandatory-for-property-owners-contractors/462844 ; [S] https://www.uniindia.com/north-india/security-jk-labourer-verification/206692
- In the past, the IGP Kashmir called one viral order on non-locals "fake". Verify any order against official channels. [S] https://thekashmirwalla.com/?p=77493
- A J&K Single Window procedure exists for principal employers of inter-state migrant workers. I could not open it, so thresholds and applicability to orchards are UNVERIFIED. https://singlewindow.jk.gov.in/assets/services/sop_file/84/sop_principal_emp_migrant_labour.pdf
- **Implication (proposal):**
  - The labour module should record each gang member's police-verification status, with an upload or "verified at police station X on date" field. Store only what is needed, with consent.
  - Make the gang leader (thekedar, or labour contractor) the accountable party.
  - Add a safety layer: share a safety-alert channel and avoid publishing workers' locations.
  - Treat all of this as sensitive data under DPDP.

**Marketing structure**
- Most produce moves through commission agents. One J&K study: 61% of production goes producer → commission agent → wholesaler → retailer.
- Pre-harvest contractor channels carry about 17%. [S] https://ums.iust.ac.in/UploadedDocuments/EmployeeDocuments/ResearchPapers/1325_NF8MBD.pdf
- Channel choice depends on the grower's source of finance. [S] https://www.pbr.co.in/2020/May7.aspx
- Azadpur (Delhi) is the main destination. [S] (same IUST paper)
- **Implication:** commission agents are both the incumbent lenders and the transport organisers. The app should complement them, not try to disintermediate them on day one.

---

## 5. Business models of Indian agri platforms

### 5.1 Snapshot (FY25 unless noted)

| Company | Model | Key numbers | Source |
|---|---|---|---|
| **DeHaat** | Full-stack: inputs, output trading, advisory; franchised DeHaat Centres run by micro-entrepreneurs | Operating revenue Rs 3,010 cr; **~80% from agri-output (spices, staples), ~20% inputs**; net loss Rs 207 cr (or Rs 369–370 cr profit including non-cash fair-value gains); EBITDA margin −5.78%; reports EBITDA-positive Q1 FY26 | [V] https://entrackr.com/fintrackr/dehaat-cuts-losses-by-15-to-rs-207-cr-in-fy25-10504383 ; [S] https://inc42.com/buzz/dehaat-turns-profitable-in-q1-fy26-eyes-full-year-profitability/ ; [S] https://inc42.com/features/inside-dehaats-inr-3000-cr-scale-and-its-long-road-to-profitability |
| **AgroStar** | Agri-input commerce, app plus agronomy advice | Revenue about Rs 850 cr; net loss about Rs 143.5 cr (down 56%); about 97% of revenue is product sales, services about Rs 13 cr | [S] https://entrackr.com/fintrackr/agrostar-crosses-rs-850-cr-revenue-in-fy25-cuts-losses-11171664 ; [S] https://lapaasvoice.com/startup/agrostar/business-model/ |
| **BigHaat** | Inputs plus produce trading | Revenue about Rs 1,100 cr; claims EBITDA positive; net loss about Rs 25–29 cr; **85% of revenue from produce sales**; gross margin about 15% | [S] https://entrackr.com/exclusive/exclusive-bighaat-crosses-rs-1100-cr-revenue-in-fy25-turns-ebitda-profitable-9755082 ; [S] https://www.indianstartuptimes.com/?p=27459 |
| **Gramophone** (Indore) | Inputs plus advisory; credit via Jai Kisan | FY24 revenue Rs 98.2 cr (down 69% after closing its output vertical); FY25 about Rs 67–71 cr; Unnati acquisition (Jan 2026) UNVERIFIED | [S] https://inc42.com/buzz/gramophones-fy24-revenue-slumps-69-to-inr-98-cr ; [S] https://www.indianstartuptimes.com/?p=27461 |
| **Ninjacart** | B2B fresh-produce marketplace and fulfilment (margin between buy and sell prices) | Revenue Rs 1,634 cr (down 19% after dropping low-margin FMCG trading); loss Rs 256 cr; targets profit in FY27 | [S] https://www.theweek.in/wire-updates/business/2025/12/26/dcm46-biz-agri-ninjacart.html |
| **Arya.ag** | Warehousing, finance (NBFC Aryadhan, partner banks) and commerce | Net revenue about Rs 447 cr; PAT about Rs 32 cr (+70%); financing facilitated Rs 14,181 cr (Rs 2,000 cr via Aryadhan and partners); revenue mix about 50–55% storage, 25–30% finance; "near-zero NPAs" (self-reported) | [S] https://entrackr.com/fintrackr/aryaag-reports-rs-447-cr-revenue-in-fy25-profits-spike-70-9048421 ; [S] https://yourstory.com/2025/05/aryaag-pat-jumps-70-rs-32-cr-in-fy25-facilitates-rs-14181-cr-agri-loans ; [S] https://finance.yahoo.com/news/even-global-crop-prices-fall-070000157.html |
| **BlackBuck** (logistics comparator) | Truck-owner services: tolling, telematics, fuel, finance; small load marketplace | FY25 revenue about Rs 427–462 cr | [S] links in 4.2 |

**Pattern:** the big "farmer platforms" earn most of their revenue from trading (output commodities or inputs) at thin margins. Advisory itself earns almost nothing (AgroStar services about 1.5% of revenue). The clearly profitable model, Arya.ag, earns fees on physical infrastructure (storage) plus secured lending.

### 5.2 Input credit and "pay after harvest"

- **Gramophone with Jai Kisan (2022)** [V] https://agfundernews.com/gramophone-evolves-from-marketplace-to-full-stack-platform-with-new-lending-solutions-for-farmers
  - Underwriting used farm size, crops, irrigation and transaction history collected during advisory.
  - Eligible farmers got an input purchase limit. They **paid interest and fees upfront and repaid the principal after harvest.**
- **Jai Kisan**
  - Acquired an NBFC licence via Kushal Finnovation. [S] https://inc42.com/buzz/jai-kisan-secures-nbfc-licence-after-picking-up-stake-in-kushal-finnovation
  - Co-lends with banks, including public-sector banks. [S] https://inc42.com/buzz/rural-fintech-startup-jai-kisan-nets-inr-26-5-cr-from-existing-investors/
- **farMart**
  - Credit linked to input purchases at partner retailers, repaid in a lump sum at harvest. [S] https://bfaglobal.com/wp-content/uploads/2020/06/About-farMart.pdf
  - Its cashless model worked locally but could not scale without collection staff, and it shifted to merchants. [V] https://inc42.com/?p=235037
- **DeHaat** planned input credit based on members' transaction history. Old source; current status UNVERIFIED. [S] https://agfundernews.com/?p=12335
- **Arya.ag** lends against warehouse receipts. It partnered with NBFC MAS Financial for small farmers and farmer producer organisations (FPOs). [S] https://agritimes.co.in/investment-finance/arya-ag-tie-up-with-mas-financial-services-to-offer-agri-finance-to-small-farmers-and-fpos
- **J&K:** the Kisan Sathi portal routes credit applications to banks digitally. [V] https://kashmirreader.com/2026/01/19/hadp-ushers-a-new-era-of-agricultural-transformation-across-jk/
- **Why agri-fintech struggled (Inc42, Dec 2020)** [V] https://inc42.com/?p=235037
  - Thin data: banks want 4–5 years of history; land records are outdated.
  - Cash repayments are hard to scale.
  - An NBFC licence takes more than a year, so startups operate as business correspondents and lenders ask for 20–40% guarantees.
  - Local intermediaries lend in about 5 days vs about 20 days for government loans.
  - Informal borrowing rises mid-season, when unplanned costs hit.
- **Implication for Kashmir (proposal)**
  - Input credit should run only through a regulated partner (a bank or NBFC, possibly J&K Bank or KCC-linked).
  - Repayment should be tied to apple sale proceeds, for example through commission-agent settlement or CA-storage receipts, the Arya.ag analogue.
  - This needs collections and legal design before launch.

### 5.3 Failure lessons

- **BharatAgri** (advisory plus input e-commerce, more than 1 million users) shut down in Nov 2025 after failing to raise funds: "High customer acquisition costs and low repeat orders." [V] https://www.peoplematters.in/news/business/bharatagri-shuts-shop-after-failing-to-secure-new-funding-round-47212
- **Otipy** (farm-to-consumer) shut on 17 May 2025 amid a cash crunch, with about 300 employees affected. A reported Rs 50 cr in unpaid dues and a CAC of Rs 150 vs LTV of Rs 80 are single-commentator figures, UNVERIFIED. [S] https://inc42.com/buzz/otipy-shuts-operations-amid-cash-crunch ; [S] https://yourstory.com/2025/05/farm-to-consumer-startup-otipy-shuts-down-employees-customers-seek-clarity-layoff
- **Gramophone** revenue fell 69% after it closed its output vertical. [S] https://inc42.com/buzz/gramophones-fy24-revenue-slumps-69-to-inr-98-cr
- **Ninjacart** cut low-margin (1–2%) FMCG trading. [S] https://www.theweek.in/wire-updates/business/2025/12/26/dcm46-biz-agri-ninjacart.html
- **Trringo** was absorbed into its parent with a net worth of Rs 1.82 cr. [V] (link in 4.3)
- **Funding collapse:** agritech funding fell 78% to $178M in 2023, rose about 30% in 2024, then fell 58% year on year in H1 2025 to $96M (Tracxn-type data; other trackers differ). [S] https://entrackr.com/report/indias-agritech-at-inflection-point-funding-revival-profitable-models-and-consolidation-11036024
- **Industry analysis:** the early direct-to-farmer model assumed scale would make up for low margins, but the opposite held. Durable businesses address productivity, logistics and finance. [S] https://yourstory.com/2026/04/what-happened-when-scale-met-the-farm-reality
- **Offline-heavy operations are the norm** (EM3) [V], and agent models are costly (GSMA) [S].

**Implications for the Kashmir app (proposal)**
1. Earn from **transactions that already involve money and pain**: freight, labour gangs, CA space, spraying services. Use a small, transparent booking fee or a provider subscription (the ColdKonnect model).
2. Keep advisory free; it drives acquisition and trust.
3. Use the KKG network for distribution rather than paid customer acquisition.
4. Add credit only with a regulated partner.
5. Measure repeat bookings per season, not downloads.

---

## 6. What I could not verify, or did not research (search budget ran out)

**Language and literacy**
- Literacy in Kashmiri vs Urdu: the 32.7% vs >95% survey figure and the Kak (2001) "97%" claim are UNVERIFIED.
- Whether Gboard voice typing, Bhashini, Google or Microsoft speech services support **Kashmiri speech**: UNVERIFIED. No published Kashmiri word-error rate for IndicConformer.
- Whether the Kisan Call Centre answers in **Kashmiri**: UNVERIFIED.

**Connectivity**
- 2019–20 SMS restoration dates and the prepaid-voice timeline: not confirmed (ISOC gives landline, postpaid, broadband and 4G dates only).
- J&K shutdown count for 2024: conflicting (SFLC says 2; press coverage of Access Now says 12).
- Rural smartphone access for J&K adults over 60: no state-level age breakdown found.

**Gender**
- Women's roles in Kashmir apple farming: only journalism and a 2014 report cited second-hand. No peer-reviewed apple-specific study was found.

**Kashmir marketplace context**
- CA-storage **rent per box** and how CA space is booked in Kashmir: not found.
- Truck-union rate cards in Kashmir and how growers currently book trucks: not found.
- Current daily wages for picking and packing gangs (2025–26): only undated or modelled figures.
- Applicability of migrant-worker registration (J&K Single Window SOP, labour codes) to individual orchard owners: UNVERIFIED.

**Platforms**
- **Porter**, **Kisan Rath**, **Plantix** community features, **Jugalbandi** (WhatsApp), **Samunnati**, Celcius cold-chain, Gram Vaani's current scale, and cancellation policies of booking apps: not researched.
- CHC/FARMS app usage numbers: only a secondary claim.
- Several financial figures (BlackBuck, BigHaat, Gramophone FY25, Arya.ag PAT growth of 70% vs 79%) vary across trackers.
