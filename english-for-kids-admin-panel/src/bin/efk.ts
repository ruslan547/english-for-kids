#!/usr/bin/env node

require('dotenv').config();

const app = require('../app');

const PORT = process.env.PORT || 4000;

const onListening = () => {
  const str = `Listening on ${PORT}\n`;

  process.stdout.write(str);
};

app.listen(PORT, onListening);
