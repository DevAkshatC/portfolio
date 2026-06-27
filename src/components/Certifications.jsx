import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const certs = [
  {
    icon: '☁️',
    title: 'AWS Cloud Computing Training',
    issuer: 'Amazon Web Services',
    status: 'Completed',
    color: '#FF9900',
    skills: ['EC2', 'S3', 'Lambda', 'DynamoDB', 'VPC', 'IAM'],
    desc: 'Hands-on practical training covering AWS core services, cloud architecture, and deployment.',
  },
  {
    icon: '🏗️',
    title: 'AWS Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    status: 'In Progress',
    color: '#7B2FFF',
    skills: ['Architecture', 'Auto Scaling', 'ELB', 'CloudWatch'],
    desc: 'Designing fault-tolerant distributed systems and scalable cloud architectures on AWS.',
  },
  {
    icon: '☕',
    title: 'Full Stack Java Development',
    issuer: 'Industry Training',
    status: 'Completed',
    color: '#00D4FF',
    skills: ['Java', 'JDBC', 'MySQL', 'OOP', 'REST APIs'],
    desc: 'Comprehensive full-stack training in Java, JDBC, MySQL, and RESTful API development.',
  },
]

const tiltEnter = (e) => { e.currentTarget.style.transition = 'transform 0.12s ease' }
const tiltMove = (e) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `perspective(800px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) translateZ(5px)`
}
const tiltLeave = (e) => {
  e.currentTarget.style.transition = 'transform 0.55s ease'
  e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
}

const Certifications = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="certifications" className="relative py-28 px-6 lg:px-16 overflow-hidden">
      <span className="section-ghost-num" style={{ top: '-20px', left: '-10px' }}>05</span>

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="label-text mb-4">Credentials</p>
            <h2 className="heading-text text-white">
              Certifications &amp; <span className="gradient-text">Training</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {certs.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass glass-hover p-6 relative overflow-hidden group"
              style={{ borderColor: `${cert.color}15` }}
              onMouseEnter={tiltEnter}
              onMouseMove={tiltMove}
              onMouseLeave={tiltLeave}
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at top right, ${cert.color}12, transparent 60%)`,
                }}
              />

              <div className="flex items-start justify-between mb-5">
                <span className="text-3xl">{cert.icon}</span>
                <span
                  className={`label-text px-3 py-1 rounded-full border ${
                    cert.status === 'In Progress'
                      ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/08'
                      : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/08'
                  }`}
                  style={{
                    background: cert.status === 'In Progress' ? 'rgba(234,179,8,0.08)' : 'rgba(52,211,153,0.08)',
                  }}
                >
                  {cert.status === 'In Progress' ? '⟳ In Progress' : '✓ Done'}
                </span>
              </div>

              <h3 className="font-semibold text-white text-sm mb-1 leading-snug" style={{ fontFamily: 'Syne, sans-serif' }}>
                {cert.title}
              </h3>
              <p className="text-xs mb-4 font-mono" style={{ color: cert.color }}>{cert.issuer}</p>
              <p className="text-gray-500 text-xs leading-relaxed mb-5">{cert.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-0.5 rounded-full font-mono"
                    style={{ background: `${cert.color}10`, color: cert.color, border: `1px solid ${cert.color}20` }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${cert.color}88, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
