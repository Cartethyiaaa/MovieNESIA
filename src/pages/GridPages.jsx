import React, { useEffect, useState } from 'react'
import { tmdb, genresForIds, posterUrl } from '../api/tmdb'

function Grid({ fetcher, title }) {
  const [items, setItems] = useState([])
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let alive=true
    fetcher().then(async d=>{
      const list=(d.results||[]).slice(0,24)
      const enriched=await Promise.all(list.map(async m=>({...m, genresList:m.genre_ids?await genresForIds(m.genre_ids):[]})))
      if(!alive) return
      setItems(enriched)
    }).catch(e=>alive&&setErr(e.message)).finally(()=>alive&&setLoading(false))
    return()=>{alive=false}
  }, [fetcher])
  if (loading) return <div className="p-10 text-white/40">Loading {title}...</div>
  if (err) return <div className="p-6 text-red-300 text-sm">{err} — check .env TMDB key.</div>
  return (
    <div className="px-6 md:px-12 py-8">
      <h2 className="text-2xl font-black uppercase tracking-wider mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {items.map(m=>(
          <a key={m.id} href={`https://www.themoviedb.org/${m.media_type==='tv'?'tv':'movie'}/${m.id}`} target="_blank" rel="noopener noreferrer" className="group">
            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-white/5 group-hover:ring-1 group-hover:ring-white/30 transition-all">
              <img src={posterUrl(m.poster_path)} alt={m.title||m.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
            </div>
            <div className="mt-2 text-xs font-semibold text-white/85 line-clamp-2">{m.title||m.name}</div>
            <div className="text-[11px] text-white/50">{m.genresList?.slice(0,2).join(' | ')}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
export function Movies(){ return <Grid title="Movies" fetcher={()=>tmdb.discoverMovies()} /> }
export function TVShows(){ return <Grid title="TV Shows" fetcher={()=>tmdb.discoverTV()} /> }
export function Upcoming(){ return <Grid title="Upcoming" fetcher={()=>tmdb.upcoming()} /> }
