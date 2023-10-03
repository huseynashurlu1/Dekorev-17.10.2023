const express = require('express')
const router = express.Router()
const { createUser, loginUser, checkLogin, getAllUsers } = require('../controllers/user');

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/check-login', checkLogin)
router.get('/all-users', getAllUsers)

module.exports = router;

