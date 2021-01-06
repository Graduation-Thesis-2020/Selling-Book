const User = require('../models/user');
const Publisher = require('../models/publisher');
const Book = require('../models/book');
const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');

module.exports = {

  getStatisticalByDay: async (req, res, next) => {

    let totalOrderDetail = [];
    let orderdata = await Order.find();
    let orderlength = orderdata.length;
    let totalPrice = 0, totalBill = 0;
    let totalOriginalPrice = 0;
    let totalFinalPrice;
    let i = 0;
    let filterday = req.params.day;

    for (i = 0; i < orderlength; i++) {
      let date = orderdata[i].created;
      let orderFilter = orderdata[i];
      let dated = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();

      if (dated == filterday && orderFilter.status == "Đã giao") {
        totalOrderDetail.push(orderFilter);
        totalPrice += orderFilter.totalPrice;
        let j;
        let orderDetailData = await OrderDetail.findOne({ orderId: orderFilter._id })
        // return res.status(200).json(orderDetailData)
        for (j = 0; j < orderDetailData.books.length; j++) {
          totalOriginalPrice += (orderDetailData.books[j].originalPrice * orderDetailData.books[j].qty);
        }
        totalFinalPrice = totalPrice - totalOriginalPrice;
      }
    }

    if (totalOrderDetail != null && totalOrderDetail != '') {
      totalBill = totalOrderDetail.length;
      return res.status(200).json({
        totalRevenue: totalPrice,
        totalProfit: totalFinalPrice,
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

  },

  getStatisticalAllCustomerTotalPrice: async (req, res, next) => {

    try {
      let userData = await User.find({ role: 0 });
      let i, j;
      let totalPrice = 0;
      let AllCustomerPrice = [];
      for (i = 0; i < userData.length; i++) {
        let findedOrder = await Order.find({ userId: userData[i]._id });
        for (j = 0; j < findedOrder.length; j++) {
          totalPrice += findedOrder[j].totalPrice;
        }
        let CustomerPrice = {
          email: userData[i].email,
          fullname: userData[i].name,
          phone: userData[i].phone,
          imageUrl: userData[i].imageUrl,
          imageId: userData[i].imageId,
          role: userData[i].role,
          totalPrice: totalPrice
        };
        AllCustomerPrice.push(CustomerPrice);
        totalPrice = 0;
      }
      for (i = 0; i < AllCustomerPrice.length - 1; i++) {
        for (j = i + 1; j < AllCustomerPrice.length; j++) {
          if (AllCustomerPrice[j].totalPrice > AllCustomerPrice[i].totalPrice) {
            let a = AllCustomerPrice[j];
            AllCustomerPrice[j] = AllCustomerPrice[i];
            AllCustomerPrice[i] = a;

          }
        }
      }
      return res.status(200).json(AllCustomerPrice)
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}