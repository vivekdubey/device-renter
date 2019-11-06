const devices = require('../models/devices');
const message = require('../response-messages');

const getAvailable = async ( request, response ) => {
  try {
    let res = await devices.getAvailable();
    response.status(200).json(res)
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

const getAddForm = (request, response) => {
  response.render('addDevice', {page:'New Device Form', menuId:'add_device'});
}

const list = async (request, response) => {
  try {
    let res = await devices.list();
    // response.render('devices', { devices: res });
    response.render('devices', {page:'Device List', menuId:'device_list', devices: res});
    // response.status(200).json(res)
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

const borrow = async (request, response) => {
  try {
    const res = await devices.borrow(request.body);
    response.status(200).json({message: res})
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

const addDevice = async (request, response) => {
  try {
    const res = await devices.addDevice(request.body);
    response.render('deviceAdded', {payload: request.body, page:'Success Message!', menuId:'device_list'});
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}


const returnDevice = async (request, response) => {
  try {
    const res = await devices.returnDevice(request.body);
    response.status(200).json({message: res})
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

module.exports = { list, getAvailable, borrow, returnDevice, addDevice, getAddForm}
