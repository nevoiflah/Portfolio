import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
                            <p className="text-muted leading-relaxed mb-6">
                                Full-Stack Developer with hands-on experience in full-stack web development, AI-integrated systems, and cloud-based applications.
                                Strong background in C#, JavaScript, Python, and RESTful APIs, with proven ability to design scalable solutions through academic and independent projects.
                            </p>
                            <p className="text-muted leading-relaxed mb-6">
                                Demonstrated leadership skills from military command experience. Seeking a junior software or full-stack developer role in a technology-driven team
                                where strong engineering and problem-solving skills can create impact.
                            </p>

                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-2xl blur-lg opacity-20" />
                            <div className="relative p-8">
                                <h3 className="text-xl font-bold mb-4">Focus Areas</h3>
                                <ul className="space-y-3">
                                    {['Full Stack Development', 'Cloud Architecture (AWS)', 'IoT Integrations', 'AI & Machine Learning'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-muted">
                                            <span className="w-2 h-2 rounded-full bg-secondary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
