import { useSyncExternalStore } from 'react'

const KEY = 'movienesia_history_v1'
const MAX = 30
let items = load()
const listeners = new Set()

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* ignore */ }
  listeners.forEach(l => l())
}
export function pushHistory(item) {
  const mediaType = item.media_type || (item.first_air_date ? 'tv' : 'movie')
  items = [
    { id: item.id, media_type: mediaType, title: item.title || item.name || 'Untitled', poster_path: item.poster_path || null, viewedAt: Date.now() },
    ...items.filter(i => !(i.id === item.id && (i.media_type || 'movie') === mediaType)),
  ].slice(0, MAX)
  persist()
}
export function useHistory() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb) },
    () => items,
  )
}
