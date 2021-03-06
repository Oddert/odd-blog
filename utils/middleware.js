
const Post = require('../models/Post')

const handleErrorPage = require('./handleErrorPage')

function checkAuth (req, res, next) {
  // console.log(`check auth: `, `/auth/login?redirect=${req.originalUrl}`)
  if (req.isAuthenticated()) return next()
  // else res.redirect(`/auth/login?redirect=${req.originalUrl}`)
  else res.redirect(`/auth/login`)
}
function checkAuthJSON (req, res, next) {
  if (req.isAuthenticated()) return next()
  else res.json({ error: 400, message: 'You need to be logged in to do whatever that is.' })
}

function checkPostOwnership (req, res, next) {
  if (!req.isAuthenticated()) return res.redirect(`/auth/login?redirect=${req.originalUrl}`)
  Post.findById(req.params.id)
    .then(post => {
      if (post.author.id.equals(req.user._id)) return next()
      else handleErrorPage({ error: 402, message: 'You are not the author of whatever that is.' })
    })
    .catch(err => handleErrorPage(req, res, next, err))
}
function checkPostOwnershipJSON (req, res, next) {
  if (!req.isAuthenticated()) return res.json({ error: 400, message: 'You need to be logged in to do whatever that is.' })
  Post.findById(req.params.id)
    .then(post => {
      if (post.author.id.equals(req.user._id)) return next()
      else res.json({ error: 402, message: 'You are not the author of whatever that is.' })
    })
    .catch(err => handleErrorJSON(req, res, next, err))
}
function checkPostOwnershipAlt (req, res, next) {
  if (!req.isAuthenticated()) return res.redirect('/auth/login')
  Post.findById(req.params.yearTitleId)
  .then(post => {
    if (post.author.id.equals(req.user._id)) return next()
    else handleErrorPage({ error: 402, message: 'You are not the author of whatever that is.' })
  })
  .catch(err => handleErrorPage(req, res, next, err))
}

module.exports = {
  checkAuth,
  checkAuthJSON,
  checkPostOwnership,
  checkPostOwnershipJSON,
  checkPostOwnershipAlt
}
