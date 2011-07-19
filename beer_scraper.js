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

/*
    The page looks like this:
    <body>
    <div>
     <div>
      <div>
       <div>
        <div>
         <div>
          <div>
           <div>
            <div>
             Each div in here is a separate beer
             <div>
              The div inside here has a class of "beer-info"
              <div class="beer-info">
                 This is the one we want
                 <div class="header">
                  <div class="name"></div>
                  <div class="format"></div>
                  <div class="style"></div>
                  <div class="abv"></div>
                 </div>
                 <div class="body">
                  <div class="description">
                  
                  </div>
                  <div class="data">
                   <div class="brewery">
                    <span class="value"></span>
                   </div>
                   <div class="origin">
                    <span class="value"></span>
                   </div>
                  </div>
                 </div>
              </div>
             </div>
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
    </body>
*/
function findBeers() {
	var beerList = [];
	var beerDivs = document.getElementsByClassName('beer-info');
	
	for (var i = 0; i < beerDivs.length; i++) {
		var header = beerDivs[i].getElementsByClassName('header');
		var name = header[0].getElementsByClassName('name')[0].innerText;
		
		// update the container
		var format = header[0].getElementsByClassName('format')[0].innerText.toLowerCase();
		var container = { bottle: false, draught: false };
		if (format == 'bottle') {
			container.bottle = true;
		} else if (format == 'draught') {
			container.draught = true;
		}
		
		var style = header[0].getElementsByClassName('style')[0].innerText;
		var alcohol = header[0].getElementsByClassName('abv')[0].innerText;
		
		var body = beerDivs[i].getElementsByClassName('body');
		var description = body[0].getElementsByClassName('description')[0].innerText.replace('Add To Fridge', '').replace('Add Again', '').replace('<br>', '');
		
		var data = beerDivs[i].getElementsByClassName('data');
		var brewery = data[0].getElementsByClassName('brewery')[0].getElementsByClassName('value')[0].innerText;
		var origin = data[0].getElementsByClassName('origin')[0].getElementsByClassName('value')[0].innerText;
		
		beerList.push({ name: name, container: container, style: style, alcohol: alcohol, description: description, brewery: brewery, origin: origin, picture: '' });
	}
	
	return beerList;
}

console.log("Doing stuff.");
var beers = findBeers();

if (beers.length > 0) {
	chrome.extension.sendRequest(JSON.stringify(beers));
}