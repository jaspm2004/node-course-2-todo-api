require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
      text: req.body.text
    });

    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/12345667
app.get('/todos/:id', (req, res) => {  
  var id = req.params.id;

  // valid id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (todo) {
      res.send({todo});
    } else {
      res.status(404).send();
    }
  }, (e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {  
  // get the id
  var id = req.params.id;  

  // if id not valid, 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {    
    if (todo) {
        res.status(200);
        res.send({todo})        
      } else {
        res.status(404).send();
      }
    }, (e) => {
      res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;  
  var body = _.pick(req.body, ['text', 'completed']);

  // if id not valid, 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (todo) {
      res.status(200);
      res.send({todo});
    } else {
        res.status(404).send();
      }
    }, (e) => {
      res.status(400).send();
    });
})

app.listen(process.env.PORT, () => {
  console.log(`Started up on port ${process.env.PORT}`);
});

module.exports = {app};
