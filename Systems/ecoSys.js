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
 *   Sat 26 March 2022, 10:23:54 PM [GMT]
 *
 *Description:
 *   ecoSys System for Minimal-Mistakes#3775
 *
 *Dependencies:
 *   node, npm, discord.js, chalk, cli-box, ecoDB, config.json,
 **/

const mongodb = require("mongoose");
const DB = require("../Structures/Schemas/ecoDB");
const chalk = require("chalk");
const Box = require("cli-box");
const { EventEmitter } = require("events");
const ecoSysEvent = new EventEmitter();

class ecoSys {
	static async connect(uri) {
		if (!uri) throw new typeError("[ecoSys] - Invalid URI");
		try {
			await mongodb.connect(uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			ecoSysEvent.emit("ready");
		} catch (err) {
			throw new Error(err);
		}
	}

	static async joinEcoSystem(userID, guildID) {
		if (!userID)
			return {
				error: {
					message: "Invalid userID.",
				},
			};
		if (!guildID)
			return {
				error: {
					message: "Invalid guildID.",
				},
			};

		const data = await DB.findOne({ userID: userID, guildID: guildID }).exec();
		if (data) {
			return {
				error: {
					message: "Already Joined.",
				},
			};
		} else {
			const newWallet = new DB({
				userID: userID,
				guildID: guildID,
			});
			newWallet.save();
			return {
				joined: true,
				guild: guildID,
				user: userID,
			};
		}
	}

	static async addWallet(userID, guildID, amount) {
		if (!userID)
			return {
				error: {
					message: "Invalid userID.",
				},
			};
		if (!guildID)
			return {
				error: {
					message: "Invalid guildID.",
				},
			};
		if (!amount || isNaN(amount) || amount < 0)
			return {
				error: {
					message: "Invalid amount.",
				},
			};

		const data = await DB.findOne({ userID: userID, guildID: guildID }).exec();
		if (!data) {
			return {
				error: {
					message: "Invalid data.",
				},
			};
		} else {
			data.currency.wallet += parseInt(amount);
			data.save();

			return {
				currency: {
					wallet: data.currency.wallet,
					bank: data.currency.bank,
				},
				guild: data.guildID,
				user: data.userID,
			};
		}
	}

	static async removeWallet(userID, guildID, amount) {
		if (!userID)
			return {
				error: {
					message: "Invalid userID.",
				},
			};
		if (!guildID)
			return {
				error: {
					message: "Invalid guildID.",
				},
			};
		if (!amount || isNaN(amount) || amount < 0)
			return {
				error: {
					message: "Invalid amount.",
				},
			};

		const data = await DB.findOne({ userID: userID, guildID: guildID }).exec();
		if (!data) {
			return {
				error: {
					message: "Invalid data.",
				},
			};
		} else {
			data.currency.wallet -= parseInt(amount);
			data.save();

			return {
				currency: {
					wallet: data.currency.wallet,
					bank: data.currency.bank,
				},
				guild: data.guildID,
				user: data.userID,
			};
		}
	}

	static async addBank(userID, guildID, amount) {
		if (!userID)
			return {
				error: {
					message: "Invalid userID.",
				},
			};
		if (!guildID)
			return {
				error: {
					message: "Invalid guildID.",
				},
			};
		if (!amount || isNaN(amount) || amount < 0)
			return {
				error: {
					message: "Invalid amount.",
				},
			};

		const data = await DB.findOne({ userID: userID, guildID: guildID }).exec();
		if (!data) {
			return {
				error: {
					message: "Invalid data.",
				},
			};
		} else {
			data.currency.bank += parseInt(amount);
			data.save();

			return {
				currency: {
					wallet: data.currency.wallet,
					bank: data.currency.bank,
				},
				guild: data.guildID,
				user: data.userID,
			};
		}
	}

	static async removeBank(userID, guildID, amount) {
		if (!userID)
			return {
				error: {
					message: "Invalid userID.",
				},
			};
		if (!guildID)
			return {
				error: {
					message: "Invalid guildID.",
				},
			};
		if (!amount || isNaN(amount) || amount < 0)
			return {
				error: {
					message: "Invalid amount.",
				},
			};

		const data = await DB.findOne({ userID: userID, guildID: guildID }).exec();
		if (!data) {
			return {
				error: {
					message: "Invalid data.",
				},
			};
		} else {
			data.currency.bank -= parseInt(amount);
			data.save();

			return {
				currency: {
					wallet: data.currency.wallet,
					bank: data.currency.bank,
				},
				guild: data.guildID,
				user: data.userID,
			};
		}
	}

	static async deposit(userID, guildID, amount) {
		if (!userID)
			return {
				error: {
					message: "Invalid userID.",
				},
			};
		if (!guildID)
			return {
				error: {
					message: "Invalid guildID.",
				},
			};
		if (!amount || isNaN(amount) || amount < 0)
			return {
				error: {
					message: "Invalid amount.",
				},
			};

		const data = await DB.findOne({ userID: userID, guildID: guildID }).exec();
		if (!data) {
			return {
				error: {
					message: "Invalid data.",
				},
			};
		} else {
			if (data.currency.wallet < amount) {
				return {
					error: {
						message: "Invalid amount too low.",
					},
				};
			}
			data.currency.bank += parseInt(amount);
			data.currency.wallet -= parseInt(amount);
			data.save();
		}
	}

	static async withdraw(userID, guildID, amount) {
		if (!userID)
			return {
				error: {
					message: "Invalid userID.",
				},
			};
		if (!guildID)
			return {
				error: {
					message: "Invalid guildID.",
				},
			};
		if (!amount || isNaN(amount) || amount < 0)
			return {
				error: {
					message: "Invalid amount.",
				},
			};

		const data = await DB.findOne({ userID: userID, guildID: guildID }).exec();
		if (!data) {
			return {
				error: {
					message: "Invalid data.",
				},
			};
		} else {
			if (data.currency.bank < amount) {
				return {
					error: {
						message: "Invalid amount too low.",
					},
				};
			}
			data.currency.wallet += parseInt(amount);
			data.currency.bank -= parseInt(amount);
			data.save();
		}
	}

	static async getBalance(userID, guildID) {
		if (!userID)
			return {
				error: {
					message: "Invalid userID.",
				},
			};
		if (!guildID)
			return {
				error: {
					message: "Invalid guildID.",
				},
			};

		const data = await DB.findOne({ userID: userID, guildID: guildID }).exec();
		if (!data) {
			return {
				error: {
					message: "Invalid data.",
				},
			};
		}
		return {
			currency: {
				wallet: data.currency.wallet,
				bank: data.currency.bank,
			},
			guild: data.guildID,
			user: data.userID,
		};
	}

	static async pay(userID, userID2, guildID, amount) {
		if (!userID)
			return {
				error: {
					message: "Invalid userID.",
				},
			};
		if (!userID2)
			return {
				error: {
					message: "Invalid userID2.",
				},
			};
		if (!guildID)
			return {
				error: {
					message: "Invalid guildID.",
				},
			};
		if (!amount || isNaN(amount) || amount < 0)
			return {
				error: {
					message: "Invalid amount.",
				},
			};

		const user1 = await DB.findOne({ userID: userID, guildID: guildID }).exec();
		const user2 = await DB.findOne({ userID: userID2, guildID: guildID }).exec();
		if (!user1 || !user2) {
			return {
				error: {
					message: "Invalid data.",
				},
			};
		}
		if (user1) {
			user1.currency.wallet -= parseInt(amount);
			user1.save();
		}
		if (user1.currency.wallet < amount)
			return {
				error: {
					message: "Invalid amount too high/low.",
				},
			};

		if (user2) {
			user2.currency.wallet += amount;
			user2.save();
		}

		return [
			{
				currency: {
					wallet: user1.currency.wallet,
					bank: user1.currency.bank,
				},
				guild: user1.guildID,
				user: user1.userID,
			},
			{
				currency: {
					wallet: user2.currency.wallet,
					bank: user2.currency.bank,
				},
				guild: user2.guildID,
				user: user2.userID,
			},
		];
	}

	static async icon() {
		return "₪";
	}
}

module.exports = ecoSys;

ecoSysEvent.on("ready", (msg) => {
	const boxHeader = new Box(
		{
			w: Math.floor(66),
			h: 1,
			stringify: false,
			marks: {
				nw: "╔",
				n: "═",
				ne: "╗",
				e: "║",
				se: "╝",
				s: "═",
				sw: "╚",
				w: "║",
			},
			hAlign: "middle",
		},
		"E C O   S Y S T E M   I N F O R M A T I O N"
	).stringify();

	const boxContent = new Box(
		{
			w: Math.floor(66),
			h: 3,
			stringify: false,
			marks: {
				nw: "╔",
				n: "═",
				ne: "╗",
				e: "║",
				se: "╝",
				s: "═",
				sw: "╚",
				w: "║",
			},
			hAlign: "middle",
		},
		`
${chalk.yellowBright("The eco system is now connected to the database! ")}
`
	).stringify();

	console.log(chalk.bold.greenBright(boxHeader));
	console.log(chalk.bold.greenBright(boxContent));
});
