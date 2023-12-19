const express = require('express');

const { login, register } = require('../app/controllers/auth');
const { isAuthentication } = require('../app/middlewares/isAuthentication');
const { isAdmin } = require('../app/middlewares/isAdmin');

const router = express.Router();

router.post('/login', login);
router.post('/register', isAuthentication, isAdmin, register);

module.exports = router;
