/*
This file is part of the tmac_chrome_extension.

tmac_chrome_extension is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

tmac_chrome_extension is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with tmac_chrome_extension.  If not, see <http://www.gnu.org/licenses/>.
*/

function findBeers() {
	return [{name: "Random", container: { bottle: true, draught: false }, style: "", alcohol: "", description: "", brewery: "", origin: "", picture: ""}];
}

console.log("Doing stuff.");
var beers = findBeers();

if (beers.length > 0) {
	chrome.extension.sendRequest(JSON.stringify(beers));
}