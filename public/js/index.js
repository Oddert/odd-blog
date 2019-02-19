
const togglePage = document.querySelector('.toggle_pagination__switch')
const perPage = document.querySelector('.per_page')

if (togglePage) togglePage.addEventListener('click', e => {
  e.stopPropigation()
  console.log(window.location)
})

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
      // console.log('delet')
      e.preventDefault()
      toggleDeleteOpen()
    }
  })
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

perPage.onchange = e => {
  function parseSearch (search) {
    let arr = search.substring(1).split('&')
    let out = arr.map(each => {
      let components = each.split('=')
      return { name: components[0], value: components[1] }
    })
    return out
  }
  const removeQuantity = searchParsed => searchParsed.filter(each => each.name !== "quantity").map(each => `${each.name}=${each.value}`)
  const reconstructSearch = params => params.length > 1 ? `?${params[0]}&${params.slice(1).join('&')}` : `?${params[0]}`

  function createSearch (searchStr) {
    const searchParsed        = parseSearch(searchStr)
    if (searchParsed.length === 1) return `/?quantity=${e.target.value}`
    const parsedSearchFilter  = removeQuantity(searchParsed)
    const search              = reconstructSearch(parsedSearchFilter)
    return `${search}&quantity=${e.target.value}`
  }

  const sendSearch = createSearch(window.location.search)
  console.log(sendSearch)
  window.location.href = sendSearch
}
