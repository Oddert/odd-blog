const imageControlContainer = document.querySelector('.image_control--container')
const imageControl = document.querySelector('.image_control')
const cloudinaryImages = document.querySelector('.cloudinary_images')
const newImage = document.querySelector('.new_cloudinary_image')
console.log(newImage)

const store = {
  all: [],
  current: []
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

function renderAll () {
  console.log(store)
  let innerHtml = store.all.map(each => `<div>${each.url}</div>`).join('')
  cloudinaryImages.innerHTML = innerHtml
}

function addImage (e) {
  e.preventDefault()
  const file = e.target.querySelector('input[type=file]').files[0]
  const sendData = new FormData()
  console.log({ data_file: sendData.get('file') })

  sendData.append("file", file)
  const url = `/api/images/`
  console.log({ file, sendData, data_file: sendData.get('file') })

  const headers = new Headers()

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

imageControlContainer.addEventListener('click', e => {
  if (e.target.classList.contains('image_control--container')) toggleImageControl (true)
})
newImage.onsubmit = addImage
document.addEventListener('DOMContentLoaded', getImages)

































//
