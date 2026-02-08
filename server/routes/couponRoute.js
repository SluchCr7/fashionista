const router = require('express').Router();
const { createCoupon, validateCoupon, getAllCoupons, deleteCoupon } = require('../Controllers/CouponController');
const { VerifyToken, VerifyTokenAndAdmin } = require('../middlewares/VerifyToken');

router.get('/', VerifyTokenAndAdmin, getAllCoupons);
router.post('/', VerifyTokenAndAdmin, createCoupon);
router.post('/validate', VerifyToken, validateCoupon);
router.delete('/:id', VerifyTokenAndAdmin, deleteCoupon);

module.exports = router;
