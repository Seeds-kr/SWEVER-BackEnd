const express = require('express');
const router = express.Router();
const cors = require('cors');

const options={
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
};

router.use((req, res, next) => {
    res.locals.user = req.user;
    req.session;
    console.log(req.session);
    console.log(1213);
    console.log(req.user);
    next();
})

router.use(cors(options));
router.use('/rest', require('./rest'));
// router.get('/rest/join', renderJoin);
// router.get('/rest/profile', renderProfile);

module.exports = router;