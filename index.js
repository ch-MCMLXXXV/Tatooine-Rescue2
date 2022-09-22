require('dotenv').config();

const express = require('express');
const server = express();

const cors = require('cors');
server.use(cors());

const morgan = require('morgan');
server.use(morgan('dev'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const path = require('path');
server.use(express.static(path.join(__dirname, 'public')));

server.use('/api', require('./backend/api'));

const { client } = require('./backend/db');

server.get('*', (req, res) => {
   res.status(404).send({
      error: '404 - Not Found',
      message: 'No route found for the requested URL',
   });
});

server.use((error, req, res, next) => {
   console.error('SERVER ERROR: ', error);
   if (res.statusCode < 400) res.status(500);
   res.send({
      error: error.message,
      name: error.name,
      message: error.message,
      table: error.table,
   });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, async () => {
   console.log(`Server is running on ${PORT}!`);

   try {
      // await client.connect();
      console.log('Database is open for business!');
   } catch (error) {
      console.error('Database is closed for repairs!\n', error);
   }
});
