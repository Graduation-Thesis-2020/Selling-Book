// define dependence
const express = require('express');
const order = require('../models/order');
const router = express.Router();
const orderController = require('./../controllers/orders');

// authentication
const checkauth = require('./../middleware/auth');
router.use((req, res, next) => {
    next();
});


// Order FOR ADMIN
router.get('/', orderController.getOrder)

router.get('/orderDetails/', orderController.getOrderDetails)

router.get('/:orderId', orderController.getOrderID);

router.get('/:orderId/orderDetails', orderController.getOrderDetailByOrderID)
  .patch('/:orderId',orderController.updateOrder)
  .put('/:orderId',orderController.updateOrder)

router.delete('/:orderId', orderController.deleteOrder);
router.delete('/:orderId/orderDetails', orderController.deleteOrderDetail);

router.post('/', orderController.createOrder)
  
router.get('/orderbyday/:day', orderController.orderByDay) // FILTER ORDER BY DAY 

module.exports = router;