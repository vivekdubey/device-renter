const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const {authenticate, authCallback } = require('../controllers/auth');

authRouter.get('/', authenticate);
authRouter.get('/callback', authCallback);

module.exports = authRouter;
