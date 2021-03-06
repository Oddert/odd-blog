const router = require('express').Router()

const Post = require('../models/Post')
    , User = require('../models/User')

const mw = require('../utils/middleware')
    , handleErrorJSON = require('../utils/handleErrorJSON')
    , parseForDisplay = require('../utils/parseForDisplay')

router.route('/:id')
  .get((req, res, next) => {
    User.findById(req.params.id)
      .populate('posts')
      .then(user => res.json({ user, currentUser: req.user }))
      .catch(err => res.status(500).json({ err }))
  })
  .put((req, res, next) => {
    console.log(req.body)
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(user => res.json({ user }))
      .catch(err => handleErrorJSON(req, res, next, err))
  })

module.exports = router
