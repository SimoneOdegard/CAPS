'use strict';

const express = require('express');
const cors = require('cors');
const faker = require('faker');
const io = require('socket.io-client')

const HOST = process.env.HOST || 'http://localhost:3000'
const PORT = process.env.PORT || 3333;

const socket = io.connect(`${HOST}/caps`);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/pickup', (req, res) => {
  let newOrder = req.body || {
    store: store,
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.city(),
  }

  socket.emit('pickup', newOrder);
  res.status(200).send('Your order is scheduled');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});