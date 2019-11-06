const express = require('express');
const userRouter = express.Router();
const users = require('../controllers/users');
const {ensureLoggedIn } = require('connect-ensure-login')
const { isAuthorized } = require('../middleware/authorized');

userRouter.get('/', ensureLoggedIn('/auth'), users.getUsers);
userRouter.post('/delete', ensureLoggedIn('/auth'), isAuthorized, users.removeUser);
userRouter.get('/delete', users.removeUserForm);
userRouter.post('/add', ensureLoggedIn('/auth'), isAuthorized, users.addUser);
userRouter.get('/add', users.getAddForm);

module.exports = userRouter;
