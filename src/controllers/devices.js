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

const getBorrowHistory = async ( request, response ) => {
  try {
    let res = await devices.getBorrowHistory();
    response.render('borrowHistory', { page:'Device Borrow Latest History', menuId:'borrow_history', history: res});
    // response.status(200).json(res)
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

const getBorrowed = async ( request, response ) => {
  try {
    let res = await devices.getBorrowed();
    response.render('borrowedDevices', { page:'List of borrowed devices', menuId:'borrowed_device_list', devices: res});
    // response.status(200).json(res)
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

const getBorrowForm = async (request, response) => {
  try {
    let res = await devices.getAvailable();
    response.render('borrowDevice', { page:'Borrow Device Form', menuId:'borrow_device', devices: res});
  } catch(err) {
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
    const { nickName, borrowerEmail } = request.body;
    const authorizer = request.user.username;
    const res = await devices.borrow(nickName, authorizer, borrowerEmail);
    response.render('deviceBorrowed', { page:'Device Borrowed Message!', menuId:'device_list', nickName: nickName, authorizer: authorizer, borrowerEmail: borrowerEmail});
    // response.status(200).json({message: res})
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

const returnDeviceForm = async (request, response) => {
  try {
    const res = await devices.getBorrowed();
    response.render('returnDevice', { page:'Return Device Form', menuId:'borrow_device', devices: res});
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}
const returnDevice = async (request, response) => {
  try {
    const {nickName} = request.body;
    const authorizer = request.user.username;
    const res = await devices.returnDevice(nickName, authorizer);
    response.render('deviceReturned', { page:'Device Returned Message!', menuId:'device_list', nickName: nickName, authorizer: authorizer});
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

module.exports = {
  list,
  getAvailable,
  borrow,
  returnDevice,
  addDevice,
  getAddForm,
  getBorrowForm,
  getBorrowed,
  returnDeviceForm,
  getBorrowHistory
}
