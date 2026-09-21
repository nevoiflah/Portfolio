import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

function shouldShowIntro() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.scrollY > 20 || (window.location.hash && window.location.hash !== '#hero')) return false;
    return true;
}

const Hero = () => {
    const [opening, setOpening] = useState(shouldShowIntro);

    useEffect(() => {
        if (!opening) return;
        const finish = () => {
            setOpening(false);
        };
        const onKey = (event) => {
            if (['Tab', 'Escape', 'ArrowDown', 'PageDown', 'End', ' '].includes(event.key)) finish();
        };
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const timer = window.setTimeout(finish, 3400);
        window.addEventListener('wheel', finish, { passive: true });
        window.addEventListener('touchmove', finish, { passive: true });
        window.addEventListener('keydown', onKey);
        motionPreference.addEventListener('change', finish);
        return () => {
            window.clearTimeout(timer);
            window.removeEventListener('wheel', finish);
            window.removeEventListener('touchmove', finish);
            window.removeEventListener('keydown', onKey);
            motionPreference.removeEventListener('change', finish);
        };
    }, [opening]);

    const navigate = (event, index) => {
        if (window.scrollToSection && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
            event.preventDefault();
            window.scrollToSection(index);
        }
    };

    return (
        <section id="hero" aria-labelledby="hero-title" className={`landing-hero ${opening ? 'is-opening' : 'is-settled'}`}>
            <div className="hero-scene">
                <div className="hero-workspace" aria-hidden="true">
                    <p className="hero-workspace-caption">A little of what’s on my mind</p>
                    <div className="workspace-piece workspace-app">
                        <div className="workspace-card workspace-app-card">
                            <div className="workspace-chrome"><i /><i /><i /><span>studio</span></div>
                            <div className="workspace-app-layout">
                                <div className="workspace-sidebar"><i /><i /><i /></div>
                                <div className="workspace-app-content"><span className="workspace-skeleton" /><div className="workspace-app-banner"><span /><span /></div><div className="workspace-app-tiles"><i /><i /><i /></div></div>
                            </div>
                        </div>
                    </div>
                    <div className="workspace-piece workspace-code">
                        <div className="workspace-card workspace-code-card">
                            <div className="workspace-chrome"><i /><i /><i /><span>hello.tsx</span></div>
                            <div className="workspace-code-lines"><div><em>const</em> idea = {'{'}</div><div className="workspace-code-indent">human: <b>true</b>,</div><div className="workspace-code-indent">possibility: <b>∞</b></div><div>{'}'}</div><div className="workspace-code-last">build(idea)<span className="workspace-cursor" /></div></div>
                        </div>
                    </div>
                    <div className="workspace-piece workspace-audio">
                        <div className="workspace-card workspace-audio-card">
                            <div className="workspace-audio-heading"><span className="workspace-audio-dot" /><span>A little signal</span><span>01:24</span></div>
                            <div className="workspace-wave">{[12, 21, 15, 32, 44, 26, 38, 50, 34, 22, 42, 30, 18, 27, 13].map((height, index) => <i key={index} style={{ '--bar-height': `${height}px`, '--bar-delay': `${index * -0.12}s` }} />)}</div>
                            <div className="workspace-audio-track"><span /></div>
                        </div>
                    </div>
                    <div className="workspace-piece workspace-sphere"><div className="workspace-glass-sphere"><span /></div></div>
                </div>

                <div className="hero-portrait-position">
                    <div className="playground-photo">
                        <span className="playground-photo-halo" aria-hidden="true" />
                        <div className="playground-photo-frame">
                            <img src="/portrait-enhanced.jpg" alt="Nevo Iflah" width={1254} height={1254} fetchPriority="high" draggable={false} />
                        </div>
                    </div>
                </div>

            </div>

            <div className="hero-editorial">
                <p className="hero-availability"><span />Available for roles</p>
                <p className="hero-eyebrow">Full Stack Developer</p>
                <h1 id="hero-title">Nevo Iflah<span className="hero-name-dot" aria-hidden="true"></span></h1>
                <p className="hero-statement">Thoughtful design.<br /><span>Working code.</span></p>
                <p className="hero-description">I build web and mobile apps with a focus on how they look, feel, and work.</p>
                <nav className="hero-actions" aria-label="Explore the portfolio">
                    <a href="#projects" onClick={(event) => navigate(event, 4)} className="hero-cta hero-cta-primary">View my work <ArrowDown size={17} aria-hidden="true" /></a>
                    <a href="#contact" onClick={(event) => navigate(event, 5)} className="hero-cta hero-cta-secondary">Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></a>
                </nav>
            </div>
        </section>
    );
};

export default Hero;
