const express = require("express");
const User = require('../controllers/users');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../middleware/passport');


// Phần dành cho Khách hàng
router.post('/register', User.postRegisterUserCustomer)
  .post('/login', passport.authenticate('local', { session: false }), User.postLoginUserCustomer)

// LOGOUT ACCOUNT
router.get('/logout', User.logout);
// LOGIN WITH GOOGLE
router.post('/auth/google', passport.authenticate('google-plus-token', { session: false }), User.authGoogle);

// LOGIN WITH FACEBOOK
router.post('/auth/facebook', passport.authenticate('facebook-token', { session: false }), User.authFacebook);

router.get('/secret', passport.authenticate('jwt', { session: false }), User.secret);



module.exports = router;