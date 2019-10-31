const express = require('express');
const deviceRouter = express.Router();
const devices = require('../controllers/devices');

deviceRouter.get('/', devices.list);
deviceRouter.get('/get-available', devices.getAvailable);
deviceRouter.post('/borrow', devices.borrow);
deviceRouter.post('/return', devices.returnDevice);
deviceRouter.post('/add', devices.addDevice);
module.exports = deviceRouter;
