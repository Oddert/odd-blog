
const alignArray = [
  { key: 'large', desc: 'Full sized' },
  { key: 'medium_left', desc: 'Medium sized (spanning two columns), justified Left.' },
  { key: 'medium_right', desc: 'Medium sized (spanning two columns), justified Right.' },
  { key: 'small_left', desc: 'Small sized (just one column), justified Left.' },
  { key: 'small_center', desc: 'Small sized (just one column), justified in the Middle.' },
  { key: 'small_right', desc: 'Small sized (just one column), justified Right.' }
]

const svgConvert = {
  'large': `<svg class="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.93 77.87"><g><rect class="align_icon_1" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="100.09" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="100.09" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="196.68" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="196.68" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_3" x="25.35" y="17.67" width="220.35" height="42.52" rx="5.67" ry="5.67"/><rect class="align_icon_4" x="25.35" y="17.67" width="220.35" height="42.52" rx="5.67" ry="5.67"/></g></svg>`,
  'medium_left': `<svg class="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.93 77.87"><g><rect class="align_icon_1" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="100.09" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="100.09" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="196.68" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="196.68" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_3" x="25.35" y="17.67" width="123.76" height="42.52" rx="5.67" ry="5.67"/><rect class="align_icon_4" x="25.35" y="17.67" width="123.76" height="42.52" rx="5.67" ry="5.67"/></g></svg>`,
  'medium_right': `<svg class="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.93 77.87"><g><rect class="align_icon_1" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="100.09" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="100.09" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="196.68" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="196.68" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_3" x="121.94" y="17.67" width="123.76" height="42.52" rx="5.67" ry="5.67"/><rect class="align_icon_4" x="121.94" y="17.67" width="123.76" height="42.52" rx="5.67" ry="5.67"/></g></svg>`,
  'small_left': `<svg class="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.93 77.87"><g><rect class="align_icon_1" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="99.49" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="99.49" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="196.08" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="196.08" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_3" x="16.79" y="17.67" width="44.29" height="42.52" rx="5.67" ry="5.67"/><rect class="align_icon_4" x="16.79" y="17.67" width="44.29" height="42.52" rx="5.67" ry="5.67"/></g></svg>`,
  'small_center': `<svg class="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.93 77.87"><g><rect class="align_icon_1" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="99.49" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="99.49" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="196.08" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="196.08" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_3" x="112.78" y="17.67" width="44.29" height="42.52" rx="5.67" ry="5.67"/><rect class="align_icon_4" x="112.78" y="17.67" width="44.29" height="42.52" rx="5.67" ry="5.67"/></g></svg>`,
  'small_right': `<svg class="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 253.93 77.87"><g><rect class="align_icon_1" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="99.49" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="99.49" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="196.08" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="196.08" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_3" x="209.36" y="17.67" width="44.29" height="42.52" rx="5.67" ry="5.67"/><rect class="align_icon_4" x="209.36" y="17.67" width="44.29" height="42.52" rx="5.67" ry="5.67"/></g></svg>`,
}

// ==================== / Resources ====================



// ==================== DOM Nodes + Constants ====================

const newButtons      = document.querySelectorAll('.new_buttons button')
const form            = document.querySelector('.form_body')
const saveButton      = document.querySelector('.save')
const submitButton    = document.querySelector('.submit')

// ==================== / DOM Nodes + Constants ====================


// ==================== Input Create + Function ====================

