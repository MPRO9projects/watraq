// Watraq site generator — run `node _source/build.mjs` from the project root.
// Shared layout (head, header, meeting modal, footer) lives here; each page
// supplies only its <main> content. Output: static .html files in the root.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { pages } from "./pages.mjs";
import { SITE, ORG, icon } from "./parts.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const NAV = [
  ["index.html", "Home"],
  ["water-credits.html", "Water Credits"],
  ["solutions.html", "Solutions"],
  ["water-audit.html", "Water Audit"],
  ["platform.html", "Platform"],
  ["resources.html", "Resources"],
  ["about.html", "About"],
  ["contact.html", "Contact"],
];

const navLinks = (cur) =>
  NAV.map(([h, t]) => `<a href="${h}"${h === cur ? ' class="on" aria-current="page"' : ""}>${t}</a>`).join("");

const meetForm = (p) => `<form class="meet" novalidate>
  <div class="form">
    <div class="fld"><label for="${p}-name">Full name <i>*</i></label><input id="${p}-name" name="name" autocomplete="name" required></div>
    <div class="fld"><label for="${p}-email">Work email <i>*</i></label><input id="${p}-email" name="email" type="email" autocomplete="email" required></div>
    <div class="fld"><label for="${p}-phone">Phone / WhatsApp</label><input id="${p}-phone" name="phone" type="tel" autocomplete="tel" placeholder="+91"></div>
    <div class="fld"><label for="${p}-org">Organisation</label><input id="${p}-org" name="org" autocomplete="organization"></div>
    <div class="fld"><label for="${p}-entity">You are a <i>*</i></label><select id="${p}-entity" name="entity" required>
      <option value="">Select…</option><option>Municipality / ULB</option><option>Industry</option><option>Corporate / Organisation</option><option>Farmer / FPO</option><option>Real estate / Campus</option><option>Investor / Credit buyer</option><option>Other</option></select></div>
    <div class="fld"><label for="${p}-topic">Topic</label><select id="${p}-topic" name="topic">
      <option>Water credit feasibility</option><option>Water audit report</option><option>Recycling &amp; reuse project</option><option>Watraq platform demo</option><option>BRSR / ESG water disclosure</option><option>Partnership</option></select></div>
    <div class="fld"><label for="${p}-date">Preferred date <i>*</i></label><input id="${p}-date" name="date" type="date" required><span class="hint">Monday to Saturday, Indian Standard Time</span></div>
    <div class="fld"><label for="${p}-time">Time (IST) <i>*</i></label><select id="${p}-time" name="time" required>
      <option value="">Select…</option>${["10:00","10:30","11:00","11:30","12:00","12:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"].map((t) => `<option>${t}</option>`).join("")}</select></div>
    <div class="fld full"><span class="fld__l" style="font-size:.84rem;font-weight:600;color:var(--ink)">Duration</span>
      <div class="chips" role="radiogroup" aria-label="Duration">
        <label><input type="radio" name="duration" value="30" checked><span>30 min</span></label>
        <label><input type="radio" name="duration" value="45"><span>45 min</span></label>
        <label><input type="radio" name="duration" value="60"><span>60 min</span></label>
      </div></div>
    <div class="fld full"><span style="font-size:.84rem;font-weight:600;color:var(--ink)">Meeting mode</span>
      <div class="chips" role="radiogroup" aria-label="Meeting mode">
        <label><input type="radio" name="mode" value="Google Meet (online)" checked><span>Google Meet</span></label>
        <label><input type="radio" name="mode" value="Phone call"><span>Phone call</span></label>
        <label><input type="radio" name="mode" value="In person — Mysuru office"><span>In person, Mysuru</span></label>
      </div></div>
    <div class="fld full"><label for="${p}-notes">What would you like to discuss?</label><textarea id="${p}-notes" name="notes" placeholder="e.g. 5 MLD STP, want to sell treated water to industry and explore water credits"></textarea></div>
  </div>
  <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px">
  <button class="btn btn--p btn--block" data-act="send" style="margin-top:1.3rem">${icon.cal}Confirm meeting request</button>
  <div class="meet-actions" style="grid-template-columns:repeat(2,1fr);margin-top:.7rem">
    <button class="btn btn--o btn--sm" data-act="gcal">Also add to Google Calendar</button>
    <button class="btn btn--o btn--sm" data-act="ics">${icon.down}Outlook / Apple (.ics)</button>
    <a class="btn btn--o btn--sm" data-act="live" hidden target="_blank" rel="noopener">Pick a live slot</a>
  </div>
  <p class="small muted" style="margin:1rem 0 0">Your request is emailed straight to <a href="mailto:${ORG.meetEmail}">${ORG.meetEmail}</a>, and you'll get a confirmation with a calendar invite. We confirm every slot within one working day.</p>
  <div class="form-msg" role="status" aria-live="polite" style="margin-top:1rem"></div>
</form>`;

