const models = require('../../../models');

exports.uploadPost = async (req, res, next) => {
    // req.body.content, req.body.url
    try {
        console.log(req.body);
        const post = await models.recruit_post.create({
            creator_id: req.user.id,
            nation_id: req.body.nation_id,
            company_name: req.body.company_name,
            description_title: req.body.description_title,
            description_content: req.body.description_content,
            company_apply_link: req.body.company_apply_link,
            posted_date: Math.floor(Date.now() / 1000),
            is_visa_sponsored: req.body.is_visa_sponsored,
            is_remoted: req.body.is_remoted,
            is_dev: req.body.is_dev,
            company_logo: `${req.file.path}`,
            salary: req.body.salary,
            contract_form: req.body.contract_form,
            company_page_link: req.body.company_apply_link,
            origin: "fndr",
            tag: req.body.tag,
            location: req.body.location
        })
        return res.send([{
            Message: "채용공고 등록이 완료되었습니다.", 
            ResultCode: "JobPost_Create_Success", 
        }])
    } catch (err) {
        console.log(err);        
        res.status(500).send([{            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        }]);
    }
};


exports.updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const updateData = req.body;
        if(req.file) {
            updateData.company_logo = req.file.path;
        }
        const updatePost = await models.recruit_post.update(updateData, {
            where: { id: postId },
        }); // 수정된 사항이 있다면 updatePost[1] == 1 없다면 0
        console.log(updatePost[0]);
        if (updatePost[0] == 0) {
            return res.status(200).json({
                Message: "채용공고 수정사항이 없습니다.",
                ResultCode: "JobPost_No_Update",
            });
        } else if (updatePost[0] > 0){
            return res.status(200).json({
                Message: "채용공고 수정이 완료되었습니다.",
                ResultCode: "JobPost_Update_Success",
            });
        }
    } catch (err) {
        console.log(err);        
        res.status(500).send([{            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        }]);
    }
};