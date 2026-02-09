const router = require('express').Router();
const { createCoupon, validateCoupon, getAllCoupons, deleteCoupon } = require('../Controllers/CouponController');
const { verifyToken, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

router.get('/', verifyTokenAndAdmin, getAllCoupons);
router.post('/', verifyTokenAndAdmin, createCoupon);
router.post('/validate', verifyToken, validateCoupon);
router.delete('/:id', verifyTokenAndAdmin, deleteCoupon);

module.exports = router;
