const { Dog } = require('../models/Dog');
const { Activity } = require('../models/Activity');
const { BehaviorNote } = require('../models/BehaviorNote');

async function createActivity(request, response) {
  const { dogs, type, location, behaviorNote } = request.body;

  // create behavior note
  let newNote = null;
  if (behaviorNote) {
    newNote = await new BehaviorNote({ text: behaviorNote, dogs: dogs });
    newNote.save();
  }

  let dogData = await Dog.find({ _id: { $in: dogs } });

  let baseActivityFields = {
    activity: type,
    location,
    behaviorNote: newNote ? newNote['_id'] : null,
    time: new Date(),
  };

  for (dog of dogData) {
    let prevLocation = dog['location'] ? dog['location'] : null;
    dog['location'] = location;
    if (type == 'walk') {
      dog['isWalking'] = true;
    }
    dog.save();

    let friends = dogData.filter((friend) => friend['_id'] != dog['_id']);

    let specificActivityFields = {
      friends,
      dog: dog['_id'],
    };

    if (type == 'move' || type == 'walk') {
      specificActivityFields['previous_location'] = prevLocation;
    }

    let newActivity = await new Activity({
      ...specificActivityFields,
      ...baseActivityFields,
    });
    newActivity.save();
  }

  return response.status(200).json({ message: 'success', isSuccessful: true });
}

async function completeWalk(request, response) {
  let { dogIds, time } = request.body;

  if (!time) {
    time = Date.now();
  }

  // TODO: find activities that don't already contain a end_time
  let activities = await Activity.find({
    dog: { $in: dogIds },
    end_time: { $exists: false },
  });

  if (activities.length == 0) {
    return response
      .status(400)
      .json({ message: 'Activity not found', isSuccessful: false });
  }

  let dog;
  for (activity of activities) {
    // TODO: We will want to add support to end the walk in a new location than we began or fall back automatically to the origin destination
    // Currently we are not updating their location at all post walk
    dog = await Dog.findById(activity.dog);
    dog.location = activity.previous_location;
    dog.isWalking = false;
    dog.save();
    await dog.populate('location');

    activity['end_time'] = time;
    activity.save();
  }

  return response
    .status(200)
    .json({ data: dog.toObject(), isSuccessful: true });
}

async function getActivitiesByDog(request, response) {
  const { dogId } = request.params;
  let currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const timezoneOffset = -(currentDate.getTimezoneOffset() / 60);
  currentDate = new Date(year, month, day, 0, 0, 0, 0);

  let activities = await Activity.find({
    dog: dogId,
    time: { $gte: currentDate },
  })
    .populate('location')
    .populate('friends', ['name'])
    .populate('previous_location')
    .populate('behavior_note');

  return response.status(200).json({ message: activities, isSuccessful: true });
}

module.exports = { createActivity, completeWalk, getActivitiesByDog };
