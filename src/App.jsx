import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Movies, TVShows, Upcoming } from './pages/GridPages'
import Login from './pages/Login'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0b0e17] text-white selection:bg-[#e50914]/30">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv" element={<TVShows />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <footer className="py-10 text-center text-xs text-white/25 border-t border-white/5 mt-10">
          MovieNESIA · Data by TMDB · Images & links from TMDB official API only
        </footer>
      </div>
    </BrowserRouter>
  )
}
