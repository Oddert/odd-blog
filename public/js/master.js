
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
      let newImageCaptionInput = document.createElement('input')
      let newImageAltInput = document.createElement('input')
      newImageSrcInput.name = `image[${images.length}][src]`
      newImageSrcInput.className = 'image_input--src'
      newImageCaptionInput.name = `image[${images.length}][caption]`
      newImageCaptionInput.className = 'image_input--caption'
      newImageAltInput.name = `image[${images.length}][alt]`
      newImageAltInput.className = 'image_input--alt'
      newElem.appendChild(newImageSrcInput)
      newElem.appendChild(newImageCaptionInput)
      newElem.appendChild(newImageAltInput)
      form.appendChild(newElem)
      break;
    default:
      console.log('ERROR: Unknowen input type')
      break;
  }
}

newButtons.forEach(each => each.onclick = handleNewInput)

for (let i = 0; i < 5; i++) handleNewInput({ target: { name: 'new_paragraph' } })
