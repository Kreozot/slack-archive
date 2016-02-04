var Set = require('immutable').Set;
var combineReducers = require('redux').combineReducers;
// var db = require('./db.js');

function channels(state, action) {
	state = state || Set();
	switch (action.type) {
		// case 'LOAD_CHANNELS':
		// 	return Set.of();
		// case 'ADD_ITEM':
		// 	return state.add(action.itemId);
		// case 'REMOVE_ITEM':
		// 	return state.delete(action.itemId);
		// case 'CLEAR_ITEMS':
		// 	return state.clear();
		default:
			return state;
	}
}

function channelName(state, action) {
	state = state || 'general';
	return state;
}

function messages(state, action) {
	state = state || Set();
	switch (action.type) {
		// case 'SELECT_YEARS':
		// 	return Set.of(action.years);
		default:
			return state;
	}
}

const reducers = combineReducers({
	channels,
	channelName,
	messages
});

module.exports = reducers;
