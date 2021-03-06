// define dependence
const express = require('express');
const router = express.Router();
const multer = require('multer');
const bookController = require('./../controllers/books');
const passport = require('passport');
const passportConfig = require('../middleware/passport');
//const checkAuth = require('./../middleware/auth');


// authentication
router.use((req, res, next) => {
  next();
});



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


// http://localhost:8080/books




router.get('/', bookController.getListBook)
  .get('/search/', bookController.searchBookByTitle) // search book by title
  .get('/discount/search/', bookController.searchBookWithDiscount) // search book by book + Discount
  .get('/:publishId/publisher/search/', bookController.searchBookWithPublish) // search book by book + Publish
  .get('/:cateId/category/search/', bookController.searchBookWithCateGory) // search book by book + category
  .get('/:authorId/author/search/', bookController.searchBookWithAuthor) // search book by name book + Author

// Hiện tổng trung bình đánh giá của một cuốn sách 
router.get('/:bookId/averageReview', bookController.averageReviewABook)
  // Hiện tổng trung bình đánh giá của tất cả cuốn sách 
  .get('/averageReviewAll')

// Get book have discount
router.get('/discount/', bookController.bookHaveDiscount)

router.post('/', upload.single('image'), bookController.createBook);

router.route('/:bookId')
  .get(bookController.getBookID)
  .patch(upload.single('image'), bookController.updateBook)
  .put(upload.single('image'), bookController.updateBook)
  .delete(bookController.deleteBook);

// delete comment in review
router.route('/:bookId/:reviewId')
  .delete(bookController.deleteReview);

// get reviews by id book
router.route('/:bookId/reviews')
  .get(bookController.getCommentBybookId);

// get name author by id book
router.route('/:bookId/author')
  .get(bookController.getAuthorBybookId);

// get category by id book
router.route('/:bookId/cate')
  .get(bookController.getCategoryBybookId);

// get book by id category
router.route('/:cateId/categories')
  .get(bookController.getBookByCategoryId);

// get book by id Author
router.route('/:authorId/authors')
  .get(bookController.getBookByAuthorId);

// get book by id Publisher
router.get('/:publisherId/publishers', bookController.getBookByPublisherId)






module.exports = router;