const config = require('../config')();
const Pool = require('pg').Pool
module.exports = new Pool(config.db);
