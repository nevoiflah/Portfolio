import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, FileText } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 relative overflow-hidden">
            {/* Background decoration */}
            {/* Background decoration removed for consistency */}

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Work Together</h2>
                    <p className="text-muted text-lg mb-10 max-w-2xl mx-auto">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <a
                            href="mailto:nevoiflah@gmail.com"
                            className="flex items-center gap-3 px-6 py-3 bg-primary hover:bg-primary/90 rounded-full font-medium transition-colors"
                        >
                            <Mail size={20} />
                            Say Hello
                        </a>
                        <a
                            href="https://github.com/nevoiflah"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-6 py-3 bg-surface border border-white/10 hover:bg-white/5 rounded-full font-medium transition-colors"
                        >
                            <Github size={20} />
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/nevo-iflah"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-6 py-3 bg-surface border border-white/10 hover:bg-white/5 rounded-full font-medium transition-colors"
                        >
                            <Linkedin size={20} />
                            LinkedIn
                        </a>
                        <a
                            href="/Nevo_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-6 py-3 bg-surface border border-white/10 hover:bg-white/5 rounded-full font-medium transition-colors"
                        >
                            <FileText size={20} />
                            Resume
                        </a>
                    </div>
                </motion.div>

                <footer className="mt-20 text-center text-muted text-sm">
                    <p>© {new Date().getFullYear()} Nevo Iflah. Built with React & Tailwind CSS.</p>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
