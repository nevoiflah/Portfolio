import { useState, useEffect } from 'react';

const sections = [
    { id: 'hero', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

const NavDots = () => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const observers = sections.map(({ id }, index) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const observer = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(index); },
                { threshold: 0.4 }
            );
            observer.observe(el);
            return observer;
        });
        return () => observers.forEach(obs => obs?.disconnect());
    }, []);

    return (
        <nav
            aria-label="Section navigation"
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 md:hidden"
        >
            {sections.map(({ id, label }, index) => (
                <button
                    key={id}
                    onClick={() => window.scrollToSection?.(index)}
                    aria-label={`Go to ${label} section`}
                    aria-current={active === index ? 'true' : undefined}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        active === index
                            ? 'bg-primary scale-125'
                            : 'bg-white/30 hover:bg-white/60'
                    }`}
                />
            ))}
        </nav>
    );
};

export default NavDots;
