'use strict';

const events = require('../../events.js');
require('dotenv').config();
const faker = require('faker');

setInterval(() => {
  let newOrder = {
    store: process.env.STORENAME,
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.city(),
  }

  events.emit('newOrder', newOrder);
}, 5000);

events.on('delivered', payload => {
  console.log('Your order was delivered! Thank you for your order.');
});