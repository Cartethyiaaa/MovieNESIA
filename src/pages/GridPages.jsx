import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopHeader from '../components/TopHeader'
import { PlayIcon } from '../components/icons'

function Grid({ title, description }) {
  const navigate = useNavigate()

  return (
    <main className="pb-8">
      <TopHeader />
      <section className="px-4">
        <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#1d1830] to-[#11121b] p-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">MovieNESIA</div>
          <h2 className="mt-2 text-2xl font-black">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-white/45">{description}</p>
          <button
            onClick={() => navigate('/moviebox')}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#e50914] px-5 py-3 text-sm font-bold"
          >
            <PlayIcon className="h-4 w-4" filled />
            Open catalog
          </button>
        </div>
      </section>
    </main>
  )
}

export function Movies() {
  return <Grid title="Movies" description="Browse movies through the MovieBox catalog." />
}

export function TVShows() {
  return <Grid title="TV Shows" description="Find series and episodes through the MovieBox catalog." />
}

export function Upcoming() {
  return <Grid title="Upcoming" description="Check upcoming titles in the MovieBox catalog." />
}
