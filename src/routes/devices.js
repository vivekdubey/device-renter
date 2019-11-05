const express = require('express');
const deviceRouter = express.Router();
const devices = require('../controllers/devices');
const {ensureLoggedIn } = require('connect-ensure-login')
const { isAuthorized } = require('../middleware/authorized');

deviceRouter.get('/', devices.list);
deviceRouter.get('/get-available', devices.getAvailable);
deviceRouter.post('/borrow', ensureLoggedIn('/auth'), isAuthorized, devices.borrow);
deviceRouter.post('/return', ensureLoggedIn('/auth'), isAuthorized, devices.returnDevice);
deviceRouter.post('/add', ensureLoggedIn('/auth'), isAuthorized, devices.addDevice);
deviceRouter.get('/add', devices.getAddForm);
module.exports = deviceRouter;
