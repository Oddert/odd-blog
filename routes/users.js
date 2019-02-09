const router = require('express').Router()

const User = require('../models/User')

const handleErrorPage = require('../utils/handleErrorPage')

router.route('/:username')
  .get((req, res, next) => {
    User.findOne({ username: req.params.username })
      .then(viewUser => res.render('users/show', { viewUser }))
      .catch(err => handleErrorPage(req, res, next, err))
  })

module.exports = router
