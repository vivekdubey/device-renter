const express = require('express');
const deviceRouter = express.Router();
const devices = require('../controllers/devices');
const {ensureLoggedIn } = require('connect-ensure-login')
const {authenticate, authCallback } = require('../controllers/auth');

deviceRouter.get('/',ensureLoggedIn('/auth') , devices.list);
deviceRouter.get('/get-available', devices.getAvailable);
deviceRouter.post('/borrow', devices.borrow);
deviceRouter.post('/return', devices.returnDevice);
deviceRouter.post('/add', devices.addDevice);
module.exports = deviceRouter;
