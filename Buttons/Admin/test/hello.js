module.exports = {
	id: "Hello",
	path: "Admin/test/hello.js",
	permission: "ADMINISTRATOR",
	execute(interaction) {
		interaction.reply({ content: "Yayyy its working", ephemeral: true });
	},
};
