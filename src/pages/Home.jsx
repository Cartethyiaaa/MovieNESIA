import React, { useEffect, useState } from 'react'
import { tmdb, genresForIds } from '../api/tmdb'
import Hero from '../components/Hero'
import PosterRow from '../components/PosterRow'

export default function Home() {
  const [items, setItems] = useState([])
  const [active, setActive] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    async function run() {
      try {
        setLoading(true)
        setError('')
        let data
        try { data = await tmdb.trending() } catch { data = await tmdb.popular() }
        const list = (data.results || []).slice(0, 18)
        const enriched = await Promise.all(
          list.map(async (m) => ({
            ...m,
            genresList: m.genre_ids?.length ? await genresForIds(m.genre_ids) : [],
          }))
        )
        if (!alive) return
        setItems(enriched)
        setActive(enriched[0] || null)
      } catch (e) {
        if (!alive) return
        setError(e.message || 'Failed to load TMDB')
      } finally {
        if (alive) setLoading(false)
      }
    }
    run()
    return () => { alive = false }
  }, [])

  function handleSelect(m) {
    setActive(m)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBook(movie) {
    const q = encodeURIComponent(`${movie.title || movie.name} official streaming`)
    const tmdbUrl = `https://www.themoviedb.org/movie/${movie.id}/watch?locale=US`
    if (confirm(`Open legal streaming options for "${movie.title || movie.name}"? (TMDB watch providers)\n\nOK = TMDB, Cancel = Google search`)) {
      window.open(tmdbUrl, '_blank', 'noopener')
    } else {
      window.open(`https://www.google.com/search?q=${q}`, '_blank', 'noopener')
    }
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mx-6 md:mx-12 mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-sm">
          <b>TMDB Error:</b> {error} — add <code className="bg-black/30 px-1.5 py-0.5 rounded">VITE_TMDB_API_KEY</code> to <code>.env</code> (get free at tmdb.org/settings/api) then rebuild.
        </div>
      )}
      {loading ? <div className="h-[64vh] grid place-items-center text-white/40">Loading trending...</div> : <Hero item={active} onBook={handleBook} />}
      {!loading && <PosterRow items={items} activeId={active?.id} onSelect={handleSelect} />}
    </div>
  )
}
