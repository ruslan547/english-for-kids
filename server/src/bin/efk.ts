#!/usr/bin/env node

/* eslint-disable import/first */
require('dotenv').config();

import mongoose from 'mongoose';
import createError, { UnknownError } from 'http-errors';
import createDebug from 'debug';
import app from 'src/app';

const PORT = process.env.PORT || 4000;
const APP_NAME = 'efk';

const debug = createDebug('efk:server');

const onListening = () => {
  const message = `Listening on ${PORT}\n`;

  process.stdout.write(message);
  debug(message);
};

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, onListening);
  } catch (err) {
    throw createError(500, err as UnknownError);
  }
};

debug('booting %o', APP_NAME);
startApp();
