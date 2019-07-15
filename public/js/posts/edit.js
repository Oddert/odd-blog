
const alignArray = [
  { key: 'large', desc: 'Full sized' },
  { key: 'medium_left', desc: 'Medium sized (spanning two columns), justified Left.' },
  { key: 'medium_right', desc: 'Medium sized (spanning two columns), justified Right.' },
  { key: 'small_left', desc: 'Small sized (just one column), justified Left.' },
  { key: 'small_center', desc: 'Small sized (just one column), justified in the Middle.' },
  { key: 'small_right', desc: 'Small sized (just one column), justified Right.' }
]

const svgConvert = {
  'large': `<svg class="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 271.04 77.87"><g><rect class="align_icon_1" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="100.09" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="100.09" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="196.68" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="196.68" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_3" x="25.35" y="17.67" width="220.35" height="42.52" rx="5.67" ry="5.67"/><rect class="align_icon_4" x="25.35" y="17.67" width="220.35" height="42.52" rx="5.67" ry="5.67"/></g></svg>`,
  'medium_left': `<svg class="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 271.04 77.87"><g><rect class="align_icon_1" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="100.09" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="100.09" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="196.68" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="196.68" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_3" x="25.35" y="17.67" width="123.76" height="42.52" rx="5.67" ry="5.67"/><rect class="align_icon_4" x="25.35" y="17.67" width="123.76" height="42.52" rx="5.67" ry="5.67"/></g></svg>`,
  'medium_right': `<svg class="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 271.04 77.87"><g><rect class="align_icon_1" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="100.09" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="100.09" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="196.68" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="196.68" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_3" x="121.94" y="17.67" width="123.76" height="42.52" rx="5.67" ry="5.67"/><rect class="align_icon_4" x="121.94" y="17.67" width="123.76" height="42.52" rx="5.67" ry="5.67"/></g></svg>`,
  'small_left': `<svg class="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270.44 77.87"><g><rect class="align_icon_1" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="99.49" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="99.49" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="196.08" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="196.08" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_3" x="16.79" y="17.67" width="44.29" height="42.52" rx="5.67" ry="5.67"/><rect class="align_icon_4" x="16.79" y="17.67" width="44.29" height="42.52" rx="5.67" ry="5.67"/></g></svg>`,
  'small_center': `<svg class="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270.44 77.87"><g><rect class="align_icon_1" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="99.49" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="99.49" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="196.08" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="196.08" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_3" x="112.78" y="17.67" width="44.29" height="42.52" rx="5.67" ry="5.67"/><rect class="align_icon_4" x="112.78" y="17.67" width="44.29" height="42.52" rx="5.67" ry="5.67"/></g></svg>`,
  'small_right': `<svg class="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270.44 77.87"><g><rect class="align_icon_1" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="3.5" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="99.49" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="99.49" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_1" x="196.08" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/><rect class="align_icon_2" x="196.08" y="3.5" width="70.87" height="70.87" rx="5.67" ry="5.67"/></g><g><rect class="align_icon_3" x="209.36" y="17.67" width="44.29" height="42.52" rx="5.67" ry="5.67"/><rect class="align_icon_4" x="209.36" y="17.67" width="44.29" height="42.52" rx="5.67" ry="5.67"/></g></svg>`,
}

// ==================== / Resources ====================


// ==================== DOM Nodes + Constants ====================

const newButtons      = document.querySelectorAll('.new_buttons button')
const form            = document.querySelector('.form_body')
const saveButton      = document.querySelector('.save')
const submitButton    = document.querySelector('.submit')

let lastClicked = document.querySelector('body *')
let loadTime = Date.now()

// ==================== / DOM Nodes + Constants ====================


// ==================== Input Create + Function ====================

// When an element is removed and added there can often be conflicts in the index used to define input order
// This loops over all and checks their classNames and names are correct
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

  controlDrag.addEventListener('mouseover', dragButtonMouseover)
  controlDrag.addEventListener('mouseout', dragButtonMouseout)

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

