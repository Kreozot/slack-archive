var React = require('react');
var Provider = require('react-redux').Provider;
var Layout = require('./Layout.jsx');
var connect = require('react-redux').connect;

module.exports = function (store) {
	return React.createClass({
		componentDidMount: function () {

		},
		render: function () {
			return (
	    		<Provider store={store}>
					<Layout/>
	    		</Provider>
			);
		}
	});
};