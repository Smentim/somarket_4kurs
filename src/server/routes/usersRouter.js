const express = require('express')
const router = express.Router();
const userControllers = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userControllers.registration)
router.post('/login', userControllers.login)
router.get('/auth', authMiddleware, userControllers.check)
router.post('/change-password', authMiddleware, userControllers.changePassword);
router.post('/create', userControllers.createStorage);
router.post('/add', userControllers.addItemToStorage);
router.get('/items', userControllers.getItemsFromStorage);
router.put('/nicknames', userControllers.updateNicknames);

module.exports = router