const express = require('express');
const activityRouter = express.Router();
const {
  createActivity,
  completeWalk,
  getActivitiesByDog,
} = require('../controllers/activity');

activityRouter.post('/', createActivity);
activityRouter.put('/complete-walk', completeWalk);
activityRouter.get('/:dogId', getActivitiesByDog);

module.exports = activityRouter;
