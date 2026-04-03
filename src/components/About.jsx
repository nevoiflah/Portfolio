import { motion } from 'framer-motion';

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

const About = () => {
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
                        <div className="space-y-6">
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

                        <motion.div variants={itemVariants} className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-2xl blur-lg opacity-20" />
                            <div className="relative p-8">
                                <h3 className="text-xl font-bold mb-4">Focus Areas</h3>
                                <ul className="space-y-3">
                                    {['Full Stack Development', 'Cloud Architecture (AWS)', 'IoT Integrations', 'AI & Machine Learning'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-muted">
                                            <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
