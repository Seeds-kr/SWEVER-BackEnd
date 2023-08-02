const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');
const { Op } = require('sequelize');

async function getDetail(req, res) {
    try {
        const postId = Number(req.params.postId);

        const resp = await models.recruit_post.findAll({
            attributes: 
                ['id', 'creator_id', 'nation_id', 'company_name', 
                 'description_title', 'description_content', 'company_apply_link', 
                 'posted_date', 'is_visa_sponsored','is_remoted',
                 'is_dev', 'company_logo','salary', 'contract_form', 
                 'company_page_link', 'origin', 'tag', 'location'
            ],
            where: {
                [Op.and]: [
                    {id: postId},
                    {is_dev: "1"}
                ]
            },
            limit: 1,
            include: [
                {
                    model: models.nation,
                    attributes: ['nation_name']
                    
                },           
                {
                    model: models.description_tech,
                    attributes: ['tech_name']
                },
            ]
        });
        if (!resp || resp.length === 0) {
            return res.status(404).send({
                Message: "Data not found", 
                ResultCode: "ERR_DATA_NOT_FOUND"
            });
        }
        res.send([{
            Message: "Success", 
            ResultCode: "ERR_OK",            
            Response: resp
        }])
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
    getDetail
};