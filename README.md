🗿 botEOS
========================

botEOS is a simple bot in node to block spam in telegram.

📌 Getting Started
------------

```bash
$ git clone git@github.com:kesar/boteos.git
$ cd boteos
$ npm install
```

📌 Configuration
------------

Copy bot.yml.dist into bot.yml and change your token and banner_words.

📌 Generate token
------------

A bot token is required and can be obtained by talking to <a href="https://telegram.me/BotFather">@botfather</a>. 

📌 Moderate channel
------------

After create your bot token and setup your config, just run `npm start`. Then you will need to invite your bot to the desired channels and add him as Admin.

📌 Log channel into Mongo
------------

mongodb is optional, if you define your mongodb connection string, you will be able to log all the messages into your database. You may need to /setprivacy (with BotFather) of your bot to allow access to channel msgs.