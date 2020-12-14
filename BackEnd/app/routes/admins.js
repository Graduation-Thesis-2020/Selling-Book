const express = require("express");
const Admin = require('../controllers/admins');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../middleware/passport');
const { authenUser, checkAdmin } = require('../middleware/auth');

router.post('/login', Admin.postLogin)
  .get('/getAllUser', passport.authenticate('jwt', { session: false }), authenUser, Admin.getAllUser)



// Management Customer 
router.delete('/customers/:customerId', passport.authenticate('jwt', { session: false }), authenUser, Admin.deleteCustomer)
  // Get All Customer
  .get('/customers', passport.authenticate('jwt', { session: false }), authenUser, Admin.getAllCustomer) // Chưa
  // GET A CUSTOMER
  .get('/customers/:userId', passport.authenticate('jwt', { session: false }), authenUser, Admin.getACustomer) // CHƯA
  .get('/customers/search', passport.authenticate('jwt', { session: false }), authenUser, Admin.getSearchCustomer)
//.patch()


// Management Employee
router.delete('/employees/:employId', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.deleteEmployee)
  .get('/employees', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.getAllEmployee)
  .get('/employees/:userId', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.getAEmployee)
  // Tìm kiếm tên nhân viên
  .get('/employees/search', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.getSearchEmployee)
  // Tạo một tài khoản nhân viên
  .post('/employees/register', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.postRegisterEmployee)
  // Tạo một tài khoản Admin role = 1
  .patch('/roleadmin/:userId', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.postRegisterEmployee)


// LOGOUT ACCOUNT
router.get('/logout', passport.authenticate('jwt', { session: false }), Admin.logout);

// TEST PRIVATE
router.get('/secret', passport.authenticate('jwt', { session: false }), authenUser, Admin.secret);



// Management Employee
//router.get('/secret', passport.authenticate('jwt', { session: false }), Admin.secret)

module.exports = router;