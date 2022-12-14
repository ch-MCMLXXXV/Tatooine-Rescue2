const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { requireUser } = require('./utils');

const {
   createUser,
   getUser,
   getUserByUsername,
   createOrders,
} = require('../db');

const bcrypt = require('bcrypt');
const { JWT_SECRET } = process.env;

usersRouter.use((req, res, next) => {
   console.log('A request is being made to /users');

   next();
});

usersRouter.get('/', requireUser, async (req, res) => {
   res.send({
      user: req.user,
   });
});

usersRouter.post('/login', async (req, res, next) => {
   const { username, password } = req.body;
   console.log({ username, password, line: 22 });
   if (!username || !password) {
      res.status(401).send({
         name: 'MissingCredentialsError',
         message: 'Please enter both username and password',
      });
   }
   try {
      const user = await getUser({ username, password });
      if (user) {
         console.log({ user, line: 39 });
         const token = jwt.sign(user, process.env.JWT_SECRET);
         const cart = await createOrders({
            userId: user.id,
            purchaseComplete: false,
            adoption_fee: 100,
            quanity: 1,
         });
         console.log('is this working?');
         console.log(cart);
         res.send({ message: "You're logged in!", token, cart });
      } else {
         res.status(401).send({
            name: 'IncorrectCredentialsError',
            message: 'Username or password incorrect',
         });
      }
   } catch (error) {
      console.log(error);
      res.status(401).send(error);
   }
});

usersRouter.post('/register', async (req, res, next) => {
   const { username, password, email, firstName, lastName } =
      req.body;
   console.log(firstName, lastName);

   try {
      if (password.length < 8) {
         next({
            name: 'PasswordShortError',
            message: 'Password to short!',
            error: 'Error!',
         });
      }
      const _user = await getUserByUsername(username);
      console.log({ _user, line: 77 });

      if (_user) {
         next({
            name: 'UserExistsError',
            message: `User ${username} already exists`,
            error: 'Error',
         });
      }

      console.log(username, password, email);

      const user = await createUser({
         username,
         password,
         email,
         firstName,
         lastName,
      });
      console.log(user);

      const token = jwt.sign(
         {
            id: user.id,
            username: user.username,
         },
         process.env.JWT_SECRET,
         {
            expiresIn: '1w',
         }
      );

      const cart = await createOrders({
         userId: user.id,
         purchaseComplete: false,
         adoption_fee: 100,
         quanity: 1,
      });

      res.send({
         cart,
         message: 'Thank you for signing up',
         token,
      });

      console.log('is this working?');
      console.log({ cart, line: 123 });
   } catch (error) {
      next(error);
   }
});

module.exports = usersRouter;
