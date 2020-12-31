const Review = require('./../models/review');
const Book = require('./../models/book');
const mongoose = require('mongoose');
const book = require('./../models/book');
const User = require('../models/user');
const CommentChild = require('../models/commentChild');
const commentChild = require('../models/commentChild');
module.exports = {

  getListReview: async (req, res, next) => {

    try {
      let review = await Review.find().populate([{
        path: 'bookId', select: 'title', model: book
      }, {
        path: 'userId', select: 'name email imageUrl imageId', model: User
      }, {
        path: 'commentChilds', select: 'userId date comment likes', model: CommentChild,
        populate: { path: 'userId', select: 'name imageUrl imageId', model: User }
      }]);
      return res.status(200).json(review);
    } catch (error) {
      return res.status(500).json(error);
    }

  },
  getListCommentChild: async (req, res, next) => {

    try {
      let comment = await CommentChild.find().populate([{
        path: 'bookId', select: 'title', model: book
      }, {
        path: 'userId', select: 'name email imageUrl imageId', model: User
      }]);
      if (comment != null && comment != '') {
        return res.status(200).json(comment);
      }
      return res.status(404).json({ message: "Không có!!!" });
    } catch (error) {
      return res.status(500).json(error);
    }

  },


  createReview: (req, res, next) => {
    Book.findById(req.body.bookId, (err, book) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: err
        });
      } else {
        const review = new Review();
        review.review = req.body.review;
        review.comment = req.body.comment;
        review.bookId = req.body.bookId;
        Review.create(review, (err, review) => {
          if (err) {
            console.log("Error creating Review: ", err);
            res
              .status(400)
              .json(err)
          } else {
            review.save();
            book.reviews.push(review);
            book.save();
            console.log("Review Created: ", review);
            res
              .status(201)
              .json(review)
          }
        });

      }
    });

  },

  getReviewId: async (req, res, next) => {
    let reviewId = req.params.reviewId;

    try {
      let reviewData = await Review.findById(reviewId).populate([{
       path: 'commentChilds', select: 'userId date comment likes', model: CommentChild, populate: { path: 'userId', select: 'name imageUrl imageId', model: User } 
      }, {
        path: 'bookId', select: 'title', model: book
      }, {
        path: 'userId', select: 'name email imageUrl imageId', model: User
      },]);
      if (reviewData != null && reviewData != '') {
        return res.status(200).json(reviewData);
      }
      return res.status(404).json({ message: "Không tìm thấy!!!" });
    } catch (error) {
      return res.status(500).json(error);
    }

  },

  getReviewByBook: async (req, res, next) => {
    let bookId = req.params.bookId;
    try {
      let bookdata = await Book.findById(bookId).populate([{
        path: 'reviews', select: 'userId review date comment commentChilds likes ', model: Review,
        populate: { path: 'commentChilds', select: 'userId date comment likes', model: CommentChild, populate: { path: 'userId', select: 'name imageUrl imageId', model: User } }
      }, {
        path: 'reviews', select: 'userId review date comment commentChilds likes ', model: Review, populate: { path: 'userId', select: 'name imageUrl imageId', model: User }
      },]);
      let commentData = bookdata.reviews;
      if (bookdata != null && bookdata != '') {
        return res.status(200).json(commentData);
      }
      return res.status(404).json({ message: "Không tìm thấy" });
    } catch (error) {
      return res.status(500).json({ message: "Lỗi rồi" });
    }
  },
  getCommentChildId: async (req, res, next) => {
    let id = req.params.commentChildId;
    try {
      let datareview = await CommentChild.findById(id).populate([{
        path: 'bookId', select: 'title', model: book
      }, {
        path: 'userId', select: 'name email imageUrl imageId', model: User
      }]);
      if (datareview != null && datareview != '') {
        return res.status(200).json(datareview);
      }
      return res.status(404).json({ message: "Không tìm thấy!!!" });
    } catch {
      return res.status(404).json({
        message: "No valid entry found for provided ID "
      })
    }
  },

  updateReview: (req, res, next) => {
    Review.findByIdAndUpdate(req.params.reviewId, { $set: req.body }, { new: true }, (err, review) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: err
        });
      } else {
        return res.status(200).json({
          message: 'Review updated',
          review: review
        });
      }
    });
  },

  deleteReview: async (req, res, next) => {
    const id = req.params.reviewId;
    try {
      const reviewdata = await Review.findById(id);
      reviewdata.remove();
      return res.status(200).json({ message: "Xóa thành công!!!" });
    } catch (error) {
      return res.status(500).json(error);
    }



  },

  deleteCommentChild: async (req, res, next) => {
    const id = req.params.commentChildId;
    try {
      const reviewdata = await CommentChild.findById(id);
      reviewdata.remove();
      return res.status(200).json({ message: "Xóa thành công!!!" });
    } catch (error) {
      return res.status(500).json(error);
    }



  },

  getCommentByBook: async (req, res, next) => {
    let searchOptions = {}
    if (req.query.title != null && req.query.title != '') {
      searchOptions.title = new RegExp(req.query.title, 'i')
    }
    try {

      let books = await Book.find(searchOptions);
      //  return res.status(200).json(books)
      let i, j;
      let commentArray = [];
      let commentArrayData = [];
      if (books != null && books != '') {

        for (i = 0; i < books.length; i++) {
          for (j = 0; j < books[i].reviews.length; j++) {
            commentArray.push(books[i].reviews[j]);
          }

        }
        //   return res.status(200).json(commentArray);
        if (commentArray != null && commentArray != '') {
          for (i = 0; i < commentArray.length; i++) {
            let commentdata = await Review.findById(commentArray[i]).populate([{
              path: 'bookId', select: 'title', model: book
            }, {
              path: 'userId', select: 'name email imageUrl imageId', model: User
            }]);
            if (commentdata != null && commentdata != '') {
              commentArrayData.push(commentdata);
            }
          }
          if (commentArrayData != null && commentArrayData != '') {
            return res.status(200).json(commentArrayData);
          }
          return res.status(400).json({ message: "Không có!!!" });

        } else {
          return res.status(400).json({ message: "Không có bình luận nào!!!!" })
        }
      } else {
        return res.status(404).json({ message: "Không tìm thấy!!!" });
      }

    } catch (error) {
      return res.status(500).json(error);
    }
  }

}