const router = require('express').Router();
const locationsCtls = require('../controllers/locations');

router
    .route('/')
    .get(locationsCtls.index)
    .post(locationsCtls.createLocation);

router
    .route('/:id')
    .get(locationsCtls.showLocation)
    .patch(locationsCtls.editLocation)
    .delete(locationsCtls.deleteLocation);

module.exports = router;
