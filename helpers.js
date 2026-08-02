const { activities } = require('discord.js');
const { writeFileSync } = require('node:fs');
const { uptime } = require('process');

function saveRolesCache(roles) {
  writeFileSync(
    './commands/roles.json',
    JSON.stringify(roles, undefined, 4),
    (err) => {
      if (err) console.error(err);
    },
  );
}

function setBotActivity(clientUser) {
  const i = Math.floor(Math.random() * activities.length);
  clientUser.setActivity(activities[i].text, { type: activities[i].type });
}


function startPingTimeout(role) {
  try {
    role.setMentionable(false);
    console.log(`${role.name} was mentioned.\nStarting timeout...`);

    client.roles.forEach((i) => {
      if (role.id === i.roleId) {
        setTimeout(() => {
          role.setMentionable(true);
          i.underTimeout = false;
          saveRolesCache();
          console.log(
            `Timeout comepleted after ${ms(i.timeout, { long: true })}.`,
          );
        }, i.timeout);
      }
    });
  } catch {
    console.log('Unable to start ping timeout!');
  }
}


function formatUptime() {
  let totalSeconds = Math.floor(uptime() / 1000);
  const days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  let uptimeString = '';
  if (days > 0) uptimeString += `${days} days, `;
  if (hours > 0) uptimeString += `${hours} hours, `;
  if (minutes > 0) uptimeString += `${minutes} minutes, `;
  uptimeString += `${seconds} seconds`;

  return uptimeString;
}


module.exports = { saveRolesCache, setBotActivity, startPingTimeout, formatUptime };