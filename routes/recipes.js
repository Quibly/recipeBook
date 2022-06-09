const express = require('express');
const router = express.Router();
let recipesControl = require('../controllers/recipes');
const { recipeValidation } = require('../validation');
const { validationResult } = require('express-validator');
const { ensureAuthEnd } = require('../middleware/auth');

//route list for the recipes collection
router.get('/', ensureAuthEnd, recipesControl.getRecipes);
router.post('/', ensureAuthEnd, recipeValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    recipesControl.createRecipe(req, res);
});

module.exports = router;
