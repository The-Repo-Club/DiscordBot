const Greeting = require("./base");

module.exports = class Welcome extends Greeting {
	constructor() {
		super();
		this.textTitle = "WELCOME";
		this.textMessage = "Welcome to {server}";
		this.colorTitle = "#59fff9";
	}
};
