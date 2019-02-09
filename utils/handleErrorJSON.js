module.exports = function (req, res, next, err) {
  console.log('ERROR')
  console.log({ error })
  return res.status(500).json({ err })
}
