
const id = document.querySelector('main')
let user = {}
let currentUser
const author = !!currentUser && user._id == currentUser._id

fetch(`/api/users/${id.dataset.id}`)
  .then(res => res.json())
  .then(data => {
    let { user, currentUser } = data
    console.log(user, currentUser)
    console.log(!!currentUser && user._id == currentUser._id)
  })
  .catch(err => console.log({ err }))


function editNames (e) {
  console.log('editing')
}

if (author) {
  const title = document.querySelector('.title')
  title.addEventListener('click', editNames)
}
