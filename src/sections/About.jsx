import { useEffect, useRef } from 'react'

const stats = [
    { number: '120+', label: 'Projects' },
    { number: '8', label: 'Years Exp.' },
    { number: '40+', label: 'Clients' },
    { number: '12', label: 'Awards' },
]

export default function About() {
    const revealRefs = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
            }),
            { threshold: 0.15 }
        )
        revealRefs.current.forEach(el => el && observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const addRef = el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el) }

    return (
        <section id="about" style={{ position: 'relative', padding: '7rem 1.5rem', background: 'var(--bg)' }}>
            {/* Section label */}
            <div className="inner reveal" ref={addRef} style={{ marginBottom: '4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ width: '2rem', height: '1px', background: 'var(--amber)', display: 'block', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', color: 'var(--amber)', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
                    About
                </span>
            </div>

            {/* Two column grid */}
            <div className="inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                {/* ── Left: Portrait ── */}
                <div className="reveal" ref={addRef} style={{ transitionDelay: '0.1s' }}>
                    <div style={{ position: 'relative', overflow: 'hidden', maxWidth: '420px', aspectRatio: '3/4' }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #1a1410 0%, #0a0a0a 60%, #1a0e00 100%)' }} />
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                            <div style={{ width: '12rem', height: '18rem', borderRadius: '9999px 9999px 0 0', background: 'linear-gradient(180deg, #2a1f10 0%, #1a1208 100%)', boxShadow: '0 0 60px rgba(245,166,35,0.08)' }} />
                        </div>
                        {/* Light leaks */}
                        <div style={{ position: 'absolute', top: '-2.5rem', left: '-2.5rem', width: '14rem', height: '14rem', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.25) 0%, transparent 70%)', animation: 'lightLeak 4s ease-in-out infinite', filter: 'blur(20px)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', width: '10rem', height: '10rem', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,120,35,0.15) 0%, transparent 70%)', animation: 'lightLeak 6s ease-in-out infinite reverse', filter: 'blur(24px)', pointerEvents: 'none' }} />
                        {/* Grid overlay */}
                        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(245,166,35,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(245,166,35,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                        {/* Corner frames */}
                        {[{ top: '12px', left: '12px', borderTop: '1px solid rgba(245,166,35,0.5)', borderLeft: '1px solid rgba(245,166,35,0.5)' },
                        { top: '12px', right: '12px', borderTop: '1px solid rgba(245,166,35,0.5)', borderRight: '1px solid rgba(245,166,35,0.5)' },
                        { bottom: '12px', left: '12px', borderBottom: '1px solid rgba(245,166,35,0.5)', borderLeft: '1px solid rgba(245,166,35,0.5)' },
                        { bottom: '12px', right: '12px', borderBottom: '1px solid rgba(245,166,35,0.5)', borderRight: '1px solid rgba(245,166,35,0.5)' },
                        ].map((s, i) => <div key={i} style={{ position: 'absolute', width: '1.5rem', height: '1.5rem', pointerEvents: 'none', ...s }} />)}
                        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', fontFamily: 'var(--font-body)', color: 'rgba(245,166,35,0.6)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                            Portrait / Editor
                        </div>
                    </div>
                </div>

                {/* ── Right: Bio ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="reveal" ref={addRef} style={{ transitionDelay: '0.2s' }}>
                        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: 'var(--white)', lineHeight: 1, marginBottom: '1rem' }}>
                            CRAFTING <span style={{ color: 'var(--amber)' }}>VISUAL</span><br />NARRATIVES
                        </h2>
                        <div style={{ width: '3rem', height: '2px', background: 'var(--amber)' }} />
                    </div>

                    <div className="reveal" ref={addRef} style={{ transitionDelay: '0.35s' }}>
                        <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(240,237,232,0.7)', lineHeight: 1.8, marginBottom: '1rem' }}>
                            With over 8 years behind the timeline, I transform raw footage into cinematic
                            experiences that resonate. From high-octane music videos to award-winning
                            short films, every cut is intentional.
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(240,237,232,0.5)', lineHeight: 1.8 }}>
                            My approach blends technical precision with a deep understanding of rhythm,
                            pacing, and emotion — turning stories into lasting impressions.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="reveal" ref={addRef} style={{ transitionDelay: '0.5s', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        {stats.map(({ number, label }) => (
                            <div key={label}>
                                <span style={{ fontFamily: 'var(--font-head)', color: 'var(--amber)', fontSize: '2rem', display: 'block' }}>{number}</span>
                                <span style={{ fontFamily: 'var(--font-body)', color: 'var(--muted)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="reveal" ref={addRef} style={{ transitionDelay: '0.6s' }}>
                        <a
                            href="#contact"
                            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', fontFamily: 'var(--font-body)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid var(--amber)', color: 'var(--amber)', textDecoration: 'none', transition: 'all 0.3s', cursor: 'none' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--amber)'; e.currentTarget.style.color = '#000' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--amber)' }}
                        >
                            Let's Work Together <span>→</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
