// get references to navigation buttons
const navTabs = document.querySelectorAll(".nav_tab")
console.log('navTabs: ', navTabs);

// get references to category sections
const sections = document.querySelectorAll(".section")
console.log('sections: ', sections);


const showSection = (evt) => {
  const sectionId = evt.target.id.split("_")
  console.log(sectionId[1])

  navTabs.forEach(navTab => {
    if (navTab.id === `tab_${sectionId[1]}`) {
      navTab.classList.remove("inactive")
    } else {
      navTab.classList.add("inactive")
    }
  })

  sections.forEach(section => {
    console.log(section.id)
    if (section.id === sectionId[1]) {
      section.classList.remove("hidden")
    } else {
      section.classList.add("hidden")
    }
  }
  )

}

navTabs.forEach(navTab => {
  navTab.addEventListener("click", showSection)
})