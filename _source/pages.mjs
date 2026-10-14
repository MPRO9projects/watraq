// Page content. Each page returns { file, title, desc, body, ld? }.
import { icon, more, cta, phero, estimator, ORG, SITE } from "./parts.mjs";

const dash = () => `
<div class="dash">
  <div class="dash__bar"><span class="dash__dot"></span><span class="dash__dot"></span><span class="dash__dot"></span><span class="dash__ttl">Watraq · Water credit ledger (illustrative)</span></div>
  <div class="dash__b">
    <div class="dash__row">
      <div class="dash__kpi"><div class="dash__kl">Recycled YTD</div><div class="dash__kv">1.42<sub>ML</sub></div></div>
      <div class="dash__kpi"><div class="dash__kl">Freshwater offset</div><div class="dash__kv">38<sub>%</sub></div></div>
      <div class="dash__kpi"><div class="dash__kl">Data complete</div><div class="dash__kv">97<sub>%</sub></div></div>
    </div>
    <div class="dash__chart" aria-hidden="true">${[34,42,38,55,61,58,70,66,78,74,86,92].map((h, i) => `<i data-h="${h}"${i % 4 === 3 ? ' class="r"' : ""}></i>`).join("")}</div>
    <div class="dash__legend"><span>Recycled water (metered)</span><span class="r">Rainwater recharge</span></div>
    <div class="dash__li"><span>STP outlet meter · IoT</span><b>live</b><span class="pill">verified</span></div>
    <div class="dash__li"><span>Quality — BOD / TSS</span><b>within norms</b><span class="pill">verified</span></div>
    <div class="dash__li"><span>Q3 monitoring report</span><b>ready</b><span class="pill pill--b">for verifier</span></div>
    <div class="dash__li"><span>Registry submission</span><b>pending</b><span class="pill pill--w">in review</span></div>
    <p class="dash__note">Sample data for illustration only.</p>
  </div>
</div>`;

const sectorCards = () => `
<div class="grid g4">
  <a class="card card--link rv" href="solutions.html#municipalities"><div class="ico">${icon.city}</div><h3>Municipalities</h3><p>Sell treated sewage to industry, cut non-revenue water, rejuvenate lakes, and earn credits that help fund it.</p>${more()}</a>
  <a class="card card--link rv rv-d1" href="solutions.html#industry"><div class="ico">${icon.factory}</div><h3>Industry</h3><p>ETP recycling, ZLD and process efficiency. Lower freshwater intake and meet CGWA and pollution-board requirements.</p>${more()}</a>
  <a class="card card--link rv rv-d2" href="solutions.html#organisations"><div class="ico">${icon.building}</div><h3>Organisations</h3><p>Campuses, real estate and corporates working toward water neutrality, BRSR disclosure and CSR impact.</p>${more()}</a>
  <a class="card card--link rv rv-d3" href="solutions.html#farmers"><div class="ico">${icon.sprout}</div><h3>Farmers &amp; FPOs</h3><p>Drip irrigation, farm ponds, recharge and treated-water irrigation, grouped so smallholders can earn too.</p>${more()}</a>
</div>`;

const frameworks = () => `
<div class="fw">
  <a href="https://moefcc-gcp.in/" target="_blank" rel="noopener"><em>Govt. of India · MoEFCC</em><b>Green Credit Programme</b><span>Green Credit Rules, 2023 list water management as an eligible activity</span></a>
  <a href="https://nmcg.nic.in/" target="_blank" rel="noopener"><em>Jal Shakti · NMCG</em><b>Safe Reuse of Treated Water</b><span>National framework that pushes cities to reuse treated wastewater</span></a>
  <a href="https://amrut.mohua.gov.in/" target="_blank" rel="noopener"><em>MoHUA</em><b>AMRUT 2.0</b><span>Water-secure cities, treated-water reuse and water balance plans</span></a>
  <a href="https://cgwa.mowr.gov.in/" target="_blank" rel="noopener"><em>Central Ground Water Authority</em><b>CGWA Guidelines</b><span>Groundwater NOCs, metering and water audits for large users</span></a>
  <a href="https://www.sebi.gov.in/" target="_blank" rel="noopener"><em>SEBI</em><b>BRSR Core</b><span>Listed companies disclose water withdrawal, consumption and discharge</span></a>
  <a href="https://www.wri.org/research/volumetric-water-benefit-accounting-2-0" target="_blank" rel="noopener"><em>World Resources Institute</em><b>VWBA 2.0</b><span>Widely used method for counting volumetric water benefits</span></a>
  <a href="https://a4ws.org/" target="_blank" rel="noopener"><em>Alliance for Water Stewardship</em><b>AWS Standard</b><span>Site-level water stewardship certification</span></a>
  <a href="https://www.iso.org/standard/68286.html" target="_blank" rel="noopener"><em>ISO</em><b>ISO 46001 · ISO 14046</b><span>Water efficiency management and water footprint</span></a>
</div>`;

const faqItems = [
  ["What is a water credit?", "A water credit is a tradable or reportable certificate representing a verified volume of water that has been saved, recycled, recharged or restored compared to a baseline. Credits are usually denominated in volume (for example cubic metres) and are only issued after independent verification."],
  ["Who can earn water credits?", "Any entity that creates a measurable, additional water benefit: municipalities reusing treated sewage or cutting losses, industries recycling effluent, campuses and real-estate projects harvesting rainwater, and farmers adopting micro-irrigation or recharge, usually grouped through an FPO."],
  ["Who buys water credits?", "Mostly companies with water-stewardship, water-neutrality or ESG goals, especially water-intensive sectors such as beverages, textiles, data centres, pharma and automotive. Some programmes also let credits be used against compliance obligations. Demand and prices depend on the programme."],
  ["Does Watraq issue credits itself?", "No. Watraq does the measurement, data, documentation and verification support. Credits are issued by the relevant programme or registry after independent validation and verification. We never promise issuance or a price."],
  ["What does a water audit report include?", "A water balance from source to discharge, metering assessment, specific water consumption, losses and leakage, STP/ETP performance, recycling and rainwater harvesting potential, regulatory compliance, and a costed list of actions with payback periods."],
  ["How long does a water credit project take?", "A pre-feasibility review takes 1–2 weeks. A water audit typically takes 3–6 weeks depending on size. Credits need a monitoring period of usually 12 months of metered data before verification."],
  ["Do I need new meters or IoT devices?", "Usually some. Credits depend on reliable data, so we check existing meters first and only recommend new flow meters, level sensors or quality analysers where there are gaps."],
  ["Is my data secure?", "Each project has its own access controls. Every reading and document is time-stamped and kept in a tamper-evident log, so you and your verifier can trust the record. You own your data."],
];

