const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Replies with a pinball trivia fact!'),
	async execute(interaction) {
		await interaction.reply("pinball trivia goes here.");
	},
};