let connect = require('../db/connect');
let user = require('../models/users');
let userAuto = require('../models/usersAuto');
let createError = require('http-errors');

// function to get all Users in the users collection
function getUsers(req, res) {
    try {
        const results = connect.getUsersCollection().find();
        results.toArray().then((doc) => {
            res.status(200).json(doc);
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

//function to get one user from the users collection using the username
function getUser(req, res) {
    let error = '';
    try {
        const username = req.params['username'];
        if (!/^[a-zA-Z]+$/.test(username)) {
            error = createError(400, 'Username is required as Alpha in path');
            throw error;
        }
        const results = connect.getUsersCollection().find({ userName: username });
        /*  #swagger.parameters['username'] = {
                in: 'path',
                description: 'Get a specific user with the username',
                required: true,
                type: String,
                example: 'SuperChef',
                value: 'SuperChef'
            } */
        results.toArray().then((doc) => {
            res.status(200).json(doc[0]);
        });
    } catch (err) {
        if (error !== '') {
            res.status(400).send(error);
        } else {
            res.status(500).send(err);
        }
    }
}

//function to create a new user
function createUser(req, res) {
    try {
        let newUser = new userAuto(req.body);
        userAuto.exists({ userName: newUser.userName }, function (err, doc) {
            if (err) {
                res.send(err);
            } else if (doc !== null) {
                const newerror = createError(400, 'Username already exists');
                res.status(400).send(newerror);
            } else {
                const userString = JSON.stringify(newUser, null, 2);
                newUser.save();
                res.status(200).send(userString);
            }
        });
        /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Add a new user using request body',
                schema: {
                    $fName: 'Jon',
                    $lName: 'Doe',
                    $email: 'test@email.com',
                    $userName: 'NewChef',
                    $password: 'P@ssword1'
                }
        } */
    } catch (err) {
        res.status(500).send(err);
    }
}

//function to update a user
function updateUser(req, res) {
    let error = '';
    try {
        const username = req.params['username'];
        if (!/^[a-zA-Z]+$/.test(username)) {
            error = createError(400, 'Username is required as Alpha in path');
            throw error;
        }
        const newUser = new user(req.body);

        user.exists({ userName: newUser.userName }, function (err, doc) {
            if (err) {
                res.send(err);
            } else if (doc !== null) {
                const newerror = createError(400, 'Username already exists');
                res.status(400).send(newerror);
            } else {
                connect.getUsersCollection().findOneAndUpdate({ userName: username }, newUser, { upsert: true }, () => {
                    res.status(200).send(`{"Successfully Updated User": "${newUser.userName}"}`);
                });
            }
        });
        /*  #swagger.parameters['username'] = {
                in: 'path',
                description: 'Get a specific user with the username and change contents with request body',
                required: true,
                type: String,
                example: 'SuperChef',
                value: 'SuperChef'
        }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update a user using request body',
            schema: {
                $fName: 'Jon',
                $lName: 'Doe',
                $email: 'test@email.com',
                $userName: 'SuperChef',
                $password: 'P@ssword1'
            }
        } */
    } catch (err) {
        if (error !== '') {
            res.status(400).send(error);
        } else {
            res.status(500).send(err);
        }
    }
}

//function to delete a user using the username
function deleteUser(req, res) {
    let error = '';
    try {
        const username = req.params['username'];
        if (!/^[a-zA-Z]+$/.test(username)) {
            error = createError(400, 'Username is required as Alpha in path');
            throw error;
        }
        /*  #swagger.parameters['username'] = {
                in: 'path',
                description: 'Get a specific user by username and delete it from the database.',
                required: true,
                type: String,
                example: 'SuperChef',
                value: 'SuperChef'
        } */
        user.findOneAndDelete({ userName: username }, (err, docs) => {
            if (err) {
                error = createError(400, 'There was an error with the delete request.');
                throw error;
            } else {
                docs = JSON.stringify(docs, null, 2);
                res.status(200).send(`{"Successfully Delete User": ${docs}}`);
            }
        });
    } catch (err) {
        if (error !== '') {
            res.status(400).send(error);
        } else {
            res.status(500).send(err);
        }
    }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
