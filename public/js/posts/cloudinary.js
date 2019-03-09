const imageControlContainer = document.querySelector('.image_control--container')
const imageControl = document.querySelector('.image_control')

function toggleImageControl (open) {
  if (imageControlContainer.classList.contains('open') || open) imageControlContainer.classList.remove('open')
  else imageControlContainer.classList.add('open')
}
