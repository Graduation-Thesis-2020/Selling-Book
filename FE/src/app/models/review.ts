export interface Review {
  review: number;
  comment: string;
  bookId: string;
}
export interface ReviewDetail {
  _id: string
  userId: GetUserForReview;
  review: number;
  comment: string;
  bookId: ReviewFromBook;
  date: Date;
  commentChilds: ReviewChildDetail[];
}
export interface ReviewFromBook {
  _id: string;
  title: string;
}
export interface Rating {
  total: number;
  average: number;
  message: string;
}
export interface GetUserForReview {
  name: string;
  imageUrl: string;
  imageId: string;
  _id: string;
  email: string;
}
export interface ReviewBook {
  reviews: ReviewDetail[];
}
export interface ReviewChildDetail {
  _id: string
  userId: GetUserForReview;
  comment: string;
  date: Date;
  like: likeID ;
}
export interface likeID {
  id: string;
}
export interface CommentChild {
  comment: string;
}

