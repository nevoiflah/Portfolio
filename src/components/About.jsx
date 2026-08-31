import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Layers, Cloud, GraduationCap, Sparkles, ArrowLeft, ExternalLink, Award } from 'lucide-react';

const certifications = [
    {
        title: 'AWS Cloud Practitioner Essentials',
        issuer: 'AWS Training & Certification',
        date: 'Nov 1, 2025',
    },
    {
        title: 'AWS Academy Graduate - Cloud Developing',
        issuer: 'AWS Academy · 40 hours',
        date: 'Nov 25, 2025',
        credlyUrl: 'https://www.credly.com/go/CJXkVYB5',
    },
];

const About = () => {
    const shouldReduceMotion = useReducedMotion();
    const [awsFlipped, setAwsFlipped] = useState(false);

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

    const tileClass = "glass-card p-6 flex flex-col justify-center transition-colors hover:border-primary/30";

    return (
        <section id="about" className="py-20 md:py-8">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 auto-rows-auto md:auto-rows-fr gap-3 max-w-5xl mx-auto"
                >
                    {/* Bio - large anchor tile */}
                    <motion.div
                        variants={itemVariants}
                        className={`${tileClass} col-span-2 md:col-span-2 md:row-span-2 !items-start text-left gap-4`}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
                        <p className="text-muted leading-relaxed text-sm md:text-base">
                            Full-Stack Developer with hands-on experience in full-stack web development, AI-integrated systems, and cloud-based applications.
                            Strong background in C#, JavaScript, Python, and RESTful APIs, with proven ability to design scalable solutions through academic and independent projects.
                        </p>
                        <p className="text-muted leading-relaxed text-sm md:text-base">
                            Demonstrated leadership from military command experience. Seeking a junior software or full-stack developer role in a technology-driven team
                            where strong engineering and problem-solving skills can create impact.
                        </p>
                    </motion.div>

                    {/* Years coding */}
                    <motion.div variants={itemVariants} className={`${tileClass} items-center text-center gap-1.5`}>
                        <Code2 size={22} className="text-primary" aria-hidden="true" />
                        <span className="text-3xl font-bold text-text">3+</span>
                        <span className="text-xs text-muted">Years Coding</span>
                    </motion.div>

                    {/* Projects built */}
                    <motion.div variants={itemVariants} className={`${tileClass} items-center text-center gap-1.5`}>
                        <Layers size={22} className="text-primary" aria-hidden="true" />
                        <span className="text-3xl font-bold text-text">5+</span>
                        <span className="text-xs text-muted">Projects Built</span>
                    </motion.div>

                    {/* AWS - wide accent tile, flips to reveal both certifications */}
                    <motion.div
                        variants={itemVariants}
                        className="relative col-span-2 md:col-span-2 flip-3d"
                    >
                        <motion.div
                            className="flip-inner h-full"
                            style={{ transformStyle: 'preserve-3d' }}
                            animate={{ rotateY: awsFlipped ? 180 : 0 }}
                            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* FRONT */}
                            <button
                                type="button"
                                inert={awsFlipped}
                                onClick={() => setAwsFlipped(true)}
                                aria-label="Show AWS certification details"
                                className="flip-face relative w-full h-full overflow-hidden glass-card p-6 flex items-center gap-4 text-left transition-colors hover:border-primary/30 cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 pointer-events-none" aria-hidden="true" />
                                <Cloud size={28} className="relative shrink-0 text-secondary" aria-hidden="true" />
                                <div className="relative">
                                    <p className="text-lg font-bold text-text leading-tight">AWS Academy Graduate</p>
                                    <p className="text-xs text-muted mt-0.5">Cloud Developing · Lambda · DynamoDB</p>
                                </div>
                            </button>

                            {/* BACK - certification list */}
                            <div
                                inert={!awsFlipped}
                                className="flip-face flip-rear h-full glass-card border-primary/30 p-5 flex flex-col justify-center gap-3"
                            >
                                {certifications.map((cert) => (
                                    <div key={cert.title} className="flex items-start gap-3">
                                        <Award size={18} className="shrink-0 mt-0.5 text-secondary" aria-hidden="true" />
                                        <div className="text-left min-w-0">
                                            <p className="text-sm font-semibold text-text leading-tight truncate">{cert.title}</p>
                                            <p className="text-xs text-muted mt-0.5">{cert.issuer} · {cert.date}</p>
                                            {cert.credlyUrl && (
                                                <a
                                                    href={cert.credlyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`View ${cert.title} credential on Credly (opens in new tab)`}
                                                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline mt-1"
                                                >
                                                    <ExternalLink size={12} aria-hidden="true" />
                                                    View credential
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setAwsFlipped(false)}
                                    className="self-start flex items-center gap-1.5 text-xs font-medium text-muted hover:text-text transition-colors cursor-pointer"
                                >
                                    <ArrowLeft size={14} aria-hidden="true" />
                                    Back
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* CS student - wide */}
                    <motion.div variants={itemVariants} className={`${tileClass} col-span-2 md:col-span-2 !flex-row !justify-start items-center gap-4`}>
                        <GraduationCap size={28} className="shrink-0 text-primary" aria-hidden="true" />
                        <div className="text-left">
                            <p className="text-lg font-bold text-text leading-tight">B.Sc Computer Science</p>
                            <p className="text-xs text-muted mt-0.5">Completed coursework</p>
                        </div>
                    </motion.div>

                    {/* Focus areas - wide */}
                    <motion.div variants={itemVariants} className={`${tileClass} col-span-2 md:col-span-2 !flex-row !justify-start items-center gap-4`}>
                        <Sparkles size={28} className="shrink-0 text-primary" aria-hidden="true" />
                        <div className="text-left">
                            <p className="text-lg font-bold text-text leading-tight">Full-stack · AI · Cloud</p>
                            <p className="text-xs text-muted mt-0.5">What I build</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
