import type { Variants } from 'framer-motion';

/**
 * Animation durations in milliseconds
 */
export const DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  SLOWER: 600,
} as const;

/**
 * Easing functions
 */
export const EASING = {
  DEFAULT: [0.4, 0, 0.2, 1] as const, // Material design
  EASE_IN: [0.4, 0, 1, 1] as const,
  EASE_OUT: [0, 0, 0.2, 1] as const,
  EASE_IN_OUT: [0.4, 0, 0.2, 1] as const,
  BOUNCE: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get animation duration based on reduced motion preference
 */
export const getDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0 : duration;
};

/**
 * Fade in animation variant
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.NORMAL / 1000,
      ease: EASING.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION.FAST / 1000,
      ease: EASING.EASE_IN,
    },
  },
};

/**
 * Slide up animation variant
 */
export const slideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.NORMAL / 1000,
      ease: EASING.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: DURATION.FAST / 1000,
      ease: EASING.EASE_IN,
    },
  },
};

/**
 * Slide down animation variant
 */
export const slideDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.NORMAL / 1000,
      ease: EASING.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: DURATION.FAST / 1000,
      ease: EASING.EASE_IN,
    },
  },
};

/**
 * Slide left animation variant
 */
export const slideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.NORMAL / 1000,
      ease: EASING.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: DURATION.FAST / 1000,
      ease: EASING.EASE_IN,
    },
  },
};

/**
 * Slide right animation variant
 */
export const slideRight: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.NORMAL / 1000,
      ease: EASING.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: DURATION.FAST / 1000,
      ease: EASING.EASE_IN,
    },
  },
};

/**
 * Scale in animation variant
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.NORMAL / 1000,
      ease: EASING.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: DURATION.FAST / 1000,
      ease: EASING.EASE_IN,
    },
  },
};

/**
 * Stagger container variant for lists
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger item variant for list items
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.NORMAL / 1000,
      ease: EASING.EASE_OUT,
    },
  },
};

/**
 * Shake animation variant (for errors)
 */
export const shake: Variants = {
  hidden: { x: 0 },
  visible: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
      ease: EASING.EASE_IN_OUT,
    },
  },
};

/**
 * Page transition variants
 * Smooth transition with subtle movement
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.NORMAL / 1000,
      ease: EASING.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: DURATION.FAST / 1000,
      ease: EASING.EASE_IN,
    },
  },
};

/**
 * Reduced motion variants (for accessibility)
 */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

/**
 * Get variants based on reduced motion preference
 */
export const getVariants = (variants: Variants, reducedVariants?: Variants): Variants => {
  if (prefersReducedMotion()) {
    return reducedVariants || reducedMotionVariants;
  }
  return variants;
};
