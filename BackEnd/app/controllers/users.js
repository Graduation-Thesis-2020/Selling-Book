
const User = require('../models/user');
const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');
const Review = require('../models/review');
const CommentChild = require('../models/commentChild');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Book = require('../models/book');
const { equal } = require('assert');
const { exists, findOne, findById } = require('../models/user');
const user = require('../models/user');
const cloudinary = require('cloudinary');
const order = require('../models/order');
const orderDetail = require('../models/orderDetail');
//const nodemailer = require('nodemailer');
const { verifyEmail, mailVefiryNotification, generalRandomCode, forgetPassWord, notificationCreateOrder } = require('../middleware/midemail');


// TEST THANH TOÁN PAYPAL
const paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.CLIENT_ID_PAYPAL,
  'client_secret': process.env.CLIENT_SECRET_PAYPAL
});


const verifyToken = (token) => {
  const decode = jwt.verify(token, process.env.JWT_KEY);
  return { decode };
};
const encodedToken = (email) => {
  return jwt.sign({
    iss: 'Lu Phuong',
    sub: email,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, process.env.JWT_KEY);
}
module.exports = {

  getPaypal: (req, res, next) => {
    res.render('index.handlebars');
  },
  postPaypal: (req, res, next) => {

    const userInfo = req.user;

    const books = req.body.books;

    const create_payment_json = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": "http://localhost:4200/setting/order",
        "cancel_url": "http://localhost:8080/users/orders/pay/cancel"
      },
      "transactions": [{
        "item_list": {
          "items": [{
            "name": "The God Father 2020",
            "sku": "001",
            "price": "1000",
            "currency": "USD",
            "quantity": 1
          }, {
            "name": "The Alchemist",
            "sku": "002",
            "price": "1000",
            "currency": "USD",
            "quantity": 1
          }]
        },
        "amount": {
          "currency": "USD",
          "total": "2000"
        },
        "description": "Hat for the best team ever"
      }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });

  },

  getPaypalSuccess: (req, res, next) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": "2000"
        }
      }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        //   console.log(JSON.stringify(payment));
        res.render('success.handlebars');
      }
    });
  },

  getPaypalCancel: (req, res, next) => {
    res.render('cancel.handlebars');
  },



  authFacebook: (req, res, next) => {
    try {
      const checkUser = req.user;
      if (checkUser != null && checkUser != '') {
        const token = encodedToken(req.user.email);
        const data = req.user;
        const user = {
          name: data.displayName,
          email: data.emails[0].value
        };
        res.setHeader('Authorization', token);
        return res.status(200).json({
          message: " Đăng nhập thành công!!!",
          user
        })
      }
    } catch (error) {
      return res.status(500).json(error);
    }

  },

  authGoogle: (req, res, next) => {
    try {
      const checkUser = req.user;
      if (checkUser != null && checkUser != '') {
        const token = encodedToken(req.user.email);
        const data = req.user;
        const user = {
          name: data.displayName,
          email: data.emails[0].value
        };
        res.setHeader('Authorization', token);
        return res.status(200).json({
          message: " Đăng nhập thành công!!!",
          user
        })
      }
    } catch (error) {
      return res.status(500).json(error);
    }

  },

  logout: (req, res, next) => {
    res.setHeader('Authorization', '', { maxAge: 1 });
    req.user = null;
    return res.status(200).json({ message: " Đăng xuất thành công!!!" });
    // return res.redirect('/users/login');
  },
  // TEST SECRET 
  secret: (req, res, next) => {
    return res.status(200).json({
      message: " That's great!!!"
    })
  },
  // ĐĂNG KÝ TÀI KHOẢN CUSTOMER
  postRegisterUserCustomer: async (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email)) {
      validationErrors.push({ message: 'Nhập lại email' });
    }
    if (!validator.isLength(req.body.password, { min: 8 })) {
      validationErrors.push({ message: 'Mật khẩu phải có ít nhất 8 ký tự' });
    }
    if (!validator.isMobilePhone(req.body.phone)) {
      validationErrors.push({ message: 'Số điện thoại là số' });
    }
    if (req.body.password !== req.body.confirmPassword) {
      validationErrors.push({ message: 'Mật khẩu không chính xác' });
    }
    if (validationErrors.length) {
      return res.status(400).json(validationErrors[0]);
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });



    const user = new User({

      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      name: req.body.name,
      gender: req.body.gender,
      birthday: req.body.birthday,
      address: req.body.address,
      role: 0,
    });

    User.findOne({ email: req.body.email }, async (err, existUser) => {
      if (err) {
        return next(err);

      }
      if (existUser) {
        return res.status(400).json({
          message: `Email ${existUser.email} đã tồn tại.`
        })
        //  return res.redirect('/dashboard/customers/register');
        //   return res.status(400).json( {message  : "Bị lỗi rồi"});
      }

      // KIỂM TRA PHONE CÓ TỒN TẠI HAY CHƯA
      const checkPhone = await User.findOne({ phone: req.body.phone });
      if (checkPhone) {
        return res.status(400).json({
          message: `Phone ${checkPhone.phone} đã tồn tại.`
        })
      }

      const createUser = User.create(user);
      // generate the Token 
      const token = encodedToken(user.email);
      res.setHeader('Authorization', token);
      if (createUser) {
        //  req.flash('success', { message: `Khách hàng ${createUser.profile.name} đã được tạo thành công!` })
        //  return res.status(400).json( { message: `Khách hàng ${createUser.profile.name} đã được tạo thành công!`});
        // res.redirect('/customer/login');
        //  return res.status(201).json( { message: "Khách hàng đã được tạo thành công!" });
        verifyEmail(user.email)
        return res.status(200).json({
          message: `Khách hàng ${user.name}  đã được tạo thành công. `
        })
      } else {
        res.send('error');
      }
    });




  },


  // hiện tất cả tài khoản khách hàng
  getAllUserCustomer: (req, res, next) => {
    User.find({ role: 0 })
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

  // ĐĂNG NHÂP TÀI KHOẢN KHÁCH HÀNG
  postLoginUserCustomer: async (req, res, next) => {

    if (req.user.status != "Khóa") {
      const token = encodedToken(req.body.email);
      const data = req.user;
      res.setHeader('Authorization', token);
      // console.log(token);
      //res.cookie('Authorization', token);
      return res.status(200).json(data);
    }
    return res.status(400).json({ message: "Tài khoản của bạn đã bị khóa!!!" });

    // const { email, password } = req.body;
    // const checkEmail = await User.findOne({ email });
    // if (checkEmail) {
    //   const isMatch = await checkEmail.isValiPassWord(password);

    //   if (isMatch) {
    //     const token = encodedToken(checkEmail.email);
    //     res.setHeader('Authorization', token);
    //     const data = {
    //       email: checkEmail.email,
    //       name: checkEmail.name,
    //       address: checkEmail.address,
    //       phone: checkEmail.phone,
    //     }
    //     return res.status(200).json({
    //       message: "Đăng nhập thành công!!!",
    //       //  token: token,
    //       user: data,
    //     })
    //   }
    //   return res.status(404).json({
    //     message: 'Mật khẩu không đúng, vui lòng thử lại!!!!'
    //   })


    // } else {
    //   return res.status(404).json({
    //     message: "Email chưa đăng ký , vui lòng đăng ký!!!!"
    //   })
    // }
  },



  // Cập nhật Porfile của Customer
  postUpdateUserCustomer: async (req, res, next) => {
    const userId = req.user._id;
    User.findById(userId, async (err, userdata) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        if (req.file) {
          try {
            if (userdata.imageUrl != null && userdata.imageId != null) {
              await cloudinary.v2.uploader.destroy(userdata.imageId);
            }
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            userdata.imageId = result.public_id;
            userdata.imageUrl = result.secure_url;
          } catch (err) {
            return res.status(500).json({
              error: err
            });
          }
          userdata.phone = req.body.phone;
          userdata.name = req.body.name;
          userdata.gender = req.body.gender;
          userdata.birthday = req.body.birthday;
          userdata.address = req.body.address;

          await userdata.save();
          return res.status(200).json(userdata);
        } else {
          userdata.phone = req.body.phone;
          userdata.name = req.body.name;
          userdata.gender = req.body.gender;
          userdata.birthday = req.body.birthday;
          userdata.address = req.body.address;

          await userdata.save();
          return res.status(200).json(userdata);
        }
      }
    });

  },

  // See Profile Customer 
  getProfileCustomer: async (req, res, next) => {
    try {
      const userId = req.user._id;
      const userdata = await User.findById(userId);
      if (userdata) {
        return res.status(200).json(userdata);
      }
      return res.status(404).json({ message: " Không tìm thấy!!!" });
    } catch (error) {
      return res.status(500).json(error);
    }

  },

  // Create A order of Customer 
  createAOrder: async (req, res, next) => {
    const userInfo = req.user;
    const order = new Order({
      userId: userInfo._id,
      email: userInfo.email,
      totalPrice: req.body.totalPrice,
      phone: userInfo.phone,
      address: userInfo.address,
      name: userInfo.name,
      isPaid: req.body.isPaid
    });


    // Create Order
    try {
      await order.save();

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
      await newOrderDetail.save();

      order.orderDetailId = newOrderDetail._id;
      await order.save();
      notificationCreateOrder(userInfo.email, userInfo.name, order)
      let i;
      for (i = 0; i < newOrderDetail.books.length; i++) {
        let bookdata = newOrderDetail.books[i];
        let findedBook = await Book.findById(bookdata.bookId);
        findedBook.availableQuantity -= bookdata.qty;
        await findedBook.save();
      }
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
  // Get All Order 
  getAllOrder: async (req, res, next) => {
    const userId = req.user._id;
    try {
      const orderdata = await Order.find({ userId: userId });
      if (orderdata != null && orderdata != '') {
        return res.status(200).json(orderdata);
      }
      return res.status(404).json({ message: "Không tìm thấy!!!" })
    } catch (error) {
      return res.status(500).json(error);
    }

  },
  // Get Only Order 
  getAOrder: async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
      const orderdata = await Order.findOne({ _id: orderId });
      if (orderdata != null && orderdata != '') {
        return res.status(200).json(orderdata);
      }
      return res.status(404).json({ message: "Không tìm thấy!!!" })
    } catch (error) {
      return res.status(500).json({ message: " Thao tác thất bại!!! " });
    }
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
  deleteOrder: async (req, res, next) => {
    const userId = req.user;
    const orderId = req.params.orderId;
    try {

      const orderdata = await Order.findById(orderId);
      const orderdetaildata = await OrderDetail.findOne({ orderId: orderId });

      if (orderdata != null && orderdetaildata != null) {
        await orderdata.remove();
        await orderdata.save();
        await orderdetaildata.remove();
        await orderdetaildata.save();
        return res.status(200).json({ message: "Xóa thành công!!!" })
      }
    } catch (error) {
      return res.status(500).json({ message: "Thao tác thất bại!!!" });
    }

  },

  postCreateAComment: async (req, res, next) => {
    const bookId = req.params.bookId;

    try {
      const bookdata = await Book.findById(bookId);
      const review = new Review({
        userId: req.user._id,
        review: req.body.review,
        comment: req.body.comment,
        bookId: bookId,
      });
      await review.save();
      bookdata.reviews.push(review);
      await bookdata.save();

      return res.status(201).json(review);

    } catch (error) {
      return res.status(500).json(error);
    }

  },
  postCreateCommentInComment: async (req, res, next) => {
    let bookId = req.params.bookId;
    let commentId = req.params.commentId;
    try {
      let commentdata = await Review.findById(commentId);
      if (commentdata != null && commentdata != '') {
        const commentChild = new CommentChild({
          userId: req.user._id,
          comment: req.body.comment,
          bookId: bookId
        });
        await commentChild.save();
        commentdata.commentChilds.push(commentChild);
        await commentdata.save();

        return res.status(201).json({ message: "Thành công!!!" });
      }
      return res.status(401).json({ message: "Lỗi rồi!!!" });
    } catch (error) {
      return res.status(500).json(error);
    }

  },

  updateOrder: async (req, res, next) => {
    let orderId = req.params.orderId;
    try {
      let orderdata = await Order.findById(orderId);
      let orderDetailData = await OrderDetail.findOne({ orderId: orderId });
      let i;
      for (i = 0; i < orderDetailData.books.length; i++) {
        let bookdata = orderDetailData.books[i];
        let findedBook = await Book.findById(bookdata.bookId);
        findedBook.availableQuantity += bookdata.qty;
        await findedBook.save();
      }
      orderdata.status = req.body.status;
      await orderdata.save();
      return res.status(200).json(orderdata);
    } catch (error) {
      return res.status(500).json(error);
    }

  },
  // Get ALL ORDER DETAIL
  getAllOrderDetails: async (req, res, next) => {
    const userId = req.user._id;
    try {
      const orderdata = await Order.find({ userId: userId });

      if (orderdata != null && orderdata != '') {
        let orderlength = orderdata.length;
        let orderdetailArray = [];
        let i;
        for (i = 0; i < orderlength; i++) {
          let orderdetail = await OrderDetail.findOne({ orderId: orderdata[i]._id });
          orderdetailArray.push(orderdetail);
        }
        return res.status(200).json(orderdetailArray);
      }
      return res.status(404).json({ message: "Không tìm thấy!!!" })
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Get A ORDER DETAIL
  getAOrderDetails: async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
      const orderdata = await OrderDetail.findOne({ orderId: orderId });
      if (orderdata != null && orderdata != '') {
        return res.status(200).json(orderdata);
      }
      return res.status(404).json({ message: "Không tìm thấy!!!" })
    } catch (error) {
      return res.status(500).json({ message: " Thao tác thất bại!!! " });
    }
  },

  patchNotification: async (req, res, next) => {
    let userId = req.user._id;
    try {
      let userData = await User.findById(userId);
      if (userData.notification == true) {
        return res.status(200).json({ message: "Đã đăng ký rồi!!!" });
      }
      userData.notification = true;
      await userData.save();
      mailVefiryNotification(req.user.email);
      return res.status(200).json(userData);
    } catch (error) {
      return res.status(500).json(error);
    }

  },

  postForgetPassWord: async (req, res, next) => {
    let email = req.body.email;
    try {
      let checkEmail = await User.findOne({ email: email });
      if (checkEmail != null && checkEmail != '') {
        let codeVerify = generalRandomCode(8);
        forgetPassWord(email, checkEmail.name, codeVerify);
        checkEmail.codeResetPassword = codeVerify;
        await checkEmail.save();
        return res.status(200).json({ message: "Vui lòng kiểm tra Email" });
      }
      return res.status(404).json({ message: "Email chưa được đăng ký, vui lòng đăng ký tài khoản!!!" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  patchForgetPassWord: async (req, res, next) => {
    let code = req.body.codeResetPassword;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let checkEmail = await User.findOne({ codeResetPassword: code });
    if (checkEmail != null && checkEmail != '') {
      if (password === confirmPassword) {
        checkEmail.password = password;
        checkEmail.codeResetPassword = null;
        await checkEmail.save();
      } else {
        return res.status(400).json({ message: "Sai mật khẩu!!!" })
      }
      return res.status(200).json({ message: "Đổi mật khẩu thành công!!!" });
    } else {
      return res.status(400).json({ message: "Mã sai rồi !!!" });
    }
  },

  postLikeForComment: async (req, res, next) => {
    let commentId = req.params.commentId;
    let userId = req.user._id;
    try {
      let commentData = await Review.findById(commentId);
      //return res.status(200).json(commentData.likes);
      let commentLike = commentData.likes;
      let commentLikeLength = 0, i;
      if (commentLike != null && commentLike != '') {
        commentLikeLength = commentLike.length;
        for (i = 0; i < commentLikeLength; i++) {
          if (userId.toString() == commentLike[i]) {
            commentData.likes.remove(commentLike[i]);
            await commentData.save();
            break;
          }
        }
        if (i == commentLikeLength) {
          // if (userId.toString() !== commentLike[i]) {
          commentData.likes.push(userId);
          await commentData.save();
          //}
        }
        return res.status(200).json(commentData.likes.length);
      }
      else {
        commentData.likes.push(userId);
        await commentData.save();
        return res.status(200).json(commentData.likes.length);
      }
    } catch (error) {
      return res.status(500).json(error);
    }

  },
  postLikeForCommentChild: async (req, res, next) => {
    let commentChildId = req.params.commentchildId;
    let userId = req.user._id;
    try {
      let commentChildData = await CommentChild.findById(commentChildId);
      let commentLike = commentChildData.likes;
      let commentLikeLength = 0, i;
      if (commentLike != null && commentLike != '') {
        commentLikeLength = commentLike.length;
        for (i = 0; i < commentLikeLength; i++) {
          if (userId.toString() == commentLike[i]) {
            commentChildData.likes.remove(userId);
            await commentChildData.save();
            break;
          }
        }
        if (i == commentLikeLength) {
          commentChildData.likes.push(userId);
          await commentChildData.save();
        }
        return res.status(200).json(commentChildData.likes.length);
      } else {
        commentChildData.likes.push(userId);
        await commentChildData.save();
        return res.status(200).json(commentChildData.likes.length);
      }
    } catch (error) {
      return res.status(500).json(error);
    }

  }

  // verifyEmail: async (req, res, next) => {
  //   const email = req.body.email;
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: process.env.EMAIL,
  //       pass: process.env.PASSWORDEMAIL
  //     }
  //   });

  //   let mailOptions = {
  //     from: 'luhuonglan1998@gmail.com', 
  //     to: `${email}`, 
  //     subject: "Thông tin đăng ký tài khoản tại The Book Store ✔", 
  //     html: "<p style='font-size:25px'><b style='color:black'>Chào mừng đến với The Book Store</b></p>"
  //     +"</br>"
  //     + "<p style='color:black' >Cảm ơn Anh/chị đã đăng ký tài khoản tại cửa hàng của chúng tôi.</p>"
  //   //  +"<p style='color:black'>Địa chỉ email đã dùng để đăng ký tài khoản: email </p>" 
  //     +"<p style='color:black'>Anh/chị vui lòng truy cập vào tài khoản theo địa chỉ http://localhost:4200/setting để thực hiện đặt hàng và quản lý giao dịch nhanh chóng thuận tiện hơn.</p>"
  //     +"<p style='color:black'>Truy cập vào cửa hàng để tiếp tục mua sắm với chúng tôi</p>"
  //     +"<div><span style='padding:14px 35px;background:#357ebd'><a href='http://localhost:4200/home' style='font-size:16px' style='text-decoration:none' style='color:#fff' target='_blank' data-saferedirecturl='http://localhost:4200/home'> <b style='color:#fff'>Đến cửa hàng của chúng tôi</b> </a></span></div>"
  //     + "<p style='color:black'><p style='text-align: right'>Nếu Anh/chị có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại luhuonglan1998@gmail.com</p></p>"
  //     +"<p style='color:black'><p style='text-align: right'><i>Trân trọng,</i></p></p>"
  //     +"<p style='color:black'><p style='text-align: right'><b>Ban quản trị cửa hàng The Book Store</b></p></p>",

  //   };
  //   transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //      // console.log(error);
  //       return res.status(500).json(error);
  //     } else {
  //     //  console.log("Email sent: ", info.response);
  //       return res.status(200).json({ Email_sent: info.response});
  //     }
  //   })
  // }
}