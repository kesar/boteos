const telegramBot = require('node-telegram-bot-api');
const yaml = require("js-yaml");
const winston = require("winston");
const fs = require("fs");

if (!fs.existsSync("./bot.yml")) {
		winston.error("Configuration file doesn't exist! Please read the README.md file first.");
		process.exit(1);
}

const settings = yaml.load(fs.readFileSync("./bot.yml", "utf-8"));

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
});
