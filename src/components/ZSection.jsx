import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ZSection = ({ children, index, total }) => {
    const { scrollYProgress } = useScroll();

    // Each section gets a "slice" of total scroll height
    // e.g. 5 sections -> each gets 0.2 (20%)
    const sectionHeight = 1 / total;
    const start = (index * sectionHeight);
    const end = start + sectionHeight;
    const exit = end + (sectionHeight * 0.5); // Linger a bit before disappearing

    // Range for "Coming In" -> "Active" -> "Flying Past"
    const isLast = index === total - 1;

    // 1. Opacity: Approaches 1, stays 1. Last section stays 1 forever.
    const opacity = useTransform(
        scrollYProgress,
        [start - 0.05, start, end - 0.05, end],
        isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
    );

    const scale = useTransform(
        scrollYProgress,
        [start - 0.1, start, end],
        // Last section stops scaling at 1.0 to fit perfectly
        isLast ? [0.5, 1, 1] : [0.5, 1, 1.15]
    );

    // Z-Index trick: current section must be on top slightly
    const zIndex = useTransform(scrollYProgress, (v) => {
        if (v >= start && v <= end) return 10;
        return 0;
    });

    // Blur effect for distance
    const filter = useTransform(
        scrollYProgress,
        [start - 0.1, start, end - 0.05, end],
        isLast ? ["blur(10px)", "blur(0px)", "blur(0px)", "blur(0px)"] : ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
    );

    // We toggle display:none so off-screen sections don't block pointer events
    const display = useTransform(scrollYProgress, (v) => {
        return (v >= start - 0.15 && v <= exit) ? "flex" : "none";
    });

    return (
        <motion.div
            style={{
                opacity,
                scale,
                zIndex,
                filter,
                display,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'auto', // Ensure clicks work when visible
            }}
        >
            <div className="w-full max-w-7xl mx-auto px-6">
                {children}
            </div>
        </motion.div>
    );
};

export default ZSection;
