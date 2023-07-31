const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');
const tech_stack = require('../../../models/tech_stack');

async function getMain(req, res) {
    try {
        const remote = await models.recruit_post.findAll({
            attributes: 
                ['company_name', 'company_logo','description_title',
                 'is_visa_sponsored','is_remoted','location', 'posted_date',
            ],
            where: {
                is_remoted: 1,
                is_visa_sponsored: 0
            },
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
                    model: models.tech_stack,
                    through: {
                        attributes: []  // 중간 테이블에서 가져올 속성 지정
                    },
                    attributes: [] // tech_stack에서 가져올 속성 지정                    
                }
            ]
        });
        const visa = await models.recruit_post.findAll({
            attributes: 
                ['company_name', 'company_logo','description_title',
                 'is_visa_sponsored','is_remoted','location', 'posted_date',
            ],
            where: {
                is_remoted: 0,
                is_visa_sponsored: 1
            },
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
                    model: models.tech_stack,
                    through: {
                        attributes: []  // 중간 테이블에서 가져올 속성 지정
                    },
                    attributes: [] // tech_stack에서 가져올 속성 지정                    
                }
            ]
        });
        
        res.send({
            Message: "Success", 
            ResultCode: "ERR_OK",            
            Size: 12,
            Remote: remote,
            Visa: visa
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
    getMain
};