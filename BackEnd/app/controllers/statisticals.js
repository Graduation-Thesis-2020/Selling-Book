const User = require('../models/user');
const Publisher = require('../models/publisher');
const Book = require('../models/book');
const Order = require('../models/order');

module.exports = {

  getStatisticalByDay: async (req, res, next) => {

    let totalOrderDetail = [];
    let orderdata = await Order.find();
    let orderlength = orderdata.length;
    let totalPrice = 0, totalBill = 0;
    let i = 0;
    let filterday = req.params.day;

    for (i = 0; i < orderlength; i++) {
      let date = orderdata[i].created;
      let orderFilter = orderdata[i];
      let dated = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();

      if (dated == filterday && orderFilter.status == "Đã giao") {
        totalOrderDetail.push(orderFilter);
        totalPrice += orderFilter.totalPrice;
      }
    }

    if (totalOrderDetail != null && totalOrderDetail != '') {
      totalBill = totalOrderDetail.length;
      return res.status(200).json({
        totalPrice: totalPrice,
        totalBill: totalBill,
        totalOrderDetail
      });
    }
    return res.status(404).json({ message: " Không tìm thấy!!!!" });


  },
  getStatisticalByQuarter: async (req, res, next) => {

  },
  getStatisticalByMonth: async (req, res, next) => {
    
    let totalOrderDetail = [];
    let orderdata = await Order.find();
    let orderlength = orderdata.length;
    let totalPrice = 0, totalBill = 0;
    let i = 0;
    let filterMonth = req.params.month;

    for (i = 0; i < orderlength; i++) {
      let date = orderdata[11].created;
      let orderFilter = orderdata[i];
      let dated = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
      return res.status(404).json(dated);
      if (dated == filterday && orderFilter.status == "Đã giao") {
        totalOrderDetail.push(orderFilter);
        totalPrice += orderFilter.totalPrice;
      }
    }

    if (totalOrderDetail != null && totalOrderDetail != '') {
      totalBill = totalOrderDetail.length;
      return res.status(200).json({
        totalPrice: totalPrice,
        totalBill: totalBill,
        totalOrderDetail
      });
    }
    return res.status(404).json({ message: " Không tìm thấy!!!!" });

  }
}