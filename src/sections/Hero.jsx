import { useEffect, useRef, useState } from 'react'

const editorName = 'ALEX MONROE'
const letters = editorName.split('')

export default function Hero() {
    const [started, setStarted] = useState(false)
    const bgRef = useRef(null)

    useEffect(() => {
        const t = setTimeout(() => setStarted(true), 200)
        return () => clearTimeout(t)
    }, [])

    // Parallax on scroll
    useEffect(() => {
        const onScroll = () => {
            if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <section
            id="hero"
            className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden film-grain vignette"
            style={{ background: 'var(--bg)' }}
        >
            {/* Radial amber BG glow */}
            <div
                ref={bgRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,166,35,0.07) 0%, transparent 70%)',
                    willChange: 'transform',
                }}
            />

            {/* Vertical decoration lines */}
            {[15, 85].map(pos => (
                <div key={pos} className="absolute top-0 bottom-0 w-px pointer-events-none"
                    style={{ left: `${pos}%`, background: 'linear-gradient(to bottom, transparent, rgba(245,166,35,0.15), transparent)' }} />
            ))}

            {/* Blinking record dot */}
            <div className="flex items-center gap-2 mb-8 z-10">
                <span className="animate-blink w-2.5 h-2.5 rounded-full" style={{ background: 'var(--amber)' }} />
                <span className="text-xs tracking-[0.35em] uppercase"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--muted)' }}>
                    Now Editing
                </span>
            </div>

            {/* Name — staggered letter reveal */}
            <h1
                className="relative z-10 text-center select-none"
                style={{
                    fontFamily: 'var(--font-head)',
                    fontSize: 'clamp(3.5rem, 12vw, 10rem)',
                    lineHeight: 0.9,
                    letterSpacing: '0.08em',
                }}
            >
                {letters.map((char, i) => (
                    <span
                        key={i}
                        className="inline-block"
                        style={{
                            opacity: started ? 1 : 0,
                            transform: started ? 'translateY(0) skewY(0deg)' : 'translateY(120%) skewY(8deg)',
                            filter: started ? 'blur(0)' : 'blur(8px)',
                            transition: `opacity 0.7s ease ${i * 0.04}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s, filter 0.7s ease ${i * 0.04}s`,
                            color: 'var(--white)',
                            width: char === ' ' ? '0.4em' : 'auto',
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </h1>

            {/* Amber divider */}
            <div
                className="z-10 mt-6 mb-8"
                style={{
                    width: started ? '120px' : '0px',
                    height: '2px',
                    background: 'var(--amber)',
                    transition: 'width 0.8s ease 0.9s',
                }}
            />

            {/* Tagline */}
            <p
                className="relative z-10 text-center tracking-widest uppercase"
                style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--muted)',
                    fontSize: 'clamp(0.7rem, 1.8vw, 0.95rem)',
                    letterSpacing: '0.3em',
                    opacity: started ? 1 : 0,
                    transform: started ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 1s ease 1s, transform 1s ease 1s',
                }}
            >
                Cutting stories.{' '}
                <span style={{ color: 'var(--amber)' }}>Frame by frame.</span>
            </p>

            {/* Scroll cue */}
            <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
                style={{ opacity: started ? 1 : 0, transition: 'opacity 1s ease 1.6s' }}
            >
                <span className="text-xs tracking-[0.25em] uppercase"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--muted)' }}>
                    Scroll
                </span>
                <div className="w-px h-12"
                    style={{ background: 'linear-gradient(to bottom, var(--amber), transparent)', animation: 'fadeUp 1.5s ease infinite alternate' }} />
            </div>

            {/* Corner L-frames */}
            {['top-6 left-6 border-t border-l', 'top-6 right-6 border-t border-r',
                'bottom-6 left-6 border-b border-l', 'bottom-6 right-6 border-b border-r',
            ].map((cls, i) => (
                <div key={i} className={`absolute w-8 h-8 ${cls} pointer-events-none z-10`}
                    style={{ borderColor: 'rgba(245,166,35,0.4)' }} />
            ))}
        </section>
    )
}
