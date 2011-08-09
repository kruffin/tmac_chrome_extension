function findBeer(beer, beerList) {
	if (beerList[beer.name]) {
		return JSON.parse(beerList[beer.name]);
	}
	return null;
}


function pull_beers() {
	console.log("logging...");
	
	chrome.tabs.executeScript(null, {file: 'beer_scraper.js'});
}

function set_total() {
	document.getElementById("total").innerText = get_beer_list().keys.length;
}

<!-- Add a listener for the scraper running in the page context. -->
chrome.extension.onRequest.addListener(function(beers, sender, sendResponse) {
	
	var storedList = get_beer_list();
	var beerList = JSON.parse(beers);
	
	for (var i = 0; i < beerList.length; i++) {
		addBeerToStorage(beerList[i], storedList);
	}
	
	set_beer_list(storedList);
	set_total();
	sendResponse({});
});

function get_goal() {
	var beerList = get_beer_list();
	var currentTotal = beerList.drank_beers;
	var foundIndex = -1;
	for (var i = 0; i < beerList.advancement.credits.length; i++) {
		if (currentTotal < beerList.advancement.credits[i]) {
			return { goal_credits: beerList.advancement.credits[i], goal_title: beerList.advancement.names[i], current_credits: currentTotal };
		}
	}
	
	return { goal_credits: -1, goal_title: "Error", current_credits: currentTotal };
}

function set_percentage() {
	var goal = get_goal();
	var percent = goal.current_credits / goal.goal_credits * 100;
	document.getElementById("progress").innerText = percent + "%";
	document.getElementById("progress_bar").width = percent + "%";
	document.getElementById("extra_progress").width = (100 - percent) + "%";
	document.getElementById("goal").innerText = goal.goal_title;
}
