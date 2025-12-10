import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import AddExpense from '@/components/AddExpense';
import RecentExpenses from '@/components/RecentExpenses';
import SpendingByCategory from '@/components/SpendingByCategory';
import CategoryEditor from '@/components/CategoryEditor';
import { Expense, Category, DEFAULT_CATEGORIES } from '@/types/expense';

interface IndexProps {
  userEmail: string;
  onLogout: () => void;
}

const Index = ({ userEmail, onLogout }: IndexProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [categoryEditorOpen, setCategoryEditorOpen] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem(`expenses_${userEmail}`);
    const savedCategories = localStorage.getItem(`categories_${userEmail}`);
    
    if (savedExpenses) {
      try {
        setExpenses(JSON.parse(savedExpenses));
      } catch (error) {
        console.error('Error loading expenses:', error);
      }
    }
    
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    }
  }, [userEmail]);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem(`expenses_${userEmail}`, JSON.stringify(expenses));
    }
  }, [expenses, userEmail]);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`categories_${userEmail}`, JSON.stringify(categories));
  }, [categories, userEmail]);

  const handleAddExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userEmail={userEmail} onLogout={onLogout} />
      
      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Track and manage your expenses</p>
        </div>

        <div className="space-y-6">
          <AddExpense
            categories={categories}
            onAddExpense={handleAddExpense}
            onEditCategories={() => setCategoryEditorOpen(true)}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <RecentExpenses
              expenses={expenses}
              categories={categories}
              onDeleteExpense={handleDeleteExpense}
            />
            <SpendingByCategory expenses={expenses} categories={categories} />
          </div>
        </div>
      </main>

      <CategoryEditor
        open={categoryEditorOpen}
        onOpenChange={setCategoryEditorOpen}
        categories={categories}
        onUpdateCategories={setCategories}
      />
    </div>
  );
};

export default Index;
