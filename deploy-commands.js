const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, pinballPeopleGuildId, discordToken } = require('./config.json');

const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}
const rest = new REST({ version: '9' }).setToken(discordToken);

// Only applies to guildId Discord server, but updates instantly. Global commands take 1hr+ to permiate
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands in LGN Discord.'))
    .catch(console.error);

// Only applies to guildId Discord server, but updates instantly. Global commands take 1hr+ to permiate
rest.put(Routes.applicationGuildCommands(clientId, pinballPeopleGuildId), { body: commands })
	.then(() => console.log('Successfully registered application commands at Pinball People.'))
    .catch(console.error);

// Global application command registration
rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);