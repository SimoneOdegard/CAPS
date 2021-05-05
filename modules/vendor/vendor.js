'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
let HOST = process.env.HOST || 'http://localhost:3000';
const caps = io.connect(`${HOST}/caps`);

setInterval(() => {
  let newOrder = {
    store: process.env.STORENAME,
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.city(),
  }

  caps.emit('newOrder', newOrder);
}, 5000);

caps.on('delivered', payload => {
  console.log(`Thank you for delivering`, payload.orderID);
});