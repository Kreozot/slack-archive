import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducer';
import actions from './actions';
var getApp = require('./components/App.jsx');
var connect = require('react-redux').connect;
var getApp = require('./components/App.jsx');
require('./styles/style.css');

const initialState = window.__initialdata__;
const store = createStore(reducers, initialState);

var App = getApp(store);

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);