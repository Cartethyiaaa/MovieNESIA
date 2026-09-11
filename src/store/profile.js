import { useSyncExternalStore } from 'react'

const KEY = 'movienesia_profile_v1'
const defaults = {
  name: 'Movie Fan',
  username: 'moviefan',
  bio: 'Hey there 👋 I love discovering new movies & shows.',
  avatar: '',   // base64 data URL, empty = show initials
  cover: '',    // backdrop path from a favorited title, optional
}
let profile = load()
const listeners = new Set()

function load() {
  try { return { ...defaults, ...JSON.parse(localStorage.getItem(KEY)) } } catch { return { ...defaults } }
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(profile)) } catch { /* ignore */ }
  listeners.forEach(l => l())
}
export function updateProfile(patch) { profile = { ...profile, ...patch }; persist() }
export function useProfile() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb) },
    () => profile,
  )
}
