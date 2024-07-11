const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  walkable: { type: Boolean },
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = { Location };
