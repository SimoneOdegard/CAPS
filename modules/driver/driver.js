'use strict';

const io = require('socket.io-client');
let HOST = process.env.HOST || 'http://localhost:3000';
const client = io.connect(`${HOST}/caps`);
const store = 'Kawaii Flower Shop';
client.emit('join', store);

client.on('pickup', payload => {
  setTimeout(() => {
    console.log(`DRIVER: picked up order number: ${payload.orderID}`)
    client.emit('inTransit', payload);
  }, 1000);

});

client.on('inTransit', payload => {
  setTimeout(() => {
    console.log(`DRIVER: delivered order number: ${payload.orderID}`)
    client.emit('delivered', payload);
  }, 3000);
  
});
