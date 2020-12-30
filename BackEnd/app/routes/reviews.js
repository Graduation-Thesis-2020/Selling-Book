// define dependence
const express = require('express');
const router = express.Router();
const reviewController = require('./../controllers/reviews');



// authentication
const checkauth = require('./../middleware/auth');
router.use((req, res, next) => {
  next();
});



router.get('/', reviewController.getListReview);
router.post('/', reviewController.createReview);
router.get('/commentchild', reviewController.getListCommentChild)
  .get('/commentchild/:commentChildId', reviewController.getCommentChildId)
  .delete('/commentchild/:commentChildId', reviewController.deleteCommentChild)
  .get('/CommentByBook/search', reviewController.getCommentByBook)

router.get('/:bookId/book', reviewController.getReviewId) // Get by Id Book

router.delete('/:reviewId', reviewController.deleteReview);


module.exports = router;