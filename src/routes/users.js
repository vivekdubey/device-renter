const express = require('express');
const userRouter = express.Router();
const users = require('../controllers/users');

userRouter.get('/', users.getUsers);
userRouter.post('/update-password', users.updatePassword);
userRouter.post('/delete-user', users.deleteUser);
userRouter.post('/create', users.createUser);

module.exports = userRouter;
