const { embedColor, aboutText } = require('../config.json');
const { formatUptime } = require('../helpers');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { version } = require('../package.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('What is P3 Timer?'),
  execute(interaction, args) {
    const i = interaction.client.roles.length;

    const embed = new EmbedBuilder()
      .setTitle(interaction.client.user.username)
      .setDescription(aboutText)
      .addFields([
        {
          name: '> Current instance started at',
          value: `<t:${Math.floor(interaction.client.startTime / 1000)}:F>`,
          inline: true,
        },
        {
          name: 'Instance Uptime',
          value: formatUptime(),
          inline: true,
        },
        {
          name: '> Roles Overwatching',
          value: `${i} role${i > 1 ? 's' : ''}`,
          inline: false,
        },
        {
          name: '> Version',
          value: `v${version}`,
          inline: false,
        },
      ])
      .setColor(embedColor)
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
