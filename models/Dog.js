const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  text: String,
  priority: { type: String, enum: ['danger', 'good', 'info'] },
  isRemoved: Boolean,
});

const DogSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  dob: { type: Date },
  friends: [Schema.types.ObjectId],
  level1: { type: String, enum: ['green', 'yellow', 'red', 'purple', 'blue'] },
  level2: { type: String, enum: ['green', 'yellow', 'red', 'purple', 'blue'] },
  location: Schema.types.ObjectId,
  imageUrl: String,
  alerts: [AlertSchema],
  diet: [AlertSchema],
  behavior: [AlertSchema],
  medical: [AlertSchema],
  misc: [AlertSchema],
});

const Dog = new mongoose.model('Dog', DogSchema);
const Alert = new mongoose.model('Alert', AlertSchema);

module.exports = { Dog, Alert };
