import { useState } from 'react';
import { Wallet, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import SettingsDialog from './SettingsDialog';

interface HeaderProps {
  userEmail?: string;
  onLogout?: () => void;
}

const Header = ({ userEmail = 'user@example.com', onLogout }: HeaderProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { toast } = useToast();

  const handleSignOut = () => {
    // Only clear authentication data, not user's expense/category data
    localStorage.removeItem('userEmail');
    
    // Show success toast
    toast({
      title: "Signed out successfully",
      description: "Your data has been saved and will be available when you sign back in.",
    });
    
    // Call the logout handler to update auth state
    if (onLogout) {
      setTimeout(() => {
        onLogout();
      }, 500);
    }
  };
  return (
    <header className="w-full border-b border-border bg-card">
      <div className="mx-auto max-w-5xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">SmartSpend</span>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 hover:bg-muted">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
                <span className="hidden text-sm font-medium text-foreground sm:inline-block">
                  {userEmail}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover">
              <DropdownMenuItem 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </header>
  );
};

export default Header;
