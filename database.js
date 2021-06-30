const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'gallery_db',
    port: '5432'
});
console.log('Base de datos conectada');

module.exports = {Pool,pool}