// //Default routing page (/rest*)
const express = require('express');
const router = express.Router();

router.use('/main', require('./main'));
router.use('/search', require('./recruits'));
router.use('/detail', require('./detail'));
router.use('/auth', require('./auth'));
// router.use('/likes', require('./likes'));

module.exports = router;