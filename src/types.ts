import { Meal } from './data/meals';

export interface CartItem {
  meal: Meal;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'In Transit' | 'Completed';

export interface Order {
  id: string;
  item: string;
  customer: string;
  time: string;
  status: OrderStatus;
  total: number;
}
