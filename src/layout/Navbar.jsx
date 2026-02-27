import { useEffect, useRef, useState } from 'react'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Showreel', href: '#showreel' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleLink = (e, href) => {
        e.preventDefault()
        setMenuOpen(false)
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 backdrop-blur-md border-b border-white/5' : 'py-6'
                }`}
            style={{ background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent' }}
        >
            <nav className="inner" style={{ padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={e => handleLink(e, '#hero')}
                    className="font-head text-2xl tracking-widest text-amber cursor-none"
                    style={{ color: 'var(--amber)', fontFamily: 'var(--font-head)' }}
                >
                    FRAME<span className="text-white">&amp;</span>CUT
                </a>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ label, href }) => (
                        <li key={label}>
                            <a
                                href={href}
                                onClick={e => handleLink(e, href)}
                                className="
                  font-body text-sm tracking-widest uppercase text-white/60
                  hover:text-amber transition-colors duration-300 cursor-none
                  relative after:absolute after:bottom-0 after:left-0 after:h-px
                  after:w-0 hover:after:w-full after:bg-amber after:transition-all after:duration-300
                "
                                style={{ fontFamily: 'var(--font-body)', color: '' }}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 cursor-none"
                    onClick={() => setMenuOpen(p => !p)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </nav>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="flex flex-col gap-4 px-6 py-6 border-t border-white/10"
                    style={{ background: 'rgba(10,10,10,0.97)' }}>
                    {navLinks.map(({ label, href }) => (
                        <li key={label}>
                            <a
                                href={href}
                                onClick={e => handleLink(e, href)}
                                className="block text-xl tracking-widest uppercase cursor-none"
                                style={{ fontFamily: 'var(--font-head)', color: 'var(--white)' }}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}
