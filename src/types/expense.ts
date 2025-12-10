export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: Date;
  note?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Food & Dining', color: 'hsl(168, 76%, 36%)', icon: '🍽️' },
  { id: '2', name: 'Transportation', color: 'hsl(38, 92%, 50%)', icon: '🚗' },
  { id: '3', name: 'Shopping', color: 'hsl(280, 65%, 60%)', icon: '🛍️' },
  { id: '4', name: 'Entertainment', color: 'hsl(340, 75%, 55%)', icon: '🎬' },
  { id: '5', name: 'Bills & Utilities', color: 'hsl(200, 70%, 50%)', icon: '💡' },
  { id: '6', name: 'Health', color: 'hsl(142, 76%, 36%)', icon: '💊' },
  { id: '7', name: 'Other', color: 'hsl(220, 10%, 50%)', icon: '📦' },
];
