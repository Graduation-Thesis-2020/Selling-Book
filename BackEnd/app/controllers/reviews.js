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
    let id = req.params.reviewId;
    try {
      let datareview = await Review.findById(id).populate([{
        path: 'bookId', select: 'title', model: book
      }, {
        path: 'commentChilds', select: 'userId date comment likes', model: CommentChild,
        populate: { path: 'userId', select: 'name imageUrl imageId', model: User }
      }]);
      return res.status(200).json(datareview);
    } catch {
      return res.status(404).json({
        message: "No valid entry found for provided ID "
      })
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
      return res.status(200).json(datareview);
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
      let i;
      //   let bookIdArray = [];
      let commentArray = [];
      if (books != null && books != '') {
        for (i = 0; i < books.length; i++) {
          //  bookIdArray.push(books[i]._id);
          let commentdata = await Review.find({ bookId: books[i]._id });
          commentArray.push(commentdata);
        }
      } else {
        return res.status(400).json({ message: "Không tìm thấy!!!" })
      }
      if (commentArray != null && commentArray != '') {
        return res.status(200).json(commentArray);
      }
      return res.status(404).json({ message: "Không có" });

    } catch (error) {
      return res.status(500).json(error);
    }
  }

}