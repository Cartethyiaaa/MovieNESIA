import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GridIcon, SearchIcon, SlidersIcon, BellIcon } from './icons'

export default function TopHeader() {
  const navigate = useNavigate()
  return (
    <header className="px-5 pt-4 pb-6 bg-gradient-to-b from-[#1c1330] to-[#0a0b12]">
      <div className="flex items-center justify-between mb-5">
        <GridIcon className="w-6 h-6 text-white/70" />
        <span className="w-9 h-9 rounded-full bg-white/[0.06] grid place-items-center text-white/70">
          <BellIcon className="w-4.5 h-4.5" />
        </span>
      </div>

      <h1 className="text-3xl font-black tracking-tight text-white mb-4">
        Movie<span className="text-[#e50914]">NESIA</span>
      </h1>

      <div className="flex items-center gap-2.5">
        <button
          onClick={() => navigate('/discover')}
          className="flex-1 flex items-center gap-2.5 bg-white/[0.06] rounded-xl px-4 py-3 text-left"
        >
          <SearchIcon className="w-4.5 h-4.5 text-white/40" />
          <span className="text-sm text-white/40">Search movies & shows</span>
        </button>
        <button
          onClick={() => navigate('/discover')}
          className="w-11 h-11 shrink-0 rounded-xl bg-white/[0.06] grid place-items-center text-white/70"
          aria-label="Filters"
        >
          <SlidersIcon className="w-4.5 h-4.5" />
        </button>
      </div>
    </header>
  )
}
