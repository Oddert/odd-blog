const imageControlContainer = document.querySelector('.image_control--container')
const imageControl = document.querySelector('.image_control')
const cloudinaryImages = document.querySelector('.cloudinary_images')
const newImage = document.querySelector('.new_image')
console.log(newImage)

const store = {
  all: [],
  post: []
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
  console.log('AAAAAAHHHHHHHHHH')
  e.preventDefault()
}

imageControlContainer.addEventListener('click', e => {
  if (e.target.classList.contains('image_control--container')) toggleImageControl (true)
})
newImage.onsubmit = addImage
document.addEventListener('DOMContentLoaded', getImages)
