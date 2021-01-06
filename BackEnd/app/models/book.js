const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema book
const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: false
  },
  pageCount: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number
  },
  availableQuantity: {
    type: Number,
    required: true
  },
  originalQuantity: {
    type: Number
  },
  imageUrl: {
    type: String
  },
  imageId: {
    type: String
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  discount: {
    type: Number,
    default: 0
  }
});


module.exports = mongoose.model('Book', bookSchema);
