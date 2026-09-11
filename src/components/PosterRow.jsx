import React from 'react'
import PosterCard from './PosterCard'

export default function PosterRow({ items = [], onOpen, loading }) {
  if (loading) {
    return (
      <div className="flex gap-3.5 overflow-hidden px-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-28 shrink-0 aspect-[2/3] rounded-xl bg-white/5 animate-pulse" />
        ))}
      </div>
    )
  }
  if (!items.length) return <div className="px-5 text-sm text-white/30">Nothing here yet.</div>
  return (
    <div className="flex gap-3.5 overflow-x-auto no-scrollbar px-5 pb-1 snap-x snap-mandatory">
      {items.map((m) => (
        <div key={`${m.media_type || 'movie'}-${m.id}`} className="snap-start">
          <PosterCard item={m} onOpen={onOpen} />
        </div>
      ))}
    </div>
  )
}
