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
    // means it will be executed: finds all dishes in db and makes them available to use
    return Dishes.find({}).exec();
  })
  .then((dishes) => {
    console.log(dishes);
    // make databas empty
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
