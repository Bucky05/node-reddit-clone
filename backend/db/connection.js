const config = require('../config/config')
const mysql = require('mysql')
const { promisify} = require('util')
let pool = mysql.createPool(config.dbCredentials);

//By using pool.query = promisify(pool.query), you are effectively replacing the original pool.query method with a new version that returns Promises instead of using callbacks.
pool.query = promisify(pool.query)

module.exports = pool