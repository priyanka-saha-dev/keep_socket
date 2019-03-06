const express = require('express');
let app = express();
const api = require('./api/v1');



app.use('/api/v1',api);

module.exports = app;