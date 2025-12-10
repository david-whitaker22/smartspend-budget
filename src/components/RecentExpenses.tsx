import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Expense, Category } from '@/types/expense';
import { format } from 'date-fns';

interface RecentExpensesProps {
  expenses: Expense[];
  categories: Category[];
  onDeleteExpense: (id: string) => void;
}

const RecentExpenses = ({ expenses, categories, onDeleteExpense }: RecentExpensesProps) => {
  const getCategoryData = (categoryName: string) => {
    return categories.find((c) => c.name === categoryName) || {
      icon: '📦',
      color: 'hsl(220, 10%, 50%)',
    };
  };

  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card animate-slide-up">
      <h2 className="mb-5 text-lg font-semibold text-foreground">Recent Expenses</h2>

      {recentExpenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-muted-foreground">No expenses yet</p>
          <p className="text-sm text-muted-foreground/70">Add your first expense above</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentExpenses.map((expense, index) => {
            const categoryData = getCategoryData(expense.category);
            return (
              <div
                key={expense.id}
                className="flex items-center justify-between rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${categoryData.color}20` }}
                  >
                    <span className="text-lg">{categoryData.icon}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{expense.category}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(expense.date), 'MMM d, yyyy • h:mm a')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-foreground">
                    ${expense.amount.toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteExpense(expense.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentExpenses;
