var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

function loadJson(filename) {
	return fs.readFileAsync(filename)
		.then(data => JSON.parse(data));
}

function readChannels() {
	return loadJson('export/channels.json')
		.map(function (channel) {
			return {
				_id: channel.id,
				name: channel.name
			}
		})
}

function readUsers() {
	return loadJson('export/users.json')
		.map(function (user) {
			return {
				_id: user.id,
				name: user.name,
				realName: user.real_name,
				email: user.profile.email,
				images: {
					image24: user.profile.image_24,
					image32: user.profile.image_32,
					image48: user.profile.image_48
				}
			}
		})
}

function readMessagesFile(filepath) {
	return loadJson(filepath)
		.map(function (message) {
			return {
				_id: message.ts,
				user: message.user,
				type: message.type,
				subtype: message.subtype,
				text: message.text,
				ts: message.ts
			};
		});
}

function getChannelsList() {
	return fs.readdirAsync('export/')
		.filter(function (name) {
			return fs.statAsync('export/' + name)
				.then(function (stat) {
					return stat.isDirectory();
				})
		});
}

function readMessages(channel) {
	return fs.readdirAsync('export/' + channel)
		.filter(function (name) {
			return fs.statAsync('export/' + channel + '/' + name)
				.then(function (stat) {
					return stat.isFile();
				})
		})
		.reduce(function (allMessages, filename) {
			return readMessagesFile('export/' + channel + '/' + filename)
				.then(function (messages) {
					return allMessages.concat(messages);
				});
		}, [])
}

module.exports = {
	readChannels,
	readUsers,
	getChannelsList,
	readMessages
};
