// req.user

module.exports = function (user) {
  if (user.primary_name && /\w/gi.test(user.primary_name)) {
    const middle = user.other_names.length > 0 ? user.other_names.join(' ') : ''
    const last = (user.secondary_name && /\w/gi.test(user.secondary_name)) ? user.secondary_name : ''
    return `${user.primary_name} ${middle} ${last}`
  } else {
    return user.username
  }
}
