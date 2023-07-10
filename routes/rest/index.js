// //Default routing page (/rest*)
const express = require('express');
const router = express.Router();

router.use('/main', require('./main'));
router.use('/search', require('./recruits'));

module.exports = router;