import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin, Github, FileText } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';

const Contact = () => {
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

    const linkClass = "flex items-center justify-center gap-3 w-40 px-6 py-3 rounded-full font-medium transition-all active:scale-95 active:opacity-80";

    return (
        <section id="contact" className="py-20 relative overflow-hidden">
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
                                className={`${linkClass} bg-primary hover:bg-primary/90`}
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
                                className={`${linkClass} bg-surface border border-white/10 hover:bg-white/5`}
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
                                className={`${linkClass} bg-surface border border-white/10 hover:bg-white/5`}
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
                                className={`${linkClass} bg-surface border border-white/10 hover:bg-white/5`}
                            >
                                <FileText size={20} aria-hidden="true" />
                                Resume
                            </a>
                        </MagneticWrapper>
                    </motion.div>

                    {/* Visible email fallback */}
                    <motion.p variants={itemVariants} className="mt-8 text-muted text-sm">
                        Or reach me directly at{' '}
                        <a
                            href="mailto:nevoiflah@gmail.com"
                            className="text-primary hover:underline underline-offset-2"
                        >
                            nevoiflah@gmail.com
                        </a>
                    </motion.p>
                </motion.div>

                <footer className="mt-20 text-center text-muted text-sm">
                    <p>© {new Date().getFullYear()} Nevo Iflah. Built with React & Tailwind CSS.</p>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
