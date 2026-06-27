const GradientBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    {/* Grain / noise texture */}
    <div
      className="absolute inset-0 z-10 opacity-[0.035]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
      }}
    />

    {/* Subtle grid */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />

    {/* Orb 1 — purple, top-right */}
    <div
      className="absolute rounded-full animate-float"
      style={{
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, #7B2FFF55 0%, #7B2FFF22 40%, transparent 70%)',
        top: '-200px',
        right: '-150px',
        filter: 'blur(50px)',
      }}
    />

    {/* Orb 2 — orange, bottom-left */}
    <div
      className="absolute rounded-full animate-float-reverse"
      style={{
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, #FF6B3533 0%, #FF6B3511 40%, transparent 70%)',
        bottom: '10%',
        left: '-100px',
        filter: 'blur(70px)',
      }}
    />

    {/* Orb 3 — cyan, center */}
    <div
      className="absolute rounded-full animate-float-slow"
      style={{
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, #00D4FF22 0%, #00D4FF08 40%, transparent 70%)',
        top: '40%',
        left: '35%',
        filter: 'blur(80px)',
      }}
    />

    {/* Orb 4 — purple, bottom-right */}
    <div
      className="absolute rounded-full animate-float"
      style={{
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, #C084FC33 0%, transparent 70%)',
        bottom: '-50px',
        right: '15%',
        filter: 'blur(60px)',
        animationDelay: '-4s',
      }}
    />
  </div>
)

export default GradientBackground
