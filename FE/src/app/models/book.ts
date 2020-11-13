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
  discount: string;
  image: File;
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
  categories: string;
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
  categories: string;
  discount: number;
  image: File;
  //discount: string;
}
