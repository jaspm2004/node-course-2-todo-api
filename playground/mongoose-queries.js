const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/*var id = '5bfbfa48a0dcf943689f80f611';

if (!ObjectID.isValid(id)) {
    return console.log("Id not valid");
}*/

/*Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});*/

/*Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found');
    }

    console.log('Todo By Id', todo);
}).catch((e) => console.log(e));*/

var userId = '5bb26a3d2ad8531c44a25138';

if (!ObjectID.isValid(userId)) {
    return console.log("userId not valid");
}

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('Id not found');
    }

    console.log('User By Id', user);
}).catch((e) => console.log(e));