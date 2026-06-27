import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const tiltEnter = (e) => { e.currentTarget.style.transition = 'transform 0.12s ease' }
const tiltMove = (e) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(6px)`
}
const tiltLeave = (e) => {
  e.currentTarget.style.transition = 'transform 0.55s ease'
  e.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
}

const Education = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const fadeUp = (delay) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } },
  })

  return (
    <section id="education" className="relative py-28 px-6 lg:px-16 overflow-hidden">
      <span className="section-ghost-num" style={{ top: '-20px', right: '0' }}>04</span>

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <p className="label-text mb-4">Background</p>
          <h2 className="heading-text text-white">
            Education &amp; <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Education card */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="glass glass-hover p-8 relative overflow-hidden"
            onMouseEnter={tiltEnter}
            onMouseMove={tiltMove}
            onMouseLeave={tiltLeave}
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full"
              style={{ background: '#7B2FFF', filter: 'blur(30px)', transform: 'translate(30%, -30%)' }} />

            <div className="flex items-start justify-between mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ background: 'rgba(123,47,255,0.12)', border: '1px solid rgba(123,47,255,0.2)' }}
              >
                🎓
              </div>
              <span className="label-text bg-white/[0.04] px-3 py-1 rounded-full">2022 — 2026</span>
            </div>

            <h3 className="font-semibold text-white text-lg mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
              B.Tech Computer Science & Engineering
            </h3>
            <p className="text-purple-400 text-sm font-medium mb-1">Babu Banarasi Das University</p>
            <p className="label-text mb-6">Lucknow, India</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { value: '9+', label: 'CGPA' },
                { value: '25th', label: 'Rank' },
                { value: '🏅', label: 'Scholar' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-center py-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <p className="font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{s.value}</p>
                  <p className="label-text mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <ul className="space-y-2">
              {[
                'Secured 25th Rank in 1st Year university-wide',
                'Awarded scholarship for academic excellence',
                'DSA, OOP, DBMS, OS, Computer Networks core modules',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="text-purple-500 mt-0.5">▸</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Work experience card */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="glass glass-hover p-8 relative overflow-hidden"
            onMouseEnter={tiltEnter}
            onMouseMove={tiltMove}
            onMouseLeave={tiltLeave}
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full"
              style={{ background: '#FF6B35', filter: 'blur(30px)', transform: 'translate(30%, -30%)' }} />

            <div className="flex items-start justify-between mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ background: 'rgba(255,107,53,0.12)', border: '1px solid rgba(255,107,53,0.2)' }}
              >
                💼
              </div>
              <div className="flex items-center gap-2 label-text bg-white/[0.04] px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Present
              </div>
            </div>

            <h3 className="font-semibold text-white text-lg mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
              Python / Backend Developer
            </h3>
            <p className="text-orange-400 text-sm font-medium mb-1">Gravity Engineering Services</p>
            <p className="label-text mb-6">Full-Time · Lucknow, India</p>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Building and maintaining scalable backend systems, REST APIs, and cloud-integrated services using Python.
              Contributing to real-world engineering solutions and microservice architecture.
            </p>

            <div className="flex flex-wrap gap-2">
              {['Python', 'REST APIs', 'Backend Systems', 'Cloud Integration', 'Database Design'].map((t) => (
                <span key={t} className="tag text-xs">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Education
