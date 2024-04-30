const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');

// import routers
const dogRouter = require('./routes/dog');

mongoose.connect('mongodb://127.0.0.1:27017/dog-local');
app.use(express.json());
app.use('/dog', dogRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
