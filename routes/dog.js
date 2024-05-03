const express = require('express');
const dogRouter = express.Router();
const {
  createDog,
  editDog,
  getDogById,
  getDogs,
  addWhiteboard,
} = require('../controllers/dog');

dogRouter.post('/', createDog);
dogRouter.get('/', getDogs);
dogRouter.put('/:dogId', editDog);
dogRouter.get('/:dogId', getDogById);
dogRouter.post('/:dogId/:type', addWhiteboard);

module.exports = dogRouter;
