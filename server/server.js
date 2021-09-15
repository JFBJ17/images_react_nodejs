const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const cors = require('cors');
const path = require('path');

const app = express();

// Settings
app.set('port', process.env.PORT | 9000);

// Middleware
app.use(myconn(mysql, {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'images'
}));

app.use(cors());
app.use(express.static(path.join(__dirname, 'dbimages')));

// Routes
app.use(require('./routes/routes'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});