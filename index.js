const express = require('express');
const morgan = require('morgan');
const app = express();
const {pool} = require('./database');
const cors = require('cors');

const whitelist = ['https://utagsgallery-codes.herokuapp.com', 'https://api-utagsgallery-codes.herokuapp.com','localhost:4200']

const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
}

app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions)); //http://localhost:4200 {origin: 'https://utagsgallery-codes.herokuapp.com'}

app.use('/users',require('./routes/users.routes'));
app.use('/channels',require('./routes/channels.routes'));
app.use('/posts',require('./routes/posts.routes'));

app.listen(process.env.PORT, ()=> {
    console.log("Server On Port ", app.get('port'))
});

