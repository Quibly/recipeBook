const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let recipeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imageURL: {
            type: String,
            required: true
        },
        ingredients: {
            type: Array,
            required: true
        },
        steps: {
            type: String,
            required: true
        },
        categories: {
            type: Array,
            required: true
        },
        methods: {
            type: Array,
            required: true
        }
    },
    { versionKey: false }
);

module.exports = mongoose.model('Recipe', recipeSchema, 'recipes');
