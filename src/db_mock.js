var Promise = require('bluebird');
var config = require('../config.js');
var moment = require('moment');
var exportToDb = require('./exportToDb.js');

var mem;

function connect() {
	return new Promise(function (resolve, reject) {
		if (!mem) {
			mem = {};
			resolve(exportToDb(module.exports));
		} else {
			resolve();
		}
	});
}

function saveObject(Model, object) {
	return new Promise(function (resolve, reject) {
		if (!mem[Model]) {
			mem[Model] = [];
		}
		mem[Model].push(object);
		resolve();
	});
}

function getModels() {
	return {
		Channel: 'Channel',
		User: 'User',
		getMessageModel: function (collectionName) {
			return collectionName;
		}
	};
}
var models = getModels();

function getChannels() {
	return new Promise(function (resolve, reject) {
		resolve(mem.Channel);
	});
}

function getUsers() {
	return new Promise(function (resolve, reject) {
		resolve(mem.User);
	});
}

function getMessages(filter) {
	return new Promise(function (resolve, reject) {
		var messages = mem[filter.channel] || [];
		if (filter.hideSystem) {
			messages = messages.filter(message => !message.subtype);
		}
		messages = messages.map(message => {
			message.user = mem.User.filter(user => user._id === message.user)[0];
			return message;
		});
		messages = messages.sort((message1, message2) => (message1.ts > message2.ts ? 1 : -1));
		resolve(messages);
	});
}

module.exports = {
	connect,
	saveObject,
	models,
	getChannels,
	getMessages
}

