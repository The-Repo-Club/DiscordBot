/*-*-coding:utf-8 -*-
 *Auto updated?
 *   Yes
 *File :
 *   DiscordBot/Systems/ecoSys.js
 *Author :
 *   The-Repo-Club [wayne6324@gmail.com]
 *Github :
 *   https://github.com/The-Repo-Club/
 *
 *Created:
 *   Thu 24 March 2022, 07:24:44 PM [GMT]
 *Last edited:
 *   Thu 24 March 2022, 11:12:37 PM [GMT]
 *
 *Description:
 *   ecoSys System for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, ecoDB, config.json
 **/

const mongodb = require("mongoose");
const DB = require("../Structures/Schemas/ecoDB");

class ecoSys {
	static async connect(uri) {
		if (!uri) throw new typeError("[ecoSys] - Invalid URI");
		try {
			await mongodb.connect(uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
		} catch (err) {
			throw new Error(err);
		}
	}

	static async joinEcoSystem(userID, guildID) {
		if (!userID) throw new Error("Invalid userID");
		if (!guildID) throw new Error("Invalid guildID");

		const data = await DB.findOne({ userID: userID, guildID: guildID }).exec();
		if (data) {
			throw new Error("Already Joined.");
		} else {
			const newWallet = new DB({
				userID: userID,
				guildID: guildID,
			});
			newWallet.save();
		}
		return;
	}

	static async addWallet(userID, guildID, amount) {
		if (!userID) return new Error("Invalid userID");
		if (!guildID) return new Error("Invalid guildID");
		if (!amount) return new Error("Invalid amount");
		if (isNaN(amount)) return new Error("Invalid amount");
		if (amount < 0) return new Error("Invalid amount");

		const data = await DB.findOne({ userID: userID, guildID: guildID }).exec();
		if (!data) {
			throw new Error("Already Joined.");
		} else {
			data.currency.wallet += parseInt(amount);
			data.save();
		}
	}

	static async removeWallet(userID, guildID, amount) {
		if (!userID) return new Error("Invalid userID");
		if (!guildID) return new Error("Invalid guildID");
		if (!amount) return new Error("Invalid amount");
		if (isNaN(amount)) return new Error("Invalid amount");
		if (amount < 0) return new Error("Invalid amount");

		DB.findOne({ userID: userID, guildID: guildID }, (err, res) => {
			if (err) throw new Error(err);
			if (!res) {
				throw new Error("No valid data in database.");
			} else {
				res.currency.wallet -= parseInt(amount);
				res.save();
			}
		});
	}

	static async addBank(userID, guildID, amount) {
		if (!userID) return new Error("Invalid userID");
		if (!guildID) return new Error("Invalid guildID");
		if (!amount) return new Error("Invalid amount");
		if (isNaN(amount)) return new Error("Invalid amount");
		if (amount < 0) return new Error("Invalid amount");

		DB.findOne({ userID: userID, guildID: guildID }, (err, res) => {
			if (err) throw new Error(err);
			if (!res) {
				throw new Error("No valid data in database.");
			} else {
				res.currency.bank += parseInt(amount);
				res.save();
			}
		});
	}

	static async removeBank(userID, guildID, amount) {
		if (!userID) return new Error("Invalid userID");
		if (!guildID) return new Error("Invalid guildID");
		if (!amount) return new Error("Invalid amount");
		if (isNaN(amount)) return new Error("Invalid amount");
		if (amount < 0) return new Error("Invalid amount");

		DB.findOne({ userID: userID, guildID: guildID }, (err, res) => {
			if (err) throw new Error(err);
			if (!res) {
				throw new Error("No valid data in database.");
			} else {
				res.currency.bank -= parseInt(amount);
				res.save();
			}
		});
	}

	static async deposit(userID, guildID, amount) {
		if (!userID) throw new Error("Invalid userID");
		if (!guildID) throw new Error("Invalid guildID");
		if (!amount) throw new Error("Invalid amount");
		if (isNaN(amount)) throw new Error("Invalid amount");
		if (amount < 0) throw new Error("Invalid amount");

		DB.findOne({ userID: userID, guildID: guildID }, (err, res) => {
			if (err) throw new Error(err);
			if (!res) {
				throw new Error("No valid data in database.");
			} else {
				res.currency.bank += parseInt(amount);
				res.currency.wallet -= parseInt(amount);
				res.save();
			}
		});
	}

	static async withdraw(userID, guildID, amount) {
		if (!userID) throw new Error("Invalid userID");
		if (!guildID) throw new Error("Invalid guildID");
		if (!amount) throw new Error("Invalid amount");
		if (isNaN(amount)) throw new Error("Invalid amount");
		if (amount < 0) throw new Error("Invalid amount");

		DB.findOne({ userID: userID, guildID: guildID }, (err, res) => {
			if (err) throw new Error(err);
			if (!res) {
				throw new Error("No valid data in database.");
			} else {
				res.currency.wallet += parseInt(amount);
				res.currency.bank -= parseInt(amount);
				res.save();
			}
		});
	}

	static async getBalance(userID, guildID) {
		if (!userID) throw new Error("Invalid userID");
		if (!guildID) throw new Error("Invalid guildID");

		const data = await DB.findOne({ userID: userID, guildID: guildID }).exec();
		if (!data) {
			throw new Error("No valid data in database.");
		}
		return data;
	}

	static async pay(userID, userID2, guildID, amount) {
		if (!userID) throw new Error("Invalid userID");
		if (!guildID) throw new Error("Invalid guildID");
		if (!amount) throw new Error("Invalid amount");
		if (isNaN(amount)) throw new Error("Invalid amount");
		if (amount < 0) throw new Error("Invalid amount");
		if (!userID2) throw new Error("Invalid user2 ID");

		const user1 = await DB.findOne({ userID: userID, guildID: guildID }).exec();
		const user2 = await DB.findOne({ userID: userID2, guildID: guildID }).exec();
		if (!user1 || !user2) {
			throw new Error("No valid data in database.");
		}
		if (user1) {
			user1.currency.wallet -= parseInt(amount);
			user1.save();
		}
		if (user1.currency.wallet < amount) throw new Error("Not enough money");

		if (user2) {
			user2.currency.wallet += amount;
			user2.save();
		}
	}
}
module.exports = ecoSys;
