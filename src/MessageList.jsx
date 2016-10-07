import React from 'react';
import App from './App.jsx';
import Message from './Message.jsx';
const uuid = require('uuid');

const MessageList = React.createClass({
  propTypes: {
    content: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      username: "Anon",
      content: "Words go here."
    }
  },

  render() {
    return(
      <section>
        <div id="message-list">
          {this.props.messages.map((result) => (
            <Message
              key = {uuid.v1()}
              username = {result.username}
              content = {result.content}
              />
          ))}
          {this.props.notifications.map((result) => (
            <Message
              key = {uuid.v1()}
              content = {result.content}
              />
          ))}
        </div>
      </section>
    );
  }
});

export default MessageList;