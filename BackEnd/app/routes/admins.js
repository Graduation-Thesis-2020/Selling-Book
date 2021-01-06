const express = require("express");
const Admin = require('../controllers/admins');
const Statistical = require('../controllers/statisticals');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../middleware/passport');
const { authenUser, checkAdmin } = require('../middleware/auth');

router.post('/login', Admin.postLogin)
  // XEM TẤT CẢ TÀI KHOẢN TRONG DATABASE
  .get('/getAllUser', passport.authenticate('jwt', { session: false }), authenUser, Admin.getAllUser)
  // Update for EMPLOYEE AND ADMIN
  .patch('/:userId/', passport.authenticate('jwt', { session: false }), authenUser, Admin.patchUpdateUser)
  // DELETE ADMIN ACCOUNT 
  .delete('/:userId/', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.deleteCustomer)


// Management Customer 
router.delete('/customers/:userId', passport.authenticate('jwt', { session: false }), authenUser, Admin.deleteCustomer)
  // Get All Customer
  .get('/customers', passport.authenticate('jwt', { session: false }), authenUser, Admin.getAllCustomer)
  .get('/customers/search/', passport.authenticate('jwt', { session: false }), authenUser, Admin.getSearchCustomer) // XONG
  .patch('/customers/:userId/lockaccount', passport.authenticate('jwt', { session: false }), authenUser, Admin.patchLockAccount) // XONG
// GET A CUSTOMER
//.get('/customers/:userId', passport.authenticate('jwt', { session: false }), authenUser, Admin.getACustomer) // XONG

//.patch()


// Management Employee
router.delete('/employees/:userId', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.deleteCustomer)  // XONG
  // GET ALL EMPLOYEE
  .get('/employees', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.getAllEmployee) // XONG
  // Tìm kiếm tên nhân viên
  .get('/employees/search', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.getSearchEmployee)  // XONG
  // GET A EMPLOYEE
  //.get('/employees/:userId', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.getAEmployee)  // XONG

  // Tạo một tài khoản nhân viên
  .post('/employees/register', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.postRegisterEmployee)  // KT
  // Tạo một tài khoản Admin role = 1
  .patch('/employees/roleadmin/:userId/', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.patchCreateAdminRole1)  //XONG
  // GET ALL ADMIN ACCOUNT
  .get('/', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.getAllAdmin) // XONG
  // GET A USER
  .get('/:userId', passport.authenticate('jwt', { session: false }), authenUser, Admin.getAEmployee)  // XONG

// LOGOUT ACCOUNT
router.get('/logout', passport.authenticate('jwt', { session: false }), Admin.logout)
  .post('/forgetpassword', Admin.postForgetPassWord)
  .patch('/changepassword/private', Admin.patchForgetPassWord)
// TEST PRIVATE
router.get('/secret', passport.authenticate('jwt', { session: false }), authenUser, Admin.secret)

// STATISTICIAL
router.get('/statistical/day/:day', passport.authenticate('jwt', { session: false }), authenUser, Statistical.getStatisticalByDay)
  .get('/statistical/week/:week', passport.authenticate('jwt', { session: false }), authenUser, Statistical.getStatisticalByDay)
  .get('/statistical/quarter/:quarter', passport.authenticate('jwt', { session: false }), authenUser, Statistical.getStatisticalByQuarter)
  .get('/statistical/month/:month', passport.authenticate('jwt', { session: false }), authenUser, Statistical.getStatisticalByMonth)
  .get('/statistical/year/:year', passport.authenticate('jwt', { session: false }), authenUser, Statistical.getStatisticalByDay)
  .get('/statistical/AllCustomerTotalPrice', passport.authenticate('jwt', { session: false }), authenUser, Statistical.getStatisticalAllCustomerTotalPrice)

// Management Employee
//router.get('/secret', passport.authenticate('jwt', { session: false }), Admin.secret)

module.exports = router;