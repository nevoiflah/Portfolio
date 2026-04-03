import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
    {
        title: "Buddiz",
        description: "A P2P craft beer e-commerce platform featuring secure payments, real-time order tracking, and a dynamic product catalog. Built with a serverless architecture.",
        tags: ["React", "AWS Lambda", "DynamoDB", "Cognito"],
        github: "https://github.com/nevoiflah/BuddizProject",
        live: "https://www.buddiz.link",
        color: "from-yellow-500 to-orange-500"
    },
    {
        title: "FOR Ring",
        description: "Premium smart ring companion app with deep native SDK integration for real-time health monitoring. Features dual-phase Bluetooth sync, HRV & sleep analytics, and a glassmorphism UI.",
        tags: ["React Native", "Expo", "Swift/Kotlin", "MongoDB Atlas", "Firebase"],
        live: "https://foring.co.il",
        color: "from-blue-500 to-indigo-600"
    },
    {
        title: "COUNT — Intimacy Journal",
        description: "A premium, privacy-first mobile tracking app and marketing site. Features secure authentication, proprietary analytics algorithms, and interactive SVG visualizations.",
        tags: ["React Native", "Next.js", "Firebase", "TypeScript", "Framer Motion"],
        live: "https://countintimacyjournal.com",
        color: "from-zinc-400 to-zinc-600"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const Projects = () => {
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
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
                                whileHover={{ y: -10 }}
                                onMouseMove={handleMouseMove}
                                className="group relative bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Glow Effect Background */}
                                <div 
                                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                                    style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)' }} 
                                />

                                <div className={`relative z-10 h-1 w-full shrink-0 bg-gradient-to-r ${project.color} opacity-75 group-hover:opacity-100 transition-opacity`} />
                                <div className="relative z-10 p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted mb-6 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 rounded-full border border-white/5">
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
                                                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                                            >
                                                <Github size={18} aria-hidden="true" />
                                                View Code
                                            </a>
                                        )}
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visit ${project.title} live website (opens in new tab)`}
                                                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                                            >
                                                <ExternalLink size={18} aria-hidden="true" />
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
