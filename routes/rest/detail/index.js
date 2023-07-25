const express = require('express');
const router = express.Router();

const {
    getDetail    
} = require('./detail.js');

router.get('/:postId', getDetail);

router.post('/', (req, res)=>{
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