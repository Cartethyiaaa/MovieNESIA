import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '../components/icons'

const MOVIEBOX_URL = 'https://movieboxph.org/'

export default function MovieBoxPage() {
  const navigate = useNavigate()

  return (
    <main className="fixed inset-0 z-50 bg-black" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center gap-3 bg-black/70 px-3 py-2 backdrop-blur-md">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white active:bg-white/20"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <span className="text-sm font-bold text-white">MovieNESIA</span>
      </div>

      <iframe
        title="MovieBox"
        src={MOVIEBOX_URL}
        className="h-full w-full border-0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </main>
  )
}
