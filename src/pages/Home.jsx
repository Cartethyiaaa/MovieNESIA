import React, { useEffect, useState, useCallback } from 'react'
import { tmdb, genresForIds } from '../api/tmdb'
import TopHeader from '../components/TopHeader'
import CategoryChips from '../components/CategoryChips'
import SectionHeader from '../components/SectionHeader'
import FeaturedRow from '../components/FeaturedRow'
import PosterRow from '../components/PosterRow'
import PersonRow from '../components/PersonRow'
import { pushHistory } from '../store/history'

export default function Home() {
  const [trending, setTrending] = useState([])
  const [topRated, setTopRated] = useState([])
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    async function run() {
      try {
        setLoading(true)
        setError('')
        const [trendRes, topRes, peopleRes] = await Promise.all([
          tmdb.trending().catch(() => tmdb.popular()),
          tmdb.topRated(),
          tmdb.popularPeople(),
        ])
        if (!alive) return

        const trendList = (trendRes.results || []).slice(0, 10)
        const topList = (topRes.results || []).slice(0, 12)
        // Genre lookups are cached after the first call, so this fans out
        // cheaply instead of one request per poster.
        const [trendEnriched, topEnriched] = await Promise.all([
          Promise.all(trendList.map(async (m) => ({ ...m, genresList: m.genre_ids?.length ? await genresForIds(m.genre_ids) : [] }))),
          Promise.all(topList.map(async (m) => ({ ...m, genresList: m.genre_ids?.length ? await genresForIds(m.genre_ids) : [] }))),
        ])
        if (!alive) return
        setTrending(trendEnriched)
        setTopRated(topEnriched)
        setPeople((peopleRes.results || []).slice(0, 8))
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

  const openTitle = useCallback((item) => {
    pushHistory(item)
    const type = item.media_type || (item.first_air_date ? 'tv' : 'movie')
    window.open(`https://www.themoviedb.org/${type}/${item.id}`, '_blank', 'noopener')
  }, [])

  return (
    <div className="pb-6">
      <TopHeader />

      {error && (
        <div className="mx-5 mt-2 mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-xs">
          <b>TMDB Error:</b> {error} — add <code className="bg-black/30 px-1 rounded">VITE_TMDB_API_KEY</code> to <code>.env</code> then rebuild.
        </div>
      )}

      <div className="flex flex-col gap-7 mt-1">
        <CategoryChips />

        <section>
          <SectionHeader title="Trending now" to="/discover?sort=trending" />
          <FeaturedRow items={trending} onOpen={openTitle} loading={loading} />
        </section>

        <section>
          <SectionHeader title="Top rated" to="/discover?sort=top_rated" />
          <PosterRow items={topRated} onOpen={openTitle} loading={loading} />
        </section>

        <section>
          <SectionHeader title="Popular cast" />
          <PersonRow people={people} loading={loading} />
        </section>
      </div>
    </div>
  )
}