const faq = (items = faqItems) => `<div class="faq">${items.map(([q, a]) => `<details class="rv"><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>`;

const faqLd = (items = faqItems) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

const crumbLd = (name, file) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" }, { "@type": "ListItem", position: 2, name, item: SITE + "/" + file }],
});

export const pages = ({ meetForm }) => [
/* =============================== HOME =============================== */
{
  file: "index.html",
  title: "Watraq — Digitalising Water Credit | Water Credits, Recycling & Water Audits",
  desc: "Watraq helps municipalities, industries, organisations and farmers earn verified water credits from recycling, reuse, rainwater harvesting and efficiency, with digital MRV and water audit reports. By M Pro9 Pvt Ltd.",
  ld: [faqLd()],
  body: `
<section class="hero">
  <div class="bubbles" aria-hidden="true"></div>
  <div class="wrap hero__in">
    <div>
      <span class="hero__badge"><b>NEW</b>Water credits for India's municipalities, industry &amp; farms</span>
      <h1>Every litre saved, recycled or recharged, <em>turned into water credits.</em></h1>
      <p class="lead">Watraq measures, verifies and documents your water savings, from treated sewage reuse to drip irrigation, so they can earn water credits, satisfy regulators and prove ESG impact.</p>
      <div class="btn-row" style="margin-top:2rem">
        <a class="btn btn--p" href="contact.html#meeting" data-meet>${icon.cal}Schedule a Meeting</a>
        <a class="btn btn--ghost" href="#estimator">Estimate your water benefit${icon.arrow}</a>
      </div>
      <div class="hero__stats">
        <div><b>4</b><span>sectors served</span></div>
        <div><b>5-step</b><span>audit-to-credit pathway</span></div>
        <div><b>24×7</b><span>IoT-metered evidence</span></div>
      </div>
    </div>
    <div class="rv">${dash()}</div>
  </div>
  <div class="waves" aria-hidden="true"><svg viewBox="0 0 2880 90" preserveAspectRatio="none"><path fill="rgba(255,255,255,.1)" d="M0 50 c180 0 180 -26 360 -26 s180 26 360 26 c180 0 180 -26 360 -26 s180 26 360 26 c180 0 180 -26 360 -26 s180 26 360 26 c180 0 180 -26 360 -26 s180 26 360 26 V90 H0Z"/></svg><svg viewBox="0 0 2880 90" preserveAspectRatio="none"><path fill="#fff" d="M0 64 c180 0 180 -20 360 -20 s180 20 360 20 c180 0 180 -20 360 -20 s180 20 360 20 c180 0 180 -20 360 -20 s180 20 360 20 c180 0 180 -20 360 -20 s180 20 360 20 V90 H0Z"/></svg></div>
</section>

<section class="sec"><div class="wrap">
  <div class="sec-head center rv"><p class="eyebrow">Why water, why now</p><h2>India's water is under pressure. Saving it now has a value.</h2><p class="lead">Regulators, investors and buyers increasingly ask for proof of water stewardship. Watraq turns that proof into something you can report, certify and trade.</p></div>
  <div class="stats">
    <div class="stat rv"><b>~18%</b><p>of the world's population lives in India, with about 4% of its freshwater.</p><cite>World Bank</cite></div>
    <div class="stat rv rv-d1"><b>600 M</b><p>people in India faced high-to-extreme water stress.</p><cite>NITI Aayog, CWMI 2018</cite></div>
    <div class="stat rv rv-d2"><b>2023</b><p>Green Credit Rules notified, with water management as an eligible activity.</p><cite>MoEFCC</cite></div>
    <div class="stat rv rv-d3"><b>BRSR</b><p>Listed companies now disclose water withdrawal, consumption and discharge.</p><cite>SEBI</cite></div>
  </div>
</div></section>

<section class="sec sec--mist"><div class="wrap">
  <div class="sec-head rv"><p class="eyebrow">Who we serve</p><h2>One platform, four kinds of water champions</h2><p class="lead">Each sector saves water differently. Watraq has a playbook for every one of them.</p></div>
  ${sectorCards()}
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head center rv"><p class="eyebrow">How it works</p><h2>From water audit to water credit in five steps</h2></div>
  <div class="steps">
    <div class="step rv"><div class="step__n">1</div><h3>Audit &amp; baseline</h3><p>A water audit sets the baseline: where water comes from, where it goes, where it's lost.</p></div>
    <div class="step rv rv-d1"><div class="step__n">2</div><h3>Intervene</h3><p>Recycle, reuse, harvest, recharge or fix leaks. We help design and size each project.</p></div>
    <div class="step rv rv-d2"><div class="step__n">3</div><h3>Measure digitally</h3><p>Meters and IoT sensors stream data into Watraq: time-stamped and tamper-evident.</p></div>
    <div class="step rv rv-d3"><div class="step__n">4</div><h3>Verify</h3><p>We assemble the monitoring report and evidence pack for an independent verifier.</p></div>
    <div class="step rv"><div class="step__n">5</div><h3>Credit &amp; report</h3><p>Register, issue and track credits, and reuse the same data for BRSR and ESG reports.</p></div>
  </div>
</div></section>

<section class="sec sec--sky" id="estimator"><div class="wrap">
  <div class="sec-head rv"><p class="eyebrow">Try it</p><h2>How much water could your project document?</h2><p class="lead">Choose an intervention and enter a few numbers to see the annual volume, the freshwater cost you avoid, and how many people that water could serve.</p></div>
  ${estimator()}
</div></section>

<section class="sec"><div class="wrap split">
  <div class="rv">
    <p class="eyebrow">Water audit reports</p>
    <h2>Every water credit project starts with a good audit</h2>
    <p class="lead">Our audits follow recognised practice. You get a defensible water balance and a costed action plan that regulators, lenders and verifiers can rely on.</p>
    <ul class="tick">
      <li>Source-to-discharge water balance with metering gap analysis</li>
      <li>Losses, leakage and non-revenue water quantified</li>
      <li>STP / ETP performance and recycling potential</li>
      <li>Rainwater harvesting and recharge potential</li>
      <li>CGWA, pollution board and BRSR compliance check</li>
      <li>Prioritised actions with capex, savings and payback</li>
    </ul>
    <div class="btn-row"><a class="btn btn--d" href="water-audit.html">Explore water audits${icon.arrow}</a><a class="btn btn--o" href="contact.html#meeting" data-meet="Water audit report">Request an audit</a></div>
  </div>
  <div class="rv rv-d2">
    <div class="report"><h3 style="margin-bottom:1rem">Sample report contents</h3><ol>
      <li><div><b>Executive summary</b><span>Key findings, savings potential, priority actions</span></div></li>
      <li><div><b>Water balance diagram</b><span>Intake → use → wastewater → reuse → discharge</span></div></li>
      <li><div><b>Specific water consumption</b><span>Benchmarked per product, per person or per acre</span></div></li>
      <li><div><b>Losses &amp; leakage</b><span>Unaccounted water, NRW, hotspots</span></div></li>
      <li><div><b>Recycling &amp; harvesting opportunities</b><span>Sized, costed, ranked by payback</span></div></li>
      <li><div><b>Water credit readiness</b><span>Eligible volume, monitoring plan, next steps</span></div></li>
    </ol></div>
  </div>
