const Canvas = require("canvas");
const { formatVariable, applyText } = require("../functions");

module.exports = class RankCard {
	constructor() {
		this.backgroundImage = `${__dirname}/Images/1px.png`;
		this.avatar = `${__dirname}/Images/default-avatar.png`;
		this.level = "1";
		this.rank = "10";
		this.rankName = "rank Name";
		this.reputation = "0";
		this.username = "username";
		this.xpCurrent = 8000;
		this.xpNeeded = 12000;
		this.addonReputation = true;
		this.addonRank = true;
		this.addonRankName = true;
		this.colorBackground = "#000000";
		this.colorLevelBox = "#ff7b4b";
		this.colorReputationBox = "#ff7b4b";
		this.colorLevel = "#ffffff";
		this.colorRank = "#ffffff";
		this.colorRankName = "#ffffff";
		this.colorUsername = "#ffffff";
		this.colorReputation = "#ffffff";
		this.colorBackgroundBar = "#000000";
		this.colorNeededXp = "#ffffff";
		this.colorBar = "#ffffff";
		this.radiusCorner = "20";
		this.opacityAvatar = "0.4";
		this.opacityLevel = "1";
		this.opacityBackgroundBar = "0.4";
		this.opacityReputation = "1";
		this.textLevel = "lvl {level}";
		this.textNeededXp = "{current}/{needed} for next rank";
		this.textReputation = "+{reputation} rep";
	}

	setAvatar(value) {
		this.avatar = value;
		return this;
	}

	setUsername(value) {
		this.username = value;
		return this;
	}

	setRank(value) {
		this.rank = value;
		return this;
	}

	setLevel(value) {
		this.level = value;
		return this;
	}

	setReputation(value) {
		this.reputation = value;
		return this;
	}

	setRankName(value) {
		this.rankName = value;
		return this;
	}

	setBackground(value) {
		this.backgroundImage = value;
		return this;
	}

	setXP(variable, value) {
		const formattedVariable = formatVariable("xp", variable);
		if (this[formattedVariable]) this[formattedVariable] = value;
		return this;
	}

	setColor(variable, value) {
		const formattedVariable = formatVariable("color", variable);
		if (this[formattedVariable]) this[formattedVariable] = value;
		return this;
	}

	setText(variable, value) {
		const formattedVariable = formatVariable("text", variable);
		if (this[formattedVariable]) this[formattedVariable] = value;
		return this;
	}

	setOpacity(variable, value) {
		const formattedVariable = formatVariable("opacity", variable);
		if (this[formattedVariable]) this[formattedVariable] = value;
		return this;
	}

	setAddon(variable, value) {
		const formattedVariable = formatVariable("addon", variable);
		if (this[formattedVariable]) this[formattedVariable] = value;
		return this;
	}

	setRadius(value) {
		this.radiusCorner = value;
		return this;
	}

	async toAttachment() {
		let canvas = Canvas.createCanvas(1080, 400),
			ctx = canvas.getContext("2d");

		const lvlText = this.textLevel.replace(/{level}/g, this.level);
		const repText = this.textReputation.replace(
			/{reputation}/g,
			this.reputation
		);

		// Background
		ctx.beginPath();
		ctx.moveTo(0 + Number(this.radiusCorner), 0);
		ctx.lineTo(0 + 1080 - Number(this.radiusCorner), 0);
		ctx.quadraticCurveTo(0 + 1080, 0, 0 + 1080, 0 + Number(this.radiusCorner));
		ctx.lineTo(0 + 1080, 0 + 400 - Number(this.radiusCorner));
		ctx.quadraticCurveTo(
			0 + 1080,
			0 + 400,
			0 + 1080 - Number(this.radiusCorner),
			0 + 400
		);
		ctx.lineTo(0 + Number(this.radiusCorner), 0 + 400);
		ctx.quadraticCurveTo(0, 0 + 400, 0, 0 + 400 - Number(this.radiusCorner));
		ctx.lineTo(0, 0 + Number(this.radiusCorner));
		ctx.quadraticCurveTo(0, 0, 0 + Number(this.radiusCorner), 0);
		ctx.closePath();
		ctx.clip();
		ctx.fillStyle = this.colorBackground;
		ctx.fillRect(0, 0, 1080, 400);
		let background = await Canvas.loadImage(this.backgroundImage);
		ctx.drawImage(background, 0, 0, 1080, 400);
		ctx.restore();

		// Draw layer
		ctx.fillStyle = "#000000";
		ctx.globalAlpha = this.opacityAvatar;
		ctx.fillRect(50, 0, 240, canvas.height);
		ctx.globalAlpha = 1;

		// Avatar
		let avatar = await Canvas.loadImage(this.avatar);
		ctx.drawImage(avatar, 50 + 30, 30, 180, 180);

		// Level
		ctx.fillStyle = this.colorLevelBox;
		ctx.globalAlpha = this.opacityLevel;
		ctx.fillRect(50 + 30, 30 + 180 + 30, 180, 50);
		ctx.globalAlpha = 1;
		ctx.fillStyle = this.colorLevel;
		ctx.font = applyText(canvas, lvlText, 32, 170, "Bold");
		ctx.textAlign = "center";
		ctx.fillText(lvlText, 50 + 30 + 180 / 2, 30 + 180 + 30 + 38);

		// Rep
		if (this.addonReputation) {
			ctx.fillStyle = this.colorReputationBox;
			ctx.globalAlpha = this.opacityReputation;
			ctx.fillRect(50 + 30, 30 + 180 + 30 + 50 + 30, 180, 50);
			ctx.globalAlpha = 1;
			ctx.fillStyle = this.colorReputation;
			ctx.font = applyText(canvas, repText, 32, 170, "Bold");
			ctx.textAlign = "center";
			ctx.fillText(repText, 50 + 30 + 180 / 2, 30 + 180 + 30 + 30 + 50 + 38);
		}

		// Username
		ctx.textAlign = "left";
		ctx.fillStyle = this.colorUsername;
		ctx.font = applyText(canvas, this.username, 45, 460, "Bold");
		ctx.fillText(this.username, 50 + 240 + 45 + 5, 80);

		// Rank
		if (this.addonRank) {
			ctx.textAlign = "right";
			ctx.fillStyle = this.colorRank;
			ctx.font = applyText(canvas, "#" + this.rank, 45, 194, "Bold");
			ctx.fillText("#" + this.rank, canvas.width - 50 - 5, 80);
		}
		if (this.addonRankName) {
			ctx.textAlign = "left";
			ctx.fillStyle = this.colorRankName;
			ctx.font = applyText(canvas, this.rankName, 35, 690, "Bold");
			ctx.fillText(this.rankName, 50 + 240 + 45 + 5, 80 + 45 + 15);
		}

		// XP
		ctx.globalAlpha = 1;
		const latestXP = Number(this.xpNeeded) - Number(this.xpCurrent);
		const textXPEdited = this.textNeededXp
			.replace(/{needed}/g, this.xpNeeded)
			.replace(/{current}/g, this.xpCurrent)
			.replace(/{latest}/g, latestXP);
		ctx.textAlign = "center";
		ctx.fillStyle = this.colorNeededXp;
		ctx.font = applyText(canvas, textXPEdited, 25, 690, "Bold");
		ctx.fillText(
			textXPEdited,
			50 + 240 + 45 + 5 + 690 / 2,
			80 + 45 + 15 + 30 + 90
		);
		ctx.beginPath();
		ctx.moveTo(240 + 50 + 50 + 25, 80 + 45 + 10 + 40);
		ctx.lineTo(240 + 50 + 50 + 700 - 25, 80 + 45 + 10 + 40);
		ctx.quadraticCurveTo(
			240 + 50 + 50 + 700,
			80 + 45 + 10 + 40,
			240 + 50 + 50 + 700,
			80 + 45 + 10 + 40 + 25
		);
		ctx.lineTo(240 + 50 + 50 + 700, 80 + 45 + 10 + 40 + 50 - 25);
		ctx.quadraticCurveTo(
			240 + 50 + 50 + 700,
			80 + 45 + 10 + 40 + 50,
			240 + 50 + 50 + 700 - 25,
			80 + 45 + 10 + 40 + 50
		);
		ctx.lineTo(240 + 50 + 50 + 25, 80 + 45 + 10 + 40 + 50);
		ctx.quadraticCurveTo(
			240 + 50 + 50,
			80 + 45 + 10 + 40 + 50,
			240 + 50 + 50,
			80 + 45 + 10 + 40 + 50 - 25
		);
		ctx.lineTo(240 + 50 + 50, 80 + 45 + 10 + 40 + 25);
		ctx.quadraticCurveTo(
			240 + 50 + 50,
			80 + 45 + 10 + 40,
			240 + 50 + 50 + 25,
			80 + 45 + 10 + 40
		);
		ctx.closePath();
		ctx.clip();
		ctx.fillStyle = this.colorBackgroundBar;
		ctx.globalAlpha = this.opacityBackgroundBar;
		ctx.fillRect(240 + 50 + 50, 80 + 45 + 10 + 40, 700, 50);
		ctx.fillStyle = this.colorBar;
		ctx.globalAlpha = 1;
		const percent = (100 * this.xpCurrent) / this.xpNeeded;
		const progress = (percent * 700) / 100;
		ctx.fillRect(240 + 50 + 50, 80 + 45 + 10 + 40, progress, 50);
		ctx.restore();
		return canvas;
	}
};
