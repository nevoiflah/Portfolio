import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Layers, Cloud, GraduationCap } from 'lucide-react';

const statCards = [
    { icon: Code2, value: '3+', label: 'Years Coding' },
    { icon: Layers, value: '5+', label: 'Projects Built' },
    { icon: Cloud, value: 'AWS', label: 'Certified' },
    { icon: GraduationCap, value: 'B.Sc', label: 'CS Student' },
];

const About = () => {
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

    return (
        <section id="about" className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-left">
                            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold">About Me</motion.h2>
                            <motion.p variants={itemVariants} className="text-muted leading-relaxed">
                                Full-Stack Developer with hands-on experience in full-stack web development, AI-integrated systems, and cloud-based applications.
                                Strong background in C#, JavaScript, Python, and RESTful APIs, with proven ability to design scalable solutions through academic and independent projects.
                            </motion.p>
                            <motion.p variants={itemVariants} className="text-muted leading-relaxed">
                                Demonstrated leadership skills from military command experience. Seeking a junior software or full-stack developer role in a technology-driven team
                                where strong engineering and problem-solving skills can create impact.
                            </motion.p>
                        </div>

                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                            {statCards.map(({ icon: Icon, value, label }) => (
                                <div
                                    key={label}
                                    className="glass-card p-5 flex flex-col items-center gap-2 text-center"
                                >
                                    <Icon size={22} className="text-primary" aria-hidden="true" />
                                    <span className="text-2xl font-bold text-text">{value}</span>
                                    <span className="text-xs text-muted">{label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
