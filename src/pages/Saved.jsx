import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useWatchlist } from '../store/watchlist'
import PosterCard from '../components/PosterCard'
import { HeartIcon } from '../components/icons'
import { pushHistory } from '../store/history'

export default function Saved() {
  const items = useWatchlist()
  const navigate = useNavigate()

  function openTitle(item) {
    pushHistory(item)
    window.open(`https://www.themoviedb.org/${item.media_type || 'movie'}/${item.id}`, '_blank', 'noopener')
  }

  return (
    <div className="pb-6 pt-4">
      <h1 className="px-5 text-2xl font-black text-white mb-1">Saved</h1>
      <p className="px-5 text-sm text-white/40 mb-5">Titles you've bookmarked, stored on this device.</p>

      {items.length === 0 ? (
        <div className="mx-5 mt-6 py-14 rounded-2xl bg-white/[0.04] flex flex-col items-center gap-3 text-center px-6">
          <span className="w-14 h-14 rounded-full bg-white/[0.06] grid place-items-center">
            <HeartIcon className="w-6 h-6 text-white/40" />
          </span>
          <div className="text-sm font-semibold text-white/80">Your watchlist is empty</div>
          <p className="text-xs text-white/40 max-w-[220px]">Tap the heart on any title to save it here for later.</p>
          <button
            onClick={() => navigate('/discover')}
            className="mt-1 px-5 py-2.5 rounded-lg bg-[#e50914] text-white text-xs font-bold"
          >
            Discover titles
          </button>
        </div>
      ) : (
        <div className="px-5 grid grid-cols-2 sm:grid-cols-3 gap-x-3.5 gap-y-5">
          {items.map((m) => <PosterCard key={`${m.media_type}-${m.id}`} item={m} size="md" onOpen={openTitle} />)}
        </div>
      )}
    </div>
  )
}
