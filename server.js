const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const projectsRouter = require('./api/projects/projectsRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
  res.send("<h1>Let's begin.</h1>");
});

server.use('/*', (req, res) => {
  res.status(404).json({
    error: "the requested route does not exist in this server. Please ensure that the method and path provided match and are both correct."
  })
})

// use this to catch all 'internal server errors
server.use((err, req, res, next) => {
  res.status(500).json({ err });
})

module.exports = server;
