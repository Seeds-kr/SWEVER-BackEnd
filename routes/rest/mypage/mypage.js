const models = require('../../../models');

exports.myPosts = async (req, res, next) => {
    try {
        const userId = req.user.id;
        post = await models.recruit_post.findAll({
            attributes: 
                ['id', 'company_name', 'company_logo','description_title',
                'is_visa_sponsored','is_remoted','location', 'posted_date',
            ],
            where: {
                creator_id: userId
            },
            order: [
                ['posted_date', 'DESC']
            ],
            include: [
                {
                    model: models.nation_continent,
                    attributes: []
                    
                }
            ]
        });
        if (post.length == 0) {
            return res.status(404).json({
                Message: "작성한 채용공고가 존재하지 않습니다.",
                ResultCode: "JobPost_Not_Exist",
            });
        } else {
            return res.send({
                Message: "Success",
                ResultCode: "JobPost_Exist",
                Response: post
            });
        }
    } catch (error) {
        console.log(error);        
        res.status(500).send({            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        });
    }
}

exports.myReviews = async (req, res, next) => {
    try {
        const userId = req.user.id;
        review = await models.review.findAll({
            attributes: ["id", "title", "content", "thumbnail", "created_at", "creator_id"],
            where: {
                creator_id: userId
            },
            order: [
                ['created_at', 'DESC']
            ],
        });
        if (review.length == 0) {
            return res.status(404).json({
                Message: "작성한 후기가 존재하지 않습니다.",
                ResultCode: "ReviewPost_Not_Exist",
            });
        } else {
            return res.send({
                Message: "Success",
                ResultCode: "ReviewPost_Exist",
                Response: review
            });
        }
    } catch (error) {
        console.log(error);        
        res.status(500).send({            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        });
    }
}