</div></section>

<section class="sec sec--dark"><div class="wrap">
  <div class="sec-head rv"><p class="eyebrow">The Watraq platform</p><h2>Digital MRV built for water</h2><p class="lead">Measurement, reporting and verification (MRV) in one place, from the meter to the registry.</p></div>
  <div class="grid g3">
    <div class="card rv"><div class="ico">${icon.cpu}</div><h3>IoT &amp; meter integration</h3><p>Flow meters, level sensors and quality analysers stream data automatically. Manual entries are allowed but flagged.</p></div>
    <div class="card rv rv-d1"><div class="ico">${icon.gauge}</div><h3>Live water balance</h3><p>See intake, use, recycling and discharge per site, every day, with alerts when the numbers stop adding up.</p></div>
    <div class="card rv rv-d2"><div class="ico">${icon.shield}</div><h3>Tamper-evident evidence</h3><p>Every reading, photo and lab report is time-stamped and hash-linked into an audit trail verifiers can trust.</p></div>
    <div class="card rv"><div class="ico">${icon.file}</div><h3>Verification packs</h3><p>Monitoring reports generated from live data, ready for your third-party verifier.</p></div>
    <div class="card rv rv-d1"><div class="ico">${icon.coin}</div><h3>Credit ledger</h3><p>Track each credit from estimate to issuance, transfer and retirement.</p></div>
    <div class="card rv rv-d2"><div class="ico">${icon.chart}</div><h3>ESG &amp; BRSR reports</h3><p>Use the same data for water disclosures, CSR reports and board dashboards.</p></div>
  </div>
  <div class="btn-row rv" style="margin-top:2rem"><a class="btn btn--w" href="platform.html">See the platform${icon.arrow}</a><a class="btn btn--ghost" href="contact.html#meeting" data-meet="Watraq platform demo">Book a demo</a></div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head rv"><p class="eyebrow">Frameworks we align with</p><h2>Built around the rules that matter</h2><p class="lead">Watraq projects are designed against Indian regulations and international water-accounting standards, so your data stands up wherever it's used.</p></div>
  ${frameworks()}
  <p class="small muted" style="margin-top:1rem">These are frameworks we work to; listing them does not imply endorsement by or partnership with these bodies.</p>
</div></section>

<section class="sec sec--mist"><div class="wrap">
  <div class="sec-head center rv"><p class="eyebrow">FAQ</p><h2>Common questions</h2></div>
  ${faq(faqItems.slice(0, 5))}
  <p style="text-align:center;margin-top:1.5rem"><a href="resources.html#faq">More questions →</a></p>
</div></section>

${cta()}
`,
},

/* =========================== WATER CREDITS =========================== */
{
  file: "water-credits.html",
  title: "How Water Credits Work | Watraq",
  desc: "What water credits are, how they are earned through recycling, reuse, rainwater harvesting, recharge and efficiency, who buys them, and how Watraq takes a project from baseline to verified credit.",
  ld: [crumbLd("Water Credits", "water-credits.html")],
  body: `
${phero("Water Credits", "Water credits, explained simply.", "A water credit is proof that a real, measured volume of water was saved, recycled or returned to nature, beyond what would have happened anyway. Here's how they work and how you can earn them.")}

<section class="sec"><div class="wrap split split--top">
  <div class="rv">
    <p class="eyebrow">The idea</p>
    <h2>Make saving water worth something</h2>
    <p>Water is underpriced almost everywhere, so projects that save or recycle it often struggle to pay for themselves. Water credits fix that by giving verified water benefits a value that others can buy or report.</p>
    <p>The idea is the same as carbon credits: <b>measure a baseline, carry out an intervention, measure again, verify independently, and issue credits for the difference.</b> One credit usually represents a fixed volume of water, such as one cubic metre (1,000 litres). The exact unit depends on the programme.</p>
    <div class="note" style="margin-top:1.4rem">${icon.info}<div><b>In India</b>, the Green Credit Rules, 2023 (MoEFCC) list water management among the activities that can earn green credits. Draft methodologies for water harvesting have been published for consultation, and voluntary water-credit registries and corporate water-stewardship programmes are growing alongside them.</div></div>
  </div>
  <div class="rv rv-d2">
    <div class="report"><h3 style="margin-bottom:1rem">What makes a credit credible</h3><ol>
      <li><div><b>Measurable</b><span>Metered volumes, not estimates on paper</span></div></li>
      <li><div><b>Additional</b><span>Wouldn't have happened without the project</span></div></li>
      <li><div><b>Baseline-referenced</b><span>Compared against a documented starting point</span></div></li>
      <li><div><b>Independently verified</b><span>Checked by an accredited third party</span></div></li>
      <li><div><b>Unique</b><span>Counted once, never double-claimed</span></div></li>
      <li><div><b>Permanent &amp; monitored</b><span>Benefit sustained over the crediting period</span></div></li>
    </ol></div>
  </div>
</div></section>

