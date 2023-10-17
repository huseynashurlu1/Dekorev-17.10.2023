const express = require('express');
const router = express.Router();
const {createStore, getStoreById,increaseView, getStores, deleteStore, getStatistics, getStatisticsForAdmin, getCategoryProductCounts, getProductsCountByStore  } = require('../controllers/store');

router.post('/add', createStore);
router.get('/all', getStores);
router.get('/details/:id', getStoreById);
router.get('/statistics/:id', getStatistics);
router.get('/statistics', getStatisticsForAdmin);
router.get('/pie', getCategoryProductCounts);
router.get('/chart', getProductsCountByStore);
router.put('/increase/:id', increaseView);
router.delete('/:id', deleteStore);

module.exports = router;