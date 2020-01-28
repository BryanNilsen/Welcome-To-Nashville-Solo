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
  getArtwork(keyword) {
    const keyUpper = keyword.toUpperCase()
    const urlWithKey = `${artCollectionsUrl}?$where=UPPER(artwork) like '%25${keyUpper}%25'`
    return fetch(urlWithKey)
      .then(response => response.json())
  },
  getParks() {
    const urlWithKey = `${parksUrl}`
    return fetch(urlWithKey)
      .then(response => response.json())
  },
  getConcerts(genreId, keyword) {
    const urlWithKey = `${ticketsUrl}?classificationName=music&city=Nashville&size=50&apikey=${apiKeys.ticketmasterKey}&keyword=${keyword}&genreId=${genreId}&sort=date,asc`
    return fetch(urlWithKey)
      .then(response => response.json())
  },
  getRestaurants(keyword) {
    return fetch(`${restaurantsUrl}&q=${keyword}&apikey=${apiKeys.zomatoKey}`)
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