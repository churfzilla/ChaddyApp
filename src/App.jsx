import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
var uuid = require('uuid');
var socket = new WebSocket("ws://localhost:4000");

const App = React.createClass({

  getInitialState: function() {
    var currentUser = {};
    var messages = [];
    var notifications = [];
    return {currentUser: currentUser, messages: messages, notifications: notifications};
  },

  componentDidMount: function() {
    socket.onmessage = ({data}) => {
      var parsed = JSON.parse(data);
      switch(parsed.type) {
        case "incomingMessage":
          var newMessages = this.state.messages;
          newMessages.push(parsed);
          this.setState({messages: newMessages});
          var nowUser = newMessages[newMessages.length - 1].username;
          var lastUser = newMessages[newMessages.length - 2].username;
          if(nowUser != lastUser) {
            var content = lastUser + " changed their name to " + nowUser;
            this.addNofication(content);
          }
          break;
        case "incomingNotification":
          var newNotification = this.state.notifications;
          newNotification.push(parsed);
          this.setState({notifications: newNotification});
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
  },

  addMessage: function(name, message) {
    var data = {
      type: 'postMessage',
      key: uuid.v1(),
      username: name,
      content: message
    };
    socket.send(JSON.stringify(data));
  },

  addNofication: (notification) => {
    var notify = {
      type: 'postNofication',
      content: notification
    };
    socket.send(JSON.stringify(notify));
  },

  render: function() {
    return (
      <div>
        <MessageList
        messages={this.state.messages}
        notifications={this.state.notifications}/>
        <ChatBar
        currentUser={this.state.currentUser.name}
        sendMessage={this.addMessage} />
      </div>
    );
  }
});

export default App;