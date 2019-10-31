const db = require('./connection');
const { deviceUnavailableMessage } = require('../response-messages');
const { devicesTable, available, unAvailable, decommissioned } = require("../constants");

const list = async () => {
  try {
    const queryStr = `SELECT nickName, type, os, version, status FROM ${devicesTable} ORDER BY id ASC`;
    let res = await db.query(queryStr);
    return res.rows;
  } catch (err) {
    throw new Error (err.message)
  }
}

const addDevice = async ({nickName, type, os, version }) => {
  try {
    const queryStr = `INSERT INTO ${devicesTable} (nickName, type, os, version) VALUES ($1, $2, $3, $4)`
    await db.query(queryStr, [nickName, type, os, version]);
    return `Device added successfully. Nickname: ${nickName}, OS: ${os}, Type: ${type}, Version: ${version}`;
  } catch (err) {
    throw new Error (err.message)
  }
}

const isUnAvailable = async () => {
  try {
    const queryStr = `SELECT status FROM ${devicesTable} where status = $1`;
    let res = await db.query(queryStr, [available]);
    return res.rows.length == 0;
  } catch (err) {
    throw new Error (err.message)
  }
}
const returnDevice = async ({nickName}) => {
  try {
    const queryStr = `UPDATE ${devicesTable} SET status = $1 where nickname = $2`;
    await db.query(queryStr, [available, nickName]);
    return `Device: ${nickName} returned.`;
  } catch (err) {
    throw new Error (err.message)
  }
}
const utcTimestamp = () => {
  return new Date(new Date().toUTCString());
}

const borrow = async ({nickName, authorizer, borrowerEmail}) => {
  try {
    if( await isUnAvailable()) {
      return deviceUnavailableMessage;
    }
    const queryStr = `UPDATE ${devicesTable} SET authorizer = $1, borrower_email = $2, status = $3, borrowed_date = $4  where nickname = $5`;
    await db.query(queryStr, [authorizer, borrowerEmail, unAvailable, utcTimestamp(), nickName]);
    return `Device: ${nickName} borrowed to : ${borrowerEmail} by ${authorizer}`;
  } catch (err) {
    throw new Error (err.message)
  }
}

const getAvailable = async () => {
  try {
    const queryStr = `SELECT nickName, type, os, version FROM ${devicesTable} where status = $1`;
    let res = await db.query(queryStr, [available]);
    return res.rows;
  } catch (err) {
    throw new Error (err.message)
  }
}

module.exports = {
  list,
  getAvailable,
  borrow,
  returnDevice,
  addDevice
}
