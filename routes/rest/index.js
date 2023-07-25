// //Default routing page (/rest*)
const express = require('express');
const router = express.Router();

router.use('/main', require('./main'));
router.use('/search', require('./recruits'));
router.use('/detail', require('./detail'));
<<<<<<< HEAD
router.use('/auth', require('./auth'));
=======
<<<<<<< HEAD
=======

>>>>>>> 8b333db6219dd2247b7cef5db39c66f914b0c08f
>>>>>>> 3f92cf9df364f0484f60fba312d82dae28372916
module.exports = router;