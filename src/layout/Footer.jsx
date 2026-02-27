const socials = [
    { label: 'Instagram', href: '#', icon: 'IG' },
    { label: 'YouTube', href: '#', icon: 'YT' },
    { label: 'Vimeo', href: '#', icon: 'VI' },
    { label: 'LinkedIn', href: '#', icon: 'LI' },
]

export default function Footer() {
    return (
        <footer
            className="relative overflow-hidden border-t py-12 px-6 text-center film-grain"
            style={{ background: '#050505', borderColor: 'rgba(255,255,255,0.06)' }}
        >
            {/* Logo */}
            <p
                className="text-4xl tracking-[0.3em] mb-4"
                style={{ fontFamily: 'var(--font-head)', color: 'var(--amber)' }}
            >
                FRAME<span style={{ color: 'var(--white)' }}>&amp;</span>CUT
            </p>

            {/* Tagline */}
            <p className="text-xs tracking-widest uppercase mb-8"
                style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                Cutting stories. Frame by frame.
            </p>

            {/* Socials */}
            <div className="flex items-center justify-center gap-6 mb-10">
                {socials.map(({ label, href, icon }) => (
                    <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="
              w-10 h-10 border flex items-center justify-center text-xs font-semibold
              tracking-wider cursor-none transition-all duration-300
              hover:border-amber hover:text-amber
            "
                        style={{
                            fontFamily: 'var(--font-body)',
                            borderColor: 'rgba(255,255,255,0.15)',
                            color: 'rgba(255,255,255,0.4)',
                        }}
                    >
                        {icon}
                    </a>
                ))}
            </div>

            {/* Divider */}
            <div className="w-16 h-px mx-auto mb-6" style={{ background: 'var(--amber)' }} />

            {/* Copyright */}
            <p className="text-xs tracking-widest uppercase"
                style={{ color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>
                © {new Date().getFullYear()} Frame &amp; Cut — All Rights Reserved
            </p>
        </footer>
    )
}
