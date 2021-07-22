const express = require('express');
const morgan = require('morgan');
const app = express();
const {pool} = require('./database');
const cors = require('cors');


app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: ['https://utagsgallery-codes.herokuapp.com', 'http://localhost:4200']})); //http://localhost:4200 {origin: 'https://utagsgallery-codes.herokuapp.com'}

app.use('/users',require('./routes/users.routes'));
app.use('/channels',require('./routes/channels.routes'));
app.use('/posts',require('./routes/posts.routes'));

app.listen(3000, ()=>{//process.env.PORT, ()=> {
    console.log("Server On Port ", app.get('port'))
});

