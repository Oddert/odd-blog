const imageControlContainer = document.querySelector('.image_control--container')
const imageControl          = document.querySelector('.image_control')
const cloudinaryImages      = document.querySelector('.cloudinary_images')
const newImage              = document.querySelector('.new_cloudinary_image')
const newImageInput         = newImage.querySelector('.new_cloudinary_image__input')
const openImageControl      = document.querySelector('.open_image_control')
const closeImageControl     = document.querySelector('.image_control__Close')
const refresh               = document.querySelector('.refresh_cloudinary_image')
console.log(newImage)

const store = {
  all: [],
  current: []
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
    notif.classList.add('fade-fast')
    setTimeout(() => {
      notif.classList.remove('show', 'fade-fast')
      setTimeout(() => notif.hidden = true, 300)
    }, 400)
  }, 800)
}

function toggleImageControl (close) {
  if (imageControlContainer.classList.contains('open') || close) {
    imageControlContainer.classList.remove('open')
  }
  else {
    imageControlContainer.classList.add('open')
  }
}

function getImages () {
  const url = `/api/images/`
  const options = {
    method: 'GET'
  }
  fetch(url, options)
    .then(res => res.json())
    .then(images => {
      console.log({ images })
      store.all = [...images]
      renderAll()
    })
    .catch(err => console.log(err))
}

function copyImageLink (e) {
  const value = e.target.closest('button').querySelector('textarea').value
  copy(value)
}

function deleteImageLink (e) {
  e.preventDefault()
  e.stopPropagation()
  console.log('going to remove: ', e.target.dataset.cloud_id)
  const url = `/api/images/image/${e.target.dataset.cloud_id}`
  const options = {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" }
  }
  fetch(url, options)
    .then(res => res.json())
    .then(res => console.log(res))
}

function addImage (e) {
  e.preventDefault()
  const url = `/api/images/`
  const file = newImageInput.files[0]
  const sendData = new FormData()
  const headers = new Headers()

  sendData.append("file", file)
  const options = {
    method: 'POST',
    headers,
    body: sendData
  }
  fetch(url, options)
    .then(res => res.json())
    .then(res => {
      store.all.push(res.image)
      store.current.push(res.image)
      renderAll()
    })
    .catch(err => console.error(err))
}

function renderAll () {
  console.log(store)
  let innerHtml = store.all.map(each => `
      <button class="image_selection" title=${each.cloudinary_id}>
        <div class="image_selection__thumb">
          <img src="${each.url}" />
        </div>
        <div class="image_selection__details">
          <p class="image_selection__title">${each.width} x ${each.height}</p>
          <!-- <p class="image_selection__url">${each.url}</p> -->
          <textarea type="text" value="${each.url}" hidden >${each.url}</textarea>
        </div>
        <buton class="image_selection__delete" data-id=${each._id} data-cloud_id="${each.cloudinary_id}">✖</button>
      </button>
    `).join('')
  cloudinaryImages.innerHTML = innerHtml
  cloudinaryImages
    .querySelectorAll('.image_selection')
    .forEach(each => each.onclick = copyImageLink)
  cloudinaryImages
    .querySelectorAll('.image_selection__delete')
    // .forEach(each => each.addEventListener('click', deleteImageLink, {
    //   // buble: false
    // }))
    .forEach(each => each.onclick = deleteImageLink)
}

imageControlContainer.addEventListener('click', e => {
  if (e.target.classList.contains('image_control--container')) toggleImageControl (true)
})
newImage.onsubmit = addImage
openImageControl.onclick = () => toggleImageControl()
closeImageControl.onclick = () => toggleImageControl(true)
refresh. onclick = getImages
newImageInput.onchange = e => {
  if (newImageInput.files[0]) addImage(e)
}
document.addEventListener('DOMContentLoaded', getImages)

































//
