const express = require('express');
const router = express.Router();
const { createColor, getColors, deleteColor } = require('../controllers/color');

router.post('/add', createColor);
router.get('/all', getColors);
router.delete('/:id', deleteColor);

module.exports = router;