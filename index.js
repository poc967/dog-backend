const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const cors = require('cors');

// import routers
const dogRouter = require('./routes/dog');
const activityRouter = require('./routes/activity');
const settingsRouter = require('./routes/settings');

mongoose.connect('mongodb://127.0.0.1:27017/dog-local');
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Incoming request URL:', req.url);
  next();
});
app.use('/dog', dogRouter);
app.use('/activity', activityRouter);
app.use('/settings', settingsRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
