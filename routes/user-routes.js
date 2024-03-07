const express = require('express');
const register = require('../controllers/user/register.js');
const login = require('../controllers/user/login.js');

const userRoutes = express.Router();

userRoutes.post('/register', register);

userRoutes.post('/login', login);

module.exports = userRoutes;
