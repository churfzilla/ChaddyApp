var data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: "1",
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: "2",
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

import React from 'react';
import Message from './Message.jsx';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'

const App = React.createClass({
  getInitialState: function() {
    return data;
  },

  render: function() {
    return (
      <div>
        <MessageList
          messages={this.state.messages}
        />
        <ChatBar
          currentUser={this.state.currentUser.name}
        />
      </div>
    )
  }
});

export default App;