import { useEffect, useRef } from 'react'

const projects = [
    { id: 1, title: 'Neon Pulse', category: 'Music Video', year: '2024', bg: 'linear-gradient(135deg, #1a0a2e 0%, #0a0a0a 60%, #2e1a0a 100%)', accent: '#9b59b6' },
    { id: 2, title: 'The Silent Hours', category: 'Short Film', year: '2024', bg: 'linear-gradient(135deg, #0a1a2e 0%, #0a0a0a 60%, #0a1a1a 100%)', accent: '#3498db' },
    { id: 3, title: 'Apex Series', category: 'Commercial', year: '2023', bg: 'linear-gradient(135deg, #1a1a0a 0%, #0a0a0a 60%, #2e2a0a 100%)', accent: '#f5a623' },
    { id: 4, title: 'Borderlands', category: 'Documentary', year: '2023', bg: 'linear-gradient(135deg, #0a1a0a 0%, #0a0a0a 60%, #1a1a0a 100%)', accent: '#27ae60' },
    { id: 5, title: 'Velvet Storm', category: 'Music Video', year: '2023', bg: 'linear-gradient(135deg, #2e0a14 0%, #0a0a0a 60%, #1a0a0a 100%)', accent: '#e74c3c' },
    { id: 6, title: 'Raw Earth', category: 'Documentary', year: '2022', bg: 'linear-gradient(135deg, #1a1208 0%, #0a0a0a 60%, #0f1208 100%)', accent: '#e67e22' },
]

function ProjectCard({ project, delay }) {
    const cardRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
            { threshold: 0.1 }
        )
        if (cardRef.current) observer.observe(cardRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={cardRef}
            className="reveal group"
            style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/10', cursor: 'none', transitionDelay: `${delay}s` }}
        >
            <div style={{ position: 'absolute', inset: 0, background: project.bg, transition: 'transform 0.7s ease', transformOrigin: 'center' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />

            {/* Noise texture */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`
            }} />

            {/* Bottom accent line */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: project.accent, opacity: 0.4 }} />

            {/* Hover overlay */}
            <div
                style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: 'rgba(0,0,0,0.75)', opacity: 0, backdropFilter: 'blur(2px)', transition: 'opacity 0.4s ease', cursor: 'none' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0'}
            >
                <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', border: `1px solid ${project.accent}`, background: `${project.accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={project.accent}><path d="M8 5v14l11-7z" /></svg>
                </div>
                <div style={{ textAlign: 'center', padding: '0 1rem' }}>
                    <p style={{ fontFamily: 'var(--font-head)', color: 'var(--white)', fontSize: '1.25rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{project.title}</p>
                    <span style={{ fontFamily: 'var(--font-body)', color: project.accent, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: `1px solid ${project.accent}55`, background: `${project.accent}11`, padding: '0.25rem 0.75rem' }}>{project.category}</span>
                </div>
            </div>

            {/* Corner labels */}
            <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', letterSpacing: '0.15em' }}>{project.year}</span>
            </div>
            <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{project.category}</span>
            </div>
        </div>
    )
}

export default function Work() {
    const labelRef = useRef(null)
    const headRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
            { threshold: 0.1 }
        )
            ;[labelRef, headRef].forEach(r => r.current && observer.observe(r.current))
        return () => observer.disconnect()
    }, [])

    return (
        <section id="work" style={{ position: 'relative', padding: '7rem 1.5rem', background: '#080808' }}>
            <div className="inner reveal" ref={labelRef} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ width: '2rem', height: '1px', background: 'var(--amber)', display: 'block', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', color: 'var(--amber)', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>Selected Work</span>
            </div>

            <div className="inner reveal" ref={headRef} style={{ marginBottom: '3.5rem', transitionDelay: '0.1s' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--white)', lineHeight: 1 }}>THE REEL</h2>
            </div>

            <div className="inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {projects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} delay={i * 0.08} />
                ))}
            </div>
        </section>
    )
}
