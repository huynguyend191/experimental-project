const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const filesRoutes = require('./routes/files');
const emailRoutes = require('./routes/email');
const staffRoutes = require('./routes/staff');
const accountRoutes = require('./routes/accounts');

app.use(morgan('common'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true
  }),
);

app.use('/files', filesRoutes);
app.use('/email', emailRoutes);
app.use('/staffs', staffRoutes);
app.use('/accounts', accountRoutes);


//TODO user api user using transaction, authenticate

module.exports = app;
