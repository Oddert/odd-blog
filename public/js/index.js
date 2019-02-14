
if (document.querySelector('.delete_control')) {
  const deleteControl = document.querySelector('.delete_control')
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
    e.preventDefault()
    toggleDeleteOpen()
  }
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
