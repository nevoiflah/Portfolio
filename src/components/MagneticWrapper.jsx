import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const MagneticWrapper = ({ children, className = "" }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const shouldReduceMotion = useReducedMotion();

    const handleMouseMove = (e) => {
        if (shouldReduceMotion) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.2;
        const y = (clientY - (top + height / 2)) * 0.2;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={
                shouldReduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }
            }
            className={`inline-block ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default MagneticWrapper;
