const express = require('express');
const router = express.Router();
const cors = require('cors');

const options={
	origin: ["https://www.fndr.tech","http://www.fndr.tech","http://localhost:3000","http://www.fndr.tech:3000", "https://www.fndr.tech:3000"],
    credentials: true,
    optionSuccessStatus: 200
};
router.use((req, res, next) => {
    res.locals.user = req.user;
    req.session;
    next();
});

router.use(cors(options));
router.get("/", (req, res) => res.redirect("/rest/main"));
router.use('/rest', require('./rest'));
// router.get('/rest/join', renderJoin);
// router.get('/rest/profile', renderProfile);

module.exports = router;
