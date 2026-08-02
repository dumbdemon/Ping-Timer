const { Events, PermissionFlagsBits } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	once: false,
	execute(message) {
        if (message.author === message.client.user || message.author.bot) return;
    
        const roleMentions = message.mentions.roles;
    
        if (!message.member.permissions.has(PermissionFlagsBits.MentionEveryone)) {
          roleMentions.forEach((i) => {
            message.client.roles.forEach((j) => {
              if (i.id === j.roleId) {
                if (!j.underTimeout) {
                  j.underTimeout = true;
                  saveRolesCache();
                  startPingTimeout(i);
                }
              }
            });
          });
        }
	},
};