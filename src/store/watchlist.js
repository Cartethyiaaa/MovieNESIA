// Minimal localStorage-backed store using useSyncExternalStore — no context
// provider, no extra re-renders across the tree, tiny footprint.
import { useSyncExternalStore } from 'react'

const KEY = 'movienesia_watchlist_v1'
let items = load()
const listeners = new Set()

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* ignore quota errors */ }
  listeners.forEach(l => l())
}

export function isSaved(id, mediaType = 'movie') {
  return items.some(i => i.id === id && (i.media_type || 'movie') === mediaType)
}
export function toggleSaved(item) {
  const mediaType = item.media_type || (item.first_air_date ? 'tv' : 'movie')
  const exists = isSaved(item.id, mediaType)
  if (exists) {
    items = items.filter(i => !(i.id === item.id && (i.media_type || 'movie') === mediaType))
  } else {
    items = [{
      id: item.id,
      media_type: mediaType,
      title: item.title || item.name || 'Untitled',
      poster_path: item.poster_path || null,
      vote_average: item.vote_average ?? null,
      savedAt: Date.now(),
    }, ...items]
  }
  persist()
  return !exists
}
export function clearAll() { items = []; persist() }

export function useWatchlist() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb) },
    () => items,
  )
}
export function useIsSaved(id, mediaType = 'movie') {
  const list = useWatchlist()
  return list.some(i => i.id === id && (i.media_type || 'movie') === mediaType)
}
