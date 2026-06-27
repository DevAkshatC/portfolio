import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Education', to: 'education' },
  { label: 'Contact', to: 'contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(8,8,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <span
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '-0.02em',
            }}
            className="text-white"
          >
            AKS<span className="text-purple-400">.</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={600}
              className="label-text hover:text-white transition-colors duration-300 cursor-pointer"
              style={{ color: '#666' }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="contact" smooth duration={600}>
            <button
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
              style={{
                background: 'rgba(123,47,255,0.15)',
                border: '1px solid rgba(123,47,255,0.4)',
                color: '#C084FC',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(123,47,255,0.3)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(123,47,255,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(123,47,255,0.15)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Hire Me
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(8,8,15,0.97)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  duration={600}
                  onClick={() => setMenuOpen(false)}
                  className="label-text hover:text-white transition-colors cursor-pointer py-2"
                  style={{ color: '#666', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
