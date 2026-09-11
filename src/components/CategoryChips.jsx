import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORY_GENRES } from '../api/tmdb'

const swatch = {
  zap: 'bg-[#7c5cff]',
  smile: 'bg-[#f2c245] text-[#241a05]',
  drama: 'bg-[#2fb6a8]',
  ghost: 'bg-[#e8546a]',
  heart: 'bg-[#f2789f] text-[#2a0714]',
  sparkles: 'bg-[#4fb0e8]',
  rocket: 'bg-[#5c7cff]',
  radio: 'bg-[#4bc27a] text-[#04160c]',
}

function GenreGlyph({ icon }) {
  // Single-letter monogram keeps this dependency-free and legible at small size.
  const letter = { zap: 'A', smile: 'C', drama: 'D', ghost: 'H', heart: 'R', sparkles: 'An', rocket: 'S', radio: 'Doc' }[icon] || '•'
  return <span className="text-[13px] font-black leading-none">{letter}</span>
}

export default function CategoryChips() {
  const navigate = useNavigate()
  return (
    <div className="px-5">
      <h2 className="text-lg font-bold text-white mb-3">Categories</h2>
      <div className="flex gap-5 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5">
        {CATEGORY_GENRES.map((g) => (
          <button
            key={g.id}
            onClick={() => navigate(`/discover?genre=${g.id}&label=${encodeURIComponent(g.label)}`)}
            className="flex flex-col items-center gap-2 shrink-0"
          >
            <span className={`w-14 h-14 rounded-full grid place-items-center text-white shadow-lg shadow-black/30 ${swatch[g.icon]}`}>
              <GenreGlyph icon={g.icon} />
            </span>
            <span className="text-xs font-semibold text-white/85">{g.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
