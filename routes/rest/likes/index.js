const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../../../middlewares');

const { likes, dislikes } = require('./likes.js');

router.post('/:postId', isLoggedIn, likes);
router.delete('/:postId', isLoggedIn, dislikes)

router.get('/', (req, res)=>{
    res.status(405).send([{
            Message: "Method not allowed", 
            ResultCode: "ERR_INVALID_DATA"            
        }]);
    return res;
});

router.use((req, res, next) => {
    res.status(400).send([{
        Message: "Invalid parameter", 
        ResultCode: "ERR_INVALID_PARAMETER"   
    }]);
    return res;
});

module.exports = router;