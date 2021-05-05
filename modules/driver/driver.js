'use strict';

const io = require('socket.io-client');
let HOST = process.env.HOST || 'http://localhost:3000';
const caps = io.connect(`${HOST}/caps`);

caps.on('pickup', payload => {
  setTimeout(() => {
    console.log(`DRIVER: picked up order number: ${payload.orderID}`)
  }, 1000);

  caps.emit('inTransit', payload);
});

caps.on('inTransit', payload => {
  setTimeout(() => {
    console.log(`DRIVER: delivered order number: ${payload.orderID}`)
  }, 3000);

  caps.emit('delivered', payload);
});
