
import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'

const App = React.createClass({

  getInitialState: function() {
    return {
      type: "",
      currentUser: {name: 'Anonymous'},
      messages: [],
      ready: false
    };
  },

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.wss = new WebSocket("ws://"+location.hostname+":4000");
    console.log('Connecting');

    this.wss.onmessage = ({data}) => {
      const message = JSON.parse(data);
      if(message.type)
      {
        switch(message.type)
        {
          case 'clientCount':
            const { count } = message;
            this.setState({
              clientCount: count
            })
            break;
          case 'incomingNotification':
          case 'incomingMessage':
            const oldMessages = this.state.messages;
            this.setState({
              messages: [...oldMessages, message] // (...) is ES6 Spread Notation
            })
            break;
          default:
            console.error("Unknown message type", message);
        }
      }
    },

    this.wss.onopen = () => {
      console.log("Connected to server");
    };
  },

  componentWillUnmount()
  {
    this.wss.close();
  },

  render: function() {
    return (
      <div>
        <MessageList
          messages={this.state.messages}
          clientCount={this.state.clientCount}
        />
        <ChatBar
          sendMessage={this.addMessage}
          onNameChanged={this.onNameChanged}
          currentUser={this.state.currentUser}
        />
      </div>
    )
  },

  addMessage(message, username) {

    if (username !== this.state.currentUser.name) {
      let newUserMessage = {
        type: "postNotification",
        message: this.state.currentUser.name + " changed their name to " + username
      };
      this.state.currentUser.name = username;

      let newCurrentUser = {name: username};
      this.setState({currentUser: newCurrentUser});
      this.wss.send(JSON.stringify(newUserMessage));
  }
    let msg = {
      type: "postMessage",
      username: this.state.currentUser.name,
      message
    };

    this.wss.send(JSON.stringify(msg));
  },

  onNameChanged(name) {
    this.setState({
      currentUser: {
        name
      }
    })
  }
});

export default App;