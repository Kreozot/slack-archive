var mongoose = require('mongoose');
var Promise = require('bluebird');
var config = require('../config.js');
var moment = require('moment');

var mongodbUri = `mongodb://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`;

function getConnection() {
	return mongoose.connect(mongodbUri).connection;
}

function connect() {
	return new Promise(function (resolve, reject) {
		getConnection()
			.on('error', console.log)
			.on('disconnected', connect)
			.once('open', function () {
				resolve();
			});
	});
}

function saveObject(Model, object) {
	return Model.findById(object._id)
		.then(function (existingDoc) {
			if (!existingDoc) {
				var newDoc = new Model(object);
				return newDoc.save();
			} else {
				return false;
			}
		})
}

function getModels() {
	var Channel = mongoose.model('Channel', mongoose.Schema({
		_id: String,
		name: String
	}));
	var User = mongoose.model('User', mongoose.Schema({
		_id: String,
		name: String,
		realName: String,
		email: String,
		images: mongoose.Schema({
			image24: String,
			image32: String,
			image48: String
		})
	}));

	var messageSchema = mongoose.Schema({
		_id: String,
		user: {
			type: String,
			ref: 'User'
		},
		type: String,
		subtype: String,
		text: String,
		ts: {
			type: String,
			get: ts => moment.unix(ts).format("DD-MM-YYYY HH:mm:ss")
		}
	});
	messageSchema.set('toJSON', {getters: true});

	return {
		Channel: Channel,
		User: User,
		getMessageModel: function (collectionName) {
			return mongoose.model(collectionName, messageSchema, collectionName);
		}
	};
}
var models = getModels();

function getChannels() {
	return models.Channel.find().exec();
}

function getUsers() {
	return models.User.find().exec();
}

function getMessages(filter) {
	var criteria = {};
	if (filter.hideSystem) {
		criteria.subtype = null;
	}
	return models.getMessageModel(filter.channel)
		.find(criteria)
		.populate('user')
		.sort({
			ts: 'desc'
		})
		.limit(filter.limit)
		.skip(filter.skip)
		.exec();
}

module.exports = {
	connect,
	saveObject,
	models,
	getChannels,
	getMessages
}
