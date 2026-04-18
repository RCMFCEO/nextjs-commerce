"use client"
 
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
 
const DROPS = [
  { name: "Surprise Era Drop",     open: new Date("2026-05-26T00:00:00"), close: new Date("2026-06-01T23:59:59") },
  { name: "June Butter Edit",      open: new Date("2026-06-30T00:00:00"), close: new Date("2026-07-05T23:59:59") },
  { name: "Surprise Era Drop",     open: new Date("2026-07-28T00:00:00"), close: new Date("2026-08-02T23:59:59") },
  { name: "Surprise Era Drop",     open: new Date("2026-08-25T00:00:00"), close: new Date("2026-08-30T23:59:59") },
  { name: "Surprise Era Drop",     open: new Date("2026-09-29T00:00:00"), close: new Date("2026-10-04T23:59:59") },
  { name: "Surprise Era Drop",     open: new Date("2026-10-27T00:00:00"), close: new Date("2026-11-01T23:59:59") },
  { name: "Surprise Era Drop",     open: new Date("2026-11-24T00:00:00"), close: new Date("2026-11-29T23:59:59") },
  { name: "Holiday Drop",          open: new Date("2026-12-29T00:00:00"), close: new Date("2027-01-03T23:59:59") },
  { name: "Surprise Era Drop",     open: new Date("2027-01-26T00:00:00"), close: new Date("2027-01-31T23:59:59") },
  { name: "Pink Fancy Boulevard",  open: new Date("2027-02-23T00:00:00"), close: new Date("2027-02-28T23:59:59") },
] as const
 
type Drop = typeof DROPS[number]
type DropInfo =
  | { drop: Drop; status: "open" | "upcoming" }
  | { drop: Drop; status: "closed" }
 
function getActiveDrop(): DropInfo {
  const now = new Date()
  for (const drop of DROPS) {
    if (now >= drop.open && now <= drop.close) return { drop, status: "open" }
  }
  for (const drop of DROPS) {
    if (now < drop.open) return { drop, status: "upcoming" }
  }
return { drop: DROPS[9]!, status: "closed" }
}
 
function ArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}
 
