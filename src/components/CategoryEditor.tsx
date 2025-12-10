import { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Category } from '@/types/expense';
import { toast } from '@/hooks/use-toast';

interface CategoryEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  onUpdateCategories: (categories: Category[]) => void;
}

const EMOJI_OPTIONS = ['🍽️', '🚗', '🛍️', '🎬', '💡', '💊', '📦', '✈️', '🏠', '📚', '🎮', '💼', '🎁', '☕', '🏋️'];

const COLOR_OPTIONS = [
  'hsl(168, 76%, 36%)',
  'hsl(38, 92%, 50%)',
  'hsl(280, 65%, 60%)',
  'hsl(340, 75%, 55%)',
  'hsl(200, 70%, 50%)',
  'hsl(142, 76%, 36%)',
  'hsl(220, 10%, 50%)',
  'hsl(15, 80%, 55%)',
];

const CategoryEditor = ({
  open,
  onOpenChange,
  categories,
  onUpdateCategories,
}: CategoryEditorProps) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('📦');
  const [newCategoryColor, setNewCategoryColor] = useState(COLOR_OPTIONS[0]);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: 'Category name required',
        description: 'Please enter a name for the new category.',
        variant: 'destructive',
      });
      return;
    }

    if (categories.some((c) => c.name.toLowerCase() === newCategoryName.toLowerCase())) {
      toast({
        title: 'Category exists',
        description: 'A category with this name already exists.',
        variant: 'destructive',
      });
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      icon: newCategoryIcon,
      color: newCategoryColor,
    };

    onUpdateCategories([...categories, newCategory]);
    setNewCategoryName('');
    toast({
      title: 'Category added',
      description: `"${newCategory.name}" has been added.`,
    });
  };

  const handleDeleteCategory = (id: string) => {
    const category = categories.find((c) => c.id === id);
    onUpdateCategories(categories.filter((c) => c.id !== id));
    toast({
      title: 'Category deleted',
      description: `"${category?.name}" has been removed.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card">
        <DialogHeader>
          <DialogTitle className="text-foreground">Manage Categories</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add new category */}
          <div className="space-y-4 rounded-xl bg-muted/50 p-4">
            <Input
              placeholder="New category name..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="bg-background"
            />

            <div>
              <p className="mb-2 text-sm text-muted-foreground">Icon</p>
              <div className="flex flex-wrap gap-2">
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setNewCategoryIcon(emoji)}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg transition-all ${
                      newCategoryIcon === emoji
                        ? 'bg-primary/20 ring-2 ring-primary'
                        : 'bg-background hover:bg-muted'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-muted-foreground">Color</p>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewCategoryColor(color)}
                    className={`h-8 w-8 rounded-full transition-all ${
                      newCategoryColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <Button onClick={handleAddCategory} className="w-full bg-primary text-primary-foreground">
              <Plus className="mr-1.5 h-4 w-4" />
              Add Category
            </Button>
          </div>

          {/* Existing categories */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Your Categories</p>
            <div className="max-h-[200px] space-y-2 overflow-y-auto">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <span>{category.icon}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCategory(category.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryEditor;
