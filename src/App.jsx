import React, { Suspense, lazy } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'

const Home = lazy(() => import('./pages/Home'))
const Discover = lazy(() => import('./pages/Discover'))
const Saved = lazy(() => import('./pages/Saved'))
const Movies = lazy(() => import('./pages/GridPages').then((m) => ({ default: m.Movies })))
const TVShows = lazy(() => import('./pages/GridPages').then((m) => ({ default: m.TVShows })))
const Upcoming = lazy(() => import('./pages/GridPages').then((m) => ({ default: m.Upcoming })))
const Profile = lazy(() => import('./pages/Profile'))
const MovieBoxPage = lazy(() => import('./pages/MovieBoxPage'))

function Fallback() {
  return <div className="min-h-screen grid place-items-center bg-[#0a0b12] text-white/30 text-sm">Loading…</div>
}

function Shell() {
  const location = useLocation()
  const isMovieBox = location.pathname === '/moviebox'

  return (
    <div className={isMovieBox ? 'min-h-screen bg-black text-white' : 'min-h-screen bg-[#0a0b12] text-white pb-24 max-w-md mx-auto'}>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/moviebox" element={<MovieBoxPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      {!isMovieBox && <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  )
}