<section class="sec sec--mist"><div class="wrap">
  <div class="sec-head rv"><p class="eyebrow">Eligible activities</p><h2>Ways to create a water benefit</h2></div>
  <div class="grid g3">
    <div class="card rv"><div class="ico ico--g">${icon.recycle}</div><h3>Recycling &amp; reuse</h3><p>Treated sewage or effluent replacing freshwater in industry, construction, landscaping, flushing or cooling towers.</p></div>
    <div class="card rv rv-d1"><div class="ico ico--g">${icon.rain}</div><h3>Rainwater harvesting</h3><p>Rooftop and surface runoff captured for use, reducing withdrawals from groundwater or municipal supply.</p></div>
    <div class="card rv rv-d2"><div class="ico ico--g">${icon.drop}</div><h3>Groundwater recharge</h3><p>Recharge wells, check dams, farm ponds and percolation tanks that replenish aquifers.</p></div>
    <div class="card rv"><div class="ico ico--g">${icon.sprout}</div><h3>Agricultural efficiency</h3><p>Drip and sprinkler irrigation, soil-moisture scheduling and crop shifts that cut water per acre.</p></div>
    <div class="card rv rv-d1"><div class="ico ico--g">${icon.gauge}</div><h3>Loss reduction</h3><p>Leak detection, pressure management and metering that reduce non-revenue water in city networks.</p></div>
    <div class="card rv rv-d2"><div class="ico ico--g">${icon.wave}</div><h3>Ecosystem restoration</h3><p>Lake rejuvenation, wetland and watershed restoration that increase water storage and quality.</p></div>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head center rv"><p class="eyebrow">The market</p><h2>Who earns, who buys</h2></div>
  <div class="tbl-wrap rv"><table>
    <thead><tr><th>Participant</th><th>Role</th><th>What they gain</th></tr></thead>
    <tbody>
      <tr><td><b>Municipalities &amp; ULBs</b></td><td>Generate credits from STP reuse, NRW reduction, lake revival</td><td>New revenue to fund water infrastructure; AMRUT 2.0 targets</td></tr>
      <tr><td><b>Industries</b></td><td>Generate from ETP recycling and ZLD; buy to offset hard-to-cut use</td><td>Lower intake, compliance comfort, stewardship claims</td></tr>
      <tr><td><b>Corporates &amp; campuses</b></td><td>Generate on-site; buy to reach water-neutral or water-positive goals</td><td>BRSR disclosures, ESG ratings, CSR outcomes</td></tr>
      <tr><td><b>Farmers &amp; FPOs</b></td><td>Generate from micro-irrigation, ponds and recharge, grouped together</td><td>Extra farm income, cheaper irrigation, better yields</td></tr>
      <tr><td><b>Verifiers &amp; registries</b></td><td>Validate, verify, issue and track credits</td><td>Market integrity</td></tr>
    </tbody>
  </table></div>
</div></section>

<section class="sec sec--sky" id="estimator"><div class="wrap">
  <div class="sec-head rv"><p class="eyebrow">Estimator</p><h2>Estimate your water benefit</h2><p class="lead">A quick pre-feasibility number to bring to your first meeting with us.</p></div>
  ${estimator()}
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head rv"><p class="eyebrow">Project lifecycle</p><h2>What Watraq does at each stage</h2></div>
  <div class="tbl-wrap rv"><table>
    <thead><tr><th>Stage</th><th>Typical timeline</th><th>Watraq delivers</th></tr></thead>
    <tbody>
      <tr><td><b>1. Pre-feasibility</b></td><td>1–2 weeks</td><td>Desk review, eligible volume estimate, go / no-go advice</td></tr>
      <tr><td><b>2. Water audit &amp; baseline</b></td><td>3–6 weeks</td><td>Audit report, baseline water balance, metering plan</td></tr>
      <tr><td><b>3. Project design</b></td><td>2–8 weeks</td><td>Intervention sizing, project design document, methodology mapping</td></tr>
      <tr><td><b>4. Monitoring</b></td><td>Usually 12 months</td><td>IoT metering, live dashboard, quality logs, evidence vault</td></tr>
      <tr><td><b>5. Verification</b></td><td>4–8 weeks</td><td>Monitoring report, verification pack, verifier coordination</td></tr>
      <tr><td><b>6. Issuance &amp; reporting</b></td><td>Ongoing</td><td>Credit ledger, buyer matching support, BRSR / ESG reports</td></tr>
    </tbody>
  </table></div>
  <div class="note note--warn rv" style="margin-top:1.5rem">${icon.warn}<div><b>An honest note.</b> Eligibility, issuance and the price of water credits are decided by the applicable programme, methodology, verifier and registry, not by Watraq. We prepare your project so those steps can happen, and we tell you early if a project is unlikely to qualify.</div></div>
</div></section>
${cta()}
`,
},

/* ============================= SOLUTIONS ============================= */
{
  file: "solutions.html",
  title: "Water Credit Solutions for Municipalities, Industry, Organisations & Farmers | Watraq",
  desc: "Sector playbooks for earning water credits: STP reuse and NRW reduction for municipalities, ETP recycling and ZLD for industry, water-neutral campuses for organisations, and micro-irrigation and recharge for farmers.",
  ld: [crumbLd("Solutions", "solutions.html")],
  body: `
${phero("Solutions", "A water credit playbook for every sector.", "Municipalities, industry, organisations and farmers save water in very different ways. Here's what Watraq does for each.")}
<section class="sec"><div class="wrap">

<article class="sector" id="municipalities">
  <div class="sector__visual rv">${icon.city.replace("<svg", '<svg class="bg"')}<p class="eyebrow" style="color:#7FD6EA">Municipalities &amp; ULBs</p><h3>Turn sewage into a revenue stream</h3><p>Cities treat millions of litres every day and most of it is discharged unused. Reusing it and fixing losses creates a large, measurable water benefit.</p>
    <div class="kv"><div><b>STP</b><span>reuse to industry</span></div><div><b>NRW</b><span>loss reduction</span></div><div><b>Lakes</b><span>rejuvenation</span></div></div></div>
  <div class="rv rv-d1">
    <h3>What we do</h3>
    <ul class="tick">
      <li>City water audit: system input, billed consumption, NRW, and water balance by zone (DMA)</li>
      <li>Treated water reuse plans: sell STP output to industry, thermal plants, construction and parks</li>
      <li>Smart metering at STP outlets and bulk supply points with live monitoring</li>
      <li>Leak detection and pressure management programmes, with the savings documented</li>
      <li>Lake and tank rejuvenation, with storage and recharge benefits quantified</li>
      <li>Water credit project documentation, so credit revenue can help fund O&amp;M</li>
    </ul>
    <p class="sub-h">Aligned with</p>
    <div class="tags"><span class="tag">AMRUT 2.0</span><span class="tag">National Framework on Safe Reuse of Treated Water</span><span class="tag">Green Credit Programme</span><span class="tag">Jal Shakti Abhiyan</span></div>
  </div>
</article>

<article class="sector" id="industry">
  <div class="sector__visual rv">${icon.factory.replace("<svg", '<svg class="bg"')}<p class="eyebrow" style="color:#7FD6EA">Industry</p><h3>Recycle more, withdraw less, prove it</h3><p>Textiles, pharma, food &amp; beverage, chemicals, steel and power all depend on water. Recycling effluent cuts cost and risk.</p>
    <div class="kv"><div><b>ETP</b><span>recycling</span></div><div><b>ZLD</b><span>readiness</span></div><div><b>SWC</b><span>per product</span></div></div></div>
  <div class="rv rv-d1">
    <h3>What we do</h3>
    <ul class="tick">
      <li>Industrial water audit with process-wise water balance and specific water consumption</li>
      <li>ETP / STP performance review and recycling options (UF, RO, MEE)</li>
      <li>Cooling tower, boiler and process efficiency measures</li>
      <li>Groundwater compliance: metering, telemetry and the audit reports large users need under CGWA guidelines</li>
      <li>Use of municipal treated water in place of freshwater, with contracts and metering</li>
      <li>Water credit generation and, where needed, buying credits to offset remaining use</li>
    </ul>
    <p class="sub-h">Aligned with</p>
    <div class="tags"><span class="tag">CGWA guidelines</span><span class="tag">CPCB / SPCB consent norms</span><span class="tag">ZLD</span><span class="tag">ISO 46001</span><span class="tag">BRSR Principle 6</span></div>
  </div>
