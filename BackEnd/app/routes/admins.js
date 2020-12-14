const express = require("express");
const Admin = require('../controllers/admins');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../middleware/passport');
const { authenUser, checkAdmin } = require('../middleware/auth');

router.post('/login', Admin.postLogin)
  // XEM TẤT CẢ TÀI KHOẢN TRONG DATABASE
  .get('/getAllUser', passport.authenticate('jwt', { session: false }), authenUser, Admin.getAllUser)
  // Update for EMPLOYEE AND ADMIN
  .patch('/:userId/', passport.authenticate('jwt', { session: false }), authenUser, Admin.patchUpdateUser)


// Management Customer 
router.delete('/customers/:userId', passport.authenticate('jwt', { session: false }), authenUser, Admin.deleteCustomer)
  // Get All Customer
  .get('/customers', passport.authenticate('jwt', { session: false }), authenUser, Admin.getAllCustomer)
  .get('/customers/search/', passport.authenticate('jwt', { session: false }), authenUser, Admin.getSearchCustomer) // XONG
  // GET A CUSTOMER
  .get('/customers/:userId', passport.authenticate('jwt', { session: false }), authenUser, Admin.getACustomer) // XONG

//.patch()


// Management Employee
router.delete('/employees/:userId', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.deleteCustomer)  // XONG
  // GET ALL EMPLOYEE
  .get('/employees', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.getAllEmployee) // XONG
  // Tìm kiếm tên nhân viên
  .get('/employees/search', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.getSearchEmployee)  // XONG
  // GET A EMPLOYEE
  .get('/employees/:userId', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.getAEmployee)  // XONG

  // Tạo một tài khoản nhân viên
  .post('/employees/register', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.postRegisterEmployee)  // KT
  // Tạo một tài khoản Admin role = 1
  .patch('/employees/roleadmin/:userId/', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.patchCreateAdminRole1)  //XONG


// LOGOUT ACCOUNT
router.get('/logout', passport.authenticate('jwt', { session: false }), Admin.logout);

// TEST PRIVATE
router.get('/secret', passport.authenticate('jwt', { session: false }), authenUser, Admin.secret);



// Management Employee
//router.get('/secret', passport.authenticate('jwt', { session: false }), Admin.secret)

module.exports = router;