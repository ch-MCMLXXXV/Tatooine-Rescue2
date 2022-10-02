const express = require('express');
const productsRouter = express.Router();
const {
	getAllProducts,
	createProducts,
	getProductsById,
	getProductsByCategory,
	updateProducts,
   deleteProducts,
} = require('../db');
const { requireUser } = require('./utils');

productsRouter.use('*', (req, res, next) => {
	console.log('Hit products page');
	next();
});

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
		console.log('Is this working?');
		const product = await getProductsById(req.params.productId);
		res.send(product);
	} catch (error) {
		next(error);
	}
});

// GET all products
productsRouter.get('/', async (req, res, next) => {
	try {
		console.log('Is this working?');
		const products = await getAllProducts();
		console.log('getting all products', products);
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

productsRouter.delete('/:productId', requireUser, async (req, res, next) =>{
   try {
      const products = await deleteProducts(req.params.productId);
      res.send(products);
   } catch (error) {
      next(error)
   }
})

module.exports = productsRouter;
