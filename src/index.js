const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Your logic here
bot.start((ctx) => ctx.reply('Welcome! I am running on Vercel.'));
bot.on('text', (ctx) => ctx.reply(`You said: ${ctx.message.text}`));

// This is the "Vercel way" to handle the webhook
module.exports = async (request, response) => {
  try {
    // Ensure it's a POST request from Telegram
    if (request.method === 'POST') {
      await bot.handleUpdate(request.body);
    }
    response.status(200).send('OK');
  } catch (error) {
    console.error('Error handling update:', error);
    response.status(500).send('Error');
  }
};