import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const animations = {
    fadeInUp: {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 }
    },
    fadeInDown: {
        hidden: { opacity: 0, y: -60 },
        visible: { opacity: 1, y: 0 }
    },
    fadeInLeft: {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 }
    },
    fadeInRight: {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 }
    },
    scaleUp: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }
};

const AnimatedSection = ({
    children,
    animation = 'fadeInUp',
    delay = 0,
    duration = 0.6,
    threshold = 0.2,
    once = true,
    className = ''
}) => {
    const [ref, inView] = useInView({
        threshold,
        triggerOnce: once
    });

    const selectedAnimation = animations[animation] || animations.fadeInUp;

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={selectedAnimation}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
