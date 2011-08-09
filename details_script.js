function parse_beer_list(event) {
	var beer_list = get_beer_list();
	console.log("file obtained: " + JSON.stringify(event.target.result));
	var lines = event.target.result.split('\n');
	console.log("number of lines: " + lines.length);
	var ignored_count = 0;
	
	for (var i = 1; i < lines.length; i++) {
		var elements = lines[i].split(',');
		if (elements.length != 9) {
			console.log("ignoring line " + (i + 1) + ": " + lines[i]);
			ignored_count++;
			continue;
		}
		
		var time = elements[0];
		// 1. location
		// 2. state
		var name = elements[3];
		var style = elements[4];
		var brewery = elements[5];
		var format = elements[6];
		var origin = elements[7];
		var alcohol = elements[8];
		// Do something
	}
	
	// Add on to the ignored count because we ignored the header line
	beer_list.drank_beers = (lines.length - (ignored_count + 1));
	set_beer_list(beer_list);
}

function handle_beer_list(event) {
	var file = event.target.files[0];
	
	console.log('File type: ' + JSON.stringify(file));
	if (!file.name.match('.*[.]csv$')) {
		return;
	}
	
	var reader = new FileReader();
	reader.onload = (function(realFile) {
		return parse_beer_list;
	})(file);
	
	reader.readAsText(file);
}

function addListeners() {
	document.getElementById("import_beers").addEventListener("change", handle_beer_list, false);
}

function SortableTable(tableName) {
	this.columnHash = {};
	
	this.sort_by = function(columnName) {
		console.log("sorting by: " + columnName);
	};
	
	var table = document.getElementById(tableName);
	this.body = table.getElementsByTagName("tbody")[0];
	this.columns = table.getElementsByTagName("thead")[0];
	
	// Insert keys for the hash table
	var tableColumns = this.columns.getElementsByTagName("tr")[0].getElementsByTagName("th");
	for (var i = 0; i < tableColumns.length; i++) {
		this.columnHash[tableColumns[i].innerText] = i;
		var currentColumn = tableColumns[i];
		currentColumn.onmousedown = function(event) {
			this.sort_by(event.target.innerText);
		}.bind(this);
	}
	
	// Put all of the rows in an array
	this.rows = [];
	var tableRows = this.body.getElementsByTagName("tr");
	while (tableRows.length > 0) {
		this.rows.push(tableRows[0]);
		tableRows.shift();
	}
}


function get_beer_list() {
	if (!localStorage["beer_list"]) {
		return new Array();
	}
	
	return JSON.parse(localStorage["beer_list"]);
}

function add_cell(row, value) {
	var cell = row.insertCell(-1);
	
	cell.innerText = value;
}

function setup_table() {
	var list = get_beer_list();
	var sortTable = new SortableTable("beer_table");
	
	for(var i = 0; i < list.keys.length; i++) {
		var row = sortTable.body.insertRow(-1);
		var currentBeer = list.list[list.keys[i]];
		add_cell(row, currentBeer.name);
		var container = '';
		if (currentBeer.container.bottle) {
			container += '<img src="bottle.png" width="32px" alt="Bottle"/>';
		}
		if (currentBeer.container.draught) {
			container += '<img src="beer.png" width="32px" alt="Draught Beer"/>';
		}
		var cell = row.insertCell(-1);
		cell.innerHTML = container;
		add_cell(row, currentBeer.style);
		add_cell(row, currentBeer.alcohol);
		add_cell(row, currentBeer.description);
		add_cell(row, currentBeer.brewery);
		add_cell(row, currentBeer.origin);
		add_cell(row, currentBeer.picture);
	}
}