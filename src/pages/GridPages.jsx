import React from 'react'
import TopHeader from '../components/TopHeader'
import MovieBoxFrame from '../components/MovieBoxFrame'

function Grid({ title }) {
  return (
    <div className="pb-6">
      <TopHeader />
      <MovieBoxFrame title={title} />
    </div>
  )
}

export function Movies() { return <Grid title="Movies" /> }
export function TVShows() { return <Grid title="TV Shows" /> }
export function Upcoming() { return <Grid title="Upcoming" /> }
