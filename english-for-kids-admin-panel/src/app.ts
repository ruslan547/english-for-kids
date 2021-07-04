export { };
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

app.get('/', (req: any, res: any) => {
  res.send('ok');
});

module.exports = app;
