const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { requireUser } = require('./utils');
const { createUser, getUser, getUserByUsername } = require('../db');

usersRouter.use((req, res, next) => {
   console.log('A request is being made to /users');

   next();
});

usersRouter.get('/', requireUser, async (req, res) => {
   const user = await getUser();
   res.send({
      user,
   });
});

usersRouter.post('/login', async (req, res, next) => {
   const { username, password } = req.body;

   if (!username || !password) {
      next({
         name: 'MissingCredentialsError',
         message: 'Please enter both username and password',
      });
   }
   try {
      const user = await getUserByUsername(username);

      if (user && user.password === password) {
         const token = jwt.sign(user, process.env.JWT_SECRET);
         res.send({ message: "You're logged in!", token });
      } else {
         next({
            name: 'IncorrectCredentialsError',
            message: 'Username or password incorrect',
         });
      }
   } catch (error) {
      console.log(error);
      next(error);
   }
});

usersRouter.post('/register', async (req, res, next) => {
   const { username, password, email } = req.body;

   try {
      if (password.length < 8) {
         next({
            name: 'PasswordShortError',
            message: 'Password to short!',
            error: 'Error!',
         });
      }
      const _user = await getUserByUsername(username);

      if (_user) {
         next({
            name: 'UserExistsError',
            message: `User ${username} already exists`,
            error: 'Error',
         });
      }

      const user = await createUser({ username, password, email });

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

      res.send({
         message: 'Thank you for signing up',
         token,
      });
   } catch (error) {
      next(error);
   }
});

module.exports = usersRouter;