function createAlignment (idx, data) {
  let controlAlign = document.createElement('fieldset').appendChild(document.createElement('ul')) // NOTE feildset does not appear to do anything, remove?
  let itir = 0
  function createOption (val, data) {
    let option = document.createElement('li')
    let optionRadio = document.createElement('input')
    let optionLabel = document.createElement('label')
    let optionIcon = document.createElement('div')

    option.title = alignArray[itir].desc
    option.dataset.align = alignArray[itir].key

    optionRadio.type = `radio`
    optionRadio.name = `inputs[${idx}][align]`
    optionRadio.value = alignArray[itir].key
    optionRadio.className = `align_radio`

    optionIcon.innerHTML = svgConvert[alignArray[itir].key]

    if (data && data.align === alignArray[itir].key) {
      option.classList.add(`align_active`)
      optionRadio.setAttribute('checked', true)
    }

    optionLabel.appendChild(optionIcon)
    optionLabel.appendChild(optionRadio)

    option.appendChild(optionLabel)

    optionIcon.addEventListener('click', e => {
      e.stopPropagation()
      return updateAlignments(e, alignArray)
    })

    if (!data && itir === 0) {
      optionRadio.setAttribute('checked', true)
      option.classList.add('align_active')
    }
    itir++
    return option
  }
  for (each of alignArray) controlAlign.appendChild(createOption(each, data))
  controlAlign.className = `align`
  controlAlign.name = `placeholder[${idx}]`
  return controlAlign
}

function createSubhead (idx, data) {
  let newSubhead = document.createElement('input')
  newSubhead.placeholder = `Subheading, leave blank to ommit.`
  newSubhead.name = `inputs[${idx}][subhead]`
  newSubhead.className = `subhead`
  if (data) newSubhead.value = data.subhead
  return newSubhead
}

function createInputParagraph (inputs, idx, data) {
  let newElem
  let newTextInput = document.createElement('textarea')
  newTextInput.name = `inputs[${idx}][text]`
  newTextInput.placeholder = `Body`
  // newTextInput.className = `input_textarea`
  newTextInput.addEventListener('keydown', textInputResize)
  if (data) newTextInput.value = data.text

  newElem = document.createElement('DIV')
  newElem.className = `input text_input input_${idx}`

  if (idx === 1) newTextInput.id = "mytextarea"

  newElem.appendChild(createControl(idx, `paragraph`))
  newElem.appendChild(createLabel(idx, `paragraph`))
  newElem.appendChild(createAlignment(idx, data))
  newElem.appendChild(createSubhead(idx, data))
  newElem.appendChild(newTextInput)
  return newElem
}

function createInputImage (inputs, idx, data) {
  let newElem
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
  if (data) {
    newImageSrcInput.value = data.src
    newImageCaptionInput.value = data.newImageCaptionInput
    newImageAltInput.value = data.newImageAltInput
  }
  newImageInputGroup.appendChild(newImageSrcInput)
  newImageInputGroup.appendChild(newImageCaptionInput)
  newImageInputGroup.appendChild(newImageAltInput)

  let newImageInputPreview = document.createElement('DIV')
  newImageInputPreview.className = `image_input__preview`
  let newImageInputPreviewImg = document.createElement('img')
  newImageInputPreviewImg.title = 'Image preview.'
  newImageInputPreviewImg.className = `image_input__preview--img image_input__preview_${idx}--img`
  newImageInputPreviewImg.src = data ? data.src : `https://static.umotive.com/img/product_image_thumbnail_placeholder.png`
  newImageInputPreview.appendChild(newImageInputPreviewImg)

  newImageInputContainer.appendChild(newImageInputGroup)
  newImageInputContainer.appendChild(newImageInputPreview)

  newElem = document.createElement('DIV')
  newElem.className = `input image_input input_${idx}`

  newElem.appendChild(createControl(idx, `image`))
  newElem.appendChild(createAlignment(idx, data))
  newElem.appendChild(createSubhead(idx, data))
  newElem.appendChild(createLabel(idx, `image`))
  newElem.appendChild(newImageInputContainer)
  return newElem
}

