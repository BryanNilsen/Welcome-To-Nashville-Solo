// import api functionality
import { apiManager } from "./apiManager.js";
import { getItineraryAndRenderToDOM } from "./itineraryManager.js";

// get elements for search input, search button, and results list
const artworkSearchInput = document.getElementById("artwork_search_input")
const artworkSearchBtn = document.getElementById("artwork_search_btn")
const artworkResultsList = document.getElementById("artwork_results")


// get search results from Metro Public Art API and append to DOM
const searchArtwork = () => {
  // get search value from text input
  const keyword = artworkSearchInput.value
  console.log('keyword: ', keyword);

  apiManager.getArtwork(keyword)
    .then(results => {
      console.log('results: ', results);

      // clear unordered list for new search results
      artworkResultsList.innerHTML = "";

      // build all results before appending to DOM
      let allResultsAsHTML = "";

      // iterate results, convert to HTML, and append to DOM
      results.forEach(artworkItem => {
        const htmlRep = artworkAsHTML(artworkItem);
        allResultsAsHTML += htmlRep;
      });
      artworkResultsList.innerHTML = allResultsAsHTML;
    }
    )
}

// convert results to HTML format
const artworkAsHTML = (artItem) => {
  return `
  <li>${artItem.artwork}: ${artItem.last_name}
    <button id="save_artwork--${artItem.artwork}--${artItem.location}">save</button>
    <a href="${artItem.page_link.url}" target="_blank">more info</a>
    </li>
  `
}

// save restaurant to itinerary
const saveArtwork = (evt) => {
  // split the id
  const idStrings = evt.target.id.split("--")
  if (idStrings[0] === "save_artwork") {
    apiManager.postItineraryItem("artwork", idStrings[1], idStrings[2])
      .then(getItineraryAndRenderToDOM)
  }
}


// attach event listeners to search button
artworkSearchBtn.addEventListener("click", searchArtwork)
// attach event listener to restaurant results list to listen for save clicks
artworkResultsList.addEventListener("click", saveArtwork)