<div align="center">

# Kreator Studio OS

**A 100% headless content-creator studio you fully own.**
Clone it to your own Vercel + Convex, sign in, and run everything — content planner,
brand voice, scripts, carousels, newsletters, monetization, storefront — from one
admin dashboard. No code required.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rahmanef63/template-kreator-studio-os)

![Next.js 16](https://img.shields.io/badge/Next.js-16-black)
![React 19](https://img.shields.io/badge/React-19-149eca)
![Convex](https://img.shields.io/badge/Convex-realtime-orange)
![Tailwind 4](https://img.shields.io/badge/Tailwind-4-38bdf8)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

[**Live demo**](https://kreator-studio-os.vercel.app)

</div>

---

## What is this?

A **clone-to-own** content hub for creators and content studios. Deploy it to **your**
infrastructure and you get a full creator workspace plus a public studio site — both fed
from **your** Convex database, managed entirely from the admin dashboard. The frontend is
stateless, so updates never touch your data.

- 🎬 **For your audience / clients** — a fast, SEO-ready public studio site (showcase, pricing packages, journal, testimonials, checkout).
- 🛠️ **For you** — an admin workspace to plan content, train your voice, write scripts, build carousels, send newsletters, track performance and monetization — zero coding.
- 🔒 **Yours** — your repo, your Vercel, your Convex. No vendor lock-in.

## ✨ Features

- **Headless content studio on Convex** — content planner (idea → draft → scheduled → published
  across Instagram, TikTok, YouTube, Twitter, LinkedIn, newsletter), brand-voice training,
  script writer, carousel builder, asset library, newsletter composer, performance analytics,
  comment inbox, and monetization (sponsor/affiliate/product/course/subscription + payouts).
  Realtime, all edited from `/dashboard/admin`.
- **Public studio site** — showcase/portfolio, pricing packages, journal (blog), testimonials,
  featured clients, an About page (working principles + timeline), and guest **storefront checkout**
  with DOKU payment and shareable order pages.
- **Onboarding wizard** — first-run setup wizard captures site name, tagline, branding, theme and
  marks the workspace onboarded.
- **Keyless first-owner claim** — deploy → open `/admin` → the first signup claims ownership with
  no secret, then signups auto-close. Auth keys auto-provision at build.
- **One-click sample content** — seed a fully populated studio from the dashboard (`seed:seedSample`),
  no terminal.
- **Branding from the dashboard** — site name, tagline, logo, **favicon**, brand colour, light/dark/system
  theme plus a **theme preset** picker. Stored in Convex and applied across the site at runtime.
- **One-button image picker** everywhere — gallery · upload · paste-URL · curated Unsplash
  (`UNSPLASH_ACCESS_KEY` optional; falls back to a curated set).
- **AI assistant FAB** — Claude-powered helper wired to the `ai-chat` slice via `@ai-sdk/anthropic`;
  degrades gracefully to a "set API key" notice when `ANTHROPIC_API_KEY` is unset (build never needs it).
- **Secure admin & roles** — optional invite/lock key (`ADMIN_SIGNUP_KEY`) or auto-owner from env
  (`ADMIN_EMAIL` / `ADMIN_PASSWORD`); real roles (owner / admin / editor / viewer) surfaced in the
  admin Users panel.
- **Admin operations panel** — AI config, audit log (real admin-activity stream), webhooks + deliveries,
  API keys, integrations, and analytics.
- **`/setup` health page** — a plain-language checklist of what's done and what's left (owner claimed,
  onboarding, content seeded, signup key), each step linking to its fix.
- **In-app updates** — admin sees current vs latest version (`version.json` / `lib/headless-core/`) and
  rebuilds in one click via a Vercel deploy hook.
- **Backup & restore** — download / re-import all your content as JSON, no terminal.
- **Demo / clone stages** — a "Deploy your own" ribbon shows on the demo only (`NEXT_PUBLIC_DEMO`).
- **Tested clones** — `npm run smoke` checks a clone can deploy (local, no CI cost).

## 🚀 Quick start (non-coder)

1. Click **[Deploy with Vercel](https://vercel.com/new/clone?repository-url=https://github.com/rahmanef63/template-kreator-studio-os)** → connect GitHub → add the **Convex** integration → Deploy.
2. Open `https://your-site.vercel.app/admin` → sign up (the **first account claims ownership**).
3. Finish the **onboarding wizard**, then click **"Seed sample content"** to fill the studio. Done.

`/admin` redirects to `/dashboard/admin`. Stuck? Open `/setup` for a live checklist of what's left.

## 💻 Local development

```bash
npm install --legacy-peer-deps
cp .env.example .env.local        # set NEXT_PUBLIC_CONVEX_URL
npx convex dev --once             # generates convex/_generated
npm run dev                       # http://localhost:3000
```

## 🔐 Environment — two places

Variables live in **two** dashboards. The Deploy/clone button only fills the Vercel ones;
set the Convex ones in the Convex dashboard (or let the build do it).

| Variable | Where | Required | Purpose |
|----------|-------|----------|---------|
| `NEXT_PUBLIC_CONVEX_URL` | Vercel | ✅ | Convex deployment URL (`.convex.cloud`) |
| `CONVEX_DEPLOY_KEY` | Vercel | ✅ | deploys functions + schema at build — needs capabilities `deploy` + `env:view` + `env:write` (or full access) |
| `JWT_PRIVATE_KEY` / `JWKS` / `SITE_URL` | Convex | ✅ | login signing — **auto-set at build** by `scripts/setup-auth.mjs` (or `npx @convex-dev/auth`) |
| `ADMIN_SIGNUP_KEY` | Convex | – | invite key for extra admins / lock first signup |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Convex | – | auto-create the owner on first load |
| `VERCEL_DEPLOY_HOOK_URL` | Convex | – | enables the admin "Rebuild now" in-app update button |
| `UNSPLASH_ACCESS_KEY` | Convex | – | image-picker Unsplash tab (falls back to curated set) |
| `ANTHROPIC_API_KEY` | Convex | – | enables the AI assistant FAB |
| `NEXT_PUBLIC_DEMO` | Vercel | – | demo only — shows the "Deploy your own" ribbon |

> `vercel.json` sets the Build Command to `npm run build:auto`, which runs `convex deploy`
> automatically when `CONVEX_DEPLOY_KEY` is present — leave the Vercel **Build Command** at its
> default, the file overrides it.

## 🧱 Tech stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router, `proxy.ts`) |
| UI | React 19 · Tailwind CSS 4 · shadcn/ui · Recharts |
| Backend / DB | Convex (cloud or self-hosted) — realtime |
| Auth | `@convex-dev/auth` (Password + optional GitHub/Google OAuth) |
| Theme | next-themes (light / dark / system) + theme presets |
| Images | `image-picker` slice (gallery · upload · link · Unsplash) |
| AI | `ai` SDK + `@ai-sdk/anthropic` (Claude) |
| Payments | storefront checkout + DOKU payment |

## 🗂️ Project structure

```
app/
  (public)/        public studio — home, showcase, pricing, journal, testimonials,
                   about, checkout/order (+ loading/error/404)
  dashboard/admin/ admin workspace — planner, voice, scripts, carousels, assets,
                   newsletter, performance, comments, monetization, packages,
                   showcase, journal, pages, landing, settings + admin-panel
  admin/           redirect → /dashboard/admin
  setup/           /setup health checklist
  api/unsplash/    image-picker Unsplash proxy
  icon.tsx         default favicon
convex/
  schema.ts        auth + content + siteSettings + admin-panel tables
  auth.ts setup.ts settings.ts backup.ts update.ts seed.ts files.ts  …function modules
  adminPanel_*.ts  AI config · analytics · audit log · users · webhooks · settings
  features/        comments · notion · payment slices
lib/headless-core/ version manifest + headless settings core
components/
  onboarding/      onboarding wizard      admin/  backup + update cards
  setup/           /setup health view     demo-ribbon.tsx · ai-chat-fab.tsx
  public-chrome.tsx nav/footer with branding from siteSettings
frontend/slices/   portable feature slices (image-picker, theme-presets, checkout, …)
scripts/setup-auth.mjs  build-time JWT key provisioning  ·  smoke-test.mjs
version.json       single source of version truth (in-app update channel)
```

## 🗺️ Roadmap

- [x] **headless-core** module + version manifest (`lib/headless-core/`)
- [x] One-click **"Update available"** in admin
- [x] One-click **backup / restore**
- [x] Roles (owner / admin / editor / viewer) — surfaced in the admin Users panel
- [x] **`/setup`** health page + clone **smoke-test**
- [x] Onboarding wizard + theme presets
- [x] Storefront checkout + DOKU payment + guest order pages
- [ ] Per-action RBAC across the admin panel
- [ ] Optional Resend "forgot password" flow

## 📄 License

MIT © Rahman ([rahmanef.com](https://rahmanef.com))

<div align="center"><sub>Built with <a href="https://resource.rahmanef.com">rahman-resources</a>.</sub></div>
