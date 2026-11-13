# Kashmir apple sector: markets, logistics, weather, schemes, labour and data sources

Research for an app for apple growers in Kashmir. Compiled 12 November 2026.

**How to read this file**
- Every fact has its source link beside it. Every statistic gives its year or date.
- **UNVERIFIED** means one of three things: I could not confirm it against a primary or reputable source in this session, the sources disagree, or it comes from background knowledge I did not re-check.
- "(search summary)" means the fact came from a search-engine snippet of that page. I could not open the page itself.
- Rupee figures are as published. "LMT" means lakh metric tonnes (1 LMT = 100,000 t). "q" means quintal (100 kg).
- **Limits of this research:** the shared web-search budget ran out partway through. Labour wages, the number of CA store units, the November 2018 and 2019 snow events and some helpline numbers could not be checked (see section 8). I did not call the data.gov.in API, because using a key found in search results was blocked. API details come from documentation and third-party write-ups.

---

## 0. Quick reference: the best data sources to build on

| Need | Best source | Access | Notes |
|---|---|---|---|
| Daily mandi prices (machine-readable) | data.gov.in OGD API, dataset "Current Daily Price of Various Commodities from Various Markets (Mandi)", resource ID `9ef84268-d588-465a-a308-a864a43d0070` ([dataset page](https://www.data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi); [usage notes](https://themineworks.com/blog/india-government-data-api/)) | Free API key from a data.gov.in account | Prices are in Rs per quintal. Kashmir markets report only during the season, roughly August to March ([SKUAST-K preprint, 2026](https://doi.org/10.21203/rs.3.rs-11006590/v1)). Test the key and the filters before building on it. |
| Authoritative price portal (manual or scrape) | Agmarknet 2.0, upgraded November 2025 (agmarknet.gov.in), with the Agmarknet 2.0 mobile app ([PIB via Global Agriculture, 17 Dec 2025](https://www.global-agriculture.com/india-region/agmarknet-and-e-nam-empower-farmers-with-real-time-mandi-price-information/)) | Web and app. No public API documentation found. | 4,367 mandis linked as of December 2025 (same source). |
| e-NAM trade prices | enam.gov.in live dashboard, which is public ([PIB doc, April 2026, search summary](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/apr/doc2026413845801.pdf)) | Dashboard only. No documented public API. | 17 J&K mandis are on e-NAM ([J&K Economic Survey 2025-26](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf)). |
| National Horticulture Board bulletin | NHB "Daily Price-Arrival Market Bulletin". Centres include Srinagar, Jammu and Delhi ([NHB report page](https://nhb.gov.in/OnlineClient/MISDailyReport.aspx?&menu.Menu=11)) | Web form | Whether the data is current is UNVERIFIED. |
| J&K Horticulture (Planning & Marketing) rates | [dhpm.jk.gov.in](https://dhpm.jk.gov.in/) has "Wholesale Rates – Within State / Outside State" menus | Web | On 12 Nov 2026 both pages held no data, only placeholder entries ([within](https://dhpm.jk.gov.in/wholesalerates.aspx?type=Rates_Within), [outside](https://dhpm.jk.gov.in/wholesalerates.aspx?type=Rates_Outside)). Not usable as a feed. |
| Road status (NH-44, Mughal Road, SSG) | J&K Traffic Police on X, [@Traffic_hqrs](https://x.com/Traffic_hqrs): timed updates and next-day advisories. Traffic Control Unit (TCU) phone lines (section 3.3). | X / phone | No official API found. Daily advisories are republished by [Kashmir Life](https://kashmirlife.net/jammu-srinagar-highway-authorities-issue-traffic-advisory-459897/) and others. |
| Weather (official) | IMD API platform [api.imd.gov.in](https://api.imd.gov.in), [API reference](https://api.imd.gov.in/public/api_reference.html). Endpoints for district warnings, district nowcast, city forecast, AWS data and district rainfall forecast. | Register on the portal. Organisations contact IMD's nodal officer ([IMD API doc](https://mausam.imd.gov.in/Forecast/marquee_data/API_doc.pdf)). | The index also lists Highway Nowcast/Warning and Agromet Advisory APIs, but their details are not on the page. |
| Weather (easy fallback) | [Open-Meteo](https://open-meteo.com/en/pricing) | Free tier for non-commercial use only: 600 calls/min, 5,000/hour, 10,000/day, 300,000/month. Paid plans for commercial apps. Data under CC BY 4.0. | An app with ads or subscriptions needs a paid plan ([terms](https://open-meteo.com/en/terms)). |
| Agromet advisories | IMD Agromet Advisory pages (Gramin Krishi Mausam Sewa). Meghdoot app. IMD Srinagar "Agromet bulletin" PDF ([IMD Srinagar](https://mausam.imd.gov.in/srinagar/), [IMD home](https://mausam.imd.gov.in/)). | Web/PDF/app | No district agromet API found (the API index item has no details). |
| Official statistics | [J&K Economic Survey 2025-26](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf) (PDF, February 2026): district-wise apple area and production, and mandi-wise dispatches | PDF | The best single official source for 2024-25 figures. |

---

## 1. Sector statistics

### 1.1 Area and production (J&K)

| Metric | Value | Year | Source |
|---|---|---|---|
| Area under apple | **1,73,073 ha**, 50.01% of the UT's horticulture area of 3,46,098 ha | 2024-25 | [J&K Economic Survey 2025-26, Stat. Appendix Tables 4.2.2 and 4.2.3.1](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf). The same 173,073 ha figure appears in [Mongabay, 13 Oct 2026](https://india.mongabay.com/2026/10/as-kashmir-turns-from-paddy-to-apples-dependence-on-outside-rice-grows/), citing the Digest of Statistics 2024-25. |
| Area under apple, 20 years earlier | 1,07,930 ha | 2004-05 | [Mongabay, 13 Oct 2026](https://india.mongabay.com/2026/10/as-kashmir-turns-from-paddy-to-apples-dependence-on-outside-rice-grows/) |
| Apple production (official) | **2,110.02 thousand MT (21.10 LMT)** | 2024-25 | [Economic Survey 2025-26, Table 4.2.4](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf) |
| Split by division | Kashmir 20.79 LMT; Jammu 30,393 MT | 2024-25 | Assembly reply ([Kashmir Life, 30 Oct 2025](https://kashmirlife.net/apple-production-crosses-21-lakh-mts-in-jammu-kashmir-government-targets-expansion-of-cold-storage-capacity-411454/)). This matches the district table: the 10 Kashmir districts sum to 2,079.63 thousand MT (my arithmetic). |
| Earlier government series | 20.40 LMT (2022-23); 20.64 LMT (2023-24); 20.56 LMT (2024-25, provisional, March 2025) | 2022–25 | [Kashmir Life, 6 Mar 2025](https://kashmirlife.net/jammu-kashmirs-apple-production-steady-at-two-million-tonnes-annually-horticulture-sector-expands-384804/). The 2024-25 figure was later revised to 21.10 LMT. |
| IASRI series (as cited) | J&K 20.45 lakh t vs Himachal 5.83 lakh t | 2024-25 | [The Tribune explainer, 7 Nov 2026](https://www.tribuneindia.com/news/explainers/explainer-how-kashmir-has-eaten-into-himachals-apple-pie/) |
| 2025 crop, in-season estimate | 22.15 LMT (government estimate) | 2025 | Government statement in the Assembly ([Kashmir Vision, 29 Oct 2025](https://kashmirvision.in/2025/10/29/miniscule-amount-of-apple-produce-remained-stranded-on-highway-during-blockade-govt/)). A final 2025-26 figure was not found (UNVERIFIED). |
| 2026 crop | No official estimate found. Reports cite hail and scab losses; one report estimates a 20–30% cut in output. | 2026 | [Kashmir Vision, 22 Oct 2026](https://kashmirvision.in/2026/10/22/rising-costs-uneven-prices-squeeze-kashmirs-apple-growers/) (UNVERIFIED estimate). USDA, by contrast, says J&K weather in MY 2025/26 was more favourable than in 2024/25 ([USDA FAS IN2026-0056, 3 Nov 2026](https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Fresh+Deciduous+Fruit+Annual_New+Delhi_India_IN2026-0056.pdf)). |
| Average productivity | ~12.2 t/ha | 2024-25 | My calculation from the Economic Survey area and production figures |
| Total horticulture (fresh and dry fruit) | 26.92 LMT on 3.46 lakh ha (2024-25); 27.35 LMT on 3.47 lakh ha (2025-26, up to Nov 2025) | 2024–25 | [Economic Survey 2025-26, Table 4.2(ii)](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf) |

### 1.2 District-wise apple area and production, 2024-25 (official)

Source for all rows: [J&K Economic Survey 2025-26, Statistical Appendix Tables 4.2.3.1 and 4.2.4](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf). The share and yield columns are my arithmetic.

| Rank | District | Apple area (ha) | Production ('000 MT) | Share of UT output | Yield (t/ha) |
|---|---|---|---|---|---|
| 1 | Baramulla (incl. Sopore belt) | 25,928.10 | 479.25 | 22.7% | 18.5 |
| 2 | Anantnag | 19,149.57 | 285.00 | 13.5% | 14.9 |
| 3 | Shopian | 21,811.50 | 269.66 | 12.8% | 12.4 |
| 4 | Kupwara | 19,593.67 | 233.05 | 11.0% | 11.9 |
| 5 | Kulgam | 18,255.00 | 218.40 | 10.4% | 12.0 |
| 6 | Pulwama | 15,928.00 | 212.85 | 10.1% | 13.4 |
| 7 | Budgam | 15,174.38 | 162.82 | 7.7% | 10.7 |
| 8 | Ganderbal | 7,808.00 | 122.16 | 5.8% | 15.6 |
| 9 | Bandipora | 5,854.00 | 75.71 | 3.6% | 12.9 |
| 10 | Srinagar | 1,779.75 | 20.73 | 1.0% | 11.6 |
| – | Jammu-division districts (Ramban 7.59, Kishtwar 7.02, Doda 5.75, Rajouri 4.18, Kathua 1.78, Poonch 1.63, Reasi 1.24, Udhampur 1.21) | ~21,791 combined | ~30.4 | ~1.4% | low |
| | **UT total** | **173,073.10** | **2,110.02** | 100% | 12.2 |

An older Greater Kashmir piece (2 Jan 2025) gives the same Baramulla, Shopian and Anantnag numbers ([GK](https://www.greaterkashmir.com/business/kashmirs-apple-supremacy/)).

### 1.3 J&K's share of India's apple output

- USDA FAS says J&K is "approximately 70 percent" of India's production, Himachal nearly 20% and Uttarakhand 2.5–6% (report dated 3 Nov 2026). [USDA FAS IN2026-0056](https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Fresh+Deciduous+Fruit+Annual_New+Delhi_India_IN2026-0056.pdf)
- USDA's India totals: **2.55 MMT** (MY 2024/25), **2.505 MMT** (MY 2025/26, revised down because of Himachal weather losses) and a forecast of **2.59 MMT** (MY 2026/27). Same source.
- My arithmetic: J&K's official 2.110 MMT against USDA's 2.55 MMT for 2024-25 gives about **83%**. Using the IASRI figures in the Tribune, J&K is about 78% of the J&K plus Himachal total. The methods differ, so quote it as "about 70–80%" and give the source.
- Other shares in circulation: 75% ([Times Headline, 2025, search summary](https://timesheadline.in/en/2025/03/25/kashmirs-apple-growers-left-in-the-lurch-as-goverment/)) and 78% ([ETV Bharat, 24 Apr 2026](https://www.etvbharat.com/en/bharat/after-years-of-delay-kashmir-apples-to-have-insurance-cover-soon-enn26042403871)).
- Himachal comparison for 2026: about 1.37 crore boxes dispatched by the end of harvest, against 3.49 crore the season before ([Tribune, 7 Nov 2026](https://www.tribuneindia.com/news/explainers/explainer-how-kashmir-has-eaten-into-himachals-apple-pie/)).

### 1.4 Livelihoods and value

| Metric | Value | Date | Source |
|---|---|---|---|
| People dependent on horticulture | ~35 lakh (3.5 million), directly or indirectly | ES 2025-26 (Feb 2026); Assembly, Sept 2026 | [Economic Survey 2025-26](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf); [Rising Kashmir, 25 Sep 2026](https://risingkashmir.com/jammu-and-kashmir-news/kashmir/jk-horticulture-supports-7-5-lakh-families-govt-12572855) |
| Families | ~7 lakh (ES 2025-26); **7.5 lakh** (Assembly reply, 24 Sep 2026) | 2026 | Same two sources |
| Annual value | "Roughly Rs 10,000 crore in revenue" (ES 2025-26); "~Rs 12,000 crore annually, ~10% of UT GDP" (Assembly, Sept 2026). Media estimates range from Rs 15,000 crore ([GK, Dec 2025](https://www.greaterkashmir.com/front-page-2/fruit-bowl-without-safety-net)) to Rs 20,000 crore ([GK, Jul 2025](https://www.greaterkashmir.com/front-page-2/kashmirs-rs-20000-crore-fruit-economy-at-climate-collapse-risk/)), both UNVERIFIED. | 2025–26 | As listed |
| Labour intensity | "One hectare of orchard generates about 400 man-days of work per year" | Sept 2026 | [Rising Kashmir, 25 Sep 2026](https://risingkashmir.com/jammu-and-kashmir-news/kashmir/jk-horticulture-supports-7-5-lakh-families-govt-12572855) |
| Apple trees | ~45 million trees | 2026 | [ETV Bharat, 12 Nov 2026](https://etvbharat.com/en/state/apple-detoxed-as-kashmir-sees-breakthrough-in-farming-enn26111207609) (UNVERIFIED) |
| Fruit dispatched outside J&K | Fresh fruit 17.13 LMT (2021-22), 18.31 (2022-23), 13.59 (2023-24), 13.35 (2024-25), 8.60 (2025-26 to Nov 2025). Fresh-fruit revenue Rs 4,171.66 crore (2024-25). | 2021–25 | [Economic Survey 2025-26, Table 4.2(ii)](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf) |

### 1.5 High-density (HD) plantations, status

- High- plus medium-density plantations cover **20,034.44 ha** cumulatively up to 2025 (1,119.21 ha HD and 18,915.23 ha medium density). 29.13 lakh HD plants were distributed in 2024-25, against 6.41 lakh in 2021-22. [ES 2025-26](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf)
- 1,103.79 ha of HD apple in the Kashmir Division since the scheme began, about 4,428 farmers. About 90% of that area is Gala and Red Delicious strains. Assembly reply, [Greater Kashmir, 27 Sep 2026](https://www.greaterkashmir.com/kashmir/1103-hectares-under-high-density-apple-plantations-in-kashmir-4428-farmers-covered-12580674)
- A private drive by Qul Fruits aimed to plant about 1.5 million HD trees by April 2026 ([Kashmir Reader, 14 Mar 2026, search summary](https://kashmirreader.com/2026/03/14/1-5-million-apple-trees-qul-fruits-leads-major-high-density-plantation-drive-in-kashmir/)).

---

## 2. Markets and prices

### 2.1 Major Kashmir and J&K fruit mandis: fruit dispatched outside J&K, 2024-25

Source: [J&K Economic Survey 2025-26, Stat. Appendix Table 4.2.7 "Mandi-wise Fruit Exported outside J&K – 2024-25"](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf). Also reported by [FreshPlaza, 10 Feb 2026](https://www.freshplaza.com/asia/article/9809365/jammu-and-kashmir-fruit-exports-reach-637-000-tons/).

| Mandi | District | Fruit sent outside J&K ('000 MT) | Turnover (Rs crore) | Share of mandi dispatches (my calc) | Name on Agmarknet (where seen) |
|---|---|---|---|---|---|
| **Sopore** | Baramulla | 289.22 | 1,387.50 | 45.4% | "Sopore (Nowpora) (F&V)" |
| **Aglar, Shopian** | Shopian | 121.19 | 628.34 | 19.0% | "APMC/MAC Shopian" |
| Jablipora | Anantnag | 64.86 | 282.90 | 10.2% | not seen in the Nov 2026 snapshot |
| Handwara | Kupwara | 36.16 | 113.00 | 5.7% | "Handwara Kupwara (F&V)" |
| **Parimpora, Srinagar** | Srinagar | 32.29 | 165.06 | 5.1% | reported in Jan 2026 (aggregator) |
| Prichoo | Pulwama | 22.44 | 116.99 | 3.5% | UNVERIFIED |
| **Narwal, Jammu** | Jammu | 17.70 | 113.18 | 2.8% | "MAC F&V Market Narwal Jammu" |
| Kulgam | Kulgam | 16.81 | 67.62 | 2.6% | reported late 2025 (aggregator) |
| Pachhar | Pulwama | 13.56 | 70.56 | 2.1% | UNVERIFIED |
| Kanispora | Baramulla | 10.39 | 47.94 | 1.6% | – |
| Zaloosa, Charar-e-Sharief | Budgam | 5.65 | 26.12 | 0.9% | "Zaloosa-Chararishrief (F&V)" |
| Zazna | Ganderbal | 4.67 | 19.97 | 0.7% | "Market Administrative Committee Zazna" |
| Kupwara | Kupwara | 2.63 | 132.38 (as printed) | 0.4% | – |
| **Total** | | **637.57** | **3,171.56** | | |

Notes:
- Sopore is commonly called "Asia's second-largest fruit mandi", after Azadpur ([Rising Kashmir, 3 Nov 2026](https://risingkashmir.com/anchor/festive-rush-bitter-returns-at-asias-second-largest-fruit-market-12777464); [Wikipedia](https://en.wikipedia.org/wiki/Sopore_Fruit_Market)). A claimed turnover of about Rs 7,000 crore in 2025, cited on Wikipedia from Greater Kashmir, is UNVERIFIED and does not match the official Rs 1,387.50 crore above. The official figure covers outside-J&K dispatches only.
- Sopore volumes in early November 2026: about 200–250 trucks a day and 2.5–3.5 lakh boxes a day, at about 3,000–3,500 boxes per truck (trader estimates, [Rising Kashmir, 3 Nov 2026](https://risingkashmir.com/anchor/festive-rush-bitter-returns-at-asias-second-largest-fruit-market-12777464); [Daily Excelsior, 3 Nov 2026](https://www.dailyexcelsior.com/kashmir-apples-on-demand-ahead-of-diwali)).
- J&K has **19 wholesale mandis, 17 on e-NAM**. Cumulative e-NAM trade is Rs 1,680.34 crore for 28.26 lakh quintals, with 55,355 registrations, up to Nov 2025. e-NAM trade was Rs 596.55 crore in 2024-25 ([ES 2025-26](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf)). The department website instead says "17 out of 24 functional mandis" ([dhpm.jk.gov.in](https://dhpm.jk.gov.in/)).
- On e-NAM by district (2024-25): Pulwama 2, Baramulla 2, Kupwara 2; one each in Anantnag, Kulgam, Shopian, Srinagar, Ganderbal, Budgam, Jammu, Udhampur, Ramban, Kathua and Rajouri (ES Table 4.2.6).
- First inter-state e-NAM trade: 11 t of Kashmir apples and pears went to Gultekdi APMC, Pune, in August 2025 ([Kashmir Convener, Mar 2026](https://kashmirconvener.com/?p=144841)).
- 2019 MIS procurement points were Sopore, Parimpora, Shopian and Batengoo (Anantnag) ([Tribune, 10 Sep 2019](https://www.tribuneindia.com/news/archive/j-k/centre-starts-scheme-to-procure-apple-from-growers-in-kashmir-830691)).

### 2.2 Destination markets

- **Azadpur APMC (Delhi)** is India's largest fruit and vegetable wholesale market and the main price-discovery point for Kashmir apples ([SKUAST-K preprint, 2026](https://doi.org/10.21203/rs.3.rs-11006590/v1)).
- Other destinations named in 2025–26 reports: Punjab and Haryana mandis (Jalandhar), Maharashtra, Bihar (Chhath demand), West Bengal, and exports to Nepal, Bangladesh and Bhutan ([Daily Excelsior, 3 Nov 2026](https://www.dailyexcelsior.com/kashmir-apples-on-demand-ahead-of-diwali); [ETV Bharat, 21 Sep 2025](https://www.etvbharat.com/en/!state/exorbitant-transportation-charges-put-kashmir-apple-growers-into-more-distress-enn25092103015); [GK, 29 Sep 2025](https://www.greaterkashmir.com/business/soaring-freight-costs-threaten-kashmirs-fruit-trade/); [FreshPlaza, 20 Oct 2025](https://www.freshplaza.com/latin-america/article/9776228/stable-prices-bring-relief-to-kashmir-apple-growers/)).
- India's apple exports in MY 2025/26 were 35,633 t: Nepal 17,802, Bangladesh 16,751, Bhutan 751, UAE 298 ([USDA FAS, 3 Nov 2026](https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Fresh+Deciduous+Fruit+Annual_New+Delhi_India_IN2026-0056.pdf)).

### 2.3 How price discovery works

- **Players.** The Shopian (Aglar) and Sopore APMCs connect growers, orchard contractors (pre-harvest buyers of the standing crop), packing-house operators, commission agents (arhtiyas) and transporters. Commission agents give growers credit in advance and keep a percentage of the sale value. This creates a credit dependency that weakens growers' bargaining power when supply is congested ([SKUAST-K preprint, Oct 2026](https://doi.org/10.21203/rs.3.rs-11006590/v1), citing Mir & Mir 2018, Gulati et al. 2018 and GoJK 2021).
- **Consignment model.** Much of the crop is consigned through local forwarding or commission agents to agents in Azadpur and other terminal markets. The price is set at the terminal auction, and freight and commission are deducted from the grower's proceeds. A NABARD draft, reported by DNA (year unclear and dated), estimated about 70% of output is "captive supply" tied to agents' credit ([search summary](https://www.dnaindia.com/india/report-dna-special-agents-decide-how-much-you-will-pay-for-kashmiri-apples-1817662), UNVERIFIED). Commission is often cited at about 6% at Azadpur, but that figure is from a 2010 Himachal report ([Tribune 2010, search summary](https://www.tribuneindia.com/2010/20100815/himachal.htm)). The current rate in Kashmir is UNVERIFIED.
- **Private channels.** Some private companies run their own warehouses or CA stores and pricing schemes. They bypass the mandis and commission agents and pay premium prices for top grades, with strict grading ([USDA FAS, Nov 2026](https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Fresh+Deciduous+Fruit+Annual_New+Delhi_India_IN2026-0056.pdf)).
- **How prices travel.** Shopian chains adjust to Azadpur prices about twice as fast as Sopore chains. The mean producer-to-terminal spread was about Rs 9.74/kg over 2015–2025, peaking at Rs 46.70/kg during disruptions ([SKUAST-K preprint](https://doi.org/10.21203/rs.3.rs-11006590/v1)).
- **Grades used in the trade.** A, B and C grades. Premium fruit is packed as "char tahi" (four layers) and "do tahi" (two layers) ([Rising Kashmir, 3 Nov 2026](https://risingkashmir.com/anchor/festive-rush-bitter-returns-at-asias-second-largest-fruit-market-12777464)). Common varieties: Delicious (Royal/Red Delicious), American (Richared), Kullu (Kulu) Delicious, Maharaji, Hazratbali, and HD varieties such as Gala.

### 2.4 Per-box vs per-kg selling and carton standardisation (current status)

- **J&K: no official per-kg or universal-carton mandate found** (UNVERIFIED that none exists). In April 2026 growers in Sopore were still demanding standard carton sizes and weights, and an end to low-quality "silicate" boxes. They said they had talked to banks and carton makers ([Chenab Times, 14 Apr 2026](https://thechenabtimes.com/2026/04/14/jammu-and-kashmir-apple-growers-demand-crop-insurance-ahead-of-peak-season/)).
- Box sizes in reports: 14–19 kg ([Down To Earth, 18 Sep 2025](https://www.downtoearth.org.in/governance/truckloads-of-kashmir-apples-rot-after-2-week-closure-of-key-highway)); 15–16 kg cartons ([FreshPlaza/AIKS, 1 Oct 2026](https://www.freshplaza.com/north-america/article/9878788/indian-apple-growers-seek-market-intervention-ahead-of-new-zealand-fta/)); traditional boxes of 16–20 kg against 10 kg HD boxes ([Kashmir Life, 1 Aug 2025](https://kashmirlife.net/kashmir-high-density-apple-farming-shift-399578/)). CA stores price storage per 17 kg crate ([101Reporters, 21 Oct 2026](https://101reporters.com/article/agriculture/Kashmirs_apple_growers_have_to_pay_to_replace_a_winter_that_once_came_free)).
- **What this means for the app (my inference, UNVERIFIED).** J&K APMC prices on Agmarknet appear to be box prices converted at 16 kg per box. Shopian's Rs 3,125/q equals Rs 500 per 16 kg box. Zazna's Rs 5,625 and 6,250/q equal Rs 900 and Rs 1,000 per box. Show both Rs/kg and an estimated per-box price, and state the box-weight assumption.
- **Himachal comparison.** Himachal moved to weight-based sale and universal cartons. Reports describe patchy enforcement ([HimbuMail, search summary](https://himbumail.com/business/apple-industry/apple-trade-in-himachal-pradesh-mandis); [Tribune, search summary](https://www.tribuneindia.com/news/himachal/apple-prices-pick-up-after-sluggish-start-this-season-644301)). Implementation dates are UNVERIFIED in this session.

### 2.5 NAFED Market Intervention Scheme (MIS): history

| Item | Detail | Source |
|---|---|---|
| Launch | "Special Market Intervention Price Scheme" for Kashmir apples, announced Sept 2019. Procurement ran 1 Sept 2019 to 2 Mar 2020 through NAFED. Target about 12 lakh MT (about 60% of the crop), estimated fund need Rs 8,000 crore. Payment by DBT within 48 hours. Procurement at Sopore, Parimpora, Shopian and Batengoo. | [Tribune, 10 Sep 2019](https://www.tribuneindia.com/news/archive/j-k/centre-starts-scheme-to-procure-apple-from-growers-in-kashmir-830691) |
| Rates (Rs/kg, grades A/B/C) | Initially 52 / 36 / 15.75, revised to 58 / 42 / 22, then 60 / 44 / 24 | Search summaries of [Kashmir Life](https://kashmirlife.net/making-apple-rot-issue-30-vol-12-250445/) and [Tribune](https://www.tribuneindia.com/news/himachal/apple-growers-seek-mis-rates-on-par-with-kashmir-289834). AIKS also cites 60/44/24 ([search summary](https://english.gujaratsamachar.com/news/business/apple-growers-demand-market-intervention-as-prices-fall-ahead-of-india-new-zealand-fta-86416489334)). |
| Quantity actually procured | Not found (UNVERIFIED) | – |
| Government position, Oct 2025 | MIS "continues to serve as a benchmark model". No current procurement figures given. | [Kashmir Life, 27 Oct 2025](https://kashmirlife.net/jammu-kashmir-govt-claims-apple-growers-were-supported-through-market-intervention-scheme-410788/) |
| Dec 2025 | Horticulture Minister said MIS was being considered if crop insurance did not materialise | [GK, 18 Dec 2025](https://www.greaterkashmir.com/front-page-2/fruit-bowl-without-safety-net) |
| Status, Oct–Nov 2026 | No MIS announced. AIKS demanded MIS with minimum prices for A, B and C grades and payment of pending MIS dues, and called an "All India Apple Growers' Protest Day" for 19 Oct 2026. | [FreshPlaza/Rural Voice, 1 Oct 2026](https://www.freshplaza.com/north-america/article/9878788/indian-apple-growers-seek-market-intervention-ahead-of-new-zealand-fta/) |
| USDA view | MIS is an ad hoc support measure aimed mainly at lower-grade, processing apples, and is bureaucratically hard for growers to access | [USDA FAS, Nov 2026](https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Fresh+Deciduous+Fruit+Annual_New+Delhi_India_IN2026-0056.pdf) |

### 2.6 Price ranges, 2024 to 2026 (as reported; dated)

| Date | Market / context | Variety / grade | Price | Source |
|---|---|---|---|---|
| 2019-20 → 2023-24 | Valley wholesale average | Delicious, 16 kg box | Rs 708 → Rs 458 (−35%) | [Kashmir Vision, 22 Oct 2026](https://kashmirvision.in/2026/10/22/rising-costs-uneven-prices-squeeze-kashmirs-apple-growers/) (underlying source not named, UNVERIFIED) |
| Sep 2015 – Mar 2025 (mean) | Sopore (Nowpora), Agmarknet | Delicious A / B | Rs 46.84 / 28.81 per kg | [SKUAST-K preprint](https://doi.org/10.21203/rs.3.rs-11006590/v1) |
| Sep 2015 – Feb 2025 (mean) | Sopore (Nowpora) | American A / B | Rs 48.69 / 26.31 per kg | same |
| Sep 2017 – Jan 2025 (mean) | Shopian (Aglar) | Delicious A / B | Rs 47.24 / 30.33 per kg | same |
| 2024 | After CA storage | – | Grower profit of about Rs 200–300 per box | [101Reporters, 21 Oct 2026](https://101reporters.com/article/agriculture/Kashmirs_apple_growers_have_to_pay_to_replace_a_winter_that_once_came_free) |
| Aug 2025 | HD vs traditional | HD fruit, 10 kg box | HD at least Rs 1,600/box; traditional (16–20 kg) at most Rs 1,200/box | [Kashmir Life, 1 Aug 2025](https://kashmirlife.net/kashmir-high-density-apple-farming-shift-399578/) |
| Sep 2025 (highway closure) | Valley | Not specified | Box that sold for Rs 1,500–2,000 fetched under Rs 500 | [Down To Earth, 18 Sep 2025](https://www.downtoearth.org.in/governance/truckloads-of-kashmir-apples-rot-after-2-week-closure-of-key-highway) |
| 20 Oct 2025 | Sopore | All varieties | US$12–18 per box | [FreshPlaza](https://www.freshplaza.com/latin-america/article/9776228/stable-prices-bring-relief-to-kashmir-apple-growers/) |
| Late Jan 2026 | Parimpora | Apple | about Rs 65/kg | aggregator ([search summary](https://www.commodityonline.com/mandiprices/district/jammu-and-kashmir/srinagar/apple), UNVERIFIED) |
| 5 Sep 2026 | Early season | Kullu (Kulu) | Rs 1,200–1,400 per box | [Kashmir Observer](https://kashmirobserver.net/2026/09/05/after-setbacks-kashmir-apple-growers-see-fresh-hope/) |
| 23 Sep 2026 | Fallen fruit ("Giran"), for juice and processing | – | Rs 100–250 per crate | [Kashmir Observer](https://kashmirobserver.net/2026/09/23/kashmir-apple-growers-find-relief-as-markets-storage-demand-improve/) |
| Early Sep → late Sep 2026 | Kashmir mandis | 15–16 kg carton | Rs 1,100–1,700 falling to Rs 700–1,000 (about Rs 44–67/kg) | AIKS via [FreshPlaza, 1 Oct 2026](https://www.freshplaza.com/north-america/article/9878788/indian-apple-growers-seek-market-intervention-ahead-of-new-zealand-fta/) and [Gujarat Samachar, search summary](https://english.gujaratsamachar.com/news/business/apple-growers-demand-market-intervention-as-prices-fall-ahead-of-india-new-zealand-fta-86416489334) |
| 19 Oct 2026 | Shopian mandi | Delicious A / B | Rs 6,250 / 3,125 per q | [Kashmir Vision, 22 Oct 2026](https://kashmirvision.in/2026/10/22/rising-costs-uneven-prices-squeeze-kashmirs-apple-growers/) |
| Oct 2026 | Valley mandis | Good quality | Rs 1,500–2,500 per box; HD apples Rs 150–200/kg in some markets (grower quote) | same |
| Nov 2026 | Mandis (grower quote) | Gala | Rs 2,000–2,500 per box | [Tribune, 7 Nov 2026](https://www.tribuneindia.com/news/explainers/explainer-how-kashmir-has-eaten-into-himachals-apple-pie/) |
| 2 Nov 2026 | Sopore | Premium/large (Royal, "three-dana", American) | Rs 1,000–1,300 per box | [Daily Excelsior](https://www.dailyexcelsior.com/kashmir-apples-on-demand-ahead-of-diwali) |
| 2 Nov 2026 | Sopore | B and C grade (scab, Alternaria, pests) | Rs 200–250 per box | [Rising Kashmir](https://risingkashmir.com/anchor/festive-rush-bitter-returns-at-asias-second-largest-fruit-market-12777464); [Daily Excelsior](https://www.dailyexcelsior.com/kashmir-apples-on-demand-ahead-of-diwali) |
| 10–11 Nov 2026 | Agmarknet-derived snapshot (CommodityMarketLive) | See next rows | Rs per quintal (modal; range) | [CommodityMarketLive PDF](https://www.commoditymarketlive.com/mandi/statewisecommodityaspdf/jammu-and-kashmir/apple) |
| 11 Nov 2026 | Sopore (Nowpora) | Delicious / American | 5,100 / 5,800 | same |
| 10 Nov 2026 | APMC/MAC Shopian | Delicious | 3,125 (2,500–3,750) | same |
| 10 Nov 2026 | Handwara | Delicious / American | 3,437.5 (3,125–5,000) / 3,750 (3,625–4,687.5) | same |
| 10 Nov 2026 | Zazna (Ganderbal) | Delicious / Kullu Delicious | 5,625 (5,000–6,250) / 6,250 (5,625–6,875) | same |
| 10 Nov 2026 | Zaloosa-Charar-e-Sharief | Delicious | 4,250 (4,062.5–4,500) | same |
| 10 Nov 2026 | Narwal, Jammu | Apple | 5,500 (3,000–8,000) | same |
| Sep 2026 | Delhi wholesale, imported apples | US Red Delicious | Rs 5,500–5,700 per 20 kg | [USDA FAS, Nov 2026](https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Fresh+Deciduous+Fruit+Annual_New+Delhi_India_IN2026-0056.pdf) |
| Sep 2026 | Delhi wholesale, imported apples | NZ Royal Gala; Turkish Red Delicious; Italian Red Delicious | Rs 4,600–4,800 per 18 kg; Rs 4,200–4,300 per 18 kg; Rs 3,000–3,200 per 14 kg | same |

Takeaway for the app: prices vary roughly tenfold by grade within a single day (Rs 200 to Rs 1,300+ per box at Sopore on 2 Nov 2026). Grade and variety have to be first-class fields in the price feed.

### 2.7 Price data sources and APIs (technical detail)

1. **data.gov.in OGD API: "Current Daily Price of Various Commodities from Various Markets (Mandi)"**
   - Dataset page: https://www.data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi. Publisher: Ministry of Agriculture & Farmers Welfare. Underlying data: Agmarknet.
   - Endpoint: `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=<YOUR_KEY>&format=json&offset=0&limit=100` plus filters, for example `&filters[state.keyword]=Jammu and Kashmir&filters[commodity]=Apple`. Several third-party write-ups confirm the base URL and resource ID ([Mineworks](https://themineworks.com/blog/india-government-data-api/); [data.gov.in API link, search summary](https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070)). The exact filter names are UNVERIFIED: copy them from the dataset's "API" tab. Mineworks notes that field names are case-sensitive and differ between datasets.
   - Key: free. Register at data.gov.in, then My Account, then generate an API key. The public sample key shown on dataset pages is heavily rate-limited (reported as 10 records per call, UNVERIFIED). Use your own key. Mineworks reports a maximum `limit` of about 100 on most datasets and no published rate limit.
   - Fields: state, district, market, commodity, variety, grade, arrival_date (DD/MM/YYYY), min_price, max_price, modal_price, all in **Rs/quintal**. Prices arrive as strings.
   - This dataset is a current snapshot. For history, use Agmarknet (the SKUAST-K team downloaded 2012–2025 series from it) or the separate data.gov.in dataset "Variety-wise Daily Market Prices Data of Commodity" ([dataset page](https://www.data.gov.in/resource/variety-wise-daily-market-prices-data-commodity); its resource ID is not confirmed in this session).
   - **Which J&K markets report apple** (Agmarknet-derived snapshot for 10–11 Nov 2026, [CommodityMarketLive](https://www.commoditymarketlive.com/mandi/statewisecommodityaspdf/jammu-and-kashmir/apple)): Sopore (Nowpora) (F&V); APMC/MAC Shopian; Handwara Kupwara (F&V); Market Administrative Committee Zazna; Zaloosa-Chararishrief (F&V); MAC F&V Market Narwal Jammu; Kathua (F&V); Fruit & Vegetable Market Udhampur; Rajouri (Phaliana) (F&V). Aggregators also showed **Parimpora** and **Kulgam** in late 2025 or January 2026 (search summary, UNVERIFIED). Agmarknet start dates: Azadpur January 2012, Sopore/Nowpora August 2015, Shopian/Aglar September 2017 ([SKUAST-K preprint](https://doi.org/10.21203/rs.3.rs-11006590/v1)).
   - Data-freshness caveat: a search snippet says the dataset metadata page shows "last updated" in April or August 2025. The Nov 2026 aggregator data suggests the feed is still live. Check before launch.
2. **Agmarknet 2.0** (agmarknet.gov.in). Upgraded in November 2025, with an Agmarknet 2.0 mobile app for both mandi data entry and farmer lookups. 4,367 mandis linked. Gives variety-wise and grade-wise daily price and arrivals ([PIB via Global Agriculture, 17 Dec 2025](https://www.global-agriculture.com/india-region/agmarknet-and-e-nam-empower-farmers-with-real-time-mandi-price-information/)). No official public API found. The site blocks automated fetches (403 in this session).
3. **e-NAM** (enam.gov.in). Has a public live dashboard of commodity-wise trade volumes and mandi-level prices. Its mobile app gives free price information for 247 notified commodities. Nationally: 1,522 mandis (Dec 2025, PIB) or 1,656 mandis (Feb 2026, Lok Sabha reply) ([Global Agriculture](https://www.global-agriculture.com/india-region/agmarknet-and-e-nam-empower-farmers-with-real-time-mandi-price-information/); [Kashmir Convener](https://kashmirconvener.com/?p=144841)). No public API documented (UNVERIFIED).
4. **NHB** ([nhb.gov.in](https://nhb.gov.in/)). Offers daily, weekly, monthly and annual price-arrival reports. The daily bulletin's centre list includes Srinagar, Jammu and Delhi ([report page](https://nhb.gov.in/OnlineClient/MISDailyReport.aspx?&menu.Menu=11)). Coverage of apple and how current the data is are UNVERIFIED.
5. **UPAg portal** (Unified Portal for Agricultural Statistics). India.gov.in points users to "Agmarknet 2.0 Dashboard or the UPAg Portal" for daily prices (search summary). The domain and any API are UNVERIFIED.
6. **J&K Department of Horticulture (Planning & Marketing)** ([dhpm.jk.gov.in](https://dhpm.jk.gov.in/)). The wholesale-rate pages for within and outside the state were empty on 12 Nov 2026. Departmental email: director-hpm@jk.gov.in; officers' phone numbers are listed on the site. The department runs "Kissan Ghar" facilities within and outside J&K (menu items on the site).

---

## 3. Logistics and roads

### 3.1 NH-44 (Srinagar–Jammu) closures and their impact

**How often it closes.** Journalist Arif Shafi Wani counts 284 closure days since 2019: 47 (2020), 23 (2021), 41 (2022), 58 (2023) and 26 in 2025 up to mid-September ([Down To Earth, 18 Sep 2025](https://www.downtoearth.org.in/governance/truckloads-of-kashmir-apples-rot-after-2-week-closure-of-key-highway)). About 90% of Kashmir's apple dispatches go along this one corridor ([SKUAST-K preprint](https://doi.org/10.21203/rs.3.rs-11006590/v1), citing APEDA 2021). Delays of 3–5 days can cut the grade of American apples by 25–40% (same, citing Mir & Mir 2018).

**The 2025 crisis (peak harvest)**

| Date (2025) | Event | Source |
|---|---|---|
| Aug 26–27 and Sep 2–3 | Very heavy rain caused landslides and flash floods, mainly in Ramban and Udhampur. Unusual damage near Jakheni and Thard in Udhampur. Closure began on 26 August. | [Govt statement via Kashmir Vision, 29 Oct 2025](https://kashmirvision.in/2025/10/29/miniscule-amount-of-apple-produce-remained-stranded-on-highway-during-blockade-govt/); [DTE](https://www.downtoearth.org.in/governance/truckloads-of-kashmir-apples-rot-after-2-week-closure-of-key-highway); [ETV Bharat, 21 Sep 2025](https://www.etvbharat.com/en/!state/exorbitant-transportation-charges-put-kashmir-apple-growers-into-more-distress-enn25092103015) |
| by Sep 10 | NHAI partially reopened the road | Govt statement (above) |
| Sep 15–16 | Protests at Jablipora mandi and in Srinagar ("Save Apple, Save Kashmir") | [DTE](https://www.downtoearth.org.in/governance/truckloads-of-kashmir-apples-rot-after-2-week-closure-of-key-highway) |
| Sep 16–17 | Road reopened. Heavy vehicles allowed from Srinagar to Jammu on 17 Sep. Traffic "fully restored" on 17 Sep. | [DTE](https://www.downtoearth.org.in/governance/truckloads-of-kashmir-apples-rot-after-2-week-closure-of-key-highway); [Roshan Kashmir, 16 Sep 2025, search summary](https://roshankashmir.net/2025/09/16/heavy-vehicle-movement-from-srinagar-to-jammu-allowed-tomorrow-ig-traffic/) |
| Impact | More than 2,000 apple trucks stranded, 700–800 of them from Jablipora, each carrying 1,200–1,300 boxes. About half of the stranded fruit was damaged (DTE). Government figure: over 22,000 MT (about 2,200 trucks) stranded as of 17 Sep, about 1% of produce. 45,922 fruit trucks left J&K via NH-44 and Mughal Road. Traders' loss estimates: Rs 500–700 crore ([ETV Bharat, search summary](https://www.etvbharat.com/en/!state/kashmir-apple-on-track-again-after-initial-losses-enn25091501575)); Rs 600–700 crore ([Kashmir Vision, 22 Oct 2026](https://kashmirvision.in/2026/10/22/rising-costs-uneven-prices-squeeze-kashmirs-apple-growers/)). | as cited |
| Crop damage and compensation | 431.091 ha of orchards with more than 33% damage. Compensation admissible under SDRF/NDRF norms: Rs 152.37 lakh, of which Rs 12.28 lakh had been paid by Oct 2025. | [Govt via Kashmir Vision, 29 Oct 2025](https://kashmirvision.in/2025/10/29/miniscule-amount-of-apple-produce-remained-stranded-on-highway-during-blockade-govt/) |
| Response | Control room at Qazigund. Mughal Road made fully operational as an alternative. 157 RTC trucks deployed. Rail parcel services started (section 3.4). | Govt statement; [ETV Bharat, 21 Sep 2025](https://www.etvbharat.com/en/!state/exorbitant-transportation-charges-put-kashmir-apple-growers-into-more-distress-enn25092103015); [Kashmir Reader, 30 Oct 2025](https://kashmirreader.com/2025/10/30/14000-mts-of-apples-moved-from-valley-via-rail-network/) |

**Closures in 2026 so far (none found during the peak apple season)**

| Date (2026) | Event | Source |
|---|---|---|
| ~26 Mar | Landslide closed the highway between Karol Bridge and Chanderkote (Ramban); hundreds of vehicles stranded | [Greater Kashmir](https://www.greaterkashmir.com/jammu-kashmir/jammu-srinagar-highway-closed-after-landslide-in-ramban-vehicles-stranded/) |
| 6–7 Apr | Landslide at Karol (Ramban); traffic halted both ways | [The Right News, 7 Apr 2026](https://www.therightnews.in/2026/04/07/jammu-srinagar-highway-closed-after-landslide-in-ramban-traffic-halted-on-both-sides/) |
| ~24–26 Jul | Three-day closure after a landslide near Dewal (Udhampur), followed by a clearance closure at Gangroo (Ramban–Banihal). About 1,700 trucks stranded. | [Curly Tales, 27 Jul 2026](https://curlytales.com/india/trending/jammu-srinagar-highway-hit-by-landslide-trucks-stranded-amarnath-convoy-moves-ahead/) |
| ~late Oct – early Nov | The Tulbul bridge near Sopore was closed about 10 days for repairs, disrupting mandi traffic (a local road, not NH-44) | [Rising Kashmir, 3 Nov 2026](https://risingkashmir.com/anchor/festive-rush-bitter-returns-at-asias-second-largest-fruit-market-12777464) |

In April 2026 growers also asked for two-way traffic during the Amarnath Yatra and for tolls on produce going to Sopore to be removed ([Chenab Times, 14 Apr 2026](https://thechenabtimes.com/2026/04/14/jammu-and-kashmir-apple-growers-demand-crop-insurance-ahead-of-peak-season/)).

### 3.2 Mughal Road (NH-701A, Shopian–Poonch)

- This is the main alternative for fruit trucks when NH-44 shuts. In 2025 it was "made fully operational" ([Govt via Kashmir Vision](https://kashmirvision.in/2025/10/29/miniscule-amount-of-apple-produce-remained-stranded-on-highway-during-blockade-govt/)). One search summary reported 2,800 trucks cleared over Mughal Road in two days in mid-September 2025 ([Roshan Kashmir, search summary](https://roshankashmir.net/2025/09/16/heavy-vehicle-movement-from-srinagar-to-jammu-allowed-tomorrow-ig-traffic/), UNVERIFIED).
- Current rules (advisory for 6 Nov 2026): LMVs, then HMVs with no more than 10 tyres, in both directions, subject to weather and GREF clearance. Hours 7 am to 6 pm, from Chandimarh/Baffliaz towards Shopian and from Heerpora towards Poonch (DM Shopian order dated 3 Jul 2026) ([Kashmir Life, 6 Nov 2026](https://kashmirlife.net/jammu-srinagar-highway-authorities-issue-traffic-advisory-459897/); [JK AdWorld, 5 Nov 2026](https://jkadworld.com/jk-news-today/jammu-srinagar-highway-traffic-advisory-6th-nov-2026-nh-44-ssg-road-travel-guidelines/)).
- It closes regularly after snowfall in winter, for example a closure reported in January 2026 ([Kashmir Life, search summary](https://kashmirlife.net/jammu-srinagar-highway-open-sinthan-mughal-roads-closed-419335/); the exact date is UNVERIFIED).

### 3.3 Where official road status is published

- **X (Twitter): [@Traffic_hqrs](https://x.com/Traffic_hqrs), "J&K Traffic Police".** Posts timed NH-44 updates (for example "Traffic update at 0930 hrs") and next-day traffic plans. Its bio says the account is not monitored around the clock and asks people to contact the TCUs in emergencies (search summary of the profile). Active as of 12–13 Nov 2026.
- **Daily advisories** are issued by Traffic Police Headquarters J&K with TCUs Jammu, Srinagar and Ramban, and republished by Kashmir Life, Rising Kashmir, Greater Kashmir and JK AdWorld. A typical advisory covers NH-44, Mughal Road, the SSG road (Srinagar–Sonamarg–Gumri) and NH-244 (Kishtwar–Sinthan–Anantnag), with vehicle-type windows and tanker restrictions ([Kashmir Life, 6 Nov 2026](https://kashmirlife.net/jammu-srinagar-highway-authorities-issue-traffic-advisory-459897/)).
- **Traffic Control Unit (TCU) helplines**, as printed in the 6 Nov 2026 advisory ([Kashmir Life](https://kashmirlife.net/jammu-srinagar-highway-authorities-issue-traffic-advisory-459897/)). Some digits differ between outlets ([JK AdWorld](https://jkadworld.com/jk-news-today/jammu-srinagar-highway-traffic-advisory-6th-nov-2026-nh-44-ssg-road-travel-guidelines/)), so confirm by calling before you put them in the app:
  - TCU Jammu: 0191-2459048, 0191-2740550, 9419147732, 103
  - TCU Srinagar: 0194-2450022, 0194-2485396, toll-free 1800-180-7091, 103
  - TCU Ramban: 9419993745, toll-free 1800-180-7043
  - Udhampur: 8491928625
  - PCR Kishtwar: 9906154100. PCR Kargil: 9541002330 / 0541-002331 (UNVERIFIED, conflicting transcriptions)
- A J&K Traffic Police website with a machine-readable road-status page was **not found** (UNVERIFIED). A third-party travel site lists helpline 1800-180-7145, also UNVERIFIED.
- The IMD API index lists **Highway Nowcast Warning** and **Highway Warning (5 days)** products ([IMD API reference](https://api.imd.gov.in/public/api_reference.html)). IMD Srinagar also publishes a "Highway weather forecast" PDF ([IMD Srinagar](https://mausam.imd.gov.in/srinagar/)). These could feed a road-risk indicator.

### 3.4 Rail: the Kashmir rail link (USBRL) and apple parcel and freight services

**The line**
- The Udhampur–Srinagar–Baramulla Rail Link is 272 km long and cost Rs 43,780 crore. It has 36 tunnels (119 km) and 943 bridges. The Chenab bridge is 1,315 m long. Inaugurated June 2025. The Katra–Srinagar Vande Bharat started in June 2025 and was extended to Jammu Tawi in April 2026, cutting Jammu–Srinagar to under five hours ([IANS, 17 Oct 2026](https://ianslive.in/jammu-and-kashmirs-challenging-terrain-yielding-to-new-era-of-connectivity--20261017121244)). The flag-off date of 6 June 2025 rests on reports of a Friday flag-off ([Vajiram, search summary](https://vajiramandravi.com/current-affairs/historic-rail-link-connects-kashmir-valley-with-katra-via-vande-bharat-trains/)).
- Freight: the first freight train (cement) reached the new **Anantnag Goods Shed on 9 Aug 2025**. Since then more than 1.5 lakh t of cement has arrived, and **at least six goods trains a day** (three each way) run as of Oct 2026. **More than 20,000 t of apples** have moved by rail since Sept 2025. By rail apples reach Delhi in **20–22 hours**, against 30–35 hours by road ([Greater Kashmir, 13 Oct 2026](https://www.greaterkashmir.com/business/usb-railway-project-has-boosted-kashmir-valleys-connectivity-economic-growth-and-trade-12670442)).

**Apple services: timeline**

| Date | Service | Detail | Source |
|---|---|---|---|
| 11 Sep 2025 | First apple parcel vans | Two parcel vans (about 23 t each), one to Jammu and one to Adarsh Nagar (Delhi) | [Tribune, 21 Sep 2025](https://www.tribuneindia.com/news/j-k/over-6400-tonnes-of-apple-transported-from-kashmir-to-delhi-through-parcel-trains) |
| From 13 Sep 2025 | Daily timetabled parcel train **Budgam → Adarsh Nagar (Delhi)** | 8 parcel vans. Departs Budgam 06:15, arrives about 05:00–05:30 the next day. Stop at Bari Brahmana. Officials put the freight at **Rs 2.41/kg** Budgam–Delhi; Kashmir Life reported about Rs 3/kg, with fruit owners doing their own loading. A trader estimated 10 t at Rs 1.25 lakh by truck against about Rs 60,000 by train. Booking online for full vans, offline for smaller lots. | [Daily Excelsior, 12 Sep 2025](https://www.dailyexcelsior.com/railways-launch-apple-freight-service-from-kashmir/); [KNS](https://knskashmir.com/daily-parcel-train-to-connect-kashmir-with-delhi-from-sept-13-198024) (search summary for Rs 2.41/kg); [Kashmir Life](https://kashmirlife.net/kashmir-fruit-growers-hail-daily-parcel-train-to-delhi-405064/) (search summary for Rs 3/kg); [Rising Kashmir](https://risingkashmir.com/northern-railways-introduces-daily-parcel-train-from-budgam-to-delhi-from-september-13) (search summary for booking); [WION](https://www.wionews.com/india-news/in-a-first-indian-railways-launches-first-parcel-train-from-kashmir-to-delhi-to-aid-apple-growers-1757590391839) |
| 15 Sep 2025 | LG flagged off an 8-van train, Srinagar/Budgam to Adarsh Nagar | Each van about 23 t (about 184 t per train) | [Tribune, 21 Sep 2025](https://www.tribuneindia.com/news/j-k/over-6400-tonnes-of-apple-transported-from-kashmir-to-delhi-through-parcel-trains) |
| Sep 2025 | Covered wagons (BCN) from **Anantnag Goods Shed**, and 21 container wagons supplied at Bari Brahmana (about 76 containers of 40 kg each per wagon) | More than 6,400 t of apples moved in about the first 10 days. A Baramulla parcel terminal was "planned soon". A 14-coach Sopore train was due to start loading about 21 Sep 2025. | [Tribune, 21 Sep](https://www.tribuneindia.com/news/j-k/over-6400-tonnes-of-apple-transported-from-kashmir-to-delhi-through-parcel-trains) and [22 Sep 2025](https://www.tribuneindia.com/news/j-k/northern-railways-introduces-container-based-wagons-to-ferry-apples-from-kashmir); [Kashmir Observer, 20 Sep 2025](https://kashmirobserver.net/2025/09/20/apple-express-6400-tonnes-reach-delhi-via-train/) |
| 2025 season total | About **14,000 MT (about 9 lakh boxes)** by rail. During the blockade, 1,25,376 boxes worth Rs 10.03 crore went from Budgam and Anantnag to Jammu and Adarsh Nagar. | Govt ([Kashmir Reader, 30 Oct 2025](https://kashmirreader.com/2025/10/30/14000-mts-of-apples-moved-from-valley-via-rail-network/)) |
| 17 Apr – 31 May 2026 (trial) | **JPP-RCS** (Joint Parcel Product – Rapid Cargo Service), Budgam → Adarsh Nagar | 8 parcel vans and 1 SLR. Budgam 06:15 → Delhi 05:00 the next day; return Delhi 05:00 → Budgam 10:45 the next day. Stops at Bari Brahmana and Ambala Cantt. Extension depended on demand. Rates were not published. | [Kashmir Life, 16 Apr 2026](https://kashmirlife.net/northern-railway-announces-budgam-delhi-parcel-train-service-432516/) |
| Aug 2026 | Northern Railway on X: "The Cargo Parcel Train from Budgam to Adarsh Nagar, Delhi is operational, and not discontinued". Farmers asked for clearer schedules, booking and capacity information. | | [Kashmir Despatch](https://kashmirdespatch.com/northern-railways-delhi-budgam-cargo-train-continues-to-boost-kashmir-trade/) |
| 29–30 Oct 2026 | Proposal: **50% concession on return freight** under JPP-RCS. Booking both directions in advance costs 1.5 times the normal JP-scale rate for the round trip; booking and payment at the originating station. Discussed with Horticulture (P&M) officers (Parimpora, Bandipora, Anantnag) and aggregators. Exact rates and start date were not given. | | [Kashmir Observer (PTI), 30 Oct 2026](https://kashmirobserver.net/2026/10/30/kashmir-fruit-traders-get-50-return-freight-discount/) |

Gap: 2026 apple tonnage by rail, current JP-scale rates per van, and refrigerated vans were not found (UNVERIFIED). In Sept 2025 the Chief Minister asked for refrigerated cargo trains ([Daily Excelsior](https://www.dailyexcelsior.com/railways-launch-apple-freight-service-from-kashmir/)).

### 3.5 Truck freight rates, Kashmir to Delhi and North India

| Period | Rate | Source |
|---|---|---|
| Normal season (pre-crisis) | Rs 70–100 per box, Sopore to Delhi | [GK, 29 Sep 2025](https://www.greaterkashmir.com/business/soaring-freight-costs-threaten-kashmirs-fruit-trade/) (Sopore Mandi Fruit Growers Association) |
| Sep 2025 crisis | Rs 180–230 per box (private trucks); Rs 240–250 (growers); Rs 270–300 (Sopore, late Sept) | [ETV Bharat, 21 Sep 2025](https://www.etvbharat.com/en/!state/exorbitant-transportation-charges-put-kashmir-apple-growers-into-more-distress-enn25092103015); [Kashmir Observer, 20 Sep 2025](https://kashmirobserver.net/2025/09/20/apple-express-6400-tonnes-reach-delhi-via-train/); [GK, 29 Sep 2025](https://www.greaterkashmir.com/business/soaring-freight-costs-threaten-kashmirs-fruit-trade/) |
| Sep 2025 caps | RTC capped at Rs 90–130 per box to Delhi, Haryana and Jalandhar. The Sopore mandi association temporarily fixed Rs 130 (Delhi) and Rs 120 (Punjab). The Transport Dept said a fair fare was Rs 100–120 per box. | [ETV Bharat](https://www.etvbharat.com/en/!state/exorbitant-transportation-charges-put-kashmir-apple-growers-into-more-distress-enn25092103015); [Kashmir Observer](https://kashmirobserver.net/2025/09/20/apple-express-6400-tonnes-reach-delhi-via-train/) |
| Per truck | 10 t to Delhi about Rs 1.25 lakh (trader, Sep 2025). In Oct 2018, 10–11 t (550–600 boxes) to Azadpur cost Rs 70,000–80,000, "60% above routine". | [Daily Excelsior, 12 Sep 2025](https://www.dailyexcelsior.com/railways-launch-apple-freight-service-from-kashmir/); [GK, 19 Oct 2018](https://www.greaterkashmir.com/business/skyrocketing-freight-rates-highway-traffic-snarls-dampener-for-kashmirs-apple-exports) |
| Nov 2026 | Freight "rose from Rs 110–115 to Rs 125–140" depending on vehicle and destination. The unit is not stated; it is probably per box (UNVERIFIED). | [Daily Excelsior, 3 Nov 2026](https://www.dailyexcelsior.com/kashmir-apples-on-demand-ahead-of-diwali) |
| Local haul to CA store | About Rs 100–110 per 20 kg box, Dachnipora to Lassipora (about 32 km) (one grower's account) | [101Reporters, 21 Oct 2026](https://101reporters.com/article/agriculture/Kashmirs_apple_growers_have_to_pay_to_replace_a_winter_that_once_came_free) |

Truck capacity in reports: 1,200–1,300 boxes per truck ([DTE](https://www.downtoearth.org.in/governance/truckloads-of-kashmir-apples-rot-after-2-week-closure-of-key-highway)) and 3,000–3,500 boxes per truck, probably large trailers ([Rising Kashmir](https://risingkashmir.com/anchor/festive-rush-bitter-returns-at-asias-second-largest-fruit-market-12777464)). Normal transit Kashmir–Delhi is 4–5 days by truck, according to a trader ([Daily Excelsior, 12 Sep 2025](https://www.dailyexcelsior.com/railways-launch-apple-freight-service-from-kashmir/)), or 2 days by a driver's account rising to 5–6 days in the crisis ([GK, 29 Sep 2025](https://www.greaterkashmir.com/business/soaring-freight-costs-threaten-kashmirs-fruit-trade/)).

### 3.6 Controlled-atmosphere (CA) and cold storage

| Metric | Value | Date | Source |
|---|---|---|---|
| CA capacity (cumulative) | 1.93 LMT (2021-22), 2.10 (2022-23), 2.70 (2023-24), 2.70 (2024-25), **2.92 LMT** (2025-26 to Nov 2025); 3.07 LMT targeted | 2021–25 | [ES 2025-26, Table 4.2(ii)](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf) |
| Requirement | **6.00 LMT**, so the gap is about 3.08 LMT | 2025-26 | ES 2025-26; [101Reporters](https://101reporters.com/article/agriculture/Kashmirs_apple_growers_have_to_pay_to_replace_a_winter_that_once_came_free) |
| Main CA clusters | Lassipora industrial estate (Pulwama) and Aglar (Shopian) | Oct 2025 | [Kashmir Life, 30 Oct 2025](https://kashmirlife.net/apple-production-crosses-21-lakh-mts-in-jammu-kashmir-government-targets-expansion-of-cold-storage-capacity-411454/) |
| Subsidy | MIDH: 50%, up to Rs 9 crore, for a 5,000 MT CA store, plus a UT capex top-up | Oct 2025 | same |
| Budget 2026-27 | Rs 600 crore subsidy proposed for **40 new CA stores**, focused outside the Pulwama–Shopian belt | 2026 | [101Reporters, 21 Oct 2026](https://101reporters.com/article/agriculture/Kashmirs_apple_growers_have_to_pay_to_replace_a_winter_that_once_came_free) |
| CA rental | **Rs 35 per 17 kg crate per month**, about Rs 180–220 per crate for 5–6 months, higher at peak | 2026 | same |
| Demand in 2026 | Units were fully booked months in advance. Operators now require proper grading before accepting fruit. | Sep 2026 | [Kashmir Observer, 23 Sep 2026](https://kashmirobserver.net/2026/09/23/kashmir-apple-growers-find-relief-as-markets-storage-demand-improve/) |
| Number of CA units and their owners | **Not found (UNVERIFIED)** | – | – |

---

## 4. Weather and alerts

### 4.1 IMD Meteorological Centre Srinagar ([mausam.imd.gov.in/srinagar](https://mausam.imd.gov.in/srinagar/))

- Products: district-wise and sub-division warnings; district-wise and station-wise nowcasts; 5-day J&K forecast; district forecast and "impact-based district-level forecast" PDFs; extended-range forecast; **Agromet bulletin (PDF)**; **highway weather forecast (PDF)**; AWS data link; radar and satellite; Mausamgram; special Amarnath and Vaishno Devi Yatra pages.
- Social channels: X **@metsrinagar**, Telegram **metsrinagar**, Facebook **jammuandkashmirweather**. All are listed on the IMD Srinagar page.
- Historical data: IMD Pune Data Supply Portal, [dsp.imdpune.gov.in](https://dsp.imdpune.gov.in/) ([IMD home](https://mausam.imd.gov.in/)).

### 4.2 Agromet advisory services

- IMD runs Agromet Advisory Services through **Gramin Krishi Mausam Sewa (GKMS)**. It has a state-level advisory page (`responsive/agromet_adv_ser_state_current.php` on mausam.imd.gov.in) and a GKMS SOP ([IMD home](https://mausam.imd.gov.in/)). District AAS bulletins for J&K districts, and whether District Agromet Units sit at Kashmir KVKs, are UNVERIFIED in this session. Check the GKMS pages and SKUAST-K.
- The IMD Srinagar page carries an "Agromet bulletin" PDF ([IMD Srinagar](https://mausam.imd.gov.in/srinagar/)).
- J&K's own **Kisan Khidmat Ghar** application, built with BISAG, does "predictive analysis of weather conditions and allied advisories" ([ES 2025-26](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf)).

### 4.3 Official apps (links from the [IMD home page](https://mausam.imd.gov.in/))

| App | Purpose | Android | iOS |
|---|---|---|---|
| **Mausam** | IMD forecasts, nowcasts and warnings | https://play.google.com/store/apps/details?id=com.imd.masuam | https://apps.apple.com/us/app/id1522893967 |
| **Meghdoot (Agro)** | District agromet advisories for farmers | https://play.google.com/store/apps/details?id=com.aas.meghdoot | https://apps.apple.com/in/app/meghdoot/id1474048155 |
| **Damini** | Lightning alerts | https://play.google.com/store/apps/details?id=com.lightening.live.damini | App Store ID 1502385645 |

IMD's dissemination note also lists RAIN ALARM and UMANG ([IMD API doc](https://mausam.imd.gov.in/Forecast/marquee_data/API_doc.pdf)).

### 4.4 Recent damaging weather events for apple

| Date | Event | Impact | Source |
|---|---|---|---|
| 3–4 Nov 2018 | Early (untimely) snowfall while trees still had leaves | Branch breakage in south Kashmir orchards; large losses reported | **UNVERIFIED in this session** (not re-checked) |
| ~7 Nov 2019 | Early heavy snowfall | Widespread orchard damage | **UNVERIFIED in this session** |
| Jun 2025 | Hailstorm in south Kashmir | Orchards damaged | [LocalSamosa, 23 Feb 2026](https://www.localsamosa.com/business/kashmir-apple-industry-is-fighting-a-tough-battle-11126449) |
| Summer 2025 | Long dry spell and abnormally high temperatures | Undersized, lighter fruit and lower returns | [GK, 27 Jul 2025](https://www.greaterkashmir.com/front-page-2/kashmirs-rs-20000-crore-fruit-economy-at-climate-collapse-risk/); [GK, 18 Dec 2025](https://www.greaterkashmir.com/front-page-2/fruit-bowl-without-safety-net) |
| 26–27 Aug and 2–3 Sep 2025 | Extreme rain, floods and landslides | 431.091 ha of orchards over 33% damaged, plus the NH-44 closure (section 3.1) | [Govt via Kashmir Vision](https://kashmirvision.in/2025/10/29/miniscule-amount-of-apple-produce-remained-stranded-on-highway-during-blockade-govt/) |
| Feb 2026 | Unusually warm February | Buds swelling too early | [Kashmir Horizon, 3 Mar 2026, search summary](https://thekashmirhorizon.com/2026/03/03/kashmirs-apple-economy-on-edge/) |
| Spring–summer 2026 | Repeated hailstorms, especially Shopian and Kulgam; dry August | Damage during fruit development; worries about size and colour | [Kashmir Observer, 5 Sep 2026](https://kashmirobserver.net/2026/09/05/after-setbacks-kashmir-apple-growers-see-fresh-hope/) |
| ~Aug 2026 | Hail, heavy rain and strong winds; south Kashmir hit hardest | Loss estimate Rs 300–400 crore | [India TV, 19 Aug 2026, search summary](https://www.indiatvnews.com/jammu-and-kashmir/kashmir-apples-lose-their-shine-as-extreme-weather-causes-rs-300-400-crore-estimated-crop-loss-growers-suffer-2026-08-19-1051872) (UNVERIFIED) |
| 2026 season | Wet weather drove a **scab** outbreak, along with Alternaria, leaf miner and aphids | 50–60% of fruit reaching hubs graded lower (dealer estimates). B/C grades sold at Rs 200–250 per box in Sopore. | [Whalesbook, 1 Nov 2026](https://www.whalesbook.com/news/English/agriculture/Kashmir-Apple-Crop-Faces-Quality-Crisis-Amid-Scab-Outbreak/6ae70a724fc30694db56306c); [Rising Kashmir, 3 Nov 2026](https://risingkashmir.com/anchor/festive-rush-bitter-returns-at-asias-second-largest-fruit-market-12777464) |
| 1980–2024 trend | Winter maximum temperatures up 0.5 °C (Kokernag) to 1 °C (Kupwara); weaker snowfall during Chillai Kalan | Loss of natural "cold storage"; more reliance on CA | [101Reporters, 21 Oct 2026](https://101reporters.com/article/agriculture/Kashmirs_apple_growers_have_to_pay_to_replace_a_winter_that_once_came_free) |

Related: Kashmir uses about 3.69 kg of pesticide per hectare against a national 0.22 kg/ha, with sprays now often more than a dozen a season. A SKUAST study found residues above FSSAI, EU and Codex limits ([ETV Bharat, 12 Nov 2026](https://etvbharat.com/en/state/apple-detoxed-as-kashmir-sees-breakthrough-in-farming-enn26111207609)). This is relevant to spray-advisory features.

### 4.5 Weather APIs an app can use

**IMD API platform.** Portal: [api.imd.gov.in](https://api.imd.gov.in). Reference: [api_reference.html](https://api.imd.gov.in/public/api_reference.html). Base URL: `https://api.imd.gov.in/api/v1/`.
- Endpoints documented:
  - `cityforecast?id=<station>` gives a 7-day city forecast.
  - `current_wx?id=<station>`.
  - `districtnowcast?id=<district id>` gives categories with a colour code (1–4: green to red).
  - `districtwarning?id=<obj id>` gives Day 1–5 warning codes and colours.
  - `districtrainfall`.
  - `state_district_rainfall_forecast` gives 5-day district rainfall.
  - `aws_data?id=<call sign>` or `sid=<state id>`.
  - `stationnowcast`.
  - `sunmoon?lat=&lon=`.
- Mapping endpoints: `cityforecast_mapping`, `aws_data_mapping`. The index also lists Highway Nowcast Warning, Highway Warning (5 days), Lightning, Radar and Agromet Advisory, but their details are not on the page.
- Access: the portal has account registration. IMD's dissemination note says organisations wanting the APIs "following IMD's terms and condition" should contact the nodal officer, Dr Sankar Nath, Sc-E, IMD New Delhi (sankar.nath@imd.gov.in) ([IMD API doc](https://mausam.imd.gov.in/Forecast/marquee_data/API_doc.pdf)). IP whitelisting, cost and rate limits are not stated on the pages read (UNVERIFIED). Srinagar's station ID is 42027 by WMO convention (UNVERIFIED; check `cityforecast_mapping`).

**Open-Meteo.**
- Free tier, non-commercial only: 600 calls/min, 5,000/hour, 10,000/day, 300,000/month, no uptime guarantee.
- Commercial plans: Standard (1M calls/month), Professional (5M) and Enterprise (50M+), using `customer-api.open-meteo.com` with an `apikey` parameter. Prices are not published on the page.
- Data under CC BY 4.0, with attribution required ([pricing](https://open-meteo.com/en/pricing); [terms](https://open-meteo.com/en/terms)).
- "Commercial" includes apps with ads or subscriptions.

Recommended pattern: use IMD district warnings and nowcasts for official alerts (hail, heavy rain, snow), and Open-Meteo or another model API for hourly forecasts at orchard level. Label each layer with its source.

---

## 5. Government schemes and support

### 5.1 Holistic Agriculture Development Programme (HADP), J&K

- **29 projects, Rs 5,013 crore, over five years.** Expected results: about Rs 28,000 crore added to GSDP, about 2.88 lakh jobs, about 19,000 enterprises, about 13 lakh families helped and about 2.5 lakh youth skilled. **Rs 1,028.21 crore** is set aside for horticulture projects ([ES 2025-26](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf)). HADP launched in April 2023 ([Kashmir Ahead, 17 Apr 2025](https://kashmirahead.com/jk-cm-omar-abdullah-reviews-hadp-launches-digital-tools-for-jks-agri-revolution/)).
- **Kisan Saathi portal** is the HADP single window. As of 26 Oct 2026: 6,97,728 applications, 4,79,895 approved, **1,15,295 pending**, 4,33,215 farmers registered. Horticulture: 66,818 received, 41,778 approved, 12,503 pending ([Rising Kashmir, 27 Oct 2026](https://risingkashmir.com/top-stories/over-115-lakh-hadp-applications-pending-in-jk-12755359)). The HADP website is **hadp.jk.gov.in**; hadp.in redirects there (checked 12 Nov 2026). The exact Kisan Saathi URL is UNVERIFIED.
- Other digital tools launched on 16 Apr 2025: AI-powered Credit Scheme Advisor app, online DPR generator, KS Output Tracking app, JKCIP dashboard. Also the **Daksh Kisan** learning platform (121 free courses; 10,765 certificates) ([Kashmir Ahead](https://kashmirahead.com/jk-cm-omar-abdullah-reviews-hadp-launches-digital-tools-for-jks-agri-revolution/)). The domain dakshkisan.jk.gov.in comes from a search summary and is UNVERIFIED.
- HADP claims **300 FPOs** have been set up (April 2025, same source).
- **JKCIP** (J&K Competitiveness Improvement Project): Rs 1,800 crore over 7 years in 90 blocks, aiming to reach about 3 lakh families, with its own portal ([ES 2025-26](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf)).

### 5.2 High-density plantation subsidy

| Scheme | Assistance | Source |
|---|---|---|
| **Modified High Density Plantation Scheme** (J&K) | **50% subsidy** on a crop-wise per-hectare budget. Bank finance of up to 80% of project cost can be arranged. | Rajya Sabha reply via [Kashmir Life, 24 Jul 2026](https://kashmirlife.net/300-hectares-of-traditional-apple-walnut-orchards-converted-to-high-density-plantations-in-jammu-kashmir-444741/) |
| Same scheme, grower-level split | 50% subsidy, up to 40% optional bank loan (interest deferred 3 years, repayment from year 4), 10% from the farmer. Runs March 2021 to March 2026, target 5,500 ha. Extra support for micro-irrigation, virus-free planting material and anti-hail nets. | [Kashmir Life, 1 Aug 2025](https://kashmirlife.net/kashmir-high-density-apple-farming-shift-399578/) |
| MIDH and NHB (central) | 40% of the eligible cost in general areas, **50% in Himalayan states/UTs including J&K** | [Kashmir Life, 24 Jul 2026](https://kashmirlife.net/300-hectares-of-traditional-apple-walnut-orchards-converted-to-high-density-plantations-in-jammu-kashmir-444741/) |
| Rupee rate per hectare | Rs 1.75 lakh/ha subsidy on a 50:50 pattern, as of 2021. **The current per-hectare budget was not found (UNVERIFIED).** | [101Reporters, 17 Aug 2021](https://101reporters.com/article/agriculture/Kashmirs_apple_farmers_find_fresh_hope_in_highdensity_variety) |
| Cost benchmarks | A 2026 study of 200 growers put HD cost at Rs 3,51,759 per kanal over the first five years, more than half of it in year 1. One grower spent about Rs 18 lakh on 12 kanals. (1 ha is about 20 kanals.) | [Kashmir Vision, 22 Oct 2026](https://kashmirvision.in/2026/10/22/rising-costs-uneven-prices-squeeze-kashmirs-apple-growers/); [Kashmir Life, 1 Aug 2025](https://kashmirlife.net/kashmir-high-density-apple-farming-shift-399578/) |

Whether the Modified HDP scheme was extended after March 2026 is UNVERIFIED.

### 5.3 Crop insurance for apple (PMFBY/RWBCIS): status as of Nov 2026

**Bottom line: apple growers in J&K still have no crop insurance.** PMFBY and RWBCIS were formally adopted in J&K in 2016 but have never been implemented for horticulture ([GK, 18 Dec 2025](https://www.greaterkashmir.com/front-page-2/fruit-bowl-without-safety-net)).

| Date | Development | Source |
|---|---|---|
| Nov 2024 | RWBCIS bids invited for Kashmir (apple, saffron) and Jammu. The lowest Kashmir bid (Iffco-Tokio) quoted 15.15–29.95% premium. | [GK, 27 Jul 2025](https://www.greaterkashmir.com/front-page-2/kashmirs-rs-20000-crore-fruit-economy-at-climate-collapse-risk/) |
| May 2025 | State Level Coordination Committee (Chief Secretary) cancelled the tender over cost and decided to re-tender | same |
| Oct 2025 | Govt: RWBCIS to be implemented for apple, saffron, mango and litchi; tendering in process | [Govt via Kashmir Vision](https://kashmirvision.in/2025/10/29/miniscule-amount-of-apple-produce-remained-stranded-on-highway-during-blockade-govt/) |
| 16 Sep 2025 | Centre set up a sub-committee to standardise RWBCIS term sheets for apple, banana, grape, mango and pomegranate | [Kashmir Life, 22 Sep 2026](https://kashmirlife.net/kashmir-apple-growers-still-await-crop-insurance-as-government-plans-fresh-tender-452888/) |
| 4 Feb 2026 | Centre asked the UT to prepare a fresh tender for all 20 districts under revised PMFBY/RWBCIS guidelines, from **Kharif 2026** | same |
| 16 Mar 2026 | J&K Finance Department directed a fresh tender. The next tender block is Kharif 2026 to Rabi 2028-29. | same |
| 24 Apr 2026 | Govt said insurance would start in 2026. Perils: excess heat, hailstorm, heavy rain, snowfall. Lowest bidders were AIC (Kashmir) and Tata AIG (Jammu). | [ETV Bharat](https://www.etvbharat.com/en/bharat/after-years-of-delay-kashmir-apples-to-have-insurance-cover-soon-enn26042403871) |
| Sep 2026 (Assembly) | **Not implemented.** AIC quoted 10–39% (traditional apple 34% in Budgam, Bandipora, Baramulla and Kupwara). 2025-26 bid block: sum insured Rs 6,594.93 crore, total premium Rs 1,280.87 crore, farmers' share Rs 329.75 crore. Both apple term sheets are final, but fresh tenders wait for the Centre's revised guidelines. No timeline given. | [Kashmir Life, 22 Sep 2026](https://kashmirlife.net/kashmir-apple-growers-still-await-crop-insurance-as-government-plans-fresh-tender-452888/) |
| 23–24 Sep 2026 | Minister Javid Dar: "fully committed" to WBCIS, but the scheme is **on hold** awaiting the Government of India's revised norms. It will roll out "immediately" once they are issued. | [Kashmir Observer, 24 Sep 2026](https://kashmirobserver.net/2026/09/24/govt-committed-to-weather-based-crop-insurance-for-apple-crop-javid-dar/) |

PMFBY for other crops covers all 20 districts. In 2024-25 it insured 2.08 lakh farmers on 80,884 ha, with claims of Rs 26.92 crore paid to more than 94,000 farmers. In Kharif 2025 it covered 2.015 lakh farmers on 75,735 ha ([ES 2025-26](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf)). The Sept 2026 Assembly reply says PMFBY covers hailstorm damage to paddy and maize (Kharif) and wheat and oilseeds (Rabi), and that all 13.985 lakh farmer families are eligible ([Rising Kashmir, 25 Sep 2026](https://risingkashmir.com/jammu-and-kashmir-news/kashmir/jk-horticulture-supports-7-5-lakh-families-govt-12572855)).

### 5.4 Credit, helplines, extension and other support

- **Kisan Credit Card.** 11.39 lakh KCCs issued (8.78 lakh crop, 2.61 lakh animal husbandry), with loans of Rs 10,290 crore up to Dec 2025. Cumulative KCCs at the end of 2024-25 by district: Baramulla 1,17,628; Kupwara 1,02,484; Anantnag 95,040; Budgam 77,372; Pulwama 66,198; Kulgam 57,802; Bandipora 51,104; Shopian 46,367; Ganderbal 28,301; Srinagar 12,279 ([ES 2025-26](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf)). Growers have asked for KCC loan waivers ([Chenab Times, Apr 2026](https://thechenabtimes.com/2026/04/14/jammu-and-kashmir-apple-growers-demand-crop-insurance-ahead-of-peak-season/)).
- **Kisan Call Centre**: toll-free **1800-180-1551**, the standard national number of the Ministry of Agriculture (not re-checked this session, so UNVERIFIED).
- **KVKs.** SKUAST-Kashmir runs Krishi Vigyan Kendras in the Kashmir districts (background knowledge; the list and contacts are UNVERIFIED). SKUAST-K drives orchard research and advisories; its HADP work claims an 80% cut in pesticide use in trials ([ETV Bharat, 12 Nov 2026](https://etvbharat.com/en/state/apple-detoxed-as-kashmir-sees-breakthrough-in-farming-enn26111207609)).
- **Soil Health Cards** issued in 2024-25: 80,256 across J&K. Kashmir districts: Baramulla 9,924; Anantnag 6,782; Kupwara 6,518; Budgam 6,007; Pulwama 5,900; Kulgam 5,814; Bandipora 5,378; Shopian 5,233; Ganderbal 3,248; Srinagar 2,586 ([ES 2025-26, Table 4.1.9](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf)).
- **FPOs and cooperatives.** HADP claims 300 FPOs (April 2025). ES 2025-26 reports 61 PACS developed as FPOs under NCDC, and 45 PACS plus 61 FPOs (7,397 farmers) registered on the NCCF portal. J&K ranks first nationally in computerising all 537 PACS. The number of apple-specific FPOs is UNVERIFIED.
- **e-NAM**: see section 2.1.
- **Other.** PM-KISAN paid Rs 3,907.49 crore to 9.19 lakh farmers in 2024-25. The Agriculture Infrastructure Fund has sanctioned 325 projects worth Rs 625 crore to Dec 2025 ([ES 2025-26](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf)). The DHPM website lists a "Packaging and Grading Scheme" and PMFME ([dhpm.jk.gov.in](https://dhpm.jk.gov.in/)).

---

## 6. Labour (harvest, pruning, spraying)

What is sourced:
- **About 400 person-days of work per hectare of orchard per year** (Govt Assembly reply, Sept 2026) ([Rising Kashmir, 25 Sep 2026](https://risingkashmir.com/jammu-and-kashmir-news/kashmir/jk-horticulture-supports-7-5-lakh-families-govt-12572855)). At 1.73 lakh ha that implies roughly 6.9 crore person-days a year for apple alone (my arithmetic, indicative only).
- Seasonal tasks named: pruning, spraying, harvesting, grading, packing, then transport, mandi and storage work ([Gadyal Kashmir, 16 Sep 2026](https://gadyalkashmir.com/2026/09/16/kashmirs-apple-industry-the-lifeline-of-the-valleys-rural-economy/)).
- Growers report **rising labour costs**, along with packaging and transport ([Kashmir Observer, 5 Sep 2026](https://kashmirobserver.net/2026/09/05/after-setbacks-kashmir-apple-growers-see-fresh-hope/); [Whalesbook, 1 Nov 2026](https://www.whalesbook.com/news/English/agriculture/Kashmir-Apple-Crop-Faces-Quality-Crisis-Amid-Scab-Outbreak/6ae70a724fc30694db56306c)). Spray rounds have risen from about 4 to more than 12 a season, which means more labour ([ETV Bharat, 12 Nov 2026](https://etvbharat.com/en/state/apple-detoxed-as-kashmir-sees-breakthrough-in-farming-enn26111207609)).
- Cost of living for farm labour is high. In Dec 2025 J&K's CPI for agricultural labourers (General, base 2019) was 146.48, the highest of nine comparison states. The food index was 144.14, second after Haryana. The all-India figures were 137.12 and 137.79 ([ES 2025-26](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf)).
- HD orchards cut the need for some labour-heavy work (mechanised spraying, trellis systems) and are part of the government's mechanisation push ([ES 2025-26 "Way Ahead"](https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf)).

**Not verified in this session** (search budget exhausted):
- Typical **daily wages** in 2025–26 for local and migrant harvest, pruning or spraying labour.
- The size and origin states of the migrant workforce.
- 2025–26 news on labour shortages.
- Security incidents that hit non-local labour and truckers. Background knowledge says such incidents occurred in October 2019 and October 2024; this is UNVERIFIED.

The official source for wages is the Labour Bureau's monthly "Wage Rates in Rural India" (WRRI), which has state-level occupation rates including horticulture workers. Its coverage of J&K is UNVERIFIED. For the app, collect wage data through the labour-booking flow itself, by district and task.

---

## 7. Recent news (2025–2026) affecting growers

### 7.1 Timeline

| Date | Development | Source |
|---|---|---|
| Mar 2025 | Govt put 2024-25 output at 20.56 LMT, later revised to 21.10 LMT. CA capacity 2.70 LMT. | [Kashmir Life, 6 Mar 2025](https://kashmirlife.net/jammu-kashmirs-apple-production-steady-at-two-million-tonnes-annually-horticulture-sector-expands-384804/) |
| May 2025 | Crop insurance tender scrapped (premiums too high) | [GK, 27 Jul 2025](https://www.greaterkashmir.com/front-page-2/kashmirs-rs-20000-crore-fruit-economy-at-climate-collapse-risk/) |
| Jun 2025 | USBRL opened; hailstorm in south Kashmir | [IANS](https://ianslive.in/jammu-and-kashmirs-challenging-terrain-yielding-to-new-era-of-connectivity--20261017121244); [LocalSamosa](https://www.localsamosa.com/business/kashmir-apple-industry-is-fighting-a-tough-battle-11126449) |
| Jul 2025 | Tribune reported the Centre raised the apple minimum import price from Rs 50 to Rs 80/kg, citing a BJP spokesperson. **Conflicts with USDA (Nov 2026)**, which still describes the Rs 50/kg CIF floor. UNVERIFIED. | [Tribune, 4 Jul 2025](https://www.tribuneindia.com/news/himachal/centre-raises-minimum-import-price-of-apples-from-rs-50-to-rs-80-kg) |
| 9 Aug 2025 | First freight train (cement) reached Anantnag | [GK, 13 Oct 2026](https://www.greaterkashmir.com/business/usb-railway-project-has-boosted-kashmir-valleys-connectivity-economic-growth-and-trade-12670442) |
| 26 Aug – 17 Sep 2025 | NH-44 closure in peak season: rotting fruit, protests, freight rates tripled. Traders estimated losses of Rs 500–700 crore. | Section 3.1 |
| 11–15 Sep 2025 | First apple parcel trains Budgam/Anantnag → Delhi; Rs 2.41/kg | Section 3.4 |
| Oct 2025 | Govt said about 1% of the crop was stranded and 14,000 MT moved by rail. 2025 crop estimated at 22.15 LMT. | [Kashmir Vision](https://kashmirvision.in/2025/10/29/miniscule-amount-of-apple-produce-remained-stranded-on-highway-during-blockade-govt/); [Kashmir Reader](https://kashmirreader.com/2025/10/30/14000-mts-of-apples-moved-from-valley-via-rail-network/) |
| Jan 2026 | **India–EU FTA** concluded. EU apples: 50,000 t/yr at 20% duty with an MIP of Rs 80/kg, rising to 1 lakh t over 10 years. | [Business Standard, 28 Jan 2026, search summary](https://www.business-standard.com/economy/news/india-to-import-50k-tonnes-of-eu-apples-at-20-duty-under-fta-govt-126012801343_1.html); [Kashmir Observer/PTI, 7 Feb 2026](https://kashmirobserver.net/2026/02/07/india-allows-us-apples-at-%E2%82%B980-kg-minimum-import-price/) |
| 7 Feb 2026 | **India–US interim framework**: US apples at 25% duty (down from 50%), quota-based, MIP Rs 80/kg (so nothing below about Rs 100/kg landed). Quota size not disclosed. To be signed by mid-March. Strong protest from growers in Kashmir and Himachal. | [Kashmir Observer/PTI](https://kashmirobserver.net/2026/02/07/india-allows-us-apples-at-%E2%82%B980-kg-minimum-import-price/); [Kashmir Reader, 8 Feb 2026, search summary](https://kashmirreader.com/2026/02/08/why-the-us-india-trade-deal-spells-trouble-for-apples-carpets/) |
| Mar–Apr 2026 | NH-44 landslide closures at Ramban. JPP-RCS cargo-train trial (17 Apr – 31 May). Vande Bharat extended to Jammu. | Sections 3.1 and 3.4 |
| late Apr 2026 | **India–New Zealand FTA** signed (reported 27–29 Apr 2026). Growers and Congress raised alarm. | [Business Standard, search summary](https://www.business-standard.com/india-news/india-new-zealand-fta-raises-alarm-among-apple-growers-cong-flags-concern-126042900060_1.html) |
| Jul 2026 | Three-day NH-44 closure near Dewal; about 1,700 trucks stranded | [Curly Tales](https://curlytales.com/india/trending/jammu-srinagar-highway-hit-by-landslide-trucks-stranded-amarnath-convoy-moves-ahead/) |
| Aug 2026 | Hail and storm losses estimated at Rs 300–400 crore (UNVERIFIED) | [India TV, search summary](https://www.indiatvnews.com/jammu-and-kashmir/kashmir-apples-lose-their-shine-as-extreme-weather-causes-rs-300-400-crore-estimated-crop-loss-growers-suffer-2026-08-19-1051872) |
| Sep 2026 | Assembly session: insurance still not implemented; 7.5 lakh families; 1,103.79 ha HD in Kashmir. Early prices were encouraging (Kullu Rs 1,200–1,400 per box); CA stores fully booked. | Sections 1.4, 1.5, 2.6 and 5.3 |
| Late Sep – Oct 2026 | Prices fell (cartons Rs 700–1,000). AIKS demanded MIS and called the 19 Oct "All India Apple Growers' Protest Day". | [FreshPlaza, 1 Oct 2026](https://www.freshplaza.com/north-america/article/9878788/indian-apple-growers-seek-market-intervention-ahead-of-new-zealand-fta/) |
| 17–20 Oct 2026 | **India–NZ FTA in force from 20 Oct 2026** (DGFT Public Notice 33/2026-27, 17 Oct). Apple TRQ at 25% in-quota duty, minimum CIF US$1.25/kg, import window 1 Apr – 31 Aug. Quota: nil in Year 1 (to 31 Dec 2026), 35,000 t in Year 2 (2027), 45,000 t by Year 6. Other reports say 32,500 rising to 45,000 t. | [Swarajya](https://swarajyamag.com/news-brief/new-zealand-exporters-gain-quota-based-access-to-india-for-apples-and-kiwifruit-as-free-trade-agreement-enters-into-force); [FreshPlaza](https://www.freshplaza.com/north-america/article/9878788/indian-apple-growers-seek-market-intervention-ahead-of-new-zealand-fta/); [Fruitnet, search summary](https://www.fruitnet.com/asiafruit/india-confirms-import-quotas-for-nz-apples-and-kiwifruit/273039.article) |
| 29–30 Oct 2026 | Railways proposed a 50% return-freight concession for Kashmir fruit under JPP-RCS | [Kashmir Observer](https://kashmirobserver.net/2026/10/30/kashmir-fruit-traders-get-50-return-freight-discount/) |
| 1–3 Nov 2026 | Scab-hit crop: 50–60% lower grades. Sopore premium Rs 1,000–1,300 per box against Rs 200–250 for B/C. Chhath and Diwali demand. | Section 2.6 |
| 3 Nov 2026 | USDA: India MY 2026/27 output forecast 2.59 MMT; imports forecast up 19% to 511,000 t | [USDA FAS IN2026-0056](https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Fresh+Deciduous+Fruit+Annual_New+Delhi_India_IN2026-0056.pdf) |
| 12 Nov 2026 | Pesticide-residue concerns; SKUAST pesticide-free Gala trial in Pulwama (about 450 q, about Rs 1 crore revenue) | [ETV Bharat](https://etvbharat.com/en/state/apple-detoxed-as-kashmir-sees-breakthrough-in-farming-enn26111207609) |

### 7.2 Import competition and trade policy (current state)

- **Duty and floor price as of 3 Nov 2026.** Apples (HS 0808.10) pay **50% basic customs duty** with no quantitative restriction, except under the India–NZ FTA. Under DGFT Notification 5/2023 (8 May 2023), imports with a CIF value at or below **Rs 50/kg** are prohibited; Bhutan is exempt. The 20% retaliatory duty on US apples was removed in Sept 2023 ([USDA FAS, Nov 2026](https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Fresh+Deciduous+Fruit+Annual_New+Delhi_India_IN2026-0056.pdf)). USDA does not mention any US or EU quota in force, which suggests those concessions were not yet operating on 3 Nov 2026 (my inference, UNVERIFIED).
- **Imports by origin** in tonnes, MY 2023/24 → 2024/25 → 2025/26 ([USDA FAS, Nov 2026](https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Fresh+Deciduous+Fruit+Annual_New+Delhi_India_IN2026-0056.pdf)):

| Origin | 2023/24 | 2024/25 | 2025/26 | Share 2025/26 |
|---|---|---|---|---|
| World | 544,024 | 510,930 | 428,750 | – |
| Iran | 138,774 | 138,994 | 69,988 | 16% |
| South Africa | 39,249 | 35,252 | 54,319 | 13% |
| New Zealand | 31,629 | 36,173 | 53,622 | 13% |
| Chile | 24,773 | 34,618 | 46,991 | 11% |
| United States | 37,246 | 34,064 | 30,142 | 7% |
| Afghanistan | 37,937 | 49,886 | 28,013 | 7% |
| Turkey | 123,213 | 94,956 | 14,370 | 3% |

- Producer groups allege Iranian apples are relabelled as Afghan to use the Afghanistan duty route. Growers have repeatedly asked for a ban (USDA, same report). Kashmir traders have resolved to stop accepting Turkish apples, and the Shopian association wants Iranian imports banned ([LocalSamosa, 23 Feb 2026](https://www.localsamosa.com/business/kashmir-apple-industry-is-fighting-a-tough-battle-11126449)).
- The J&K government told the legislature that NZ apple imports were under 2% of J&K output: 0.97% in 2023-24 and 1.46% in 2024-25 ([Roshan Kashmir, 30 Mar 2026, search summary](https://roshankashmir.net/2026/03/30/import-of-new-zealand-apple-having-minimal-impact-on-j-govt-assures-support-to-growers/)).

---

## 8. What I could not verify, and open questions

1. **Labour wages and shortages, 2025–26**: no sourced numbers (section 6).
2. **Number, ownership and locations of CA units** beyond the Lassipora and Aglar clusters; current CA occupancy.
3. **Untimely snow events of Nov 2018 and Nov 2019**: dates and losses not re-checked.
4. **data.gov.in API behaviour**: exact filter keys, sample-key limits and how current the feed is. I did not call the API (no key; using the key found in search results was blocked). Whether **Parimpora, Kulgam, Pulwama (Prichoo/Pachhar) and Jablipora** report apples regularly.
5. **Agmarknet 2.0 / UPAg / e-NAM APIs**: no public API documentation found.
6. **Current rail tariff** (JP scale per parcel van) and 2026 rail tonnage. The Rs 2.41/kg figure is from Sept 2025, and another report gives about Rs 3/kg.
7. **Current Modified HDP per-hectare budget**, and whether the scheme (March 2021 – March 2026) was extended.
8. **Final 2025-26 apple production** and an official 2026 crop estimate.
9. **India–US and India–EU apple concessions**: signing and entry-into-force dates; the size of the US quota.
10. **The reported July 2025 MIP hike to Rs 80/kg** conflicts with USDA's November 2026 description of the Rs 50/kg floor.
11. **TCU phone numbers**: some digits differ between outlets. No official Traffic Police website road-status page was found.
12. **NAFED MIS**: quantities actually procured in 2019–21, and any dues still unpaid.
13. **KVK list, Kisan Call Centre number and Meghdoot district coverage for Kashmir**: from background knowledge or IMD links; not re-checked.

---

## 9. Key primary and official sources

- J&K Economic Survey 2025-26 (Planning, Development & Monitoring Dept, Feb 2026): https://cms.neva.gov.in/NeVA/JK/FileStructures//Notices/e31e606a-b6e0-4592-8852-14d46f50833f.pdf
- USDA FAS, Fresh Deciduous Fruit Annual, India, IN2026-0056 (3 Nov 2026): https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Fresh+Deciduous+Fruit+Annual_New+Delhi_India_IN2026-0056.pdf
- SKUAST-K preprint "Corridor Disruption and Supply Chain Vulnerability: A NASCDI-NARDL Analysis of Kashmir's Apple Sector" (Research Square, posted 29 Oct 2026; not peer-reviewed): https://doi.org/10.21203/rs.3.rs-11006590/v1
- data.gov.in mandi price dataset: https://www.data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi
- IMD API reference: https://api.imd.gov.in/public/api_reference.html. IMD Srinagar: https://mausam.imd.gov.in/srinagar/
- J&K Traffic Police on X: https://x.com/Traffic_hqrs
- J&K Horticulture Planning & Marketing: https://dhpm.jk.gov.in/
- NHB price and arrival reports: https://nhb.gov.in/
- Open-Meteo terms and pricing: https://open-meteo.com/en/terms and https://open-meteo.com/en/pricing
