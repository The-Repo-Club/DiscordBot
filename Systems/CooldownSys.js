const cooldownsDB = require("../Structures/Schemas/cooldownsDB");
const ms = require("ms");

module.exports = (client) => {
	cooldownsDB.find().then((documents) => {
		documents.forEach((doc) => {
			let timestamp = doc.Time - Date.now();
			let time = Math.floor(timestamp);

			if (time <= 0) return doc.delete();

			client.cooldowns.set(doc.Details, doc.Time);

			setTimeout(async () => {
				client.cooldowns.delete(`${doc.Details}`);
				doc.delete();
			}, ms(time));
		});
	});
};
