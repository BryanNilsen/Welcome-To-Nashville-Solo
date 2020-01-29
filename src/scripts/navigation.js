// get references to navigation buttons
const navTabs = document.querySelectorAll(".nav_tab")

// get references to category sections
const sections = document.querySelectorAll(".section")


const showSection = (evt) => {
  const sectionId = evt.target.id.split("_")

  navTabs.forEach(navTab => {
    if (navTab.id === `tab_${sectionId[1]}`) {
      navTab.classList.remove("inactive")
    } else {
      navTab.classList.add("inactive")
    }
  })

  sections.forEach(section => {
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