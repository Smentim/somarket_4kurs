const express = require('express')
const router = express.Router();
const itemController = require('../controllers/itemController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), itemController.create)
router.get('/', itemController.getAll)
router.get('/item/:id', itemController.getOne)
router.get('/search/:name', itemController.search)
router.get('/storage/items/:server', itemController.getStorageItems);
router.post('/storage/add', itemController.addItemToStorage);
router.get('/user/items', itemController.getUserItems);
router.delete('/:id', itemController.deleteItem);
router.get('/ammo_infos/:itemId', itemController.getAmmoInfosByItemId);


module.exports = router