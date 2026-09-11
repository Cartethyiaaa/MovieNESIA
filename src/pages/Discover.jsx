import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { tmdb, CATEGORY_GENRES } from '../api/tmdb'
import PosterCard from '../components/PosterCard'
import { SearchIcon, ChevronLeftIcon } from '../components/icons'
import { pushHistory } from '../store/history'

function useDebounced(value, delay = 350) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function Discover() {
  const [params, setParams] = useSearchParams()
  const initialGenre = params.get('genre') || ''
  const initialLabel = params.get('label') || ''

  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState(initialGenre)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const debouncedQuery = useDebounced(query)
  const requestId = useRef(0)

  const activeLabel = useMemo(
    () => CATEGORY_GENRES.find(g => String(g.id) === String(genre))?.label || initialLabel,
    [genre, initialLabel]
  )

  useEffect(() => {
    let alive = true
    const myId = ++requestId.current
    async function run() {
      try {
        setLoading(true)
        setError('')
        let data
        if (debouncedQuery.trim()) {
          data = await tmdb.search(debouncedQuery.trim())
        } else if (genre) {
          data = await tmdb.byGenre(genre)
        } else {
          data = await tmdb.discoverMovies()
        }
        if (!alive || myId !== requestId.current) return
        const list = (data.results || []).filter(m => m.media_type !== 'person').slice(0, 24)
        setItems(list)
      } catch (e) {
        if (!alive) return
        setError(e.message || 'Failed to load TMDB')
      } finally {
        if (alive) setLoading(false)
      }
    }
    run()
    return () => { alive = false }
  }, [debouncedQuery, genre])

  function selectGenre(id) {
    setGenre((prev) => (String(prev) === String(id) ? '' : id))
    setQuery('')
  }
  function clearGenre() {
    setGenre('')
    setParams({})
  }
  function openTitle(item) {
    pushHistory(item)
    const type = item.media_type || (item.first_air_date ? 'tv' : 'movie')
    window.open(`https://www.themoviedb.org/${type}/${item.id}`, '_blank', 'noopener')
  }

  return (
    <div className="pb-6 pt-4">
      <div className="px-5 flex items-center gap-3 mb-4">
        {genre && !query && (
          <button onClick={clearGenre} className="w-9 h-9 shrink-0 rounded-full bg-white/[0.06] grid place-items-center">
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        )}
        <div className="flex-1 flex items-center gap-2.5 bg-white/[0.06] rounded-xl px-4 py-3">
          <SearchIcon className="w-4.5 h-4.5 text-white/40 shrink-0" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); if (e.target.value) setGenre('') }}
            placeholder="Search movies & shows"
            className="w-full bg-transparent outline-none text-sm text-white placeholder:text-white/40"
          />
        </div>
      </div>

      {!query && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-5 pb-4">
          {CATEGORY_GENRES.map((g) => (
            <button
              key={g.id}
              onClick={() => selectGenre(g.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                String(genre) === String(g.id) ? 'bg-[#e50914] text-white' : 'bg-white/[0.06] text-white/60'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}

      <h2 className="px-5 text-base font-bold text-white/90 mb-3">
        {query ? `Results for "${query}"` : activeLabel ? activeLabel : 'Discover'}
      </h2>

      {error && (
        <div className="mx-5 mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-xs">{error}</div>
      )}

      <div className="px-5 grid grid-cols-2 sm:grid-cols-3 gap-x-3.5 gap-y-5">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-[2/3] rounded-xl bg-white/5 animate-pulse" />)
          : items.length
            ? items.map((m) => <PosterCard key={`${m.media_type || 'movie'}-${m.id}`} item={m} size="md" onOpen={openTitle} />)
            : <div className="col-span-full text-center text-white/30 text-sm py-10">No results found.</div>}
      </div>
    </div>
  )
}
