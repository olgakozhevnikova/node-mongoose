const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  // comments field is an array of the type commentSchema,
  // that means that every dish document has multiple number of comments (objects) stored in an array
  comments: [commentSchema]
},{
  timestamps: true // it automatically adds 2 timestamps - created at and updated at - into each document
});

// constructs a model from the schema
const Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;
