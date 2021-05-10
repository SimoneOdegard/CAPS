'use strict';

// require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
let HOST = process.env.HOST || 'http://localhost:3000';
const client = io.connect(`${HOST}/caps`);
const store = 'Kawaii Flower Shop';
const store2 = '1-206-flowers';

const vendor = io.connect('http://localhost:3001/vendor');

const message = process.argv.splice(2)[0];
vendor.emit('delivered', message);

client.emit('join', store);
client.emit('join', store2)

vendor.emit('getAll');

setInterval(() => {
  let newOrder = {
    store: store,
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.city(),
  }

  client.emit('pickup', newOrder);
}, 5000);

setInterval(() => {
  let newOrder = {
    store: store2,
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.city(),
  }

  client.emit('pickup', newOrder);
}, 5000);

client.on('delivered', payload => {
  console.log(`Thank you for delivering`, payload.orderID);
});

vendor.on('message', message => {
  console.log('received message:', message.payload);
  vendor.emit('recieved', message);
})