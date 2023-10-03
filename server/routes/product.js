const express = require('express');
const router = express.Router();
const { createProduct, getProducts, increaseView, getProductForHome, getProductById, deleteProduct } = require('../controllers/product');

router.post('/add', createProduct);
router.get('/all', getProducts);
router.get('/details/:id', getProductById);
router.get('/home-products', getProductForHome);
router.put('/increase/:id', increaseView);
router.delete('/:id', deleteProduct);

module.exports = router;