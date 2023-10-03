const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, deleteCategory } = require('../controllers/category');

router.post('/add', createCategory);
router.get('/all', getAllCategories);
router.delete('/:id', deleteCategory);

module.exports = router;