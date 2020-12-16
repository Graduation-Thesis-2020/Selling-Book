const express = require("express");
const User = require('../controllers/users');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const passportConfig = require('../middleware/passport');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


// Phần dành cho Khách hàng
router.post('/register', User.postRegisterUserCustomer)
  .post('/login', passport.authenticate('local', { session: false }), User.postLoginUserCustomer)
  // Update Profile Customer
  .patch('/updateprofile', passport.authenticate('jwt', { session: false }), upload.single('image'), User.postUpdateUserCustomer)
  .put('/updateprofile', passport.authenticate('jwt', { session: false }), upload.single('image'), User.postUpdateUserCustomer)
  // See profile Customer 
  .get('/profile', passport.authenticate('jwt', { session: false }), User.getProfileCustomer)
  // Quản lý đơn hàng 
  .post('/createorder', passport.authenticate('jwt', { session: false }), User.createAOrder)
  // GET ALL ORDER AND ORDER DETAIL
  .get('/getallorder', passport.authenticate('jwt', { session: false }), User.getAllOrder)
  .get('/getallorderdetail', passport.authenticate('jwt', { session: false }), User.getAllOrderDetails)

  // Get A Order AND A ORDER DETAIL
  .get('/:orderId/getaorder', passport.authenticate('jwt', { session: false }), User.getAOrder)
  .get('/:orderId/getaorderdetail', passport.authenticate('jwt', { session: false }), User.getAOrderDetails)
  .delete('/:orderId/deleteorder', passport.authenticate('jwt', { session: false }), User.deleteOrder)
  // Đăng ký nhận thông báo của website
  .patch('/notification', passport.authenticate('jwt', { session: false }), User.patchNotification)
  .patch('/notification', passport.authenticate('jwt', { session: false }), User.patchNotification)
  
  // Hủy 1 đơn hàng
  .patch('/:orderId', passport.authenticate('jwt', { session: false }), User.updateOrder)
  .put('/:orderId', passport.authenticate('jwt', { session: false }), User.updateOrder)

  // Coment A Book OF Customer
  .post('/:bookId/comment', passport.authenticate('jwt', { session: false }), User.postCreateAComment)

  // Forget PassWord
  .post('/forgetpassword', User.postForgetPassWord)
  .get('/changepassword', User.patchForgetPassWord)


// LOGOUT ACCOUNT
router.get('/logout', passport.authenticate('jwt', { session: false }), User.logout);

// LOGIN WITH GOOGLE
router.post('/auth/google', passport.authenticate('google-plus-token', { session: false }), User.authGoogle);

// LOGIN WITH FACEBOOK
router.post('/auth/facebook', passport.authenticate('facebook-token', { session: false }), User.authFacebook);



router.get('/secret', passport.authenticate('jwt', { session: false }), User.secret)
  .get('/getAllCustomer', User.getAllUserCustomer)
// .post('/verifyEmail', User.verifyEmail)

// 



module.exports = router;