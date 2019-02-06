
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
