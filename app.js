// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const yearPlaceholder = document.querySelector("#date")
const year = (new Date()).getFullYear()


yearPlaceholder.textContent = year

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle")
const linksContainer = document.querySelector(".links-container")
const links = document.querySelector(".links")
const navBar = document.querySelector("#nav")

navToggle.addEventListener("click", toggleNav)

function toggleNav() {
    // linksContainer.classList.toggle("show-links")
    const linksHeight = links.getBoundingClientRect().height
    const linksContainerHeight = linksContainer.getBoundingClientRect().height
    
    if (linksContainerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`
    } else {
        // links are already expanded, so collapse the menu
        linksContainer.style.height = "0px"
    }
}

// ********** fixed navbar ************
window.addEventListener("scroll", fixedNavBarCheck)

function fixedNavBarCheck() {
    const topLinkBtn = document.querySelector(".top-link")

    const navBarHeight = navBar.getBoundingClientRect().height

    const yOffset = window.scrollY

    if (yOffset > navBarHeight) {
        navBar.classList.add("fixed-nav")
        topLinkBtn.classList.add("show-link")
    } else {
        navBar.classList.remove("fixed-nav")
        topLinkBtn.classList.remove("show-link")
    }
}

// ********** smooth scroll ************
// select links
const allButtons = document.querySelectorAll(".scroll-link")

allButtons.forEach(function(button){
    console.log(button)
    button.addEventListener("click", doSomething)
})

function doSomething(event) {
    const btn = event.currentTarget

    // prevent default jump-to behavior
    event.preventDefault()

    // calculate the heights
    const navBarHeight = navBar.getBoundingClientRect().height
    const linksContainerHeight = linksContainer.getBoundingClientRect().height
    const fixedNav = navBar.classList.contains("fixed-nav")

    // navigate to specified spot
    const href = btn.getAttribute("href")
    let targetYScroll = (
        document.getElementById(href.slice(1)).offsetTop - 
        navBarHeight
    )

    if (!fixedNav) {
        targetYScroll -= navBarHeight
    }

    if (navBarHeight > 82) {
        // the links container -- the menu of links -- is expanded, so we 
        // subtracted a larger amount than we should have in accounting for 
        // the navBarHeight, which encompasses the height of the links container
        // So we must add back that height to end up at the right spot.
        targetYScroll += linksContainerHeight
    }

    console.log(targetYScroll)

    window.scrollTo({
        left: 0,
        top: targetYScroll
    })

    // Close the navbar links menu if it's expanded
    linksContainer.style.height = 0
}