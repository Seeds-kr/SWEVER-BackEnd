const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');

exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${ req.file.filename }` });
};

exports.uploadPost = async (req, res, next) => {
    // req.body.content, req.body.url
    try {
        console.log(req);
        console.log(4325245345);
        console.log(req.body);
        const post = await models.recruit_post.create({
            creator_id: req.user.id,
            nation_id: 1,
            company_name: "test",
            description_title: "test",
            description_content: "test",
            company_apply_link: "test",
            posted_date: 1234,
            is_visa_sponsored: 1,
            is_remoted: 1,
            is_dev: 1,
            company_logo: null,
            salary: null,
            contract_form: null,
            company_page_link: null,
            origin: "fndr",
            tag: null,
            location: "test"
        })
        return res.send([{
            Message: "채용공고 등록이 완료되었습니다.", 
            ResultCode: "JobPost_Create_Success", 
        }])
    } catch (error) {
        console.log(error);
        next(error);
    }
};