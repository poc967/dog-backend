const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  text: { type: String, trim: true },
  priority: { type: String, enum: ['danger', 'good', 'info'] },
  isDeleted: { type: Boolean, default: false },
});

const DogSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  dob: { type: Date },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dog' }],
  level1: { type: String, enum: ['green', 'yellow', 'red', 'purple', 'blue'] },
  level2: { type: String, enum: ['green', 'yellow', 'red', 'purple', 'blue'] },
  location: mongoose.Schema.Types.ObjectId,
  imageUrl: String,
  alerts: [AlertSchema],
  diet: [AlertSchema],
  behavior: [AlertSchema],
  medical: [AlertSchema],
  misc: [AlertSchema],
  isDeleted: { type: Boolean, default: false },
});

const Dog = mongoose.model('Dog', DogSchema);
const Alert = mongoose.model('Alert', AlertSchema);

module.exports = { Dog, Alert };