</article>

<article class="sector" id="organisations">
  <div class="sector__visual rv">${icon.building.replace("<svg", '<svg class="bg"')}<p class="eyebrow" style="color:#7FD6EA">Organisations</p><h3>Water neutral. Water positive. Reported properly.</h3><p>Corporates, IT parks, universities, hospitals, hotels and residential townships can make credible water commitments.</p>
    <div class="kv"><div><b>BRSR</b><span>disclosure</span></div><div><b>CSR</b><span>water projects</span></div><div><b>Net</b><span>water positive</span></div></div></div>
  <div class="rv rv-d1">
    <h3>What we do</h3>
    <ul class="tick">
      <li>Campus and building water audits, including STP reuse for flushing, landscaping and HVAC</li>
      <li>Rainwater harvesting and recharge design with metered evidence</li>
      <li>Water footprint and water-neutrality roadmaps</li>
      <li>CSR watershed and community water projects with verified outcomes</li>
      <li>BRSR water indicators: withdrawal, consumption, discharge, intensity, generated from Watraq data</li>
      <li>Buying credits from verified projects to cover what you can't reduce on-site</li>
    </ul>
    <p class="sub-h">Aligned with</p>
    <div class="tags"><span class="tag">SEBI BRSR Core</span><span class="tag">AWS Standard</span><span class="tag">WRI VWBA 2.0</span><span class="tag">ISO 14046</span><span class="tag">IGBC / GRIHA</span></div>
  </div>
</article>

<article class="sector" id="farmers">
  <div class="sector__visual rv">${icon.sprout.replace("<svg", '<svg class="bg"')}<p class="eyebrow" style="color:#7FD6EA">Farmers &amp; FPOs</p><h3>More crop per drop, and a new income</h3><p>Agriculture uses most of India's water. Small changes on many farms add up, and grouping farms makes them creditable.</p>
    <div class="kv"><div><b>Drip</b><span>&amp; sprinkler</span></div><div><b>Ponds</b><span>&amp; recharge</span></div><div><b>FPO</b><span>aggregation</span></div></div></div>
  <div class="rv rv-d1">
    <h3>What we do</h3>
    <ul class="tick">
      <li>Group projects through FPOs, cooperatives and NGOs so smallholders can take part</li>
      <li>Micro-irrigation (drip, sprinkler) and soil-moisture-based scheduling</li>
      <li>Farm ponds, check dams and recharge structures, with storage measured</li>
      <li>Safe use of treated wastewater for irrigation near cities</li>
      <li>Simple mobile data capture with geotagged photos, in local languages</li>
      <li>Transparent benefit-sharing so credit income reaches the farmer</li>
    </ul>
    <p class="sub-h">Aligned with</p>
    <div class="tags"><span class="tag">PMKSY: Per Drop More Crop</span><span class="tag">Atal Bhujal Yojana</span><span class="tag">Green Credit Programme</span></div>
  </div>
</article>

</div></section>
${cta("Not sure which pathway fits?", "Tell us about your site. In one call we'll point you to the intervention with the best mix of water saved, cost and credit potential.")}
`,
},

/* ============================ WATER AUDIT ============================ */
{
  file: "water-audit.html",
  title: "Water Audit Reports for Industry, Municipalities & Campuses | Watraq",
  desc: "Professional water audit reports: water balance, metering, losses and NRW, STP/ETP performance, recycling and rainwater harvesting potential, CGWA compliance and water credit readiness. Includes a free water balance checker.",
  ld: [crumbLd("Water Audit", "water-audit.html")],
  body: `
${phero("Water Audit", "Water audit reports that lead somewhere.", "A good water audit does more than satisfy a regulator. It shows where every litre goes and which fixes pay back fastest, and it sets the baseline for future water credits.")}

<section class="sec"><div class="wrap">
  <div class="sec-head rv"><p class="eyebrow">Audit types</p><h2>An audit for every kind of site</h2></div>
  <div class="grid g4">
    <div class="card rv"><div class="ico">${icon.factory}</div><h3>Industrial</h3><p>Process-wise balance, specific water consumption, ETP/STP and recycling, for CGWA and pollution-board needs.</p></div>
    <div class="card rv rv-d1"><div class="ico">${icon.city}</div><h3>Municipal</h3><p>System input vs billed volume, NRW by zone, bulk metering, STP reuse and supply equity.</p></div>
    <div class="card rv rv-d2"><div class="ico">${icon.building}</div><h3>Building &amp; campus</h3><p>Fixtures, HVAC, landscaping, STP reuse and rainwater harvesting for offices, hotels, hospitals and townships.</p></div>
    <div class="card rv rv-d3"><div class="ico">${icon.sprout}</div><h3>Agricultural</h3><p>Irrigation efficiency, groundwater use, crop water need and recharge potential for farms and FPOs.</p></div>
  </div>
</div></section>

