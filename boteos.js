let TelegramBot = require('node-telegram-bot-api');
let yaml = require("js-yaml");
let winston = require("winston");
let fs = require("fs");

if (!fs.existsSync("./bot.yml")) {
		winston.error("Configuration file doesn't exist! Please read the README.md file first.");
		process.exit(1);
}

let settings = yaml.load(fs.readFileSync("./bot.yml", "utf-8"));

winston.cli();

if (settings.log.file) {
		winston.add(winston.transports.File, {
				filename: settings.log.file,
				level: settings.log.level
		});
}

let bot = new TelegramBot(settings.telegram.token, {polling: true});
winston.info("Starting bot...");

bot.on('message', (msg) => {
		let what = "tinyurl.com";
		if (msg.text.includes(what)) {
				bot.kickChatMember(msg.chat.id,  msg.from.id);
				bot.deleteMessage(msg.chat.id, msg.message_id);
				winston.info("Removing & Banning: " + msg.text + " in :" + msg.chat.id + '(' + msg.from.id + ')');
		}
});