const layout = (pg) => {
  const url = SITE + "/" + (pg.file === "index.html" ? "" : pg.file);
  const ld = [
    {
      "@context": "https://schema.org", "@type": "Organization", name: "Watraq", url: SITE,
      logo: SITE + "/assets/img/watraq-logo.png", slogan: "Digitalising Water Credit",
      parentOrganization: { "@type": "Organization", name: ORG.name, url: ORG.url },
      email: ORG.meetEmail,
      contactPoint: [{ "@type": "ContactPoint", telephone: ORG.phoneIntl, contactType: "sales", email: ORG.meetEmail, areaServed: "IN" }],
      address: { "@type": "PostalAddress", streetAddress: ORG.street, addressLocality: "Mysuru", postalCode: "570004", addressRegion: "Karnataka", addressCountry: "IN" },
    },
    ...(pg.ld || []),
  ];
  return `<!DOCTYPE html>
<html lang="en-IN" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${pg.title}</title>
<meta name="description" content="${pg.desc}">
<meta name="author" content="${ORG.name}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Watraq">
<meta property="og:title" content="${pg.title}">
<meta property="og:description" content="${pg.desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/assets/img/og-image.jpg">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0B2429">
<link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32.png">
<link rel="apple-touch-icon" href="assets/img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/watraq.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a href="#main" class="skip">Skip to content</a>
<header class="hdr">
  <div class="hdr__in">
    <a class="logo" href="index.html" aria-label="Watraq home"><img src="assets/img/watraq-wordmark.png" alt="Watraq" width="480" height="115"></a>
    <nav class="nav" aria-label="Main">${navLinks(pg.file)}</nav>
    <a class="btn btn--p btn--sm btn--hdr" href="contact.html#meeting" data-meet>${icon.cal}Schedule a Meeting</a>
    <button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="mnav"><span></span></button>
  </div>
</header>
<nav class="mnav" id="mnav" aria-label="Mobile">${navLinks(pg.file)}<a class="btn btn--p" href="contact.html#meeting" data-meet>${icon.cal}Schedule a Meeting</a></nav>
<main id="main">
${pg.body}
</main>
<footer class="ftr">
  <div class="wrap">
    <div class="ftr__g">
      <div>
        <img src="assets/img/watraq-logo-light.png" alt="Watraq — Digitalising Water Credit" width="720" height="186">
        <p>Measure, recycle, verify and monetise water. Watraq helps municipalities, organisations, industries and farmers turn water stewardship into verified water credits.</p>
        <p class="small">A product of <a href="${ORG.url}" target="_blank" rel="noopener"><b>${ORG.name}</b></a></p>
      </div>
      <div><h4>Explore</h4><ul>
        <li><a href="water-credits.html">How water credits work</a></li>
        <li><a href="solutions.html">Solutions by sector</a></li>
        <li><a href="water-audit.html">Water audit reports</a></li>
        <li><a href="platform.html">Watraq platform</a></li>
        <li><a href="resources.html">Resources &amp; FAQ</a></li>
      </ul></div>
      <div><h4>Who we serve</h4><ul>
        <li><a href="solutions.html#municipalities">Municipalities</a></li>
        <li><a href="solutions.html#industry">Industry</a></li>
        <li><a href="solutions.html#organisations">Organisations</a></li>
        <li><a href="solutions.html#farmers">Farmers &amp; FPOs</a></li>
      </ul></div>
      <div><h4>Get in touch</h4><ul>
        <li><a href="mailto:${ORG.meetEmail}">${ORG.meetEmail}</a></li>
        <li><a href="tel:${ORG.phoneIntl}">${ORG.phone}</a></li>
        <li>${ORG.street}, Mysuru 570004, Karnataka</li>
        <li><a href="contact.html#meeting" data-meet>Schedule a meeting →</a></li>
      </ul></div>
    </div>
    <div class="ftr__b">
      <span>© <span data-year>2026</span> ${ORG.name}. All rights reserved.</span>
      <span>Watraq is developed by <a href="${ORG.url}" target="_blank" rel="noopener">M Pro9 Pvt Ltd</a></span>
    </div>
  </div>
</footer>
<a class="btn btn--p fab" href="contact.html#meeting" data-meet>${icon.cal}Schedule a Meeting</a>
<div class="modal" id="meetModal" role="dialog" aria-modal="true" aria-labelledby="meetTitle">
  <div class="modal__box">
    <div class="modal__hd"><div><h2 id="meetTitle">Schedule a meeting</h2><p>Talk to the Watraq team about water credits, recycling projects or a water audit. Choose a slot and send it in one click.</p></div><button class="modal__x" aria-label="Close">×</button></div>
    <div class="modal__bd">${meetForm("m")}</div>
  </div>
</div>
<div class="modal modal--thanks" id="thanksModal" role="dialog" aria-modal="true" aria-labelledby="thanksTitle">
  <div class="modal__box thanks">
    <div class="thanks__ico" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" fill="none"/><path fill="none" d="M15 27l7 7 15-16"/></svg></div>
    <h2 id="thanksTitle">Thank you!</h2>
    <p class="thanks__lead" id="thanksText">Your meeting request has been sent.</p>
    <div class="thanks__when" id="thanksWhen" hidden></div>
    <p class="small muted" id="thanksNote">A confirmation email with a calendar invite is on its way. Our team will confirm your slot within one working day.</p>
    <button class="btn btn--p" data-close>Done</button>
  </div>
</div>
<script src="assets/watraq.js"></script>
</body>
</html>
`;
};

const ctx = { meetForm };
for (const pg of pages(ctx)) {
  writeFileSync(join(root, pg.file), layout(pg));
  console.log("wrote", pg.file);
}

writeFileSync(join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${NAV.map(([h]) => `  <url><loc>${SITE}/${h === "index.html" ? "" : h}</loc></url>`).join("\n")}
</urlset>
`);
writeFileSync(join(root, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log("wrote sitemap.xml, robots.txt");
