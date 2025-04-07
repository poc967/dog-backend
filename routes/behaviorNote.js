const express = require('express');
const noteRouter = express.Router();
const { BehaviorNote } = require('../models/BehaviorNote');

noteRouter.post('/new', async (request, response) => {
  const { text, dogs } = request.body;
  console.log(request.body);

  let newNote = await new BehaviorNote({
    text,
    dogs,
    created: new Date(),
  });
  newNote.save();

  return response.status(201).json(newNote);
});

noteRouter.get('/:dogId', async (request, response) => {
  const { dogId } = request.params;

  const notes = await BehaviorNote.find({ dogs: dogId })
    .sort({ created: 'desc' })
    .populate('dogs', ['name']);

  return response.status(200).json({ notes, count: notes.length });
});

module.exports = noteRouter;
