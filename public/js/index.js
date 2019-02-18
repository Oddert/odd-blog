
function debounce (func, wait=20, imediate=true) {
  let timeout
  return function () {
    let context = this
    let args = arguments
    let callNow = imediate && !timeout
    let later = function () {
      timeout = null
      if (!imediate) func.apply(context, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

if (document.querySelector('.modify')) {
  const deleteControls = document.querySelectorAll('.delete_control')

  deleteControls.forEach(deleteControl => {
    const deletePrompt = deleteControl.querySelector('.delete_prompt')
    const deleteForm = deleteControl.querySelector('.delete_form')
    const deleteCancel = deleteForm.querySelector('.cancel')
    const deleteConfirm = deleteForm.querySelector('.delete')

    let deleteOpen = false
    function toggleDeleteOpen () {
      if (deleteOpen) deleteForm.classList.add('hide')
      else deleteForm.classList.remove('hide')
      deleteOpen = !deleteOpen
    }
    deletePrompt.onclick = toggleDeleteOpen
    deleteCancel.onclick = e => {
      console.log('delet')
      e.preventDefault()
      toggleDeleteOpen()
    }
  })
}

const copy = str => {
  const shadow_input = document.createElement('textarea')
  shadow_input.value = str
  document.body.appendChild(shadow_input)
  shadow_input.select()
  document.execCommand("copy")
  document.body.removeChild(shadow_input)
  flashNotif(shadow_input.value)
  console.log('Copied text:', shadow_input.value)
}

const flashNotif = str => {
  const notif = document.querySelector('.notifier')
  notif.hidden = false
  notif.querySelector('span').textContent = str
  notif.classList.add('show')
  setTimeout(() => {
    notif.classList.add('fade')
    setTimeout(() => {
      notif.classList.remove('show', 'fade')
      setTimeout(() => notif.hidden = true, 300)
    }, 1000)
  }, 2000)
}

const copyLinkButton = document.querySelector('.social.link')

if (copyLinkButton) {
  copyLinkButton.onclick = (e) => copy(e.target.closest('.social.link').dataset.link)
}

if (document.querySelector('.intro_card')) {
  const introText = document.querySelector('.intro_card')
  const title     = introText.querySelector('h1')

  const walk = 2

  function shadow (e) {
    const { offsetWidth: width, offsetHeight: height } = introText
    let { offsetX: x, offsetY: y } = e
    // console.log(this, e.target)
    if (this !== e.target) {
      x = x + e.target.offsetLeft
      y = y + e.target.offsetTop
    }
    const walkX = ((x / width * walk) - (walk / 2)) * 2
    const walkY = ((y / height * walk) - (walk / 2)) * 2

    title.style.textShadow = `${walkX}px ${walkY}px 10px #fefdeb`
  }
  introText.addEventListener('mousemove', e => debounce(shadow(e)))
}
