// define dependence
const express = require('express');
const router = express.Router();
const authorController = require('./../controllers/authors');


// authentication
const checkauth = require('./../middleware/auth');
router.use((req, res, next) => {
  next();
});


router.get('/', authorController.getListAuthor)
  // Search name author 
  .get('/search', authorController.searchAuthorByName) 
  



router.post('/', authorController.createAuthor);

router.route('/:authorId')
  .get(authorController.getAuthorID)
  .patch(authorController.updateAuthor)
  .put(authorController.updateAuthor)
  .delete(authorController.deleteAuthor);



module.exports = router;