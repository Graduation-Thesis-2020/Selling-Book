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
  }
});

module.exports = mongoose.model('Review', reviewSchema);