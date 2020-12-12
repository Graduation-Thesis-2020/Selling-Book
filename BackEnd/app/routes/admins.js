const express = require("express");
const Admin = require('../controllers/admins');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../middleware/passport');
const { authenUser, checkAdmin } = require('../middleware/auth');

router.post('/login', Admin.postLogin)
  .get('/getAllUser', passport.authenticate('jwt', { session: false }), authenUser, Admin.getAllUser)
  .post('/employees/register', Admin.postRegisterEmployee)


// Management Customer 
router.delete('/customer/:customerId', passport.authenticate('jwt', { session: false }), authenUser, Admin.deleteCustomer)
// Get All Customer
  .get('/customer', passport.authenticate('jwt', { session: false }), authenUser, Admin.getAllCustomer)
  // GET A CUSTOMER
  .get('/customer/:userId', passport.authenticate('jwt', { session: false }), authenUser, Admin.getACustomer)
  .get('/customer/search', passport.authenticate('jwt', { session: false }), authenUser, Admin.getSearchCustomer)
//.patch()


// Management Employee
router.delete('/employee/:employId', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.deleteEmployee)
  .get('/employee', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.getAllEmployee)
  .get('/employee/:userId', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.getAEmployee)
  .get('/employee/search', passport.authenticate('jwt', { session: false }), checkAdmin, Admin.getSearchCustomer)

// LOGOUT ACCOUNT
router.get('/logout', passport.authenticate('jwt', { session: false }), Admin.logout);

// TEST PRIVATE
router.get('/secret', passport.authenticate('jwt', { session: false }), authenUser, Admin.secret);



// Management Employee
//router.get('/secret', passport.authenticate('jwt', { session: false }), Admin.secret)

module.exports = router;