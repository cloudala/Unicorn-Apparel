const express = require('express');
const router = express.Router();
const { handleValidationErrors } = require('../../middlewares/validation');
const { orderValidation } = require('../../middlewares/order/orderValidation');
const { addOrder } = require('../../controllers/order/orderController');

router.post('/api/order', [orderValidation, handleValidationErrors], addOrder)

module.exports = router