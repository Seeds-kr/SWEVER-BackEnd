const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');

async function getMain(req, res) {
    try {
        const resp = await models.recruit_post.findAll({
            attributes: 
                ['recruit_id','nation_id','company_name','company_city','description_title','description_content','company_apply_link',
                'posted_date','is_visa_sponsored','is_remoted','company_logo','salary','contract_form',
                'company_page_link','origin','tag','location','is_dev','created_at','created_by',
                'updated_at','updated_by'
            ],
            limit: 5,
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