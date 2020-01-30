// import api functionality
import { apiManager } from "./apiManager.js";
import { getItineraryAndRenderToDOM } from "./itineraryManager.js";

// get elements for search input, search button, and results list
const restaurantSearchInput = document.getElementById("restaurant_search_input")
const restaurantSearchBtn = document.getElementById("restaurant_search_btn")
const restaurantResultsList = document.getElementById("restaurant_results")
const restaurantResultsCount = document.getElementById("restaurant_results_count")


// get search results from Zomato API and append to DOM
const searchRestaurants = () => {
  // get search value from text input
  const keyword = restaurantSearchInput.value
  console.log('keyword: ', keyword);

  apiManager.getRestaurants(keyword)
    .then(results => {
      console.log('results: ', results);
      restaurantResultsCount.innerHTML = `<hr/><p><em>search results: ${results.restaurants.length}</em></p>`
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
  // set default no-photo image
  let photoUrl = "./images/no-photo.png"
  if (restaurant.featured_image != "") {
    photoUrl = restaurant.featured_image
  }

  return `
  <div class="results">
  <img src="${photoUrl}" alt="${restaurant.name}" srcset=""/>
  <div class="tix"><a href="${restaurant.menu_url}" target="_blank"> MENU </a></div>
  <div class="results_details">
    <h4>${restaurant.name}</h4>
    <p>${restaurant.location.address}</p>
    <a href="#itinerary">
    <button id="save_restaurant--${restaurant.name}--${restaurant.location.address}">save to itinerary</button>
    </a>
  </div>
</div>
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
