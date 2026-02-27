import { useEffect, useRef } from 'react'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Services'
import Skills from './sections/Testimonials'
import Showreel from './sections/Showreel'
import Contact from './sections/Contact'
import './index.css'

export default function App() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  // ── Custom cursor ──────────────────────────────────────────────
  useEffect(() => {
    const onMove = e => { mousePos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    // Hover detection
    const onEnter = () => ringRef.current?.classList.add('hovered')
    const onLeave = () => ringRef.current?.classList.remove('hovered')

    const attachHover = () => {
      document.querySelectorAll('a, button, .magnetic-btn').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attachHover()

    // Animate ring with lerp
    const animate = () => {
      const { x, y } = mousePos.current
      ringPos.current.x += (x - ringPos.current.x) * 0.12
      ringPos.current.y += (y - ringPos.current.y) * 0.12

      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`
        dotRef.current.style.top = `${y}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      {/* Custom cursor elements */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />

      <Navbar />

      <main className="w-full flex-1">
        <Hero />
        <About />
        <Work />
        <Skills />
        <Showreel />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
