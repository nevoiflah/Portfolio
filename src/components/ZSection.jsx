import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const ZSection = ({ children, index, total }) => {
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();

    const sectionHeight = 1 / total;
    const start  = index * sectionHeight;
    const end    = start + sectionHeight;
    const exit   = end + sectionHeight * 0.5;
    const isLast = index === total - 1;

    const opacityTransform = useTransform(
        scrollYProgress,
        [start - 0.05, start, end - 0.05, end],
        isLast ? [0, 1, 1, 1] : [0, 1, 1, 0],
    );

    const scaleTransform = useTransform(
        scrollYProgress,
        [start - 0.1, start, end],
        isLast ? [0.5, 1, 1] : [0.5, 1, 1.15],
    );

    const zIndex = useTransform(scrollYProgress, (v) =>
        v >= start && v <= end ? 10 : 0
    );

    const display = useTransform(scrollYProgress, (v) =>
        v >= start - 0.15 && v <= exit ? 'flex' : 'none'
    );

    return (
        <motion.div
            style={{
                opacity:        opacityTransform,
                scale:          shouldReduceMotion ? 1 : scaleTransform,
                zIndex,
                display,
                position:       'fixed',
                top:            0,
                left:           0,
                width:          '100%',
                height:         '100vh',
                alignItems:     'center',
                justifyContent: 'center',
                pointerEvents:  'auto',
            }}
        >
            <div className="w-full max-w-7xl mx-auto px-6">
                {children}
            </div>
        </motion.div>
    );
};

export default ZSection;
