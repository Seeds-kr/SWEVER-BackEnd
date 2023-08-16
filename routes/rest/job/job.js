const fs = require('fs').promises;
const models = require('../../../models');

exports.uploadPost = async (req, res, next) => {
    // req.body.content, req.body.url
    try {
        console.log(req.body);
        const createData = {
            creator_id: req.user.id,
            nation_id: 1,
            company_name: req.body.company_name,
            description_title: req.body.description_title,
            description_content: req.body.description_content,
            company_apply_link: req.body.company_apply_link,
            posted_date: Math.floor(Date.now() / 1000),
            is_visa_sponsored: req.body.is_visa_sponsored,
            is_remoted: req.body.is_remoted,
            is_dev: 1,
            salary: req.body.salary,
            contract_form: req.body.contract_form,
            company_page_link: req.body.company_apply_link,
            origin: "fndr",
            tag: req.body.tag,
            location: req.body.location
        }
        if(req.file) {
            createData.company_logo = req.file.path;
        }
        const post = await models.recruit_post.create(createData);
        return res.send({
            Message: "채용공고 등록이 완료되었습니다.", 
            ResultCode: "JobPost_Create_Success", 
        })
    } catch (err) {
        console.log(err);        
        res.status(500).send({            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        });
    }
};


exports.updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const oldCompanyLogo = req.body.old_company_logo;
        const updateData = {
            nation_id: req.body.nation_id,
            company_name: req.body.company_name,
            description_title: req.body.description_content,
            description_content: req.body.description_content,
            company_apply_link: req.body.company_apply_link,
            is_visa_sponsored: req.body.is_visa_sponsored,
            is_remoted: req.body.is_remoted,
            is_dev: req.body.is_dev,
            salary: req.body.salary,
            contract_form: req.body.contract_form,
            company_apply_link: req.body.company_apply_link,
            tag: req.body.tag,
            location: req.body.location,
            updated_at: new Date()
        }
        if(req.file) {
            try {
                updateData.company_logo = req.file.path;
                if (oldCompanyLogo) {
                    await fs.access(oldCompanyLogo)
                    await fs.unlink(oldCompanyLogo);
                    console.log(`기존 로고 삭제 성공`);
                }
            } catch (error) {
                if (error.code === 'ENOENT') {
                    console.error(`존재하지 않는 로고: ${oldCompanyLogo}`);
                } else {
                    console.error(`기존 로고 삭제 실패: ${oldCompanyLogo}`, error);
                }
            }
        }
        console.log(updateData);
        const post = await models.recruit_post.findOne({ attributes: [ 'creator_id' ], where: { id: postId }});
        if (!post) {
            return res.status(404).json({
                Message: "존재하지 않는 채용공고입니다.",
                ResultCode: "JobPost_Not_Exist",
            });
        }
        const post_creator_id = post.creator_id;
        if (userId == 1 || userId == post_creator_id) {
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
        } else {
            return res.status(404).json({
                Message: "채용공고 작성자가 일치하지 않습니다.",
                ResultCode: "JobPost_Delete_Success",
            });
        }
    } catch (err) {
        console.log(err);        
        res.status(500).send({            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        });
    }
};


exports.deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const post = await models.recruit_post.findOne({ attributes: [ 'creator_id', 'company_logo' ], where: { id: postId }});
        if (!post) {
            return res.status(404).json({
                Message: "존재하지 않는 채용공고입니다.",
                ResultCode: "JobPost_Not_Exist",
            });
        }
        const post_creator_id = post.creator_id;
        const oldCompanyLogo = post.company_logo;
        console.log(post);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~")
        console.log(post_creator_id);
        console.log(oldCompanyLogo);
        if (userId == 1 || userId == post_creator_id) {
            const deletePost = await models.recruit_post.destroy({
                where: { id: postId }
            });
            console.log(deletePost);
            if (deletePost == 1){
                if(oldCompanyLogo) {
                    try {
                        if (oldCompanyLogo) {
                            await fs.access(oldCompanyLogo)
                            await fs.unlink(oldCompanyLogo);
                            console.log(`기존 로고 삭제 성공`);
                        }
                    } catch (error) {
                        console.log("로고 에러:", error);
                        if (error.code === 'ENOENT') {
                            console.error(`존재하지 않는 로고: ${oldCompanyLogo}`);
                        } else {
                            console.error(`기존 로고 삭제 실패: ${oldCompanyLogo}`, error);
                        }
                    }
                }   
                return res.status(200).json({
                    Message: "채용공고 삭제가 완료되었습니다.",
                    ResultCode: "JobPost_Delete_Success",
                });
            }
        } else {
            return res.status(404).json({
                Message: "채용공고 작성자가 일치하지 않습니다.",
                ResultCode: "JobPost_Delete_Success",
            });
        }
    } catch (err) {
        console.log(err);        
        res.status(500).send({            
            Message: "Internal server error", 
            ResultCode: "ERR_INTERNAL_SERVER"
        });
    }
};