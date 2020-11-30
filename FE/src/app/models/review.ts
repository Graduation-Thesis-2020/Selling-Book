export interface Review {
  review: number;
  comment: string;
  bookId: string;
}
export interface ReviewDetail {
  review: number;
  comment: string;
  bookId: ReviewFromBook;
  date: Date;
}
export interface ReviewFromBook {
  _id: string;
  title: string;
}

