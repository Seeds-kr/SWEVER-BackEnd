const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');
const { Op } = require('sequelize');

async function getRecruits_pagination(req, res) {    
    const pageNum = req.params.page;
    const query_keyword = req.query.keyword;    
    const query_remote = req.query.remote;
    const query_visa = req.query.visa;
    const whereCondition = {};    
    let keyword='';

    if (query_remote == "true" || query_remote == "false") {
        whereCondition.is_remoted = query_remote === "true" ? 1 : 0;
    }
    if (query_visa == "true" || query_visa == "false") {
        whereCondition.is_visa_sponsored = query_visa === "true" ? 1 : 0;
    }
    if (query_keyword){
        whereCondition.description_title = {
            [Op.like]: `%${query_keyword}%`
        }
    }

    const limit = 10;
    const offset = limit * (parseInt(pageNum) - 1);
    try {
        let resp = await models.recruit_post.findAll({
            group: ['id'],
            attributes: 
<<<<<<< HEAD
                ['recruit_id','company_name','description_title','description_content',
=======
                ['id','nation_id','company_name','description_title','description_content',
>>>>>>> a9e0e30c126015cae0623c40bdbb5de4eb59672d
                'posted_date','is_visa_sponsored','is_remoted','company_logo','tag','location'
            ],    
            where:
                [whereCondition],            
            order: [
                ['posted_date', 'DESC']
            ],
            include: [
                {
                    model: models.nation,
                    attributes: ['nation_name']
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