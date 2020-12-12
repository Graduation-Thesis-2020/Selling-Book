const express = require("express");
const Admin = require('../controllers/admins');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../middleware/passport');
const { authenUser } = require('../middleware/auth');

router.post('/login', Admin.postLogin)
  .get('/getAllUser', passport.authenticate('jwt', { session: false }), authenUser, Admin.getAllUser)
  .post('/employees/register', Admin.postRegisterEmployee)


// Management Customer 
router.delete('/customer/:customerId', passport.authenticate('jwt', { session: false }), authenUser, Admin.deleteCustomer)
  .get('/customer/search', passport.authenticate('jwt', { session: false }), authenUser, Admin.getSearchCustomer)



// LOGOUT ACCOUNT
router.get('/logout', passport.authenticate('jwt', { session: false }), Admin.logout);

// TEST PRIVATE
router.get('/secret', passport.authenticate('jwt', { session: false }), authenUser, Admin.secret);



// Management Employee
//router.get('/secret', passport.authenticate('jwt', { session: false }), Admin.secret)

module.exports = router;