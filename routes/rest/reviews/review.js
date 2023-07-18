const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');

async function getReviews_pagination(req, res) {    
    const pageNum = req.params.page;
    
    const limit = 10;
    const offset = limit * (parseInt(pageNum) - 1);
    try {
        let resp = await models.review.findAll({
            group: ['review_id'],
            attributes: 
                ['review_id','title','link','thumbnail','created_at'],    
            order: [
                ['created_at', 'DESC']
            ]
        });
        resp = resp.filter((app, idx) => (offset <= idx && idx <= offset + limit - 1));
        res.send([{
            Message: "Success", 
            ResultCode: "ERR_OK",      
            Size: 10,
            Response: resp
        }])
    }
    catch (err) {
        console.log(err);        
        res.status(500).send([{            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        }]);
    }
}

module.exports = {    
    getReviews_pagination
};