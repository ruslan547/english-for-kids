#!/usr/bin/env node

require('dotenv').config();

const debug = require('debug')('efk:server');
const app = require('../app');

const PORT = process.env.PORT || 4000;
const APP_NAME = 'efk';

const onListening = () => {
  const message = `Listening on ${PORT}`;

  process.stdout.write(message);
  debug(message);
};

debug('booting %o', APP_NAME);

app.listen(PORT, onListening);
