'use strict';

const PORT = process.env.QUEUE_SERVER || 3001;
const uuid = require('uuid').v4;
const io = require('socket.io')(PORT);

const queue = {
  messages: {}
};

const vendor = io.of('/vendor');

vendor.on('connection', socket => {

  socket.on('delivered', payload => {
    let id = uuid();
    queue.messages[id] = payload;
    console.log('received message', queue);

    // socket.emit('added');
    vendor.emit('delivered', { id, payload });

  });

  socket.on('getAll', () => {

    console.log('===GET ALL MESSAGES===');

    Object.keys(queue.messages).forEach(id => {
      vendor.emit('message', { id, payload: queue.messages[id] });
    });

  });

  socket.on('received', message => {

    delete queue.messages[message.id];
    console.log('deleted message');

  });

});