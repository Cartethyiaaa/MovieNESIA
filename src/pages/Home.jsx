import React from 'react'
import TopHeader from '../components/TopHeader'
import CategoryChips from '../components/CategoryChips'
import MovieBoxFrame from '../components/MovieBoxFrame'

export default function Home() {
  return (
    <div className="pb-6">
      <TopHeader />
      <div className="flex flex-col gap-5 mt-1">
        <CategoryChips />
        <MovieBoxFrame title="Browse movies & TV" />
      </div>
    </div>
  )
}