function createInputQuote (inputs, idx, data) {
  let newElem
  let newQuoteContainer = document.createElement('DIV')
  newQuoteContainer.className = `quote_input__container`

  let newQuoteBody = document.createElement('textarea')
  newQuoteBody.name = `inputs[${idx}][text]`
  newQuoteBody.placeholder = `Quote Text`
  newQuoteBody.addEventListener('keydown', textInputResize)

  let newQuoteAuthor = document.createElement('input')
  newQuoteAuthor.type = `text`
  newQuoteAuthor.name = `inputs[${idx}][author]`
  newQuoteAuthor.placeholder = `Author`

  let newQuoteCite = document.createElement('input')
  newQuoteCite.type = `text`
  newQuoteCite.name = `inputs[${idx}][cite]`
  newQuoteCite.placeholder = `Citation Link`

  if (data) {
    newQuoteBody.value = data.text
    newQuoteAuthor.value = data.author
    newQuoteCite.value = data.cite
  }

  newQuoteContainer.appendChild(newQuoteCite)
  newQuoteContainer.appendChild(newQuoteBody)
  newQuoteContainer.appendChild(newQuoteAuthor)

  newElem = document.createElement('DIV')
  newElem.className = `input quote_input input_${idx}`
  newElem.appendChild(createControl(idx, `quote`))
  newElem.appendChild(createAlignment(idx, data))
  newElem.appendChild(createSubhead(idx, data))
  newElem.appendChild(createLabel(idx, `quote`))
  newElem.appendChild(newQuoteContainer)
  return newElem
}

function createInputCode (inputs, idx, data) {
  let newElem
  let newCodeInput = document.createElement('textarea')
  newCodeInput.name = `inputs[${idx}][text]`
  newCodeInput.placeholder = `Code Snippet`
  // newTextInput.className = `input_textarea`
  newCodeInput.addEventListener('keydown', textInputResize)
  if (data) newCodeInput.value = data.text

  newElem = document.createElement('DIV')
  newElem.className = `input code_input input_${idx}`

  newElem.appendChild(createControl(idx, `code`))
  newElem.appendChild(createLabel(idx, `code`))
  newElem.appendChild(createAlignment(idx, data))
  newElem.appendChild(createSubhead(idx, data))
  newElem.appendChild(newCodeInput)
  return newElem
}

function handleNewInput (e) {
  console.log(e.target.name)
  let newElem
  let inputs = form.querySelectorAll('.input')
  let idx = inputs.length
  console.log(inputs)

  switch(e.target.name) {

    case 'new_paragraph':
      newElem = createInputParagraph (inputs, idx)
      form.appendChild(newElem)
      break;

    case 'new_image':
      newElem = createInputImage (inputs, idx)
      form.appendChild(newElem)
      break;

    case 'new_quote':
      newElem = createInputQuote (inputs, idx)
      form.appendChild(newElem)
      break;

    case 'new_code':
      newElem = createInputCode (inputs, idx)
      form.appendChild(newElem)
      break;

    default:
      console.error('ERROR: Unknown input data_type')
      break;
  }
}

