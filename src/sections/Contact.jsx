import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

// ─── Replace these with your own EmailJS credentials ───────────────────────
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// ───────────────────────────────────────────────────────────────────────────

const socials = [
    { label: 'Instagram', href: '#', abbr: 'IG' },
    { label: 'YouTube', href: '#', abbr: 'YT' },
    { label: 'Vimeo', href: '#', abbr: 'VI' },
    { label: 'LinkedIn', href: '#', abbr: 'LI' },
]

const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '1rem 1.25rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'var(--white)',
    outline: 'none',
    transition: 'border-color 0.3s',
    borderRadius: '2px',
}

export default function Contact() {
    const formRef = useRef(null)
    const revealRefs = useRef([])
    const [status, setStatus] = useState('idle') // idle | sending | success | error
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
            }),
            { threshold: 0.1 }
        )
        revealRefs.current.forEach(el => el && observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const addRef = el => {
        if (el) {
            revealRefs.current = [...new Set([...revealRefs.current, el])]
        }
    }

    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const handleFocus = e => (e.target.style.borderColor = 'var(--amber)')
    const handleBlur = e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')

    const handleSubmit = async e => {
        e.preventDefault()
        setStatus('sending')
        try {
            await emailjs.sendForm(
                serviceId,
                templateId,
                formRef.current,
                publicKey
            )
            setStatus('success')
            setForm({ name: '', email: '', subject: '', message: '' })
        } catch (err) {
            console.error(err)
            setStatus('error')
        }
    }

    return (
        <section id="contact" style={{ position: 'relative', padding: '8rem 1.5rem', background: '#080808', overflow: 'hidden' }}>
            {/* Film grain */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, opacity: 0.3,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
                animation: 'grain 0.5s steps(2) infinite',
            }} />
            {/* Ambient glow */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(245,166,35,0.04) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

            <div className="inner-sm" style={{ position: 'relative', zIndex: 2 }}>
                {/* Label */}
                <div className="reveal" ref={addRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <span style={{ width: '2rem', height: '1px', background: 'var(--amber)', display: 'block' }} />
                    <span style={{ fontFamily: 'var(--font-body)', color: 'var(--amber)', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>Contact</span>
                    <span style={{ width: '2rem', height: '1px', background: 'var(--amber)', display: 'block' }} />
                </div>

                {/* Heading */}
                <div className="reveal" ref={addRef} style={{ textAlign: 'center', marginBottom: '0.5rem', transitionDelay: '0.1s' }}>
                    <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2.8rem, 7vw, 6rem)', color: 'var(--white)', lineHeight: 1, letterSpacing: '0.02em' }}>
                        LET'S CREATE
                    </h2>
                </div>
                <div className="reveal" ref={addRef} style={{ textAlign: 'center', marginBottom: '3.5rem', transitionDelay: '0.2s' }}>
                    <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(2.8rem, 7vw, 6rem)', color: 'var(--amber)', lineHeight: 1, letterSpacing: '0.02em' }}>
                        SOMETHING.
                    </h2>
                </div>

                {/* ── Form ── */}
                <form
                    ref={(el) => {
                        formRef.current = el
                        addRef(el)
                    }}
                    onSubmit={handleSubmit}
                    className="reveal"
                    style={{
                        transitionDelay: '0.3s',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem'
                    }}
                >
                    {/* Row: Name + Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                        <div>
                            <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.5rem' }}>
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                                placeholder="Alex Smith"
                                style={{ ...inputStyle, cursor: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.5rem' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                required
                                placeholder="you@example.com"
                                style={{ ...inputStyle, cursor: 'none' }}
                            />
                        </div>
                    </div>

                    {/* Subject */}
                    <div>
                        <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.5rem' }}>
                            Subject
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                            placeholder="Music Video — Production Inquiry"
                            style={{ ...inputStyle, cursor: 'none' }}
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.5rem' }}>
                            Message
                        </label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                            rows={6}
                            placeholder="Tell me about your project..."
                            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7, cursor: 'none' }}
                        />
                    </div>

                    {/* Submit */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                                padding: '1rem 2.5rem',
                                fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                                letterSpacing: '0.25em', textTransform: 'uppercase',
                                border: '1px solid var(--amber)', color: status === 'sending' ? 'rgba(245,166,35,0.5)' : 'var(--amber)',
                                background: 'transparent', cursor: status === 'sending' ? 'wait' : 'none',
                                transition: 'all 0.3s', opacity: status === 'sending' ? 0.6 : 1,
                            }}
                            onMouseEnter={e => { if (status !== 'sending') { e.currentTarget.style.background = 'var(--amber)'; e.currentTarget.style.color = '#000' } }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = status === 'sending' ? 'rgba(245,166,35,0.5)' : 'var(--amber)' }}
                        >
                            {status === 'sending' ? (
                                <>
                                    <span style={{ width: '12px', height: '12px', border: '1px solid var(--amber)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                                    Sending…
                                </>
                            ) : 'Send Message →'}
                        </button>

                        {/* Status messages */}
                        {status === 'success' && (
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#27ae60', letterSpacing: '0.1em' }}>
                                ✓ Message sent — I'll get back to you soon!
                            </p>
                        )}
                        {status === 'error' && (
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#e74c3c', letterSpacing: '0.1em' }}>
                                ✗ Something went wrong. Try emailing directly.
                            </p>
                        )}
                    </div>
                </form>

                {/* Divider */}
                <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)', margin: '3.5rem 0 2.5rem' }} />

                {/* Bottom: email + socials */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <a href="mailto:hello@frameandcut.com"
                        style={{ fontFamily: 'var(--font-body)', color: 'rgba(240,237,232,0.5)', fontSize: '0.85rem', letterSpacing: '0.1em', textDecoration: 'none', position: 'relative', display: 'inline-block', cursor: 'none', transition: 'color 0.3s' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--amber)' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,237,232,0.5)' }}>
                        hello@frameandcut.com
                    </a>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {socials.map(({ label, href, abbr }) => (
                            <a key={label} href={href} aria-label={label}
                                style={{ width: '2.75rem', height: '2.75rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'all 0.3s', cursor: 'none' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--amber)'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = 'var(--amber)' }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}>
                                {abbr}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
