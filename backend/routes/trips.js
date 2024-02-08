const router = require('express').Router();
const tripsCtls = require('../controllers/trips');

router
    .route('/')
    .get(tripsCtls.index)
    .post(tripsCtls.createTrip);

router
    .route('/user=:user')
    .get(tripsCtls.userIndex);

router
    .route('/:id')
    .get(tripsCtls.showTrip)
    .patch(tripsCtls.editTrip)
    .delete(tripsCtls.deleteTrip);

module.exports = router;