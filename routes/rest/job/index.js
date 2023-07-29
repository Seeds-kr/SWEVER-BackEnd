const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../../../middlewares');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { uploadPost } = require('./job.js')

try {
    fs.readdirSync('uploads');
} catch (error) {
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            console.log(file);
            const ext = path.extname(file.originalname);
            cb(null, "fndr" + Date.now() + ext);
        }
    }),
    limits: { fileSize: 50 * 1024 * 1024 },
});

// 채용공고 등록 
router.post('/post', isLoggedIn, upload.single('img'), uploadPost);
 
// 채용공고 에러 핸들링
router.get('/post', (req, res)=>{
    res.status(405).send([{
            Message: "Method not allowed", 
            ResultCode: "ERR_INVALID_DATA"            
        }]);
    return res;
});

// 채용공고 수정 
router.patch('/')

module.exports = router;