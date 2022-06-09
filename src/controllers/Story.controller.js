const Story = require('../models/story.model');
class StoryController {
  async createStory(req, res) {
    try {
      const newStory = await new Story({
        name: req.body.name,
        content: req.body.content,
        cost: req.body.cost,
        image: req.body.image,
      });
      const story = await newStory.save();
      return res.status(200).json(story);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async getAllStory(req, res) {
    try {
      const story = await Story.find();
      console.log(story);
      return res.status(200).json(story);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async updateStorys(req, res) {
    try {
      const idStory = await Story.findById(req.params.id);
      const updateStory = await Story.updateOne(
        { _id: idStory._id },
        {
          $set: {
            name: req.body.name,
            content: req.body.content,
            cost: req.body.cost,
            image: req.body.image,
          },
        },
      );
      return res.status(200).json(updateStory);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async deleteStory(req, res) {
    try {
      //const  story = await Story.findById(req.params.id);
      const user = await Story.findByIdAndDelete(req.params.id);
      return res.status(200).json('Delete successfully');
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
module.exports = { StoryController: new StoryController() };
