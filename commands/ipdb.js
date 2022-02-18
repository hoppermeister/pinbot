const { SlashCommandBuilder } = require('@discordjs/builders');
const ipdbUrlPrefix = `https://www.ipdb.org/search.pl?any=`;
const ipdbUrlSuffix = `&sortby=name&search=Search+Database&searchtype=quick`;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ipdb')
        .setDescription('Replies IPDB pinball machine lookup.')
        .addStringOption(option => option.setName('input').setDescription('Enter machine lookup text').setRequired(true)),

	async execute(interaction) {
        const inputStringRaw = interaction.options.getString('input');
        const inputParsed = inputStringRaw.split(' ').map(x => this.encode(x)).join('+');

		await interaction.reply(ipdbUrlPrefix + inputParsed + ipdbUrlSuffix);
    },
    
    encode(string) {
        return encodeURIComponent(string);
    }
};