# MovieNESIA

Dark-themed movie-browsing app (reference screenshot replica) — React + Vite + Tailwind + Electron (Windows) + Capacitor (Android). All data via **TMDB official API only** — no piracy sources.

Screenshot layout replicated exactly: navy #0b0e17, red #e50914, top nav, hero (backdrop+title+rating+genres+Book Now), horizontal poster row with active ring highlight, responsive.

## Quick start

```bash
# 1. Get TMDB key (free): https://www.themoviedb.org/settings/api → create → copy v3 API Key (32 hex chars)
cp .env.example .env
# edit .env: VITE_TMDB_API_KEY=YOUR_KEY_HERE

npm install
npm run dev          # web @ http://localhost:5173
npm run build        # production web build → dist/
npx vite preview     # preview dist/ @ :4173
npm run electron     # run Electron against dist/ (run build first)
```

## TMDB API

- Key in `.env` as `VITE_TMDB_API_KEY` (Vite injects at build; never commit `.env`).
- Endpoints: `trending/movie/week` (home hero + row), `discover/movie`, `discover/tv`, `movie/upcoming`, `watch/providers` (Book Now → TMDB providers page or Google).
- Images: `image.tmdb.org/t/p/w500` posters, `original` backdrops.
- If no key / demo key: UI shows error banner with instructions — app still builds.

## Windows installer (.exe)

```bash
npm run build
npm run build:win     # needs Windows or wine — outputs dist/MovieNESIA-Setup.exe
# or: npx electron-builder --win nsis
```

Config in `package.json` → `build`: `appId com.movienesia.app`, `productName MovieNESIA`, `win.target nsis`, icon `assets/icon.png` (replace with 512x512 PNG).

## Android APK (Capacitor)

Requires Android Studio + JDK 17 + Gradle.

```bash
npm run build
npx cap init MovieNESIA com.movienesia.app --web-dir=dist   # first time only (already in capacitor.config.json)
npx cap add android                                          # first time only
npx cap copy && npx cap sync
npx cap open android   # opens Android Studio → Build → Build APK(s)
# debug APK: android/app/build/outputs/apk/debug/app-debug.apk
# release: Build → Generate Signed Bundle/APK (needs keystore)
```

To update after UI changes: `npm run build && npx cap copy`.

## Project structure

```
src/
  api/tmdb.js          TMDB client (api_key, image helpers, genre map)
  components/Navbar.jsx  Top nav (Home/Tv Shows/Movies/Upcoming/login)
  components/Hero.jsx    Backdrop hero (title/rating/genres/synopsis/Book Now)
  components/PosterRow.jsx  Horizontal scrollable posters (active ring)
  pages/Home.jsx       Trending + hero-select wiring
  pages/GridPages.jsx  Movies / TV Shows / Upcoming grids
  pages/Login.jsx      Front-end only login (no backend)
electron/main.cjs      Electron main process (loads dist/ or VITE_DEV_SERVER_URL)
capacitor.config.json  appId com.movienesia.app, webDir dist
```

## Replace app icon

Replace `assets/icon.png` with 512×512 (Windows) and 1024×1024 source; rebuild both targets.

## Notes

- `vite.config.js` `base: './'` so `file://` (Electron) loads correctly.
- `Book Now` opens TMDB watch/providers page for that title — legal provider links only.
