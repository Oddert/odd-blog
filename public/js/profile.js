
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
let titleEditing = false

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
    setTimeout(() => { titleEditing = false }, 200)
  })
}

function createTitleEditor (title_text) {
  const title_edit = document.createElement('form')
  const title_edit_input = document.createElement('input')
  const title_edit_submit = document.createElement('button')

  title_edit_input.type = 'text'
  title_edit_input.value = title_text.textContent.split(' ').join(', ')

  title_edit_submit.textContent = 'Save'
  title_edit_submit.onclick = submitTitleChanges

  title_edit.className = 'title_edit'
  title_edit.appendChild(title_edit_input)
  title_edit.appendChild(title_edit_submit)
  return title_edit
}

function editNames (e) {
  if (!titleEditing && author) {
    titleEditing = true
    const title_text = title.querySelector('h1')
    title_text.classList.add('hide')
    title.appendChild(createTitleEditor(title_text))
  }
}

title.addEventListener('click', editNames)
