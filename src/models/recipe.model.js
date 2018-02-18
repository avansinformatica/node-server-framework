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
    }],
    price: {
        value: Number,
        valuta: String
    }
});

const Recipe = mongoose.model('recipe', RecipeSchema);

//
// Genereer dummy data, maar alleen als collectie leeg is.
//
const item = new Recipe({
    name: 'Tasty Pizza',
    description: {
        short: 'Vers uit de oven!',
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
        'Maak eerst de bodem.',
        'Wanneer de bodem klaar is leg je de overige ingrediënten op de pizza.',
        'Even in de oven.',
        'Dan is je pizza klaar!'
    ],
    imagePath: 'http://lorempixel.com/400/200/food/',
    ingredients: [{
        name: 'Salami',
        amount: 2,
        serving: 'stuks'
    }, {
        name: 'Tomaten',
        amount: 5,
        serving: 'stuks'
    }],
    price: {
        value: 7.50,
        valuta: 'euro'
    }
});






Recipe.find({})
    .then((result) => result.length === 0 ? item.save() : null)
    .catch((error) => console.log(error));

module.exports = Recipe;