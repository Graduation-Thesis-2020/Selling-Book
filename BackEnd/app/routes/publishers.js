// define dependence
const express = require('express');
const router = express.Router();
const publisherController = require('./../controllers/publishers');



// authentication
const checkauth = require('./../middleware/auth');
router.use((req, res, next) => {
  next();
});


router.get('/', publisherController.getListPublisher)
  // Search name Publsher 
  .get('/search', publisherController.searchPublisherByName) //  search Name Publisher
  .get('/:publishId/search/', publisherController.searchBookWithPublish) // search book by book + Publish

router.post('/', publisherController.createPublisher);

router.route('/:publisherId')
  .get(publisherController.getPublisherID)
  .patch(publisherController.updatePublisher)
  .put(publisherController.updatePublisher)
  .delete(publisherController.deletePublisher);

module.exports = router;