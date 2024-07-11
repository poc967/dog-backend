const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema(
  {
    activity: { type: String, enum: ['walk', 'move'] },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    previous_location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dog' }],
    behavior_note: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BehaviorNote',
    },
    time: { type: Date, default: new Date() },
    end_time: { type: Date },
    dog: { type: mongoose.Schema.Types.ObjectId, ref: 'Dog' },
  },
  {
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = { Activity };
