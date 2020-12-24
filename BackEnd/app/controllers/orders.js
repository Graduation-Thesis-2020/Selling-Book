const Order = require('../models/order');
const Cart = require('../models/cart1');
const OrderDetail = require('../models/orderDetail');
const books = require('./books');
const Book = require('../models/book');
const book = require('../models/book');
module.exports = {
  // Get Orders 
  getOrder: (req, res, next) => {
    Order.find()
      .exec()
      .then(docs => {
        if (docs.length >= 0) {
          res.status(200).json(docs);
        } else {
          res.status(404).json({
            message: "No Entries Found"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  },



  // Delete Order
  deleteOrder: (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Order deleted"
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  },

  // Get order by orderID
  getOrderID: (req, res, next) => {
    Order.findById(req.params.orderId)
      .populate('book')
      .exec()
      .then(order => {
        if (!order) {
          return res.status(404).json({
            message: "Order not found"
          });
        }
        res.status(200).json(order);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });

  },

  // Checkout and Create Order
  createOrder: (req, res, next) => {

    const userInfo = req.user;
    const order = new Order({
      userId: userInfo._id,
      email: userInfo.email,
      totalPrice: req.body.totalPrice,
      phone: userInfo.phone,
      address: userInfo.address,
      name: userInfo.name,
    });


    // Create Order
    try {
      order.save();

      // Luu order._id vao bang orderDetail va san pham da dc order
      const books = req.body.books;
      let orderId;
      if (order) {
        orderId = order._id;
      } else {
        return res.json({ message: "Error when create order!" });
      }
      const newOrderDetail = new orderDetail({
        orderId: orderId,
        books: books,
      });
      // OrderDetail.create(newOrderDetail);
      newOrderDetail.save();

      order.orderDetailId = newOrderDetail._id;

      return res.status(201).json({
        message: 'Successfully bought book!',
        order
      });

    } catch {
      res.status(500).json({
        message: ' Error when create order !'
      })
    }

  },

  // Xem Detail Oder by orderId
  getOrderDetailByOrderID: (req, res, next) => {
    //  const orderId = req.params.orderId;
    // // const orderData = Order.findOne({ _id: orderId });
    //  const orderDetailData = OrderDetail.findOne({ orderId: orderId });

    //  const booksData = orderDetailData.orderId;

    // const orderOfUserData = [];

    // booksData.map((book) => {
    //     const bookData = Book.findOne({
    //         _id: book.bookId,
    //     });
    //     const newObj = {
    //         bookName: book.title,
    //         quantity: book.qty,
    //         price: book.price,
    //     };
    //     return orderOfUserData.push(newObj);
    // })
    // return res.status(200).json({
    //     order_Id: orderData._id,
    //     deliverStatus: orderData.deliverStatus,
    //     totalPrice: orderData.totalPrice,
    //     created: orderData.created,
    //     name: orderData.name,
    //     phone: orderData.phone,
    //     address: orderData.address,
    //     orderOfUserData,
    // });

    const orderId = req.params.orderId;
    const orderOfUserData = [];
    OrderDetail.findOne({ orderId: orderId }, function (err, result) {
      if (!result) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json(result);

    });

  },

  // Xem all Detail Oder 
  getOrderDetails: (req, res, next) => {
    OrderDetail.find()
      .exec()
      .then(docs => {
        if (docs.length >= 0) {
          res.status(200).json(docs);
        } else {
          res.status(404).json({
            message: "No Entries Found"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  },
  // Delete Order
  deleteOrderDetail: (req, res, next) => {
    OrderDetail.remove({ orderId: req.params.orderId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Order deleted"
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  },

  updateOrder: async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
      const orderdata = await Order.findById(orderId);
      orderdata.status = req.body.status;
      orderdata.isPaid = req.body.isPaid ;
      orderdata.save();
      return res.status(200).json(orderdata);
    } catch (error) {
      return res.status(500).json(error);
    }

  },

  orderByDay: async (req, res, next) => {
    // let searchOptions = {}
    // if (req.query.created != null && req.query.created !== '') {
    //   searchOptions.created = new RegExp(req.query.created, 'i')
    // }
    // try {
    //   const orderdata = await Order.find(searchOptions);
    //   if (orderdata != null && orderdata != '') {
    //     return res.status(200).json(orderdata);
    //   }
    //   return res.status(400).json({ message: "Không tìm thấy !!!" });
    // } catch (error) {
    //   return res.status(500).json(error);
    // }
     let filteredData = [];
     let orderdata = await Order.find();
     let orderlength = orderdata.length;
    //return res.status(200).json(orderlength);
    let i = 0;
    let filterday = req.params.day ;
    //return res.status(200).json(req.body.day);
    for (i = 0; i < orderlength; i++) {
      let date = orderdata[i].created;
      let orderFilter = orderdata[i] ;
      let dated =  ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' +((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' +  date.getFullYear();

      //Filter dates from 2011 and newer
      if (dated == filterday){
        filteredData.push(orderFilter);
      }
    }
    
    if (filteredData != null && filteredData != '') {
      return res.status(200).json(filteredData);
    }
    return res.status(404).json({message:" Không tìm thấy!!!!"});


  }

}