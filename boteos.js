const telegramBot = require('node-telegram-bot-api');
const winston = require("winston");
const settings = require("./settings").settings;
const db = require("./db");

winston.cli();

if (settings.log.file) {
		winston.add(winston.transports.File, {
				filename: settings.log.file,
				level: settings.log.level
		});
}

const bot = new telegramBot(settings.telegram.token, {polling: true});
winston.info("Starting bot...");

bot.on('message', (msg) => {

		settings.banned_words.forEach(function(forbidden_word) {
				if (msg.text.includes(forbidden_word)) {
						bot.kickChatMember(msg.chat.id,  msg.from.id);
						bot.deleteMessage(msg.chat.id, msg.message_id);
						winston.info("Removing & Banning: " + msg.text + " in :" + msg.chat.id + '(' + msg.from.id + ')');
				}
		});

		if (!settings.mongodb) {
				return;
		}

		db.addLog({
				name: msg.from.first_name,
				id: msg.from.id
		}, {
				chat_id: msg.chat.id,
				id: msg.message_id,
				text: msg.text
		});
});