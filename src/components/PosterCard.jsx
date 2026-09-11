import React, { memo } from 'react'
import { HeartIcon, StarIcon } from './icons'
import { toggleSaved, useIsSaved } from '../store/watchlist'

// memo() so scrolling a horizontal row (which re-renders the parent often)
// doesn't force every card to re-render — this was a real source of jank
// on lower-end phones with 15-20 posters on screen at once.
function PosterCard({ item, size = 'sm', onOpen, showSave = true }) {
  const mediaType = item.media_type || (item.first_air_date ? 'tv' : 'movie')
  const saved = useIsSaved(item.id, mediaType)
  const title = item.title || item.name || 'Untitled'
  const rating = item.vote_average ? item.vote_average.toFixed(1) : null
  const width = size === 'md' ? 'w-full' : 'w-28'

  return (
    <button onClick={() => onOpen?.(item)} className={`shrink-0 ${width} text-left group`}>
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-white/5">
        {item.poster_path ? (
          <img
            src={posterUrl(item.poster_path, size)}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-[10px] text-white/30 p-2 text-center">{title}</div>
        )}

        {rating && (
          <span className="absolute top-1.5 left-1.5 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm rounded-md px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">
            <StarIcon className="w-2.5 h-2.5" filled />
            {rating}
          </span>
        )}

        {showSave && (
          <span
            role="button"
            tabIndex={-1}
            onClick={(e) => { e.stopPropagation(); toggleSaved(item) }}
            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm grid place-items-center text-white"
          >
            <HeartIcon className="w-3.5 h-3.5" filled={saved} />
          </span>
        )}
      </div>
      <div className="mt-1.5 text-xs font-semibold text-white/90 line-clamp-2 leading-tight">{title}</div>
    </button>
  )
}

export default memo(PosterCard)
