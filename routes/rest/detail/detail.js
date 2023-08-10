const models = require('../../../models');
const { Op } = require('sequelize');

async function getDetail(req, res) {
    try {
        const postId = Number(req.params.postId);
        let includeUser = [];
        if (req.user && req.user.id) { // req.user.id가 존재하면
            includeUser = [
                {
                    model: models.user,
                    attributes: ['id'], // 원하는 사용자 정보를 가져올 수 있음
                    through: { attributes: [] }, // 중간 테이블의 속성을 가져올 수 있음,
                    where:{
                        'id': req.user.id
                    }
                }
            ]
        }
        let resp = await models.recruit_post.findOne({
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
                    model: models.nation_continent,
                    attributes: ['continent','nation']
                },
                {
                    model: models.description_tech,
                    attributes: ['tech_name']
                },
            ],
        });
        if (!resp || resp.length === 0) {
            console.log(postId);
            return res.status(404).send({
                Message: "Data not found",
                ResultCode: "ERR_DATA_NOT_FOUND"
            });
        }

        // 추가: 맞는 사용자가 없는 경우 'likes' 속성을 추가하여 리턴
        resp = resp.toJSON();
        const cnt = await models.post_likes.count();

        resp.likes = {
            filled: includeUser.length > 0,
            count: cnt
        };

        res.send({
            Message: "Success", 
            ResultCode: "ERR_OK",
            Response: resp
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
    getDetail
};