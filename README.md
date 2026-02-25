<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## System Overview

The site auto-discovers media (stills/photos) from folders under `src/assets/projects/**` and assembles content from small TypeScript data files in `src/data/projects/**`.

### Key Folders

- Media (auto-scanned)
  - Films: `src/assets/projects/films/<projectId>/`
    - Optional BTS: `src/assets/projects/films/<projectId>/<projectId>BehindScenes/`
  - Documentaries: `src/assets/projects/documentaries/<projectId>/`
  - Photography: `src/assets/projects/photographies/`
    - Albums = leaf folders, e.g. `motors_and_blues/`, `voyages/bardenas2025/`, `voyages/Irlande2025/`, ...

- Data (hand-authored, tiny files)
  - Films: `src/data/projects/films/<projectId>.ts`
  - Documentaries: `src/data/projects/documentaries/<projectId>.ts`
  - Photography album metadata (optional, for localized titles/descriptions):
    `src/data/projects/photographies/<albumId>.ts`

- Aggregator & Types
  - Aggregator: `src/data/portfolio.ts` (builds `PROJECTS` and `PHOTOGRAPHY_ALBUMS`)
  - Types: `src/data/types.ts` (`ProjectData`, `PhotoAlbumMeta`)

### How Media Is Found

- Images are loaded via Vite `import.meta.glob` and matched case-insensitively: `{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}`.
- Films/Docs: all images in the project folder become the gallery. First image is the cover. BTS are read from the `<projectId>BehindScenes` subfolder if present.
- Photography: every leaf folder under `src/assets/projects/photographies/**` becomes an album automatically. Titles/descriptions come from an optional metadata file; otherwise a prettified folder name is used.

## Add a New Film/Documentary

1. Put stills (and optional BTS) here:
   - Films: `src/assets/projects/films/<projectId>/`
     - BTS (optional): `src/assets/projects/films/<projectId>/<projectId>BehindScenes/`
   - Docs: `src/assets/projects/documentaries/<projectId>/`
2. Create a data file exporting `ProjectData`:
   - Films: `src/data/projects/films/<projectId>.ts`
   - Docs: `src/data/projects/documentaries/<projectId>.ts`
   - No manual image listing needed — images are auto-globbed from the folders above.
3. Register the project in `src/data/portfolio.ts` by importing your file and adding it to the `PROJECTS` array.

Notes:

- `videoUrl` can be a YouTube/Vimeo URL (embedded automatically) or `#` to show a static cover.
- The first discovered image is used as the cover thumbnail.

## Add a New Photography Album

1. Create a folder with your photos under:
   - `src/assets/projects/photographies/<albumId>/`
   - or nested under voyages, e.g. `src/assets/projects/photographies/voyages/<tripId>/`
2. (Optional) Add localized metadata for title/description:
   - `src/data/projects/photographies/<albumId>.ts`
   - Must export a `PhotoAlbumMeta` with fields `{ id, title: {FR, ENG}, description?: {FR, ENG} }`.

That’s it — albums are generated automatically, and all images inside the album folder appear on the “Mur de photographies”.

## Troubleshooting

- Nothing appears in the photography wall:
  - Ensure photos are under `src/assets/projects/photographies/**` (not `src/assets/photographies/**`).
  - Check file extensions are one of: `png/jpg/jpeg/webp` (any case).
  - If you moved many files, restart the dev server to let Vite re-scan.

## Deployment (GitHub Pages)

Yes — this Vite app builds to static files and can be hosted on GitHub Pages.

1) Set the correct base path

- If your repository is `username.github.io` (user/organization site), keep base as `/` (default).
- If your repository is a project site (e.g. `username/portfolio`), set `base` in [vite.config.ts](vite.config.ts):

```ts
// vite.config.ts
export default defineConfig(({ mode }) => ({
   base: '/portfolio/', // replace with your REPO name, keep the leading/trailing slashes
   // ...rest of config
}))
```

2) Recommended: GitHub Actions (auto-deploy on push to `main`)

Create `.github/workflows/deploy.yml` with:

```yaml
name: Deploy to GitHub Pages
on:
   push:
      branches: [ main ]
   workflow_dispatch: {}

permissions:
   contents: read
   pages: write
   id-token: write

jobs:
   build:
      runs-on: ubuntu-latest
      steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
            with:
               node-version: 20
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v3
            with:
               path: dist
   deploy:
      needs: build
      runs-on: ubuntu-latest
      environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
      steps:
         - id: deployment
            uses: actions/deploy-pages@v4
```

Then in the repository: Settings → Pages → Build and deployment → Source: “GitHub Actions”.

3) Alternative: Manual publish to `gh-pages` branch

```bash
npm run build
git add -f dist
git commit -m "Publish site"
git subtree push --prefix dist origin gh-pages
```

Finally set Settings → Pages → Branch: `gh-pages` / folder `root`.

Notes
- After changing `base`, rebuild before deploying: `npm run build`.
- If you later rename the repository, update `base` accordingly.
