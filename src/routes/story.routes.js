const express = require('express');
const router = express.Router();
const StoryController = require('../controllers/Story.controller').StoryController;
const MiddlewareToken = require('../controllers/Middleware.controller');

router.post('/updatestory/:id', StoryController.updateStorys);
router.post('/create', StoryController.createStory);
router.get('/', StoryController.getAllStory);
router.delete(
  '/:id',
  MiddlewareToken.authenticateAdmin,
  StoryController.deleteStory,
);

module.exports = router;
