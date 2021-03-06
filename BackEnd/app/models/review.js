const mongoose = require('mongoose');

// schema review
const reviewSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  review: {
    type: Number, required: true
  },
  date: {
    type: Date, default: Date.now
  },
  comment: {
    type: String
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  commentChilds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CommentChild'
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Review', reviewSchema);