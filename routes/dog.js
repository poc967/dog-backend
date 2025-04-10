const express = require('express');
const dogRouter = express.Router();
const {
  createDog,
  editDog,
  getDogById,
  getDogs,
  addWhiteboard,
  deleteWhiteboard,
} = require('../controllers/dog');

dogRouter.post('/', createDog);
dogRouter.get('/', getDogs);
dogRouter.put('/:dogId', editDog);
dogRouter.get('/:dogId', getDogById);
dogRouter.post('/:dogId/:type', addWhiteboard);
dogRouter.delete('/:dogId/:type/:id', deleteWhiteboard);

module.exports = dogRouter;
