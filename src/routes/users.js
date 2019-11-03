const express = require('express');
const userRouter = express.Router();
const users = require('../controllers/users');
const {ensureLoggedIn } = require('connect-ensure-login')
const { isAuthorized } = require('../middleware/authorized');

userRouter.get('/', users.getUsers);
userRouter.post('/delete-user', ensureLoggedIn('/auth'), isAuthorized, users.deleteUser);
userRouter.post('/add-user', ensureLoggedIn('/auth'), isAuthorized, users.createUser);

module.exports = userRouter;
