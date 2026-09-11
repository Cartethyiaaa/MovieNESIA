import React, { useRef, useState } from 'react'
import { useProfile, updateProfile } from '../store/profile'
import { useWatchlist } from '../store/watchlist'
import { useHistory } from '../store/history'
import PosterCard from '../components/PosterCard'
import { CameraIcon } from '../components/icons'

function EditProfileSheet({ onClose }) {
  const profile = useProfile()
  const [name, setName] = useState(profile.name)
  const [username, setUsername] = useState(profile.username)
  const [bio, setBio] = useState(profile.bio)
  const fileRef = useRef(null)

  function handleAvatarPick(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => updateProfile({ avatar: reader.result })
    reader.readAsDataURL(file)
  }
  function save() {
    updateProfile({ name: name.trim() || 'Movie Fan', username: username.trim() || 'moviefan', bio: bio.trim() })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={onClose}>
      <div
        className="w-full max-w-md bg-[#12131c] rounded-t-2xl p-5 pb-8 flex flex-col gap-3.5"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full bg-white/15 mx-auto mb-1" />
        <h2 className="text-lg font-black text-white">Edit profile</h2>

        <div className="flex justify-center py-1">
          <button onClick={() => fileRef.current?.click()} className="relative w-20 h-20 rounded-full overflow-hidden bg-white/10 grid place-items-center">
            {profile.avatar
              ? <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
              : <span className="text-2xl font-black text-white/50">{(name || '?')[0]?.toUpperCase()}</span>}
            <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white grid place-items-center text-black">
              <CameraIcon className="w-3.5 h-3.5" />
            </span>
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarPick} />
        </div>

        <label className="text-xs font-semibold text-white/50">Display name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg bg-white/[0.06] px-4 py-3 text-sm text-white outline-none" />

        <label className="text-xs font-semibold text-white/50">Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))} className="rounded-lg bg-white/[0.06] px-4 py-3 text-sm text-white outline-none" />

        <label className="text-xs font-semibold text-white/50">Bio</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={2} className="rounded-lg bg-white/[0.06] px-4 py-3 text-sm text-white outline-none resize-none" />

        <div className="flex gap-3 mt-2">
          <button onClick={onClose} className="flex-1 rounded-lg py-3 text-sm font-bold text-white/70 bg-white/[0.06]">Cancel</button>
          <button onClick={save} className="flex-1 rounded-lg py-3 text-sm font-bold text-white bg-[#e50914]">Save</button>
        </div>
        <p className="text-[11px] text-white/30 text-center pt-1">Saved on this device only — no account or server involved.</p>
      </div>
    </div>
  )
}

export default function Profile() {
  const profile = useProfile()
  const watchlist = useWatchlist()
  const history = useHistory()
  const [editing, setEditing] = useState(false)
  const [tab, setTab] = useState('watchlist')

  function openTitle(item) {
    window.open(`https://www.themoviedb.org/${item.media_type || 'movie'}/${item.id}`, '_blank', 'noopener')
  }

  const list = tab === 'watchlist' ? watchlist : history

  return (
    <div className="pb-6">
      <div className="h-28 bg-gradient-to-br from-[#1c1330] via-[#241a3d] to-[#0a0b12]" />

      <div className="px-5 -mt-10">
        <div className="flex items-end justify-between">
          <div className="w-20 h-20 rounded-full ring-4 ring-[#0a0b12] overflow-hidden bg-white/10 grid place-items-center">
            {profile.avatar
              ? <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
              : <span className="text-2xl font-black text-white/50">{(profile.name || '?')[0]?.toUpperCase()}</span>}
          </div>
          <button onClick={() => setEditing(true)} className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold">
            Edit Profile
          </button>
        </div>

        <h1 className="text-xl font-black text-white mt-3">{profile.name}</h1>
        <p className="text-sm text-white/40">@{profile.username}</p>
        <p className="text-sm text-white/70 mt-2 leading-relaxed">{profile.bio}</p>

        <div className="flex items-center gap-6 mt-4 pb-4 border-b border-white/[0.06]">
          <div><span className="text-base font-black text-white">{watchlist.length}</span><span className="text-xs text-white/40 ml-1.5">Watchlist</span></div>
          <div><span className="text-base font-black text-white">{history.length}</span><span className="text-xs text-white/40 ml-1.5">History</span></div>
        </div>

        <div className="flex gap-6 mt-1 border-b border-white/[0.06]">
          {[['watchlist', 'Watchlist'], ['history', 'History']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`py-3 text-sm font-bold border-b-2 -mb-px transition-colors ${
                tab === key ? 'text-[#f2c245] border-[#f2c245]' : 'text-white/40 border-transparent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 grid grid-cols-3 gap-x-3 gap-y-5 mt-5">
        {list.length === 0 ? (
          <div className="col-span-3 text-center text-white/30 text-sm py-10">
            {tab === 'watchlist' ? 'Nothing saved yet.' : 'Nothing viewed yet.'}
          </div>
        ) : (
          list.map((m) => <PosterCard key={`${m.media_type}-${m.id}`} item={m} size="md" onOpen={openTitle} showSave={tab === 'watchlist'} />)
        )}
      </div>

      {editing && <EditProfileSheet onClose={() => setEditing(false)} />}
    </div>
  )
}
