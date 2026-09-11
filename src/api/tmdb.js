const KEY = import.meta.env.VITE_TMDB_API_KEY || import.meta.env.VITE_TMDB_KEY || ''
const BASE = 'https://api.themoviedb.org/3'

// Smaller image sizes = faster loads + less memory on low-end devices.
const IMG_POSTER_SM = 'https://image.tmdb.org/t/p/w185'   // horizontal rows
const IMG_POSTER_MD = 'https://image.tmdb.org/t/p/w342'   // grid cards
const IMG_BACKDROP = 'https://image.tmdb.org/t/p/w780'    // hero (was "original" — much heavier)
const IMG_PROFILE = 'https://image.tmdb.org/t/p/w185'     // people

function url(path, params = {}) {
  const q = new URLSearchParams({ api_key: KEY, language: 'en-US', ...params })
  return `${BASE}${path}?${q}`
}

// Tiny in-memory + sessionStorage cache so switching bottom-nav tabs doesn't
// re-hit the network every time (this was a big source of the app feeling
// heavy/laggy — every tab switch was re-fetching + re-rendering from scratch).
const mem = new Map()
async function get(path, params) {
  if (!KEY) throw new Error('Missing VITE_TMDB_API_KEY in .env — get one free at https://www.themoviedb.org/settings/api')
  const key = url(path, params)
  if (mem.has(key)) return mem.get(key)
  try {
    const cached = sessionStorage.getItem(key)
    if (cached) {
      const parsed = JSON.parse(cached)
      mem.set(key, parsed)
      return parsed
    }
  } catch { /* sessionStorage unavailable, ignore */ }

  const r = await fetch(key)
  if (!r.ok) throw new Error(`TMDB ${r.status} ${r.statusText}`)
  const json = await r.json()
  mem.set(key, json)
  try { sessionStorage.setItem(key, JSON.stringify(json)) } catch { /* quota full, ignore */ }
  return json
}

export const tmdb = {
  key: KEY,
  trending: (p = {}) => get('/trending/movie/week', p),
  popular: (p = {}) => get('/movie/popular', p),
  discoverMovies: (p = {}) => get('/discover/movie', { sort_by: 'popularity.desc', ...p }),
  discoverTV: (p = {}) => get('/discover/tv', { sort_by: 'popularity.desc', ...p }),
  upcoming: (p = {}) => get('/movie/upcoming', p),
  topRated: (p = {}) => get('/movie/top_rated', p),
  popularPeople: (p = {}) => get('/person/popular', p),
  search: (query, p = {}) => query ? get('/search/multi', { query, ...p }) : Promise.resolve({ results: [] }),
  byGenre: (genreId, p = {}) => get('/discover/movie', { sort_by: 'popularity.desc', with_genres: genreId, ...p }),
  detail: (id, type = 'movie') => get(`/${type}/${id}`, { append_to_response: 'videos,credits,watch/providers' }),
  providers: (id, type = 'movie') => get(`/${type}/${id}/watch/providers`).then(j => j.results),
}

export function posterUrl(path, size = 'sm') {
  if (!path) return ''
  return `${size === 'md' ? IMG_POSTER_MD : IMG_POSTER_SM}${path}`
}
export function backdropUrl(path) { return path ? `${IMG_BACKDROP}${path}` : '' }
export function profileUrl(path) { return path ? `${IMG_PROFILE}${path}` : '' }

export function genreNames(genres) {
  if (!genres?.length) return []
  return genres.map(g => (typeof g === 'string' ? g : g.name))
}

let _genreMap = null
let _genreMapPromise = null
export async function loadGenreMap() {
  if (_genreMap) return _genreMap
  if (_genreMapPromise) return _genreMapPromise
  _genreMapPromise = get('/genre/movie/list')
    .then(j => { _genreMap = Object.fromEntries(j.genres.map(g => [g.id, g.name])); return _genreMap })
    .catch(() => { _genreMap = {}; return _genreMap })
  return _genreMapPromise
}
export async function genresForIds(ids) {
  const m = await loadGenreMap()
  return (ids || []).map(id => m[id]).filter(Boolean)
}

// Curated genre list for the Categories row (id -> label/icon key).
export const CATEGORY_GENRES = [
  { id: 28, label: 'Action', icon: 'zap' },
  { id: 35, label: 'Comedy', icon: 'smile' },
  { id: 18, label: 'Drama', icon: 'drama' },
  { id: 27, label: 'Horror', icon: 'ghost' },
  { id: 10749, label: 'Romance', icon: 'heart' },
  { id: 16, label: 'Animation', icon: 'sparkles' },
  { id: 878, label: 'Sci-Fi', icon: 'rocket' },
  { id: 99, label: 'Documentary', icon: 'radio' },
]
