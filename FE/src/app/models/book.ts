export interface Books {
  title: string;
  description: string;
  publishDate: Date;
  pageCount: number;
  price: number;
  availableQuantity: number;
  imageUrl: string;
  imageId: string;
  publisher: string;
  author: string;
  categories: string[];
  reviews: string[];
  _id: string;
  discount: number;
  image: File;
  originalQuantity: number;
  originalPrice : number;
}
export interface Books1 {
  title: string;
  description: string;
  publishDate: Date;
  pageCount: number;
  price: number;
  availableQuantity: number;
  publisher: string;
  author: string;
  //categories: string;
  categories: string[];
  discount: number;
  image: File;
  //discount: string;
}
export interface Books2 {
  _id: string;
  title: string;
  description: string;
  publishDate: Date;
  pageCount: number;
  price: number;
  availableQuantity: number;
  publisher: string;
  author: string;
  //categories: string;
  categories: string[];
  discount: number;
  image: File;
  //discount: string;
}
export interface BooksInCart {
  _id: string;
  title: string;
  price: number;
}
export interface AuthorFromBook {
  _id: string;
  name: string;
  firstname: string;
  lastname: string;
}
export interface CatFromBook {
  _id: string;
  name: string;
}
export interface PubFromBook {
  _id: string;
  name: string;
}
export interface BookEdit {
  title: string;
  description: string;
  publishDate: Date;
  pageCount: number;
  price: number;
  availableQuantity: number;
  imageUrl: string;
  imageId: string;
  publisher: PubFromBook;
  author: AuthorFromBook;
  categories: CatFromBook[];
  reviews: string[];
  _id: string;
  discount: number;
  image: File;
  originalQuantity: number;
  originalPrice : number;
}
export interface BookNew {
  title: string;
  description: string;
  publishDate: Date;
  pageCount: number;
  price: number;
  availableQuantity: number;
  imageUrl: string;
  imageId: string;
  publisher: PubFromBook;
  author: AuthorFromBook;
  categories: CatFromBook[];
  reviews: string[];
  _id: string;
  discount: number;
  image: File;
}
export interface BookInCartCheckout {
  title: string;
  price: number;
  qty: number;
  imageUrl: string;
  imageId: string;
  bookId: string;
  originalPrice : number;
}
