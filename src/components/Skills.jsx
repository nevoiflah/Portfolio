import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useMotionTemplate } from 'framer-motion';
import {
    SiJavascript, SiTypescript, SiPython, SiHtml5, SiSharp, SiOpenjdk,
    SiReact, SiNodedotjs, SiDotnet, SiTailwindcss, SiBootstrap, SiFlask,
    SiGit, SiDocker,
} from 'react-icons/si';
import { Database, Webhook, RefreshCw, Cloud, Smartphone, ArrowUpRight } from 'lucide-react';
import { projects, FOCUS_PROJECT_EVENT } from '../data/projects';

/* Icons carry no brand colour - the palette is one blue on greyscale, and a grid
   of vendor logos was the only place on the site that broke it */
const techIcons = {
    'JavaScript (ES6+)':           SiJavascript,
    'TypeScript':                  SiTypescript,
    'C#':                          SiSharp,
    'Python':                      SiPython,
    'SQL':                         Database,
    'Java':                        SiOpenjdk,
    'HTML5/CSS3':                  SiHtml5,
    'React':                       SiReact,
    'React Native':                Smartphone,
    'Node.js':                     SiNodedotjs,
    'ASP.NET Core':                SiDotnet,
    'Tailwind CSS':                SiTailwindcss,
    'Bootstrap':                   SiBootstrap,
    'Flask':                       SiFlask,
    'AWS (Lambda, IoT, DynamoDB)': Cloud,
    'Git & GitHub':                SiGit,
    'Docker':                      SiDocker,
    'RESTful APIs':                Webhook,
    'Agile/Scrum':                 RefreshCw,
};

/* Which shipped projects back each skill. Titles must match the Projects data;
   anything unmatched is simply rendered as a plain, unlinked chip */
const skillProof = {
    'JavaScript (ES6+)':           ['Buddiz', 'Ruppin Academic Advisor'],
    'TypeScript':                  ['RINGA', 'COUNT - Intimacy Journal'],
    'C#':                          ['Ruppin Academic Advisor'],
    'Python':                      ['Ruppin Academic Advisor'],
    'SQL':                         ['RINGA'],
    'HTML5/CSS3':                  ['Buddiz', 'Ruppin Academic Advisor'],
    'React':                       ['Buddiz', 'Ruppin Academic Advisor'],
    'React Native':                ['NIVORA', 'RINGA', 'COUNT - Intimacy Journal'],
    'Node.js':                     ['RINGA'],
    'ASP.NET Core':                ['Ruppin Academic Advisor'],
    'Tailwind CSS':                ['RINGA', 'COUNT - Intimacy Journal'],
    'Flask':                       ['Ruppin Academic Advisor'],
    'AWS (Lambda, IoT, DynamoDB)': ['Buddiz'],
    'Git & GitHub':                ['Buddiz', 'Ruppin Academic Advisor'],
    'Docker':                      ['RINGA'],
    'RESTful APIs':                ['Buddiz', 'RINGA', 'Ruppin Academic Advisor'],
};

const skills = {
    "Languages":         ["JavaScript (ES6+)", "TypeScript", "C#", "Python", "SQL", "Java", "HTML5/CSS3"],
    "Frameworks & Libs": ["React", "React Native", "Node.js", "ASP.NET Core", "Tailwind CSS", "Bootstrap", "Flask"],
    "Cloud & Tools":     ["AWS (Lambda, IoT, DynamoDB)", "Git & GitHub", "Docker", "RESTful APIs", "Agile/Scrum"],
};

const projectIndex = Object.fromEntries(projects.map((p, i) => [p.title, i]));
const PROJECTS_SECTION = 4; // index used by window.scrollToSection

/* Surface a project in the Projects carousel, then scroll the page to it */
const showProject = (title) => {
    const index = projectIndex[title];
    if (index === undefined) return;
    window.dispatchEvent(new CustomEvent(FOCUS_PROJECT_EVENT, { detail: { index } }));
    window.scrollToSection?.(PROJECTS_SECTION);
};

