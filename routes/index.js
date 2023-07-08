var express = require('express');
var router = express.Router();

//router.use('/rest', require('./rest/'));
router.use('/rest/search', require('./rest/recruits'));

module.exports = router;