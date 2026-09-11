import React, { Suspense, lazy } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'

// Route-level code splitting: the WebView only has to parse the JS for the
// screen the person is actually on, instead of one big bundle up front.
const Home = lazy(() => import('./pages/Home'))
const Discover = lazy(() => import('./pages/Discover'))
const Saved = lazy(() => import('./pages/Saved'))
const GridPages = lazy(() => import('./pages/GridPages'))
const Profile = lazy(() => import('./pages/Profile'))

function Fallback() {
  return <div className="min-h-screen grid place-items-center text-white/30 text-sm">Loading…</div>
}

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#0a0b12] text-white pb-24 max-w-md mx-auto">
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/movies" element={<GridPages.Movies />} />
            <Route path="/tv" element={<GridPages.TVShows />} />
            <Route path="/upcoming" element={<GridPages.Upcoming />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
        <BottomNav />
      </div>
    </HashRouter>
  )
}
