const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  books: [{
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    title: {
      type: String
    },
    imageUrl: {
      type: String
    },
    imageId: {
      type: String
    },
    originalPrice: Number,
    price: Number,
    qty: Number,

  }]
  // totalPrice: {
  //     type: Number,
  //     required: true
  // },
  // totalQty: {
  //     type: Number,
  //     required: true
  // }
}, { timestamps: true } );

module.exports = mongoose.model('orderDetail', cartSchema);