<section class="sec sec--mist"><div class="wrap">
  <div class="sec-head center rv"><p class="eyebrow">Methodology</p><h2>How we audit</h2></div>
  <div class="steps steps--4">
    <div class="step rv"><div class="step__n">1</div><h3>Scoping</h3><p>Objectives, boundaries, data request and site plan.</p></div>
    <div class="step rv rv-d1"><div class="step__n">2</div><h3>Data review</h3><p>Bills, meter logs, consents, borewell records, production data.</p></div>
    <div class="step rv rv-d2"><div class="step__n">3</div><h3>Site walk-through</h3><p>Every source, user, tank, line and outfall mapped and photographed.</p></div>
    <div class="step rv rv-d3"><div class="step__n">4</div><h3>Measurement</h3><p>Portable ultrasonic flow meters and sampling where meters are missing.</p></div>
    <div class="step rv"><div class="step__n">5</div><h3>Water balance</h3><p>Reconciled balance with unaccounted water quantified.</p></div>
    <div class="step rv rv-d1"><div class="step__n">6</div><h3>Benchmarking</h3><p>Specific water consumption compared against sector norms.</p></div>
    <div class="step rv rv-d2"><div class="step__n">7</div><h3>Opportunities</h3><p>Savings measures sized with capex, opex and payback.</p></div>
    <div class="step rv rv-d3"><div class="step__n">8</div><h3>Report &amp; roadmap</h3><p>Final report, presentation to management, credit readiness.</p></div>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head rv"><p class="eyebrow">Free tool</p><h2>Quick water balance check</h2><p class="lead">Enter your daily figures in kL/day. In seconds you'll see how much water is unaccounted for and how much of your wastewater you reuse.</p></div>
  <form class="tool rv" id="wb" onsubmit="return false">
    <div class="tool__in"><div class="form">
      <div class="fld"><label for="w1">Freshwater intake</label><input id="w1" type="number" name="intake" value="1000" min="0"><span class="hint">Municipal + borewell + tanker</span></div>
      <div class="fld"><label for="w2">Metered consumption</label><input id="w2" type="number" name="use" value="820" min="0"><span class="hint">Sum of all sub-meters</span></div>
      <div class="fld"><label for="w3">Wastewater generated</label><input id="w3" type="number" name="ww" value="650" min="0"></div>
      <div class="fld"><label for="w4">Treated water recycled</label><input id="w4" type="number" name="rec" value="200" min="0"></div>
      <div class="fld"><label for="w5">Discharged outside</label><input id="w5" type="number" name="dis" value="420" min="0"></div>
      <div class="fld"><label for="w6">Production (units/day)</label><input id="w6" type="number" name="prod" value="" min="0" placeholder="optional"><span class="hint">tonnes, pieces, beds or people</span></div>
    </div></div>
    <div class="tool__out" aria-live="polite">
      <h3>Your snapshot</h3>
      <div style="margin:.6rem 0 1rem">
        <div style="display:flex;justify-content:space-between"><span class="small">Unaccounted water</span><b id="w-unacc">0%</b></div><div class="meter"><i id="m-unacc"></i></div>
        <div style="display:flex;justify-content:space-between;margin-top:.8rem"><span class="small">Recycled share of total water use</span><b id="w-ratio">0%</b></div><div class="meter"><i id="m-ratio"></i></div>
        <div style="display:flex;justify-content:space-between;margin-top:.8rem"><span class="small">Wastewater recovered</span><b id="w-recov">0%</b></div><div class="meter"><i id="m-recov"></i></div>
        <div style="display:flex;justify-content:space-between;margin-top:.8rem"><span class="small">Specific water consumption</span><b id="w-swc">—</b></div>
      </div>
      <ul class="tick" id="w-flags" style="font-size:.88rem"></ul>
      <a class="btn btn--w btn--sm" style="align-self:flex-start;margin-top:auto" href="contact.html#meeting" data-meet="Water audit report">${icon.cal}Get a full audit</a>
    </div>
  </form>
</div></section>

<section class="sec sec--mist"><div class="wrap split split--top">
  <div class="rv">
    <p class="eyebrow">Deliverables</p>
    <h2>What's in your water audit report</h2>
    <p class="lead">A clear report, an editable data file and a management presentation. Everything is loaded into Watraq so you can track progress afterwards.</p>
    <ul class="tick">
      <li>Water balance diagram (Sankey) from source to discharge</li>
      <li>Metering adequacy and calibration status, with a meter plan</li>
      <li>Water quality summary for raw, treated and recycled water</li>
      <li>Rainwater harvesting and recharge potential</li>
      <li>Regulatory compliance checklist (CGWA, SPCB consent, BRSR)</li>
      <li>Action plan with capex, annual savings, payback and water credit potential</li>
    </ul>
  </div>
  <div class="rv rv-d2">
    <div class="card" style="padding:1.8rem">
      <h3>Request a water audit</h3>
      <p>Tell us about your site and we'll send a scope and quotation.</p>
      <form class="enq" data-subject="Water audit request — Watraq" novalidate>
        <div class="form">
          <div class="fld"><label for="a-name">Name <i>*</i></label><input id="a-name" name="name" data-label="Name" required></div>
          <div class="fld"><label for="a-email">Email <i>*</i></label><input id="a-email" name="email" type="email" data-label="Email" required></div>
          <div class="fld"><label for="a-org">Organisation <i>*</i></label><input id="a-org" name="org" data-label="Organisation" required></div>
          <div class="fld"><label for="a-phone">Phone</label><input id="a-phone" name="phone" type="tel" data-label="Phone"></div>
          <div class="fld"><label for="a-type">Audit type</label><select id="a-type" name="type" data-label="Audit type"><option>Industrial</option><option>Municipal</option><option>Building / campus</option><option>Agricultural</option></select></div>
          <div class="fld"><label for="a-vol">Approx. daily water use</label><input id="a-vol" name="volume" data-label="Daily water use" placeholder="e.g. 800 kL/day"></div>
          <div class="fld full"><label for="a-loc">Site location</label><input id="a-loc" name="location" data-label="Location" placeholder="City, State"></div>
          <div class="fld full"><label for="a-msg">Anything else?</label><textarea id="a-msg" name="message" data-label="Message"></textarea></div>
          <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px">
          <div class="full"><button class="btn btn--p btn--block" type="submit">${icon.mail}Send audit request</button></div>
          <div class="form-msg full" role="status" aria-live="polite"></div>
        </div>
      </form>
    </div>
  </div>
</div></section>
${cta("Your audit is the baseline for every credit.", "Start with a 30-minute scoping call. We'll confirm the boundary, data needed and timeline.")}
`,
},

/* ============================== PLATFORM ============================== */
{
  file: "platform.html",
  title: "Watraq Platform — Digital MRV for Water Credits | Watraq",
  desc: "The Watraq platform: IoT metering, live water balance, tamper-evident evidence vault, automated monitoring reports, water credit ledger and BRSR / ESG reporting for water projects.",
  ld: [crumbLd("Platform", "platform.html")],
  body: `
${phero("Platform", "From meter to registry, on one platform.", "Watraq is the data backbone of a water credit project. It collects every reading, checks it, stores the evidence, and produces the reports verifiers and regulators ask for.")}

<section class="sec"><div class="wrap split">
  <div class="rv">
    <p class="eyebrow">Overview</p>
    <h2>Digital MRV, purpose-built for water</h2>
    <p>Most water data sits in logbooks, spreadsheets and SCADA screens that nobody outside the plant can see. Watraq brings it together in one place, cleans it, and links each number to its evidence, so a verifier can trace any credit back to the meter reading behind it.</p>
    <ul class="tick">
      <li>Works with existing meters, SCADA and manual logs</li>
      <li>Multi-site, multi-project, role-based access</li>
      <li>Mobile app for field data and geotagged photos</li>
      <li>Exports to PDF, Excel and registry templates</li>
    </ul>
    <div class="btn-row"><a class="btn btn--p" href="contact.html#meeting" data-meet="Watraq platform demo">${icon.cal}Book a demo</a></div>
  </div>
  <div class="rv rv-d2" style="background:var(--grad-deep);padding:1.5rem;border-radius:var(--r-lg)">${dash()}</div>
