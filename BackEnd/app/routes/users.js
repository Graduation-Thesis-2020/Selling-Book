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
  .patch('/:userId',upload.single('image'), User.postUpdateUserCustomer)
  .put('/:userId' , upload.single('image'), User.postUpdateUserCustomer)

// LOGOUT ACCOUNT
router.get('/logout', User.logout);
// LOGIN WITH GOOGLE
router.post('/auth/google', passport.authenticate('google-plus-token', { session: false }), User.authGoogle);

// LOGIN WITH FACEBOOK
router.post('/auth/facebook', passport.authenticate('facebook-token', { session: false }), User.authFacebook);

router.get('/secret', passport.authenticate('jwt', { session: false }), User.secret);



module.exports = router;