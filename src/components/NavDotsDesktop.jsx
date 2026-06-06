import { useState, useEffect } from 'react';

const sections = [
    { label: 'Hero' },
    { label: 'About' },
    { label: 'Experience' },
    { label: 'Skills' },
    { label: 'Projects' },
    { label: 'Contact' },
];

const NavDotsDesktop = () => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll <= 0) return;
            const progress = window.scrollY / totalScroll;
            setActive(Math.min(5, Math.floor(progress * 6)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            aria-label="Section navigation"
            className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-5"
        >
            {sections.map(({ label }, index) => (
                <button
                    key={label}
                    onClick={() => window.scrollToSection?.(index)}
                    aria-label={`Go to ${label} section`}
                    aria-current={active === index ? 'true' : undefined}
                    className="group flex items-center gap-3"
                >
                    <span className={`text-xs font-medium transition-all duration-200 ${
                        active === index
                            ? 'opacity-100 text-primary'
                            : 'opacity-0 translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 text-muted'
                    }`}>
                        {label}
                    </span>
                    <span className={`block rounded-full transition-all duration-300 ${
                        active === index
                            ? 'w-3 h-3 bg-primary shadow-[0_0_8px_rgba(139,92,246,0.6)]'
                            : 'w-2 h-2 bg-white/30 group-hover:bg-white/70'
                    }`} aria-hidden="true" />
                </button>
            ))}
        </nav>
    );
};

export default NavDotsDesktop;
