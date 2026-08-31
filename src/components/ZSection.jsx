import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion } from 'framer-motion';

/* Breathing room kept between a section's content and the viewport edges */
const GUTTER = 32;
/* Below this, shrinking hurts legibility more than clipping hurts layout */
const MIN_FIT = 0.72;

const ZSection = ({ children, index, total }) => {
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const contentRef = useRef(null);

    /* Sections are laid out at their natural height, but the deck gives each one a
       fixed 100vh. On short viewports that silently clips headings and controls, so
       measure the content and scale it down just enough to fit. */
    const fit = useMotionValue(1);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        const measure = () => {
            /* display:none while out of range - scrollHeight is 0 and tells us nothing */
            const needed = el.scrollHeight;
            if (!needed) return;
            const available = window.innerHeight - GUTTER;
            fit.set(needed > available ? Math.max(available / needed, MIN_FIT) : 1);
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(el);
        window.addEventListener('resize', measure);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, [fit]);

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

    /* Hold at natural size for the whole time the section is readable, then zoom out
       only over the last 30% - which is exactly when the opacity fade runs. Ramping
       1 -> 1.15 across the full range meant content was oversized while being read. */
    const scaleTransform = useTransform(
        scrollYProgress,
        [start - 0.1, start, end - sectionHeight * 0.3, end],
        isLast ? [0.5, 1, 1, 1] : [0.5, 1, 1, 1.15],
    );

    /* Fold the fit clamp into the Z-depth scale so both stay on one transform */
    const scale = useTransform(
        [scaleTransform, fit],
        ([depth, fitted]) => (shouldReduceMotion ? 1 : depth) * fitted,
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
                scale,
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
            <div ref={contentRef} className="w-full max-w-7xl mx-auto px-6">
                {children}
            </div>
        </motion.div>
    );
};

export default ZSection;
