# SSR, SEO & GTM Implementation Plan

**Project:** Infinium Softech website (Next.js 16)
**Status:** Draft
**Last updated:** 2026-09-07

---

## Summary

**What we need to deliver:**
- The site must be **server-rendered** — pages arrive as ready-made HTML, not built in the visitor's browser.
- The site must be **fully SEO friendly**.
- Every page needs a **title and description stored in a JSON file** (not hardcoded).
- **Google Tag Manager** needs to be added.

**Where we are today:** the site has a real Header, Footer, and homepage Banner (hero) built from the actual brand reference — logo, nav, copy, and product screenshot are real, not placeholders. SEO info is still hardcoded in one place instead of coming from JSON. No Google Tag Manager yet. No other pages exist yet.

**The four decisions in this plan:**

1. **Rendering:** Keep pages pre-built ("static"), don't force the server to rebuild every page on every single visit. It's faster, and Next.js already sends search engines the complete page either way, so there's no SEO downside.
2. **SEO data:** One JSON file lists every page's title/description. Everything else (the actual page tags, the sitemap, Google's rich search snippets) is generated from that one file — so nothing can ever be out of sync, and a page can't go live without SEO info (the build fails if it's missing).
3. **GTM:** Use Google's official Next.js package. It's flagged "experimental" by Google/Next themselves (not a red flag, just means the package name/API could still shift), so we pin a version. One manual step is required that the package doesn't do automatically — explained below.
4. **What's not in this plan:** A list of extra SEO items (favicon, 404 page, image alt text, etc.) that matter but aren't blockers — tracked separately so nothing is assumed "done" by accident.

**Build order:** SEO system first → GTM second → try both on one real page to make sure it works → add aa safety check so it can't be forgotten later → everything else (contact form, etc.) only once we actually need it.

Everything below explains each decision in plain terms, then gives the exact files and code to write.

---

## 1. Rendering: how pages get built

**In plain terms:** a webpage can be built in two places — on the server, before it's sent to the visitor, or in the visitor's browser, after the page has already loaded (using JavaScript). Search engines mostly just read whatever arrives first. If the real content only appears after browser JavaScript runs, a search engine can see a mostly empty page.

The good news: every page in this project is already built on the server, by default. So the "must be SSR" requirement is already true — this section is really about **not accidentally breaking that** as more pages get built.

