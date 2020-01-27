// import api functionality
import { apiManager } from "./apiManager.js";

// get reference to itinerary Dom element
const itineraryContainer = document.getElementById("itinerary_results")

//
const itineraryAsHTML = (itinerary) => {
  return `
    <p>Park: ${itinerary.park.name} - Location: ${itinerary.park.address}</p>
    <p>Concert: ${itinerary.concert.name} - Location: ${itinerary.concert.address}</p>
    <p>Restaurant: ${itinerary.restaurant.name} - Location: ${itinerary.restaurant.address}</p>
    <p>Artwork: ${itinerary.artwork.name} - Location: ${itinerary.artwork.address}</p>
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