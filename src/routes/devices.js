const express = require('express');
const deviceRouter = express.Router();
const devices = require('../controllers/devices');
const {ensureLoggedIn } = require('connect-ensure-login');
const { isAuthorized } = require('../middleware/authorized');

deviceRouter.get('/', devices.list);
deviceRouter.get('/get-available', devices.getAvailable);
deviceRouter.get('/borrowed', devices.getBorrowed);
deviceRouter.post('/borrow', ensureLoggedIn('/auth'), isAuthorized, devices.borrow);
deviceRouter.get('/borrow', devices.getBorrowForm);
deviceRouter.get('/return', devices.returnDeviceForm);
deviceRouter.post('/return', ensureLoggedIn('/auth'), isAuthorized, devices.returnDevice);
deviceRouter.post('/add', ensureLoggedIn('/auth'), isAuthorized, devices.addDevice);
deviceRouter.get('/add', devices.getAddForm);
module.exports = deviceRouter;
