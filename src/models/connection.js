const { db } = require('../config');
const Pool = require('pg').Pool
module.exports = new Pool(db);
