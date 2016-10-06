const wss = new WebSocket("ws://localhost:4000");
const uuid = require('node-uuid');


import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'

const App = React.createClass({
  getInitialState: function() {
    function addMessage(name, message) {
      wss.send(JSON.stringify({id: uuid.v4(), username: name, content: message}));
    }
    var initialLoading = {
      currentUser: {name: ''},
      messages: []
    };
    return {loading: initialLoading, addMessage: addMessage.bind(this)};
  },

  componentDidMount: function() {
    console.log("componentDidMount <App />");
    console.log("Connected to server on port: 4000");

    wss.onmessage = (message) => {
      var parsed = JSON.parse(message.data);
      let newMessages = this.state.loading.messages;
      newMessages.push(parsed);
      this.setState({messages: newMessages});
    };
  },

  render: function() {
    return (
      <div>
        <MessageList
          messages={this.state.loading.messages}
        />
        <ChatBar
          currentUser={this.state.loading.currentUser.name}
          sendMessage={this.state.addMessage}
        />
      </div>
    )
  }
});



export default App;