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
				return exportLoad(filename)
					.then(() => console.log('Export unzipped.'));
			}
		})
		.then(() => {
			return exportRead.readChannels()
				.map(channel => db.saveObject(db.models.Channel, channel));
		})
		.then(() => {
			return exportRead.readUsers()
				.map(user => db.saveObject(db.models.User, user));
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
		.then(() => console.log('done'))
		.catch(function (error) {
			console.error(error);
			throw error;
		});
};

module.exports = exportToDb;
