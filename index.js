var express = require('express');
var Promise = require('bluebird');
var bodyParser = require('body-parser');
var config = require('./config.js');
var timeout = require('connect-timeout');
var createStore = require('redux').createStore;
var renderToString = require('react-dom/server').renderToString;
var reducers = require('./src/reducer.js');
var argv = require('yargs').argv;
if (argv.mock) {
	console.log('Mock mode');
	var db = require('./src/db_mock.js');
} else {
	var db = require('./src/db.js');
}
var React = require('react');
var qs = require('qs');

require('node-jsx').install({
	extension: '.jsx'
});

var getApp = require('./src/components/App.jsx');

function getInitialState(channelName) {
	channelName = channelName || 'general';

	return Promise.join(
		db.getChannels(),
		db.getMessages({
			channel: channelName,
			hideSystem: true,
			// skip: 10,
			limit: 50000
		}),
		function (channels, messages) {
			messages.sort(function (message1, message2) {
				return (parseFloat(message1._id) > parseFloat(message2._id)) ? 1 : -1;
			});
			return {
				channels,
				channelName,
				messages
			};
		}
	);
}

function renderFullPage(html, initialState, channelName) {
	return `
		<!doctype html>
		<html>
			<head>
				<title>Slack Archive${channelName ? ' - ' + channelName : ''}</title>
			</head>
			<body>
				<div id="app">${html}</div>
				<script>
					window.__initialdata__ = ${JSON.stringify(initialState)}
				</script>
				<script src="/main.js"></script>
			</body>
		</html>
	`;
}

const app = express()
	.use(express.static(__dirname + '/public'))
	.use(timeout(60000))
	.use(function (req, res, next) {
		const params = qs.parse(req.query);
		const channelName = params.channel;
		console.log(req.query);

		getInitialState(channelName)
			.then(function (state) {
				const store = createStore(reducers, state);
				const initialState = store.getState();
				const App = getApp(store);

				const html = renderToString(React.createElement(App));

				res.send(renderFullPage(html, initialState, channelName));
			});
	});
module.exports = app;

db.connect()
	.then(function () {
		app.listen(config.devServer.port, function () {
			console.log(`Listening on port ${this.address().port}`);
		});
	});
