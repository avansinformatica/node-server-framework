const Technology = require('../models/Technology');
const logger = require('../config/env/env').logger;
const assert = require('assert');
var list = require('../controllers/list.controller');

// let technologies = [];
// technologies.push(new Technology(
// 	'Eerste item',
// 	'description',
// 	3,
// 	'http://www.image.com'
// ));
// technologies.push(new Technology(
// 	'Tweede item',
// 	'Hier nog een beschrijving',
// 	12,
// 	'http://www.image.com'
// ));

module.exports = {

	//
	// Handelt een GET af. 
	//
	getAllItems(req, res, next) {
		logger.debug('getAllItems called.');
		// res.status(200).json(technologies).end();

		list.getItems((result) => {
			res.status(200).json(result).end();
		});

	},

	//
	// Handelt een POST af.
	//
	createNewItem(req, res, next) {
		logger.debug('createNewItem called. req.body = ', req.body);

		// Check dat de req.body de juiste properties heeft om een object mee te kunnen maken.
		assert(req.body.name, "Argument 'name' is missing.");
		assert(req.body.description, "Argument 'description' is missing.");
		assert(req.body.amount, "Argument 'amount' is missing.");
		assert(req.body.imageUrl, "Argument 'imageUrl' is missing.");

		const newItem = new Technology(
			req.body.name,
			req.body.description,
			req.body.amount,
			req.body.imageUrl
		);
		logger.debug('created newItem. ', newItem);

		// technologies.push(newItem);
		// res.status(200).json(newItem).end();

		list.addItem(newItem, (result) => {
			res.status(200).json(result).end();
		});
	},

	//
	// 
	//
	getItemById(req, res, next) {

		const id = req.params.id;

		// Check dat de vereiste parameter aanwezig is.
		assert(id, "Request parameter 'id' is missing.");
		assert.equal(typeof (id), 'string', "Argument 'id' must be a number as a string.");

		logger.debug('getItemById called, id = ' + id);
		// res.status(200).json(technologies[id]).end();

		list.getItemById(id, (error, result) => {
			if (error) {
				next(error);
			} else {
				res.status(200).json(result).end();
			}
		});
	},

	//
	//
	//
	updateItem(req, res, next) {
		const technologyId = req.params.id;
		const technologyProps = req.body;
		logger.debug('updateItem called.');

		res.status(200).json(result).end();
	}

};