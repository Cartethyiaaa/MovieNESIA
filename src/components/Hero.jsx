import React from 'react'

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-1 text-amber-400 text-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? 'opacity-100' : 'opacity-25'}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function Hero({ item, onBook }) {
  if (!item) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-white/40">
        Loading featured title...
      </div>
    )
  }

  const title = item.title || item.name || 'Untitled'
  const year = (item.release_date || item.first_air_date || '').slice(0, 4)
  const seasonLabel = item.media_type === 'tv' || item.first_air_date ? 'Season 1' : (year ? `Year ${year}` : 'Season 1')
  const ratingStars = Math.min(5, Math.max(1, Math.round((item.vote_average || 8) / 2)))
  const genres = (item.genresList || []).slice(0, 3).join(' | ') || 'Action | Drama | Sci-Fi'
  const overview = item.overview || 'No synopsis available.'
  const bg = backdropUrl(item.backdrop_path || item.poster_path)

  return (
    <section className="relative w-full min-h-[64vh] md:min-h-[72vh] flex items-center px-6 md:px-14 overflow-hidden">
      {/* Dynamic Backdrop Background */}
      {bg && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
          style={{ backgroundImage: `url(${bg})` }}
        >
          {/* Gradient Overlays matching reference (fade left/bottom into dark navy) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e17] via-[#0b0e17]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e17] via-[#0b0e17]/40 to-transparent" />
        </div>
      )}

      {/* Hero Content Right-aligned / Left-aligned as in screenshot */}
      <div className="relative z-10 max-w-xl md:ml-auto md:mr-12 py-12 flex flex-col gap-3.5">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider text-white leading-tight">
          {title}
        </h1>

        <div className="text-sm md:text-base font-medium text-white/90">
          {seasonLabel}
        </div>

        <StarRating count={ratingStars} />

        <div className="text-xs md:text-sm font-semibold tracking-wide text-white/80">
          {genres}
        </div>

        <p className="text-xs md:text-sm text-white/75 leading-relaxed line-clamp-3 md:line-clamp-4 max-w-lg">
          {overview}
        </p>

        <div className="pt-2">
          <button
            onClick={() => onBook?.(item)}
            className="px-7 py-3 rounded-md bg-[#e50914] hover:bg-[#b80710] text-white font-bold text-sm md:text-base tracking-wide transition-all duration-200 transform hover:scale-105 shadow-lg shadow-red-900/40"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  )
}
