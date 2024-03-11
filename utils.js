const { verifyKey } = require('discord-interactions');
const fetch = require('node-fetch');


const VerifyDiscordRequest = (clientKey) => {
  return function (req, res, buf, encoding) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');
    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      res.status(401).send('Bad request signature');
      throw new Error('Bad request signature');
    }
  };
}

const DiscordRequest = async (endpoint, options) => {
  const url = 'https://discord.com/api/v10/' + endpoint;
  if (options.body) options.body = JSON.stringify(options.body);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(JSON.stringify(data));
  }
  return res;
}

const InstallGlobalCommands = async (appId, commands) => {
  const endpoint = `applications/${appId}/commands`;

  try {
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  VerifyDiscordRequest,
  DiscordRequest,
  InstallGlobalCommands,
}