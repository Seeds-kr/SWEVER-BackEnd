const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');

async function getDetail(req, res) {
    try {
        const postId = Number(req.params.postId);

        const resp = await models.recruit_post.findAll({
            attributes: 
                ['id', 'company_name', 'company_logo','description_title', 'description_content',
                 'company_apply_link', 'salary', 'contract_form', 'tag', 'origin', 'posted_date', 
                 'location', 'is_visa_sponsored','is_remoted', 'is_dev',
            ],
            where: {
                id: postId,
            },
            limit: 1,
            include: [
                {
                    model: models.nation,
                    attributes: []
                    
                },                
                {
                    model: models.tech_stack,
                    through: {
                        attributes: []  // 중간 테이블에서 가져올 속성 지정
                    },
                    attributes: ['tech_name'] // tech_stack에서 가져올 속성 지정                    
                }
            ]
        });
        if (!resp || resp.length === 0) {
            return res.status(404).send([{
                Message: "Data not found", 
                ResultCode: "ERR_DATA_NOT_FOUND"
            }]);
        }
        res.send([{
            Message: "Success", 
            ResultCode: "ERR_OK",            
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
    getDetail
};