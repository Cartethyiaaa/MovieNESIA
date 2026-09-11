# MovieNESIA

Mobile-first movie & TV browsing app — React + Vite + Tailwind, packaged with Capacitor (Android) and Electron (Windows). All data via the **official TMDB API only**.

UI follows a bottom-tab layout (Home / Discover / Saved / Profile) with a dark navy + plum header, genre chips, trending/top-rated rows, and a local profile with a watchlist and view history. No backend or account system — everything (watchlist, profile, history) is stored on-device with `localStorage`.

## ⚠️ Important fix in this version

`capacitor.config.json` was pointing the Android build at a remote website
(`server.url: "https://movieboxph.org..."`) instead of the app actually in
this repo, and `www/index.html` was just a redirect page to that same site.
That means the installed APK was loading someone else's full website inside
a WebView on every launch — ads, trackers, and all — which is almost
certainly why it felt heavy and laggy. That's fixed now: `webDir` points to
`dist` (this app's own build), the `server.url` override and the `www/`
redirect folder are removed, and the app runs fully offline-first except for
TMDB API calls.

## Quick start

```bash
# 1. Get a free TMDB key: https://www.themoviedb.org/settings/api -> v3 API key
cp .env.example .env
# edit .env: VITE_TMDB_API_KEY=YOUR_KEY_HERE

npm install
npm run dev          # web @ http://localhost:5173
npm run build        # production build -> dist/
npx vite preview     # preview dist/ @ :4173
npm run electron     # run Electron against dist/ (run build first)
```

## Performance choices made for a lighter app

- Smaller TMDB image sizes: `w185` in horizontal rows, `w342` in grids, `w780` for hero backdrops (previously `original`, several times heavier).
- Responses are cached in memory + `sessionStorage`, so switching bottom tabs doesn't refetch from TMDB every time.
- Poster cards are `memo()`-ized so scrolling a row doesn't re-render every card.
- Routes are code-split with `React.lazy`, so only the screen you're on is parsed/loaded.
- `HashRouter` instead of `BrowserRouter` — required for routing to work correctly when the app is loaded from a local `file://` build (Capacitor/Electron), not just the dev server.
- Production build ships without sourcemaps.

## TMDB API

- Key in `.env` as `VITE_TMDB_API_KEY` (Vite injects at build time; never commit `.env`).
- Endpoints used: `trending/movie/week`, `movie/top_rated`, `discover/movie`, `person/popular`, `search/multi`.
- If no key is set, the UI shows an error banner with setup instructions instead of failing silently.

## Windows installer (.exe)

```bash
npm run build
npm run build:win     # needs Windows or wine -- outputs dist/MovieNESIA-Setup.exe
```

Config lives in `package.json` -> `build` (appId, productName, icon at `assets/icon.png`).

## Android APK (Capacitor)

Requires Android Studio + JDK 17 + Gradle.

```bash
npm run build
npx cap add android     # first time only
npx cap copy && npx cap sync
npx cap open android    # Android Studio -> Build -> Build APK(s)
```

To update after UI changes: `npm run build && npx cap copy`.

## Project structure

```
src/
  api/tmdb.js              TMDB client -- caching, image helpers, genre map
  store/watchlist.js       Saved titles (localStorage + useSyncExternalStore)
  store/profile.js         Local profile (name/username/bio/avatar)
  store/history.js         Recently viewed titles
  components/
    BottomNav.jsx          Home / Discover / Saved / Profile tabs
    TopHeader.jsx          Home header + search entry point
    CategoryChips.jsx      Genre shortcuts
    FeaturedRow.jsx        Large "Trending now" cards
    PosterRow.jsx / PosterCard.jsx   Poster rows + grid cards (memoized)
    PersonRow.jsx          Popular cast row
    icons.jsx              Inline SVG icon set (no icon library dependency)
  pages/
    Home.jsx               Trending, top rated, popular cast
    Discover.jsx           Search + genre filter + grid
    Saved.jsx              Watchlist grid
    Profile.jsx            Local profile, edit sheet, watchlist/history tabs
electron/main.cjs           Electron main process (loads dist/)
capacitor.config.json       appId com.movienesia.app, webDir dist
```

## Replace app icon

Replace `assets/icon.png` with a 512x512 (Windows) / 1024x1024 (Android) source, then rebuild both targets.

## Notes

- `vite.config.js` uses `base: './'` so the `file://` build (Electron/Capacitor) loads correctly.
- Opening a title currently links out to its official TMDB page (legal, no piracy sources) -- swap this for an in-app detail screen if you want to keep users inside the app.
