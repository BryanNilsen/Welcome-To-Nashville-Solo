// import api functionality
import { apiManager } from "./apiManager.js";
import { getItineraryAndRenderToDOM } from "./itineraryManager.js";

// get elements for search input, search button, and results list
const parkSearchInput = document.getElementById("park_search_input")
const parkSearchBtn = document.getElementById("park_search_btn")
const parkResultsList = document.getElementById("park_results")
const parkFeatureContainer = document.getElementById("park_feature_options")
const parkResultsCount = document.getElementById("park_results_count")


const parkFeatures = {
  "ada_accessible": "ADA Accessible",
  "baseball_fields": "Baseball Fields",
  "basketball_courts": "Basketball Courts",
  "boat_launch": "Boat Launch",
  "camping_available_by_permit": "Camping by Permit",
  "canoe_launch": "Canoe Launch",
  "community_center": "Community Center",
  "community_garden": "Community Garden",
  "dog_park": "Dog Park",
  "disc_golf": "Disc Golf",
  "fishing_by_permit": "Fishing by Permit",
  "football_multi_purpose_fields": "Football Fields",
  "golf_course": "Golf Course",
  "hiking_trails": "Hiking Trails",
  "historic_features": "Historic Features",
  "horse_trails": "Horse Trails",
  "lake": "Lake",
  "mountain_bike_trails": "Mountain Bike Trails",
  "nature_center": "Nature Center",
  "picnic_shelters_quantity": "Picnic Shelters",
  "playground": "Playground",
  "restrooms_available": "Restrooms Available",
  "skate_park": "Skate Park",
  "soccer_fields": "Soccer Fields",
  "spray_park": "Spray Park",
  "swimming_pool": "Swimming Pool",
  "tennis_courts": "Tennis Courts",
  "volleyball": "Volleyball",
  "walk_jog_paths": "Walk/Jog Paths",
}

const renderParkFeatureOptions = () => {
  let parkFeaturesHTML = ""
  for (const key in parkFeatures) {
    parkFeaturesHTML += `<li><input type="checkbox" name=${key} id="feature--${key}" class="feature_box"/>${parkFeatures[key]}</li>`
  }
  parkFeatureContainer.innerHTML = parkFeaturesHTML
}

renderParkFeatureOptions()

// get search results from Metro Public Parks API and append to DOM
const searchParks = () => {
  // get search value from text input
  const keyword = parkSearchInput.value
  // get checked checkboxes to run through fetch call
  const options = []
  const checkboxes = document.querySelectorAll(".feature_box")
  checkboxes.forEach(checkbox => {
    if (checkbox.checked === true) {
      const featureId = checkbox.id.split("--")[1]
      options.push(featureId)
    }
  })
  console.log('options: ', options);


  apiManager.getParks(keyword, options)
    .then(results => {
      console.log('results: ', results);

      parkResultsCount.innerHTML = `<hr/><p><em>search results: ${results.length}</em></p>`

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
  // split array method (then grab index of address)
  const address = park.mapped_location.human_address.split("\"");
  // parse data into JSON and grab address property
  const parsed = JSON.parse(park.mapped_location.human_address);

  return `
  <li>${park.park_name}: ${parsed.address}
    <button id="save_park--${park.park_name}--${parsed.address}">save</button>
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