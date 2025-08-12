const Datastore = require('nedb')
const db = new Datastore()

class Message {
	constructor() {
		///we put unique as false to allow all same messages
		db.ensureIndex({ fieldName: 'text', unique: false }, function (err) {
			if (err)
				console.log(err)
		})
	}

	///get all messages
	find() {
		return new Promise((resolve, reject) => {
			db.find({}, (err, docs) => {
				if (err) reject(err);
				else resolve(docs);
			});
		});
	}

	///get all messages by id
	findById(id) {
		return new Promise((resolve, reject) => {
			db.findOne({ _id: id }, (err, doc) => {
				if (err) reject(err);
				else if (!doc) reject(new Error('Not found'));
				else resolve(doc);
			});
		});
	}

	///update all existing messages
	save(id, update) {
		return new Promise((resolve, reject) => {
			db.update({ _id: id }, { $set: update }, {}, (err, numReplaced) => {
				if (err) reject(err);
				else resolve(numReplaced);
			});
		});
	}

	///remove message by id
	remove(id, remove) {
		return new Promise((resolve, reject) => {
			db.remove({ _id: id }, {}, (err, numRemoved) => {
				if (err) reject(err);
				else resolve(numRemoved);
			});
		});
	}

	///insert new message
	insert(data) {
		return new Promise((resolve, reject) => {
			db.insert(data, (err, newDoc) => {
				if (err) reject(err);
				else resolve(newDoc);
			});
		});
	}
}

module.exports = Message;
