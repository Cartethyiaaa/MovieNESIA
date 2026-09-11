import React, { memo } from 'react'

function PersonCard({ person }) {
  const initials = (person.name || '?').split(' ').map(w => w[0]).slice(0, 2).join('')
  return (
    <div className="flex items-center gap-3 shrink-0 bg-white/[0.04] rounded-xl pr-4 pl-2.5 py-2.5 min-w-[13rem]">
      <div className="w-11 h-11 rounded-full overflow-hidden bg-white/10 grid place-items-center shrink-0">
        {person.profile_path ? (
          <img src={profileUrl(person.profile_path)} alt={person.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs font-bold text-white/60">{initials}</span>
        )}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-bold text-white truncate">{person.name}</div>
        <div className="text-[11px] text-white/45 truncate">
          {(person.known_for || []).map(k => k.title || k.name).filter(Boolean).slice(0, 1)[0] || 'Actor'}
        </div>
      </div>
    </div>
  )
}
const MemoPerson = memo(PersonCard)

export default function PersonRow({ people = [], loading }) {
  if (loading) {
    return (
      <div className="flex gap-3 overflow-hidden px-5">
        {Array.from({ length: 2 }).map((_, i) => <div key={i} className="min-w-[13rem] h-16 rounded-xl bg-white/5 animate-pulse shrink-0" />)}
      </div>
    )
  }
  if (!people.length) return null
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
      {people.map((p) => <MemoPerson key={p.id} person={p} />)}
    </div>
  )
}
