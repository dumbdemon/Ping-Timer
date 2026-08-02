const { Events, ClientUser } = require('discord.js');
const ms = require('ms');
const { setBotActivity } = require('../helpers');

module.exports = {
	name: Events.ClientReady,
	once: true,
    execute(client) {
        console.log(`${client.user.tag} is online!`);

        setBotActivity(client.user);

        client.roles.forEach((i) => {
            setTimeout(() => {
            if (i.underTimeout) {
                client.guilds.fetch(i.guildId).then((guild) => {
                if (guild.available) {
                    guild.roles.fetch(i.roleId).then((role) => {
                    if (!role.mentionable) {
                        role.setMentionable(true);
                        i.underTimeout = false;
                        saveRolesCache();
                        console.log(`Role with ID [${i.roleId}] has been reset.`);
                    }
                    });
                } else console.log(`${guild.name} [${guild.id}] is not available!`);
                });
            }
            }, ms('2s'));
        });

        setInterval(() => setBotActivity(client.user), 300000);
    },
};