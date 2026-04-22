const { createBot } = require('../src/create-bot');

const bot = createBot();
const handleUpdate = bot.webhookCallback('/api/webhook', { secretToken: process.env.WEBHOOK_SECRET_TOKEN });

const VERCEL_URL = process.env.VERCEL_URL;
const webhookUrl = `https://${VERCEL_URL}/api/webhook`;

console.log("VERCEL_URL", VERCEL_URL);
console.log("webhookUrl", webhookUrl);
console.log("process.env.WEBHOOK_SECRET_TOKEN", process.env.WEBHOOK_SECRET_TOKEN);

const setupWebhook = async (res) => {
  try {
    const result = await bot.telegram.setWebhook(webhookUrl, { secret_token: process.env.WEBHOOK_SECRET_TOKEN });
    res.status(200).json({ success: true, message: "Webhook set!", result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = async (req, res) => {
  console.log("req.method", req.method);
  if (req.method === 'GET') {
    if (req.query.setup) {
      return await setupWebhook(res);
    };

    return res.status(200).json({ ok: true, message: 'Telegram webhook is live' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  console.log("req", req);


  return handleUpdate(req, res);
};
