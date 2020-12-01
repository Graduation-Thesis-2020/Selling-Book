const express = require("express");
const Admin = require('../controllers/admins');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../middleware/passport');
const { authenUser } = require('../middleware/auth');

router.post('/login', Admin.postLogin)
  .get('/getAllUser',passport.authenticate('jwt', { session: false }), Admin.getAllUser)
  .post('/employees/register', Admin.postRegisterEmployee)

// Management Customer 
router.route('/:customerId')
  .delete(passport.authenticate('jwt', { session: false }), Admin.deleteCustomer)
// // LOGOUT ACCOUNT
// router.get('/logout', User.logout);

router.get('/secret', passport.authenticate('jwt', { session: false }), Admin.secret);



// Management Employee
//router.get('/secret', passport.authenticate('jwt', { session: false }), Admin.secret)

module.exports = router;