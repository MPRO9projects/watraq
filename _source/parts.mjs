// Shared constants, icons and reusable blocks.

// Change this to the live domain before deploying (used for canonical/OG/sitemap).
export const SITE = "https://watraq.mpro9.com";

export const ORG = {
  name: "M Pro9 Private Limited",
  url: "https://mpro9.com/",
  meetEmail: "info.mpro9@gmail.com",
  phone: "+91 90715 10909",
  phoneIntl: "+919071510909",
  street: "#957/1A, 3rd Main, Sheshadri Iyer Road, Lakshmipuram",
};

const s = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

export const icon = {
  arrow: s('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  cal: s('<rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 3v3M16 3v3M8 14h3"/>'),
  mail: s('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>'),
  phone: s('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
  pin: s('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  down: s('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
  drop: s('<path d="M12 3s6.5 7.1 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.1 12 3 12 3Z"/><path d="M9 15a3 3 0 0 0 3 3"/>'),
  city: s('<path d="M3 21h18M5 21V8l5-3v16M10 21V10h9v11M13 13h1M16 13h1M13 16h1M16 16h1M7 11h1M7 14h1M7 17h1"/>'),
  factory: s('<path d="M3 21V11l5 3V11l5 3V7h3l1-4h2l1 4v14Z"/><path d="M7 17h2M12 17h2M17 17h1"/>'),
  building: s('<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/>'),
  sprout: s('<path d="M12 21v-9"/><path d="M12 12C12 7 8.5 5 4 5c0 5 3.5 7 8 7Z"/><path d="M12 14c0-4.5 3-6.5 8-6.5 0 4.5-3.5 6.5-8 6.5Z"/><path d="M7 21h10"/>'),
  recycle: s('<path d="M7 19H4.5a1.5 1.5 0 0 1-1.3-2.3L5.5 13M17 19h2.5a1.5 1.5 0 0 0 1.3-2.3L17.3 11M9.5 5.4 11 3a1.4 1.4 0 0 1 2.3 0l2.7 4.5"/><path d="m14 19-2 2-2-2 2-2M5.5 13l-.3 3M5.5 13l2.7 1.2M17.3 11l-2.8.3M17.3 11l.9 2.8M16 7.5l-2.8-.8M16 7.5l-.8 2.8"/>'),
  rain: s('<path d="M7 15a4 4 0 1 1 .9-7.9A5.5 5.5 0 0 1 18.5 9 3 3 0 0 1 18 15Z"/><path d="M8 18l-1 2.5M12 18l-1 2.5M16 18l-1 2.5"/>'),
  gauge: s('<path d="M4 18a8 8 0 1 1 16 0"/><path d="m12 18 4-6"/><path d="M12 6v1.5M6.3 8.3l1 1M17.7 8.3l-1 1"/>'),
  chart: s('<path d="M4 20V4M4 20h16"/><path d="m7 15 4-4 3 3 5-6"/>'),
  shield: s('<path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6Z"/><path d="m9 12 2 2 4-4"/>'),
  file: s('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>'),
  search: s('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>'),
  layers: s('<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 13 9 5 9-5"/>'),
  cpu: s('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9.5 9.5h5v5h-5ZM9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>'),
  coin: s('<circle cx="12" cy="12" r="8.5"/><path d="M12 7v10M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.4 0-2.5.8-2.5 2s1.1 1.6 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1.1 0-2-.4-2.5-1.2"/>'),
  map: s('<path d="m9 4-6 2.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5Z"/><path d="M9 4v13.5M15 6.5V20"/>'),
  link: s('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),
  wave: s('<path d="M2 9c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/>'),
  users: s('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6"/>'),
  info: s('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),
  warn: s('<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>'),
  leaf: s('<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15Z"/><path d="M5 19 13 11"/>'),
};

export const more = (t = "Learn more") => `<span class="card__more">${t}${icon.arrow}</span>`;

export const cta = (title = "Turn every litre into verified value.", text = "Book a 30-minute call with the Watraq team. We'll look at your water data and tell you honestly whether a water credit project is viable.") => `
<section class="sec" style="padding-top:0"><div class="wrap">
  <div class="cta rv">
    <div><h2>${title}</h2><p>${text}</p></div>
    <div class="btn-row"><a class="btn btn--p" href="contact.html#meeting" data-meet>${icon.cal}Schedule a Meeting</a><a class="btn btn--ghost" href="water-credits.html#estimator">Estimate your benefit</a></div>
  </div>
</div></section>`;

export const builtBy = () => `
<div class="built rv">
  <div class="built__m">M9</div>
  <div><p><b>Developed by M Pro9 Private Limited</b></p><p>Mysuru-based environmental technology and consulting company behind Wastraq and Karbantraq. Watraq brings the same traceability to water.</p></div>
  <a class="btn btn--o btn--sm" href="${ORG.url}" target="_blank" rel="noopener">Visit mpro9.com${icon.arrow}</a>
</div>`;

export const phero = (crumb, h1, lead) => `
<section class="phero"><div class="wrap" style="position:relative;z-index:1">
  <p class="crumb"><a href="index.html">Home</a> <span aria-hidden="true">/</span> ${crumb}</p>
  <h1>${h1}</h1>
  <p class="lead">${lead}</p>
</div></section>`;

// Water benefit estimator, embedded on Home and Water Credits.
export const estimator = () => `
<form class="tool rv" id="calc" onsubmit="return false">
  <div class="tool__in">
    <h3>Water benefit estimator</h3>
    <p class="muted small" style="margin-bottom:1.3rem">A first-pass estimate of the annual water volume your project could document. Change any value — results update instantly.</p>
    <div class="fld" style="margin-bottom:1.1rem"><span style="font-size:.84rem;font-weight:600;color:var(--ink)">Intervention</span>
      <div class="chips" role="radiogroup" aria-label="Intervention">
        <label><input type="radio" name="itype" value="reuse" checked><span>Recycle &amp; reuse</span></label>
        <label><input type="radio" name="itype" value="rwh"><span>Rainwater harvesting</span></label>
        <label><input type="radio" name="itype" value="drip"><span>Micro-irrigation</span></label>
        <label><input type="radio" name="itype" value="nrw"><span>Leak / NRW reduction</span></label>
      </div>
    </div>
    <div data-pane="reuse" class="form">
      <div class="fld full"><label for="c-kld">Treated water reused (kL/day)</label><div class="rng"><input id="c-kld" type="number" name="kld" value="500" min="0"><input type="range" min="10" max="20000" step="10" value="500" aria-label="Treated water reused slider"></div><span class="hint">1 MLD = 1,000 kL/day. Count only water that replaces freshwater.</span></div>
      <div class="fld full"><label for="c-days">Operating days per year</label><div class="rng"><input id="c-days" type="number" name="days" value="330" min="0" max="366"><input type="range" min="100" max="365" value="330" aria-label="Operating days slider"></div></div>
    </div>
    <div data-pane="rwh" class="form" hidden>
      <div class="fld full"><label for="c-area">Catchment area (m²)</label><div class="rng"><input id="c-area" type="number" name="area" value="20000" min="0"><input type="range" min="500" max="500000" step="500" value="20000" aria-label="Catchment area slider"></div></div>
      <div class="fld"><label for="c-rain">Annual rainfall (mm)</label><input id="c-rain" type="number" name="rain" value="800" min="0"><span class="hint">Mysuru ≈ 800 mm, Bengaluru ≈ 950 mm</span></div>
      <div class="fld"><label for="c-coef">Surface type</label><select id="c-coef" name="coef"><option value="0.85">Roof (0.85)</option><option value="0.7">Paved (0.70)</option><option value="0.3">Open ground (0.30)</option></select></div>
    </div>
    <div data-pane="drip" class="form" hidden>
      <div class="fld full"><label for="c-acres">Irrigated area (acres)</label><div class="rng"><input id="c-acres" type="number" name="acres" value="250" min="0"><input type="range" min="1" max="5000" value="250" aria-label="Irrigated area slider"></div><span class="hint">Aggregate many farms through an FPO for a viable project.</span></div>
      <div class="fld"><label for="c-depth">Crop water applied (mm/yr)</label><input id="c-depth" type="number" name="depth" value="900" min="0"></div>
      <div class="fld"><label for="c-save">Saving vs flood irrigation (%)</label><input id="c-save" type="number" name="save" value="35" min="0" max="80"></div>
    </div>
    <div data-pane="nrw" class="form" hidden>
      <div class="fld"><label for="c-mld">System input (MLD)</label><input id="c-mld" type="number" name="mld" value="50" min="0"></div>
      <div class="fld"><label for="c-pp">NRW reduction (% points)</label><input id="c-pp" type="number" name="pp" value="8" min="0" max="60"><span class="hint">e.g. NRW from 38% down to 30% = 8</span></div>
    </div>
    <div class="form" style="margin-top:1rem">
      <div class="fld"><label for="c-tariff">Freshwater cost (₹/kL)</label><input id="c-tariff" type="number" name="tariff" value="45" min="0"></div>
      <div class="fld"><label for="c-buf">Conservative buffer</label><select id="c-buf" name="buffer"><option value="10">10%</option><option value="20" selected>20%</option><option value="30">30%</option></select><span class="hint">Deducted for metering uncertainty</span></div>
    </div>
  </div>
  <div class="tool__out" aria-live="polite">
    <h3>Indicative annual result</h3>
    <div class="res">
      <div class="big"><b id="r-net">0</b><span>m³ / year of documentable water benefit (after buffer)</span></div>
      <div><b id="r-ml">0</b><span>Megalitres / year (net)</span></div>
      <div><b id="r-gross">0</b><span>Gross ML / year (before buffer)</span></div>
      <div><b id="r-cost">₹0</b><span>Freshwater cost avoided / year</span></div>
      <div><b id="r-people">0</b><span>People's annual needs met (135 L/day each)</span></div>
    </div>
    <p class="small" id="r-basis" style="margin-bottom:.6rem;color:rgba(255,255,255,.75)"></p>
    <p class="small">Pre-feasibility only. Whether this volume can be credited depends on the baseline, additionality, metering and the rules of the registry or programme you use. We check all of this in a feasibility study.</p>
    <a class="btn btn--w btn--sm" style="align-self:flex-start;margin-top:1rem" href="contact.html#meeting" data-meet="Water credit feasibility">${icon.cal}Discuss this result</a>
  </div>
</form>`;