/* -- Chip -- proven skills are buttons, the rest are plain labels ------ */
const SkillChip = ({ skill, isOpen, onToggle }) => {
    const Icon = techIcons[skill];
    const proof = skillProof[skill];
    const base = "px-3 py-1 rounded-lg text-sm border flex items-center gap-1.5 transition-colors";

    if (!proof) {
        return (
            <span className={`${base} bg-background text-muted border-white/5`}>
                {Icon && <Icon className="shrink-0 text-[13px]" aria-hidden="true" />}
                {skill}
            </span>
        );
    }

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-pressed={isOpen}
            aria-label={`${skill} - show the ${proof.length} project${proof.length > 1 ? 's' : ''} built with it`}
            className={`${base} cursor-pointer ${
                isOpen
                    ? 'bg-primary/10 text-text border-primary/40'
                    : 'bg-background text-text border-primary/20 hover:border-primary/40'
            }`}
        >
            {Icon && <Icon className="shrink-0 text-[13px]" aria-hidden="true" />}
            {skill}
            <span
                className={`ml-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${isOpen ? 'bg-primary' : 'bg-primary/50'}`}
                aria-hidden="true"
            />
        </button>
    );
};

/* -- SkillCard -- useMotionValue-driven radial glow per card ----------- */
const SkillCard = ({ category, items, variants, openSkill, onToggleSkill, shouldReduceMotion }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const background = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(59,130,246,0.10), transparent 40%)`;

    const handleMouseMove = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const openInThisCard = items.includes(openSkill) ? openSkill : null;

    return (
        <motion.div
            variants={variants}
            onMouseMove={handleMouseMove}
            className="group relative overflow-hidden glass-card p-8 transition-colors hover:border-primary/20"
        >
            {/* Motion-value driven glow */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background }}
            />

            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 text-primary">{category}</h3>
                <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                        <SkillChip
                            key={skill}
                            skill={skill}
                            isOpen={openInThisCard === skill}
                            onToggle={() => onToggleSkill(skill)}
                        />
                    ))}
                </div>

                {/* Proof strip - the projects that back the selected skill */}
                <AnimatePresence initial={false}>
                    {openInThisCard && (
                        <motion.div
                            key={openInThisCard}
                            initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <p className="text-xs text-muted mb-2">Shipped in</p>
                                <div className="flex flex-wrap gap-2">
                                    {skillProof[openInThisCard].map((title) => (
                                        <button
                                            key={title}
                                            type="button"
                                            onClick={() => showProject(title)}
                                            aria-label={`View the ${title} project`}
                                            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline cursor-pointer"
                                        >
                                            {title}
                                            <ArrowUpRight size={12} aria-hidden="true" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

/* -- Skills section ---------------------------------------------------- */
const Skills = () => {
    const shouldReduceMotion = useReducedMotion();
    const [openSkill, setOpenSkill] = useState(null);

    const toggleSkill = (skill) => setOpenSkill((current) => (current === skill ? null : skill));

    const containerVariants = {
        hidden:  { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.08,
                delayChildren:   shouldReduceMotion ? 0 : 0.05,
            },
        },
    };

    const itemVariants = {
        hidden:   { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
        visible:  { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
        <section id="skills" className="py-20 md:py-8">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
                        <p className="text-muted">
                            Skills marked with a
                            <span className="inline-block mx-1.5 h-1.5 w-1.5 rounded-full bg-primary align-middle" aria-hidden="true" />
                            are ones I have shipped with - select one to see where.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {Object.entries(skills).map(([category, items]) => (
                            <SkillCard
                                key={category}
                                category={category}
                                items={items}
                                variants={itemVariants}
                                openSkill={openSkill}
                                onToggleSkill={toggleSkill}
                                shouldReduceMotion={shouldReduceMotion}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
