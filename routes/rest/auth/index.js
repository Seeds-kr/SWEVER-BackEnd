const express = require('express');
const passport = require('passport')
const { isLoggedIn, isNotLoggedIn } = require('../../../middlewares');
const { join, join2, login, logout } = require('./auth');
const router = express.Router();

// router.use((req, res, next) => {
//     res.locals.user = req.user;
// })

// POST /auth/join 
router.post('/join', isNotLoggedIn, join);
// POST /auth/login
// router.post('/login', isNotLoggedIn, login);
// // GET /auth/logout
// router.get('/logout', isLoggedIn, logout);

module.exports = router;