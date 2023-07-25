const express = require('express');
const router = express.Router();
const cors = require('cors');

const options={
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
};

<<<<<<< HEAD
router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

router.use(cors(options));
router.use('/rest', require('./rest'));
=======
router.use(cors(options));
router.use('/rest', require('./rest/'));

>>>>>>> edd45f230cb888743dbde3d1833e13aee66dcd6e
// router.get('/rest/join', renderJoin);
// router.get('/rest/profile', renderProfile);

module.exports = router;