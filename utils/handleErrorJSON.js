module.exports = function (req, res, next, err) {
  console.log('ERROR', req.originalUrl)
  console.log({ err })
  return res.status(500).json({ err })
}
