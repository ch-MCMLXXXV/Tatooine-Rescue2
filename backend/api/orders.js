const express = require('express');
const ordersRouter = express.Router();
const {
   createOrders,
   getAllOrdersByUserId,
   getOrderById,
   getUsersCart,
   deleteOrder,
   getAllOrdersAsAdmin,
   deleteUsersCart,
   getAllCompletedOrdersByUserId,
   addProductToCart,
} = require('../db');
const { requireUser } = require('./utils');

ordersRouter.use((req, res, next) => {
   console.log('A request is being made to /orders');
   next();
});

ordersRouter.post('/', requireUser, async (req, res, next) => {
   const { userId, purchaseComplete, productId } = req.body;
   const orderData = {
      id: req.user.id,
      userId,
      productId,
      purchaseComplete,
   };

   try {
      const order = await createOrders(orderData);
      res.send({ order });
   } catch ({ name, message }) {
      next({ name, message });
   }
});

ordersRouter.get(
   '/admin/all',
   requireUser,
   async (req, res, next) => {
      try {
         if (req.user.isAdmin === true) {
            const allOrders = await getAllOrdersAsAdmin();
            res.send({ allOrders });
         } else {
            throw new error('You must be an administrator');
         }
      } catch (error) {
         next(error);
      }
   }
);

ordersRouter.get(
   '/user/history',
   requireUser,
   async (req, res, next) => {
      try {
         if (req.user.id === req.user.id) {
            const userOrders = await getAllOrdersByUserId();
            res.send({ userOrders });
         } else {
            throw new error('You must be logged in to see orders');
         }
      } catch (error) {
         next(error);
      }
   }
);

ordersRouter.get('/cart/:userId', async (req, res, next) => {
   try {
      const { userId } = req.params;
      const existingOrder = await getUsersCart(userId);
      console.log(existingOrder);
      const userOrder = await getOrderById(existingOrder[0].id);
      console.log(userOrder);
      res.send(userOrder);
   } catch (error) {
      next(error);
   }
});


module.exports = ordersRouter;
