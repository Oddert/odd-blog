module.exports = function (req, res, next, error) {
  console.log('ERROR', req.originalUrl)
  console.log({ error })
  return res.render('error', { error })
}
