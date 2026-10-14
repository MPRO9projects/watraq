// Watraq site server: serves the static site and sends meeting / enquiry emails
// through Gmail SMTP. Credentials come from server/.env and never reach the browser.
//   cd server && npm install && npm start   →  http://localhost:8000
import http from "node:http";
import { readFileSync, existsSync, statSync, createReadStream } from "node:fs";
import { join, dirname, extname, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";

const here = dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = join(here, "..");

// ---- tiny .env loader (no extra dependency) ----
const envFile = join(here, ".env");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}
const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;
const NOTIFY_TO = process.env.NOTIFY_TO || GMAIL_USER;
const PORT = Number(process.env.PORT || 8000);
if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD in server/.env");
  process.exit(1);
}

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD.replace(/\s+/g, "") },
});

// ---- helpers ----
const clip = (v, n = 300) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, n);
const isEmail = (v) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(v);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const pad = (n) => String(n).padStart(2, "0");

const hits = new Map(); // simple per-IP rate limit: 8 requests / 10 min
const limited = (ip) => {
  const now = Date.now(), list = (hits.get(ip) || []).filter((t) => now - t < 600000);
  list.push(now); hits.set(ip, list);
  return list.length > 8;
};

const readJson = (req) => new Promise((resolve, reject) => {
  let body = "";
  req.on("data", (c) => { body += c; if (body.length > 20000) { reject(new Error("too large")); req.destroy(); } });
  req.on("end", () => { try { resolve(JSON.parse(body || "{}")); } catch { reject(new Error("bad json")); } });
});

const send = (res, code, obj) => { res.writeHead(code, { "Content-Type": "application/json" }); res.end(JSON.stringify(obj)); };

