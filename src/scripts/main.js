import { apiManager } from "./apiManager.js";
import * as restaurantManager from "./restaurantManager.js";
import * as artworkManager from "./artworkManager.js";
import { getItineraryAndRenderToDOM } from "./itineraryManager.js"


// apiManager.getMuseums();
// apiManager.getParks();
// apiManager.getTickets();
// apiManager.getRestaurants("chicken");

getItineraryAndRenderToDOM();

// add current date to page
const moment = moment().format("dddd, MMM Do, YYYY");
document.getElementById("moment").append(moment)