const router    = require('express').Router()
    , passport  = require('passport')

const User = require('../models/User')

const mw              = require('../utils/middleware')
    , handleErrorPage = require('../utils/handleErrorPage')
    , handleErrorJSON = require('../utils/handleErrorJSON')

function checkSecret (req, res, next) {
  if (req.body.auth_code === process.env.SECRET) return next()
  else handleErrorPage(req, res, next, 'Incorrect Access Code.' )
}

router.route('/register')
  .get((req, res, next) => res.render('auth_local/register'))
  .post(checkSecret, (req, res, next) => {
    let newUser = new User({ username: req.body.username })
    User.register(newUser, req.body.password)
    .then(user => {
      console.log(user)
      passport.authenticate("local")(req, res, function () {
        res.redirect('/')
      })
    })
    .catch(err => handleErrorPage(req, res, next, err))
  })

router.route('/login')
  .get((req, res, next) => res.render('auth_local/login'))
  .post(passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/register'
  }), function (req, res, next){})

router.route('/logout')
  .get((req, res, next) => {
    req.logout()
    res.redirect('/')
  })

router.route('/secret')
  .post((req, res, next) => {
    console.log(req.body)
    if (req.body.secret === process.env.SECRET) {
      console.log('Sucess!')
      res.status(200)
          .json({ success: true, message: 'Secret code matches!', error: null })
    } else {
      console.log('Fail!')
      res.status(400)
          .json({ success: false, message: 'Error!', error: 'Error: 400, seed code does not match, please check your code and try again.' })
    }
  })

  // INDEX    get     /posts
  // NEW      get     /posts/new
  // CREATE   post    /posts
  // SHOW     get     /posts/:id
  // EDIT     get     /posts/:id/edit
  // UPDATE   put     /posts/:id
  // DESTROY  delete  /posts/:id

module.exports = router
