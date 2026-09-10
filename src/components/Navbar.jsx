import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/tv', label: 'Tv Shows' },
  { to: '/movies', label: 'Movies' },
  { to: '/upcoming', label: 'Upcoming' },
  { to: '/login', label: 'login' },
]

export default function Navbar() {
  return (
    <header className="relative z-30 w-full px-6 md:px-12 py-5 flex items-center justify-between border-b border-white/5 bg-gradient-to-b from-[#0b0e17] via-[#0b0e17]/80 to-transparent">
      <NavLink to="/" className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#e50914] hover:opacity-90">
        MovieNESIA
      </NavLink>

      <nav className="flex items-center gap-6 md:gap-9 text-sm md:text-base font-medium">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive
                ? 'text-[#e50914] font-semibold transition-colors'
                : 'text-white/80 hover:text-white transition-colors'
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
