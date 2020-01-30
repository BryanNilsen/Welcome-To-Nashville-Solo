// import api functionality
import { apiManager } from "./apiManager.js";
import { getItineraryAndRenderToDOM } from "./itineraryManager.js";

// get elements for search input, search button, and results list
const concertSearchInput = document.getElementById("concert_search_input");
const concertSearchBtn = document.getElementById("concert_search_btn");
const concertSelectList = document.getElementById("concert_select");
const concertResultsList = document.getElementById("concert_results");
const concertResultsCount = document.getElementById("concert_results_count");

// todo: get complete list of genres
const genreIds = [
  { "id": "KnvZfZ7vAee", "name": "R&B" },
  { "id": "KnvZfZ7vAeA", "name": "Rock" },
  { "id": "KnvZfZ7vAv1", "name": "Hip-Hop/Rap" },
  { "id": "KnvZfZ7vAev", "name": "Pop" },
  { "id": "KnvZfZ7vAv6", "name": "Country" },
  { "id": "KnvZfZ7vAvt", "name": "Metal" }
]

const populateGenreSelectInput = () => {
  let optionsListHTML = `<option value=""  selected > Select Genre </option >`
  genreIds.forEach(genre => {
    optionsListHTML += `<option value=${genre.id} > ${genre.name} </option >`
  })
  concertSelectList.innerHTML = optionsListHTML
}

// render genre select menu to DOM
populateGenreSelectInput();

// get search results from Ticketmaster API and append to DOM
const searchConcerts = () => {
  // get search value from text input
  const keyword = concertSearchInput.value
  console.log('keyword: ', keyword);
  const genreId = concertSelectList.value
  apiManager.getConcerts(genreId, keyword)
    .then(results => {
      let allConcerts = [];

      if (results._embedded) {
        allConcerts = results._embedded.events
      }
      console.log('results: ', allConcerts);
      concertResultsCount.innerHTML = `<hr/><p><em>search results: ${allConcerts.length}</em></p>`

      // clear unordered list for new search results
      concertResultsList.innerHTML = "";

      // build all results before appending to DOM
      let allResultsAsHTML = "";

      // iterate results, convert to HTML, and append to DOM
      if (allConcerts.length > 0) {
        allConcerts.forEach(concertItem => {
          const htmlRep = concertAsHTML(concertItem);
          allResultsAsHTML += htmlRep;
        });
      }
      concertResultsList.innerHTML = allResultsAsHTML;
    })
}

// convert results to HTML format
const concertAsHTML = (concertItem) => {
  // convert date and time to readable format for user
  const date = new Date(concertItem.dates.start.dateTime);
  const dateSplit = date.toLocaleTimeString().split(" ");
  const trimmedDate = dateSplit[0].substring(0, dateSplit[0].length - 3) + dateSplit[1]

  return `
    <div class="results">
      <img src="${concertItem.images[0].url}" alt="${concertItem.name}" srcset=""/>
      <div class="tix"><a href="${concertItem.url}" target="_blank"> GET TICKETS </a></div>
      <div class="results_details">
        <h4>${concertItem.name}</h4>
        <p>${date.toDateString()} - <em>${trimmedDate}</em></p>
        <p>${concertItem._embedded.venues[0].name}</p>
        <a href="#itinerary">
        <button id="save_concert--${concertItem.name}--${concertItem._embedded.venues[0].name}">save to itinerary</button>
        </a>
      </div>
    </div>
      `
}

// save concert to itinerary
const saveConcert = (evt) => {
  // split the id
  const idStrings = evt.target.id.split("--")
  if (idStrings[0] === "save_concert") {
    apiManager.postItineraryItem("concert", idStrings[1], idStrings[2])
      .then(getItineraryAndRenderToDOM)
  }
}

// attach event listeners to search button
concertSearchBtn.addEventListener("click", searchConcerts)

// attach event listener to concert results list to listen for save clicks
concertResultsList.addEventListener("click", saveConcert)