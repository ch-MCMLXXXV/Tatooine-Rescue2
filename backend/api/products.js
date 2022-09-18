const express = require('express');
const productsRouter = express.Router();
const {
	getAllProducts,
	createProducts,
	getProductsById,
	getProductsByCategory,
	updateProducts,
} = require('../db');
const { requireUser } = require('./utils');

// POST product
productsRouter.post('/', requireUser, async (req, res, next) => {
	try {
		const product = await createProducts(req.body);
		res.send(product);
	} catch (error) {
		next(error);
	}
});

// GET product
productsRouter.get('/:productId', async (req, res, next) => {
	try {
		const product = await getProductsById(req.params.productId);
		res.send(product);
	} catch (error) {
		next(error);
	}
});

// GET all products
productsRouter.get('/', async (req, res, next) => {
	try {
		const products = await getAllProducts();
		res.send(products);
	} catch (error) {
		next(error);
	}
});

//GET products by catagory
productsRouter.get('/category/:breed', async (req, res, next) => {
	try {
		const products = await getProductsByCategory(req.params.breed);
		res.send(products);
	} catch (error) {
		next(error);
	}
});

// /:productId
productsRouter.patch('/adminedit', requireUser, async (req, res, next) => {
	try {
		const products = await updateProducts(req.body);
		res.send(products);
	} catch (error) {
		next(error);
	}
});

module.exports = productsRouter;
