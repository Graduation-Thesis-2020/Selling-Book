import { Cart, Item } from './cart';

export interface Order {
  email: string;
  cart: Item[];
  phone: string;
  address: string;
  name: string;
}
