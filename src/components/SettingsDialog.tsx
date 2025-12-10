import { useState, useEffect } from 'react';
import { X, Palette, Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'grey'>('light');
  const { toast } = useToast();

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'grey' || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (selectedTheme: 'light' | 'dark' | 'grey') => {
    const root = document.documentElement;
    
    if (selectedTheme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--background', '0 0% 10%');
      root.style.setProperty('--foreground', '0 0% 98%');
      root.style.setProperty('--card', '0 0% 12%');
      root.style.setProperty('--card-foreground', '0 0% 98%');
      root.style.setProperty('--popover', '0 0% 12%');
      root.style.setProperty('--popover-foreground', '0 0% 98%');
      root.style.setProperty('--primary', '142.1 76.2% 36.3%');
      root.style.setProperty('--primary-foreground', '355.7 100% 97.3%');
      root.style.setProperty('--secondary', '240 4.8% 20%');
      root.style.setProperty('--secondary-foreground', '0 0% 98%');
      root.style.setProperty('--muted', '240 3.7% 20%');
      root.style.setProperty('--muted-foreground', '240 5% 64.9%');
      root.style.setProperty('--accent', '240 3.7% 20%');
      root.style.setProperty('--accent-foreground', '0 0% 98%');
      root.style.setProperty('--border', '240 3.7% 20%');
      root.style.setProperty('--input', '240 3.7% 20%');
    } else if (selectedTheme === 'grey') {
      root.classList.remove('dark');
      root.style.setProperty('--background', '0 0% 95%');
      root.style.setProperty('--foreground', '0 0% 15%');
      root.style.setProperty('--card', '0 0% 98%');
      root.style.setProperty('--card-foreground', '0 0% 15%');
      root.style.setProperty('--popover', '0 0% 98%');
      root.style.setProperty('--popover-foreground', '0 0% 15%');
      root.style.setProperty('--primary', '0 0% 40%');
      root.style.setProperty('--primary-foreground', '0 0% 98%');
      root.style.setProperty('--secondary', '0 0% 88%');
      root.style.setProperty('--secondary-foreground', '0 0% 15%');
      root.style.setProperty('--muted', '0 0% 88%');
      root.style.setProperty('--muted-foreground', '0 0% 45%');
      root.style.setProperty('--accent', '0 0% 88%');
      root.style.setProperty('--accent-foreground', '0 0% 15%');
      root.style.setProperty('--border', '0 0% 85%');
      root.style.setProperty('--input', '0 0% 85%');
    } else {
      // Light theme (default)
      root.classList.remove('dark');
      root.style.setProperty('--background', '0 0% 100%');
      root.style.setProperty('--foreground', '20 14.3% 4.1%');
      root.style.setProperty('--card', '0 0% 100%');
      root.style.setProperty('--card-foreground', '20 14.3% 4.1%');
      root.style.setProperty('--popover', '0 0% 100%');
      root.style.setProperty('--popover-foreground', '20 14.3% 4.1%');
      root.style.setProperty('--primary', '142.1 76.2% 36.3%');
      root.style.setProperty('--primary-foreground', '355.7 100% 97.3%');
      root.style.setProperty('--secondary', '60 4.8% 95.9%');
      root.style.setProperty('--secondary-foreground', '24 9.8% 10%');
      root.style.setProperty('--muted', '60 4.8% 95.9%');
      root.style.setProperty('--muted-foreground', '25 5.3% 44.7%');
      root.style.setProperty('--accent', '60 4.8% 95.9%');
      root.style.setProperty('--accent-foreground', '24 9.8% 10%');
      root.style.setProperty('--border', '20 5.9% 90%');
      root.style.setProperty('--input', '20 5.9% 90%');
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'grey') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    
    toast({
      title: "Theme updated",
      description: `Switched to ${newTheme} theme.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Customize your SmartSpend experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <Label className="text-base font-semibold">Display Theme</Label>
            </div>
            
            <RadioGroup value={theme} onValueChange={(value) => handleThemeChange(value as 'light' | 'dark' | 'grey')}>
              <div className="flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent transition-colors">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex-1 cursor-pointer font-normal">
                  <div className="font-medium">Light</div>
                  <div className="text-sm text-muted-foreground">Bright and clean interface</div>
                </Label>
                <div className="h-8 w-8 rounded-full bg-white border-2 border-border"></div>
              </div>
              
              <div className="flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent transition-colors">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex-1 cursor-pointer font-normal">
                  <div className="font-medium">Dark</div>
                  <div className="text-sm text-muted-foreground">Easy on the eyes</div>
                </Label>
                <div className="h-8 w-8 rounded-full bg-slate-900 border-2 border-slate-700"></div>
              </div>
              
              <div className="flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent transition-colors">
                <RadioGroupItem value="grey" id="grey" />
                <Label htmlFor="grey" className="flex-1 cursor-pointer font-normal">
                  <div className="font-medium">Grey</div>
                  <div className="text-sm text-muted-foreground">Neutral and balanced</div>
                </Label>
                <div className="h-8 w-8 rounded-full bg-slate-400 border-2 border-slate-500"></div>
              </div>
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
