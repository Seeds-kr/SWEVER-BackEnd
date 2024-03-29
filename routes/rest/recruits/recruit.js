const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');
const { Op } = require('sequelize');

async function getRecruits_pagination(req, res) {
    const pageNum = req.params.page;
    
    const query_nation = req.query.nation;    
    const query_keyword = req.query.keyword;    
    const query_remote = req.query.remote;
    const query_visa = req.query.visa;

    const whereCondition = {};
    const limit = 10;
    const offset = limit * (parseInt(pageNum) - 1);

    if (query_nation) {
        whereCondition.nation_id = query_nation;
    }
    if (query_remote == "true" || query_remote == "false") {
        whereCondition.is_remoted = query_remote === "true" ? "1" : "0";
    }
    if (query_visa == "true" || query_visa == "false") {
        whereCondition.is_visa_sponsored = query_visa === "true" ? "1" : "0";
    }
    if (query_keyword){
        whereCondition.description_title = {
            [Op.like]: `%${query_keyword}%`
        }
    }

    try {
        const totalPosts = await models.recruit_post.count({
            where: {
                [Op.and]: [
                    [whereCondition],
                    {is_dev: "1"}
                ]
            }
        });
        let post = await models.recruit_post.findAll({
            attributes: 
                ['id','nation_id','company_name','description_title','description_content',
                'posted_date','is_visa_sponsored','is_remoted','is_dev','company_logo','tag','location'
            ],    
            where:{
                [Op.and]: [
                    [whereCondition],
                    {is_dev: "1"}
                ]
            },
            order: [
                ['posted_date', 'DESC']
            ],
            include: [
                {
                    model: models.nation_continent,
                    attributes: ['continent','nation']
                },
                {
                    model: models.description_tech,
                    attributes: ['tech_name']
                },
            ],
            offset: offset,
            limit: 10
        });
        console.log(post.length);
        // post_pagination = post.filter((app, idx) => (offset <= idx && idx <= offset + limit - 1));
        res.send({
            Message: "Success", 
            ResultCode: "ERR_OK",
            Size: post.length,            
            Response: {
                page:{
                    total: parseInt((totalPosts-1) / 10) + 1,
                    current: parseInt(pageNum),
                },   
                recruit_post_list: post
            }
        })
    }
    catch (err) {
        console.log(err);        
        res.status(500).send({            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        });
    }
}

async function getInit(req, res) {
    try {
        const nation = await models.nation_continent.findAll({            
            where: {
                id: { [Op.not]: "1" }
            }
        });            
        res.send({
            Message: "Success", 
            ResultCode: "ERR_OK",
            Response: {
                nation_continent_list: nation
            }
        })
    }
    catch (err) {
        console.log(err);        
        res.status(500).send({            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        });
    }
}

module.exports = {
    getRecruits_pagination,
    getInit
};