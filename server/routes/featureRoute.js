const router = require('express').Router();
const { getAllFeatures, createFeature, updateFeature, deleteFeature } = require('../Controllers/FeatureController');

// /api/features
router.route('/')
    .get(getAllFeatures)
    .post(createFeature);

// /api/features/:id
router.route('/:id')
    .put(updateFeature)
    .delete(deleteFeature);

module.exports = router;
