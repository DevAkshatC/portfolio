import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const achievements = [
  { icon: '🏆', title: '1st Place — Gaming', desc: 'College-level gaming competition winner', color: '#FFD700' },
  { icon: '🎓', title: '25th University Rank', desc: '1st year, university-wide ranking', color: '#7B2FFF' },
  { icon: '🏅', title: 'Excellence Scholarship', desc: 'Awarded for academic performance', color: '#FF6B35' },
  { icon: '📸', title: 'NSS Photography Lead', desc: 'Led & coordinated 5+ events', color: '#00D4FF' },
  { icon: '⚡', title: 'TechXplore Participant', desc: 'University coding & tech competition', color: '#00FF88' },
  { icon: '💻', title: 'DSA Practice', desc: 'LeetCode & GeeksForGeeks problems', color: '#FF4D4D' },
  { icon: '🤝', title: 'Tech Events Volunteer', desc: 'University event coordination', color: '#C084FC' },
  { icon: '⭐', title: 'CGPA 9+', desc: 'Consistent academic excellence', color: '#FFD700' },
]

const tiltEnter = (e) => { e.currentTarget.style.transition = 'transform 0.12s ease' }
const tiltMove = (e) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `perspective(700px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateZ(5px)`
}
const tiltLeave = (e) => {
  e.currentTarget.style.transition = 'transform 0.55s ease'
  e.currentTarget.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
}

const Achievements = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="achievements" className="relative py-28 px-6 lg:px-16 overflow-hidden">
      <span className="section-ghost-num" style={{ top: '-20px', right: '0' }}>06</span>

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="label-text mb-4">Milestones</p>
          <h2 className="heading-text text-white">
            Awards &amp; <span className="gradient-text">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="glass glass-hover p-5 relative overflow-hidden group"
              style={{ borderColor: `${a.color}15` }}
              onMouseEnter={tiltEnter}
              onMouseMove={tiltMove}
              onMouseLeave={tiltLeave}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at top right, ${a.color}08, transparent 60%)` }}
              />

              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{a.icon}</span>
                <div
                  className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: a.color, boxShadow: `0 0 6px ${a.color}` }}
                />
              </div>

              <h4 className="text-white font-semibold text-sm mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                {a.title}
              </h4>
              <p className="text-gray-600 text-xs">{a.desc}</p>

              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${a.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
