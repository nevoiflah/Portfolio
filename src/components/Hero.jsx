import { Fragment, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import MagneticWrapper from './MagneticWrapper';

/* ── CountUp ─────────────────────────────────────────────────────────── */
const CountUp = ({ target, suffix = '' }) => {
    const shouldReduceMotion = useReducedMotion();
    // Lazy init avoids a synchronous setState in the effect for reduced-motion users
    const [count, setCount] = useState(() => (shouldReduceMotion ? target : 0));

    useEffect(() => {
        if (shouldReduceMotion) return;

        // Delay matches when the stats row finishes its entrance animation
        let rafId;
        const timer = setTimeout(() => {
            const duration = 1200;
            const startTime = performance.now();

            const tick = (now) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(2, -10 * progress);
                setCount(Math.round(eased * target));
                if (progress < 1) rafId = requestAnimationFrame(tick);
            };

            rafId = requestAnimationFrame(tick);
        }, 700);

        return () => { clearTimeout(timer); cancelAnimationFrame(rafId); };
    }, [target, shouldReduceMotion]);

    return <span>{count}{suffix}</span>;
};

/* ── Data ────────────────────────────────────────────────────────────── */
const stats = [
    { isCount: true,  target: 3, suffix: '+', label: 'Years Coding' },
    { isCount: true,  target: 5, suffix: '+', label: 'Projects Built' },
    { isCount: false, display: 'AWS',          label: 'Certified' },
];

/* ── Hero ────────────────────────────────────────────────────────────── */
const Hero = () => {
    const shouldReduceMotion = useReducedMotion();

    /* Container stagger — drives everything via variants */
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.12,
                delayChildren:   shouldReduceMotion ? 0 : 0.05,
            },
        },
    };

    /* Items: p, stats bar, buttons */
    const itemVariants = {
        hidden:   { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
        visible:  { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    /* h1 character container — nested stagger */
    const charContainerVariants = {
        hidden:  {},
        visible: {
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.04,
                delayChildren:   shouldReduceMotion ? 0 : 0.1,
            },
        },
    };

    /* Each character */
    const charVariants = {
        hidden:   { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 50 },
        visible:  {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 200, damping: 22 },
        },
    };

    /* min-h-screen + pt-16 is for the stacked mobile layout; inside the desktop deck
       ZSection already supplies a centred 100vh, so they would only overflow it */
    return (
        <section id="hero" className="min-h-screen md:min-h-0 flex items-center justify-center relative overflow-hidden pt-16 md:pt-0">
            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto"
                >
                    {/* Availability status pill */}
                    <motion.div variants={itemVariants} className="flex justify-center mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-muted backdrop-blur-sm">
                            <span className="relative flex h-2 w-2" aria-hidden="true">
                                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            Available for full-stack roles
                        </span>
                    </motion.div>

                    {/* Avatar */}
                    <motion.div variants={itemVariants}>
                        <MagneticWrapper>
                            <img
                                src="https://github.com/nevoiflah.png"
                                alt="Nevo Iflah"
                                width={128}
                                height={128}
                                className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white/10 shadow-2xl hover:scale-110 hover:border-primary/50 transition-all duration-500"
                            />
                        </MagneticWrapper>
                    </motion.div>

                    {/* Greeting */}
                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-primary font-medium mb-4">
                        Hello, I'm
                    </motion.p>

                    {/* Name — character-by-character */}
                    <motion.h1
                        aria-label="Nevo Iflah"
                        variants={charContainerVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-text via-primary to-text bg-[length:200%_auto] motion-safe:animate-gradient"
                    >
                        {"Nevo Iflah".split("").map((char, i) => (
                            <motion.span
                                key={i}
                                variants={charVariants}
                                className={char === ' ' ? 'inline' : 'inline-block'}
                            >
                                {char === ' ' ? ' ' : char}
                            </motion.span>
                        ))}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted mb-6 max-w-2xl mx-auto">
                        B.Sc Computer Science · Full Stack Developer
                    </motion.p>

                    {/* Credibility stats with CountUp */}
                    <motion.div variants={itemVariants} className="flex justify-center items-center mb-10">
                        {stats.map(({ isCount, target, suffix, display, label }, i) => (
                            <Fragment key={label}>
                                {i > 0 && <span className="w-px h-10 bg-white/10 mx-6 sm:mx-10" aria-hidden="true" />}
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-text">
                                        {isCount
                                            ? <CountUp target={target} suffix={suffix} />
                                            : display
                                        }
                                    </div>
                                    <div className="text-xs text-muted mt-0.5 whitespace-nowrap">{label}</div>
                                </div>
                            </Fragment>
                        ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <MagneticWrapper>
                            <button
                                onClick={() => window.scrollToSection?.(4)}
                                className="w-48 px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 active:scale-95 active:opacity-80 transition-all cursor-pointer block"
                            >
                                View Projects
                            </button>
                        </MagneticWrapper>
                        <MagneticWrapper>
                            <button
                                onClick={() => window.scrollToSection?.(5)}
                                className="w-48 px-8 py-3 bg-surface border border-white/10 rounded-full font-medium hover:bg-white/5 active:scale-95 active:opacity-80 transition-all cursor-pointer block"
                            >
                                Contact Me
                            </button>
                        </MagneticWrapper>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
