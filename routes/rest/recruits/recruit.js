const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');

async function getRecruits_pagination(req, res) {    
    const pageNum = req.params.page;
    //const keyword = req.query.keyword;
    //const query_nation = req.query.nation;
    const query_remote = req.query.remote;
    const query_visa = req.query.visa;
    let remote = 0;
    let visa = 0;
    let nation = 0;

    if (query_remote=="true") {
        remote = 1;
    }
    if (query_visa=="true") {
        visa = 1;
    }
    const limit = 10;
    const offset = limit * (parseInt(pageNum) - 1);
    try {
        let resp = await models.recruit_post.findAll({
            group: ['recruit_id'],
            attributes: 
                ['recruit_id','nation_id','company_name','description_title','description_content',
                'posted_date','is_visa_sponsored','is_remoted','company_logo','tag','location'
            ],    
            where:{                
                nation_id: nation,
                is_remoted: remote,
                is_visa_sponsored: visa
            },
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
    getRecruits_pagination
};