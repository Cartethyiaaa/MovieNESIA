import React from 'react'
import { posterUrl } from '../api/tmdb'

export default function PosterRow({ items = [], activeId, onSelect }) {
  if (!items.length) return <div className="text-white/30 p-6">No titles found.</div>
  return (
    <div className="w-full px-0 md:px-8 py-2">
      <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar px-6 py-4 scroll-smooth snap-x snap-mandatory">
        {items.map((m) => {
          const isActive = m.id === activeId
          const title = m.title || m.name || '—'
          return (
            <button
              key={m.id}
              onClick={() => onSelect?.(m)}
              className="snap-start shrink-0 group flex flex-col gap-2.5 text-left"
            >
              <div
                className={`relative w-28 md:w-36 aspect-[2/3] overflow-hidden rounded-lg bg-white/5 transition-all duration-200
                ${isActive ? 'poster-ring scale-105' : 'group-hover:ring-1 group-hover:ring-white/30 group-hover:scale-[1.03] shadow-lg'}`}
              >
                <img
                  src={posterUrl(m.poster_path)}
                  alt={title}
                  loading="lazy"
                  className="h-full w-full object-cover bg-[#101319]"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                {!m.poster_path && (
                  <div className="absolute inset-0 grid place-items-center text-white/30 text-xs p-2 text-center">
                    {title}
                  </div>
                )}
              </div>
              <span className="w-28 md:w-36 text-xs font-semibold text-white/90 line-clamp-2 leading-tight group-hover:text-white transition-colors">
                {title}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
