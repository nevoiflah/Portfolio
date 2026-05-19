import { motion, useReducedMotion } from 'framer-motion';
import {
    SiJavascript, SiTypescript, SiPython, SiHtml5,
    SiReact, SiNodedotjs, SiDotnet, SiTailwindcss, SiBootstrap, SiFlask,
    SiGit, SiDocker,
} from 'react-icons/si';

const techConfig = {
    'JavaScript (ES6+)': { icon: SiJavascript, color: '#F7DF1E' },
    'TypeScript':        { icon: SiTypescript,  color: '#3178C6' },
    'C#':                { icon: SiDotnet,      color: '#9B4F96' },
    'Python':            { icon: SiPython,      color: '#3776AB' },
    'HTML5/CSS3':        { icon: SiHtml5,       color: '#E34F26' },
    'React':             { icon: SiReact,       color: '#61DAFB' },
    'React Native':      { icon: SiReact,       color: '#61DAFB' },
    'Node.js':           { icon: SiNodedotjs,   color: '#339933' },
    'ASP.NET Core':      { icon: SiDotnet,      color: '#512BD4' },
    'Tailwind CSS':      { icon: SiTailwindcss, color: '#06B6D4' },
    'Bootstrap':         { icon: SiBootstrap,   color: '#7952B3' },
    'Flask':             { icon: SiFlask,       color: '#AAAAAA' },
    'Git & GitHub':      { icon: SiGit,         color: '#F05032' },
    'Docker':            { icon: SiDocker,      color: '#2496ED' },
};

const skills = {
    "Languages": ["JavaScript (ES6+)", "TypeScript", "C#", "Python", "SQL", "Java", "HTML5/CSS3"],
    "Frameworks & Libs": ["React", "React Native", "Node.js", "ASP.NET Core", "Tailwind CSS", "Bootstrap", "Flask"],
    "Cloud & Tools": ["AWS (Lambda, IoT, DynamoDB)", "Git & GitHub", "Docker", "RESTful APIs", "Agile/Scrum"]
};

const Skills = () => {
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
        hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
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
        <section id="skills" className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
                        <p className="text-muted">A comprehensive toolkit for building modern digital solutions.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {Object.entries(skills).map(([category, items]) => (
                            <motion.div
                                key={category}
                                variants={itemVariants}
                                onMouseMove={handleMouseMove}
                                className="group relative overflow-hidden bg-surface/50 border border-white/5 p-8 rounded-2xl transition-colors"
                            >
                                <div
                                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)' }}
                                />

                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-6 text-primary">{category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((skill, i) => {
                                            const config = techConfig[skill];
                                            return (
                                                <span key={i} className="px-3 py-1 bg-background rounded-lg text-sm text-muted border border-white/5 flex items-center gap-1.5">
                                                    {config && (
                                                        <config.icon
                                                            style={{ color: config.color }}
                                                            className="shrink-0 text-[13px]"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    {skill}
                                                </span>
                                            );
                                        })}
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

export default Skills;
