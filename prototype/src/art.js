/* Baghbaan prototype — icons and hand-built illustrations (no external images). */
(function (G) {
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
    bag: '<path d="M5 8h14l-1.2 12.1a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    book: '<path d="M2.5 5.5c3-1.2 6.2-1.2 9.5.8 3.3-2 6.5-2 9.5-.8v13.5c-3-1.2-6.2-1.2-9.5.8-3.3-2-6.5-2-9.5-.8V5.5Z"/><path d="M12 6.3v13.5"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M21.5 20a6.5 6.5 0 0 0-4-6"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/>',
    apple: '<path d="M12 7.2c-1.5-1.1-3.6-1.5-5.3-.6-2.5 1.3-3.2 4.4-2.3 7.4 1 3.3 3.4 6.6 5.7 6.6.8 0 1.2-.4 1.9-.4s1.1.4 1.9.4c2.3 0 4.7-3.3 5.7-6.6.9-3-.2-6.1-2.3-7.4-1.7-.9-3.8-.5-5.3.6Z"/><path d="M12 7.2c0-2 .9-3.6 2.9-4.2"/>',
    bug: '<path d="m8 2 1.9 1.9M14.1 3.9 16 2"/><path d="M9 7.1v-1a3 3 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9M6.5 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M21 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M17.2 17c2.1.1 3.8 1.9 3.8 4"/>',
    spray: '<path d="M3 3h.01M7 5h.01M11 7h.01M3 7h.01M7 9h.01M3 11h.01"/><rect x="15" y="5" width="4" height="4"/><path d="m19 9 2 2v10a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V11l2-2"/><path d="m13 14 8-2M13 19l8-2"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.7a1 1 0 0 0-.2-.6l-3.5-4.3a1 1 0 0 0-.8-.4H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    tractor: '<circle cx="7" cy="16.5" r="3.5"/><circle cx="18" cy="17.5" r="2.5"/><path d="M3.6 13.5V8h6.1l2 5.5h6.3a2 2 0 0 1 2 2v.6"/><path d="M9.7 8V4.5H7M10.5 17h5"/>',
    cap: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/><path d="M22 10v6"/>',
    beaker: '<path d="M9 3h6M10 3v6L4.6 19.1A1.4 1.4 0 0 0 5.8 21h12.4a1.4 1.4 0 0 0 1.2-1.9L14 9V3"/><path d="M7.2 15h9.6"/>',
    snow: '<path d="M12 2v20M4.9 6.5l14.2 11M4.9 17.5l14.2-11"/><path d="m9 3.5 3 2 3-2M9 20.5l3-2 3 2M3.4 10.2l3.4-.7-1-3.3M20.6 13.8l-3.4.7 1 3.3M3.4 13.8l3.4.7-1 3.3M20.6 10.2l-3.4-.7 1-3.3"/>',
    sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8Z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2Z"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    bee: '<ellipse cx="12" cy="14.5" rx="4" ry="5.5"/><path d="M8.3 12.5h7.4M8.1 15.5h7.8M9 18.5h6"/><path d="M10.2 9.3C8.5 5.8 4.6 5.6 4.5 8.2c-.1 2.4 3 3.4 5.6 2.4M13.8 9.3c1.7-3.5 5.6-3.7 5.7-1.1.1 2.4-3 3.4-5.6 2.4"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/>',
    camera: '<path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="4"/>',
    speaker: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    chevR: '<path d="m9 6 6 6-6 6"/>', chevL: '<path d="m15 6-6 6 6 6"/>', chevD: '<path d="m6 9 6 6 6-6"/>',
    back: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4M12 17h.01"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    star: '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9L12 2.5Z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    drop: '<path d="M12 2.7 6.3 9.4a7 7 0 1 0 11.4 0L12 2.7Z"/>',
    thermo: '<path d="M14 4v10.5a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',
    wind: '<path d="M17.7 7.7A2.5 2.5 0 1 1 19.5 12H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9Z"/>',
    rain: '<path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2"/><path d="M16 14v6M8 14v6M12 16v6"/>',
    cloudsun: '<path d="M12 2v2M4.9 4.9l1.4 1.4M20 12h2M19.1 4.9l-1.4 1.4"/><path d="M15.9 13A4 4 0 0 0 12.1 7.1"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>',
    hail: '<path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2"/><circle cx="8" cy="17" r="1.3"/><circle cx="12" cy="20" r="1.3"/><circle cx="16" cy="17" r="1.3"/>',
    storm: '<path d="M6 16.3A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 .5 9"/><path d="m13 12-3 5h4l-3 5"/>',
    road: '<path d="M4 21 8 3M20 21 16 3M12 5v2M12 11v2M12 17v2"/>',
    train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l-2-4M15 21l2-4"/><path d="M9 14h.01M15 14h.01"/>',
    news: '<path d="M4 22h14a2 2 0 0 0 2-2V4a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    sms: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/><path d="M8 9h8M8 13h5"/>',
    wifioff: '<path d="M2 2l20 20M8.5 16.5a5 5 0 0 1 7 0M2 8.8a15 15 0 0 1 4.2-2.6M10.7 5.1A15 15 0 0 1 22 8.8M5 12.9a10 10 0 0 1 5.2-2.7M16.8 11.2a10 10 0 0 1 2.2 1.7M12 20h.01"/>',
    cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2 2h3l2.7 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', minus: '<path d="M5 12h14"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="4" height="4"/><rect x="13" y="7" width="4" height="4"/><rect x="7" y="13" width="4" height="4"/><path d="M13 13h4v4h-4z"/>',
    play: '<path d="M7 4v16l13-8L7 4Z"/>',
    headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    tree: '<path d="M8 19a4 4 0 0 1-2.2-7.3A3.5 3.5 0 0 1 9 6v0a3 3 0 1 1 6 0v0a3.5 3.5 0 0 1 3.2 5.7A4 4 0 0 1 16 19Z"/><path d="M12 19v3M12 14v5"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    flower: '<circle cx="12" cy="12" r="2.5"/><path d="M12 9.5C10 6 10 3 12 3s2 3 0 6.5ZM14.5 12c3.5-2 6.5-2 6.5 0s-3 2-6.5 0ZM12 14.5c2 3.5 2 6.5 0 6.5s-2-3 0-6.5ZM9.5 12C6 14 3 14 3 12s3-2 6.5 0Z"/>',
    roots: '<path d="M12 2v9M12 11c-2 2-5 2.5-7 6M12 11c2 2 5 2.5 7 6M12 11v11M8.5 14.5 7 21M15.5 14.5 17 21"/>',
    branch: '<path d="M3 19 21 7"/><path d="M9 15 7 9M14 11.7l2.5-6M17 9.7l4 1"/>',
    tag: '<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4Z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M14.8 9.4H10.6a1.8 1.8 0 0 0 0 3.6h2.8a1.8 1.8 0 0 1 0 3.6H9.2"/>',
    sparkle: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z"/>',
    ladder: '<path d="M8 2v20M16 2v20M8 6h8M8 10h8M8 14h8M8 18h8"/>',
    sack: '<path d="M7 4h10l1 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8l1-4Z"/><path d="M6 8h12M9.5 12.5h5M9.5 15.5h3.5"/>',
    trendUp: '<path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
    trendDown: '<path d="m3 7 6 6 4-4 8 8"/><path d="M14 17h7v-7"/>',
    wallet: '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-4"/><path d="M3 5a2 2 0 0 0 2 2h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3Z"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    gauge: '<path d="M12 14l4-4"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7l10-5Z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    handcoins: '<path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8L14.4 14.5"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/>',
    signal: '<path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"/>',
    battery: '<rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 11v2M5 10h9v4H5z"/>',
    more: '<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    msgq: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/><path d="M9.5 8.5a2.5 2.5 0 0 1 4.9.6c0 1.6-2.4 2-2.4 2M12 14h.01"/>',
    rupee: '<path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a5 5 0 0 0 0-10"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/>'
  };
  function ic(name, cls) {
    const filled = name === 'star' || name === 'play';
    return '<svg class="ic' + (filled ? ' fill' : '') + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || P.info) + '</svg>';
  }

  /* ---------- deterministic random ---------- */
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  let uid = 0;
  const id = (p) => p + (++uid);

  /* ---------- brand ---------- */
  const CHINAR = 'M12 21.5 11.2 17.2 5.2 18.6 7.4 15.2 2.4 13.6 6.2 11.6 4 6.2 9.1 8.6 12 2 14.9 8.6 20 6.2 17.8 11.6 21.6 13.6 16.6 15.2 18.8 18.6 12.8 17.2Z';
  function logo(size) {
    size = size || 40;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 48 48" aria-hidden="true">' +
      '<path d="M24 15.5c-3-2.3-7.4-3-10.8-1.2-5 2.6-6.4 8.9-4.6 14.9 2 6.7 6.8 13.3 11.4 13.3 1.7 0 2.4-.8 4-.8s2.3.8 4 .8c4.6 0 9.4-6.6 11.4-13.3 1.8-6-.4-12.3-4.6-14.9-3.4-1.8-7.8-1.1-10.8 1.2Z" fill="#C4283B"/>' +
      '<path d="M15.5 20.5c-2 1.3-3 4-2.6 6.6" stroke="#fff" stroke-opacity=".55" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M24 15.5c-.2-3.2.7-6.2 2.6-8.3" stroke="#5A3A22" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      '<g transform="translate(25.5 1.5) scale(.82) rotate(18 12 12)"><path d="' + CHINAR + '" fill="#2E8A57"/><path d="M12 21 12 6M12 14l-6-3M12 14l6-3" stroke="#1C6A46" stroke-width="1" fill="none"/></g>' +
      '</svg>';
  }
  function chinar(size, color, opacity) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + CHINAR + '" fill="' + (color || 'currentColor') + '" fill-opacity="' + (opacity == null ? 1 : opacity) + '"/><path d="M12 21.5 12 5M12 13.5 5.5 9.5M12 13.5 18.5 9.5M12 16.5 4 14M12 16.5 20 14" stroke="' + (color || 'currentColor') + '" stroke-opacity=".5" stroke-width=".6" fill="none"/></svg>';
  }

  /* ---------- leaf ---------- */
  function leafOutline(narrow, curl) {
    const pts = [], N = 44, L = 118, base = 128, W = narrow ? 24 : 33;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      let hw = W * Math.pow(Math.sin(Math.PI * Math.pow(t, 0.78)), 0.85) * (1 - 0.12 * t);
      if (i > 1 && i < N - 1) hw += (i % 2 ? 1.5 : -0.3) * (1 - 0.5 * t);
      pts.push([hw, base - L * t]);
    }
    const right = pts.map(([h, y]) => [50 + h * (curl ? 0.82 : 1), y]);
    const left = pts.slice().reverse().map(([h, y]) => [50 - h, y]);
    return 'M' + [...right, ...left].map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L') + 'Z';
  }
  function veins() {
    let s = '<path d="M50 136 L50 14" stroke-width="1.6"/>';
    for (let k = 1; k <= 7; k++) {
      const y = 122 - k * 14, span = 26 * Math.sin(Math.PI * Math.min(0.95, (k / 8.2)));
      s += '<path d="M50 ' + y + ' Q' + (50 + span * .55) + ' ' + (y - 5) + ' ' + (50 + span) + ' ' + (y - 14) + '"/>';
      s += '<path d="M50 ' + y + ' Q' + (50 - span * .55) + ' ' + (y - 5) + ' ' + (50 - span) + ' ' + (y - 14) + '"/>';
    }
    return s;
  }
  function leaf(kind, w, h, seed) {
    kind = kind || 'healthy'; w = w || 90; h = h || 120;
    const r = rng(seed || 7), g = id('lf'), clip = id('lc'), rough = id('rf'), blur = id('bl');
    const base = { healthy: ['#5BA544', '#3F8A31'], scab: ['#5AA043', '#3E8530'], alternaria: ['#5CA246', '#428A33'], marssonina: ['#C9C04C', '#A9AC3A'], mildew: ['#86B467', '#6E9E52'], mites: ['#97934E', '#7C7A3D'], aphids: ['#64AA4B', '#478E35'], holes: ['#5AA344', '#3F8831'], zinc: ['#7FB84E', '#5E9A3A'], burn: ['#5DA346', '#43893A'] }[kind] || ['#5BA544', '#3F8A31'];
    const outline = leafOutline(kind === 'mildew' || kind === 'zinc', kind === 'aphids' || kind === 'mildew');
    let defs = '<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + base[0] + '"/><stop offset="1" stop-color="' + base[1] + '"/></linearGradient>' +
      '<clipPath id="' + clip + '"><path d="' + outline + '"/></clipPath>' +
      '<filter id="' + rough + '" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="2" seed="' + ((seed || 3) % 50) + '"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>' +
      '<filter id="' + blur + '"><feGaussianBlur stdDeviation="1.6"/></filter></defs>';
    let body = '<path d="M50 128 L50 139" stroke="#6B4E2E" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="' + outline + '" fill="url(#' + g + ')" stroke="rgba(0,0,0,.18)" stroke-width=".8"/>';
    let spots = '';
    const inLeaf = (x, y) => { const t = (128 - y) / 118; if (t < .06 || t > .93) return false; const hw = 30 * Math.pow(Math.sin(Math.PI * Math.pow(t, .78)), .85); return Math.abs(x - 50) < hw - 4; };
    const place = (n, fn) => { let c = 0, guard = 0; while (c < n && guard++ < 400) { const x = 18 + r() * 64, y = 16 + r() * 108; if (inLeaf(x, y)) { spots += fn(x, y, c); c++; } } };
    if (kind === 'marssonina') {
      place(9, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="' + (4 + r() * 4) + '" fill="#5E9334" opacity=".85" filter="url(#' + blur + ')"/>');
      place(6, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="' + (5 + r() * 6) + '" fill="#4A3420" opacity=".92" filter="url(#' + rough + ')"/>');
      place(14, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="' + (1 + r() * 1.4) + '" fill="#2D1E10" opacity=".8"/>');
    }
    body += '<g stroke="' + (kind === 'marssonina' ? '#8C8F33' : 'rgba(225,245,205,.55)') + '" stroke-width="1" fill="none" clip-path="url(#' + clip + ')">' + veins() + '</g>';
    if (kind === 'scab') {
      place(8, (x, y) => { const rr = 4.5 + r() * 5; return '<g filter="url(#' + rough + ')"><circle cx="' + x + '" cy="' + y + '" r="' + (rr + 2.2) + '" fill="#6E7A33" opacity=".55"/><circle cx="' + x + '" cy="' + y + '" r="' + rr + '" fill="#36401B"/><circle cx="' + (x - rr * .25) + '" cy="' + (y - rr * .2) + '" r="' + rr * .45 + '" fill="#232A11"/></g>'; });
    } else if (kind === 'alternaria') {
      place(16, (x, y) => { const rr = 2.2 + r() * 2.3; return '<circle cx="' + x + '" cy="' + y + '" r="' + (rr + 1.4) + '" fill="#C9B25A" opacity=".55"/><circle cx="' + x + '" cy="' + y + '" r="' + rr + '" fill="#7A4A22" stroke="#3B220E" stroke-width="1"/><circle cx="' + x + '" cy="' + y + '" r="' + rr * .45 + '" fill="#B07A44"/>'; });
    } else if (kind === 'mildew') {
      place(6, (x, y) => '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (9 + r() * 7) + '" ry="' + (6 + r() * 5) + '" fill="#F4F6EF" opacity=".78" filter="url(#' + blur + ')"/>');
      place(40, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="' + (.6 + r()) + '" fill="#FFFFFF" opacity=".9"/>');
    } else if (kind === 'mites') {
      place(150, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r=".75" fill="#E2DDA2" opacity=".85"/>');
      place(9, (x, y) => '<ellipse cx="' + x + '" cy="' + y + '" rx="1.6" ry="1.2" fill="#C0392B"/>');
      spots += '<path d="M30 112 Q45 100 62 108 M36 118 Q52 106 70 112" stroke="#FFFFFF" stroke-opacity=".7" stroke-width=".6" fill="none"/>';
    } else if (kind === 'aphids') {
      place(22, (x, y) => '<ellipse cx="' + x + '" cy="' + y + '" rx="2.1" ry="1.4" fill="#9BCB5E" stroke="#5E8A2E" stroke-width=".5" transform="rotate(' + (r() * 180) + ' ' + x + ' ' + y + ')"/>');
      place(7, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="2" fill="#FFFFFF" opacity=".6"/>');
      spots += '<path d="M78 40 Q70 52 76 66" stroke="#2F6D24" stroke-width="3" fill="none" opacity=".35"/>';
    } else if (kind === 'holes') {
      const bg = '#F6F9F5';
      place(6, (x, y) => '<path d="M' + x + ' ' + y + ' m-5 0 a5 4 20 1 0 10 0 a6 3 0 1 0 -10 0Z" fill="' + bg + '" filter="url(#' + rough + ')"/>');
      spots += '<g transform="translate(26 96) rotate(-24)"><rect x="0" y="0" width="40" height="8" rx="4" fill="#6E4B2A"/>' + [4, 10, 16, 22, 28, 34].map(x => '<path d="M' + x + ' 0 l-1 -4 M' + x + ' 8 l-1 4" stroke="#C9A06A" stroke-width=".8"/>').join('') + '<circle cx="38" cy="4" r="3.4" fill="#3B2614"/><circle cx="12" cy="4" r="1.2" fill="#E9C46A"/><circle cx="24" cy="4" r="1.2" fill="#E05A47"/></g>';
    } else if (kind === 'burn') {
      spots += '<path d="' + outline + '" fill="none" stroke="#8A5A2B" stroke-width="7" clip-path="url(#' + clip + ')" filter="url(#' + rough + ')"/>';
      place(7, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="' + (2 + r() * 2.5) + '" fill="#C9A060" stroke="#8A5A2B" stroke-width=".8"/>');
    }
    const content = kind === 'zinc'
      ? '<g>' + [-60, -30, 0, 30, 60].map((a, i) => '<g transform="rotate(' + a + ' 50 120) translate(0 ' + (i % 2 ? 22 : 10) + ') scale(.5) translate(50 40)"><path d="' + outline + '" fill="url(#' + g + ')" stroke="rgba(0,0,0,.18)"/></g>').join('') + '<path d="M50 140 L50 112" stroke="#6B4E2E" stroke-width="3"/><circle cx="50" cy="112" r="4" fill="#6B4E2E"/></g>'
      : body + '<g clip-path="url(#' + clip + ')">' + spots + '</g>';
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 100 142" aria-hidden="true">' + defs + content + '</svg>';
  }

  /* ---------- fruit ---------- */
  const APPLE = 'M60 30C45 18 18 22 14 50C10 78 30 108 48 108C54 108 56 105 60 105C64 105 66 108 72 108C90 108 110 78 106 50C102 22 75 18 60 30Z';
  function fruit(kind, w, h, seed) {
    kind = kind || 'healthy'; w = w || 90; h = h || 90;
    const r = rng(seed || 11), g = id('fg'), clip = id('fc'), rough = id('fr'), blur = id('fb');
    const golden = kind === 'sjs';
    const c = golden ? ['#E8D25A', '#B9A532'] : ['#D8393F', '#8E1A24'];
    let defs = '<defs><radialGradient id="' + g + '" cx=".38" cy=".38" r=".75"><stop offset="0" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/></radialGradient><clipPath id="' + clip + '"><path d="' + APPLE + '"/></clipPath>' +
      '<filter id="' + rough + '" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="2" seed="' + ((seed || 5) % 50) + '"/><feDisplacementMap in="SourceGraphic" scale="6"/></filter><filter id="' + blur + '"><feGaussianBlur stdDeviation="2.2"/></filter></defs>';
    let s = '<path d="' + APPLE + '" fill="url(#' + g + ')"/>';
    let marks = '';
    const inA = (x, y) => (x - 60) * (x - 60) / 1900 + (y - 66) * (y - 66) / 1300 < 1;
    const place = (n, fn, yMin) => { let k = 0, guard = 0; while (k < n && guard++ < 400) { const x = 22 + r() * 76, y = (yMin || 34) + r() * (104 - (yMin || 34)); if (inA(x, y)) { marks += fn(x, y); k++; } } };
    place(26, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r=".9" fill="#F7E3B5" opacity=".7"/>');
    if (kind === 'scab') {
      place(7, (x, y) => { const rr = 3.5 + r() * 5; return '<g filter="url(#' + rough + ')"><circle cx="' + x + '" cy="' + y + '" r="' + rr + '" fill="#2B2B16"/><circle cx="' + x + '" cy="' + y + '" r="' + rr * .55 + '" fill="#4A4A2A"/></g>'; });
      marks += '<path d="M44 62 l6 3 -2 5 7 4" stroke="#F3E4C6" stroke-width="1.2" fill="none"/>';
    } else if (kind === 'bitterpit') {
      place(16, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="' + (1.8 + r() * 1.6) + '" fill="#6E4A2A" opacity=".85"/><circle cx="' + x + '" cy="' + y + '" r="' + (3 + r()) + '" fill="#3B2210" opacity=".18"/>', 68);
    } else if (kind === 'sooty') {
      place(4, (x, y) => '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (10 + r() * 8) + '" ry="' + (7 + r() * 5) + '" fill="#3A3A36" opacity=".38" filter="url(#' + blur + ')"/>');
      place(3, (x, y) => [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => '<circle cx="' + (x + (i % 3) * 2.6 + r()) + '" cy="' + (y + Math.floor(i / 3) * 2.6 + r()) + '" r=".9" fill="#111"/>').join(''));
    } else if (kind === 'sjs') {
      place(14, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="4.2" fill="#C8242C" opacity=".85" filter="url(#' + blur + ')"/><circle cx="' + x + '" cy="' + y + '" r="1.6" fill="#7B7D78" stroke="#4A4B47" stroke-width=".5"/>');
    } else if (kind === 'hail') {
      place(6, (x, y) => '<ellipse cx="' + x + '" cy="' + y + '" rx="5.5" ry="4.5" fill="#6B1218" opacity=".45"/><ellipse cx="' + (x - 1) + '" cy="' + (y - 1) + '" rx="3.6" ry="2.8" fill="#E07A7E" opacity=".5"/>');
    } else if (kind === 'crack') {
      marks += '<path d="M40 50 l5 8 -3 6 6 9 -2 7 5 8" stroke="#F1E2C2" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M74 56 l-4 7 3 6 -4 8" stroke="#F1E2C2" stroke-width="2" fill="none" stroke-linecap="round"/>';
    }
    s += '<g clip-path="url(#' + clip + ')">' + marks + '<ellipse cx="42" cy="48" rx="9" ry="13" fill="#fff" opacity=".18" transform="rotate(-25 42 48)"/></g>';
    s += '<path d="M60 31C60 22 62 15 66 10" stroke="#5A3A22" stroke-width="3.4" fill="none" stroke-linecap="round"/>';
    s += '<path d="M64 15C72 6 86 6 92 11C84 19 72 20 64 15Z" fill="#4E9A3C"/><path d="M64 15C74 12 82 12 92 11" stroke="#2F6D24" stroke-width="1" fill="none"/>';
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 120 116" aria-hidden="true">' + defs + s + '</svg>';
  }

  /* ---------- bark / branch ---------- */
  function bark(kind, w, h, seed) {
    kind = kind || 'healthy'; w = w || 110; h = h || 80;
    const r = rng(seed || 21), g = id('bg'), clip = id('bc'), rough = id('br'), blur = id('bb');
    let defs = '<defs><linearGradient id="' + g + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8A6A4A"/><stop offset=".5" stop-color="#6E5236"/><stop offset="1" stop-color="#4E3824"/></linearGradient><clipPath id="' + clip + '"><path d="M-2 26 Q60 18 122 24 L122 62 Q60 70 -2 60Z"/></clipPath>' +
      '<filter id="' + rough + '" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="2" seed="' + ((seed || 2) % 50) + '"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter><filter id="' + blur + '"><feGaussianBlur stdDeviation="1.3"/></filter></defs>';
    let s = '<path d="M-2 26 Q60 18 122 24 L122 62 Q60 70 -2 60Z" fill="url(#' + g + ')"/>';
    let m = '';
    for (let i = 0; i < 14; i++) { const x = r() * 120, y = 28 + r() * 30; m += '<path d="M' + x + ' ' + y + ' q6 ' + (r() * 2 - 1) + ' 12 0" stroke="#3D2B1A" stroke-width=".9" fill="none" opacity=".55"/>'; }
    if (kind === 'woolly') {
      for (let i = 0; i < 9; i++) { const x = 8 + r() * 104, y = 30 + r() * 26; m += '<g filter="url(#' + blur + ')"><circle cx="' + x + '" cy="' + y + '" r="' + (4 + r() * 4) + '" fill="#FFFFFF" opacity=".95"/><circle cx="' + (x + 4) + '" cy="' + (y - 2) + '" r="' + (3 + r() * 3) + '" fill="#F2F2EE"/></g>'; }
    } else if (kind === 'sjs') {
      for (let i = 0; i < 60; i++) { const x = r() * 120, y = 27 + r() * 34; m += '<circle cx="' + x + '" cy="' + y + '" r="' + (1.2 + r() * 1.3) + '" fill="#8E8E86" stroke="#55554F" stroke-width=".5"/>'; }
    } else if (kind === 'canker') {
      m += '<g filter="url(#' + rough + ')"><ellipse cx="62" cy="44" rx="26" ry="13" fill="#3A2416"/><ellipse cx="62" cy="44" rx="20" ry="9" fill="#7B3E23"/></g><path d="M44 42 l8 3 6-4 8 5 7-3 9 3" stroke="#1E120A" stroke-width="1.4" fill="none"/><path d="M50 49 l9-2 7 3 9-2" stroke="#1E120A" stroke-width="1.1" fill="none"/>';
    } else if (kind === 'borer') {
      m += '<ellipse cx="58" cy="40" rx="4.2" ry="3.4" fill="#1A120B"/><ellipse cx="84" cy="48" rx="3.4" ry="2.8" fill="#1A120B"/>';
      for (let i = 0; i < 26; i++) { m += '<circle cx="' + (52 + r() * 14) + '" cy="' + (46 + r() * 16) + '" r="' + (.6 + r() * .9) + '" fill="#D8B98A"/>'; }
    }
    s += '<g clip-path="url(#' + clip + ')">' + m + '</g>';
    if (kind === 'healthy' || kind === 'woolly') s += '<path d="M78 24 Q86 8 100 4" stroke="#6E5236" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M96 6C104 0 114 2 117 6C111 11 102 11 96 6Z" fill="#4E9A3C"/>';
    if (kind === 'borer') s += '<g opacity=".95">' + Array.from({ length: 20 }, () => '<circle cx="' + (52 + r() * 18) + '" cy="' + (66 + r() * 8) + '" r="' + (.8 + r()) + '" fill="#D8B98A"/>').join('') + '</g>';
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 120 80" aria-hidden="true">' + defs + s + '</svg>';
  }

  /* ---------- roots / tree base ---------- */
  function roots(kind, w, h) {
    kind = kind || 'healthy'; w = w || 110; h = h || 86;
    const soil = id('sl'), rough = id('rr');
    let s = '<defs><linearGradient id="' + soil + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8B6A47"/><stop offset="1" stop-color="#5E4630"/></linearGradient><filter id="' + rough + '" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="2"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter></defs>';
    s += '<rect x="0" y="44" width="120" height="46" fill="url(#' + soil + ')"/>';
    s += '<path d="M48 0 L48 46 Q40 54 30 58 M72 0 L72 46 Q82 54 94 60 M56 46 Q54 66 44 80 M64 46 Q68 64 80 82 M60 46 L60 86" stroke="#5B4027" stroke-width="5" fill="none" stroke-linecap="round"/>';
    s += '<rect x="46" y="0" width="28" height="47" rx="3" fill="#7A5A3A"/>';
    if (kind === 'collar') s += '<g filter="url(#' + rough + ')"><rect x="45" y="30" width="30" height="20" rx="4" fill="#3A2214"/><rect x="49" y="33" width="22" height="13" rx="3" fill="#8A3E1E"/></g>';
    if (kind === 'rootrot') s += '<path d="M40 64 q6 -4 10 2 M70 66 q6 -6 12 0 M52 76 q4 -3 8 2 M30 58 q5 -3 9 1" stroke="#FFFFFF" stroke-width="1.6" fill="none" opacity=".95"/><path d="M36 61 q8 3 14 -1 M74 70 q5 4 10 0" stroke="#F4F4EE" stroke-width="1" fill="none"/>';
    if (kind === 'grubs') s += '<g><path d="M30 70 q-6 6 0 12 q8 4 14 -2" stroke="#F3EBD3" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="44" cy="80" r="3.2" fill="#8A5A2B"/></g><g transform="translate(46 -4)"><path d="M30 70 q-6 6 0 12 q8 4 14 -2" stroke="#F3EBD3" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="44" cy="80" r="2.8" fill="#8A5A2B"/></g>';
    if (kind === 'wet') s += '<path d="M0 44 Q30 40 60 44 T120 44 L120 52 Q90 48 60 52 T0 52Z" fill="#6DA6CF" opacity=".75"/>';
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 120 90" aria-hidden="true">' + s + '</svg>';
  }

  /* ---------- whole tree ---------- */
  function tree(kind, w, h) {
    kind = kind || 'healthy'; w = w || 100; h = h || 100;
    const cols = kind === 'sick' ? ['#C9B847', '#A9A03A', '#D6C65A'] : ['#4E9A3C', '#3F8A31', '#5BA544'];
    let s = '<rect x="46" y="58" width="9" height="34" rx="2" fill="#6E5236"/><path d="M50 70 L36 56 M51 66 L66 52" stroke="#6E5236" stroke-width="4" stroke-linecap="round"/>';
    s += '<circle cx="34" cy="46" r="20" fill="' + cols[1] + '"/><circle cx="66" cy="44" r="21" fill="' + cols[0] + '"/><circle cx="50" cy="30" r="22" fill="' + cols[2] + '"/>';
    if (kind !== 'sick') [[36, 40], [58, 30], [70, 50], [44, 54], [52, 18], [26, 50]].forEach(([x, y]) => { s += '<circle cx="' + x + '" cy="' + y + '" r="3.6" fill="#C4283B"/>'; });
    s += '<path d="M10 92 H90" stroke="#8B6A47" stroke-width="3" stroke-linecap="round"/>';
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 100 96" aria-hidden="true">' + s + '</svg>';
  }

  /* ---------- flowers ---------- */
  function flowers(kind, w, h) {
    kind = kind || 'healthy'; w = w || 100; h = h || 90;
    const one = (x, y, sc, bad) => {
      let p = '';
      for (let i = 0; i < 5; i++) { const a = i * 72; p += '<ellipse cx="' + x + '" cy="' + (y - 9 * sc) + '" rx="' + 6 * sc + '" ry="' + 9 * sc + '" fill="' + (kind === 'mildew' ? '#F1F1E8' : '#FBEFF2') + '" stroke="#E7B9C6" stroke-width=".8" transform="rotate(' + a + ' ' + x + ' ' + y + ')"/>'; }
      p += '<circle cx="' + x + '" cy="' + y + '" r="' + 3.8 * sc + '" fill="' + (bad ? '#1E1A14' : '#E8C547') + '"/>';
      if (!bad) for (let i = 0; i < 6; i++) { const a = i * 60 * Math.PI / 180; p += '<circle cx="' + (x + Math.cos(a) * 3 * sc) + '" cy="' + (y + Math.sin(a) * 3 * sc) + '" r="' + .9 * sc + '" fill="#B5832A"/>'; }
      return p;
    };
    let s = '<path d="M50 90 L50 60 M50 66 L30 46 M50 64 L72 44" stroke="#6E5236" stroke-width="3" stroke-linecap="round"/>';
    s += '<path d="M50 70C40 66 34 70 30 76C40 80 46 76 50 70Z" fill="#4E9A3C"/><path d="M52 70C62 66 70 70 74 76C64 80 56 76 52 70Z" fill="#4E9A3C"/>';
    if (kind === 'fallen') {
      s += one(30, 40, .9, false) + '<circle cx="72" cy="42" r="3" fill="#7A9A3A"/><circle cx="50" cy="56" r="3" fill="#7A9A3A"/>';
      s += '<ellipse cx="22" cy="86" rx="5" ry="3" fill="#FBEFF2" opacity=".9"/><ellipse cx="80" cy="84" rx="5" ry="3" fill="#FBEFF2" opacity=".9"/><ellipse cx="66" cy="88" rx="4" ry="2.5" fill="#FBEFF2" opacity=".9"/>';
    } else {
      const bad = kind === 'frost';
      s += one(30, 40, .95, bad) + one(72, 38, 1, bad) + one(50, 26, 1.05, false);
      if (kind === 'mildew') s += '<ellipse cx="50" cy="40" rx="34" ry="22" fill="#FFFFFF" opacity=".35"/>';
    }
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 100 92" aria-hidden="true">' + s + '</svg>';
  }

  /* ---------- product packs ---------- */
  function pack(type, color, label, w, h) {
    w = w || 56; h = h || 70; color = color || '#1C6A46';
    const lab = (label || '').split('|');
    const txt = (y) => lab.map((t, i) => '<text x="30" y="' + (y + i * 8.5) + '" text-anchor="middle" font-family="Mukta, sans-serif" font-weight="800" font-size="' + (i ? 6.4 : 7.4) + '" fill="#13231A">' + t + '</text>').join('');
    let s = '';
    if (type === 'bottle') {
      s = '<rect x="23" y="2" width="14" height="9" rx="2" fill="#2B2B2B"/><path d="M20 11h20l4 8v50a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V19Z" fill="' + color + '"/><rect x="18" y="30" width="24" height="30" rx="2" fill="#FFFFFF" opacity=".95"/>' + txt(40);
    } else if (type === 'pouch') {
      s = '<path d="M10 6h40l-2 6 2 6v54a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3V18l2-6Z" fill="' + color + '"/><path d="M10 12h40" stroke="#000" stroke-opacity=".18"/><rect x="14" y="30" width="32" height="30" rx="3" fill="#FFFFFF" opacity=".95"/>' + txt(41);
    } else if (type === 'bag') {
      s = '<path d="M8 8 Q30 2 52 8 L54 70 Q30 76 6 70Z" fill="' + color + '"/><path d="M8 8 Q30 14 52 8" stroke="#000" stroke-opacity=".2" fill="none"/><rect x="14" y="26" width="32" height="30" rx="3" fill="#FFFFFF" opacity=".95"/>' + txt(37);
    } else if (type === 'can') {
      s = '<path d="M14 12h22l10 10v48a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4Z" fill="' + color + '"/><rect x="38" y="4" width="8" height="10" rx="2" fill="#2B2B2B"/><path d="M18 14v-6h12" stroke="#2B2B2B" stroke-width="3" fill="none"/><rect x="18" y="32" width="24" height="28" rx="2" fill="#FFFFFF" opacity=".95"/>' + txt(42);
    } else if (type === 'carton') {
      s = '<path d="M6 24 30 14l24 10v38L30 72 6 62Z" fill="#C79A5C"/><path d="M6 24 30 34l24-10M30 34v38" stroke="#8A6435" fill="none"/>' + '<text x="18" y="52" font-family="Mukta, sans-serif" font-weight="800" font-size="7" fill="#5A3A1A" transform="rotate(14 18 52)">APPLES</text>';
    } else if (type === 'plant') {
      s = '<path d="M18 70h24l3-16H15Z" fill="#8B5E3C"/><path d="M30 54V20M30 30l-10-8M30 38l11-9M30 46l-8-6" stroke="#6E5236" stroke-width="2.2" stroke-linecap="round"/><path d="M20 22c-5-2-8 0-9 4 4 2 7 1 9-4ZM41 29c5-3 9-1 10 3-4 2-8 1-10-3ZM22 40c-5-2-8 0-9 4 4 2 7 1 9-4ZM30 20c-2-5 0-9 4-10 2 4 1 8-4 10Z" fill="#4E9A3C"/>';
    } else if (type === 'tool') {
      s = '<circle cx="30" cy="38" r="26" fill="' + color + '" opacity=".14"/><g transform="translate(12 20) scale(1.5)" stroke="' + color + '" stroke-width="1.9" fill="none" stroke-linecap="round" stroke-linejoin="round">' + (P[label] || P.scissors) + '</g>';
    }
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 60 76" aria-hidden="true">' + s + '</svg>';
  }

  /* ---------- orchard scene (welcome) ---------- */
  function orchardScene(w, h) {
    let s = '<defs><linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFE3EE"/><stop offset="1" stop-color="#EEF4EC"/></linearGradient></defs>';
    s += '<rect width="320" height="170" fill="url(#sky1)"/>';
    s += '<path d="M0 92 L48 38 L76 64 L120 18 L166 70 L204 34 L250 76 L284 46 L320 80 L320 170 L0 170Z" fill="#B9CBD3"/>';
    s += '<path d="M120 18 L134 34 L126 32 L118 40 L110 30Z M204 34 L216 46 L208 45 L201 52 L195 44Z M48 38 L58 49 L51 48 L45 54 L40 47Z" fill="#FFFFFF"/>';
    s += '<path d="M0 116 Q80 96 160 108 T320 104 L320 170 L0 170Z" fill="#7FAF6A"/>';
    s += '<path d="M0 136 Q90 120 180 132 T320 128 L320 170 L0 170Z" fill="#5E9A4E"/>';
    const t = (x, y, sc) => '<g transform="translate(' + x + ' ' + y + ') scale(' + sc + ')"><rect x="-2.5" y="0" width="5" height="18" fill="#6E5236"/><circle cx="-8" cy="-4" r="10" fill="#3F8A31"/><circle cx="8" cy="-5" r="10.5" fill="#4E9A3C"/><circle cx="0" cy="-13" r="11" fill="#5BA544"/><circle cx="-6" cy="-8" r="1.8" fill="#C4283B"/><circle cx="6" cy="-12" r="1.8" fill="#C4283B"/><circle cx="9" cy="-2" r="1.8" fill="#C4283B"/><circle cx="-1" cy="-2" r="1.8" fill="#C4283B"/></g>';
    [[30, 120, .9], [80, 116, .95], [130, 120, 1], [180, 118, .95], [232, 116, .9], [282, 118, .95], [55, 142, 1.25], [125, 146, 1.3], [200, 144, 1.3], [275, 146, 1.25]].forEach(a => s += t(...a));
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 320 170" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + s + '</svg>';
  }

  /* ---------- area map (pest reports) ---------- */
  function areaMap(w, h, reports) {
    let s = '<rect class="land" width="340" height="230" fill="#E4EEDF"/>';
    s += '<g class="contour" fill="none" stroke="#C9D8C4" stroke-width="1">' + [0, 1, 2, 3, 4, 5].map(i => '<path d="M-10 ' + (30 + i * 38) + ' Q80 ' + (10 + i * 38) + ' 170 ' + (36 + i * 38) + ' T350 ' + (24 + i * 38) + '"/>').join('') + '</g>';
    s += '<path class="river" d="M-10 196 Q60 170 120 182 T230 150 T350 120" stroke="#8EBBDA" stroke-width="6" fill="none" stroke-linecap="round"/>';
    s += '<path class="road" d="M40 -10 L70 60 L120 96 L170 120 L230 128 L300 170" stroke="#FFFFFF" stroke-width="3" fill="none"/><path d="M40 -10 L70 60 L120 96 L170 120 L230 128 L300 170" stroke="#B9C7B4" stroke-width="1" fill="none" stroke-dasharray="4 4"/>';
    [['Wachi', 168, 112], ['Zainapora', 236, 70], ['Shopian', 92, 72], ['Keller', 60, 160], ['Imamsahib', 266, 186]].forEach(([n, x, y]) => { s += '<circle class="vdot" cx="' + x + '" cy="' + y + '" r="3" fill="#4A5C51"/><text class="lbl" x="' + (x + 6) + '" y="' + (y + 4) + '" font-family="Mukta, sans-serif" font-size="11" font-weight="600" fill="#4A5C51">' + n + '</text>'; });
    (reports || []).forEach(([x, y, rr, col]) => { const k = col === '#B3261E' ? 'rep-risk' : col === '#A3560C' ? 'rep-warn' : 'rep-good'; s += '<circle class="' + k + '" cx="' + x + '" cy="' + y + '" r="' + rr + '" fill="' + col + '" fill-opacity=".28" stroke="' + col + '" stroke-width="1.5"/>'; });
    s += '<circle cx="168" cy="112" r="26" fill="none" stroke="#1C6A46" stroke-width="1.5" stroke-dasharray="4 3"/>';
    s += '<g transform="translate(160 88)"><path class="you" d="M8 0C3.6 0 0 3.6 0 8c0 6 8 14 8 14s8-8 8-14c0-4.4-3.6-8-8-8Z" fill="#C4283B"/><circle cx="8" cy="8" r="3" fill="#fff"/></g>';
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + s + '</svg>';
  }

  /* ---------- small line chart ---------- */
  function lineChart(values, opts) {
    opts = opts || {};
    const W = opts.w || 320, H = opts.h || 130, padL = 34, padR = 44, padT = 10, padB = 20;
    const min = Math.min(...values), max = Math.max(...values);
    const step = opts.step || 10;
    const lo = Math.floor((min - step * .3) / step) * step, hi = Math.ceil((max + step * .3) / step) * step;
    const x = (i) => padL + (W - padL - padR) * i / (values.length - 1);
    const y = (v) => padT + (H - padT - padB) * (1 - (v - lo) / (hi - lo));
    let s = '';
    const ticks = []; for (let v = lo; v <= hi + 1e-9; v += step) ticks.push(v);
    const tk = ticks.length > 5 ? ticks.filter((_, i) => i % 2 === 0) : ticks;
    tk.forEach(v => { s += '<line class="grid" x1="' + padL + '" x2="' + (W - padR + 6) + '" y1="' + y(v) + '" y2="' + y(v) + '"/><text x="' + (padL - 6) + '" y="' + (y(v) + 3.5) + '" text-anchor="end">' + (opts.fmt ? opts.fmt(v) : v) + '</text>'; });
    (opts.xlabels || []).forEach(([i, t]) => { s += '<text x="' + x(i) + '" y="' + (H - 4) + '" text-anchor="middle">' + t + '</text>'; });
    const pts = values.map((v, i) => x(i).toFixed(1) + ',' + y(v).toFixed(1));
    s += '<path class="area" d="M' + x(0) + ',' + y(lo) + ' L' + pts.join(' L') + ' L' + x(values.length - 1) + ',' + y(lo) + 'Z"/>';
    s += '<path class="ln" d="M' + pts.join(' L') + '"/>';
    const lx = x(values.length - 1), ly = y(values[values.length - 1]);
    s += '<circle class="end" cx="' + lx + '" cy="' + ly + '" r="4.5"/><text class="endlabel" x="' + (lx + 8) + '" y="' + (ly + 4) + '">' + (opts.fmt ? opts.fmt(values[values.length - 1]) : values[values.length - 1]) + '</text>';
    s += '<line class="cross" x1="0" x2="0" y1="' + padT + '" y2="' + (H - padB) + '" visibility="hidden"/><circle class="end hov" r="4" cx="0" cy="0" visibility="hidden"/>';
    const meta = JSON.stringify({ padL, padR, W, lo, hi, padT, padB, H, n: values.length });
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" data-chart=\'' + meta + '\' data-values="' + values.join(',') + '" role="img" aria-label="' + (opts.label || 'Price trend') + '">' + s + '</svg>';
  }

  G.ART = { ic, logo, chinar, leaf, fruit, bark, roots, tree, flowers, pack, orchardScene, areaMap, lineChart, rng };
})(typeof window !== 'undefined' ? window : globalThis);
