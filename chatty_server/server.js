const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(data));
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('close', () => console.log('Client disconnected'));
  socket.on('message', (message) => {
    var msg = JSON.parse(message);
    console.log("User: " + msg.username + " Said: " + msg.content);
    wss.broadcast(msg);
  })
});

