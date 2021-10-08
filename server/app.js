const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression')

const indexRouter = require('./routes/index');

const app = express();

app.use(cors()) // Enable cors
app.use(helmet()) // Protect api
app.use(logger('dev')); // Logging on requests
app.use(express.json()); // Able to use JSON
app.use(express.urlencoded({ extended: true })); // Able to recognize string and arrays
app.use(compression()) // Compress requests - improved speed

app.use('/', indexRouter);

module.exports = app;
