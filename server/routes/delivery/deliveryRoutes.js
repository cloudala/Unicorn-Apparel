const express = require('express');
const router = express.Router();
const { getDelivery } = require('../../controllers/delivery/deliveryController');

router.get('/api/delivery', getDelivery)

module.exports = router;