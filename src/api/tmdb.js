const KEY = import.meta.env.VITE_TMDB_API_KEY || import.meta.env.VITE_TMDB_KEY || ''
const BASE = 'https://api.themoviedb.org/3'
const IMG_W = 'https://image.tmdb.org/t/p/w500'
const IMG_BG = 'https://image.tmdb.org/t/p/original'

function url(path, params={}) {
  const q = new URLSearchParams({ api_key: KEY, language: 'en-US', ...params })
  return `${BASE}${path}?${q}`
}
async function get(path, params) {
  if (!KEY) throw new Error('Missing VITE_TMDB_API_KEY in .env — get one free at https://www.themoviedb.org/settings/api')
  const r = await fetch(url(path, params))
  if (!r.ok) throw new Error(`TMDB ${r.status} ${r.statusText}`)
  return r.json()
}

export const tmdb = {
  key: KEY,
  trending: (p={}) => get('/trending/movie/week', p),
  popular: (p={}) => get('/movie/popular', p),
  discoverMovies: (p={}) => get('/discover/movie', { sort_by: 'popularity.desc', ...p }),
  discoverTV: (p={}) => get('/discover/tv', { sort_by: 'popularity.desc', ...p }),
  upcoming: (p={}) => get('/movie/upcoming', p),
  detail: (id, type='movie') => get(`/${type}/${id}`, { append_to_response:'videos,credits,watch/providers' }),
  providers: (id, type='movie') => get(`/${type}/${id}/watch/providers`).then(j=>j.results),
}
export function posterUrl(path, size='w500'){ return path ? `${IMG_W}${path}` : '' }
export function backdropUrl(path){ return path ? `${IMG_BG}${path}` : '' }
export function genreNames(genres){ 
  if(!genres?.length) return []
  return genres.map(g=>typeof g==='string'?g:g.name)
}
let _genreMap=null
export async function loadGenreMap(){
  if(_genreMap) return _genreMap
  try {
    const j = await get('/genre/movie/list')
    _genreMap = Object.fromEntries(j.genres.map(g=>[g.id,g.name]))
  } catch { _genreMap={} }
  return _genreMap
}
export async function genresForIds(ids){
  const m = await loadGenreMap()
  return (ids||[]).map(id=>m[id]).filter(Boolean)
}
