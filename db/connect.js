const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

let _client;
let _usersCollection;
let _recipesCollection;

// initialize database
const initDB = () => {
    mongoose.connect(process.env.DB_URI, (err, client) => {
        if (err) throw err;
        _client = client;
        _usersCollection = _client.db.collection('users');
        _recipesCollection = _client.db.collection('recipes');
    });
};

// get user data from database
const getUsersCollection = () => {
    return _usersCollection;
};

// get user data from database
const getRecipesCollection = () => {
    return _recipesCollection;
};

module.exports = { initDB, getUsersCollection, getRecipesCollection };
