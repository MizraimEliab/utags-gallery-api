const express = require('express');
const morgan = require('morgan');
const app = express();
const {pool} = require('./database');
const cors = require('cors');

app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/users',require('./routes/users.routes'));

app.listen(process.env.PORT, ()=> {
    console.log("Server On Port ", app.get('port'))
});

