import React, { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [msg, setMsg] = useState('')
  function onSubmit(e) {
    e.preventDefault()
    if (!email || !pass) { setMsg('Fill email and password.'); return }
    setMsg(`Welcome, ${email.split('@')[0]}! (front-end only — wire backend later)`)
  }
  return (
    <div className="min-h-[70vh] grid place-items-center px-6 py-10">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white/[0.04] backdrop-blur rounded-xl border border-white/10 p-7 flex flex-col gap-4">
        <h2 className="text-xl font-black uppercase tracking-wide">Login</h2>
        <p className="text-xs text-white/50">Front-end only. No backend needed yet.</p>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email"
          className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder:text-white/30 outline-none focus:border-[#e50914]/60" />
        <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" type="password"
          className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder:text-white/30 outline-none focus:border-[#e50914]/60" />
        <button type="submit" className="rounded-md bg-[#e50914] hover:bg-[#b80710] py-3 font-bold text-sm transition-colors">Sign In</button>
        {msg && <div className="text-xs text-white/70 bg-white/5 rounded p-2.5">{msg}</div>}
      </form>
    </div>
  )
}
