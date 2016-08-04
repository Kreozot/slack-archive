var React = require('react');
var Message = require('./Message.jsx');

module.exports = React.createClass({
	render: function () {
		var messages = this.props.messages.map(message =>
			<Message
				text={message.text}
				time={message.ts}
				avatar={message.user ? message.user.images.image24 : ''}
				username={message.user ? message.user.name : ''}
				key={message._id}
			/>
		);
		return (
			<div
				className='message-area'
			>
			    {messages}
			</div>
		);
		// return <div>{messages}</div>;
	},
	// handleInfiniteLoad: function () {
	// 	console.log('load');
	// }
});