</div></section>

<section class="sec sec--mist"><div class="wrap">
  <div class="sec-head rv"><p class="eyebrow">Modules</p><h2>Everything a water project needs</h2></div>
  <div class="grid g3">
    <div class="card rv"><div class="ico">${icon.cpu}</div><h3>Data capture</h3><p>IoT gateways for electromagnetic and ultrasonic flow meters, level sensors and quality analysers (pH, TSS, BOD, COD). Works offline and syncs later.</p></div>
    <div class="card rv rv-d1"><div class="ico">${icon.gauge}</div><h3>Water balance engine</h3><p>Daily balance per site and zone. Flags meter drift, gaps and imbalances automatically.</p></div>
    <div class="card rv rv-d2"><div class="ico">${icon.shield}</div><h3>Evidence vault</h3><p>Lab reports, calibration certificates, photos and invoices, each time-stamped and hash-linked into a tamper-evident log.</p></div>
    <div class="card rv"><div class="ico">${icon.layers}</div><h3>Methodology mapping</h3><p>Baseline, project and leakage calculations set up for the programme or standard you use.</p></div>
    <div class="card rv rv-d1"><div class="ico">${icon.file}</div><h3>Monitoring reports</h3><p>Monitoring reports and verification packs generated from live data in a few clicks.</p></div>
    <div class="card rv rv-d2"><div class="ico">${icon.coin}</div><h3>Credit ledger</h3><p>Estimated, verified, issued, transferred and retired credits, all tracked with serials.</p></div>
    <div class="card rv"><div class="ico">${icon.chart}</div><h3>ESG &amp; BRSR</h3><p>Water withdrawal, consumption, discharge and intensity metrics, ready for disclosure.</p></div>
    <div class="card rv rv-d1"><div class="ico">${icon.map}</div><h3>GIS view</h3><p>Map every asset: STPs, borewells, ponds, recharge pits and farm plots.</p></div>
    <div class="card rv rv-d2"><div class="ico">${icon.users}</div><h3>Group projects</h3><p>Combine hundreds of farms or buildings into one project, with fair benefit-sharing.</p></div>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head center rv"><p class="eyebrow">Data integrity</p><h2>Built so verifiers can trust it</h2></div>
  <div class="grid g3">
    <div class="card rv"><h3>Source-tagged readings</h3><p>Every value is tagged with where it came from (IoT, SCADA, manual or lab) and how confident we are in it.</p></div>
    <div class="card rv rv-d1"><h3>Immutable audit trail</h3><p>Edits never overwrite. Corrections are logged with who made them, when and why.</p></div>
    <div class="card rv rv-d2"><h3>No double counting</h3><p>A litre claimed once can't be claimed again by another project, buyer or report.</p></div>
  </div>
</div></section>
${cta("See Watraq on your own data.", "Book a demo and we'll load a sample of your water data into the platform.")}
`,
},

/* ============================== RESOURCES ============================== */
{
  file: "resources.html",
  title: "Water Credit Resources, Standards & FAQ | Watraq",
  desc: "Reference links to India's Green Credit Programme, AMRUT 2.0, the National Framework on Safe Reuse of Treated Water, CGWA, BRSR, WRI VWBA, AWS and ISO water standards, plus a glossary and FAQ.",
  ld: [crumbLd("Resources", "resources.html"), faqLd()],
  body: `
${phero("Resources", "Water credit resources and references.", "The regulations, standards and programmes behind water credits in India and worldwide, with a plain-English glossary.")}

<section class="sec"><div class="wrap">
  <div class="sec-head rv"><p class="eyebrow">Frameworks &amp; standards</p><h2>Official references</h2><p class="lead">Links open the official websites. Always check the latest notified version.</p></div>
  ${frameworks()}
  <div class="fw" style="margin-top:1rem">
    <a href="https://www.jalshakti-dowr.gov.in/" target="_blank" rel="noopener"><em>Govt. of India</em><b>Ministry of Jal Shakti</b><span>National water policy, missions and programmes</span></a>
    <a href="https://ataljal.mowr.gov.in/" target="_blank" rel="noopener"><em>Jal Shakti</em><b>Atal Bhujal Yojana</b><span>Community-led groundwater management</span></a>
    <a href="https://pmksy.gov.in/" target="_blank" rel="noopener"><em>Govt. of India</em><b>PMKSY: Per Drop More Crop</b><span>Support for micro-irrigation</span></a>
    <a href="https://cpcb.nic.in/" target="_blank" rel="noopener"><em>CPCB</em><b>Central Pollution Control Board</b><span>Effluent and sewage discharge standards</span></a>
  </div>
</div></section>

