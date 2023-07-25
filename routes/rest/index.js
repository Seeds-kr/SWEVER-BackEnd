// //Default routing page (/rest*)
const express = require('express');
const router = express.Router();

router.use('/main', require('./main'));
router.use('/search', require('./recruits'));
router.use('/detail', require('./detail'));
<<<<<<< HEAD
=======

>>>>>>> 8b333db6219dd2247b7cef5db39c66f914b0c08f
module.exports = router;