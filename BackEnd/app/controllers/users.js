const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Book = require('../models/book');
const { equal } = require('assert');
const { exists } = require('../models/user');
const user = require('../models/user');

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
    // Get User 
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
            req.flash('errors', validationErrors);
            //  return res.redirect('/dashboard/customers/login');
            return res.status(500).json({ message: "Bị lỗi rồi" });
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
                //   req.flash('errors', { msg: `Email ${existUser.email} đã tồn tại.` });
                return res.status(500).json({
                    message: `Email ${existUser.email} đã tồn tại.`
                })
                //  return res.redirect('/dashboard/customers/register');
                //   return res.status(400).json( {message  : "Bị lỗi rồi"});
            }

            const createUser = User.create(user);

            // generate the Token 
            //  const token = encodedToken(user.email);
            if (createUser) {
                //  req.flash('success', { message: `Khách hàng ${createUser.profile.name} đã được tạo thành công!` })
                //  return res.status(400).json( { message: `Khách hàng ${createUser.profile.name} đã được tạo thành công!`});
                // res.redirect('/customer/login');
                //  return res.status(201).json( { message: "Khách hàng đã được tạo thành công!" });
                return res.status(200).json({
                    message: `Khách hàng ${user.name}  đã được tạo thành công. Token: `
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

    // Đăng nhập tài khoản
    postLoginUserCustomer: async (req, res, next) => {
   //      const  email  = req.body;
        // const password = req.body.password;
        const { email, password } = req.body;
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            const isMatch = await checkEmail.isValiPassWord(password);

            if (isMatch) {
                const  userToken  = encodedToken(checkEmail.email);
                const data = {
                    email: checkEmail.email,
                    name: checkEmail.name,
                    address: checkEmail.address,
                    phone: checkEmail.phone,
                }
                return res.status(200).json({
                    message: "Đăng nhập thành công!!!",
                    token: userToken,
                    user: data,
                })
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

    // Đăng ký tài khoản 
    registerUser: (req, res, next) => {

        const order = new Order({
            email: req.body.email,
            totalPrice: req.body.totalPrice,
            phone: req.body.phone,
            address: req.body.address,
            name: req.body.name,
        });
        const books = req.body.books;
        let userId;
        let arrayBook = [];
        order.save(function (err, result) {
            if (err) {
                res.status(500).json({
                    error: err
                });
            } else {
                //   req.session.cart = null;
                res.status(200).json({
                    // totalPrice: totalPrice,
                    // totalQty: totalQty,
                    message: 'Successfully bought book!'
                });
            }
        });


        // Luu order._id vao bang orderDetail va san pham da dc order
        let orderId;
        if (order) {
            orderId = order._id;
        } else {
            return res.json({ msg: "Error when create order!" });
        }

        // Create OrderDetail
        const newOrderDetail = {
            orderId: orderId,
            books: books,
        };

        // const createdOrderDetail = 
        OrderDetail.create(newOrderDetail);

        // if(createdOrderDetail) {
        //     books.map(async (book) => {
        //         const id = parseInt(book._id)
        //     });
        // }

    },

    // Đăng nhập tài khoản
    loginUser: (req, res, next) => {

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

}