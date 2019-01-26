
const newButtons    = document.querySelectorAll('.new_buttons button')
const form          = document.querySelector('form')
const newParagraph  = document.querySelector('.new_paragraph')
const newImage      = document.querySelector('.new_image')

function createLabel (idx, data_type) {
  let newLabel = document.createElement(`input`)
  newLabel.name = `inputs[${idx}][data_type]`
  newLabel.value = `${data_type}`
  newLabel.hidden = true
  return newLabel
}

function createControl (idx, data_type) {
  let newControl = document.createElement(`DIV`)
  newControl.className = `input_controll`

  let controlText = document.createElement(`P`)
  controlText.textContent = `${data_type} ${idx} Input:`
  controlText.className = `control_text`

  let controlDelete = document.createElement(`button`)
  controlDelete.textContent = `Delete Input`
  controlDelete.className = `control_delete`
  controlDelete.onclick = e => deleteInput(e, idx)

  newControl.appendChild(controlText)
  newControl.appendChild(controlDelete)
  return newControl
}

function deleteInput (e, idx) {
  e.preventDefault()
  const input = document.querySelector(`.input_${idx}`)
  console.log(input)
  document.querySelector('.form').removeChild(input)
  reassignIndeces()
}

// When an element is removed and added there can often be conflicts in the index used to define input order
// This loops over all and checks their classNames and names are correct
function reassignIndeces () {
  const input_groups = document.querySelectorAll('.input')
  for (let i = 0; i < input_groups.length; i++) {
    console.log('############')

    // Fix the name attr on all input tags
    let input_group = input_groups[i]
    const inputElems = input_group.querySelectorAll('input')
    for (elem of inputElems) {
      let oldName = elem.name
      elem.name = `${oldName.substring(0,7)}${i}${oldName.substring(8)}`
    }

    // Do the same for any textareas
    let textareaElems = input_group.querySelectorAll('textarea')
    for (elem of textareaElems) {
      let oldName = elem.name
      elem.name = `${oldName.substring(0,7)}${i}${oldName.substring(8)}`
    }

    // Recreate the visable label display (no functional value)
    const label = input_group.querySelector('.control_text')
    const labelContent = label.textContent
    const lcLen = labelContent.length
    const newLabelContent = `${labelContent.substring(0, lcLen-8)}${i}${labelContent.substring(lcLen-7)}`
    label.textContent = newLabelContent

    // Remove old class used for targeting and replace
    const classLabel = input_group.className.match(/input_[0-9]*/gi)
    input_group.classList.remove(classLabel)
    input_group.classList.add(`input_${i}`)

    // Update the delete button for new index
    const deleteButton = input_group.querySelector(`.control_delete`)
    deleteButton.onclick = e => deleteInput(e, i)
  }
}

function handleNewInput (e) {
  console.log(e.target.name)
  let newElem
  let inputs = form.querySelectorAll('.input')
  console.log(inputs)

  switch(e.target.name) {

    case 'new_paragraph':
      let newTextInput = document.createElement('textarea')
      newTextInput.name = `inputs[${inputs.length}][text]`

      newElem = document.createElement('DIV')
      newElem.className = `input text_input input_${inputs.length}`

      newElem.appendChild(createLabel(inputs.length, `paragraph`))
      newElem.appendChild(createControl(inputs.length, `paragraph`))
      newElem.appendChild(newTextInput)
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

      newElem = document.createElement('DIV')
      newElem.className = `input image_input input_${inputs.length}`

      newElem.appendChild(createLabel(inputs.length, `image`))
      newElem.appendChild(createControl(inputs.length, `image`))
      newElem.appendChild(newImageSrcInput)
      newElem.appendChild(newImageCaptionInput)
      newElem.appendChild(newImageAltInput)
      form.appendChild(newElem)
      break;

    default:
      console.log('ERROR: Unknown input data_type')
      break;
  }
}

newButtons.forEach(each => each.onclick = handleNewInput)

for (let i = 0; i < 2; i++) handleNewInput({ target: { name: 'new_paragraph' } })
handleNewInput({ target: { name: 'new_image' } })
handleNewInput({ target: { name: 'new_paragraph' } })


function sample () {
  const sampleParas = [
    "This is an initial paragraph to get us warmed up.",
    "Pnuk, this is what we like to all\r\nmulti-lined\r\n\r\nsuper\r\n\r\nduper\r\n\r\n\r\n\r\nparagraphs",
    "Here we see that numbers are not an issue probably:\r\n\r\n09876543\r\n528491",
    "lo it is time for this tawdry thing again ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
  ]
  const sampleImage = {
    src: "http://www.cat-bus.com/wp-content/uploads/2017/12/gadgetbahn.jpg",
    caption: "A very neat image. Monorials are good. Abolish the functionless metal boxes known as automobiles",
    alt: "A render of various monorails and monorail concepts"
  }
  const inputs = document.querySelectorAll('textarea')
  for (let i=0; i<inputs.length; i++) {
    inputs[i].value = sampleParas[i]
  }
  document.querySelector('.image_input--src').value = sampleImage.src
  document.querySelector('.image_input--caption').value = sampleImage.caption
  document.querySelector('.image_input--alt').value = sampleImage.alt
}

document.querySelector('.sample_data').onclick = e => {
  e.preventDefault()
  return sample()
}


function writeName() {
  let oldElem = document.getElementById('dev_name_test')
  if (oldElem) document.body.removeChild(oldElem)
  
  let greeting = ['Hello', 'Hi there', 'Welcome', 'Signed in as', 'Director of Project']
  let name = ['James', 'Erin', 'Felicity', 'Violet', 'Victoria', 'Fiona', 'Heather']
  let elem = document.createElement('H1')
  const pick = arr => arr[Math.floor(Math.random()*arr.length)]
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
