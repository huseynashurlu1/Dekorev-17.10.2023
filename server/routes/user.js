const express = require('express')
const router = express.Router()
const { createUser, loginUser, checkLogin, getAllUsers, deleteUser } = require('../controllers/user');

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/check-login', checkLogin)
router.get('/all-users', getAllUsers)
router.delete('/:id', deleteUser)

module.exports = router;

