const mongoose = require('mongoose');

const BehaviorNoteSchema = new mongoose.Schema({
  text: { type: String, trim: true },
  dogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dog' }],
  created: { type: Date, default: Date.now() },
});

const BehaviorNote = mongoose.model('BehaviorNote', BehaviorNoteSchema);

module.exports = { BehaviorNote };
