const User = require('../models/user');
const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Book = require('../models/book');
const { equal } = require('assert');
const { exists, findOne, findById } = require('../models/user');
const user = require('../models/user');
const cloudinary = require('cloudinary');
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
  postRegisterUserCustomer: (req, res, next) => {
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
      // req.flash('errors', validationErrors);
      //  return res.redirect('/dashboard/customers/login');
      return res.status(500).json({ message: validationErrors });
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

    User.findOne({ email: req.body.email }, (err, existUser) => {
      if (err) {
        return next(err);

      }
      if (existUser) {
        return res.status(500).json({
          message: `Email ${existUser.email} đã tồn tại.`
        })
        //  return res.redirect('/dashboard/customers/register');
        //   return res.status(400).json( {message  : "Bị lỗi rồi"});
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

    const token = encodedToken(req.body.email);
    const data = req.user;
    const user = {
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      role: data.role
    };
    res.setHeader('Authorization', token);
    //  res.cookie('Authorization', token);
    return res.status(200).json(data);

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

          userdata.save();
          return res.status(200).json(userdata);
        } else {
          userdata.phone = req.body.phone;
          userdata.name = req.body.name;
          userdata.gender = req.body.gender;
          userdata.birthday = req.body.birthday;
          userdata.address = req.body.address;

          userdata.save();
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
    });

    order.save(function (err, result) {
      if (err) {
        res.status(500).json({
          error: err
        });
      } else {
        res.status(201).json({
          message: 'Successfully bought book!',
          result
        });
      }
    });

    // Create OrderDetail
    try {
      // Luu order._id vao bang orderDetail va san pham da dc order
      const books = req.body.books;
      let orderId;
      if (order) {
        orderId = order._id;
      } else {
        return res.json({ message: "Error when create order!" });
      }
      const newOrderDetail = {
        orderId: orderId,
        books: books,
      };
      OrderDetail.create(newOrderDetail);
    } catch {
      res.status(500).json({
        message: ' Error when create order Detail!'
      })
    }

  },
  // Get All Order 
  getAllOrder: async (req, res, next) => {
    try {
      const orderdata = await OrderDetail.find().populate('orderId');
      if(orderdata) {
        return res.status(200).json(orderdata);
      } 
      return res.status(404).json({message : "Không tìm thấy!!!"})
    } catch (error) {
      return res.status(500).json(error);
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

}