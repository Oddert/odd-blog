
const id = document.querySelector('main').dataset.id
let user = {}
let currentUser
let author = (!!currentUser && user._id == currentUser._id)

fetch(`/api/users/${id}`)
  .then(res => res.json())
  .then(data => {
    let { user, currentUser } = data
    author = (!!currentUser && user._id == currentUser._id)
    console.log(user, currentUser)
    console.log(!!currentUser && user._id == currentUser._id)
  })
  .catch(err => console.log({ err }))

const title = document.querySelector('.title')
const biography = document.querySelector('.bio')
let titleEditing = false
let bioEditing = false

function updateUserData (data, cb) {
  const url = `/api/users/${id}`
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }
  fetch(url, options)
    .then(res => res.json())
    .then(cb)
    .catch(err => console.log(err))
}


// ==================== Title Edit ====================

function handleTitleOUB (e) {
  if (e.target.className !== 'title_edit__input') submitTitleChanges(e)
}

function submitTitleChanges (e) {
  e.preventDefault()
  const title_edit = document.querySelector('.title_edit')
  const names = title_edit.querySelector('input[type=text]').value.split(', ')
  const primary_name = names.shift()
  const secondary_name = names.pop()
  const other_names = names
  updateUserData({ primary_name, other_names, secondary_name }, res => {
    title.removeChild(title_edit)
    let title_text = title.querySelector('h1')
    title_text.textContent = title_edit.querySelector('input[type=text]').value.split(', ').join(' ')
    title_text.classList.remove('hide')
    document.removeEventListener('click', handleTitleOUB)
    setTimeout(() => { titleEditing = false }, 200)
  })
}

function createTitleEditor (title_text) {
  const title_edit = document.createElement('form')
  const title_edit_input = document.createElement('input')
  const title_edit_submit = document.createElement('button')

  title_edit_input.type = 'text'
  title_edit_input.className = 'title_edit__input'
  title_edit_input.value = title_text.textContent.split(' ').join(', ')
  setTimeout(() => document.addEventListener('click', handleTitleOUB), 1000)

  title_edit_submit.textContent = 'Save'
  title_edit_submit.onclick = e => {
    document.removeEventListener('click', handleTitleOUB)
    submitTitleChanges(e)
  }

  title_edit.className = 'title_edit'
  title_edit.appendChild(title_edit_input)
  title_edit.appendChild(title_edit_submit)
  return title_edit
}

function editNames (e) {
  if (!titleEditing && author) {
  // if (!titleEditing) {
    titleEditing = true
    const title_text = title.querySelector('h1')
    title_text.classList.add('hide')
    title.appendChild(createTitleEditor(title_text))
  }
}

title.addEventListener('click', editNames)

// ==================== / Title Edit ====================


// ==================== Bio Edit ====================

function handleBioOUB (e) {
  if (e.target.className !== 'bio_edit__input') submitBioChanges(e)
}

function submitBioChanges (e) {
  e.preventDefault()
  const bio_edit = document.querySelector('.bio_edit')
  const bio = bio_edit.querySelector('textarea').value
  updateUserData({ bio }, res => {
    biography.removeChild(bio_edit)
    let bio_text = biography.querySelector('p')
    bio_text.textContent = bio
    bio_text.classList.remove('hide')
    document.removeEventListener('click', handleBioOUB)
    setTimeout(() => { bioEditing = false }, 200)
  })
}

function createBioEditor (bio_text, height=300) {
  const bio_edit = document.createElement('form')
  const bio_edit_input = document.createElement('textarea')
  const bio_edit_submit = document.createElement('button')

  bio_edit_input.className = 'bio_edit__input'
  bio_edit_input.value = bio_text.textContent
  bio_edit_input.style.height = `${height}px`
  setTimeout(() => document.addEventListener('click', handleBioOUB), 1000)

  bio_edit_submit.textContent = 'Save'
  bio_edit_submit.onclick = e => {
    document.removeEventListener('click', handleBioOUB)
    submitBioChanges(e)
  }

  bio_edit.className = 'bio_edit'
  bio_edit.appendChild(bio_edit_input)
  bio_edit.appendChild(bio_edit_submit)
  return bio_edit
}

function editBio (e) {
  if (!bioEditing && author) {
  // if (!bioEditing) {
    bioEditing = true
    const bio_text = biography.querySelector('p')
    const height = bio_text.scrollHeight
    bio_text.classList.add('hide')
    biography.appendChild(createBioEditor(bio_text, height))
  }
}

biography.addEventListener('click', editBio)

// ==================== / Bio Edit ====================


function fullSizeHeader () {
  const background = document.querySelector('.profile_background')
  background.style.height = '100vh'
  window.scroll(0, window.innerHeight / 2)
}

document.addEventListener('DOMContentLoaded', fullSizeHeader)


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
