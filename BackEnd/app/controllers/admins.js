const User = require('../models/user');
const Order = require('../models/order');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { verifyEmailAdmin } = require('../middleware/midemail');

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
  postRegisterEmployee: async (req, res, next) => {
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
      role: 2,
    });
    // KIỂM TRA EMAIL ĐÃ TỒN TẠI HAY CHƯA
    User.findOne({ email: req.body.email }, async (err, existUser) => {
      if (err) {
        return next(err);
      }
      if (existUser) {
        return res.status(400).json({
          message: `Email ${existUser.email} đã tồn tại.`
        })

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
        verifyEmailAdmin(user.email)
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
    const userId = req.params.userId;
    User.remove({ _id: userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Account deleted"
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
      let customerArray = [];
      if (users != null && users != '') {
        const userlength = users.length;
        let i;
        for (i = 0; i < userlength; i++) {
          if (users[i].role == 0) {
            customerArray.push(users[i]);
          }
        }
      }

      if (customerArray != null && customerArray != '') {
        return res.status(200).json(customerArray);
      }
      return res.status(404).json({ message: " Không tìm thấy!!" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getAllCustomer: async (req, res, next) => {
    try {
      const customerData = await User.find({ role: 0 });
      if (customerData != null && customerData != '') {
        return res.status(200).json(customerData);
      }
      return res.status(400).json({ message: "Không tìm thấy!!!" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getACustomer: async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const userData = await User.findById(userId);
      return res.status(200).json(userData);
    } catch (error) {
      return res.status(500).json(error);
    }

  },

  getAllEmployee: async (req, res, next) => {
    try {
      const employList = await User.find({ role: 2 });
      if (employList != null && employList != '') {
        return res.status(200).json(employList);
      }
      return res.status(404).json({ message: "Không có dữ liệu!!!" });
    } catch (error) {
      return res.status(500).json(error);
    }

  },
  getAllAdmin: async (req, res, next) => {
    try {
      const employList = await User.find({ role: 1 });
      if (employList != null && employList != '') {
        return res.status(200).json(employList);
      }
      return res.status(404).json({ message: "Không có dữ liệu!!!" });
    } catch (error) {
      return res.status(500).json(error);
    }

  },

  getAEmployee: async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const userData = await User.findById(userId);
      return res.status(200).json(userData);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getSearchEmployee: async (req, res, next) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try {
      const users = await User.find(searchOptions);
      let customerArray = [];
      if (users != null && users != '') {
        const userlength = users.length;
        let i;
        for (i = 0; i < userlength; i++) {
          if (users[i].role == 2) {
            customerArray.push(users[i]);
          }
        }
      }

      if (customerArray != null && customerArray != '') {
        return res.status(200).json(customerArray);
      }
      return res.status(404).json({ message: " Không tìm thấy!!" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  patchCreateAdminRole1: async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const admin = await User.findById(userId);
      if (admin != null && admin != '') {
        admin.role = req.body.role;
        admin.save();
        return res.status(201).json(admin);
      }
      return res.status(400).json({ message: "Cập nhật bị lỗi!!!" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  patchUpdateUser: async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const userData = await User.findById(userId);
      userData.phone = req.body.phone;
      userData.name = req.body.name;
      userData.gender = req.body.gender;
      userData.birthday = req.body.birthday;
      userData.address = req.body.address;

      userData.save();
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
        checkEmail.save();
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
        checkEmail.save();
      } else {
        return res.status(400).json({ message: "Sai mật khẩu!!!" })
      }
      return res.status(200).json({ message: "Đổi mật khẩu thành công!!!" });
    } else {
      return res.status(400).json({ message: "Mã sai rồi !!!" });
    }
  },

  patchLockAccount: async (req, res, next) => {
    let customerId = req.params.userId;

    try {
      let userData = await User.findById(customerId);
      userData.status = req.body.status;
      userData.save();
      return res.status(200).json({ message: "Khóa thành công!!!" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  


}