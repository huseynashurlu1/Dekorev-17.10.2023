const express = require('express');
const router = express.Router();
const { createSettings, getSettings } = require('../controllers/settings');

router.post('/add', createSettings);
router.get('/all', getSettings);

module.exports = router;