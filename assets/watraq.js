/* ==========================================================================
   WATRAQ — interaction layer
   No backend required: meetings and enquiries are routed to MEETING_EMAIL
   through Google Calendar, the visitor's mail client, or an .ics invite.
   ========================================================================== */
(function () {
  "use strict";

  var MEETING_EMAIL = "info.mpro9@gmail.com";
  var TZ = "Asia/Kolkata";
  /* Optional: paste a Google Calendar "Appointment schedule" booking link here
     and an extra "Pick a live slot" button appears in the scheduler. */
  var BOOKING_PAGE_URL = "";

  document.documentElement.classList.remove("no-js");
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var fmt = function (n, d) { return Number(n).toLocaleString("en-IN", { maximumFractionDigits: d == null ? 0 : d }); };

  /* ---------- Header ---------- */
  var hdr = $(".hdr");
  var fab = $(".fab");
  var onScroll = function () { if (hdr) hdr.classList.toggle("is-scrolled", window.scrollY > 8); if (fab) fab.classList.toggle("show", window.scrollY > 520); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var burger = $(".burger"), mnav = $("#mnav");
  if (burger && mnav) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") !== "true";
      burger.setAttribute("aria-expanded", open);
      mnav.classList.toggle("open", open);
      document.body.classList.toggle("lock", open);
    });
    $$("a", mnav).forEach(function (a) { a.addEventListener("click", function () {
      burger.setAttribute("aria-expanded", "false"); mnav.classList.remove("open"); document.body.classList.remove("lock");
    }); });
  }

  /* ---------- Reveal + dashboard bars ---------- */
  var reveal = function (el) {
    el.classList.add("in");
    $$(".dash__chart i", el).forEach(function (b) { b.style.height = b.getAttribute("data-h") + "%"; });
  };
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$(".rv").forEach(function (el) { io.observe(el); });
  } else { $$(".rv").forEach(reveal); }

  /* ---------- Hero bubbles ---------- */
  var bub = $(".bubbles");
  if (bub && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (var i = 0; i < 14; i++) {
      var s = document.createElement("span"), sz = 8 + Math.random() * 34;
      s.style.cssText = "width:" + sz + "px;height:" + sz + "px;left:" + (Math.random() * 100) + "%;animation-duration:" +
        (12 + Math.random() * 16) + "s;animation-delay:-" + (Math.random() * 20) + "s";
      bub.appendChild(s);
    }
  }

  /* ---------- Count-up ---------- */
  $$("[data-count]").forEach(function (el) {
    var end = parseFloat(el.getAttribute("data-count")), suf = el.getAttribute("data-suffix") || "", done = false;
    var run = function () {
      if (done) return; done = true;
      var t0 = performance.now();
      (function tick(t) {
        var p = Math.min(1, (t - t0) / 1400), v = end * (1 - Math.pow(1 - p, 3));
        el.textContent = fmt(v, end % 1 ? 1 : 0) + suf;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { run(); o.disconnect(); } }).observe(el);
    } else run();
  });

  /* ---------- Form helpers ---------- */
  var val = function (form, name) { var f = form.elements[name]; if (!f) return ""; if (f.length && !f.tagName) { for (var i = 0; i < f.length; i++) if (f[i].checked) return f[i].value; return ""; } return (f.value || "").trim(); };
  var validate = function (form) {
    var ok = true, first = null;
    $$("[required]", form).forEach(function (f) {
      var wrap = f.closest(".fld"), bad = !f.value.trim() || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
      if (wrap) wrap.classList.toggle("err", bad);
      if (bad) { ok = false; if (!first) first = f; }
    });
    if (first) first.focus();
    return ok;
  };
  var showMsg = function (form, text, bad) {
    var m = $(".form-msg", form); if (!m) return;
    m.textContent = text; m.classList.add("show"); m.classList.toggle("bad", !!bad);
  };
  var mailto = function (subject, body) {
    window.location.href = "mailto:" + MEETING_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  };

  /* POST to the site server (server/server.js). Resolves false when no server
     is available (e.g. static hosting), so callers can fall back to mailto. */
  var post = function (url, payload) {
    return fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) {
        if (r.status === 404 || r.status === 405 || r.status === 501) return false;
        return r.json().then(function (j) { if (!j.ok) throw new Error(j.error || "Request failed"); return true; });
      }, function () { return false; });
  };
  var busy = function (btn, on) { btn.disabled = on; btn.style.opacity = on ? ".65" : ""; };

  /* ---------- Thank-you popup ---------- */
  var thanks = $("#thanksModal");
  var showThanks = function (o) {
    var mm = $("#meetModal");
    if (mm && mm.classList.contains("open")) mm.classList.remove("open");
    if (!thanks) { alert(o.title + "\n\n" + o.text); return; }
    $("#thanksTitle").textContent = o.title || "Thank you!";
    $("#thanksText").textContent = o.text || "";
    var w = $("#thanksWhen"); w.hidden = !o.when; w.textContent = o.when ? "📅 " + o.when : "";
    $("#thanksNote").textContent = o.note || "";
    thanks.classList.add("open"); document.body.classList.add("lock");
    setTimeout(function () { $("[data-close]", thanks).focus(); }, 50);
  };
  var hideThanks = function () { if (!thanks) return; thanks.classList.remove("open"); document.body.classList.remove("lock"); };
  if (thanks) {
    thanks.addEventListener("click", function (e) { if (e.target === thanks || e.target.closest("[data-close]")) hideThanks(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && thanks.classList.contains("open")) hideThanks(); });
  }
  var clearMsg = function (form) { var m = $(".form-msg", form); if (m) { m.classList.remove("show", "bad"); m.textContent = ""; } };

  /* ---------- Meeting scheduler ---------- */
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  var tomorrow = function () { var d = new Date(); d.setDate(d.getDate() + 1); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };

  var meetingData = function (form) {
    var d = {
      name: val(form, "name"), email: val(form, "email"), phone: val(form, "phone"), org: val(form, "org"),
      entity: val(form, "entity"), topic: val(form, "topic"), date: val(form, "date"), time: val(form, "time"),
      dur: parseInt(val(form, "duration") || "30", 10), mode: val(form, "mode") || "Google Meet (online)", notes: val(form, "notes")
    };
    var p = d.date.split("-").map(Number), t = d.time.split(":").map(Number);
    var startMin = t[0] * 60 + t[1], endMin = startMin + d.dur;
    d.local = function (mins) { return p[0] + pad(p[1]) + pad(p[2]) + "T" + pad(Math.floor(mins / 60)) + pad(mins % 60) + "00"; };
    d.start = d.local(startMin); d.end = d.local(endMin);
    /* IST is UTC+05:30 with no daylight saving */
    var utc = function (mins) { var x = new Date(Date.UTC(p[0], p[1] - 1, p[2], 0, mins - 330)); return x.getUTCFullYear() + pad(x.getUTCMonth() + 1) + pad(x.getUTCDate()) + "T" + pad(x.getUTCHours()) + pad(x.getUTCMinutes()) + "00Z"; };
    d.startUtc = utc(startMin); d.endUtc = utc(endMin);
    d.title = "Watraq consultation — " + (d.org || d.name) + (d.topic ? " (" + d.topic + ")" : "");
    var when = new Date(p[0], p[1] - 1, p[2]).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    d.whenText = when + ", " + d.time + " IST (" + d.dur + " min)";
    d.details = [
      "Meeting request via watraq website",
      "",
      "Name: " + d.name,
      "Organisation: " + (d.org || "—"),
      "Entity type: " + (d.entity || "—"),
      "Email: " + d.email,
      "Phone: " + (d.phone || "—"),
      "Topic: " + (d.topic || "—"),
      "Preferred mode: " + d.mode,
      "When: " + d.whenText,
      "",
      "Notes: " + (d.notes || "—"),
      "",
      "Watraq — Digitalising Water Credit | Developed by M Pro9 Pvt Ltd (mpro9.com)"
    ].join("\n");
    d.location = /person/i.test(d.mode) ? "M Pro9 Pvt Ltd, #957/1A, 3rd Main, Sheshadri Iyer Road, Lakshmipuram, Mysuru 570004" : d.mode;
    return d;
  };

  var checkDate = function (form) {
    var f = form.elements.date; if (!f || !f.value) return true;
    var day = new Date(f.value + "T00:00:00").getDay(), wrap = f.closest(".fld"), hint = wrap && $(".hint", wrap);
    if (day === 0) { if (hint) hint.textContent = "Sundays are closed — please pick Monday to Saturday."; wrap.classList.add("err"); return false; }
    if (hint) hint.textContent = "Monday to Saturday, Indian Standard Time"; wrap.classList.remove("err"); return true;
  };

  var buildIcs = function (d) {
    var esc = function (s) { return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); };
    var stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    return [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//M Pro9 Pvt Ltd//Watraq//EN", "CALSCALE:GREGORIAN", "METHOD:REQUEST",
      "BEGIN:VEVENT",
      "UID:" + Date.now() + "-" + Math.random().toString(36).slice(2) + "@watraq",
      "DTSTAMP:" + stamp, "DTSTART:" + d.startUtc, "DTEND:" + d.endUtc,
      "SUMMARY:" + esc(d.title), "DESCRIPTION:" + esc(d.details), "LOCATION:" + esc(d.location),
      "ORGANIZER;CN=M Pro9 - Watraq:mailto:" + MEETING_EMAIL,
      "ATTENDEE;CN=M Pro9 - Watraq;RSVP=TRUE:mailto:" + MEETING_EMAIL,
      "ATTENDEE;CN=" + esc(d.name) + ";RSVP=TRUE:mailto:" + d.email,
      "BEGIN:VALARM", "TRIGGER:-PT30M", "ACTION:DISPLAY", "DESCRIPTION:Watraq meeting", "END:VALARM",
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
  };

  var initMeeting = function (form) {
    var df = form.elements.date; if (df) { df.min = tomorrow(); df.addEventListener("change", function () { checkDate(form); }); }
    if (BOOKING_PAGE_URL) {
      var live = $("[data-act=live]", form); if (live) { live.hidden = false; live.href = BOOKING_PAGE_URL; }
    }
    $$("[data-act]", form).forEach(function (b) {
      if (b.getAttribute("data-act") === "live") return;
      b.addEventListener("click", function (e) {
        e.preventDefault();
        if (!validate(form) || !checkDate(form)) { showMsg(form, "Please complete the highlighted fields.", true); return; }
        var d = meetingData(form), act = b.getAttribute("data-act");
        if (act === "send") {
          if (form.elements.website && form.elements.website.value) return;
          var payload = {};
          ["name","email","phone","org","entity","topic","date","time","duration","mode","notes"].forEach(function (k) { payload[k] = val(form, k); });
          var label = b.innerHTML; busy(b, true); clearMsg(form); b.textContent = "Sending…";
          post("/api/meeting", payload).then(function (sent) {
            busy(b, false); b.innerHTML = label;
            if (sent) {
              form.reset();
              showThanks({ title: "Thank you, " + d.name.split(" ")[0] + "!", text: "Your meeting request has been sent to the Watraq team.", when: d.whenText,
                note: "A confirmation email with a calendar invite is on its way to " + d.email + ". We'll confirm your slot within one working day." });
            } else {
              mailto("Meeting request: " + d.title, d.details);
              showThanks({ title: "Almost done!", text: "Your email app has opened with your request addressed to " + MEETING_EMAIL + ".", when: d.whenText,
                note: "Press send in your email app and we'll confirm within one working day." });
            }
          }).catch(function (err) { busy(b, false); b.innerHTML = label; showMsg(form, err.message, true); });
        } else if (act === "gcal") {
          var url = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
            "&text=" + encodeURIComponent(d.title) + "&dates=" + d.start + "/" + d.end + "&ctz=" + TZ +
            "&details=" + encodeURIComponent(d.details) + "&location=" + encodeURIComponent(d.location) +
            "&add=" + encodeURIComponent(MEETING_EMAIL);
          window.open(url, "_blank", "noopener");
          showMsg(form, "Google Calendar has opened with " + MEETING_EMAIL + " added as a guest. Press Save and send the invite to confirm your slot — our team will reply to accept or propose a new time.");
        } else if (act === "email") {
          mailto("Meeting request: " + d.title, d.details);
          showMsg(form, "Your email app has opened with the request addressed to " + MEETING_EMAIL + ". Send it and we will confirm within one working day.");
        } else if (act === "ics") {
          var blob = new Blob([buildIcs(d)], { type: "text/calendar;charset=utf-8" }), a = document.createElement("a");
          a.href = URL.createObjectURL(blob); a.download = "watraq-meeting.ics"; document.body.appendChild(a); a.click();
          setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
          showMsg(form, "Invite downloaded. Open it in Outlook or Apple Calendar and send it — " + MEETING_EMAIL + " is already on the guest list.");
        }
      });
    });
    $$("input,select,textarea", form).forEach(function (f) { f.addEventListener("input", function () { var w = f.closest(".fld"); if (w) w.classList.remove("err"); }); });
  };
  $$("form.meet").forEach(initMeeting);

  /* Modal */
  var modal = $("#meetModal"), lastFocus = null;
  var openModal = function (topic) {
    if (!modal) return false;
    lastFocus = document.activeElement;
    modal.classList.add("open"); document.body.classList.add("lock");
    if (topic) { var t = modal.querySelector("[name=topic]"); if (t) t.value = topic; }
    setTimeout(function () { var f = modal.querySelector("input"); if (f) f.focus(); }, 50);
    return true;
  };
  var closeModal = function () { if (!modal) return; modal.classList.remove("open"); document.body.classList.remove("lock"); if (lastFocus) lastFocus.focus(); };
  $$("[data-meet]").forEach(function (b) {
    b.addEventListener("click", function (e) { if (openModal(b.getAttribute("data-meet"))) e.preventDefault(); });
  });
  if (modal) {
    modal.addEventListener("click", function (e) { if (e.target === modal || e.target.closest(".modal__x")) closeModal(); });
    document.addEventListener("keydown", function (e) {
      if (!modal.classList.contains("open")) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab") {
        var f = $$("a[href],button:not([hidden]),input,select,textarea", modal).filter(function (x) { return x.offsetParent !== null; });
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
  }
  if (location.hash === "#schedule") openModal();

  /* ---------- Enquiry forms (server, falls back to mailto) ---------- */
  $$("form.enq").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(form)) { showMsg(form, "Please complete the highlighted fields.", true); return; }
      var lines = [], pairs = [];
      $$("input,select,textarea", form).forEach(function (f) {
        if (!f.name || f.name === "website" || f.type === "submit" || ((f.type === "radio" || f.type === "checkbox") && !f.checked)) return;
        var lab = f.getAttribute("data-label") || f.name; lines.push(lab + ": " + (f.value || "—")); pairs.push([lab, f.value]);
      });
      if (form.elements.website && form.elements.website.value) return;
      var subject = form.getAttribute("data-subject") || "Watraq enquiry", btn = $("[type=submit]", form);
      var label = btn.innerHTML; busy(btn, true); clearMsg(form); btn.textContent = "Sending…";
      post("/api/enquiry", { subject: subject, fields: pairs }).then(function (sent) {
        busy(btn, false); btn.innerHTML = label;
        if (sent) { form.reset(); showThanks({ title: "Thank you!", text: "Your message has been sent to the Watraq team.", note: "We'll reply within one working day." }); return; }
        mailto(subject, lines.concat(["", "Sent from the Watraq website"]).join("\n"));
        showThanks({ title: "Almost done!", text: "Your email app has opened with your message addressed to " + MEETING_EMAIL + ".", note: "Press send in your email app and we'll reply within one working day." });
      }).catch(function (err) { busy(btn, false); btn.innerHTML = label; showMsg(form, err.message, true); });
    });
  });

  /* ---------- Water benefit estimator ---------- */
  var calc = $("#calc");
  if (calc) {
    var panes = $$("[data-pane]", calc);
    var syncPane = function () {
      var t = val(calc, "itype");
      panes.forEach(function (p) { p.hidden = p.getAttribute("data-pane") !== t; });
    };
    /* keep range + number inputs in step */
    $$(".rng", calc).forEach(function (r) {
      var n = $("input[type=number]", r), s = $("input[type=range]", r);
      s.addEventListener("input", function () { n.value = s.value; run(); });
      n.addEventListener("input", function () { s.value = n.value; run(); });
    });
    var num = function (n) { var v = parseFloat(val(calc, n)); return isFinite(v) && v > 0 ? v : 0; };
    var run = function () {
      syncPane();
      var t = val(calc, "itype"), m3 = 0, basis = "";
      if (t === "reuse") { m3 = num("kld") * num("days"); basis = fmt(num("kld")) + " kL/day × " + fmt(num("days")) + " days"; }
      if (t === "rwh") { m3 = num("area") * (num("rain") / 1000) * num("coef") * 0.8; basis = fmt(num("area")) + " m² × " + fmt(num("rain")) + " mm × runoff " + num("coef") + " × 80% capture"; }
      if (t === "drip") { m3 = num("acres") * 4046.86 * (num("depth") / 1000) * (num("save") / 100); basis = fmt(num("acres"), 1) + " acres × " + fmt(num("depth")) + " mm × " + fmt(num("save")) + "% saving"; }
      if (t === "nrw") { m3 = num("mld") * 1000 * 365 * (num("pp") / 100); basis = fmt(num("mld"), 1) + " MLD × 365 days × " + fmt(num("pp"), 1) + " % points"; }
      var buf = parseFloat(val(calc, "buffer")) || 0, net = m3 * (1 - buf / 100), tariff = num("tariff");
      $("#r-net").textContent = fmt(net);
      $("#r-gross").textContent = fmt(m3 / 1000, 1);
      $("#r-ml").textContent = fmt(net / 1000, 1);
      $("#r-cost").textContent = "₹" + (tariff * m3 >= 1e7 ? fmt(tariff * m3 / 1e7, 2) + " Cr" : tariff * m3 >= 1e5 ? fmt(tariff * m3 / 1e5, 2) + " L" : fmt(tariff * m3));
      $("#r-people").textContent = fmt(m3 * 1000 / (135 * 365));
      $("#r-basis").textContent = basis + (buf ? " − " + buf + "% conservative buffer" : "");
    };
    $$("input,select", calc).forEach(function (f) { f.addEventListener("input", run); f.addEventListener("change", run); });
    run();
  }

  /* ---------- Water balance checker ---------- */
  var wb = $("#wb");
  if (wb) {
    var n = function (k) { var v = parseFloat(val(wb, k)); return isFinite(v) && v >= 0 ? v : 0; };
    var bar = function (id, pct) { var el = $(id); if (el) el.style.width = Math.max(0, Math.min(100, pct)) + "%"; };
    var runWb = function () {
      var intake = n("intake"), use = n("use"), ww = n("ww"), rec = n("rec"), dis = n("dis"), prod = n("prod");
      var unacc = intake > 0 ? Math.max(0, (intake - use) / intake * 100) : 0;
      var ratio = intake + rec > 0 ? rec / (intake + rec) * 100 : 0;
      var recov = ww > 0 ? Math.min(100, rec / ww * 100) : 0;
      $("#w-unacc").textContent = fmt(unacc, 1) + "%"; bar("#m-unacc", unacc * 3);
      $("#w-ratio").textContent = fmt(ratio, 1) + "%"; bar("#m-ratio", ratio);
      $("#w-recov").textContent = fmt(recov, 1) + "%"; bar("#m-recov", recov);
      $("#w-swc").textContent = prod > 0 ? fmt(intake / prod * 1000, 0) + " L/unit" : "—";
      var f = [];
      if (unacc > 15) f.push("Unaccounted water above 15% — a leak survey and sub-metering are the first priority.");
      else if (unacc > 5) f.push("Unaccounted water of " + fmt(unacc, 1) + "% — sub-metering will show where it goes.");
      else if (intake) f.push("Water balance closes well — good metering discipline.");
      if (ww && recov < 50) f.push("Less than half your wastewater is reused — recycling is likely your largest water-credit opportunity.");
      if (ww && recov >= 50 && dis > 0) f.push("Strong reuse. Closing the loop on the remaining " + fmt(dis) + " kL/day discharge moves you toward ZLD.");
      if (ww && dis === 0 && rec > 0) f.push("Zero discharge reported — document this with metered evidence; it is valuable for credits and compliance.");
      $("#w-flags").innerHTML = f.map(function (x) { return "<li>" + x + "</li>"; }).join("");
    };
    $$("input", wb).forEach(function (f) { f.addEventListener("input", runWb); });
    runWb();
  }

  /* ---------- Year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
