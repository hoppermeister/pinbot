const { SlashCommandBuilder } = require('@discordjs/builders');

// True facts
const triviaFacts = [
	"Harry Williams was the first to add electric powered machines to pinball, inventing the tilt sensor and ball launcher and adding the first electric powered bells",
	"The first tilt sensor design by inventor Harry Williams was called a \"stool pigeon\"", ,
	"During NYC's 1940s pinball ban, 11,800 pinball machines were destroyed, and many of them were dumped into the Hudson River",
	"Pinball Flippers were first invented by Harry Mabs in 1947, Steve Korbek first placed two flippers at the bottom of the machine in 1948, and Wayne Neyens was the first to orient the flippers to flip towards each other in 1950",
	"Harry Mabs claimed to have invented the pop bumper, but Wayne Newens holds the first patent",
	"The soundtrack to Xenon's (Bally, 1980) soundtrack was written by five time Grammy award winning musician Suzanne Ciani, who's voice lines in the game also are the first female voice in a pinball game",
	"Gorgar (Williams, 1979) was the first game with voice callouts, speaking in combinations of seven different words"
];

const factDeck = shuffle(triviaFacts);

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
// https://stackoverflow.com/a/2450976
function shuffle(array) {
	let currentIndex = array.length,  randomIndex;
  
	// While there remain elements to shuffle.
	while (currentIndex != 0) {
  
	  // Pick a remaining element.
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
  
	return array;
  }

  let factIndex = 0;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Replies with a pinball trivia fact!'),
	async execute(interaction) {
		await interaction.reply(factDeck[factIndex++]);
		factIndex %= factDeck.length;
	},
};

