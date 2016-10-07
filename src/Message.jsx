
import React from 'react';
import App from './App.jsx';
import MessageList from './MessageList.jsx';

const Message = React.createClass({
  render() {
    return(
      <section>
        <div className="message">
          <span className="username">{this.props.username}</span>
          <span className="content">{this.props.content}</span>
        </div>
        <div className="message_system">
          <span className="notifications">{this.props.notification_content}</span>
        </div>
      </section>
    );
  }
});

export default Message;
