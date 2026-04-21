const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Simple command handler
bot.command('start', (ctx) => ctx.reply('Welcome to the bot!'));

// Listen for specific words using Regex
bot.hears(/hi/i, (ctx) => ctx.reply('Hey there!'));

// Launch the bot
bot.launch();