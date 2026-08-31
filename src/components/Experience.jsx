import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Shield, GraduationCap, Rocket, Smartphone, Sparkles } from 'lucide-react';

/* ── Data ────────────────────────────────────────────────────────────── */
const milestones = [
    {
        icon: Shield,
        period: 'Service',
        title: 'Military Command',
        desc: 'Leadership, ownership, and calm under pressure.',
    },
    {
        icon: GraduationCap,
        period: 'Education',
        title: 'B.Sc Computer Science',
        desc: 'Studying CS while shipping real products.',
    },
    {
        icon: Rocket,
        period: 'First builds',
        title: 'Buddiz - Serverless E-commerce',
        desc: 'A P2P platform on AWS Lambda + DynamoDB.',
    },
    {
        icon: Smartphone,
        period: 'Client work',
        title: 'F.O.R Ring & RINGA',
        desc: 'React Native apps with native SDK and realtime backends.',
    },
    {
        icon: Sparkles,
        period: 'Now',
        title: 'Open to opportunities',
        desc: 'Seeking a junior / full-stack role.',
        highlight: true,
    },
];

/* ── Card content (shared) ───────────────────────────────────────────── */
const Card = ({ item }) => {
    const { period, title, desc, highlight } = item;
    return (
        <div className="glass-card p-4 md:p-5 w-full max-w-sm transition-colors hover:border-primary/30">
            <span className={`text-[11px] md:text-xs font-semibold uppercase tracking-wider ${highlight ? 'text-secondary' : 'text-primary'}`}>
                {period}
            </span>
            <h3 className="text-base md:text-lg font-bold text-text mt-0.5 md:mt-1">{title}</h3>
            <p className="text-xs md:text-sm text-muted mt-1 leading-relaxed">{desc}</p>
        </div>
    );
};

/* ── Node dot (shared) ───────────────────────────────────────────────── */
const Node = ({ item, className }) => (
    <span
        className={`absolute top-1 z-10 flex items-center justify-center w-7 h-7 md:w-9 md:h-9 -translate-x-1/2 rounded-full bg-surface border-2 ${
            item.highlight ? 'border-secondary' : 'border-primary'
        } ${className}`}
        aria-hidden="true"
    >
        {item.highlight && (
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary/40" />
        )}
        <item.icon size={14} className={item.highlight ? 'text-secondary' : 'text-primary'} />
    </span>
);

/* ── Mobile / reduced-motion: compact single left rail ───────────────── */
const RailMilestone = ({ item, variants }) => (
    <motion.div variants={variants} className="relative pl-12 pb-6 last:pb-0">
        <Node item={item} className="left-5" />
        <Card item={item} />
    </motion.div>
);

/* ── Desktop: alternating left / right around a center rail ───────────── */
const AltMilestone = ({ item, index }) => {
    const isLeft = index % 2 === 0;
    return (
        <div className="relative grid grid-cols-2 gap-10 pb-10 last:pb-0">
            <Node item={item} className="left-1/2" />
            <div className={isLeft ? 'col-start-1 flex justify-end pr-8' : 'col-start-2 pl-8'}>
                <div className={isLeft ? 'text-right' : 'text-left'}>
                    <Card item={item} />
                </div>
            </div>
        </div>
    );
};

/* ── Experience ──────────────────────────────────────────────────────── */
const Experience = ({ sectionIndex, sectionTotal }) => {
    const shouldReduceMotion = useReducedMotion();
    const isPinned = sectionTotal != null;          // desktop: wrapped in a pinned ZSection
    const isScrub = isPinned && !shouldReduceMotion; // scroll-scrubbed timeline

    /* Map global scroll into this section's [start, end] slice → local 0→1 */
    const { scrollYProgress } = useScroll();
    const start = isPinned ? sectionIndex / sectionTotal : 0;
    const end = isPinned ? (sectionIndex + 1) / sectionTotal : 1;
    const local = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });

    /* Measure overflow so the track translates exactly its hidden height */
    const stageRef = useRef(null);
    const trackRef = useRef(null);
    const [shift, setShift] = useState(0);

    useLayoutEffect(() => {
        if (!isScrub) return;
        const measure = () => {
            if (!stageRef.current || !trackRef.current) return;
            const overflow = trackRef.current.scrollHeight - stageRef.current.clientHeight;
            setShift(Math.max(0, overflow));
        };
        measure();
        // ResizeObserver re-measures when the pinned section flips from display:none
        // (zero-height) to visible, and on viewport resize.
        const ro = new ResizeObserver(measure);
        if (stageRef.current) ro.observe(stageRef.current);
        if (trackRef.current) ro.observe(trackRef.current);
        return () => ro.disconnect();
    }, [isScrub]);

    // ZSection holds full opacity over local ~[0, 0.7], then fades out - finish the
    // scrub within that window so the last milestone lands while still fully visible.
    const y = useTransform(local, [0, 0.7], [0, -shift]);
    const lineScaleY = useTransform(local, [0, 0.66], [0.04, 1]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.12,
                delayChildren: shouldReduceMotion ? 0 : 0.1,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    const Heading = (
        <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">My Journey</h2>
            <p className="text-sm md:text-base text-muted">From command to code - the path that shaped how I build.</p>
        </div>
    );

    return (
        <section id="experience" className="py-16 md:py-0">
            <div className="container mx-auto px-6">
                {isScrub ? (
                    /* ── Desktop: pinned, scroll-scrubbed, alternating timeline ── */
                    <div className="max-w-3xl mx-auto">
                        {Heading}
                        <div ref={stageRef} className="relative h-[56vh] overflow-hidden">
                            {/* Center rail with scroll-driven fill */}
                            <div className="absolute left-1/2 top-1 bottom-1 w-px -translate-x-1/2 bg-white/10" aria-hidden="true">
                                <motion.div
                                    style={{ scaleY: lineScaleY }}
                                    className="w-full h-full origin-top bg-gradient-to-b from-primary to-secondary"
                                />
                            </div>
                            {/* Moving track - lead-in / lead-out padding (> fade height)
                                so the first and last milestones rest fully clear at the extremes */}
                            <motion.div ref={trackRef} style={{ y }} className="pt-16 pb-16">
                                {milestones.map((item, i) => (
                                    <AltMilestone key={item.title} item={item} index={i} />
                                ))}
                            </motion.div>
                            {/* Soft fade masks top/bottom so rows enter/exit gracefully */}
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background to-transparent" aria-hidden="true" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
                        </div>
                    </div>
                ) : (
                    /* ── Mobile / reduced-motion: compact reveal-on-view ───────── */
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="max-w-md mx-auto"
                    >
                        <motion.div variants={itemVariants}>{Heading}</motion.div>
                        <div className="relative">
                            <div className="absolute left-5 top-1 bottom-1 w-px -translate-x-1/2 bg-white/10" aria-hidden="true">
                                <motion.div
                                    variants={{
                                        hidden: { scaleY: shouldReduceMotion ? 1 : 0 },
                                        visible: { scaleY: 1, transition: { duration: shouldReduceMotion ? 0 : 0.9, ease: 'easeOut' } },
                                    }}
                                    className="w-full h-full origin-top bg-gradient-to-b from-primary to-secondary"
                                />
                            </div>
                            {milestones.map((item) => (
                                <RailMilestone key={item.title} item={item} variants={itemVariants} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Experience;
