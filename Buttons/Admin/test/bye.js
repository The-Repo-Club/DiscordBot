module.exports = {
	id: "Bye",
	path: "Admin/test/bye.js",
	ownerOnly: true,
	execute(interaction) {
		interaction.reply({ content: "Yayyy its working", ephemeral: true });
	},
};
