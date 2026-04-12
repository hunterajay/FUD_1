import { Meal } from '../data/meals';

export interface CartItem {
  meal: Meal;
  quantity: number;
}
