const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require('discord.js');
const { token } = require('./config.json');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.User,
  ],
});

client.roles = require('./commands/roles.json') ?? [];
client.startTime = Date.now();
client.commands = new Collection();
const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter((file) =>
  file.endsWith('.js'),
);

for (const file of commandFiles) {
  const filePath = join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
}

const eventPath = join(__dirname, 'events');
const eventFiles = readdirSync(eventPath).filter((file) =>
  file.endsWith('.js'),
);

for (const file of eventFiles) {
  const filePath = join(eventPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  }
  else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on('debug', console.log)
      .on('warn', console.log)
      .on('error', console.error);

client.login(token);
