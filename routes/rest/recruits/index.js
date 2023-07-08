const express = require('express');
const router = express.Router();

const {
    getRecruits    
} = require('./recruit.js');

router.get('/:page', getRecruits);

module.exports = router;