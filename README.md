# Watraq — Digitalising Water Credit

Marketing website for **Watraq**, a water credit, water audit and digital MRV platform
developed by **M Pro9 Private Limited** (https://mpro9.com/).

## Run it

    cd "/Users/nayimdalawai/Downloads/BWG Web/watertraq/server"
    npm install        # first time only
    npm start          # → http://localhost:8000   (Ctrl + C to stop)

The Node server shows the website and emails meeting requests and enquiries to info.mpro9@gmail.com
through Gmail. The Gmail app password is in `server/.env`. That file is private: never upload it
anywhere public or commit it (it is listed in `.gitignore`). The server refuses to serve `server/`,
`_source/` and hidden files.

Don't use `python3 -m http.server` any more. It serves every file in the folder, including `server/.env`.

**Hosting:** upload the folder to a host that runs Node.js (Render, Railway, a VPS, or cPanel "Setup Node.js App").
Set the start command to `node server/server.js`, and set `GMAIL_USER`, `GMAIL_APP_PASSWORD` and `NOTIFY_TO`
as environment variables in the host's dashboard rather than uploading `.env`. On static-only hosting the forms still
work: they fall back to opening the visitor's email app.

## Pages

    index.html          Home: sectors, 5-step pathway, estimator, audit, platform, frameworks, FAQ
    water-credits.html  How water credits work, eligible activities, market, lifecycle, estimator
    solutions.html      Municipalities · Industry · Organisations · Farmers & FPOs (#anchors)
    water-audit.html    Audit types, 8-step method, water balance checker, audit request form
    platform.html       Watraq digital MRV platform modules and data integrity
    resources.html      Official references, glossary, full FAQ (FAQPage schema)
    about.html          About Watraq and M Pro9 Pvt Ltd
    contact.html        Meeting scheduler (#meeting) and enquiry form
    assets/watraq.css   Design system (brand tokens in :root, sampled from the logo)
    assets/watraq.js    Scheduler, estimator, water balance checker, forms, animations
    assets/img/         Transparent logo variants made from watraq_water_track_HD.jpeg, favicons
    _source/            Node generator for the pages (optional)

## Editing

Pages are generated from `_source/`. Edit there, then run:

    node _source/build.mjs

- `_source/parts.mjs`: `SITE` (live domain, currently `https://watraq.mpro9.com`), company details, icons, shared blocks
- `_source/pages.mjs`: all page content
- `_source/build.mjs`: header, footer, meeting modal and page shell

If you edit the generated `.html` files directly, don't run the generator again or it will overwrite your changes.

## Schedule a Meeting

Every "Schedule a Meeting" button opens a scheduler. The visitor picks a date and an IST slot and presses
**Confirm meeting request**. The server then:

1. emails the full request to `info.mpro9@gmail.com`, with a calendar invite attached (press Reply to answer the visitor directly), and
2. emails the visitor a confirmation with the same invite.

The visitor can also add the meeting to Google Calendar or download an .ics file. The audit request and
enquiry forms are emailed the same way. A hidden spam-trap field and a per-IP rate limit (8 requests per 10 minutes) block simple bots.

**Optional live booking:** create a Google Calendar *Appointment schedule* and paste its link into
`BOOKING_PAGE_URL` in `assets/watraq.js` to show a "Pick a live slot" button.

## Before going live

- Set `SITE` in `_source/parts.mjs` to the real domain and rebuild (it feeds the canonical tags, social cards and sitemap).
- Review the dashboard figures on the Home and Platform pages. They are labelled illustrative.
- Add real case studies, client logos and team photos once they are approved.
