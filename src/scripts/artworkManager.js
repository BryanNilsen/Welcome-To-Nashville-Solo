// import api functionality
import { apiManager } from "./apiManager.js";
import { getItineraryAndRenderToDOM } from "./itineraryManager.js";

// get elements for search input, search button, and results list
const artworkSearchInput = document.getElementById("artwork_search_input")
const artworkSearchBtn = document.getElementById("artwork_search_btn")
const artworkResultsList = document.getElementById("artwork_results")
const artworkResultsCount = document.getElementById("artwork_results_count")


// get search results from Metro Public Art API and append to DOM
const searchArtwork = () => {
  // get search value from text input
  const keyword = artworkSearchInput.value

  apiManager.getArtwork(keyword)
    .then(results => {
      artworkResultsCount.innerHTML = `<hr/><p><em>search results: ${results.length}</em></p>`
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
    <div class="results">
      <div class="tix"><a href="${artItem.page_link.url}" target="_blank"> MORE INFO </a></div>
      <div class="results_details">
        <h4>${artItem.artwork}
        <br/><em>${artItem.medium}</em></h4>
        <p>by - ${artItem.last_name} ${artItem.first_name}</p>
        <p class="art_description">${artItem.description ? artItem.description : "no description provided"}</p>
        <a href="#itinerary">
        <button id="save_artwork--${artItem.artwork}--${artItem.location}">save to itinerary</button>
        </a>
      </div>
    </div>
  `
}

// save artwork to itinerary
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