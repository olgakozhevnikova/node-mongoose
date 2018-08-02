const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
},{
  timestamps: true // it automatically adds 2 timestamps - created at and updated at - into each document
});

// constructs a model from the schema
const Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;
