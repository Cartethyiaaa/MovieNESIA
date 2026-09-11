import React from 'react'

const categories = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Anime']

export const CATEGORY_GENRES = categories

export default function CategoryChips() {
  return (
    <div className="px-5 overflow-x-auto no-scrollbar">
      <div className="flex gap-2 min-w-max">
        {categories.map((label, index) => (
          <button
            key={label}
            type="button"
            className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
              index === 0
                ? 'bg-white text-black border-white'
                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