One nuance, already proven in the real Header component: a small piece of site chrome (like the header's mobile-menu toggle) is allowed to use browser JavaScript (`'use client'`) for its *interactive behavior* without breaking this rule — because Next.js still builds that component's HTML on the server for the very first response either way. `'use client'` only means "this also becomes interactive after JavaScript loads," not "this skips the server." We confirmed this directly: the header's nav links and text are present in the raw server-rendered HTML, with or without JavaScript. The rule below is really about not letting a page's *main content* depend on the browser to even appear — not about banning `'use client'` outright.

**The one real decision to make:** should the server rebuild a page fresh on *every single visit*, or build it *once* and reuse that same result for every visitor until something changes?

- Building once and reusing it (**what we're doing**) is faster for visitors and cheaper to run, because the page can be cached. This is correct for marketing pages — the homepage looks the same for every visitor.
- Rebuilding on every visit only matters if a page shows something different per visitor (e.g. "Welcome back, [name]"). We don't have any pages like that yet.
- Either way, Google gets the exact same complete page — Next.js 16 guarantees search engine crawlers always receive the full page content, regardless of which of the two options above is used. So "rebuild every visit" would not improve SEO at all here — it would only make the site slower.

**Rules to follow so this stays true as new pages get built:**

- Site chrome (header, a mobile-menu toggle, a small button) can use `'use client'` freely — it's still server-rendered on first load. What must **never** happen is a page's own file (`page.tsx`) or its main heading/copy being wrapped in `'use client'`, or the actual page content only appearing after a browser fetch.
- Don't load the main content in a way that skips server-building (`next/dynamic(..., { ssr: false })`).
- Don't turn on "static export" mode (`output: "export"` in `next.config.ts`) — it would quietly disable the backend logic the future contact form needs.
- Build the future contact form as a normal page with a server-side form handler, not a page that only works after JavaScript loads in the browser.
- Keep every page's title/description simple and instant (from the JSON file below) rather than fetched live from a database — this keeps the page tags present immediately, for search engines and for link previews on WhatsApp/social media alike.

---

## 2. SEO: title and description from one JSON file

**In plain terms:** think of `seo.json` as one spreadsheet with a row per page — a title and a description for each. Every other place that needs that information (the actual page `<title>`, the sitemap, Google's search-result snippets, social-share previews) reads from that same spreadsheet, instead of having its own separate copy. That means they can never disagree with each other, and a developer only ever edits one place.

```
seo.json  (the one spreadsheet)
   │
   ├──▶  the page's title/description tags
   ├──▶  the sitemap (list of pages for Google)
   └──▶  structured data (the extra info Google can show in search results)
```

### 2.1 The file — `src/content/seo.json` (new)

```json
{
  "site": {
    "name": "Infinium Softech",
    "url": "https://www.infiniumsoftech.com",
    "titleTemplate": "%s | Infinium Softech",
    "defaultOgImage": "/og/default.png",
    "twitterSite": "@infiniumsoftech",
    "locale": "en_US",
    "organization": {
      "name": "Infinium Softech",
      "url": "https://www.infiniumsoftech.com",
      "logo": "https://www.infiniumsoftech.com/logo.png",
      "sameAs": ["https://www.linkedin.com/company/infinium-softech"]
    }
  },
  "routes": {
    "/": {
      "title": "Custom Software, Web & Mobile Development",
      "description": "Infinium Softech designs and builds custom software, web platforms, and mobile apps for growing businesses.",
      "changeFrequency": "weekly",
      "priority": 1.0
    },
    "/about": {
      "title": "About Us",
      "description": "Learn about Infinium Softech's mission, team, and approach to building software that lasts.",
      "changeFrequency": "monthly",
      "priority": 0.7
    }
  }
}
```

Every real page gets one entry in `routes`, keyed by its URL path. (Pages that pull content from a database later — like blog posts — get their own rule; not needed yet since we don't have any.)

### 2.2 A small helper that reads the file — add to `src/lib/seo.ts`

```ts
import type { Metadata } from "next";
import seo from "@/content/seo.json";

type RouteKey = keyof typeof seo.routes;

export function getPageMetadata(routeKey: RouteKey): Metadata {
  const entry = seo.routes[routeKey];

  if (!entry?.title || !entry?.description) {
    throw new Error(`seo.json is missing an entry for "${String(routeKey)}"`);
  }

  const path = routeKey === "/" ? "" : routeKey;
  const canonical = `${SITE_URL}${path}`;

  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical },
    openGraph: { title: entry.title, description: entry.description, url: canonical },
  };
}
```

What this does, in plain terms: every page calls `getPageMetadata("/its-own-path")`, and this function looks that path up in `seo.json` and builds everything Next.js needs from it. Two things are deliberate:

- **If a page's entry is missing, the website fails to build** (rather than quietly showing a blank or wrong title). This is on purpose — it's the mechanism that actually guarantees every page has SEO info, instead of relying on nobody forgetting.
- Because the JSON file is read directly by the code, misspelling a page's path (e.g. typing `/aobut` instead of `/about`) gets caught immediately while writing the code, before it's even run.

### 2.3 Connecting it to the rest of the site

- **Every page** adds one line: `export const metadata = getPageMetadata("/its-path")`.
- **`src/app/sitemap.ts`** (the list of pages Google is told about) gets rewritten to read `seo.json` automatically, instead of being a hand-typed list — so it can never fall out of date.
- **`src/app/robots.ts`** (tells search engines what they're allowed to crawl) stays mostly the same. One rule to remember: never block a page from being crawled if we also want to hide it from search results with a "noindex" tag — if it's blocked, Google can never even see that tag.
- **A safety check** (a small script, `scripts/check-seo-coverage.mjs`) runs automatically every time the site is built. It looks at every page in the project and fails the build if any page doesn't have a matching entry in `seo.json`. This is the actual guarantee behind "every page has SEO info" — not a rule someone has to remember, but something the computer checks every time.

---

## 3. Adding Google Tag Manager

**In plain terms:** Google Tag Manager (GTM) is a small script that lets marketing add tracking tags (Google Ads, Analytics, etc.) later without needing a developer to change code each time. We add one container script once, and everything else gets configured inside Google's GTM website.

Two things below were double-checked directly (not guessed):

> ✅ Google's own package for this, `@next/third-parties`, is officially labeled **"experimental"** in Next.js's documentation. That doesn't mean it's broken — it means we should pin an exact version rather than always taking the newest one automatically.
>
> ✅ We read the actual code of that package's `GoogleTagManager` component. It only adds **half** of what Google's tracking snippet normally includes — the part for visitors with JavaScript on. The other half (a fallback for the rare visitor with JavaScript turned off) has to be added by hand, or those visits won't be tracked at all.

### 3.1 Setup steps

1. Install the package: `@next/third-parties`.
2. Add the GTM ID as a setting (not hardcoded in the code) — in a new `.env.example` file, as `NEXT_PUBLIC_GTM_ID`.
3. Add this to the site's root layout (`src/app/layout.tsx`):

```tsx
import { GoogleTagManager } from "@next/third-parties/google";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
```

The `GTM_ID &&` part means: if no GTM ID is set (like on a developer's own laptop), nothing gets added at all — so test/preview versions of the site never accidentally send fake tracking data.

### 3.2 Actually use it, not just install it

Just adding the script doesn't track anything useful by itself — it needs at least one real action to measure. Once the contact form exists, send an event when someone submits it:

```tsx
"use client";
import { sendGTMEvent } from "@next/third-parties/google";

sendGTMEvent({ event: "contact_form_submitted" });
```

---

## 4. Step-by-step build order

Do these in order — each step should work correctly before moving to the next one.

### Step 1 — SEO system
- [ ] Create `src/content/seo.json` with the site info and the homepage entry.
- [ ] Add `getPageMetadata()` (and the JSON-based route type) to `src/lib/seo.ts`.
- [ ] Update `src/app/layout.tsx` and `src/app/page.tsx` to use it.
- [ ] Rewrite `src/app/sitemap.ts` to read from `seo.json` instead of being hand-typed.
- [ ] Add the "don't block a page you also noindex" comment to `src/app/robots.ts`.

### Step 2 — Google Tag Manager
- [ ] Install `@next/third-parties`.
- [ ] Add `.env.example` with `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_SITE_URL`.
- [ ] Add the GTM component + the manual fallback to `src/app/layout.tsx`.

### Step 3 — Test it on one real page
- [ ] Build the first real page (e.g. an About page) using the same pattern.
- [ ] Add its entry to `seo.json`.
- [ ] Run `next build` and check the new page still shows as pre-built (not rebuilt-per-visit) in the output.

### Step 4 — Make it permanent
- [ ] Add the automatic safety check (`scripts/check-seo-coverage.mjs`) so the build fails if a page is missing SEO info.
- [ ] Replace the placeholder domain in `src/lib/seo.ts` with the real one, once known.

### Step 5 — Later, only when actually needed
- [ ] Contact form, wired to send a GTM event on submit.
- [ ] Any page pulling from a database (blog, etc.) — different rule than a plain hardcoded page, not needed yet.

---

## 5. Not in this plan yet (tracked, not forgotten)

These are real parts of a fully SEO-ready site, but they're separate from the four requirements above, so they're not included in Steps 1–4:

- A custom "page not found" screen and error page (currently using Next.js's plain default ones)
- Favicon and app icon setup
- A decision on URL formatting (trailing slash, www vs. no-www) so Google doesn't see two versions of the same page
- A consistent rule for image `alt` text
- Verifying site ownership with Google Search Console
- Checking that titles/descriptions aren't too long for Google to display in full
- Custom social-share preview images per page (currently one shared image for all pages)
- Cookie-consent handling for Google Tag Manager (needed for EU/UK visitors)
- Manually testing the final result: Google's Rich Results Test, a social-share preview check, submitting the sitemap to Search Console

Suggest treating these as a follow-up pass once Steps 1–4 above are done and working.

---

## 6. Questions we still need answered

| # | Question | Why it matters |
|---|---|---|
| 1 | What's the real production domain? | Used everywhere — page links, sitemap, social previews |
| 2 | What's the real GTM container ID? | Needed before tracking works at all |
| 3 | Where will the site be hosted (Vercel or elsewhere)? | Affects how we tell a test version of the site apart from the live one |
| 4 | Any pages planned that pull from a database (blog, case studies)? | Changes how those specific pages handle SEO info |
| 5 | Any page that needs to look different per visitor (login, etc.)? | Only reason to reconsider the rendering decision in Section 1 |
| 6 | Default share image, logo, and social media links? | Needed to fill in `seo.json` properly |
| 7 | One language, or more than one? | Affects the file structure if we need translations later |

---

## Where this plan came from

This was written by reading the actual Next.js 16 documentation that ships inside this project (`node_modules/next/dist/docs/`), and by reading the real source code of the Google Tag Manager package — not from memory, since Next.js 16 is new enough that general knowledge about it can be outdated.
