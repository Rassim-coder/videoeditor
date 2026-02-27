import { useEffect, useRef, useState } from 'react'

export default function Showreel() {
    const sectionRef = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => { if (entries[0].isIntersecting) { setVisible(true); observer.disconnect() } },
            { threshold: 0.2 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    const fade = (delay = '0s') => ({
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.7s ease ${delay}`,
    })

    return (
        <section id="showreel" ref={sectionRef}
            style={{ position: 'relative', padding: '7rem 1.5rem', overflow: 'hidden', background: '#060606' }}>
            {/* Label */}
            <div className="inner" style={{ ...fade('0.1s'), marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ width: '2rem', height: '1px', background: 'var(--amber)', display: 'block', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', color: 'var(--amber)', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
                    Showreel
                </span>
            </div>

            <div className="inner" style={{ ...fade('0.2s'), marginBottom: '3rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--white)', lineHeight: 1 }}>
                    THE WORK
                </h2>
            </div>

            {/* Video container */}
            <div className="inner-sm" style={{ position: 'relative', opacity: visible ? 1 : 0, animation: visible ? 'flicker 0.8s ease 0.4s both' : 'none', transition: 'opacity 0.5s ease 0.4s' }}>
                {/* Amber border */}
                <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(245,166,35,0.25)', pointerEvents: 'none', zIndex: 30 }} />

                {/* Corner L-brackets */}
                {[{ top: '8px', left: '8px', borderTop: '1px solid var(--amber)', borderLeft: '1px solid var(--amber)' },
                { top: '8px', right: '8px', borderTop: '1px solid var(--amber)', borderRight: '1px solid var(--amber)' },
                { bottom: '8px', left: '8px', borderBottom: '1px solid var(--amber)', borderLeft: '1px solid var(--amber)' },
                { bottom: '8px', right: '8px', borderBottom: '1px solid var(--amber)', borderRight: '1px solid var(--amber)' },
                ].map((s, i) => <div key={i} style={{ position: 'absolute', width: '1.25rem', height: '1.25rem', pointerEvents: 'none', zIndex: 30, ...s }} />)}

                {/* Vignette */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%)', pointerEvents: 'none', zIndex: 20 }} />
                {/* Scanlines */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)', pointerEvents: 'none', zIndex: 20 }} />

                {/* 16:9 iframe */}
                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                    <iframe
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                        src="https://www.youtube.com/embed/LXb3EKWsInQ?controls=1&rel=0&modestbranding=1"
                        title="Showreel 2024"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                {/* Info bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.7)', borderTop: '1px solid rgba(245,166,35,0.1)' }}>
                    <span style={{ fontFamily: 'var(--font-body)', color: 'var(--muted)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="animate-blink" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
                        Showreel 2024
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', color: 'var(--muted)', fontSize: '0.7rem', letterSpacing: '0.15em' }}>
                        4K · 00:03:24
                    </span>
                </div>
            </div>
        </section>
    )
}
