const yaml = require("js-yaml");
const fs = require("fs");
const winston = require("winston");

if (!fs.existsSync("./bot.yml")) {
		winston.cli();
		winston.error("Configuration file doesn't exist! Please read the README.md file first.");
		process.exit(1);
}

const settings = yaml.load(fs.readFileSync("./bot.yml", "utf-8"));

module.exports = { settings }