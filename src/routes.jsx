var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Layout = require('./components/Layout.jsx');
var Home = require('./components/Home.jsx');

var routes = (
	<Route path="/" handler={Layout}>
		<Route path="/" component={Home} />
	</Route>
);

module.exports = routes;

if (typeof document !== 'undefined') {
	Router.run(routes, function (Handler) {
		// if (__initialdata__){
			React.render(<Handler {...__initialdata__} />, document);
		// }
	});
}