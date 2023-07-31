const express = require('express');
const router = express.Router();

const {
    getReviews_pagination,    
    deleteReview,
    upsertReview
} = require('./review.js');

router.get('/:page', getReviews_pagination);
router.post('/:id', deleteReview);
router.post('/', upsertReview);

router.use((req, res, next) => {
    res.status(400).send([{
        Message: "Invalid parameter", 
        ResultCode: "ERR_INVALID_PARAMETER"   
    }]);
    return res;
});

module.exports = router;