const table = (rows) => `<table style="border-collapse:collapse;font:14px Arial,sans-serif">${rows
  .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#5A6D73;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;color:#0B2429"><b>${esc(v || "—").replace(/\n/g, "<br>")}</b></td></tr>`).join("")}</table>`;

const wrapHtml = (title, inner) => `<div style="font:14px Arial,sans-serif;color:#1B2B30;max-width:600px">
<div style="background:#0B2429;color:#fff;padding:18px 22px;border-radius:10px 10px 0 0"><b style="font-size:18px">WATRAQ</b><span style="color:#7FD6EA"> · Digitalising Water Credit</span></div>
<div style="border:1px solid #DCE7EA;border-top:0;padding:22px;border-radius:0 0 10px 10px"><h2 style="margin:0 0 14px;color:#0B2429">${esc(title)}</h2>${inner}
<p style="color:#5A6D73;font-size:12px;margin-top:22px">Watraq is developed by M Pro9 Private Limited · mpro9.com</p></div></div>`;

// ---- meeting ----
const SLOTS = ["10:00","10:30","11:00","11:30","12:00","12:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];

function meeting(b) {
  const d = {
    name: clip(b.name, 120), email: clip(b.email, 160), phone: clip(b.phone, 40), org: clip(b.org, 160),
    entity: clip(b.entity, 80), topic: clip(b.topic, 120), date: clip(b.date, 10), time: clip(b.time, 5),
    dur: [30, 45, 60].includes(Number(b.duration)) ? Number(b.duration) : 30, mode: clip(b.mode, 80) || "Google Meet (online)",
    notes: String(b.notes ?? "").trim().slice(0, 2000),
  };
  if (!d.name || !isEmail(d.email) || !d.entity) return { error: "Please fill in your name, a valid email and who you are." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date) || !SLOTS.includes(d.time)) return { error: "Please choose a valid date and time." };
  const [y, mo, da] = d.date.split("-").map(Number), [h, mi] = d.time.split(":").map(Number);
  const startMin = h * 60 + mi;
  const start = new Date(Date.UTC(y, mo - 1, da, 0, startMin - 330)); // IST = UTC+05:30
  if (start.getTime() < Date.now()) return { error: "Please choose a future date." };
  if (new Date(Date.UTC(y, mo - 1, da)).getUTCDay() === 0) return { error: "We're closed on Sundays — please pick Monday to Saturday." };
  const end = new Date(start.getTime() + d.dur * 60000);
  const u = (x) => `${x.getUTCFullYear()}${pad(x.getUTCMonth() + 1)}${pad(x.getUTCDate())}T${pad(x.getUTCHours())}${pad(x.getUTCMinutes())}00Z`;
  d.when = new Date(Date.UTC(y, mo - 1, da)).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) + `, ${d.time} IST (${d.dur} min)`;
  d.title = `Watraq consultation — ${d.org || d.name}${d.topic ? ` (${d.topic})` : ""}`;
  d.location = /person/i.test(d.mode) ? "M Pro9 Pvt Ltd, #957/1A, 3rd Main, Sheshadri Iyer Road, Lakshmipuram, Mysuru 570004" : d.mode;
  const ie = (s) => String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
  d.ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//M Pro9 Pvt Ltd//Watraq//EN", "METHOD:REQUEST", "BEGIN:VEVENT",
    `UID:${Date.now()}-${Math.random().toString(36).slice(2)}@watraq`, `DTSTAMP:${u(new Date())}`, `DTSTART:${u(start)}`, `DTEND:${u(end)}`,
    `SUMMARY:${ie(d.title)}`, `DESCRIPTION:${ie(`Topic: ${d.topic}\nMode: ${d.mode}\nNotes: ${d.notes || "—"}`)}`, `LOCATION:${ie(d.location)}`,
    `ORGANIZER;CN=M Pro9 - Watraq:mailto:${GMAIL_USER}`,
    `ATTENDEE;CN=${ie(d.name)};RSVP=TRUE:mailto:${d.email}`,
    "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  return { d };
}

// ---- static files ----
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain", ".ico": "image/x-icon" };
function serveStatic(req, res) {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const file = normalize(join(SITE_ROOT, p));
  const rel = file.slice(SITE_ROOT.length + 1);
  const blocked = !file.startsWith(SITE_ROOT + sep) || /^(server|_source|node_modules)([\\/]|$)/.test(rel) || rel.split(/[\\/]/).some((s) => s.startsWith("."));
  if (blocked || !existsSync(file) || !statSync(file).isFile()) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found"); }
  res.writeHead(200, { "Content-Type": TYPES[extname(file).toLowerCase()] || "application/octet-stream" });
  createReadStream(file).pipe(res);
}

// ---- server ----
http.createServer(async (req, res) => {
  const path = new URL(req.url, "http://x").pathname;
  if (req.method === "GET" && path === "/api/health") return send(res, 200, { ok: true });
  if (req.method === "POST" && (path === "/api/meeting" || path === "/api/enquiry")) {
    const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.socket.remoteAddress;
    if (limited(ip)) return send(res, 429, { ok: false, error: "Too many requests. Please try again in a few minutes." });
    let b;
    try { b = await readJson(req); } catch { return send(res, 400, { ok: false, error: "Invalid request." }); }
    if (b.website) return send(res, 200, { ok: true }); // honeypot: bots fill hidden field
    try {
      if (path === "/api/meeting") {
        const { d, error } = meeting(b);
        if (error) return send(res, 400, { ok: false, error });
        const rows = [["Name", d.name], ["Organisation", d.org], ["Entity type", d.entity], ["Email", d.email], ["Phone", d.phone], ["Topic", d.topic], ["When", d.when], ["Mode", d.mode], ["Notes", d.notes]];
        const ics = { filename: "watraq-meeting.ics", content: d.ics, contentType: "text/calendar; charset=utf-8; method=REQUEST" };
        await mailer.sendMail({
          from: `"Watraq Website" <${GMAIL_USER}>`, to: NOTIFY_TO, replyTo: `"${d.name.replace(/"/g, "")}" <${d.email}>`,
          subject: `New meeting request: ${d.when} — ${d.org || d.name}`,
          html: wrapHtml("New meeting request", table(rows) + `<p style="margin-top:16px">Reply to this email to confirm or propose another time. The calendar invite is attached.</p>`),
          text: rows.map(([k, v]) => `${k}: ${v || "—"}`).join("\n"), attachments: [ics],
        });
        // Confirmation to the visitor; failure here should not fail the booking.
        mailer.sendMail({
          from: `"Watraq · M Pro9" <${GMAIL_USER}>`, to: d.email, replyTo: NOTIFY_TO,
          subject: `We received your meeting request — ${d.when}`,
          html: wrapHtml(`Thanks, ${d.name.split(" ")[0]}!`, `<p>We've received your request for a Watraq consultation. Our team will confirm the slot by email within one working day.</p>` + table([["When", d.when], ["Topic", d.topic], ["Mode", d.mode]])),
          text: `Thanks ${d.name}. We received your meeting request for ${d.when}. We'll confirm within one working day.`, attachments: [ics],
        }).catch((e) => console.warn("confirmation email failed:", e.message));
        console.log("meeting request:", d.when, d.email);
        return send(res, 200, { ok: true, when: d.when });
      }
      // enquiry
      const fields = Array.isArray(b.fields) ? b.fields.slice(0, 20).map(([k, v]) => [clip(k, 60), String(v ?? "").slice(0, 2000)]) : [];
      const email = fields.find(([k]) => /email/i.test(k))?.[1]?.trim() || "";
      const name = fields.find(([k]) => /name/i.test(k))?.[1]?.trim() || "Website visitor";
      if (!isEmail(email)) return send(res, 400, { ok: false, error: "Please enter a valid email." });
      const subject = clip(b.subject, 120) || "Watraq enquiry";
      await mailer.sendMail({
        from: `"Watraq Website" <${GMAIL_USER}>`, to: NOTIFY_TO, replyTo: `"${clip(name, 80).replace(/"/g, "")}" <${email}>`,
        subject: `${subject} — ${clip(name, 80)}`, html: wrapHtml(subject, table(fields)),
        text: fields.map(([k, v]) => `${k}: ${v || "—"}`).join("\n"),
      });
      console.log("enquiry:", subject, email);
      return send(res, 200, { ok: true });
    } catch (e) {
      console.error("mail error:", e.message);
      return send(res, 502, { ok: false, error: "We couldn't send your request just now. Please email " + NOTIFY_TO + "." });
    }
  }
  if (req.method === "GET" || req.method === "HEAD") return serveStatic(req, res);
  send(res, 405, { ok: false, error: "Method not allowed" });
}).on("error", (e) => {
  if (e.code === "EADDRINUSE") console.error(`Port ${PORT} is already in use. Stop the other server (Ctrl + C) or run: PORT=8010 npm start`);
  else console.error(e.message);
  process.exit(1);
}).listen(PORT, () => {
  console.log(`Watraq running at http://localhost:${PORT}`);
  mailer.verify().then(() => console.log("Gmail login OK — emails will be delivered to", NOTIFY_TO))
    .catch((e) => console.error("Gmail login FAILED:", e.message));
});
