
const newButtons    = document.querySelectorAll('.new_buttons button')
const form          = document.querySelector('form')
const newParagraph  = document.querySelector('.new_paragraph')
const newImage      = document.querySelector('.new_image')


function handleDrag (e) {
  const target = e.target
  const parentList = e.target.parentNode
  const x = event.clientX
  const y = event.clientY

  target.classList.add('drag_active')
  let itemToSwap = document.elementFromPoint(x, y) === null
    ? target
    : (document.elementFromPoint(x, y).closest('.input'))
      ? document.elementFromPoint(x, y).closest('.input')
      : document.elementFromPoint(x, y)

  // console.log(itemToSwap)
  if (
    itemToSwap.closest('.input') &&
    itemToSwap.closest('.input').parentNode &&
    parentList === itemToSwap.closest('.input').parentNode
  ) {
    // console.log('before', itemToSwap)
    itemToSwap = itemToSwap !== target.nextSibling
      ? itemToSwap
      : itemToSwap.nextSibling
    // console.log('after', itemToSwap)
    parentList.insertBefore(target, itemToSwap)
  }
}

function handleDrop (e) {
  e.target.classList.remove('drag_active')
  reassignIndeces()
}

function deleteInput (e, idx) {
  e.preventDefault()
  const input = document.querySelector(`.input_${idx}`)
  console.log(input)
  document.querySelector('.form').removeChild(input)
  reassignIndeces()
}

function createControl (idx, data_type) {
  let newControl = document.createElement(`DIV`)
  newControl.className = `input_control`

  let controlDrag = document.createElement(`DIV`)
  controlDrag.className = `control_drag control_drag_${idx}`
  controlDrag.dataset.drag = `drag_${idx}`
  controlDrag.addEventListener('mouseover', e => {
    let parent = e.target.closest('.input')
    parent.setAttribute('draggable', true)
    parent.ondrag = handleDrag
    parent.ondragend = handleDrop
  })
  controlDrag.addEventListener('mouseout', e => {
    let parent = e.target.closest('.input')
    parent.setAttribute('draggable', false)
  })

  let controlText = document.createElement(`P`)
  controlText.textContent = `${data_type} ${idx} Input:`
  controlText.className = `control_text`

  let controlDelete = document.createElement(`button`)
  controlDelete.textContent = `Delete Input`
  controlDelete.className = `control_delete`
  controlDelete.onclick = e => deleteInput(e, idx)

  newControl.appendChild(controlDrag)
  newControl.appendChild(controlText)
  newControl.appendChild(controlDelete)
  return newControl
}

function createLabel (idx, data_type) {
  let newLabel = document.createElement(`input`)
  newLabel.name = `inputs[${idx}][data_type]`
  newLabel.value = `${data_type}`
  newLabel.hidden = true
  return newLabel
}

function createAlignment (idx, data_type) {
  let alignments = ['large', 'medium_left', 'medium_right', 'small_left', 'small_center', 'small_right']
  function createOption (value) {
    let opt = document.createElement('option')
    opt.value = value
    opt.textContent = value
    return opt
  }
  let controlAlign = document.createElement('select')
  controlAlign.name = `inputs[${idx}][align]`
  for (each of alignments) controlAlign.appendChild(createOption(each))
  return controlAlign
}

function createSubhead (idx) {
  let newSubhead = document.createElement('input')
  newSubhead.placeholder = `Subheading, leave blank to ommit.`
  newSubhead.name = `inputs[${idx}][subhead]`
  return newSubhead
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
  let idx = inputs.length
  console.log(inputs)

  switch(e.target.name) {

    case 'new_paragraph':
      let newTextInput = document.createElement('textarea')
      newTextInput.name = `inputs[${idx}][text]`

      newElem = document.createElement('DIV')
      newElem.className = `input text_input input_${idx}`

      newElem.appendChild(createLabel(idx, `paragraph`))
      newElem.appendChild(createControl(idx, `paragraph`))
      newElem.appendChild(createAlignment(idx))
      newElem.appendChild(createSubhead(idx))
      newElem.appendChild(newTextInput)
      form.appendChild(newElem)
      break;

    case 'new_image':
      let newImageSrcInput          = document.createElement('input')
      newImageSrcInput.name         = `inputs[${idx}][src]`
      newImageSrcInput.className    = 'image_input--src'
      newImageSrcInput.placeholder  = 'Image Link'

      let newImageCaptionInput          = document.createElement('input')
      newImageCaptionInput.name         = `inputs[${idx}][caption]`
      newImageCaptionInput.className    = 'image_input--caption'
      newImageCaptionInput.placeholder  = 'Caption'

      let newImageAltInput          = document.createElement('input')
      newImageAltInput.name         = `inputs[${idx}][alt]`
      newImageAltInput.className    = 'image_input--alt'
      newImageAltInput.placeholder  = 'Alt-text (for Screen Readers)'

      newElem = document.createElement('DIV')
      newElem.className = `input image_input input_${idx}`

      newElem.appendChild(createLabel(idx, `image`))
      newElem.appendChild(createControl(idx, `image`))
      newElem.appendChild(createAlignment(idx))
      newElem.appendChild(createSubhead(idx))
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
    "Pnuk, this is what we like to call\r\nmulti-lined\r\n\r\nsuper\r\n\r\nduper\r\n\r\n\r\n\r\nparagraphs",
    "Here we see that numbers are not an issue probably:\r\n\r\n09876543\r\n528491",
    "lo it is time for this tawdry thing again ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32."
  ]
  const sampleImage = {
    src: "http://www.cat-bus.com/wp-content/uploads/2017/12/gadgetbahn.jpg",
    caption: "A very neat image. Monorials are good. Abolish the functionless metal boxes known as automobiles",
    alt: "A render of various monorails and monorail concepts"
  }
  const inputs = document.querySelectorAll('.input textarea')
  for (let i=0; i<inputs.length; i++) {
    inputs[i].value = sampleParas[i]
  }
  document.querySelector('.image_input--src').value = sampleImage.src
  document.querySelector('.image_input--caption').value = sampleImage.caption
  document.querySelector('.image_input--alt').value = sampleImage.alt

  document.querySelector('.title input').value = "This is a Very Good Article"
  document.querySelector('.subtitle textarea').value = "Here we will discuss many such topics as 'what is mongodb? And why does it make us sad?' and 'Why have my neighbors, in the last few days, increased their noise level by 420%?'"
}

document.querySelector('.sample_data').onclick = e => {
  e.preventDefault()
  return sample()
}
