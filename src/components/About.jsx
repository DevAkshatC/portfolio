import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    num: '01',
    title: 'Backend Engineering',
    desc: 'Scalable REST APIs, microservices, and server-side systems using Python, Java, Node.js & Express.',
    tags: ['Python', 'Java', 'Node.js', 'REST APIs'],
    color: '#7B2FFF',
  },
  {
    num: '02',
    title: 'Cloud & AWS',
    desc: 'Serverless architectures, cloud deployment, and infrastructure design with AWS core services.',
    tags: ['Lambda', 'EC2', 'DynamoDB', 'API Gateway'],
    color: '#FF9900',
  },
  {
    num: '03',
    title: 'Full Stack Development',
    desc: 'End-to-end web apps using React on the frontend and Express/Node on the backend with MongoDB.',
    tags: ['React.js', 'MongoDB', 'Express', 'HTML/CSS'],
    color: '#00D4FF',
  },
  {
    num: '04',
    title: 'AI / ML Solutions',
    desc: 'NLP pipelines, ML model training, and intelligent data analysis with Python-based frameworks.',
    tags: ['Scikit-Learn', 'NLP', 'TF-IDF', 'Flask'],
    color: '#FF6B35',
  },
]

const tiltEnter = (e) => { e.currentTarget.style.transition = 'transform 0.12s ease' }
const tiltMove = (e) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateZ(6px)`
}
const tiltLeave = (e) => {
  e.currentTarget.style.transition = 'transform 0.55s ease'
  e.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
}

const About = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } },
  })

  return (
    <section id="about" className="relative py-28 px-6 lg:px-16 overflow-hidden">
      {/* Ghost number */}
      <span className="section-ghost-num" style={{ top: '-20px', left: '-20px' }}>
        00
      </span>

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20"
        >
          <div>
            <p className="label-text mb-4">About Me</p>
            <h2 className="heading-text text-white">
              Building tomorrow's<br />
              <span className="gradient-text">technology today</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-gray-500 text-sm leading-relaxed">
              B.Tech CSE graduate (2026) & Python/Backend Developer at{' '}
              <span className="text-white">Gravity Engineering Services</span>. Passionate about
              cloud-native systems, AI, and shipping things that work in the real world.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="label-text">Available for opportunities · Lucknow, India</span>
            </div>
          </div>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              variants={fadeUp(0.1 + i * 0.1)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="glass glass-hover p-6 relative group"
              onMouseEnter={tiltEnter}
              onMouseMove={tiltMove}
              onMouseLeave={tiltLeave}
            >
              {/* Number */}
              <p
                className="label-text mb-6 transition-colors duration-300"
                style={{ color: '#333', fontFamily: 'Syne, sans-serif', fontSize: '0.65rem' }}
              >
                {s.num} ——
              </p>

              {/* Icon dot */}
              <div
                className="w-8 h-8 rounded-lg mb-5 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              </div>

              <h4
                className="font-semibold text-base text-white mb-2 leading-snug"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {s.title}
              </h4>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">{s.desc}</p>

              <div className="flex flex-wrap gap-1">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full font-mono"
                    style={{
                      background: `${s.color}10`,
                      color: s.color,
                      border: `1px solid ${s.color}20`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Hover bottom accent */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
