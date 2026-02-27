import { useEffect, useRef } from 'react'

const tools = [
    { name: 'Adobe Premiere Pro', icon: 'Pr' },
    { name: 'DaVinci Resolve', icon: 'DV' },
    { name: 'After Effects', icon: 'Ae' },
    { name: 'Final Cut Pro', icon: 'FC' },
    { name: 'Color Grading', icon: '◈' },
    { name: 'Sound Design', icon: '♫' },
    { name: 'Motion Graphics', icon: '⬡' },
    { name: 'Adobe Audition', icon: 'Au' },
    { name: 'Cinema 4D', icon: 'C4' },
    { name: 'Adobe Photoshop', icon: 'Ps' },
]

const allTools = [...tools, ...tools]

export default function Skills() {
    const labelRef = useRef(null)
    const headRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
            }),
            { threshold: 0.1 }
        )
            ;[labelRef, headRef].forEach(r => r.current && observer.observe(r.current))
        return () => observer.disconnect()
    }, [])

    return (
        <section id="skills" style={{ position: 'relative', padding: '7rem 0', overflow: 'hidden', background: 'var(--bg)' }}>
            {/* Label */}
            <div className="inner reveal" ref={labelRef}
                style={{ padding: '0 1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ width: '2rem', height: '1px', background: 'var(--amber)', display: 'block', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', color: 'var(--amber)', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
                    Tools & Skills
                </span>
            </div>

            <div className="inner reveal" ref={headRef}
                style={{ padding: '0 1.5rem', marginBottom: '4rem', transitionDelay: '0.1s' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--white)', lineHeight: 1 }}>
                    THE TOOLKIT
                </h2>
            </div>

            {/* Film strip — top row */}
            <div style={{ position: 'relative', marginBottom: '1rem', overflow: 'hidden' }}>
                {/* Fade edges */}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6rem', background: 'linear-gradient(to right, var(--bg), transparent)', pointerEvents: 'none', zIndex: 20 }} />
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '6rem', background: 'linear-gradient(to left, var(--bg), transparent)', pointerEvents: 'none', zIndex: 20 }} />

                <div style={{ padding: '1.5rem 0 1rem', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#0d0d0d' }}>
                    <div className="film-strip-track">
                        {allTools.map((tool, i) => (
                            <div key={i} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 2rem' }}>
                                <div style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-body)', background: 'rgba(245,166,35,0.1)', color: 'var(--amber)', border: '1px solid rgba(245,166,35,0.2)', flexShrink: 0 }}>
                                    {tool.icon}
                                </div>
                                <span style={{ whiteSpace: 'nowrap', fontFamily: 'var(--font-body)', color: 'rgba(240,237,232,0.55)', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                                    {tool.name}
                                </span>
                                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--amber)', opacity: 0.4, flexShrink: 0 }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Film strip — bottom row (reversed) */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '6rem', background: 'linear-gradient(to right, var(--bg), transparent)', pointerEvents: 'none', zIndex: 20 }} />
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '6rem', background: 'linear-gradient(to left, var(--bg), transparent)', pointerEvents: 'none', zIndex: 20 }} />

                <div style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#0d0d0d' }}>
                    <div className="film-strip-track" style={{ animationDirection: 'reverse', animationDuration: '30s' }}>
                        {[...allTools].reverse().map((tool, i) => (
                            <div key={i} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 2rem' }}>
                                <span style={{ whiteSpace: 'nowrap', fontFamily: 'var(--font-body)', color: 'rgba(240,237,232,0.3)', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                                    {tool.name}
                                </span>
                                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(245,166,35,0.25)', flexShrink: 0 }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
