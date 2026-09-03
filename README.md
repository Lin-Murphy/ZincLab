# Zinc Lab

Static Astro + TypeScript studio site. It ships no React runtime, remote fonts, remote scripts, or third-party media runtime.

## Local preview

```powershell
pnpm install
pnpm dev
```

Open the printed local address. The public language routes are `/en/` and `/zh/`; `/` uses a saved language choice when available and otherwise opens English (a provisional launch decision). Use `pnpm build` to generate the deployable static site in `dist/`, then upload the contents of that directory to the Alibaba Cloud OSS origin used by CDN.

## Content handoff

- `src/content/home-films/` — one Markdown entry per home-film segment. `title`, `label` and image `alt` are required in English and Chinese; `videoSrc` remains self-hosted.
- `src/content/talents/` — one Markdown entry per talent, with required English and Chinese profile fields.
- `src/content/projects/` — one Markdown entry per project, with required English and Chinese project fields.
- `src/content.config.ts` — shared schema. This is the stable boundary for a future Sanity adapter.
- `public/media/home/placeholder/` — four self-hosted temporary Home MP4s and matching posters. Read its `README.md` before replacement; every file is explicitly marked as a non-production placeholder in the UI and content.
- `public/media/` — self-hosted media only. The current visual studies are explicitly marked placeholders in content and UI.
- `public/fonts/` — drop licensed WOFF2 files here when the final Latin and Chinese typefaces are approved.

## Quality checks

```powershell
pnpm test
pnpm check
pnpm build
```
