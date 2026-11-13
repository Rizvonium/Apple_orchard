# Apple Orchard · Baghbaan

Concept and demo for **Baghbaan**, an all-in-one app for Kashmir's apple growers: a Yes / No "Orchard Doctor" diagnosis on the main page, a licensed-dealer shop (sprays, fertilizers, organic inputs, tools), short lessons with Kashmiri audio, mandi rates with highway, rail, weather and news, and booking of trucks, labour teams and experts.

## What's here

| Path | What it is |
|---|---|
| `docs/Baghbaan-Demo-App.pdf` | 24-page walkthrough of the demo app, screen by screen |
| `docs/Baghbaan-Research-and-Integration-Plan.pdf` | What the app should contain, and the tools, data sources, APIs, technologies, datasets, competitors, regulations, architecture and roadmap (with sourced research appendices) |
| `docs/research/` | The sourced desk-research notes (Markdown) used in the report |
| `prototype/index.html` | Clickable demo: open in any browser |
| `prototype/src/` | Prototype source (screens, Orchard Doctor engine, illustrations, sample data) |
| `docs/pdf-src/` | Sources and scripts that generate both PDFs |

All names, prices, rates, headlines and reviews in the demo are **sample data**. Spray doses and product choices are placeholders until checked against the current SKUAST-K schedule.

## Rebuild

```bash
python3 prototype/build.py                 # prototype/index.html + dist/artifact.html
python3 docs/pdf-src/build_report.py       # report.html from report.md + research notes (needs `pip install markdown`)
node docs/pdf-src/render.js all            # both PDFs (needs Playwright + Chromium)
```

## Deploy the demo on Vercel

The repo is static; no build step is needed. `vercel.json` serves the clickable demo at `/`, and the PDFs at `/demo.pdf` and `/plan.pdf`.

1. In Vercel, choose **Add New → Project** and import this GitHub repository.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. Deploy. For a branch other than the default, either merge it to `main` first or use the branch's preview URL.

After editing anything in `prototype/src/`, run `python3 prototype/build.py` and commit the rebuilt `prototype/index.html`.
