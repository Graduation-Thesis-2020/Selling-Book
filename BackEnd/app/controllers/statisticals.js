const User = require('../models/user');
const Publisher = require('../models/publisher');
const Book = require('../models/book');
const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');
//const Publisher = require('../models/publisher');
const Author = require('../models/author');
const { findById } = require('../models/user');

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
          if (findedOrder[j].status == "Đã giao") {
            totalPrice += findedOrder[j].totalPrice;
          }
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
  },

  getStatisticalAllCustomerTotalPriceInMonth: async (req, res, next) => {

    try {
      let userData = await User.find({ role: 0 });
      let i, j;
      let totalPrice = 0;
      let AllCustomerPrice = [];
      //  let dateNow = new Date;
      //   let datedNow = ((dateNow.getMonth() > 8) ? (dateNow.getMonth() + 1) : ('0' + (dateNow.getMonth() + 1))) + '-' + dateNow.getFullYear();

      let filtermonth = req.params.month;
      let dated;
      for (i = 0; i < userData.length; i++) {
        let findedOrder = await Order.find({ userId: userData[i]._id });
        for (j = 0; j < findedOrder.length; j++) {
          let date = findedOrder[j].created;
          dated = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
          if (dated == filtermonth && findedOrder[j].status == "Đã giao") {
            totalPrice += findedOrder[j].totalPrice;
          }
        }
        if (totalPrice != 0) {
          let CustomerPrice = {
            email: userData[i].email,
            fullname: userData[i].name,
            phone: userData[i].phone,
            imageUrl: userData[i].imageUrl,
            imageId: userData[i].imageId,
            role: userData[i].role,
            filterMonth: filtermonth,
            totalPrice: totalPrice
          };
          AllCustomerPrice.push(CustomerPrice);
        }

        totalPrice = 0;
      }
      if (AllCustomerPrice != null && AllCustomerPrice != '') {
        for (i = 0; i < AllCustomerPrice.length - 1; i++) {
          for (j = i + 1; j < AllCustomerPrice.length; j++) {
            if (AllCustomerPrice[j].totalPrice > AllCustomerPrice[i].totalPrice) {
              let a = AllCustomerPrice[j];
              AllCustomerPrice[j] = AllCustomerPrice[i];
              AllCustomerPrice[i] = a;

            }
          }
        }
        return res.status(200).json(AllCustomerPrice);
      } else {
        return res.status(404).json({ message: "Không có!!!" });
      }

    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getStatisticalnewCustomerInMonth: async (req, res, next) => {
    let userData = await User.find({ role: 0 });
    // let dateNow = new Date;
    //   let datedNow = ((dateNow.getMonth() > 8) ? (dateNow.getMonth() + 1) : ('0' + (dateNow.getMonth() + 1))) + '-' + dateNow.getFullYear();
    //   return res.status(200).json(datedNow);
    let filtermonth = req.params.month;

    let filteredData = [];

    let i = 0;
    for (i = 0; i < userData.length; i++) {
      let date = userData[i].createdAt;

      let dated = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
      if (dated == filtermonth) {
        filteredData.push(userData[i]);
      }
    }

    if (filteredData != null && filteredData != '') {
      return res.status(200).json(filteredData);
    }
    return res.status(404).json({ message: " Không có!!!!" });

  },

  getStatisticalAllBookTotalPrice: async (req, res, next) => {
    try {
      let orderDetailData = await OrderDetail.find();
      let bookDataDetail = await Book.find();
      let i, j;
      let BookArray = [];
      let Revenue, Profit, Quantity;
      for (i = 0; i < orderDetailData.length; i++) {
        for (j = 0; j < orderDetailData[i].books.length; j++) {
          let bookdata = orderDetailData[i].books[j];
          let NXBxTG = await Book.findById(bookdata.bookId).populate([{
            path: 'author', select: 'name', model: Author
          }, {
            path: 'publisher', select: 'name', model: Publisher
          }]);
          Revenue = bookdata.price * bookdata.qty;
          Profit = Revenue - (bookdata.originalPrice * bookdata.qty);
          Quantity = bookdata.qty;
          if (NXBxTG != null && NXBxTG != '') {
            let BookDetail = {
              bookId: bookdata.bookId,
              title: bookdata.title,
              imageUrl: bookdata.imageUrl,
              imageId: bookdata.imageId,
              Publisher: NXBxTG.publisher,
              Author: NXBxTG.author,
              Quantity: Quantity,
              Revenue: Revenue,
              Profit: Profit
            }
            BookArray.push(BookDetail);
          } else {
            let BookDetail = {
              bookId: bookdata.bookId,
              title: bookdata.title,
              imageUrl: bookdata.imageUrl,
              imageId: bookdata.imageId,
              //   Publisher: NXBxTG.publisher,
              //    Author: NXBxTG.author,
              Quantity: Quantity,
              Revenue: Revenue,
              Profit: Profit
            }
            BookArray.push(BookDetail);
          }
        }
      }

      for (i = 0; i < BookArray.length - 1; i++) {
        for (j = i + 1; j < BookArray.length; j++) {
          if (BookArray[i].bookId.toString() == BookArray[j].bookId.toString()) {
            BookArray[i].Quantity += BookArray[j].Quantity;
            BookArray[i].Revenue += BookArray[j].Revenue;
            BookArray[i].Profit += BookArray[j].Profit;
            let index = j;
            for (let k = index + 1; k < BookArray.length; k++) {
              BookArray[k - 1] = BookArray[k];
            }
            BookArray.length--;
          }
        }
      }

      for (i = 0; i < BookArray.length - 1; i++) {
        for (j = i + 1; j < BookArray.length; j++) {
          if (BookArray[j].Quantity > BookArray[i].Quantity) {
            let a = BookArray[j];
            BookArray[j] = BookArray[i];
            BookArray[i] = a;

          }
        }
      }


      return res.status(200).json(BookArray);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getStatisticalAllBookTotalPriceInMonth: async (req, res, next) => {
    try {
      let orderDetailData = await OrderDetail.find();
      let bookDataDetail = await Book.find();
      let filtermonth = req.params.month;
      let i, j;
      let BookArray = [];
      let Revenue, Profit, Quantity;
      for (i = 0; i < orderDetailData.length; i++) {
        for (j = 0; j < orderDetailData[i].books.length; j++) {
          let filterOrder = await Order.findById(orderDetailData[i].orderId);
          let date = filterOrder.created;
          let dated = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
          if (dated == filtermonth) {
            let bookdata = orderDetailData[i].books[j];
            let NXBxTG = await Book.findById(bookdata.bookId).populate([{
              path: 'author', select: 'name', model: Author
            }, {
              path: 'publisher', select: 'name', model: Publisher
            }]);
            Revenue = bookdata.price * bookdata.qty;
            Profit = Revenue - (bookdata.originalPrice * bookdata.qty);
            Quantity = bookdata.qty;
            if (NXBxTG != null && NXBxTG != '') {
              let BookDetail = {
                bookId: bookdata.bookId,
                title: bookdata.title,
                imageUrl: bookdata.imageUrl,
                imageId: bookdata.imageId,
                Publisher: NXBxTG.publisher,
                Author: NXBxTG.author,
                SaleMonth: filtermonth,
                Quantity: Quantity,
                Revenue: Revenue,
                Profit: Profit
              }
              BookArray.push(BookDetail);
            } else {
              let BookDetail = {
                bookId: bookdata.bookId,
                title: bookdata.title,
                imageUrl: bookdata.imageUrl,
                imageId: bookdata.imageId,
                SaleMonth: filtermonth,
                //   Publisher: NXBxTG.publisher,
                //    Author: NXBxTG.author,
                Quantity: Quantity,
                Revenue: Revenue,
                Profit: Profit
              }
              BookArray.push(BookDetail);
            }
          }
        }
      }

      for (i = 0; i < BookArray.length - 1; i++) {
        for (j = i + 1; j < BookArray.length; j++) {
          if (BookArray[i].bookId.toString() == BookArray[j].bookId.toString()) {
            BookArray[i].Quantity += BookArray[j].Quantity;
            BookArray[i].Revenue += BookArray[j].Revenue;
            BookArray[i].Profit += BookArray[j].Profit;
            let index = j;
            for (let k = index + 1; k < BookArray.length; k++) {
              BookArray[k - 1] = BookArray[k];
            }
            BookArray.length--;
          }
        }
      }

      for (i = 0; i < BookArray.length - 1; i++) {
        for (j = i + 1; j < BookArray.length; j++) {
          if (BookArray[j].Quantity > BookArray[i].Quantity) {
            let a = BookArray[j];
            BookArray[j] = BookArray[i];
            BookArray[i] = a;

          }
        }
      }


      return res.status(200).json(BookArray);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}