const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
// establish the connection using connect() method,
// this method takes url as a parameter to connect to the server
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to server');

  // create() method takes as a parameter a new document that needs to be stored in the database
  // and creates and saves the document in the database
  Dishes.create({
    name: 'Pizza',
    description: 'Test description'
  })
  .then((dish) => {
    console.log(dish);
    // findByIdAndUpdate() method finds the dish and modifies it
    return Dishes.findByIdAndUpdate(dish._id, {
      $set: {description: 'Updated test'}
    },{
      // next line means that once the update of the dish is completed,
      // then exec() will return an updated dish
      new: true
    }).exec();
  })
  .then((dish) => {
    console.log(dish);
    // add new comment to a selected dish
    dish.comments.push({
      rating: 5,
      comment: 'I like this dish',
      author: 'Olga'
    });
    // save the dish after modification
    return dish.save();
  })
  .then((dish) => {
    console.log(dish);
    // make database empty
    return Dishes.remove();
  })
  .then(() => {
    // close the database
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
});
