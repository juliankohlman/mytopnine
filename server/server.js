const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes/routes.js');

const PORT = 3000;

const server = express();
server.use(bodyParser.json());

routes(server);

module.exports = {
  server
};
