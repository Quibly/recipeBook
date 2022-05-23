const express = require('express');
const router = express.Router();
let recipesControl = require('../controllers/recipes');

//route list for the recipes collection
router.get('/', recipesControl.getRecipes);
router.post('/', recipesControl.createRecipe);

module.exports = router;
