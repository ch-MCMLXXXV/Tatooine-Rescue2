const express = require('express');
const ordersRouter = express.Router();
const {
   createOrders,
   updateOrderQuantity,
   getAllOrdersByUserId,
   getOrderById,
   getUsersCart,
   deleteOrder,
   getAllOrdersAsAdmin,
   deleteUsersCart,
   getAllCompletedOrdersByUserId,
} = require('../db');
const { requireUser } = require('./utils');

ordersRouter.use((req, res, next) => {
   console.log('A request is being made to /orders');
   next();
});

ordersRouter.post('/', requireUser, async (req, res, next) => {
   const {
      userId,
      purchaseComplete,
      adoption_fee,
      productsId,
      quantity,
   } = req.body;
   const orderData = {
      id: req.user.id,
      userId,
      productsId,
      purchaseComplete,
      adoption_fee,
      quantity,
   };

   try {
      const order = await createOrders(orderData);
      res.send({ order });
   } catch ({ name, message }) {
      next({ name, message });
   }
});

ordersRouter.get('/', requireUser, async (req, res, next) => {
   try {
      if (req.user.isAdmin === true) {
         const allOrders = getAllOrdersAsAdmin();
         res.send({ allOrders });
      } else {
         throw new error('You must be an administrator');
      }
   } catch (error) {
      next(error);
   }
});

ordersRouter.get('/', requireUser, async (req, res, next) => {
   try {
      if (req.user.id === req.user.id) {
         const userOrders = getAllOrdersByUserId();
         res.send({ userOrders });
      } else {
         throw new error('You must be logged in to see orders');
      }
   } catch (error) {
      next(error);
   }
});

ordersRouter.get('/', async (req, res, next) => {
   try {
      const userOrder = getOrderById();
      res.send({ userOrder });
   } catch (error) {
      next(error);
   }
});
module.exports = ordersRouter;
