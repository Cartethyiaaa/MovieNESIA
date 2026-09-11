import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopHeader from '../components/TopHeader'
import CategoryChips from '../components/CategoryChips'
import { PlayIcon, SearchIcon } from '../components/icons'

export default function Discover() {
  const navigate = useNavigate()

  return (
    <main className="pb-8">
      <TopHeader />
      <section className="px-4">
        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.035] p-5">
          <div className="flex items-center gap-3 rounded-xl bg-black/20 px-4 py-3">
            <SearchIcon className="h-5 w-5 text-white/40" />
            <span className="text-sm text-white/40">Search movies & shows in MovieBox</span>
          </div>
          <p className="mt-4 text-xs leading-5 text-white/40">
            MovieNESIA keeps this screen local. Open MovieBox only when you need its catalog and search.
          </p>
          <button
            onClick={() => navigate('/moviebox')}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.08] py-3 text-sm font-bold active:bg-white/[0.12]"
          >
            <PlayIcon className="h-4 w-4" filled />
            Browse MovieBox
          </button>
        </div>
      </section>

      <section className="mt-7">
        <h2 className="px-5 mb-3 text-lg font-bold">Genres</h2>
        <CategoryChips />
      </section>
    </main>
  )
}
