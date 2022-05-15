const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { ifpaToken } = require('./../config.json');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ifpa')
        .setDescription('Replies with IFPA player ranking profile lookup')
        .addStringOption(option => option.setName('input').setDescription('Enter player name lookup query').setRequired(true)),
	async execute(interaction) {
        
        const inputStringRaw = interaction.options.getString('input');
        const ifpaRequestUrl = `https://api.ifpapinball.com/v1/player/search?api_key=${ifpaToken}&q=${inputStringRaw}`;
        const searchResponseEmbed = new MessageEmbed();

        axios.get(ifpaRequestUrl)
        .then(response =>
        {
            console.log(response.data.search);

            searchResponseEmbed
                .setColor("#0099ff")
                .setTitle("IFPA Player Lookup")
                .setURL("https://www.ifpapinball.com/players/find.php")
                .setDescription(`Found ${response.data.search.length} records.`)
                .addFields(
                    response.data.search.map(x => {

                        return {
                            name: `${x.first_name} ${x.last_name}`,
                            value: `[${(x.city && x.state) ? `${x.city}, ${x.state} ${x.country_name}` : x.country_name} World Ranking: ${x.wppr_rank}](https://www.ifpapinball.com/player.php?p=${x.player_id})`,
                        }
                    })
                )

                
        interaction.reply({embeds: [searchResponseEmbed]});
            

        })
        .catch(error => {
            console.log(error);
        })

	},
};