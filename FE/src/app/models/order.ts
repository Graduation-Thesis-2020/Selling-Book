import { Cart, Item, Item1, Item2 } from './cart';

export interface Order {
  email: string;
  books: Item[];
  phone: string;
  address: string;
  name: string;
  total: number;
}
export interface Order1 {
  email: string;
  books: Item2[];
  phone: string;
  address: string;
  name: string;
  total: number;
}
export interface itemInOrder {
    _id: string;
    title: string;
    price: number;
    qty: number;
    bookId: string;
    imageUrl: string;
    imageId: string;
}
export interface OrderDetail {
  orderId: string;
  books: itemInOrder[];
}
export interface AllOrder {
  email: string;
  phone: string;
  address: string;
  name: string;
  status: string;
  isPaid: boolean;
  _id: string;
  userId: string;
  totalPrice: number;
  created: Date;
  orderDetailId: OrderDetail;
}
export interface ChangeStatus {
  status: string;
}
export interface NotificationEmail {
  notification: boolean;
}
