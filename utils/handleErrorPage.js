module.exports = function (req, res, next, error) {
  console.log('ERROR')
  console.log({ error })
  return res.render('error', { error })
}
