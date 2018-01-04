const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes/routes.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const STATUS_GOOD= 200;

const PORT = 3000;

const server = express();

server.use(bodyParser.json());

routes(server);

module.exports = {
  server
};
