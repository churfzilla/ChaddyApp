import React, {Component} from 'react';

const ChatBar = React.createClass({
  render: function() {
    return (
      <div className="wrapper">
        <footer>
          <input id="username" type="text" value={this.props.currentUser} placeholder="Your Name (Optional)" />
          <input id="new-message" type="text" placeholder="Type a message and hit ENTER" />
        </footer>
      </div>
    );
  }
});

export default ChatBar;