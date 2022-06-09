let connect = require('../db/connect');
let recipe = require('../models/recipes');
let createError = require('http-errors');

//function to get all the recipes in the recipes collection
function getRecipes(req, res) {
    try {
        const results = connect.getRecipesCollection().find();
        results.toArray().then((doc) => {
            res.status(200).json(doc);
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

//function to add a new recipe to the recipes collection
function createRecipe(req, res) {
    try {
        const newRecipe = new recipe(req.body);
        recipe.exists({ name: newRecipe.name }, function (err, doc) {
            if (err) {
                res.send(err);
            } else if (doc !== null) {
                const newerror = createError(400, 'Recipe already exists');
                res.status(400).send(newerror);
            } else {
                const recipeString = JSON.stringify(newRecipe, null, 2);
                newRecipe.save();
                res.status(200).send(recipeString);
            }
        });
        /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Add a new recipe using request body',
                schema: {
                    $name: 'Grilled Cheese',
                    $description: 'Grilled sandwiches are awesome',
                    $imageURL: './images/image.png',
                    $ingredients: ['bread', 'cheese', 'butter'],
                    $steps: 'How to make a grilled cheese',
                    $categories: ['lunch', 'dinner'],
                    $methods: ['grill', 'oven', 'pan']
                }
        } */
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { getRecipes, createRecipe };
