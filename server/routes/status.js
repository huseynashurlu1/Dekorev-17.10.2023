const express = require('express');
const router = express.Router();
const { createStatus, getAllStatus, deleteStatus } = require('../controllers/status');

router.post('/add', createStatus);
router.get('/all', getAllStatus);
router.delete('/:id', deleteStatus);

module.exports = router;