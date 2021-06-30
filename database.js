const {Pool} = require('pg');

const pool = new Pool({
    host:  process.env.HOSTG, //localhost
    ssl: {
        rejectUnauthorized: false,
        ca: '',
        key: '',
        cert: '',
      }, 
    user: process.env.USERG, //postgres
    password: process.env.PASSG, //postgres
    database: process.env.DBG, //gallerydb
    port: process.env.PORTG //5432
});
console.log('DB is connected');

module.exports = {Pool,pool}