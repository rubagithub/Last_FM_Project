const express = require('express');
const { artistsController } = require('./controller');

const artistsRouter = express.Router();

artistsRouter.get('/', artistsController);

module.exports = artistsRouter;