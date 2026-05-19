import { motion, useReducedMotion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
    {
        title: "Buddiz",
        description: "A P2P craft beer e-commerce platform featuring secure payments, real-time order tracking, and a dynamic product catalog. Built with a serverless architecture.",
        tags: ["React", "AWS Lambda", "DynamoDB", "Cognito"],
        github: "https://github.com/nevoiflah/BuddizProject",
        live: "https://www.buddiz.link",
        screenshot: "/screenshots/buddiz.png",
        color: "from-yellow-500 to-orange-500"
    },
    {
        title: "FOR Ring",
        description: "Premium smart ring companion app with deep native SDK integration for real-time health monitoring. Features dual-phase Bluetooth sync, HRV & sleep analytics, and a glassmorphism UI.",
        tags: ["React Native", "Expo", "Swift/Kotlin", "MongoDB Atlas", "Firebase"],
        live: "https://foring.co.il",
        screenshot: "/screenshots/foring.png",
        color: "from-blue-500 to-indigo-600"
    },
    {
        title: "COUNT — Intimacy Journal",
        description: "A premium, privacy-first mobile tracking app and marketing site. Features secure authentication, proprietary analytics algorithms, and interactive SVG visualizations.",
        tags: ["React Native", "Next.js", "Firebase", "TypeScript", "Framer Motion"],
        live: "https://countintimacyjournal.com",
        screenshot: "/screenshots/count.png",
        color: "from-zinc-400 to-zinc-600"
    }
];

const BrowserMockup = ({ project }) => {
    const url = (project.live || project.github || '').replace('https://', '');
    return (
        <div className="relative h-44 overflow-hidden bg-black">
            {/* Real screenshot */}
            {project.screenshot && (
                <img
                    src={project.screenshot}
                    alt={`${project.title} website preview`}
                    width={1280}
                    height={720}
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
            )}

            {/* Browser chrome overlay */}
            <div className="relative z-10 flex items-center gap-1.5 px-4 h-8 bg-black/60 border-b border-white/10 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-red-400/70" aria-hidden="true" />
                <span className="w-2 h-2 rounded-full bg-yellow-400/70" aria-hidden="true" />
                <span className="w-2 h-2 rounded-full bg-green-400/70" aria-hidden="true" />
                {url && (
                    <span className="flex-1 mx-2 px-3 h-4 bg-white/10 rounded text-[9px] text-white/50 leading-4 truncate">
                        {url}
                    </span>
                )}
            </div>
        </div>
    );
};

const Projects = () => {
    const shouldReduceMotion = useReducedMotion();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.08,
                delayChildren: shouldReduceMotion ? 0 : 0.05,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    const handleMouseMove = (e) => {
        const el = e.currentTarget;
        if (el._rafId) return;
        const { clientX, clientY } = e;
        el._rafId = requestAnimationFrame(() => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--mouse-x', `${clientX - rect.left}px`);
            el.style.setProperty('--mouse-y', `${clientY - rect.top}px`);
            el._rafId = null;
        });
    };

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                        <p className="text-muted max-w-2xl mx-auto">
                            A selection of my recent work in full-stack development and cloud solutions.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={shouldReduceMotion ? {} : { y: -10 }}
                                onMouseMove={handleMouseMove}
                                className="group relative bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Mouse glow */}
                                <div
                                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)' }}
                                />

                                {/* Browser mockup preview */}
                                <div className="relative z-10 shrink-0">
                                    <BrowserMockup project={project} />
                                </div>

                                <div className="relative z-10 p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-3 text-text group-hover:text-primary transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted mb-5 leading-relaxed text-sm">
                                        {project.description}
                                    </p>
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
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
