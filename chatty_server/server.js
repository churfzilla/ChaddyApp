const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 4000;
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({ server });

wss.broadcast = (data) => {

  wss.clients.forEach((client) => {
    client.send(data);
  });
};

wss.on('connection', (socket) => {
  console.log('Client connected');

  var clients = [];
  var clientsOnline = clients.length;

  socket.on('message', (data) => {
    var clientData = JSON.parse(data);
    clients.push(clientData);
    newMessage = {};

    if (clientData.type === 'postMessage') {
      newMessage = {
        type: 'incomingMessage',
        key: clientData.key,
        username: clientData.username,
        content: clientData.content
      };
    } else if (clientData.type === "postNofication") {
      newMessage = {
        type: 'incomingNotification',
        key: clientData.key,
        username: clientData.username,
        content: clientData.content
      };
    } else {
      console.log('ERROR!');
    }

    wss.broadcast(JSON.stringify(newMessage));
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  socket.on('close', () => console.log('Client disconnected'));

});