const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../../../middlewares');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { afterUploadImage, uploadPost } = require('./job.js')

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
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: { fileSize: 50 * 1024 * 1024 },
});

router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);
 

// 에러 핸들링
router.get('/', (req, res)=>{
    res.status(405).send([{
            Message: "Method not allowed", 
            ResultCode: "ERR_INVALID_DATA"            
        }]);
    return res;
});

router.use((req, res, next) => {
    res.status(400).send([{
        Message: "Invalid parameter", 
        ResultCode: "ERR_INVALID_PARAMETER"   
    }]);
    return res;
});

module.exports = router;