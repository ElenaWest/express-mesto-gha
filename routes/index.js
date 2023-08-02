const express = require('express');

const routes = express();

routes.use('/users', require('./users'));
routes.use('/cards', require('./cards'));

module.exports = routes;
