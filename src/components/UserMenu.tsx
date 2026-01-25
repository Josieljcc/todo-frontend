import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Mail, Settings, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { components } from '@/api';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type User = components['schemas']['models.User'];

interface UserMenuProps {
  user: User;
  onLogout: () => void;
  isLoggingOut: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: 'mobile' | 'desktop';
}

export const UserMenu = ({
  user,
  onLogout,
  isLoggingOut,
  isOpen,
  onOpenChange,
  variant = 'mobile',
}: UserMenuProps) => {
  const navigate = useNavigate();
  const avatarSize = variant === 'mobile' ? 'h-8 w-8' : 'h-10 w-10';

  return (
    <>
      {/* Backdrop com blur quando menu está aberto */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-md"
            onClick={() => onOpenChange(false)}
          />
        )}
      </AnimatePresence>
      <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative p-0 rounded-full">
            <div
              className={`flex ${avatarSize} items-center justify-center rounded-full bg-primary text-primary-foreground`}
            >
              <UserIcon className="h-5 w-5" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 rounded-2xl border-2 bg-card/95 backdrop-blur-md shadow-xl z-[101]"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.username}</p>
              <p className="text-xs leading-none text-muted-foreground flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onLogout()}
            disabled={isLoggingOut}
            className="cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{isLoggingOut ? 'Saindo...' : 'Sair'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
