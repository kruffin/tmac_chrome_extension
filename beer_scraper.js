function findBeers() {
	return [{name: "Random", container: "", style: "", alcohol: "", description: "", brewery: "", origin: "", picture: ""}];
}

console.log("Doing stuff.");
var beers = findBeers();

if (beers.length > 0) {
	chrome.extension.sendRequest(JSON.stringify(beers));
}