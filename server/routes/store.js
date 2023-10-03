const express = require('express');
const router = express.Router();
const {createStore, getStoreById,increaseView, getStores, deleteStore  } = require('../controllers/store');

router.post('/add', createStore);
router.get('/all', getStores);
router.get('/details/:id', getStoreById);
router.put('/increase/:id', increaseView);
router.delete('/:id', deleteStore);

module.exports = router;