const Greeting = require("./base");

module.exports = class Goodbye extends Greeting {
	constructor() {
		super();
		this.textTitle = "GOODBYE";
		this.textMessage = "Leaving {server}";
		this.colorTitle = "#ff5959";
	}
};
