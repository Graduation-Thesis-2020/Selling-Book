const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  orderDetailId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orderDetail'
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Chờ xác nhận',
  },
  address: {
    type: String,
    required: true
  },
  // deliverStatus: {
  //     type: Boolean,
  //     default: false,
  // },
  note: {
    type: String
  },
  comment: {
    title: { type: String },
    content: { type: String, default: "" },
    isComment: { type: Number, default: 0 }
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  completedDay: {
    type: Date,
    default: null
  },
  totalPrice: {
    type: Number
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  infoPaid: {
    type: String,
  },
});

module.exports = mongoose.model('Order', schema);