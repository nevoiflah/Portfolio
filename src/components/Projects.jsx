import { useState } from 'react';
import {
    motion, AnimatePresence,
    useReducedMotion, useMotionValue, useMotionTemplate,
} from 'framer-motion';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { SiAppstore } from 'react-icons/si';
import useIsMobile from '../hooks/useIsMobile';

/* ── App Store action ── mobile: direct link · desktop: flip to QR ────── */
const AppStoreAction = ({ project, onFlip }) => {
    const isMobile = useIsMobile();

    /* Mobile — already on the device, deep-link straight to the store */
    if (isMobile) {
        return (
            <a
                href={project.appStore}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download ${project.title} on the App Store (opens in new tab)`}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary active:opacity-70 transition-all"
            >
                <SiAppstore size={16} aria-hidden="true" />
                App Store
            </a>
        );
    }

    /* Desktop — flip the card to reveal a scannable QR */
    return (
        <button
            type="button"
            onClick={onFlip}
            aria-label={`Show App Store download options for ${project.title}`}
            className="flex items-center gap-2 text-sm font-medium hover:text-primary active:opacity-70 transition-all cursor-pointer"
        >
            <SiAppstore size={16} aria-hidden="true" />
            App Store
        </button>
    );
};

/* ── Data ────────────────────────────────────────────────────────────── */
const projects = [
    {
        title: "Buddiz",
        description: "A P2P craft beer e-commerce platform featuring secure payments, real-time order tracking, and a dynamic product catalog. Built with a serverless architecture.",
        tags: ["React", "AWS Lambda", "DynamoDB", "Cognito"],
        github: "https://github.com/nevoiflah/BuddizProject",
        live: "https://www.buddiz.link",
        screenshot: "/screenshots/buddiz.png",
        color: "from-yellow-500 to-orange-500",
        metric: "Serverless · ~$0 idle cost",
    },
    {
        title: "F.O.R Ring",
        description: "Premium smart ring companion app with deep native SDK integration for real-time health monitoring. Features dual-phase Bluetooth sync, HRV & sleep analytics, and a glassmorphism UI.",
        tags: ["React Native", "Expo", "Swift/Kotlin", "MongoDB Atlas", "Firebase"],
        live: "https://foring.co.il",
        screenshot: "/screenshots/foring.png",
        color: "from-blue-500 to-indigo-600",
        metric: "Dual-phase BLE health sync",
    },
    {
        title: "COUNT — Intimacy Journal",
        description: "A premium, privacy-first mobile tracking app and marketing site. Features secure authentication, proprietary analytics algorithms, and interactive SVG visualizations.",
        tags: ["React Native", "Next.js", "Firebase", "TypeScript", "Framer Motion"],
        live: "https://countintimacyjournal.com",
        appStore: "https://apps.apple.com/app/id6759260989",
        qr: "/qr/count-appstore.svg",
        screenshot: "/screenshots/count.png",
        color: "from-zinc-400 to-zinc-600",
        metric: "Privacy-first · on-device",
    },
];

/* ── Browser mockup ──────────────────────────────────────────────────── */
const BrowserMockup = ({ project }) => {
    const url = (project.live || project.github || '').replace('https://', '');
    return (
        <div className="relative h-44 overflow-hidden bg-black">
            {project.screenshot && (
                <img
                    src={project.screenshot}
                    alt={`${project.title} website preview`}
                    width={1280}
                    height={720}
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
            )}
            <div className="relative z-10 flex items-center gap-1.5 px-4 h-8 bg-black/60 border-b border-white/10 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-red-400/70"    aria-hidden="true" />
                <span className="w-2 h-2 rounded-full bg-yellow-400/70" aria-hidden="true" />
                <span className="w-2 h-2 rounded-full bg-green-400/70"  aria-hidden="true" />
                {url && (
                    <span className="flex-1 mx-2 px-3 h-4 bg-white/10 rounded text-[9px] text-white/50 leading-4 truncate">
                        {url}
                    </span>
                )}
            </div>
        </div>
    );
};

/* ── ProjectCard ── glow + optional 3D flip to an App Store QR ───────── */
const ProjectCard = ({ project, variants, shouldReduceMotion }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const background = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(139,92,246,0.10), transparent 40%)`;
    const [flipped, setFlipped] = useState(false);

    const handleMouseMove = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    return (
        <motion.div
            variants={variants}
            whileHover={shouldReduceMotion ? {} : { y: -6 }}
            onMouseMove={handleMouseMove}
            className="group relative h-full flip-3d"
        >
            <motion.div
                className="flip-inner h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* ── FRONT ── */}
                <div
                    inert={flipped}
                    className="flip-face relative flex flex-col h-full rounded-2xl overflow-hidden bg-surface/50 backdrop-blur-sm border border-white/5 group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-primary/10 transition-colors duration-300"
                >
                    {/* Motion-value glow — pointer-events-none so links beneath are always clickable */}
                    <motion.div
                        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background }}
                    />

                    {/* Per-project color identity — thin gradient accent at the top edge */}
                    <div className={`relative z-10 h-1 w-full shrink-0 bg-gradient-to-r ${project.color}`} aria-hidden="true" />

                    {/* Screenshot preview */}
                    <div className="relative z-10 shrink-0">
                        <BrowserMockup project={project} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-2 text-text group-hover:text-primary transition-colors duration-300">
                            {project.title}
                        </h3>
                        {project.metric && (
                            <p className="flex items-center gap-2 mb-3 text-xs font-medium text-muted">
                                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.color}`} aria-hidden="true" />
                                {project.metric}
                            </p>
                        )}
                        <p className="text-muted mb-5 leading-relaxed text-sm">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 text-xs font-medium bg-white/5 text-muted rounded-full border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 mt-auto">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                                    className="flex items-center gap-2 text-sm font-medium hover:text-primary active:opacity-70 transition-all"
                                >
                                    <Github size={16} aria-hidden="true" />
                                    View Code
                                </a>
                            )}
                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit ${project.title} live website (opens in new tab)`}
                                    className="flex items-center gap-2 text-sm font-medium hover:text-primary active:opacity-70 transition-all"
                                >
                                    <ExternalLink size={16} aria-hidden="true" />
                                    Visit Website
                                </a>
                            )}
                            {project.appStore && (
                                <AppStoreAction project={project} onFlip={() => setFlipped(true)} />
                            )}
                        </div>
                    </div>
                </div>

                {/* ── BACK ── App Store QR (desktop flip target) ── */}
                {project.appStore && (
                    <div
                        inert={!flipped}
                        className="flip-face flip-rear flex flex-col items-center justify-center gap-3 h-full rounded-2xl overflow-hidden bg-surface border border-primary/30 p-6 text-center"
                    >
                        <div className="rounded-xl bg-white p-3 shadow-lg">
                            <img
                                src={project.qr}
                                alt={`QR code to download ${project.title} on the App Store`}
                                width={150}
                                height={150}
                                className="w-[150px] h-[150px]"
                                loading="lazy"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-text">Scan to download</p>
                            <p className="text-xs text-muted mt-0.5">Point your phone camera at the code</p>
                        </div>
                        <a
                            href={project.appStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.title} on the App Store (opens in new tab)`}
                            className="flex items-center justify-center gap-2 w-full max-w-[210px] px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 active:scale-95 transition-all"
                        >
                            <SiAppstore size={16} aria-hidden="true" />
                            Open App Store
                        </a>
                        <button
                            type="button"
                            onClick={() => setFlipped(false)}
                            className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-text transition-colors cursor-pointer"
                        >
                            <ArrowLeft size={14} aria-hidden="true" />
                            Back
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

/* ── Mobile carousel ─ AnimatePresence single-card with swipe ──────── */
const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? '70%' : '-70%', opacity: 0 }),
    center: {
        x: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 280, damping: 28 },
    },
    exit: (dir) => ({
        x: dir < 0 ? '70%' : '-70%',
        opacity: 0,
        transition: { duration: 0.18 },
    }),
};

const MobileCarousel = ({ projects, shouldReduceMotion }) => {
    const [[page, dir], setPage] = useState([0, 0]);

    const paginate = (newDir) => {
        setPage(([p]) => {
            const next = p + newDir;
            if (next < 0 || next >= projects.length) return [p, 0];
            return [next, newDir];
        });
    };

    return (
        <div>
            <div className="relative overflow-hidden">
                <AnimatePresence initial={false} custom={dir} mode="wait">
                    <motion.div
                        key={page}
                        custom={dir}
                        variants={shouldReduceMotion ? {} : slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.08}
                        onDragEnd={(_, { offset, velocity }) => {
                            if (offset.x < -40 || velocity.x < -400) paginate(1);
                            else if (offset.x > 40 || velocity.x > 400) paginate(-1);
                        }}
                        className="cursor-grab active:cursor-grabbing"
                    >
                        <ProjectCard
                            project={projects[page]}
                            variants={{}}
                            shouldReduceMotion={shouldReduceMotion}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center items-center gap-2 mt-6" role="tablist" aria-label="Project navigation">
                {projects.map((_, i) => (
                    <button
                        key={i}
                        role="tab"
                        aria-selected={i === page}
                        aria-label={`View project ${i + 1}`}
                        onClick={() => setPage([i, i > page ? 1 : -1])}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === page ? 'w-6 bg-primary' : 'w-1.5 bg-white/30 hover:bg-white/60'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

/* ── Projects section ────────────────────────────────────────────────── */
const Projects = () => {
    const shouldReduceMotion = useReducedMotion();
    const isMobile = useIsMobile();

    const containerVariants = {
        hidden:  { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.08,
                delayChildren:   shouldReduceMotion ? 0 : 0.05,
            },
        },
    };

    const itemVariants = {
        hidden:   { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 },
        visible:  { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                        <p className="text-muted max-w-2xl mx-auto">
                            A selection of my recent work in full-stack development and cloud solutions.
                        </p>
                    </motion.div>

                    {isMobile ? (
                        /* Mobile: swipeable single-card carousel */
                        <motion.div variants={itemVariants}>
                            <MobileCarousel projects={projects} shouldReduceMotion={shouldReduceMotion} />
                        </motion.div>
                    ) : (
                        /* Desktop: 3-column grid */
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    project={project}
                                    variants={itemVariants}
                                    shouldReduceMotion={shouldReduceMotion}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
