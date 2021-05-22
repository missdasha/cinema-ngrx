const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION. App crashed...');
  console.log(err.name, err.message, err);

  process.exit(1);
});

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (config.get('originsWhiteList').includes(origin)) {
      callback(null, true);
    }
    else {
      callback(null, false);
    }
  }
}));
app.use(bodyParser.json());
app.use('/auth', require('./routes/auth.routes'));
app.use('/films', require('./routes/films.routes'));
app.use('/cinemas', require('./routes/cinemas.routes'));
app.use('/seances', require('./routes/seances.routes'));
app.use('/services', require('./routes/services.routes'));
app.use('/orders', require('./routes/orders.routes'));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});
app.all('*', (req, res) => {
  res.sendStatus(404);
});

const PORT = config.get('port') || 3000;
let server;

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    server = app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))

  }
  catch (e) {
    if (e) {
      console.log('Server error', e.message);
      process.exit(1);
    }
  }
}
start();

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION. App crashed...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