<section class="sec sec--mist"><div class="wrap">
  <div class="sec-head rv"><p class="eyebrow">Glossary</p><h2>Water credit terms, in plain English</h2></div>
  <div class="tbl-wrap rv"><table>
    <thead><tr><th style="width:24%">Term</th><th>Meaning</th></tr></thead>
    <tbody>
      <tr><td><b>Baseline</b></td><td>Water use or loss before the project, or what would have happened without it.</td></tr>
      <tr><td><b>Additionality</b></td><td>The benefit would not have happened without the project (for example, it isn't already legally required or financially automatic).</td></tr>
      <tr><td><b>MRV</b></td><td>Measurement, Reporting and Verification: the evidence chain behind every credit.</td></tr>
      <tr><td><b>NRW</b></td><td>Non-Revenue Water: water a utility produces but doesn't bill, through leaks, theft or meter error.</td></tr>
      <tr><td><b>KLD / MLD</b></td><td>Kilolitres per day / Million litres per day. 1 MLD = 1,000 KLD = 1,000 m³/day.</td></tr>
      <tr><td><b>SWC</b></td><td>Specific Water Consumption: water used per unit of product, per person or per acre.</td></tr>
      <tr><td><b>ZLD</b></td><td>Zero Liquid Discharge: all wastewater is treated and reused, with none discharged.</td></tr>
      <tr><td><b>STP / ETP</b></td><td>Sewage Treatment Plant / Effluent Treatment Plant.</td></tr>
      <tr><td><b>Water neutral / positive</b></td><td>Returning as much water (neutral) or more water (positive) than an organisation uses.</td></tr>
      <tr><td><b>Retirement</b></td><td>Permanently using a credit against a claim so it can't be sold again.</td></tr>
    </tbody>
  </table></div>
</div></section>

<section class="sec" id="faq"><div class="wrap">
  <div class="sec-head center rv"><p class="eyebrow">FAQ</p><h2>Frequently asked questions</h2></div>
  ${faq()}
</div></section>
${cta()}
`,
},

/* ================================ ABOUT ================================ */
{
  file: "about.html",
  title: "About Watraq — Developed by M Pro9 Private Limited",
  desc: "Watraq is a water credit and water audit platform developed by M Pro9 Private Limited, Mysuru, the team behind Wastraq and Karbantraq.",
  ld: [crumbLd("About", "about.html")],
  body: `
${phero("About", "Digitalising water credit, from Mysuru.", "Watraq is built by M Pro9 Private Limited, an environmental technology and consulting company that turns sustainability activity into trustworthy data.")}

<section class="sec"><div class="wrap split">
  <div class="rv">
    <p class="eyebrow">Our mission</p>
    <h2>Make every saved litre count, and pay off</h2>
    <p>Water projects in India often stall for a simple reason: the benefits are real but invisible. Nobody measures them well enough to pay for them. Watraq exists to fix that.</p>
    <p>We combine engineering water audits, practical project design and a digital MRV platform so that municipalities, industries, organisations and farmers can prove their water impact and be rewarded for it.</p>
    <ul class="tick">
      <li><b>Honest:</b> we tell you early if a project won't qualify</li>
      <li><b>Evidence-first:</b> metered data over assumptions</li>
      <li><b>Inclusive:</b> farmers and small towns deserve access to credit markets too</li>
    </ul>
  </div>
  <div class="rv rv-d2"><div class="card" style="padding:2rem;text-align:center"><img src="assets/img/watraq-logo.png" alt="Watraq — Digitalising Water Credit" width="720" height="186" style="margin:0 auto 1rem;width:min(340px,100%)" loading="lazy"><p>Watraq sits alongside M Pro9's other traceability platforms:</p>
    <div class="grid g2" style="text-align:left;margin-top:1rem">
      <div class="card" style="padding:1.1rem"><h4>Wastraq</h4><p class="small" style="margin:0">Digital waste traceability for EPR</p></div>
      <div class="card" style="padding:1.1rem"><h4>Karbantraq</h4><p class="small" style="margin:0">Carbon activity tracking &amp; MRV</p></div>
    </div></div></div>
</div></section>

<section class="sec sec--mist"><div class="wrap">
  <div class="sec-head rv"><p class="eyebrow">What we bring</p><h2>Engineering + data + compliance</h2></div>
  <div class="grid g3">
    <div class="card rv"><div class="ico">${icon.search}</div><h3>Water audit expertise</h3><p>Field audits across industry, municipal, campus and agricultural sites.</p></div>
    <div class="card rv rv-d1"><div class="ico">${icon.cpu}</div><h3>Digital MRV technology</h3><p>IoT, data platforms and reporting built in-house by M Pro9.</p></div>
    <div class="card rv rv-d2"><div class="ico">${icon.shield}</div><h3>Regulatory know-how</h3><p>Experience with EPR, carbon and environmental compliance in India.</p></div>
  </div>
</div></section>

<section class="sec"><div class="wrap">

  <div class="grid g2">
    <div class="card rv"><div class="ico">${icon.pin}</div><h3>India: Mysuru</h3><p>${ORG.street}, Mysuru 570004, Karnataka</p></div>
    <div class="card rv rv-d1"><div class="ico">${icon.pin}</div><h3>UAE: Dubai</h3><p>A2 Building, IFZA Business Park, Dubai Digital Park, Dubai</p></div>
  </div>
</div></section>
${cta()}
`,
},

/* =============================== CONTACT =============================== */
{
  file: "contact.html",
  title: "Contact & Schedule a Meeting | Watraq",
  desc: "Schedule a meeting with the Watraq team about water credits, water audit reports, recycling projects or a platform demo. Email info.mpro9@gmail.com.",
  ld: [crumbLd("Contact", "contact.html")],
  body: `
${phero("Contact", "Let's talk water.", "Pick a time for a call, or send us a note. We usually reply within one working day.")}

<section class="sec" id="meeting" style="scroll-margin-top:80px"><div class="wrap split split--top">
  <div class="rv">
    <p class="eyebrow">Schedule a meeting</p>
    <h2>Book a 30-minute consultation</h2>
    <p class="muted">Choose a date and time. Press confirm and your request is emailed to <b>${ORG.meetEmail}</b> instantly. You'll receive a confirmation with a calendar invite.</p>
    <div class="card" style="padding:1.6rem;margin-top:1.4rem">${meetForm("c")}</div>
  </div>
  <div class="rv rv-d2">
    <div class="card" style="padding:1.8rem;background:var(--grad-deep);border:0;color:#fff">
      <h3 style="color:#fff">Reach us directly</h3>
      <ul class="tick" style="color:rgba(255,255,255,.85)">
        <li><a style="color:#fff" href="mailto:${ORG.meetEmail}">${ORG.meetEmail}</a></li>
        <li><a style="color:#fff" href="tel:${ORG.phoneIntl}">${ORG.phone}</a></li>
        <li>${ORG.street}, Mysuru 570004, Karnataka, India</li>
        <li>Monday to Saturday, 10:00–18:00 IST</li>
      </ul>
      <a class="btn btn--w btn--sm" href="${ORG.url}" target="_blank" rel="noopener">M Pro9 Pvt Ltd${icon.arrow}</a>
    </div>
    <div class="card" style="padding:1.8rem;margin-top:1.25rem">
      <h3>Send a quick enquiry</h3>
      <form class="enq" data-subject="Website enquiry — Watraq" novalidate>
        <div class="form">
          <div class="fld"><label for="e-name">Name <i>*</i></label><input id="e-name" name="name" data-label="Name" required></div>
          <div class="fld"><label for="e-email">Email <i>*</i></label><input id="e-email" name="email" type="email" data-label="Email" required></div>
          <div class="fld full"><label for="e-int">Interested in</label><select id="e-int" name="interest" data-label="Interested in"><option>Earning water credits</option><option>Buying water credits</option><option>Water audit report</option><option>Recycling / reuse project</option><option>Platform demo</option><option>Partnership</option></select></div>
          <div class="fld full"><label for="e-msg">Message <i>*</i></label><textarea id="e-msg" name="message" data-label="Message" required></textarea></div>
          <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px">
          <div class="full"><button class="btn btn--p btn--block" type="submit">${icon.mail}Send enquiry</button></div>
          <div class="form-msg full" role="status" aria-live="polite"></div>
        </div>
      </form>
    </div>
  </div>
</div></section>
`,
},
];
