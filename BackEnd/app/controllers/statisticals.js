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
    let Revenue, Profit, Quantity;
    let TotalRevenue = 0, TotalProfit = 0;
    let orderData = await Order.find();
    let totalOriginal = 0;
    let totalBill = 0;
    let j;
    let i = 0;
    let filterday = req.params.day;

    for (i = 0; i < orderData.length; i++) {
      if (orderData[i].status == "Đã giao") {
        let orderDetailData = await OrderDetail.findOne({ orderId: orderData[i]._id });
        let date = orderData[i].created;
        let dated = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();

        if (dated == filterday) {
          Revenue = orderData[i].totalPrice;
          for (j = 0; j < orderDetailData.books.length; j++) {
            totalOriginal += (orderDetailData.books[j].originalPrice * orderDetailData.books[j].qty);
          }
          Profit = Revenue - totalOriginal;
          let orderElement = {
            orderId: orderData[i]._id,
            email: orderData[i].email,
            name: orderData[i].name,
            phone: orderData[i].phone,
            status: orderData[i].status,
            isPaid: orderData[i].isPaid,
            completedDay: filterday,
            Revenue: Revenue,
            OriginalPrice: totalOriginal,
            Profit: Profit
          }
          TotalRevenue += Revenue;
          TotalProfit += Profit;
          totalOrderDetail.push(orderElement);
          totalOriginal = 0;
          //    totalBill++;
        }
      }
    }

    if (totalOrderDetail != null && totalOrderDetail != '') {
      for (i = 0; i < totalOrderDetail.length - 1; i++) {
        for (j = i + 1; j < totalOrderDetail.length; j++) {
          if (totalOrderDetail[j].Revenue > totalOrderDetail[i].Revenue) {
            let a = totalOrderDetail[j];
            totalOrderDetail[j] = totalOrderDetail[i];
            totalOrderDetail[i] = a;
          }
        }
      }


      totalBill = totalOrderDetail.length;
      return res.status(200).json({
        totalRevenue: TotalRevenue,
        totalProfit: TotalProfit,
        totalBill: totalBill,
        totalOrderDetail
      });
    }
    return res.status(404).json({ message: " Không tìm thấy!!!!" });


  },
  getStatisticalByYear: async (req, res, next) => {

    let totalOrderDetail = [];
    let Revenue, Profit, Quantity;
    let TotalRevenue = 0, TotalProfit = 0;
    let orderData = await Order.find();
    let totalOriginal = 0;
    let totalBill = 0;
    let j;
    let i = 0;
    let filterday = req.params.year;

    for (i = 0; i < orderData.length; i++) {
      if (orderData[i].status == "Đã giao") {
        let orderDetailData = await OrderDetail.findOne({ orderId: orderData[i]._id });
        let date = orderData[i].created;
        let dated = date.getFullYear();

        if (dated == filterday) {
          let completedDay = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
          Revenue = orderData[i].totalPrice;
          for (j = 0; j < orderDetailData.books.length; j++) {
            totalOriginal += (orderDetailData.books[j].originalPrice * orderDetailData.books[j].qty);
          }
          Profit = Revenue - totalOriginal;
          let orderElement = {
            orderId: orderData[i]._id,
            email: orderData[i].email,
            name: orderData[i].name,
            phone: orderData[i].phone,
            status: orderData[i].status,
            isPaid: orderData[i].isPaid,
            completedDay: completedDay,
            Revenue: Revenue,
            OriginalPrice: totalOriginal,
            Profit: Profit
          }
          TotalRevenue += Revenue;
          TotalProfit += Profit;
          totalOrderDetail.push(orderElement);
          totalOriginal = 0;
          //    totalBill++;
        }
      }
    }

    if (totalOrderDetail != null && totalOrderDetail != '') {
      // for (i = 0; i < totalOrderDetail.length - 1; i++) {
      //   for (j = i + 1; j < totalOrderDetail.length; j++) {
      //     if (totalOrderDetail[j].Revenue > totalOrderDetail[i].Revenue) {
      //       let a = totalOrderDetail[j];
      //       totalOrderDetail[j] = totalOrderDetail[i];
      //       totalOrderDetail[i] = a;
      //     }
      //   }
      // }


      totalBill = totalOrderDetail.length;
      return res.status(200).json({
        totalRevenue: TotalRevenue,
        totalProfit: TotalProfit,
        totalBill: totalBill,
        totalOrderDetail
      });
    }
    return res.status(404).json({ message: " Không tìm thấy!!!!" });

  },
  getStatisticalByMonth: async (req, res, next) => {


    let totalOrderDetail = [];
    let Revenue, Profit, Quantity;
    let TotalRevenue = 0, TotalProfit = 0;
    let orderData = await Order.find();
    let totalOriginal = 0;
    let totalBill = 0;
    let j;
    let i = 0;
    let filterday = req.params.month;

    for (i = 0; i < orderData.length; i++) {
      if (orderData[i].status == "Đã giao") {
        let orderDetailData = await OrderDetail.findOne({ orderId: orderData[i]._id });
        let date = orderData[i].created;
        let dated = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();

        if (dated == filterday) {
          let completedDay = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
          Revenue = orderData[i].totalPrice;
          for (j = 0; j < orderDetailData.books.length; j++) {
            totalOriginal += (orderDetailData.books[j].originalPrice * orderDetailData.books[j].qty);
          }
          Profit = Revenue - totalOriginal;
          let orderElement = {
            orderId: orderData[i]._id,
            email: orderData[i].email,
            name: orderData[i].name,
            phone: orderData[i].phone,
            status: orderData[i].status,
            isPaid: orderData[i].isPaid,
            completedDay: completedDay,
            Revenue: Revenue,
            OriginalPrice: totalOriginal,
            Profit: Profit
          }
          TotalRevenue += Revenue;
          TotalProfit += Profit;
          totalOrderDetail.push(orderElement);
          totalOriginal = 0;
          //    totalBill++;
        }
      }
    }

    if (totalOrderDetail != null && totalOrderDetail != '') {
      totalBill = totalOrderDetail.length;
      // for (i = 0; i < totalOrderDetail.length - 1; i++) {
      //   for (j = i + 1; j < totalOrderDetail.length; j++) {
      //     if (totalOrderDetail[i].email == totalOrderDetail[j].email) {
      //       totalOrderDetail[i].Quantity += totalOrderDetail[j].Quantity;
      //       totalOrderDetail[i].Revenue += totalOrderDetail[j].Revenue;
      //       totalOrderDetail[i].Profit += totalOrderDetail[j].Profit;
      //       let index = j;
      //       for (let k = index + 1; k < totalOrderDetail.length; k++) {
      //         totalOrderDetail[k - 1] = totalOrderDetail[k];
      //       }
      //       totalOrderDetail.length--;
      //     }
      //   }
      // }


      // for (i = 0; i < totalOrderDetail.length - 1; i++) {
      //   for (j = i + 1; j < totalOrderDetail.length; j++) {
      //     if (totalOrderDetail[j].Revenue > totalOrderDetail[i].Revenue) {
      //       let a = totalOrderDetail[j];
      //       totalOrderDetail[j] = totalOrderDetail[i];
      //       totalOrderDetail[i] = a;
      //     }
      //   }
      // }


      // totalBill = totalOrderDetail.length;
      return res.status(200).json({
        totalRevenue: TotalRevenue,
        totalProfit: TotalProfit,
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
          let orderStatus = await Order.findById(orderDetailData[i].orderId);
          if (orderStatus != null && orderStatus != '' && orderStatus.status == "Đã giao") {
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

      if (BookArray != null && BookArray != '') {
        return res.status(200).json(BookArray);
      }
      return res.status(404).json({ message: "Không có !!!" });
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
          // let orderStatus = await Order.findById( orderDetailData[i].orderId);
          if (filterOrder != null && filterOrder != '' && filterOrder.status == "Đã giao") {
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

      if (BookArray != null && BookArray != '') {
        return res.status(200).json(BookArray);
      }
      return res.status(404).json({ message: "Không có!!!" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getStatisticalByMonthViewTotal: async (req, res, next) => {


    let totalOrderDetail = [];
    let Revenue, Profit, Quantity;
    let TotalRevenue = 0, TotalProfit = 0;
    let orderData = await Order.find();
    let totalOriginal = 0;
    let totalBill = 0;
    let Bill = 0;
    let j;
    let i = 0;
    let k;
    let filterday = req.params.month;

    for (i = 0; i < orderData.length; i++) {
      if (orderData[i].status == "Đã giao") {
        let orderDetailData = await OrderDetail.findOne({ orderId: orderData[i]._id });
        let date = orderData[i].created;
        let dated = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();

        let completedDay = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
        // let checkDate = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()));
        if (dated == filterday) {
          Revenue = orderData[i].totalPrice;
          for (j = 0; j < orderDetailData.books.length; j++) {
            totalOriginal += (orderDetailData.books[j].originalPrice * orderDetailData.books[j].qty);
          }
          Profit = Revenue - totalOriginal;


          let orderElement = {
            //   orderId: orderData[i]._id,
            //  email: orderData[i].email,
            //  name: orderData[i].name,
            //  phone: orderData[i].phone,
            //   status: orderData[i].status,
            //    isPaid: orderData[i].isPaid,
            Bill: 1,
            completedDay: completedDay,
            Revenue: Revenue,
            OriginalPrice: totalOriginal,
            Profit: Profit
          }
          TotalRevenue += Revenue;
          TotalProfit += Profit;
          totalOrderDetail.push(orderElement);
          totalOriginal = 0;
          totalBill++;
          //   Bill = 0;
        }
      }
    }

    if (totalOrderDetail != null && totalOrderDetail != '') {

      for (i = 0; i < totalOrderDetail.length - 1; i++) {
        for (j = i + 1; j < totalOrderDetail.length; j++) {
          if (totalOrderDetail[i].completedDay == totalOrderDetail[j].completedDay) {
            totalOrderDetail[i].OriginalPrice += totalOrderDetail[j].OriginalPrice;
            totalOrderDetail[i].Revenue += totalOrderDetail[j].Revenue;
            totalOrderDetail[i].Profit += totalOrderDetail[j].Profit;
            totalOrderDetail[i].Bill++;
            let index = j;
            for (k = index + 1; k < totalOrderDetail.length; k++) {
              totalOrderDetail[k - 1] = totalOrderDetail[k];
            }
            totalOrderDetail.length--;
          }
        }
      }

      for (i = 0; i < totalOrderDetail.length - 1; i++) {
        for (j = i + 1; j < totalOrderDetail.length; j++) {
          if (totalOrderDetail[i].completedDay == totalOrderDetail[j].completedDay) {
            totalOrderDetail[i].OriginalPrice += totalOrderDetail[j].OriginalPrice;
            totalOrderDetail[i].Revenue += totalOrderDetail[j].Revenue;
            totalOrderDetail[i].Profit += totalOrderDetail[j].Profit;
            totalOrderDetail[i].Bill += totalOrderDetail[j].Bill;
            let index = j;
            for (k = index + 1; k < totalOrderDetail.length; k++) {
              totalOrderDetail[k - 1] = totalOrderDetail[k];
            }
            totalOrderDetail.length--;
          }
        }
      }

      for (i = 0; i < totalOrderDetail.length - 1; i++) {
        for (j = i + 1; j < totalOrderDetail.length; j++) {
          if (totalOrderDetail[i].completedDay == totalOrderDetail[j].completedDay) {
            totalOrderDetail[i].OriginalPrice += totalOrderDetail[j].OriginalPrice;
            totalOrderDetail[i].Revenue += totalOrderDetail[j].Revenue;
            totalOrderDetail[i].Profit += totalOrderDetail[j].Profit;
            totalOrderDetail[i].Bill += totalOrderDetail[j].Bill;
            let index = j;
            for (k = index + 1; k < totalOrderDetail.length; k++) {
              totalOrderDetail[k - 1] = totalOrderDetail[k];
            }
            totalOrderDetail.length--;
          }
        }
      }




      for (i = 0; i < totalOrderDetail.length - 1; i++) {
        for (j = i + 1; j < totalOrderDetail.length; j++) {
          if (totalOrderDetail[j].Revenue > totalOrderDetail[i].Revenue) {
            let a = totalOrderDetail[j];
            totalOrderDetail[j] = totalOrderDetail[i];
            totalOrderDetail[i] = a;
          }
        }
      }


      //      totalBill = totalOrderDetail.length;
      return res.status(200).json({
        totalRevenue: TotalRevenue,
        totalProfit: TotalProfit,
        totalBill: totalBill,
        totalOrderDetail
      });
    }
    return res.status(404).json({ message: " Không tìm thấy!!!!" });

  },

  getStatisticalByYearViewTotal: async (req, res, next) => {


    let totalOrderDetail = [];
    let Revenue, Profit, Quantity;
    let TotalRevenue = 0, TotalProfit = 0;
    let orderData = await Order.find();
    let totalOriginal = 0;
    let totalBill = 0;
    let Bill = 0;
    let j;
    let i = 0;
    let k;
    let filterday = req.params.year;

    for (i = 0; i < orderData.length; i++) {
      if (orderData[i].status == "Đã giao") {
        let orderDetailData = await OrderDetail.findOne({ orderId: orderData[i]._id });
        let date = orderData[i].created;
        let dated = date.getFullYear();

      //  let completedDay = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
        if (dated == filterday) {
          let completedDay = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
          Revenue = orderData[i].totalPrice;
          for (j = 0; j < orderDetailData.books.length; j++) {
            totalOriginal += (orderDetailData.books[j].originalPrice * orderDetailData.books[j].qty);
          }
          Profit = Revenue - totalOriginal;


          let orderElement = {
            //   orderId: orderData[i]._id,
            //  email: orderData[i].email,
            //  name: orderData[i].name,
            //  phone: orderData[i].phone,
            //   status: orderData[i].status,
            //    isPaid: orderData[i].isPaid,
            Bill: 1,
            completedDay: completedDay,
            Revenue: Revenue,
            OriginalPrice: totalOriginal,
            Profit: Profit
          }
          TotalRevenue += Revenue;
          TotalProfit += Profit;
          totalOrderDetail.push(orderElement);
          totalOriginal = 0;
          totalBill++;
          //   Bill = 0;
        }
      }
    }

    if (totalOrderDetail != null && totalOrderDetail != '') {

      for (i = 0; i < totalOrderDetail.length - 1; i++) {
        for (j = i + 1; j < totalOrderDetail.length; j++) {
          if (totalOrderDetail[i].completedDay == totalOrderDetail[j].completedDay) {
            totalOrderDetail[i].OriginalPrice += totalOrderDetail[j].OriginalPrice;
            totalOrderDetail[i].Revenue += totalOrderDetail[j].Revenue;
            totalOrderDetail[i].Profit += totalOrderDetail[j].Profit;
            totalOrderDetail[i].Bill++;
            let index = j;
            for (k = index + 1; k < totalOrderDetail.length; k++) {
              totalOrderDetail[k - 1] = totalOrderDetail[k];
            }
            totalOrderDetail.length--;
          }
        }
      }

      for (i = 0; i < totalOrderDetail.length - 1; i++) {
        for (j = i + 1; j < totalOrderDetail.length; j++) {
          if (totalOrderDetail[i].completedDay == totalOrderDetail[j].completedDay) {
            totalOrderDetail[i].OriginalPrice += totalOrderDetail[j].OriginalPrice;
            totalOrderDetail[i].Revenue += totalOrderDetail[j].Revenue;
            totalOrderDetail[i].Profit += totalOrderDetail[j].Profit;
            totalOrderDetail[i].Bill += totalOrderDetail[j].Bill;
            let index = j;
            for (k = index + 1; k < totalOrderDetail.length; k++) {
              totalOrderDetail[k - 1] = totalOrderDetail[k];
            }
            totalOrderDetail.length--;
          }
        }
      }

      for (i = 0; i < totalOrderDetail.length - 1; i++) {
        for (j = i + 1; j < totalOrderDetail.length; j++) {
          if (totalOrderDetail[i].completedDay == totalOrderDetail[j].completedDay) {
            totalOrderDetail[i].OriginalPrice += totalOrderDetail[j].OriginalPrice;
            totalOrderDetail[i].Revenue += totalOrderDetail[j].Revenue;
            totalOrderDetail[i].Profit += totalOrderDetail[j].Profit;
            totalOrderDetail[i].Bill += totalOrderDetail[j].Bill;
            let index = j;
            for (k = index + 1; k < totalOrderDetail.length; k++) {
              totalOrderDetail[k - 1] = totalOrderDetail[k];
            }
            totalOrderDetail.length--;
          }
        }
      }




      for (i = 0; i < totalOrderDetail.length - 1; i++) {
        for (j = i + 1; j < totalOrderDetail.length; j++) {
          if (totalOrderDetail[j].Revenue > totalOrderDetail[i].Revenue) {
            let a = totalOrderDetail[j];
            totalOrderDetail[j] = totalOrderDetail[i];
            totalOrderDetail[i] = a;
          }
        }
      }


      //      totalBill = totalOrderDetail.length;
      return res.status(200).json({
        totalRevenue: TotalRevenue,
        totalProfit: TotalProfit,
        totalBill: totalBill,
        totalOrderDetail
      });
    }
    return res.status(404).json({ message: " Không tìm thấy!!!!" });

  },
}