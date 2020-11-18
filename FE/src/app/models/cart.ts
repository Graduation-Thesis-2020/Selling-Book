import { Books, Books1, BooksInCart } from "./book";

export interface Cart {
  item: Books;
  qty: number;
  price: number;
}
export interface RootCarts<T> {
  ListBook: T;
  totalPrice: number;
}
export interface T<A> {
  item: A;
  qty: number;
  prize: number;
}
export interface Order {
  email: string;
  phone: string;
  address: string;
  name: string;
}
export interface Mess {
  json(): any;
  message: string;
}
export interface Item {
  total: number;
  product: Books;
}
export interface Item1 {
  product: BooksInCart;
  total: number;
}
export interface Item2 {
  _id: string;
  title: string;
  price: number;
  total: number;
}
export interface CartModelPublic {
  total: number;
  prodData: [
    {
      id: number;
      incart: number;
    }
  ];
}
