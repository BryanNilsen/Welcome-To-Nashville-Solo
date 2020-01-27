import { apiManager } from "./apiManager.js";
import * as restaurantManager from "./restaurantManager.js";
import * as artworkManager from "./artworkManager.js";
import * as concertManager from "./concertManager.js";
import { getItineraryAndRenderToDOM } from "./itineraryManager.js"



getItineraryAndRenderToDOM();
apiManager.getParks();
