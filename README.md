# NCAI website

Official bilingual (English and Portuguese) website and portfolio of **NCAI Consultorias e Serviços, EI**.
Built with Next.js (App Router), TypeScript, Tailwind CSS, next-intl and Motion.

## Run it on Windows

Requires Node.js 20 or newer.

```powershell
npm install
copy .env.example .env.local
npm run dev
```

Open http://localhost:3000. The root path redirects to `/en`; Portuguese lives at `/pt`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |

## Where things live

| Path | What it holds |
| --- | --- |
| `src/messages/en.json`, `pt.json` | All interface copy. Both files must keep identical keys. |
| `src/data/projects.ts` | The portfolio. `featuredOrder` puts a project on the homepage. |
| `src/data/services.ts` | The five services and the work linked to each. |
| `src/data/business.ts` | Verified contact details. |
| `src/styles/globals.css` | Design tokens and shared styles. |
| `public/images/projects/` | Optimised screenshots of the live projects. |

Portuguese uses Mozambican conventions and the spelling used in the brand copy ("Projecto", "desactualizado").

## Portfolio content rules

Project copy describes only what can be seen on the live site. Do not add clients, results, testimonials,
statistics or dates that have not been verified. `stack` lists only what the deployed site reveals.

SAAJ Virtual copy must keep these limits: Tonito and Manuela are AI virtual guides, not health professionals;
voice calls and appointment requests apply to Maxixe and Massinga only; appointments are requests, never
guaranteed; and there are no confidentiality or clinical outcome promises.

## Refreshing screenshots

Scripts in `tools/` use the installed Google Chrome and write raw captures to `tools/raw/` (gitignored).

```powershell
node tools/capture.mjs            # all sites, or pass slugs
node tools/saaj-app.mjs           # SAAJ onboarding; stops before any chat, call or booking
node tools/optimise.mjs           # publish selected frames as WebP
```

Review every frame before publishing. Late-loading images can capture as blanks, and the capture script hides
small floating widgets. `tools/qa.mjs` and `tools/interact.mjs` test a running production server.

## Deployment

Deploy from this repository on Vercel; the framework preset is detected automatically. Set
`NEXT_PUBLIC_SITE_URL` to the production URL, without a trailing slash, then redeploy. If it is unset, Vercel's
production domain is used. It is read at build time and drives canonical URLs, hreflang, the sitemap and social
metadata.
