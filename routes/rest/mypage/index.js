const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../../middlewares');

const { myPosts, myReviews } = require('./mypage.js');

router.get('/mypost', isLoggedIn, myPosts);

router.get('/myreview', isLoggedIn, myReviews);

router.post('/', (req, res)=>{
    res.status(405).send({
            Message: "Method not allowed", 
            ResultCode: "ERR_INVALID_DATA"            
        });
    return res;
});

router.use((req, res, next) => {
    res.status(400).send({
        Message: "Invalid parameter", 
        ResultCode: "ERR_INVALID_PARAMETER"   
    });
    return res;
});

module.exports = router;