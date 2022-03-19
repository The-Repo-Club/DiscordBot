module.exports = {
	id: "Bye",
	path: "Admin/test/bye.js",
	// permission: "ADMINISTRATOR",
	ownerOnly: true,
	execute(interaction) {
		interaction.reply({ content: "Yayyy its working", ephemeral: true });
	},
};
