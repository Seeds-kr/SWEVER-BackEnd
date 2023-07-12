const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');

async function getMain(req, res) {
    try {
        const resp = await models.recruit_post.findAll({
            attributes: 
                ['company_name', 'company_logo','description_title',
                 'is_visa_sponsored','is_remoted','location', 'posted_date',
            ],
            limit: 6,
            order: [
                ['posted_date', 'DESC']
            ],
            include: [
                {
                    model: models.nation,
                    attributes: []
                    
                },                
                {
                    model: models.description_tech,
                    attributes: []                    
                }
            ]
        });
        res.send([{
            Message: "Success", 
            ResultCode: "ERR_OK",            
            Size: 5,
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
    getMain
};