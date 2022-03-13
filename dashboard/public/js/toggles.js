(function () {
	var currentLocation = $("body").attr("rel");

	var lastSegment = window.location.pathname.split("/").pop();
	var currentGuild = $(`#${lastSegment}`).attr("rel");

	switch (currentGuild) {
		case lastSegment:
			var head_levels = document.getElementById("head_levels");

			var rel_levels = document.getElementById(lastSegment);
			var levels_toggle = document.getElementById("levels_toggle");

			head_levels.classList.add("active");

			rel_levels.classList.add("active");
			levels_toggle.classList.add("show");
			break;
	}

	switch (currentLocation) {
		case "home":
			var rel_home = document.getElementById("rel_home");
			rel_home.classList.add("active");
			break;

		case "commands":
			var head_dashboards = document.getElementById("head_dashboards");

			var rel_commands = document.getElementById("rel_commands");
			var dashboards_toggle = document.getElementById("dashboards_toggle");

			head_dashboards.classList.add("active");

			rel_commands.classList.add("active");
			dashboards_toggle.classList.add("show");
			break;

		case "dashboard":
			var head_dashboards = document.getElementById("head_dashboards");

			var rel_dashboard = document.getElementById("rel_dashboard");
			var dashboards_toggle = document.getElementById("dashboards_toggle");

			head_dashboards.classList.add("active");

			rel_dashboard.classList.add("active");
			dashboards_toggle.classList.add("show");
			break;
	}
})();
