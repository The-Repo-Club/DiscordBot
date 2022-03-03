const { Client } = require("discord.js");

const express = require("express");
const fetch = require("node-fetch");
const { URLSearchParams } = require("url");
const app = express();

const port = 8080;

const config = {
	clientId: "937294229263224862",
	clientSecret: "35JlAKlwqF6GtkvtUZ_UHEdssxn0rhnM",
	redirectUri: "http://localhost:8080/authorize",
	oauthURL:
		"https://discord.com/api/oauth2/authorize?client_id=937294229263224862&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauthorize&response_type=code&scope=identify",
};

app.get("/", (req, res) => {
	res.send("login with discord: <a href=" + config["oauthURL"] + ">login</a>");
});

app.get("/authorize", (req, res) => {
	var code = req.query["code"];
	var params = new URLSearchParams();
	params.append("client_id", config["clientId"]);
	params.append("client_secret", config["clientSecret"]);
	params.append("grant_type", "authorization_code");
	params.append("code", code);
	params.append("redirect_uri", config["redirectUri"]);
	fetch(`https://discord.com/api/oauth2/token`, {
		method: "POST",
		body: params,
	})
		.then((res) => res.json())
		.then((json) => {
			res.send("logged in");
			console.log(json);
		});
});

app.listen(port, () => {
	console.info(`Running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
	switch (err.message) {
		case "NoCodeProvided":
			return res.status(400).send({
				status: "ERROR",
				error: err.message,
			});
		default:
			return res.status(500).send({
				status: "ERROR",
				error: err.message,
			});
	}
});
