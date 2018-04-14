const mongoose = require("mongoose");
const settings = require("./settings").settings;
const winston = require("winston");

if (!settings.mongodb) {
		return;
}

winston.cli();

mongoose.connect(settings.mongodb, function (err, res) {
		if (err) {
				winston.error('ERROR connecting to: ' + settings.mongodb + '. ' + err);
		} else {
				winston.info('Succeeded connected to: ' + settings.mongodb);
		}
});

const messageSchema = new mongoose.Schema({
		user: {
				name: String,
				id: Number
		},
		message: {
				chat_id: String,
				id: String,
				text: String
		},
		timestamp: String
});

const Message = mongoose.model('Messages', messageSchema);

module.exports = {
		getLogs(cb) {
				Message.find({}).exec(function (err, result) {
						cb(result);
				});
		},

		clearLogs(cb) {
				Message.remove({}, cb);
		},

		addLog(user, message, cb) {
				dbmsg = new Message({
						user: user,
						message: message,
						timestamp: new Date().toISOString()
				}).save(cb);
		}
};