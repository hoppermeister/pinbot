const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flipper-skills')
		.setDescription('Replies with flipper skill gifs'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};