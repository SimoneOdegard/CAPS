'use strict';

const io = require('socket.io')(3000);
const caps = io.of('/caps');

caps.on('connection', socket => {

  socket.on('newOrder', payload => {
    console.log('EVENT:', {
      event: 'pickup', 
      time: new Date,
      payload});
    caps.emit('pickup', payload)
  });
  
  socket.on('inTransit', payload => {
    console.log('EVENT:', {
      event: 'inTransit',
      time: new Date,
      payload});
    caps.emit('inTransit', payload)
  });
  
  socket.on('delivered', payload => {
    console.log('EVENT:', {
      event: 'delivered',
      time: new Date,
      payload});
    caps.emit('delivered', payload)
  });

})
