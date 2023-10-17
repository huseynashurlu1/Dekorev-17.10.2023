const express = require('express');
const router = express.Router();
const { createBranch, getAllBranchesByStoreId, getBranches, deleteBranch, getBranchById, updateBranch } = require('../controllers/branch');

router.post('/add', createBranch);
router.get('/all', getBranches);
router.get('/all/:id', getBranchById);
router.get('/:id', getAllBranchesByStoreId);
router.put('/:id', updateBranch);
router.delete('/:id', deleteBranch);

module.exports = router;