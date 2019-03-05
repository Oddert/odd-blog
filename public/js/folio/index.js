

const links = {
  linkedin: 'https://www.linkedin.com/in/robyn-veitch-582aa3b6/',
  github: 'https://github.com/Oddert',
  fcc: 'https://www.freecodecamp.com/oddert'
}

const socialMediaButtonContainer = document.querySelector('.social_media')
const socialMediaButtons = socialMediaButtonContainer.querySelectorAll('a')
const linksIndicator = document.querySelector('.links_indicator')

const nav = document.querySelector('nav')
const menu = nav.querySelector('.menu')

const toggleDropButton = document.querySelector('.drop_toggle')

function debounce (func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    let context = this, args = arguments
    let later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    let callNow = immediate && !timeout
    clearTimeout (timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

function showLinksIndicator (e) {
  linksIndicator.textContent = links[e.target.closest('a').className]
}

function hideLinksIndicator () {
  linksIndicator.textContent = ' '
}

function updateScroll () {
  const scroll = window.scrollY;
  const height = window.innerHeight
  const diff = height - scroll
  // console.log(scroll, height, diff, ((height - scroll) / height) * 100)
  if (diff <= 50) {
    nav.style.height = "50px"
    nav.classList.add('nav_bar')
  }
  else {
    nav.style.height = `${((height - scroll) / height) * 100}%`;
    nav.classList.remove('nav_bar')
  }
}

function toggleDrop () {
  if (menu.classList.contains('closed')) {
    menu.classList.remove('closed')
    toggleDropButton.classList.add('open')
  }
  else {
    menu.classList.add('closed')
    toggleDropButton.classList.remove('open')
  }
}

function initPage (e) {
  const logoHidden = document.querySelector('#intro_hidden .content svg')
  logoHidden.style.opacity = '0'
}

window.addEventListener('scroll', e => debounce(updateScroll(), 5))

socialMediaButtonContainer.addEventListener('mouseout', hideLinksIndicator)

socialMediaButtons.forEach(each => {
  each.addEventListener('mouseover', showLinksIndicator)
})

toggleDropButton.onclick = toggleDrop

document.addEventListener('DOMContentLoaded', initPage)
