var React = require('react');
var ChannelLink = require('./ChannelLink.jsx');

module.exports = React.createClass({
	handleClick: function () {

	},
	render: function () {
		var channels = this.props.channels.map(channel =>
			<ChannelLink
				id={channel._id}
				name={channel.name}
				key={channel._id}
			/>
		);
		return <div className="channels_list">{channels}</div>;
	}
});
