import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, FileText } from 'lucide-react';

import MagneticWrapper from './MagneticWrapper';

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

const Contact = () => {
    return (
        <section id="contact" className="py-20 relative overflow-hidden">
            {/* Background decoration removed for consistency */}

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">Let's Work Together</motion.h2>
                    <motion.p variants={itemVariants} className="text-muted text-lg mb-10 max-w-2xl mx-auto">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6">
                        <MagneticWrapper>
                            <a
                                href="mailto:nevoiflah@gmail.com"
                                aria-label="Send email to Nevo Iflah"
                                className="flex items-center justify-center gap-3 w-40 px-6 py-3 bg-primary hover:bg-primary/90 rounded-full font-medium transition-colors"
                            >
                                <Mail size={20} aria-hidden="true" />
                                Say Hello
                            </a>
                        </MagneticWrapper>
                        <MagneticWrapper>
                            <a
                                href="https://github.com/nevoiflah"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub profile (opens in new tab)"
                                className="flex items-center justify-center gap-3 w-40 px-6 py-3 bg-surface border border-white/10 hover:bg-white/5 rounded-full font-medium transition-colors"
                            >
                                <Github size={20} aria-hidden="true" />
                                GitHub
                            </a>
                        </MagneticWrapper>
                        <MagneticWrapper>
                            <a
                                href="https://linkedin.com/in/nevo-iflah"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn profile (opens in new tab)"
                                className="flex items-center justify-center gap-3 w-40 px-6 py-3 bg-surface border border-white/10 hover:bg-white/5 rounded-full font-medium transition-colors"
                            >
                                <Linkedin size={20} aria-hidden="true" />
                                LinkedIn
                            </a>
                        </MagneticWrapper>
                        <MagneticWrapper>
                            <a
                                href="/Nevo_CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Download resume PDF (opens in new tab)"
                                className="flex items-center justify-center gap-3 w-40 px-6 py-3 bg-surface border border-white/10 hover:bg-white/5 rounded-full font-medium transition-colors"
                            >
                                <FileText size={20} aria-hidden="true" />
                                Resume
                            </a>
                        </MagneticWrapper>
                    </motion.div>
                </motion.div>

                <footer className="mt-20 text-center text-muted text-sm">
                    <p>© {new Date().getFullYear()} Nevo Iflah. Built with React & Tailwind CSS.</p>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
