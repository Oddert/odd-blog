
const newButtons    = document.querySelectorAll('.new_buttons button')
const form          = document.querySelector('form')
const newParagraph  = document.querySelector('.new_paragraph')
const newImage      = document.querySelector('.new_image')


function handleNewInput (e) {
  console.log(e.target.name)
  let newElem
  switch(e.target.name) {
    case 'new_paragraph':
      let textAreas = form.querySelectorAll('.text_input')
      newElem = document.createElement('DIV')
      newElem.className = 'text_input'

      let newTextInput = document.createElement('textarea')
      newTextInput.name = `paragraph[${textAreas.length}]`
      newTextInput.rows = '8'
      newTextInput.cols = '80'
      newElem.appendChild(newTextInput)
      form.appendChild(newElem)
      break;
    case 'new_image':
      let images = form.querySelectorAll('.image_input')
      newElem = document.createElement('DIV')
      newElem.className = 'image_input'

      let newImageSrcInput = document.createElement('input')
      newImageSrcInput.name = `image[${images.length}]`
      newImageSrcInput.className = 'image_input'
      newElem.appendChild(newImageSrcInput)
      form.appendChild(newElem)
      break;
    default:
      console.log('ERROR: Unknowen input type')
      break;
  }
}

newButtons.forEach(each => each.onclick = handleNewInput)

for (let i = 0; i < 5; i++) handleNewInput({ target: { name: 'new_paragraph' } })

function writeName() {
  let greeting = ['Hello', 'Hi there', 'Welcome', 'Signed in as', 'Director of Project']
  let name = ['James', 'Erin', 'Felicity', 'Violet', 'Victoria', 'Fiona', 'Heather']
  const pick = arr => arr[Math.floor(Math.random()*arr.length)]
  let elem = document.createElement('H1')
  elem.textContent = `${pick(greeting)} Ms Robyn ${pick(name)} Veitch`
  elem.style.position = 'fixed'
  elem.style.top = '0'
  elem.style.right = '0'
  elem.style.padding = '10px'
  elem.style.margin = '0'
  elem.style.color = '#ecf0f1'
  elem.style.textShadow = '0px 0px 10px rgba(0,0,0,1)'
  elem.style.fontFamily = 'helvetica'
  document.body.append(elem)
  setTimeout(() => document.body.removeChild(elem), 29000)
}

writeName()

setInterval(writeName, 30000)
