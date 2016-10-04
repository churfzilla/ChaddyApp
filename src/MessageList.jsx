import React from 'react';
import Message from './Message.jsx';


let MessageList = React.createClass({
  render: function() {
    return (
      <div id="message-list">
          {this.props.messages.map((result) => {
            return <Message
            key={result.key}
            username={result.username}
            content={result.content}/>
          })}
      </div>
    )
  }
});

export default MessageList;