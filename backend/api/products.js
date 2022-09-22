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
productsRouter.get('/:productsId', async (req, res, next) => {
   try {
      console.log('Is this working?');
      const product = await getProductsById(req.params.productsId);
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

// /:productsId
productsRouter.patch(
   '/adminedit',
   requireUser,
   async (req, res, next) => {
      try {
         const products = await updateProducts(req.body);
         res.send(products);
      } catch (error) {
         next(error);
      }
   }
);

module.exports = productsRouter;
