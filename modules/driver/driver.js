'use strict';

const events = require('../../events.js');

events.on('pickup', payload => {
  setTimeout(() => {
    console.log(`DRIVER: picked up order number: ${payload.orderID}`)
  }, 1000);

  events.emit('inTransit', payload);
});

events.on('inTransit', payload => {
  setTimeout(() => {
    console.log(`DRIVER: delivered order number: ${payload.orderID}`)
  }, 3000);

  events.emit('delivered', payload)
});


