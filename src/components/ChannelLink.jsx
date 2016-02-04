var React = require('react');

module.exports = React.createClass({
	handleClick: function () {

	},
	render: function () {
		return (
			<a href={'?channel=' + this.props.name} className="channels__link">
				{this.props.name}
			</a>
		);
	}
});
