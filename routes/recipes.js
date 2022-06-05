const express = require('express');
const router = express.Router();
let recipesControl = require('../controllers/recipes');
const { recipeValidation } = require('../validation');
const { validationResult } = require('express-validator');
const { ensureAuth } = require('../middleware/auth');

//route list for the recipes collection
router.get('/', ensureAuth, recipesControl.getRecipes);
router.post('/', recipeValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    recipesControl.createRecipe(req, res);
});

module.exports = router;
