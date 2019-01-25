
const newButtons    = document.querySelectorAll('.new_buttons button')
const form          = document.querySelector('form')
const newParagraph  = document.querySelector('.new_paragraph')
const newImage      = document.querySelector('.new_image')


function handleNewInput (e) {
  console.log(e.target.name)
  let newElem
  let inputs = form.querySelectorAll('.input')

  switch(e.target.name) {

    case 'new_paragraph':
      let newTextInput = document.createElement('textarea')
      newTextInput.name = `inputs[${inputs.length}][text]`
      newTextInput.rows = '6'
      newTextInput.cols = '60'

      let newTextLabel = document.createElement('input')
      newTextLabel.name = `inputs[${inputs.length}][type]`
      newTextLabel.value = `paragraph`
      newTextLabel.hidden = true

      newElem = document.createElement('DIV')
      newElem.className = 'input text_input'

      newElem.appendChild(newTextInput)
      newElem.appendChild(newTextLabel)
      form.appendChild(newElem)
      break;

    case 'new_image':
      let newImageSrcInput          = document.createElement('input')
      newImageSrcInput.name         = `inputs[${inputs.length}][src]`
      newImageSrcInput.className    = 'image_input--src'
      newImageSrcInput.placeholder  = 'Image Link'

      let newImageCaptionInput          = document.createElement('input')
      newImageCaptionInput.name         = `inputs[${inputs.length}][caption]`
      newImageCaptionInput.className    = 'image_input--caption'
      newImageCaptionInput.placeholder  = 'Image Caption'

      let newImageAltInput          = document.createElement('input')
      newImageAltInput.name         = `inputs[${inputs.length}][alt]`
      newImageAltInput.className    = 'image_input--alt'
      newImageAltInput.placeholder  = 'Description for Screen Readers'

      let newImageLabel = document.createElement('input')
      newImageLabel.name = `inputs[${inputs.length}][type]`
      newImageLabel.value = `image`
      newImageLabel.hidden = true

      newElem = document.createElement('DIV')
      newElem.className = 'input image_input'

      newElem.appendChild(newImageLabel)
      newElem.appendChild(newImageSrcInput)
      newElem.appendChild(newImageCaptionInput)
      newElem.appendChild(newImageAltInput)
      form.appendChild(newElem)
      break;

    default:
      console.log('ERROR: Unknown input type')
      break;
  }
}

newButtons.forEach(each => each.onclick = handleNewInput)

for (let i = 0; i < 4; i++) handleNewInput({ target: { name: 'new_paragraph' } })
handleNewInput({ target: { name: 'new_image' } })

function writeName() {
  let oldElem = document.getElementById('dev_name_test')
  if (oldElem) document.body.removeChild(oldElem)
  let greeting = ['Hello', 'Hi there', 'Welcome', 'Signed in as', 'Director of Project']
  let name = ['James', 'Erin', 'Felicity', 'Violet', 'Victoria', 'Fiona', 'Heather']
  const pick = arr => arr[Math.floor(Math.random()*arr.length)]
  let elem = document.createElement('H1')
  elem.id = "dev_name_test"
  elem.textContent = `${pick(greeting)} Ms Robyn ${pick(name)} Veitch`
  elem.style.position = 'fixed'
  elem.style.top = '0'
  elem.style.right = '0'
  elem.style.padding = '10px'
  elem.style.margin = '0'
  elem.style.color = '#ecf0f1'
  elem.style.textShadow = '0px 0px 10px rgba(0,0,0,1)'
  elem.style.fontFamily = 'helvetica'
  setTimeout(() => {
    document.body.append(elem)
  }, 1000)
}

writeName()

setInterval(writeName, 30000)
