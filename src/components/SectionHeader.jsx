import React from 'react'
import { Link } from 'react-router-dom'

export default function SectionHeader({ title, to }) {
  return (
    <div className="flex items-center justify-between px-5 mb-3">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      {to && (
        <Link to={to} className="text-xs font-semibold text-white/45 hover:text-white/80 transition-colors">
          View all
        </Link>
      )}
    </div>
  )
}
