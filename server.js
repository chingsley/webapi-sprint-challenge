const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.send("<h1>Let's begin.</h1>");
});

module.exports = server;
