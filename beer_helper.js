function Beer() {
	this.name = "";        <!-- The name of the beer. -->
	this.container = { bottle: false, draught: false };   <!-- If it's in bottle or draught. -->
	this.style = "";       <!-- What type of beer (IPA, Dark, etc.) -->
	this.alcohol = "";     <!-- How drunk you get ;) -->
	this.description = ""; <!-- A description of the beer. -->
	this.brewery = "";     <!-- The name of the brewery. -->
	this.origin = "";      <!-- The place of origin. -->
	this.price = "";     <!-- The price of the beer -->
}


function addBeerToStorage(beer, beerList) {
	
	<!-- locate the current beer if it already exists. -->
	var existingBeer = beerList.list[beer.name];
	
	if (!existingBeer) {
		beerList.keys.push(beer.name);
		beerList.list[beer.name] = beer;
	} else if (existingBeer.container) {
		<!-- Update the available containers if new. -->
		if (beer.container.bottle) {
			existingBeer.container.bottle = beer.container.bottle;
		}
		if (beer.container.draught) {
			existingBeer.container.draught = beer.container.draught;
		}
		
		beerList.list[existingBeer.name] = existingBeer;
	}
}

function get_beer_list() {
	if (!localStorage["beer_list"]) {
		return { list: {}, keys: [], drank_beers: 0, 
				 advancement: {
					 credits: [13, 75, 125, 175, 225, 275, 325, 425, 575, 750, 1000],
					 names: ["Pledge", "$10", "Bachelors", "$20", "Masters", 
							 "$30", "Ph.D", "$50", "Professor", "Dean", "Chancellor"]
				 }
		};
	}
	
	return JSON.parse(localStorage["beer_list"]);
}

function set_beer_list(beerList) {
	localStorage["beer_list"] = JSON.stringify(beerList);	
}

function open_tab(name) {
	chrome.tabs.create({url: name});	
}