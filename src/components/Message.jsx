var React = require('react');

module.exports = React.createClass({
	render: function () {
		return (
			<div className="message">
				<div className="message__avatar">
					<img src={this.props.avatar}/>
				</div>
				<div className="message__info">
					<span className="message__username">
						{this.props.username}
					</span>
					<span className="message__time">
						{this.props.time}
					</span>
				</div>
				<div className="message__text">
					{this.props.text}
				</div>
			</div>
		);
	}
});
