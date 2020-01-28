import { apiManager } from "./apiManager.js";
import * as restaurantManager from "./restaurantManager.js";
import * as artworkManager from "./artworkManager.js";
import * as concertManager from "./concertManager.js";
import * as parksManager from "./parksManager.js";
import { getItineraryAndRenderToDOM } from "./itineraryManager.js"
import * as navigation from "./navigation.js"



getItineraryAndRenderToDOM();
apiManager.getParks();
