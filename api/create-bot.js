const { Telegraf } = require('telegraf');

function createBot() {
  if (!process.env.BOT_TOKEN) {
    throw new Error('BOT_TOKEN is missing');
  }

  const bot = new Telegraf(process.env.BOT_TOKEN);

  // Simple command handler
  bot.command('start', (ctx) => ctx.reply('Welcome to the bot!'));

  // Listen for specific words using Regex
  bot.hears(/hi/i, (ctx) => ctx.reply('Hey there!'));

  return bot;
}

module.exports = { createBot };