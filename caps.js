'use strict';

const events = require('./events.js');

require('./modules/driver/driver.js');
require('./modules/vendor/vendor.js');

events.on('newOrder', payload => {
  console.log('EVENT:', {
    event: 'pickup',
    time: new Date,
    payload});
  events.emit('pickup', payload)
});

events.on('inTransit', payload => {
  console.log('EVENT:', {
    event: 'inTransit',
    time: new Date,
    payload});
});

events.on('delivered', payload => {
  console.log('EVENT:', {
    event: 'delivered',
    time: new Date,
    payload});
});