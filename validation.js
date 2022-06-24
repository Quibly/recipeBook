// eslint-disable-next-line no-unused-vars
const { body, validationResult } = require('express-validator');

exports.userValidation = [
    body('fName', 'Names are formatted as Alpha characters for "en-US" locale.').isAlpha('en-US', { ignore: ' -,' }),
    body('lName', 'Names are formatted as Alpha characters for "en-US" locale.').isAlpha('en-US', { ignore: ' -,' }),
    body('email', "Email address isn't formatted properly.").isEmail({ domain_specific_validation: true }),
    body('userName', 'Usernames are limited to 20 characters and are Alpha characters for "en-US" locale.').isAlpha('en-US', { ignore: ' -,' }),
    body('password', 'Passwords should be include at least 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 symbol.').isStrongPassword()
];

exports.recipeValidation = [
    body('name', 'Names are formatted as Alpha characters for "en-US" locale.').isAlpha('en-US', { ignore: ' -,' }),
    body('description', 'Descriptions are formatted as Alpha characters for "en-US" locale.').isAlpha('en-US', { ignore: ' -,/."\'' }),
    body('imageURL', 'Images are stored using the local path.').isURL({ require_tld: false, require_host: false, require_valid_protocol: false }),
    body('ingredients.*', 'Ingredients is a list of Alpha character names for ingredients.').isAlpha('en-US', { ignore: ' -,' }),
    body('steps', 'Steps use Alpha characters to explain the process of steps in the recipe.').isAlphanumeric('en-US', { ignore: ' -/()[]!&,.?:"\'' }),
    body('categories.*', 'Categories is a list of Alpha character names for purposes, (ie. "dinner", "lunch", etc.)').isAlpha('en-US', { ignore: ' -,' }),
    body('methods.*', 'Methods is a list of Alpha character names for different methods of cooking, (ie. "grill", "oven", "pressure-cooker", etc.').isAlpha('en-US', { ignore: ' -,' })
];
