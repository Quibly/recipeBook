let connect = require('../db/connect');
let recipe = require('../models/recipes');

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
        const recipeString = JSON.stringify(newRecipe, null, 2);
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
        newRecipe.save();
        res.status(200).send(recipeString);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { getRecipes, createRecipe };
