const User = require('../models/user');
const jwt = require('jsonwebtoken');
const validator = require('validator');


const verifyToken = (token) => {
  const decode = jwt.verify(token, process.env.JWT_KEY);
  return { decode };
};
const encodedToken = (email) => {
  return jwt.sign({
    iss: 'Lu Phuong',
    sub: email,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 3)
  }, process.env.JWT_KEY);
}

module.exports = {


  // TEST SECRET 
  secret: (req, res, next) => {
    
    return res.status(200).json({
      message: " Vô được rồi!!!"
    })
    
  },

  // ĐĂNG XUẤT TÀI KHOẢN 
  logout: (req, res, next) => {
    res.setHeader('Authorization', '', { maxAge: 1 });
    req.user = null;
    return res.status(200).json({ message: " Đăng xuất thành công!!!" });
    // return res.redirect('/users/login');
  },


  // ĐĂNG KÝ TÀI KHOẢN Employee
  postRegisterEmployee: (req, res, next) => {
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
      role: 2,
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
          message: `Tài khoản ${user.name}  đã được tạo thành công. `
        })
      } else {
        res.send('error');
      }
    });
  },


  // hiện tất cả tài khoản 
  getAllUser: (req, res, next) => {
    User.find()
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

  // ĐĂNG NHÂP TÀI KHOẢN Admin or Employee 
  postLogin: async (req, res, next) => {

    const { email, password } = req.body;

    const checkEmail = await User.findOne({ email });


    if (checkEmail) {
      if (checkEmail.role == 0) {
        return res.status(401).json({
          message: "Bạn không đủ quyền! "
        })
      }
      const isMatch = await checkEmail.isValiPassWord(password);

      if (isMatch) {
        const token = encodedToken(checkEmail.email);
        res.setHeader('Authorization', token);
        const data = {
          email: checkEmail.email,
          name: checkEmail.name,
          address: checkEmail.address,
          phone: checkEmail.phone,
          role: checkEmail.role
        }
        return res.status(200).json(data)
      }
      return res.status(404).json({
        message: 'Mật khẩu không đúng, vui lòng thử lại!!!!'
      })


    } else {
      return res.status(404).json({
        message: "Email chưa đăng ký , vui lòng đăng ký!!!!"
      })
    }
  },

  // Delete Customer 
  deleteCustomer: (req, res, next) => {
    if (req.user.role == 0) {
      return res.status(401).json({
        message: "Bạn không đủ quyền! "
      })
    }
    const customerId = req.params.customerId;
    User.remove({ _id: customerId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Customer deleted"
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  },

  // // Xem all Detail Oder 
  // getOrderDetails: (req, res, next) => {
  //   OrderDetail.find()
  //     .exec()
  //     .then(docs => {
  //       if (docs.length >= 0) {
  //         res.status(200).json(docs);
  //       } else {
  //         res.status(404).json({
  //           message: "No Entries Found"
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       res.status(500).json({
  //         error: err
  //       });
  //     });
  // },
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

  getSearchCustomer: async (req, res, next) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try {
      const users = await User.find(searchOptions);
      if (users != null && users != '') {
        return res.status(200).json(users);
      }
      return res.status(404).json({message: " Không tìm thấy!!"});
    } catch (error) {
      return res.status(500).json(error);
    }
  }

}