// //Default routing page (/rest*)
const express = require('express');
const router = express.Router();

router.use('/main', require('./main'));
router.use('/search', require('./recruits'));
<<<<<<< HEAD
router.use('/detail', require('./detail'));
router.use('/auth', require('./auth'));
=======
router.use('/review', require('./reviews'));
>>>>>>> edd45f230cb888743dbde3d1833e13aee66dcd6e

module.exports = router;