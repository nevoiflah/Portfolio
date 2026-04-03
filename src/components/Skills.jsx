import { motion } from 'framer-motion';

const skills = {
    "Languages": ["JavaScript (ES6+)", "TypeScript", "C#", "Python", "SQL", "Java", "HTML5/CSS3"],
    "Frameworks & Libs": ["React", "React Native", "Node.js", "ASP.NET Core", "Tailwind CSS", "Bootstrap", "Flask"],
    "Cloud & Tools": ["AWS (Lambda, IoT, DynamoDB)", "Git & GitHub", "Docker", "RESTful APIs", "Agile/Scrum"]
};

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const Skills = () => {
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
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
                                {/* Glow Effect Background */}
                                <div 
                                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                                    style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)' }} 
                                />

                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-6 text-primary">{category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((skill, i) => (
                                            <span key={i} className="px-3 py-1 bg-background rounded-lg text-sm text-gray-300 border border-white/5">
                                                {skill}
                                            </span>
                                        ))}
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
