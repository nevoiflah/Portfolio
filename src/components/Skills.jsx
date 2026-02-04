import { motion } from 'framer-motion';

const skills = {
    "Languages": ["JavaScript (ES6+)", "TypeScript", "C#", "Python", "SQL", "Java", "HTML5/CSS3"],
    "Frameworks & Libs": ["React", "React Native", "Node.js", "ASP.NET Core", "Tailwind CSS", "Bootstrap", "Flask"],
    "Cloud & Tools": ["AWS (Lambda, IoT, DynamoDB)", "Git & GitHub", "Docker", "RESTful APIs", "Agile/Scrum"]
};

const Skills = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
                    <p className="text-muted">A comprehensive toolkit for building modern digital solutions.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {Object.entries(skills).map(([category, items], index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-surface/50 border border-white/5 p-8 rounded-2xl hover:bg-surface transition-colors"
                        >
                            <h3 className="text-xl font-bold mb-6 text-primary">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {items.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-background rounded-lg text-sm text-gray-300 border border-white/5">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
