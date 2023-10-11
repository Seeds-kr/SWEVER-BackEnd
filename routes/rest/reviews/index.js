const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../../middlewares');

const {
    getReviews_pagination,    
    getReview,
    deleteReview,
    upsertReview
} = require('./review.js');

router.get('/', getReviews_pagination);
router.get('/:id', getReview);
router.delete('/:id', isLoggedIn, deleteReview);
router.post('/', isLoggedIn, upsertReview);

router.use((req, res, next) => {
    res.status(400).send([{
        Message: "Invalid parameter",
        ResultCode: "ERR_INVALID_PARAMETER"   
    }]);
    return res;
});

module.exports = router;