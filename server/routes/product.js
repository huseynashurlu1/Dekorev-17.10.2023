const express = require('express');
const router = express.Router();
const { createProduct, getProducts, increaseView, getProductForHome, getProductById, deleteProduct, searchProductsByName, getProductsByCategoryId, getProductsByUserId } = require('../controllers/product');

// Yeni bir məhsul yaratmaq üçün
router.post('/add', createProduct);

// Bütün məhsulları almaq üçün
router.get('/all', getProducts);

// Bir kateqoriyaya görə məhsulları almaq üçün
router.get('/all/:id', getProductsByCategoryId);

// Bir userin məhsullarını almaq üçün
router.get('/all-products/:id', getProductsByUserId);


// Bir məhsulu id-ə görə almaq üçün
router.get('/details/:id', getProductById);

// Əsas səhifə üçün məhsulları almaq üçün
router.get('/home-products', getProductForHome);

// Məhsulun baxış sayını artırmaq üçün
router.put('/increase/:id', increaseView);

// Məhsulu silmək üçün
router.delete('/:id', deleteProduct);

// Məhsulları adına görə axtarış etmək üçün
router.get('/search', searchProductsByName);

module.exports = router;