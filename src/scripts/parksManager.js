// import api functionality
import { apiManager } from "./apiManager.js";
import { getItineraryAndRenderToDOM } from "./itineraryManager.js";

// get elements for search input, search button, and results list
const parkSearchInput = document.getElementById("park_search_input")
const parkSearchBtn = document.getElementById("park_search_btn")
const parkResultsList = document.getElementById("park_results")


// get search results from Metro Public Parks API and append to DOM
const searchParks = () => {
  // get search value from text input
  const keyword = parkSearchInput.value
  console.log('keyword: ', keyword);

  apiManager.getParks(keyword)
    .then(results => {
      console.log('results: ', results);

      // clear unordered list for new search results
      parkResultsList.innerHTML = "";

      // build all results before appending to DOM
      let allResultsAsHTML = "";

      // iterate results, convert to HTML, and append to DOM
      results.forEach(parkItem => {
        const htmlRep = parkAsHTML(parkItem);
        allResultsAsHTML += htmlRep;
      });
      parkResultsList.innerHTML = allResultsAsHTML;
    }
    )
}

// convert results to HTML format
const parkAsHTML = (park) => {
  const address = park.mapped_location.human_address.split("\"")
  return `
  <li>${park.park_name}: ${address[3]}
    <button id="save_park--${park.park_name}--${address[3]}">save</button>
    </li>
  `
}

// save artwork to itinerary
const savePark = (evt) => {
  // split the id
  const idStrings = evt.target.id.split("--")
  if (idStrings[0] === "save_park") {
    apiManager.postItineraryItem("park", idStrings[1], idStrings[2])
      .then(getItineraryAndRenderToDOM)
  }
}


// attach event listeners to search button
parkSearchBtn.addEventListener("click", searchParks)
// attach event listener to restaurant results list to listen for save clicks
parkResultsList.addEventListener("click", savePark)