import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopHeader from '../components/TopHeader'
import CategoryChips from '../components/CategoryChips'
import { PlayIcon, ChevronRightIcon } from '../components/icons'

const quickPicks = [
  { title: 'Movies', subtitle: 'Browse the latest movies', icon: '🎬', to: '/movies' },
  { title: 'TV Shows', subtitle: 'Find your next series', icon: '📺', to: '/tv' },
  { title: 'Upcoming', subtitle: 'See what is coming', icon: '✨', to: '/upcoming' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="pb-8">
      <TopHeader />

      <section className="px-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#24143d] via-[#171427] to-[#0f1019] p-6 min-h-[235px]">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#e50914]/15 blur-3xl" />
          <div className="absolute -left-10 -bottom-20 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative z-10 max-w-[290px]">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">MovieNESIA</span>
            <h2 className="mt-3 text-3xl font-black leading-tight">Your movie night starts here.</h2>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Browse MovieBox from a clean MovieNESIA interface without embedding the MovieBox homepage into every screen.
            </p>
            <button
              onClick={() => navigate('/moviebox')}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#e50914] px-5 py-3 text-sm font-bold shadow-lg shadow-red-950/30 active:scale-[0.98]"
            >
              <PlayIcon className="h-4 w-4" filled />
              Open MovieBox
            </button>
          </div>
        </div>
      </section>

      <section className="mt-7">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="text-lg font-bold">Browse</h2>
          <button onClick={() => navigate('/discover')} className="text-xs font-semibold text-white/40">See all</button>
        </div>
        <CategoryChips />
      </section>

      <section className="mt-7 px-4 space-y-3">
        {quickPicks.map((item) => (
          <button
            key={item.to}
            onClick={() => navigate(item.to)}
            className="w-full flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.035] px-4 py-4 text-left active:bg-white/[0.06]"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-xl">{item.icon}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold">{item.title}</span>
              <span className="mt-1 block text-xs text-white/40">{item.subtitle}</span>
            </span>
            <ChevronRightIcon className="h-5 w-5 text-white/30" />
          </button>
        ))}
      </section>
    </main>
  )
}
