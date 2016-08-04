const argv = require('yargs').argv;
if (!argv.mock) {
	const dbModule = require('./db.js');
}
const filename = argv.file;

const exportLoad = require('./unzip.js');
const exportRead = require('./exportRead.js');

function exportToDb(db) {
	db = db || dbModule;
	// return new Promise(resolve => {resolve()})
	db.connect()
		.then(() => {
			if (filename) {
				return exportLoad(filename);
			}
		})
		.then(() => {
			return exportRead.readChannels()
				.map(function (channel) {
					return db.saveObject(db.models.Channel, channel);
				});
		})
		.then(() => {
			return exportRead.readUsers()
				.map(function (user) {
					return db.saveObject(db.models.User, user);
				});
		})
		.then(() => {
			return exportRead.getChannelsList()
				.map(function (channel) {
					return exportRead.readMessages(channel)
						.map(function (message) {
							return db.saveObject(db.models.getMessageModel(channel), message);
						});
				});
		})
		.all()
		.then(() => {
			console.log('done');
		})
		.catch(function (error) {
			console.error(error);
			throw error;
		});
};

module.exports = exportToDb;
