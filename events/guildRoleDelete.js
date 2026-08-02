const { Events } = require('discord.js');
const { saveRolesCache } = require('../helpers');

module.exports = {
	name: Events.GuildRoleDelete,
	once: false,
	execute(role) {
		role.client.roles.forEach((i) => {
            if (i.roleId === role.id) {
            role.client.roles.splice(i, 1);
            saveRolesCache(role.client.roles);

            console.log(
                `[${role.name}] was deleted on the server [${role.guild.id}]; therefore, it has been deleted from the registry.`,
            );
            }
        });
	},
};