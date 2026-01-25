import { useEffect, useState } from 'react';
import { ConfirmBottomSheet } from './ConfirmBottomSheet';
import { ConfirmDialogDesktop } from './ConfirmDialogDesktop';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  isLoading?: boolean;
}

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) {
    return <ConfirmBottomSheet {...props} />;
  }

  return <ConfirmDialogDesktop {...props} />;
};
