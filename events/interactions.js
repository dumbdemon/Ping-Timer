const { Events, EmbedBuilder, MessageFlags } = require('discord.js');
const { rejectColor } = require('../config.json');
const { ownerId } = require('../config.json');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        const args = [];

        if (!command) return;

        for (const option of interaction.options.data) {
            if (option.value) args[option.name] = option.value;
        }

        const embed = new EmbedBuilder()
            .setTitle('Command failed to execute!')
            .setDescription(
                `There was an error while executing this command!\nLet <@${ownerId}> know which command and **all** arguements used!`,
            )
            .setColor(rejectColor)
            .setTimestamp();

        try {
            await command.execute(interaction, args);
        }
        catch (err) {
            console.error(err);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [embed], flags: MessageFlags.Ephemeral });
            }
            else {
                await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
            }
        }
	},
};