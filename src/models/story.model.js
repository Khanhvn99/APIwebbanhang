const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const Schema = mongoose.Schema;
const StorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    content: String,
    image: String,
    cost: String,
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  },
);
const StoryModel = mongoose.model('story', StorySchema);
module.exports = StoryModel;
