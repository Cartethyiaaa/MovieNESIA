import React from 'react'
import { NavLink } from 'react-router-dom'
import { HomeIcon, CompassIcon, HeartIcon, UserIcon } from './icons'

const tabs = [
  { to: '/', label: 'Home', Icon: HomeIcon, end: true },
  { to: '/discover', label: 'Discover', Icon: CompassIcon },
  { to: '/saved', label: 'Saved', Icon: HeartIcon },
  { to: '/profile', label: 'Profile', Icon: UserIcon },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-[#0a0b12]/95 backdrop-blur border-t border-white/[0.06]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="max-w-md mx-auto grid grid-cols-4">
        {tabs.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                isActive ? 'text-white' : 'text-white/40'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="w-6 h-6" filled={isActive && (label === 'Saved')} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
