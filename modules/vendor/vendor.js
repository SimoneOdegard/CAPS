'use strict';

// require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
let HOST = process.env.HOST || 'http://localhost:3000';
const client = io.connect(`${HOST}/caps`);
const store = 'Kawaii Flower Shop';

client.emit('join', store);

setInterval(() => {
  let newOrder = {
    store: store,
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.city(),
  }

  // client.emit('newOrder', newOrder);
  client.emit('pickup', newOrder);
}, 5000);

client.on('delivered', payload => {
  console.log(`Thank you for delivering`, payload.orderID);
});