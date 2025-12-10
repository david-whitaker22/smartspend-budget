import { useState } from 'react';
import { Plus, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category, Expense } from '@/types/expense';
import { toast } from '@/hooks/use-toast';

interface AddExpenseProps {
  categories: Category[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  onEditCategories: () => void;
}

const AddExpense = ({ categories, onAddExpense, onEditCategories }: AddExpenseProps) => {
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !selectedCategory) {
      toast({
        title: 'Missing fields',
        description: 'Please enter an amount and select a category.',
        variant: 'destructive',
      });
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid positive number.',
        variant: 'destructive',
      });
      return;
    }

    onAddExpense({
      amount: numAmount,
      category: selectedCategory,
      date: new Date(),
    });

    setAmount('');
    setSelectedCategory('');
    
    toast({
      title: 'Expense added',
      description: `$${numAmount.toFixed(2)} added to ${selectedCategory}`,
    });
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card animate-fade-in">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Add Expense</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onEditCategories}
          className="text-muted-foreground hover:text-foreground"
        >
          <Settings2 className="mr-1.5 h-4 w-4" />
          Edit Categories
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-7 h-12 text-lg bg-background"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[200px] h-12 bg-background">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name} className="cursor-pointer">
                <span className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button type="submit" className="h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-1.5 h-4 w-4" />
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddExpense;