function deleteInput (e, idx) {
  e.preventDefault()
  const input = document.querySelector(`.input_${idx}`)
  console.log(input)
  document.querySelector('.form_body').removeChild(input)
  reassignIndeces()
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

function getData () {
  const id = document.querySelector('.form').dataset.id
  const inputs = document.querySelectorAll('.input')
  // const alignments = document.querySelectorAll()
  let body = {
    header_image: {
      src: document.querySelector('.header_image--src').value,
      caption: document.querySelector('.header_image--caption').value,
      alt: document.querySelector('.header_image--alt').value
    },
    title: document.querySelector('.title input').value,
    subtitle: document.querySelector('.subtitle textarea').value,
    tags: document.querySelector('.tags input').value,
    inputs: []
  }

  function convertInput (input) {
    console.log(input)
    let parsed = {
      data_type: input.dataset.type,
      subhead: input.querySelector('.subhead').value,
      align: Array.from(input.querySelectorAll('input[type=radio]')).filter(e => e.checked)[0].value
    }
    if (input.dataset.type === "paragraph") {
      parsed.text       = input.querySelector('textarea').value
    }
    if (input.dataset.type === "image") {
      parsed.src        = input.querySelector('.image_input--src').value
      parsed.caption    = input.querySelector('.image_input--caption').value
      parsed.alt        = input.querySelector('.image_input--alt').value
    }
    if (input.dataset.type === "quote") {
      parsed.cite       = input.querySelector(".quote_input--cite").value
      parsed.text       = input.querySelector(".quote_input--text").value
      parsed.author     = input.querySelector(".quote_input--author").value
    }
    return parsed
  }

  inputs.forEach((each, idx) => {
    body.inputs.push(convertInput(each))
  })
  return {
    id, body, timestamp: Date.now(), expires: Date.now() + 90000, unsavedChanges: false
  }
}

function handleAutoSave () {
  if (typeof(Storage) !== undefined) {
    // console.log('local store')
    const previous = localStorage.getItem("editing")
    console.log(previous)
    if ((previous && previous.timestamp && Date.now() >= previous.expires) || !previous) {
      const { id, body } = getData()
      localStorage.setItem("editing", JSON.stringify({
        id,
        body,
        timestamp: Date.now(),
        expires: Date.now() + 90000,

      }))
    }
  }
}

function handleSave () {

  const { body, id } = getData()
  const url = `/api/posts/${id}`
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }
  if (id) {
    fetch(url, options)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
}

// return true if action is needed
function compareAutoSaves (previous, current, callback) {
  // Only deals with one item at a time currently. Will overwrite autosave on new post load
  if (previous && previous.id) {
    if (previous.id === current.id) {
      if (previous.unsavedChanges) {
        if (JSON.stringify(previous.body) === JSON.stringify(current.body)) {
          console.log('Unsaved changes flag found. Body comparison is the same.')
          return { outOfSync: false, action: 'reset_unsaved_flag' }
          // reset_unsaved_flag also should reset_last_check_flag
        } else {
          console.warn('Local storage out of sync with current load')
          return { outOfSync: true, action: 'prompt_user_comparison' }
        }
      } else {
        console.log('No unsaved change flag found, assuming items are in sync')
        return { outOfSync: false, action: 'reset_last_check_flag' }
      }
    } else {
      console.warn("Local store found for previous post.")
      return { outOfSync: true, action: 'restore_previous_save', data: { title: previous.title } }
    }
  } else {
    console.log('Local store not found.')
    return { outOfSync: true, action: 'rewrite_autosave' }
  }
  // reset_unsaved_flag
  // prompt_user_comparison
  // reset_last_check_flag
  // restore_previous_save
  // rewrite_autosave
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

  const previous = JSON.parse(localStorage.getItem("editing"))
  const current = getData()
  console.log({ previous }, { current })
  const pageLoadAutosaveStatus = compareAutoSaves(previous, current, null)
  console.log(pageLoadAutosaveStatus)
  switch (pageLoadAutosaveStatus.action) {
    case 'reset_unsaved_flag':
    case 'reset_last_check_flag':
    case 'rewrite_autosave':
      localStorage.setItem("editing", JSON.stringify(Object.assign({}, current, { unsavedChanges: false })))
      break;
    case 'prompt_user_comparison':
      break;
    case 'restore_previous_save':
      if (window.confirm(`Warning: There is unsaved autosave data from the last post. \nTitle: ${pageLoadAutosaveStatus.data.title}.\nWould you like to restore this post?`)) {

        console.error('Restore previous post. NEED: rewrite functionality.')
      }
      break;
    default: break;
  }

  // Need ability to paint entire page again.
  // Need window and functions to prompt user comparison


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

// ==================== / Page Initialisation ====================



// ==================== Page Write Functionality ====================

// -tags                '.tags input'

// loop over inputs
function reWritePage ({ id, body, timestamp, expires, unsavedChanges }) {
  document.querySelector('.header_image--src').value = body.header_image.src
  document.querySelector('.header_image--preview').src = body.header_image.src
  document.querySelector('.header_image--caption').value = body.header_image.caption
  document.querySelector('.header_image--alt').value = body.header_image.alt

  document.querySelector('.title input').value = body.title
  document.querySelector('.subtitle textarea').value = body.subtitle
  document.querySelector('.tags input').value = body.tags

  body.inputs.forEach((each, idx) => {
    console.log(each)
  })

}

// ==================== / Page Write Functionality ====================



// ==================== Selection Development WIP ====================

function makeSel () {
  const sel = window.getSelection()
  if (!sel) return
  const txtarea = lastClicked[0]
  const start = txtarea.selectionStart;
  const finish = txtarea.selectionEnd;
  const selection = txtarea.value.substring(start, finish);
  let val = txtarea.value
  txtarea.value = val.substring(0, start) + '<a href="https://oddert.github.io/">' + val.substring(start, finish) + '</a>' + val.substring(finish)
}

document.addEventListener('mouseup', e => lastClicked = e.path)

// ==================== / Selection Development WIP ====================



// ==================== Dev Mode To Be Tidied ====================

function sample () {
  const sampleParas = [
    "This is an initial paragraph to get us warmed up.",
    "Pnuk, this is what we like to call\r\nmulti-lined\r\n\r\nsuper\r\n\r\nduper\r\n\r\n\r\n\r\nparagraphs",
    "Here we see that numbers are not an issue probably:\r\n\r\n09876543\r\n528491",
    "lo it is time for this tawdry thing again ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32."
  ]
  const sampleHeaders = [
    {
      src: "https://www.theplanner.co.uk/sites/default/files/Web_LondonUnderground_iStock_000077086545_Large.jpg",
      caption: "Can I come up with an interesting test caption? Should captions even be shown? What evern are best practices?",
      alt: "An image of a train on London's Northern Line"
    },
    {
      src: "https://img.museumoflondon.org.uk/ev/0383d7a9-2e3c-4b0c-abe0-1b40121d8949.jpg",
      caption: "West Ruislip rip",
      alt: "An image of West Ruislip probably"
    },
    {
      src: "https://i.ytimg.com/vi/pCIUOt2lLck/maxresdefault.jpg",
      caption: "Trans Rights",
      alt: "Trans Rights brought to you by dk 64"
    },
    {
      src: "https://cdn2us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2019/02/star-trek-discovery-season-2-who-is-number-one-in-canon.jpg?itok=qN635EKp",
      caption: "Perfect angel, new lead character, needs own seriec, pike plz let us see more number one",
      alt: "An screenshot of star trek discovery showing my wife"
    },
    {
      src: "http://cdn.studiodaily.com/wp-content/uploads/2016/08/star-trek-beyond.jpg",
      caption: "Can I come up with an interesting test caption? Should captions even be shown? What evern are best practices?",
      alt: "An image of a train on London's Northern Line"
    }
  ]
  const sampleTitles = [
    "This is a Very Good Article",
    "This is not a Good Article",
    "This Article is of questionable intent",
    "A menefesto for the abolition of the automobile",
    "Experiences working in MHP Thameside",
    "The design of your very own blog engine",
    "Mind that time that guy asked us about newspapers on the DLR comming out of Cannary Wharf?"
  ]
  const sampleImage = {
    src: "http://www.cat-bus.com/wp-content/uploads/2017/12/gadgetbahn.jpg",
    caption: "A very neat image. Monorials are good. Abolish the functionless metal boxes known as automobiles",
    alt: "A render of various monorails and monorail concepts"
  }
  const inputs = document.querySelectorAll('.input textarea')
  for (let i=0; i<inputs.length; i++) {
    inputs[i].value = sampleParas[Math.floor(Math.random()*inputs.length)]
  }
  let ranheader = Math.floor(Math.random()*sampleHeaders.length)
  let ranTitle = Math.floor(Math.random()*sampleTitles.length)
  document.querySelector('.header_image--src').value = sampleHeaders[ranheader].src
  document.querySelector('.header_image--caption').value = sampleHeaders[ranheader].caption
  document.querySelector('.header_image--alt').value = sampleHeaders[ranheader].alt
  document.querySelector('.header_image--preview').src = sampleHeaders[ranheader].src

  document.querySelector('.image_input--src').value = sampleImage.src
  document.querySelector('.image_input--caption').value = sampleImage.caption
  document.querySelector('.image_input--alt').value = sampleImage.alt

  document.querySelector('.title input').value = sampleTitles[ranTitle]
  document.querySelector('.subtitle textarea').value = "Here we will discuss many such topics as 'what is mongodb? And why does it make us sad?' and 'Why have my neighbors, in the last few days, increased their noise level by 420%?'"
}

document.querySelector('.sample_data').onclick = e => {
  e.preventDefault()
  return sample()
}

document.querySelector('.submit').addEventListener('click', e => {
  let json = document.querySelector('#page_check')
  json.checked = !json.checked
})

let devMode = false
let defautlLocation = document.querySelector('.form').action
console.log(defautlLocation)
document.querySelector('.dev_toggle').onclick = function (e) {
  e.preventDefault()
  this.textContent = devMode ? 'Dev Mode: OFF' : 'Dev Mode: ON'
  if (devMode) document.querySelector('.form').action = defautlLocation
  else document.querySelector('.form').action = '/posts/new/dev'
  devMode = !devMode
}

// ==================== / Dev Mode To Be Tidied ====================























//
