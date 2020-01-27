import { apiKeys } from "./apiKeys.js";

// API Base URLs
const artCollectionsUrl = "https://data.nashville.gov/resource/eviu-nxp6.json"
const parksUrl = "https://data.nashville.gov/resource/74d7-b74t.json"
const ticketsUrl = "https://app.ticketmaster.com/discovery/v2/events.json"
const restaurantsUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city"

// Local DB from json server
const itineraryUrl = "http://localhost:3000/itinerary"

// Proxy URL if needed
const proxyUrl = "https://cors-anywhere.herokuapp.com/"

export const apiManager = {
  getMuseums() {
    const urlWithKey = `${artCollectionsUrl}?$$app_token=${apiKeys.nashvilleDataKey}`
    return fetch(urlWithKey)
      .then(response => response.json())
      .then(artCollections => console.log(artCollections))
  },
  getParks() {
    const urlWithKey = `${parksUrl}?$$app_token=${apiKeys.parksKey}`
    return fetch(urlWithKey)
      .then(response => response.json())
      .then(parks => console.log(parks))
  },
  getTickets() {
    const urlWithKey = `${ticketsUrl}?classificationName=music&city=Nashville&size=50&apikey=${apiKeys.ticketmasterKey}`
    return fetch(urlWithKey)
      .then(response => response.json())
      .then(tickets => console.log(tickets._embedded.events))
  },
  getRestaurants(search) {
    return fetch(`${restaurantsUrl}&q=${search}`, {
      method: "GET",
      headers: {
        "user-key": `${apiKeys.zomatoKey}`,
        "content-type": "application/json"
      }
    })
      .then(response => response.json())
  },
  getItinerary() {
    return fetch(itineraryUrl)
      .then(response => response.json())
  },
  postItineraryItem(resource, name, address) {
    console.log(resource, name, address)
    return fetch(itineraryUrl + "/1")
      .then(response => response.json())
      .then(itinerary => {
        itinerary[resource].name = name
        itinerary[resource].address = address

        console.log(itinerary[resource])

        return fetch(itineraryUrl + "/1", {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(itinerary)
        }).then(response => response.json())
      })
  }
}