function reassignIndeces () {
  const input_groups = document.querySelectorAll('.input')
  for (let i = 0; i < input_groups.length; i++) {
    // console.log('############')

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
    const newLabelContent = `${labelContent.substring(0, lcLen-7)}${i}${labelContent.substring(lcLen-6)}`
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

function createControl (idx, data_type) {
  let newControl = document.createElement(`DIV`)
  newControl.className = `input_control`

  let controlDrag = document.createElement(`DIV`)
  controlDrag.textContent = `☰`
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
  controlText.textContent = `${data_type.substring(0,1).toUpperCase()}${data_type.substring(1)} ${idx} Input`
  controlText.className = `control_text`

  let controlDelete = document.createElement(`button`)
  controlDelete.textContent = `✖`
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

function createAlignment (idx) {
  let alignments = [
    { key: 'large', desc: 'Full sized' },
    { key: 'medium_left', desc: 'Medium sized (spanning two columns), justified Left.' },
    { key: 'medium_right', desc: 'Medium sized (spanning two columns), justified Right.' },
    { key: 'small_left', desc: 'Small sized (just one column), justified Left.' },
    { key: 'small_center', desc: 'Small sized (just one column), justified in the Middle.' },
    { key: 'small_right', desc: 'Small sized (just one column), justified Right.' }
  ]
  let controlAlign = document.createElement('fieldset').appendChild(document.createElement('ul')) // NOTE feildset does not appear to do anything, remove?
  let itir = 0
  function createOption (val) {
    let option = document.createElement('li')
    let optionRadio = document.createElement('input')
    let optionLabel = document.createElement('label')
    let optionIcon = document.createElement('div')

    option.title = alignments[itir].desc
    option.dataset.align = alignments[itir].key

    optionRadio.type = `radio`
    optionRadio.name = `inputs[${idx}][align]`
    optionRadio.value = alignments[itir].key
    optionRadio.className = `align_radio`

    optionIcon.innerHTML = svgConvert[alignments[itir].key]

    optionLabel.appendChild(optionIcon)
    optionLabel.appendChild(optionRadio)

    option.appendChild(optionLabel)

    optionIcon.addEventListener('click', e => {
      e.stopPropagation()
      return updateAlignments(e, alignments)
    })

    if (itir === 0) {
      optionRadio.setAttribute('checked', true)
      option.classList.add('align_active')
    }
    itir++
    return option
  }
  for (each of alignments) controlAlign.appendChild(createOption(each))
  controlAlign.className = `align`
  controlAlign.name = `placeholder[${idx}]`
  return controlAlign
}

function createSubhead (idx) {
  let newSubhead = document.createElement('input')
  newSubhead.placeholder = `Subheading, leave blank to ommit.`
  newSubhead.name = `inputs[${idx}][subhead]`
  newSubhead.className = `subhead`
  return newSubhead
}

function deleteInput (e, idx) {
  e.preventDefault()
  const input = document.querySelector(`.input_${idx}`)
  console.log(input)
  document.querySelector('.form_body').removeChild(input)
  reassignIndeces()
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
      newTextInput.placeholder = `Body`
      // newTextInput.className = `input_textarea`
      newTextInput.addEventListener('keydown', textInputResize)

      newElem = document.createElement('DIV')
      newElem.className = `input text_input input_${idx}`

      if (idx === 1) newTextInput.id = "mytextarea"

      newElem.appendChild(createControl(idx, `paragraph`))
      newElem.appendChild(createLabel(idx, `paragraph`))
      newElem.appendChild(createAlignment(idx))
      newElem.appendChild(createSubhead(idx))
      newElem.appendChild(newTextInput)
      form.appendChild(newElem)
      break;

    case 'new_image':
      let newImageSrcInput          = document.createElement('input')
      newImageSrcInput.name         = `inputs[${idx}][src]`
      newImageSrcInput.className    = `image_input--src`
      newImageSrcInput.placeholder  = 'Image Link'
      newImageSrcInput.title        = 'Copy in the link of the image, you should see a preview appear if the link is ok.'

      newImageSrcInput.onchange = imagePreviewUpdate

      let newImageCaptionInput          = document.createElement('input')
      newImageCaptionInput.name         = `inputs[${idx}][caption]`
      newImageCaptionInput.className    = 'image_input--caption'
      newImageCaptionInput.placeholder  = 'Caption'
      newImageCaptionInput.title  = 'An optional caption to go with the image.'

      let newImageAltInput          = document.createElement('input')
      newImageAltInput.name         = `inputs[${idx}][alt]`
      newImageAltInput.className    = 'image_input--alt'
      newImageAltInput.placeholder  = 'Alt-text (for Screen Readers)'
      newImageAltInput.title  = 'Add a description of the image. This will be shown if the image breaks and is also what screen-readers will \'see\'.'

      let newImageInputContainer = document.createElement('DIV')
      newImageInputContainer.className = `image_input__container`

      let newImageInputGroup = document.createElement('DIV')
      newImageInputGroup.className = `image_input__group`
      newImageInputGroup.appendChild(newImageSrcInput)
      newImageInputGroup.appendChild(newImageCaptionInput)
      newImageInputGroup.appendChild(newImageAltInput)

      let newImageInputPreview = document.createElement('DIV')
      newImageInputPreview.className = `image_input__preview`
      let newImageInputPreviewImg = document.createElement('img')
      newImageInputPreviewImg.title = 'Image preview.'
      newImageInputPreviewImg.className = `image_input__preview--img image_input__preview_${idx}--img`
      newImageInputPreviewImg.src = `https://static.umotive.com/img/product_image_thumbnail_placeholder.png`
      newImageInputPreview.appendChild(newImageInputPreviewImg)

      newImageInputContainer.appendChild(newImageInputGroup)
      newImageInputContainer.appendChild(newImageInputPreview)

      newElem = document.createElement('DIV')
      newElem.className = `input image_input input_${idx}`

      newElem.appendChild(createControl(idx, `image`))
      newElem.appendChild(createAlignment(idx))
      newElem.appendChild(createSubhead(idx))
      newElem.appendChild(createLabel(idx, `image`))
      newElem.appendChild(newImageInputContainer)
      form.appendChild(newElem)
      break;

    default:
      console.log('ERROR: Unknown input data_type')
      break;
  }
}

// ==================== / Input Create + Function ====================


// ==================== Functions ====================

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

  if (
    itemToSwap.closest('.input') &&
    itemToSwap.closest('.input').parentNode &&
    parentList === itemToSwap.closest('.input').parentNode
  ) {
    itemToSwap = itemToSwap !== target.nextSibling
      ? itemToSwap
      : itemToSwap.nextSibling
    parentList.insertBefore(target, itemToSwap)
  }
}

function handleDrop (e) {
  e.target.classList.remove('drag_active')
  reassignIndeces()
}

function dragButtonMouseover (e) {
  let parent = e.target.closest('.input')
  parent.setAttribute('draggable', true)
  parent.ondrag = handleDrag
  parent.ondragend = handleDrop
}

function dragButtonMouseout (e) {
  let parent = e.target.closest('.input')
  parent.setAttribute('draggable', false)
}

function textInputResize (e) {
  if (e.target.clientHeight < e.target.scrollHeight) {
    this.style.height = `${e.target.scrollHeight + 30}px`
  }
  if (e.target.clientHeight > e.target.scrollHeight) {
    this.style.height = `${e.target.scrollHeight + 30}px`
  }
}

function imagePreviewUpdate (e, idx) {
  // console.log(e)
  let url = ''
  setTimeout(() => {
    url = e.target.value
    const image = new Image()
    image.onload = () => document.querySelector(`.image_input__preview_${idx}--img`).src = url
    image.onerror = () => {}
    image.src = url
  }, 300)
}

function updateAlignments (e, alignArray) {
  // console.log(e, alignments)
  e.stopPropagation()
  let options = e.target.closest('ul.align').querySelectorAll('li')
  options.forEach(each => each.classList.remove('align_active'))
  let li = e.target.closest('li')
  li.classList.add('align_active')

  let input = e.target.closest('.input')
  let target = input.querySelector('.align_active')
  input.classList.remove(...alignArray.map(each => each.key))
  input.classList.add(target.dataset.align)
}

function handleSave () {
  const id = document.querySelector('.form').dataset.id
  const url = `/posts/${id}`
  const options = {
    method: 'PUT'
  }
  fetch(url, options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

// ==================== / Functions ====================


// ==================== Event Binding ====================

saveButton.onclick = e => {
  e.preventDefault()
  return handleSave(e)
}

// ==================== / Event Binding ====================


// ==================== Page Initialisation ====================

function initialisePage () {
  const inputs = document.querySelectorAll('.input')
  inputs.forEach((each, idx) => {
    const type = each.dataset.type
    let controlDrag = each.querySelector('.control_drag')
    controlDrag.addEventListener('mouseover', dragButtonMouseover)
    controlDrag.addEventListener('mouseout', dragButtonMouseout)

    let controlDelete = each.querySelector('.control_delete')
    controlDelete.onclick = e => deleteInput(e, idx)

    const alignments = each.querySelector('.align').querySelectorAll('li')
    alignments.forEach(option => {
      let optIcon = option.querySelector('.align_option__icon')
      optIcon.addEventListener('click', e => {
        e.stopPropagation()
        return updateAlignments(e, alignArray)
      })
    })

    if (type == "paragraph") {
      each.querySelector('textarea')
          .addEventListener('keydown', textInputResize)
    }
    if (type == "image") {
      each.querySelector('.image_input--src')
          .addEventListener('keydown', e => imagePreviewUpdate(e, idx))
    }
  })
  newButtons.forEach(each => each.onclick = e => {
    e.preventDefault()
    handleNewInput(e)
  })

let firstTimeWarn = true
  function headerPreviewUpdate (e) {
    // console.log(e)
    if (firstTimeWarn) {
      console.log(`PLEASE NOTE: Failed GET requests may show in abundance in the console. This is simply a method of verifying broken images on auto-update.`)
      firstTimeWarn = false
    }
    let url = ''
    setTimeout(() => {
      url = e.target.value
      const image = new Image()
      image.onload = () => document.querySelector(`.header_image--preview`).src = url
      image.onerror = () => {
        // console.log('Fail :(')
      }
      image.src = url
    }, 300)
  }

  document.querySelector('.header_image--src').onchange = headerPreviewUpdate

}

document.addEventListener('DOMContentLoaded', initialisePage)

// ==================== Page Initialisation ====================



























//
