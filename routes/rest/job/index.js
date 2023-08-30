const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn} = require('../../../middlewares');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { uploadPost, updatePost, deletePost } = require('./job.js')

aws.config.update({
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3         : s3,
        bucket     : process.env.AWS_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key        : (req, file, callback) => {
            console.log(file);                        
            const ext = path.extname(file.originalname);
            // 콜백 함수 두 번째 인자에 파일명(경로 포함)을 입력
            callback(null, `image/fndr${Date.now()}_${ext}`);
        },
        acl        : 'public-read-write'
    })
});

// 채용공고 등록
router.post('/', isLoggedIn, upload.single('company_logo'), uploadPost);


// 채용공고 에러 핸들링
router.get('/', (req, res)=>{
    res.status(405).send({
            Message: "Method not allowed", 
            ResultCode: "ERR_INVALID_DATA"            
        });
    return res;
});

// 채용공고 수정 
router.patch('/:id', isLoggedIn, upload.single('company_logo'), updatePost);

// 채용공고 삭제 
router.delete('/:id', isLoggedIn, deletePost);

// 채용공고 에러 핸들링 
router.get('/:id', (req, res)=>{
    res.status(405).send({
            Message: "Method not allowed", 
            ResultCode: "ERR_INVALID_DATA"            
        });
    return res;
});

module.exports = router;