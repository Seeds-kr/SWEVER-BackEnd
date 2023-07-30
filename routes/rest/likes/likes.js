const models = require('../../../models');

exports.likes = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const likes = await models.post_likes.create({
            user_id: userId,
            post_id: postId
        });
        return res.send({
            Message: "좋아요 등록이 완료되었습니다.",
            ResultCode: "LikesToPost_Create_Success"
        });
    } catch (error) {
        console.log(error);        
        res.status(500).send({            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        });
    }
}

exports.dislikes = async (req, res, next) => {
    try {
        
    } catch (error) {
       
    }
}