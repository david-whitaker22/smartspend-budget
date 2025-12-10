import { Expense, Category } from '@/types/expense';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface SpendingByCategoryProps {
  expenses: Expense[];
  categories: Category[];
}

const SpendingByCategory = ({ expenses, categories }: SpendingByCategoryProps) => {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryTotals)
    .map(([name, value]) => {
      const category = categories.find((c) => c.name === name);
      return {
        name,
        value,
        color: category?.color || 'hsl(220, 10%, 50%)',
        icon: category?.icon || '📦',
      };
    })
    .sort((a, b) => b.value - a.value);

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card animate-slide-up">
      <h2 className="mb-5 text-lg font-semibold text-foreground">Spending by Category</h2>

      {chartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <span className="text-2xl">📊</span>
          </div>
          <p className="text-muted-foreground">No data yet</p>
          <p className="text-sm text-muted-foreground/70">Your spending breakdown will appear here</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          {/* Chart */}
          <div className="h-[200px] w-full lg:w-[200px] flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-md)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-3">
            {chartData.map((item) => {
              const percentage = ((item.value / total) * 100).toFixed(1);
              return (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="flex items-center gap-1.5 text-sm text-foreground">
                      <span>{item.icon}</span>
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">
                      ${item.value.toFixed(2)}
                    </span>
                    <span className="w-12 text-right text-sm text-muted-foreground">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
            
            {/* Total */}
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="font-medium text-foreground">Total</span>
              <span className="text-lg font-semibold text-primary">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpendingByCategory;
