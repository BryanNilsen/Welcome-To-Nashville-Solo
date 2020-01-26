// import api functionality
import { apiManager } from "./apiManager.js";

// get element for search input and button
const restaurantSearchInput = document.getElementById("restaurant_search_input")
const restaurantSearchBtn = document.getElementById("restaurant_search_btn")

// get element for output
const restaurantOutput = document.getElementById("restaurant_results")


// get results from API
const searchRestaurants = () => {
  const keyword = restaurantSearchInput.value
  apiManager.getRestaurants(keyword)
    .then(results => {
      const restaurantsArray = results.restaurants;
      // log results for testing
      console.log(restaurantsArray);
      // clear unordered list
      restaurantOutput.innerHTML = "";
      // iterate results, convert to HTML and append to DOM
      restaurantsArray.forEach(restaurant => {
        const htmlRep = restaurantAsHTML(restaurant.restaurant)
        restaurantOutput.innerHTML += htmlRep
      });
    }
    )
}

// attach event listener to search button
restaurantSearchBtn.addEventListener("click", searchRestaurants)

// convert results to HTML format
const restaurantAsHTML = (restaurant) => {
  return `
    <li>${restaurant.name}</li>
  `
}
// output results to element