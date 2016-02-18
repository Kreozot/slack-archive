var argv = require('yargs').argv;
if (!argv.mock) {
	var dbModule = require('./db.js');
}
var exportLoad = require('./exportLoad.js');
var exportRead = require('./exportRead.js');

function exportToDb(db) {
	db = db || dbModule;
	// return new Promise(resolve => {resolve()})
	db.connect()
		.then(function () {
			return exportRead.readChannels()
				.map(function (channel) {
					return db.saveObject(db.models.Channel, channel);
				});
		})
		.then(function () {
			return exportRead.readUsers()
				.map(function (user) {
					return db.saveObject(db.models.User, user);
				});
		})
		.then(function () {
			return exportRead.getChannelsList()
				.map(function (channel) {
					return exportRead.readMessages(channel)
						.map(function (message) {
							return db.saveObject(db.models.getMessageModel(channel), message);
						})
				});
		})
		.then(function () {
			console.log('done');
		})
		.catch(function (error) {
			console.error(error);
		});
};

module.exports = exportToDb;
