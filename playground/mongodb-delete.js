const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: true})
  //   .then((result) => {
  //   console.log(result);
  // });

  // deleteMany
  // db.collection('Users').deleteMany({name: 'Pedro'}).then((result) => {
  //   console.log(result);
  // });

  var ObjectId = require('mongodb').ObjectID;

  // findOneAndDelete
  db.collection('Users').findOneAndDelete({
    _id: new ObjectId("5bae7b392f97dab7ae8ba130")
  }).then((results) => {
    console.log(JSON.stringify(results, undefined, 2));
  }, (err) => {
    console.log(err);
  });

  //db.close();
});
