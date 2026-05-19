import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import MagneticWrapper from './MagneticWrapper';

const stats = [
    { value: '3+', label: 'Years Coding' },
    { value: '5+', label: 'Projects Built' },
    { value: 'AWS', label: 'Certified' },
];

const Hero = () => {
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
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto"
                >
                    <motion.div variants={itemVariants}>
                        <MagneticWrapper>
                            <img
                                src="https://github.com/nevoiflah.png"
                                alt="Nevo Iflah"
                                width={128}
                                height={128}
                                className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white/10 shadow-2xl hover:scale-110 hover:border-primary/50 transition-all duration-500"
                            />
                        </MagneticWrapper>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-primary font-medium mb-4">
                        Hello, I'm
                    </motion.p>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-200">
                        Nevo Iflah
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted mb-6 max-w-2xl mx-auto">
                        Computer Science Student & Full Stack Developer
                    </motion.p>

                    {/* Credibility stats */}
                    <motion.div variants={itemVariants} className="flex justify-center items-center mb-10">
                        {stats.map(({ value, label }, i) => (
                            <Fragment key={label}>
                                {i > 0 && <span className="w-px h-10 bg-white/10 mx-6 sm:mx-10" aria-hidden="true" />}
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-text">{value}</div>
                                    <div className="text-xs text-muted mt-0.5 whitespace-nowrap">{label}</div>
                                </div>
                            </Fragment>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <MagneticWrapper>
                            <button
                                onClick={() => window.scrollToSection?.(3)}
                                className="w-48 px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 active:scale-95 active:opacity-80 transition-all cursor-pointer block"
                            >
                                View Projects
                            </button>
                        </MagneticWrapper>
                        <MagneticWrapper>
                            <button
                                onClick={() => window.scrollToSection?.(4)}
                                className="w-48 px-8 py-3 bg-surface border border-white/10 rounded-full font-medium hover:bg-white/5 active:scale-95 active:opacity-80 transition-all cursor-pointer block"
                            >
                                Contact Me
                            </button>
                        </MagneticWrapper>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
