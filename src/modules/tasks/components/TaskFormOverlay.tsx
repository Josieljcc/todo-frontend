import { useEffect, useState } from 'react';
import { TaskFormBottomSheet } from './TaskFormBottomSheet';
import { TaskFormModal } from './TaskFormModal';

/**
 * Responsive task form presentation:
 * - Mobile: BottomSheet
 * - Desktop: Modal (glass/blur)
 */
export const TaskFormOverlay = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <TaskFormBottomSheet /> : <TaskFormModal />;
};

