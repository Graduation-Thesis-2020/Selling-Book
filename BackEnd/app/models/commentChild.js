const mongoose = require('mongoose');

// schema comment Child
const commentChildSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('CommentChild', commentChildSchema);