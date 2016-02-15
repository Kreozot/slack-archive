var React = require('react');
var Message = require('./Message.jsx');
var ChatView = require('react-chatview');

module.exports = React.createClass({
	render: function () {
		var messages = this.props.messages.map(message =>
			<Message
				text={message.text}
				time={message.ts}
				avatar={message.user.images.image24}
				username={message.user.name}
				key={message._id}
			/>
		);
		return (
			<div
				className="message-area"
				flipped={true}
				elementHeight={40}
	            scrollLoadThreshold={50}
				onInfiniteLoad={this.handleInfiniteLoad}
			>
			    {messages}
			</div>
		)
		// return <div>{messages}</div>;
	},
	handleInfiniteLoad: function () {
		console.log('load');
	}
});
