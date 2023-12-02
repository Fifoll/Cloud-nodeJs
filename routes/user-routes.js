import express from 'express';
import register  from '../controllers/user/register.js';
import login from '../controllers/user/login.js';

const userRoutes = express.Router();

userRoutes.post('/register', register);

userRoutes.post('/login', login);

export default userRoutes;