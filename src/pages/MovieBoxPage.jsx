import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '../components/icons'

const MOVIEBOX_URL = 'https://movieboxph.org/'

export default function MovieBoxPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  return (
    <main className="fixed inset-0 z-[100] h-[100dvh] w-screen overflow-hidden bg-black">
      <iframe
        title="MovieBox"
        src={MOVIEBOX_URL}
        className="absolute inset-0 block h-full w-full border-0 bg-black"
        style={{ width: '100vw', height: '100dvh' }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        scrolling="yes"
        onLoad={() => setLoading(false)}
      />

      {loading && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black text-white/50">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-white/70" />
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        aria-label="Kembali"
        className="absolute left-3 top-3 z-20 grid h-11 w-11 place-items-center rounded-full bg-black/55 text-white shadow-lg ring-1 ring-white/10 backdrop-blur-md active:bg-black/75"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
    </main>
  )
}
