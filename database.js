const {Pool} = require('pg');

const pool = new Pool({
    host:  'localhost',//process.env.HOSTG, //localhost
    // ssl: {
    //     rejectUnauthorized: false,
    //     ca: '',
    //     key: '',
    //     cert: '',
    //   },
    user: 'postgres',//process.env.USERG, //postgres
    password: 'postgres', //process.env.PASSG, //postgres
    database: 'gallerydb', //process.env.DBG, //gallerydb
    port:  '5432'//process.env.PORTG //5432
});
console.log('DB is connected');

module.exports = {Pool,pool}
