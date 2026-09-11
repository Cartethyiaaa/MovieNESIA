import React from 'react'

// Small, dependency-free icon set. Keeping these inline (instead of pulling
// in an icon package) avoids shipping an extra library just for ~12 glyphs —
// one less thing for a low-end device to parse and render.
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const HomeIcon = ({ className, filled }) => (
  <svg viewBox="0 0 24 24" className={className} {...base} fill={filled ? 'currentColor' : 'none'}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </svg>
)
export const CompassIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15 9l-2 6-4-2 2-6z" />
  </svg>
)
export const HeartIcon = ({ className, filled }) => (
  <svg viewBox="0 0 24 24" className={className} {...base} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20.5s-7.5-4.7-9.8-9.2C.6 8 2 4.7 5.3 4a5 5 0 0 1 6.7 2 5 5 0 0 1 6.7-2c3.3.7 4.7 4 3.1 7.3-2.3 4.5-9.8 9.2-9.8 9.2Z" />
  </svg>
)
export const UserIcon = ({ className, filled }) => (
  <svg viewBox="0 0 24 24" className={className} {...base} fill={filled ? 'currentColor' : 'none'}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" />
  </svg>
)
export const SearchIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
  </svg>
)
export const BellIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
)
export const GridIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
)
export const SlidersIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 6h14M5 12h14M5 18h14" />
    <circle cx="9" cy="6" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="16" cy="12" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="10" cy="18" r="1.6" fill="currentColor" stroke="none" />
  </svg>
)
export const PlayIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
)
export const StarIcon = ({ className, filled }) => (
  <svg viewBox="0 0 24 24" className={className} {...base} fill={filled ? 'currentColor' : 'none'}>
    <path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.2L12 16.9 6.4 20l1.4-6.2-4.8-4.3 6.4-.6z" />
  </svg>
)
export const ChevronLeftIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="m15 5-7 7 7 7" /></svg>
)
export const ChevronRightIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="m9 5 7 7-7 7" /></svg>
)
export const CameraIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" /><circle cx="12" cy="13.5" r="3.2" />
  </svg>
)
export const PlusIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 5v14M5 12h14" /></svg>
)
export const CheckIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="m5 13 4 4 10-10" /></svg>
)
export const BadgeCheckIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2 9.9 4.2 7 3.8 6.4 6.7 3.7 8l1.3 2.6L3.7 13.2 6.4 14.5 7 17.4l2.9-.4L12 19.2l2.1-2.2 2.9.4.6-2.9 2.7-1.3-1.3-2.6L20.3 8l-2.7-1.3L17 3.8l-2.9.4Z" />
    <path d="m9.3 12.2 1.9 1.9 3.6-3.8" stroke="#0a0b12" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const ClockIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
)
