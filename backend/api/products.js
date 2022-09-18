const express = require('express');
const { requireUser } = require('./utils');
const productsRouter = express.Router();
const {
	createproducts,
	getAllproducts,
	getproductsById,
	getproductsByBreed,
	updateproducts,
} = require('../db');

productsRouter.use((req, res, next) => {
	console.log('A request is being made to /products');

	next();
});

productsRouter.get('/', async (req, res, next) => {
	try {
		const response = await getAllproducts();

		res.send(response);
	} catch (error) {
		next(error);
	}
});

productsRouter.post('/', requireUser, async (req, res, next) => {
	const { name, adoption_fee, quantity, breed, image, description } =
		req.body;
	const dogData = {
		id: req.user.id,
		name,
		description,
		breed,
		image,
		adoption_fee,
		quantity,
	};

	try {
		const dog = await createproducts(dogData);
		res.send({ dog });
	} catch ({ name, message }) {
		next({ name, message });
	}
});

productsRouter.patch('/:dogId', requireUser, async (req, res, next) => {
	const { dogId } = req.params;
	const { name, adoption_fee, quantity, breed, image } = req.body;

	const updateFields = {};

	if (name) {
		updateFields.name = name;
	}
	if (breed) {
		updateFields.breed = breed;
	}
	if (image) {
		updateFields.image = image;
	}
	if (quantity) {
		updateFields.quantity = quantity;
	}
	if (adoption_fee) {
		updateFields.adoption_fee = adoption_fee;
	}

	try {
		const originalDog = getproductsById(dogId);

		if (originalDog.user.id === req.user.id) {
			const updatedDog = await updateproducts(dogId, updateFields);
			res.send({ dog: updatedDog });
		} else {
			next({
				name: 'UnauthorizedUserError',
				message: 'You can not update a dog that is not yours',
			});
		}
	} catch ({ name, message }) {
		next({ name, message });
	}
});
