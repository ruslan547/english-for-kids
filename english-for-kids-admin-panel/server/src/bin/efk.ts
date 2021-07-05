#!/usr/bin/env node

require('dotenv').config();

const debug = require('debug')('efk:server');
const mongoose = require('mongoose');
const createError = require('http-errors');
const app = require('../app');

const PORT = process.env.PORT || 4000;
const APP_NAME = 'efk';

const onListening = () => {
  const message = `Listening on ${PORT}\n`;

  process.stdout.write(message);
  debug(message);
};

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, onListening);
  } catch (err) {
    throw createError(500, err.message);
  }
};

debug('booting %o', APP_NAME);
startApp();
