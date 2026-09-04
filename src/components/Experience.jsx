import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Shield, GraduationCap, Rocket, Smartphone, Sparkles } from 'lucide-react';

const milestones = [
    { icon: Shield, period: 'Foundation', title: 'Military Command', desc: 'Learned to lead, take ownership, and stay composed under pressure.', proof: 'Leadership · Responsibility' },
    { icon: GraduationCap, period: 'Education', title: 'B.Sc. Computer Science', desc: 'Built strong foundations in software engineering, systems, and problem-solving.', proof: 'Software · Systems · Algorithms' },
    { icon: Rocket, period: 'First Product', title: 'Buddiz', desc: 'Designed a complete peer-to-peer marketplace using React and AWS.', proof: 'Serverless architecture' },
    { icon: Smartphone, period: 'Production Mobile', title: 'NIVORA, RINGA & COUNT', desc: 'Shipped cross-platform products spanning native SDKs, realtime systems, privacy, and wellness data.', proof: 'React Native · iOS · Android' },
    { icon: Sparkles, period: 'Today', title: 'Ready for what’s next', desc: 'Looking to join a product-focused engineering team where I can contribute and keep growing.', proof: 'Open to engineering roles', highlight: true },
];

const JourneyCard = ({ item, index, progress }) => {
    const Icon = item.icon;
    const focus = index / (milestones.length - 1);
    const restingProgress = useMotionValue(focus);
    const resolvedProgress = progress || restingProgress;
    const focusRange = [focus - 0.28, focus - 0.12, focus, focus + 0.12, focus + 0.28];
    const scale = useTransform(resolvedProgress, focusRange, [0.88, 0.94, 1, 0.94, 0.88], { clamp: true });
    const opacity = useTransform(resolvedProgress, focusRange, [0.34, 0.64, 1, 0.64, 0.34], { clamp: true });
    const y = useTransform(resolvedProgress, focusRange, [16, 8, 0, 8, 16], { clamp: true });
    const card = (
        <article className={`journey-card relative flex h-[245px] w-[280px] shrink-0 snap-center flex-col overflow-hidden p-6 md:h-[270px] md:w-[330px] ${item.highlight ? 'border-l-secondary/70' : 'border-l-primary/45'}`}>
            <span className="absolute -right-1 -top-5 text-[88px] font-black leading-none tracking-tighter text-white/[0.035]" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div className={`mb-7 flex h-10 w-10 items-center justify-center rounded-full border ${item.highlight ? 'border-secondary/50 text-secondary' : 'border-primary/40 text-primary'}`}><Icon size={17} aria-hidden="true" /></div>
            <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${item.highlight ? 'text-secondary' : 'text-primary'}`}>{String(index + 1).padStart(2, '0')} · {item.period}</span>
            <h3 className="mt-2 text-xl font-bold text-text">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
            <p className="mt-auto pt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">{item.proof}</p>
        </article>
    );

    if (!progress) return card;

    return (
        <motion.div style={{ scale, opacity, y }} className="relative w-[330px] shrink-0 pb-12">
            {card}
            <span className="absolute bottom-[15px] left-1/2 h-7 w-px -translate-x-1/2 bg-gradient-to-b from-white/20 to-white/60" aria-hidden="true" />
            <span className={`absolute bottom-[8px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 bg-background ${item.highlight ? 'border-secondary shadow-[0_0_16px_rgba(168,85,247,0.65)]' : 'border-primary shadow-[0_0_14px_rgba(59,130,246,0.45)]'}`} aria-hidden="true" />
        </motion.div>
    );
};

const Experience = ({ sectionIndex, sectionTotal }) => {
    const shouldReduceMotion = useReducedMotion();
    const isPinned = sectionTotal != null;
    const stageRef = useRef(null);
    const trackRef = useRef(null);
    const [shift, setShift] = useState(0);
    const { scrollYProgress } = useScroll();
    const start = isPinned ? sectionIndex / sectionTotal : 0;
    const end = isPinned ? (sectionIndex + 1) / sectionTotal : 1;
    const local = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });
    const x = useTransform(local, [0.08, 0.68], [0, -shift]);
    const journeyProgress = useTransform(local, [0.08, 0.68], [0, 1], { clamp: true });
    const lineScaleX = useTransform(local, [0.05, 0.66], [0.03, 1]);

    useLayoutEffect(() => {
        if (!isPinned || shouldReduceMotion) return undefined;
        const measure = () => {
            if (!stageRef.current || !trackRef.current) return;
            setShift(Math.max(0, trackRef.current.scrollWidth - stageRef.current.clientWidth));
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(stageRef.current);
        observer.observe(trackRef.current);
        return () => observer.disconnect();
    }, [isPinned, shouldReduceMotion]);

    const heading = <div className="mb-9 text-center md:mb-10"><h2 className="mb-3 text-3xl font-bold md:text-4xl">My Journey</h2><p className="text-sm text-muted md:text-base">Five stages that shaped how I lead, learn, and ship products.</p></div>;

    if (!isPinned || shouldReduceMotion) {
        return <section id="experience" className="py-20"><div className="container mx-auto px-6">{heading}<div className="journey-scroll -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-5">{milestones.map((item, index) => <JourneyCard key={item.title} item={item} index={index} />)}</div><p className="mt-2 text-center text-[10px] uppercase tracking-[0.2em] text-white/30 md:hidden">Swipe to explore</p></div></section>;
    }

    return (
        <section id="experience" className="py-0"><div className="container mx-auto px-6">{heading}
            <div ref={stageRef} className="relative overflow-hidden px-3 pb-7">
                <div className="absolute bottom-[15px] left-3 right-3 h-px bg-white/10" aria-hidden="true"><motion.div style={{ scaleX: lineScaleX }} className="h-full w-full origin-left bg-gradient-to-r from-primary to-secondary" /></div>
                <motion.div ref={trackRef} style={{ x }} className="flex w-max items-end gap-6 pr-3">{milestones.map((item, index) => <JourneyCard key={item.title} item={item} index={index} progress={journeyProgress} />)}</motion.div>
            </div>
            <div className="mt-3 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/30" aria-hidden="true"><span>Scroll</span><span className="h-px w-12 bg-white/20" /><span>05</span></div>
        </div></section>
    );
};

export default Experience;
