const router = require('express').Router()

const Post = require('../models/Post')

const mw = require('../utils/middleware')
    , handleErrorPage = require('../utils/handleErrorPage')

router.route('/:id/undelete')
  .get(mw.checkPostOwnership, (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, { deleted: false, deleted_on: null })
      .then(post => res.redirect('/'))
      .catch(err => handleErrorPage(req, res, next, err))
  })

module.exports = router
