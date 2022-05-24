let connect = require('../db/connect');
let user = require('../models/users');

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
    try {
        const username = req.params['username'];
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
        res.status(500).send(err);
    }
}

//function to create a new user
function createUser(req, res) {
    try {
        const newUser = new user(req.body);
        const userString = JSON.stringify(newUser, null, 2);
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
        newUser.save();
        res.status(200).send(userString);
    } catch (err) {
        res.status(500).send(err);
    }
}

//function to update a user
function updateUser(req, res) {
    try {
        const username = req.params['username'];
        // let result = await connect.getUsersCollection().findOne({ userName: username });
        // let filter = { userName: username };
        const newUser = new user(req.body);
        // result = newUser;
        // result.save();
        // const contentString = JSON.stringify(req.body, null, 2);
        // const newUser = new user(req.body);

        // res.status(200).send(contentString);

        connect.getUsersCollection().findOneAndUpdate({ userName: username }, newUser, { upsert: true }, () => {
            res.status(200).send(`Successfully Updated User: ${username}
            ${newUser}
            ${username}`);
        });
        user.save();
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
        // user.findOneAndUpdate(filter, content, { returnOriginal: false });
    } catch (err) {
        res.status(500).send(err);
    }
}

//function to delete a user using the username
function deleteUser(req, res) {
    try {
        const username = req.params['username'];
        /*  #swagger.parameters['username'] = {
                in: 'path',
                description: 'Get a specific user by username and delete it from the database.',
                required: true,
                type: String,
                example: 'SuperChef',
                value: 'SuperChef'
        } */
        user.findOneAndDelete({ userName: username }, () => {
            res.status(200).send(`Successfully Delete User: ${username}`);
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
