
const form            = document.querySelector('form')
const password        = form.querySelector('input[name=password]')
const passwordConfirm = form.querySelector('input[name=password_confirm]')

function checkPasswordsMatch () {
  if (window.location.pathname === '/auth/register') return true
  if (password.value === passwordConfirm.value) {
    console.log('Match')
    form.action = '/auth/register'
    return true
  } else {
    console.log('No Match')
    form.action = ''
    return false
  }
}

function handleSubmit (e) {
  e.preventDefault()
  const secret = form.querySelector('[name=auth_code]').value
  // const secret = 'n0239jvpwejtg9024joriehgiuwe93ty37iwgt2jfhg8w3ign'
  const url = '/auth/secret'
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret })
  }

  fetch(url, options)
  .then(res => res.json())
  .then(res => {
    if (res.success && checkPasswordsMatch()) form.submit()
    else alert(res.error)
  })
  .catch(err => console.log(err))
}

if (window.location.pathname === '/auth/register') {
  password.addEventListener('keyup', checkPasswordsMatch)
  passwordConfirm.addEventListener('keyup', checkPasswordsMatch)
}

form.onsubmit = handleSubmit
