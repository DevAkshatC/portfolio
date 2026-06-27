import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const CyberBackground = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = window.innerWidth
    const h = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 1000)
    camera.position.set(0, 4, 28)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── PARTICLES ──────────────────────────────────────────────
    const pCount = 3500
    const pPos = new Float32Array(pCount * 3)
    const pCol = new Float32Array(pCount * 3)
    const palette = [
      [0.31, 0.27, 0.90],
      [0.02, 0.71, 0.83],
      [0.55, 0.36, 0.96],
      [0.96, 0.62, 0.04],
    ]
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 220
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 120
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 220
      const c = palette[Math.floor(Math.random() * palette.length)]
      pCol[i * 3]     = c[0]
      pCol[i * 3 + 1] = c[1]
      pCol[i * 3 + 2] = c[2]
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3))
    const pMat = new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.65, sizeAttenuation: true })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ── GRID FLOOR ────────────────────────────────────────────
    const mkGrid = (color, opacity, y) => {
      const geo = new THREE.PlaneGeometry(300, 300, 60, 60)
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity })
      const mesh = new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat)
      mesh.rotation.x = -Math.PI / 2
      mesh.position.y = y
      return mesh
    }
    const gridFloor = mkGrid(0x4F46E5, 0.1, -14)
    const gridFloor2 = mkGrid(0x06B6D4, 0.04, -13.8)
    scene.add(gridFloor)
    scene.add(gridFloor2)

    // ── WIREFRAME SHAPES ──────────────────────────────────────
    const shapes = []

    const addShape = (geo, color, opacity, pos, rot, rx, ry) => {
      const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(...pos)
      if (rot) mesh.rotation.set(...rot)
      scene.add(mesh)
      shapes.push({ mesh, rx, ry })
      return mesh
    }

    addShape(new THREE.TorusKnotGeometry(7, 1.1, 128, 16), 0x4F46E5, 0.07, [28, 6, -35], null, 0.004, 0.003)
    addShape(new THREE.IcosahedronGeometry(6, 1), 0x06B6D4, 0.09, [-26, 10, -25], null, 0.005, 0.007)
    addShape(new THREE.OctahedronGeometry(5, 1), 0x8B5CF6, 0.09, [20, -5, -18], null, 0.007, 0.004)
    addShape(new THREE.TorusGeometry(10, 0.6, 8, 80), 0x06B6D4, 0.12, [0, 0, -40], [Math.PI / 2.5, 0, 0], 0.002, 0.003)
    addShape(new THREE.TorusGeometry(6, 0.4, 8, 60), 0x4F46E5, 0.15, [-15, 12, -20], [0.8, 0.3, 0], 0.003, 0.005)

    const scatter = [0x4F46E5, 0x06B6D4, 0x8B5CF6, 0xF59E0B]
    for (let i = 0; i < 8; i++) {
      const size = 1.2 + Math.random() * 2.2
      const geo = i % 2 === 0 ? new THREE.IcosahedronGeometry(size, 0) : new THREE.OctahedronGeometry(size, 0)
      addShape(
        geo, scatter[i % scatter.length], 0.13,
        [(Math.random() - 0.5) * 70, (Math.random() - 0.5) * 35, -8 - Math.random() * 35],
        null,
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.012,
      )
    }

    // ── GLOWING RINGS ─────────────────────────────────────────
    const rings = []
    ;[[9, 0x4F46E5, 0.28], [15, 0x06B6D4, 0.18], [22, 0x8B5CF6, 0.12]].forEach(([r, col, op], i) => {
      const geo = new THREE.TorusGeometry(r, 0.06, 8, 120)
      const mat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(0, -2, -20)
      mesh.rotation.x = Math.PI / 2.2 + i * 0.15
      scene.add(mesh)
      rings.push({ mesh, speed: 0.004 - i * 0.001 })
    })

    // ── SHOOTING STARS ────────────────────────────────────────
    const stars = []
    for (let i = 0; i < 6; i++) {
      const geo = new THREE.BufferGeometry()
      const pts = new Float32Array([0, 0, 0, -14, 0, 0])
      geo.setAttribute('position', new THREE.BufferAttribute(pts, 3))
      const mat = new THREE.LineBasicMaterial({ color: 0x818CF8, transparent: true, opacity: 0 })
      const line = new THREE.Line(geo, mat)
      line.position.set((Math.random() - 0.5) * 100, 20 + Math.random() * 20, -5 - Math.random() * 30)
      line.rotation.z = -0.3 - Math.random() * 0.3
      scene.add(line)
      stars.push({ line, speed: 0.5 + Math.random() * 0.8, delay: Math.random() * 8, t: Math.random() * 10 })
    }

    // ── MOUSE PARALLAX ────────────────────────────────────────
    let mx = 0, my = 0
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    // ── ANIMATE ───────────────────────────────────────────────
    let animId
    let t = 0

    const animate = () => {
      animId = requestAnimationFrame(animate)
      t += 0.008

      shapes.forEach(({ mesh, rx, ry }) => {
        mesh.rotation.x += rx
        mesh.rotation.y += ry
      })

      rings.forEach(({ mesh, speed }, i) => {
        mesh.rotation.z += speed
        mesh.material.opacity = 0.15 + Math.sin(t * 1.2 + i * 1.5) * 0.09
      })

      particles.rotation.y += 0.00012
      particles.rotation.x += 0.00004
      gridFloor.position.z = (t * 0.4) % 5

      stars.forEach((s) => {
        s.t += s.speed * 0.016
        const cycle = s.t % (8 + s.delay)
        if (cycle < 3) {
          const p = cycle / 3
          s.line.material.opacity = Math.sin(p * Math.PI) * 0.7
          s.line.position.y -= s.speed * 0.18
          s.line.position.x += s.speed * 0.05
          if (s.line.position.y < -30) {
            s.line.position.y = 25 + Math.random() * 15
            s.line.position.x = (Math.random() - 0.5) * 100
          }
        } else {
          s.line.material.opacity = 0
        }
      })

      camera.position.x += (mx * 4 - camera.position.x) * 0.025
      camera.position.y += (4 + my * 2 - camera.position.y) * 0.025
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    // ── RESIZE ────────────────────────────────────────────────
    const onResize = () => {
      const nw = window.innerWidth
      const nh = window.innerHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose()
        if (o.material) o.material.dispose()
      })
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background:
          'radial-gradient(ellipse at 15% 50%, rgba(79,70,229,0.1) 0%, transparent 55%),' +
          'radial-gradient(ellipse at 85% 20%, rgba(6,182,212,0.07) 0%, transparent 50%),' +
          'radial-gradient(ellipse at 50% 90%, rgba(139,92,246,0.06) 0%, transparent 50%),' +
          '#060610',
      }}
    />
  )
}

export default CyberBackground
