import React, { memo } from 'react'
import { backdropUrl, posterUrl } from '../api/tmdb'

function FeaturedCard({ item, onOpen }) {
  const title = item.title || item.name || 'Untitled'
  const img = backdropUrl(item.backdrop_path) || posterUrl(item.poster_path, 'md')
  return (
    <button onClick={() => onOpen?.(item)} className="shrink-0 w-64 snap-start text-left">
      <div className="relative w-64 h-36 rounded-2xl overflow-hidden bg-white/5">
        {img && <img src={img} alt={title} loading="lazy" decoding="async" className="h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <span className="absolute top-2.5 right-2.5 bg-[#e50914] text-white text-[10px] font-bold px-2 py-1 rounded-md tracking-wide">
          TRENDING
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="text-sm font-bold text-white line-clamp-1">{title}</div>
        </div>
      </div>
    </button>
  )
}
const MemoCard = memo(FeaturedCard)

export default function FeaturedRow({ items = [], onOpen, loading }) {
  if (loading) {
    return (
      <div className="flex gap-4 overflow-hidden px-5">
        {Array.from({ length: 2 }).map((_, i) => <div key={i} className="w-64 h-36 rounded-2xl bg-white/5 animate-pulse shrink-0" />)}
      </div>
    )
  }
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-1 snap-x snap-mandatory">
      {items.map((m) => <MemoCard key={`${m.media_type || 'movie'}-${m.id}`} item={m} onOpen={onOpen} />)}
    </div>
  )
}
