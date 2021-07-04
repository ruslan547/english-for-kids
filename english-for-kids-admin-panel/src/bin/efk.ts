require('dotenv').config();

const app = require('../app');

const PORT = process.env.PORT || 4000;

const onListening = () => {
  process.stdout.end(`Listening on ${PORT}`);
};

app.listen(PORT, onListening);
