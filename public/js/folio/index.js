

const links = {
  linkedin: 'https://www.linkedin.com/in/robyn-veitch-582aa3b6/',
  github: 'https://github.com/Oddert',
  fcc: 'https://www.freecodecamp.com/oddert'
}

const socialMediaButtonContainer = document.querySelector('.social_media')
const socialMediaButtons = socialMediaButtonContainer.querySelectorAll('a')
const linksIndicator = document.querySelector('.links_indicator')

function showLinksIndicator (e) {
  linksIndicator.textContent = links[e.target.closest('a').className]
}

function hideLinksIndicator () {
  linksIndicator.textContent = ' '
}

socialMediaButtonContainer.addEventListener('mouseout', hideLinksIndicator)

socialMediaButtons.forEach(each => {
  each.addEventListener('mouseover', showLinksIndicator)
})
