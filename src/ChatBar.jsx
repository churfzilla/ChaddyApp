import React from 'react';

let ChatBar = React.createClass({

  handleChange(event) {
    // console.log(event.keyCode)
    if (event.keyCode == 13) {
      var username = this.refs.username.value;
      // console.log(event.target);
      var message = this.state.value;
      console.log(this.state);
      this.props.sendMessage(username, message);
    }
    // console.log(message);
  },

  handleNameChange(event) {
    this.setState({currentUser: event.target.value});
  },

  handleInput(event) {
    this.setState({value: event.target.value});
  },

  getInitialState: function() {
    return {
      currentUser: this.props.currentUser,
      value: this.props.value
    };
  },

  render: function() {
    return (
      <footer>
          <input
          id="username"
          type="text"
          ref="username"
          onChange={this.handleNameChange}
          value={this.state.currentUser}
          />
          <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          onChange={this.handleInput}
          onKeyDown={this.handleChange}
          />
      </footer>
    )
  }
});

export default ChatBar;