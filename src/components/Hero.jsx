import { motion } from 'framer-motion';
import MagneticWrapper from './MagneticWrapper';

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
            {/* Animated Background blobs */}
            {/* Animated Background blobs removed for consistency */}

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="max-w-4xl mx-auto"
                >
                    <MagneticWrapper>
                        <img
                            src="https://github.com/nevoiflah.png"
                            alt="Nevo Iflah"
                            className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white/10 shadow-2xl hover:scale-110 hover:border-primary/50 transition-all duration-500"
                        />
                    </MagneticWrapper>
                    <h2 className="text-xl md:text-2xl text-primary font-medium mb-4">
                        Hello, I'm
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-200">
                        Nevo Iflah
                    </h1>
                    <p className="text-xl md:text-2xl text-muted mb-8 max-w-2xl mx-auto">
                        Computer Science Student & Full Stack Developer
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.scrollToSection?.(3)} // Index 3 = Projects
                            className="w-48 px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                        >
                            View Projects
                        </button>
                        <button
                            onClick={() => window.scrollToSection?.(4)} // Index 4 = Contact
                            className="w-48 px-8 py-3 bg-surface border border-white/10 rounded-full font-medium hover:bg-white/5 transition-colors cursor-pointer"
                        >
                            Contact Me
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
