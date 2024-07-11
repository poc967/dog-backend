const express = require('express');
const settingsRouter = express.Router();
const { Location } = require('../models/Location');

settingsRouter.post('/location', async (request, response) => {
  let name = request.body.name.toLowerCase();
  let walkable = request.body.walkable ? true : false;
  let existingLocations = await Location.find({ name });

  if (existingLocations.length != 0) {
    return response
      .status(400)
      .json({ data: 'Location already exists', isSuccessful: false });
  }

  let newLocation = await new Location({ name, walkable });
  newLocation.save();

  return response
    .status(201)
    .json({ message: 'Location created', isSuccessful: true });
});

settingsRouter.get('/location', async (request, response) => {
  let { walkable } = request.query;

  let query = {};

  if (walkable) {
    query['walkable'] = walkable;
  }

  let locations = await Location.find(query);

  return response.status(200).json({ data: locations, isSuccessful: true });
});

module.exports = settingsRouter;
