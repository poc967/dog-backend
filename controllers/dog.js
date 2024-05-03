const { Dog, Alert } = require('../models/Dog');
const { isValidObjectId, default: mongoose } = require('mongoose');

const createDog = async (request, response) => {
  let { name, dob, level1, level2 } = request.body;

  if (!name || !dob || !level1 || !level2) {
    return response
      .status(400)
      .json({ error: 'Missing required param(s)', isSuccessful: false });
  }

  const newDog = await new Dog({ name, dob, level1, level2 });
  newDog.save();

  return response
    .status(201)
    .json({ message: 'Dog created', isSuccessful: true });
};

const editDog = async (request, response) => {
  const { dogId } = request.params;
  const { name, dob, level1, level2, friends } = request.body;

  if (!isValidObjectId(dogId)) {
    return response.status(400).json({
      message: `${dogId} is not a valid ObjectId`,
      isSuccessful: false,
    });
  }

  let dog = await Dog.findById(dogId);

  if (!dog) {
    return response
      .status(400)
      .json({ message: 'Dog not found', isSuccessful: false });
  }

  let updateData = {};

  if (name) {
    updateData = { ...updateData, name };
  }
  if (dob) {
    updateData = { ...updateData, dob };
  }
  if (level1) {
    updateData = { ...updateData, level1 };
  }
  if (level2) {
    updateData = { ...updateData, level2 };
  }
  if (friends) {
    updateData = { ...updateData, friends };
  }

  Object.assign(dog, updateData);

  try {
    await dog.save();
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return response.status(400).json({
        message: `Unexpected values supplied for ${Object.keys(error.errors)}`,
        isSuccessful: false,
      });
    } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return response
        .status(400)
        .json({ message: 'Dog not found', isSuccessful: false });
    } else {
      return response.status(500).json({
        message: `An unknown error occured ${error}`,
        isSuccessful: false,
      });
    }
  }

  return response.status(200).json({ message: dog, isSuccessful: true });
};

const getDogById = async (request, response) => {
  const { dogId } = request.params;

  if (!isValidObjectId(dogId)) {
    return response.status(400).json({
      message: `${dogId} is not a valid ObjectId`,
      isSuccessful: false,
    });
  }

  const dog = await Dog.findById(dogId).populate('friends', [
    'name',
    'level1',
    'level2',
  ]);

  if (!dog) {
    return response
      .status(400)
      .json({ message: 'Dog not found', isSuccessful: false });
  }

  return response.status(200).json({ dog, isSuccessful: true });
};

const getDogs = async (request, response) => {
  const dogs = await Dog.find(
    {
      isDeleted: { $ne: true },
    },
    ['name', 'level1', 'level2', 'location']
  );

  return response.status(200).json({ message: dogs, isSuccessful: true });
};

const addWhiteboard = async (request, response) => {
  const { data, priority } = request.body;
  const { dogId, type } = request.params;

  let dog = await Dog.findById(dogId);

  if (!dog) {
    return response
      .status(400)
      .json({ message: 'Dog not found', isSuccessful: false });
  }

  let newElement = await new Alert({ text: data, priority });

  dog[type].push(newElement);
  dog.save();

  return response.status(201).json({ message: 'Created', isSuccessful: true });
};

const deleteWhiteboard = (request, response) => {};

const editWhiteboard = (request, response) => {};

module.exports = { createDog, editDog, getDogById, getDogs, addWhiteboard };
