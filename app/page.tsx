"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

const DROPS = [
  { name: "Surprise Era Drop", open: new Date("2026-05-26T00:00:00"), close: new Date("2026-06-01T23:59:59") },
  { name: "June Butter Edit", open: new Date("2026-06-30T00:00:00"), close: new Date("2026-07-05T23:59:59") },
  { name: "Surprise Era Drop", open: new Date("2026-07-28T00:00:00"), close: new Date("2026-08-02T23:59:59") },
  { name: "Surprise Era Drop", open: new Date("2026-08-25T00:00:00"), close: new Date("2026-08-30T23:59:59") },
  { name: "Surprise Era Drop", open: new Date("2026-09-29T00:00:00"), close: new Date("2026-10-04T23:59:59") },
  { name: "Surprise Era Drop", open: new Date("2026-10-27T00:00:00"), close: new Date("2026-11-01T23:59:59") },
  { name: "Surprise Era Drop", open: new Date("2026-11-24T00:00:00"), close: new Date("2026-11-29T23:59:59") },
  { name: "Holiday Drop", open: new Date("2026-12-29T00:00:00"), close: new Date("2027-01-03T23:59:59") },
  { name: "Surprise Era Drop", open: new Date("2027-01-26T00:00:00"), close: new Date("2027-01-31T23:59:59") },
  { name: "Pink Fancy Boulevard", open: new Date("2027-02-23T00:00:00"), close: new Date("2027-02-28T23:59:59") },
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
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

  const label =
    info.status === "open"
      ? `${info.drop.name} — Pre-order closes in`
      : `${info.drop.name} — Drop opens in`

  return (
    <div className="text-center">
      <p className="text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/60 mb-3">{label}</p>
      <div className="inline-flex border border-[#d4a5a5]/40">
        {[{ val: time.d, label: "Days" }, { val: time.h, label: "Hours" }, { val: time.m, label: "Min" }, { val: time.s, label: "Sec" }].map((unit, i) => (
          <div key={unit.label} className={`px-5 py-4 text-center min-w-[62px] ${i < 3 ? "border-r border-[#d4a5a5]/40" : ""}`}>
            <span className="text-3xl font-light text-[#f5f0e8] block">{unit.val}</span>
            <span className="text-[8px] tracking-[0.25em] uppercase text-[#f5f0e8]/50 mt-1.5 block">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="bg-[#1a2744] min-h-screen">

      {/* HERO */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute inset-0">

          {/* 🔥 YOUR BACKGROUND IMAGE */}
          <Image
            src="/images/hero-pink-fancy-boulevard.jpg"
            alt="The Pink Fancy Boulevard Edit — Recycle Me Fancy"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />

          <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-[#1a2744] via-[#1a2744]/55 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/25 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 pb-12 flex flex-col items-center gap-6">
          <CountdownDisplay />
        </div>
      </section>

    </main>
  )
}
