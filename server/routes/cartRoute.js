const router = require('express').Router();
const cartController = require('../Controllers/CartController');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/', verifyToken, cartController.getUserCart);
router.post('/', verifyToken, cartController.addItemToCart);
router.delete('/', verifyToken, cartController.removeItemFromCart);
router.delete('/clear', verifyToken, cartController.clearCart);

module.exports = router;
