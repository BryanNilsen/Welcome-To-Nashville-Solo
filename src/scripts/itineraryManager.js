// import api functionality
import { apiManager } from "./apiManager.js";

// get reference to itinerary Dom element
const itineraryContainer = document.getElementById("itinerary_results")

//
const itineraryAsHTML = (itinerary) => {
  return `
    <div class="itinerary_results">
      <h2>Rock Out</h2>
      <h3>${itinerary.concert.name}<br />${itinerary.concert.address}</h3>
      <hr/>
      <h2>Park Your Butt</h2>
      <h3>${itinerary.park.name}<br />${itinerary.park.address}</h3>
      <hr/>
      <h2>Get Your Culture On</h2>
      <h3>${itinerary.artwork.name}<br />${itinerary.artwork.address}</h3>
      <hr/>
      <h2>Chow Down</h2>
      <h3>${itinerary.restaurant.name}<br />${itinerary.restaurant.address}</h3>
    </div>
  `
}

export const getItineraryAndRenderToDOM = () => {
  apiManager.getItinerary()
    .then(itineraryArray => {
      itineraryContainer.innerHTML = ""
      itineraryArray.forEach(itinerary => {
        itineraryContainer.innerHTML += itineraryAsHTML(itinerary)
      });
    })
}