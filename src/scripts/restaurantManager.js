// import api functionality
import { apiManager } from "./apiManager.js";
import { getItineraryAndRenderToDOM } from "./itineraryManager.js";

// get elements for search input, search button, and results list
const restaurantSearchInput = document.getElementById("restaurant_search_input")
const restaurantSearchBtn = document.getElementById("restaurant_search_btn")
const restaurantResultsList = document.getElementById("restaurant_results")


// get search results from Zomato API and append to DOM
const searchRestaurants = () => {
  // get search value from text input
  const keyword = restaurantSearchInput.value
  console.log('keyword: ', keyword);

  apiManager.getRestaurants(keyword)
    .then(results => {
      // clear unordered list for new search results
      restaurantResultsList.innerHTML = "";

      // build all results before appending to DOM
      let allResultsAsHTML = "";

      // iterate results.restaurants, convert to HTML, and append to DOM
      results.restaurants.forEach(restaurant => {
        const htmlRep = restaurantAsHTML(restaurant.restaurant);
        allResultsAsHTML += htmlRep;
      });
      restaurantResultsList.innerHTML = allResultsAsHTML;
    }
    )
}

// convert results to HTML format
const restaurantAsHTML = (restaurant) => {
  return `
    <li>${restaurant.name} <button id="save_restaurant--${restaurant.name}--${restaurant.location.address}">save</button></li>
  `
}


// save restaurant to itinerary
const saveRestaurant = (evt) => {
  // split the id
  const idStrings = evt.target.id.split("--")
  if (idStrings[0] === "save_restaurant") {
    apiManager.postItineraryItem("restaurant", idStrings[1], idStrings[2])
      .then(getItineraryAndRenderToDOM)
  }
}

// attach event listeners to search button
restaurantSearchBtn.addEventListener("click", searchRestaurants)

// attach event listener to restaurant results list to listen for save clicks
restaurantResultsList.addEventListener("click", saveRestaurant)
