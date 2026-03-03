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
        title: "EcoShower",
        description: "Smart shower system integrating IoT for water conservation. Features dynamic pricing algorithms, real-time usage monitoring, and multi-language support.",
        tags: ["React", "Node.js", "AWS IoT", "Dynamic Pricing"],
        github: "https://github.com/nevoiflah/EcoShower-Project",
        live: "https://d146icdz852jj7.cloudfront.net",
        color: "from-green-400 to-emerald-600"
    },
    {
        title: "COUNT — Intimacy Journal",
        description: "A premium, privacy-first mobile tracking app and marketing site. Features secure authentication, proprietary analytics algorithms, and interactive SVG visualizations.",
        tags: ["React Native", "Next.js", "Firebase", "TypeScript", "Framer Motion"],
        live: "https://countintimacyjournal.com",
        color: "from-zinc-400 to-zinc-600"
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-muted max-w-2xl mx-auto">
                        A selection of my recent work in full-stack development and cloud solutions.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full"
                        >
                            <div className={`h-1 w-full shrink-0 bg-gradient-to-r ${project.color} opacity-75 group-hover:opacity-100 transition-opacity`} />
                            <div className="p-8 flex flex-col flex-grow">
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
                                            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                                        >
                                            <Github size={18} />
                                            View Code
                                        </a>
                                    )}
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                                        >
                                            <ExternalLink size={18} />
                                            Visit Website
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
