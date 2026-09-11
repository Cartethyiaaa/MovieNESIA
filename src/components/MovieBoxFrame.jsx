import React from 'react'

const MOVIEBOX_URL = 'https://movieboxph.org/'

export default function MovieBoxFrame({ title = 'MovieBox' }) {
  return (
    <section className="px-4 pb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="text-[10px] uppercase tracking-widest text-white/40">Source</span>
      </div>

      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl" style={{ minHeight: '70vh' }}>
        <iframe
          title="MovieBox content"
          src={MOVIEBOX_URL}
          className="absolute inset-0 w-full h-full border-0 bg-black"
          loading="eager"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}
