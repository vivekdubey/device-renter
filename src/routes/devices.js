const express = require('express');
const deviceRouter = express.Router();
const devices = require('../controllers/devices');
const {ensureLoggedIn } = require('connect-ensure-login');
const { isAuthorized } = require('../middleware/authorized');

deviceRouter.get('/',ensureLoggedIn('/auth'), devices.list);
deviceRouter.get('/get-available', ensureLoggedIn('/auth'), devices.getAvailable);
deviceRouter.get('/borrowed', ensureLoggedIn('/auth'), devices.getBorrowed);
deviceRouter.get('/borrow-history', ensureLoggedIn('/auth'), devices.getBorrowHistory);
deviceRouter.post('/borrow', ensureLoggedIn('/auth'), isAuthorized, devices.borrow);
deviceRouter.get('/borrow', devices.getBorrowForm);
deviceRouter.get('/return', devices.returnDeviceForm);
deviceRouter.post('/return', ensureLoggedIn('/auth'), isAuthorized, devices.returnDevice);
deviceRouter.post('/add', ensureLoggedIn('/auth'), isAuthorized, devices.addDevice);
deviceRouter.get('/add', ensureLoggedIn('/auth'), isAuthorized, devices.getAddForm);
module.exports = deviceRouter;