function CountdownDisplay() {
  const [time, setTime] = useState({ d: "00", h: "00", m: "00", s: "00" })
  const [info, setInfo] = useState<DropInfo>(getActiveDrop())
 
  useEffect(() => {
    const tick = () => {
      const current = getActiveDrop()
      setInfo(current)
      const target = current.status === "open" ? current.drop.close : current.drop.open
      const diff = Math.max(Number(target) - Number(new Date()), 0)
      const pad = (n: number) => String(n).padStart(2, "0")
      setTime({
        d: String(Math.floor(diff / 86400000)),
        h: pad(Math.floor((diff % 86400000) / 3600000)),
        m: pad(Math.floor((diff % 3600000) / 60000)),
        s: pad(Math.floor((diff % 60000) / 1000)),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
 
  const label = info.status === "open"
    ? `${info.drop.name} — Pre-order closes in`
    : `${info.drop.name} — Drop opens in`
 
  return (
    <div className="text-center">
      <p className="text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/60 mb-3">{label}</p>
      <div className="inline-flex border border-[#d4a5a5]/40">
        {[{ val: time.d, label: "Days" }, { val: time.h, label: "Hours" }, { val: time.m, label: "Min" }, { val: time.s, label: "Sec" }].map((unit, i) => (
          <div key={unit.label} className={`px-5 py-4 text-center min-w-[62px] ${i < 3 ? "border-r border-[#d4a5a5]/40" : ""}`}>
            <span className="text-3xl font-light text-[#f5f0e8] block leading-none tabular-nums">{unit.val}</span>
            <span className="text-[8px] tracking-[0.25em] uppercase text-[#f5f0e8]/50 mt-1.5 block">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
 
const PILLARS = [
  { icon: "🎀", title: "Curated With Love", body: "Handpicked pre-loved pieces chosen for their beauty, quality, and story." },
  { icon: "💎", title: "Timeless Finds", body: "From vintage treasures to designer gems — every piece is one-of-a-kind." },
  { icon: "🌿", title: "Sustainable Choice", body: "Shopping pre-loved helps reduce waste and supports a more sustainable future." },
  { icon: "🤍", title: "Made to Be Loved Again", body: "Each item is cleaned, cared for, and ready to become part of your next story." },
]
 
const TRUST = [
  { icon: "🚚", label: "Fast & Secure Shipping", sub: "Tracked delivery on all orders" },
  { icon: "✅", label: "Authenticity Guaranteed", sub: "Quality checked with care" },
  { icon: "↩️", label: "Easy Returns", sub: "14-day hassle-free returns" },
  { icon: "♻️", label: "Support Sustainable Fashion", sub: "Giving beautiful pieces a new life" },
]
 
const LANES = [
  { num: "01", tag: "Limited Monthly Drop", name: "Pink Box Drop", price: "$89.99 — 10 boxes only", desc: "5 mystery vintage pieces, era-themed and curated by RCMF. You receive — full surprise.", rules: "Preorder only · No restocks · No extensions", href: "/search/pink-box-drop", cta: "Shop Pink Box" },
  { num: "02", tag: "Always Available", name: "Style Box", price: "$79.99 — Ready to ship", desc: "5 pre-loved pieces styled by RCMF for a specific occasion. Lunch Date, Evening Edit, Resort Edit.", rules: "Ships 5–7 business days · New edits added regularly", href: "/search/style-box", cta: "Shop the Look" },
  { num: "03", tag: "Open to All", name: "Add-On Elegance", price: "Per piece — individually priced", desc: "Single vintage accessories aligned with the active drop era. Hats, pearls, gloves, scarves.", rules: "Era-tagged · Archived when drop closes", href: "/search/add-on-elegance", cta: "Browse Pieces" },
  { num: "04", tag: "Virtual Styling Service", name: "Style Identity Edit", price: "From $75", desc: "The fourth lane. No inventory. Pure transformation — for the woman ready to show up differently.", rules: "Style Edit · Boardroom Edit · Identity Edit", href: "/style-profile", cta: "Begin Intake" },
]
 
export default function HomePage() {
  return (
    <main className="bg-[#1a2744] min-h-screen">
 
      <section className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-pink-fancy-boulevard.jpg" alt="The Pink Fancy Boulevard Edit — Recycle Me Fancy" fill priority className="object-cover object-top" sizes="100vw" />
          <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-[#1a2744] via-[#1a2744]/55 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/25 to-transparent" />
        </div>
        <div className="relative z-10 w-full bg-[#d4a5a5]/85 py-2 text-center">
          <p className="text-[9px] tracking-[0.45em] uppercase text-[#1a2744] font-medium">🎀 &nbsp; Once Loved but Never Forgotten &nbsp; 🎀</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-12 flex flex-col items-center gap-6">
          <CountdownDisplay />
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/search/pink-box-drop" className="inline-flex items-center gap-3 bg-[#d4a5a5] hover:bg-[#e8c4c4] text-[#1a2744] text-[10px] tracking-[0.25em] uppercase font-semibold px-10 py-4 transition-all duration-200 shadow-lg">Shop Pink Box &nbsp; 🎀</Link>
            <Link href="/our-story" className="border border-[#d4a5a5]/50 text-[#f5f0e8] text-[10px] tracking-[0.2em] uppercase px-7 py-4 hover:border-[#d4a5a5] transition-colors">Our Story</Link>
          </div>
        </div>
      </section>
 
      <section className="bg-[#fdf6f0] py-16 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#c8a090] mb-3">Beauty that Deserves a Second Chance</p>
          <h2 className="text-3xl md:text-4xl italic font-light text-[#3b2a2a] mb-2">Once Loved but never forgotten</h2>
          <p className="text-[#d4a5a5] text-2xl mb-12">🎀</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {PILLARS.map((p) => (
              <div key={p.title} className="flex flex-col items-center text-center">
                <span className="text-3xl mb-4">{p.icon}</span>
                <h3 className="text-[9px] tracking-[0.25em] uppercase font-semibold text-[#3b2a2a] mb-2">{p.title}</h3>
                <p className="text-[11px] text-[#7a6a6a] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
          <Link href="/search/pink-box-drop" className="inline-flex items-center gap-3 bg-[#d4a5a5] hover:bg-[#e8c4c4] text-[#1a2744] text-[10px] tracking-[0.25em] uppercase font-semibold px-10 py-4 transition-all">Explore the Pink Box &nbsp; 🎀</Link>
        </div>
      </section>
 
      <section className="bg-[#f5ede8] border-t border-[#d4a5a5]/20 py-6 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST.map((t) => (
            <div key={t.label} className="flex items-start gap-3">
              <span className="text-xl mt-0.5">{t.icon}</span>
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase font-semibold text-[#3b2a2a]">{t.label}</p>
                <p className="text-[10px] text-[#7a6a6a] mt-0.5">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      <section className="py-20 px-8 bg-[#1a2744]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#d4a5a5]/60 mb-2">Four Lanes</p>
              <h2 className="italic text-3xl md:text-4xl text-[#d4a5a5]">Something for every collector</h2>
            </div>
            <Link href="/search" className="text-[10px] tracking-[0.15em] uppercase text-[#c4b8a8]/50 hover:text-[#d4a5a5] transition-colors inline-flex items-center gap-2">View all <ArrowRight /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#d4a5a5]/12">
            {LANES.map((lane) => (
              <div key={lane.num} className="bg-[#1f2d4a] p-8 flex flex-col group hover:bg-[#243460] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[9px] tracking-[0.25em] uppercase text-[#d4a5a5]/60">{lane.tag}</p>
                  <span className="text-4xl text-[#d4a5a5]/15 font-light leading-none">{lane.num}</span>
                </div>
                <h3 className="italic text-2xl text-[#f5f0e8] mb-2">{lane.name}</h3>
                <p className="text-[11px] tracking-wide text-[#d4a5a5] mb-4">{lane.price}</p>
                <p className="text-xs text-[#c4b8a8] leading-relaxed mb-4 flex-1">{lane.desc}</p>
                <p className="text-[9px] text-[#c4b8a8]/45 leading-relaxed mb-6 tracking-wide">{lane.rules}</p>
                <Link href={lane.href} className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-[#d4a5a5] hover:text-[#f5f0e8] transition-colors">{lane.cta} <ArrowRight /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      <section className="bg-[#1f2d4a] border-t border-b border-[#d4a5a5]/15 py-20 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#d4a5a5]/50 mb-8">The Founder</p>
          <blockquote className="italic text-2xl md:text-3xl font-light text-[#f5f0e8] leading-[1.7] mb-8">&ldquo;Recycle Me Fancy was not a pivot. It was a homecoming. The archive had been building for twenty years inside the woman who wore Juicy Couture coats with ruffled backs and refused to apologize for the hot pink underneath.&rdquo;</blockquote>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#d4a5a5]/50 mb-8">Angela Bailey-Briggs · Founder, RCMF</p>
          <Link href="/our-story" className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#d4a5a5] border border-[#d4a5a5]/30 px-6 py-3 hover:border-[#d4a5a5] transition-colors">Read Our Story <ArrowRight /></Link>
        </div>
      </section>
 
      <section className="py-20 px-8 text-center bg-[#1a2744]">
        <div className="max-w-lg mx-auto">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#d4a5a5]/50 mb-4">The Archive · Join the List</p>
          <h2 className="italic text-3xl text-[#f5f0e8] mb-3">Be the first to know</h2>
          <p className="italic text-base text-[#c4b8a8] mb-10">Drop dates, early access, and collector previews.</p>
          <div className="flex border border-[#d4a5a5]/25 max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="flex-1 bg-transparent border-none px-5 py-4 text-[#f5f0e8] text-sm placeholder:text-[#c4b8a8]/30 outline-none" />
            <button className="bg-[#d4a5a5] text-[#1a2744] px-6 py-4 text-[9px] tracking-[0.2em] uppercase font-medium hover:bg-[#e8d4d4] transition-colors whitespace-nowrap">Join Archive</button>
          </div>
        </div>
      </section>
 
    </main>
  )
}

