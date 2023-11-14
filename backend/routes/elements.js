const express = require('express');
const router = express.Router();
const elementsCtls = require('../controllers/elements');

router
    .route('/')
    .get(elementsCtls.index)
    .post(elementsCtls.createElement);

router
    .route('/:id')
    .get(elementsCtls.showElement)
    .patch(elementsCtls.editElement)
    .delete(elementsCtls.deleteElement);

module.exports = router;
