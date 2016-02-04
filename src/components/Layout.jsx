var React = require('react');
var ChannelsList = require('./ChannelsList.jsx');
var MessagesList = require('./MessagesList.jsx');
var connect = require('react-redux').connect;

var Layout = React.createClass({
	componentDidMount: function () {

	},
	render: function () {
		return (
			<div className="archive">
				<ChannelsList
					channels={this.props.channels}
				/>
				<div className="content_area">
					<div className="channel_title">
						{this.props.channelName}
					</div>
					<MessagesList
						messages={this.props.messages}
					/>
				</div>
			</div>
		);
	}
});

// module.exports = Layout;

function select(state) {
	return {
		channels: state.channels,
		channelName: state.channelName,
		messages: state.messages
	};
}

module.exports = connect(select)(Layout);