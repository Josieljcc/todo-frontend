import { motion } from 'framer-motion';
import { getVariants, pageTransition } from '@/lib/animations';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className }: PageTransitionProps) => {
  const variants = getVariants(pageTransition);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className={className}
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      {children}
    </motion.div>
  );
};
