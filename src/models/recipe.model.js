const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: String,
    description: {
        _id: false,
        short: String,
        long: String
    },
    nutrition: {
        fat: {
            value: Number,
            measure: String
        },
        sugar: {
            value: Number,
            measure: String
        },
        protein: {
            value: Number,
            measure: String
        },
        fiber: {
            value: Number,
            measure: String
        }
    },
    imagePath: String,
    steps: [
        String
    ],
    ingredients: [{
        _id: false,
        name: String,
        amount: Number,
        serving: String
    }]
});

const Recipe = mongoose.model('recipe', RecipeSchema);

//
// Genereer dummy data, maar alleen als collectie leeg is.
//
const item = new Recipe({
    name: 'Tasty Avans Pizza',
    description: {
        short: 'Vers van de server!',
        long: 'Erg lekker recept. Moet je proberen!'
    },
    nutrition: {
        fat: {
            value: 3,
            measure: 'gram'
        },
        sugar: {
            value: 3,
            measure: 'gram'
        },
        protein: {
            value: 3,
            measure: 'gram'
        },
        fiber: {
            value: 3,
            measure: 'gram'
        }
    },
    steps: [
        'eerst doe je dit',
        'Dan doe je dat',
        'dan is het klaar'
    ],
    imagePath: 'http://lorempixel.com/400/200/food/',
    ingredients: [{
        name: 'Server Burger',
        amount: 2,
        serving: 'stuks'
    }, {
        name: 'Mongo Tomaten',
        amount: 5,
        serving: 'stuks'
    }]
});


Recipe.find({})
    .then((result) => result.length === 0 ? item.save() : null)
    .catch((error) => console.log(error));

module.exports = Recipe;