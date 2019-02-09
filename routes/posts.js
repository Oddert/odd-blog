const router = require('express').Router()

const mw                  = require('../utils/middleware')
    , parseForDisplay     = require('../utils/parseForDisplay')
    , calculateRead       = require('../utils/calculateRead')
    , handleErrorPage     = require('../utils/handleErrorPage')
    , handleErrorJSON     = require('../utils/handleErrorJSON')
    , createReadableName  = require('../utils/createReadableName')

const Post = require('../models/Post')
    , User = require('../models/User')

router.route('/')
  .get((req, res, next) => {
    Post.find({})
      .then(posts => res.json(posts))
      .catch(err => console.log(err))
  })

// NEW
router.route('/new')
  .get(mw.checkAuth, (req, res, next) => res.render('posts/create'))
  .post(mw.checkAuth, (req, res, next) => {
    let date = new Date()
    Post.create(Object.assign({},
      req.body,
      {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay(),
        word_count: calculateRead(req.body),
        active: true,
        author: {
          username: req.user.username,
          id: req.user._id,
          user: req.user._id,
          displayName: createReadableName(req.user)
        }
      }
    ))
    .then(post => {
      console.log({ post })
      return Post.findById(post._id)
    })
    .then(post => parseForDisplay(post))
    .then(data => res.render('posts/show', { data }))
  })

// SHOW
// UPDATE
// DESTROY
router.route('/:id')
  .get((req, res, next) => {
    Post.findById(req.params.id)
      .populate('author.user')
      .then(post => parseForDisplay(post))
      .then(data => { console.log(data); return data })
      .then(data => res.render('posts/show', { data }))
      .catch(err => handleErrorPage(req, res, next, err))
  })
  .put(mw.checkPostOwnership, (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, Object.assign({},
      req.body,
      {
        word_count: calculateRead(req.body),
        $push: { updates: { date: Date.now(), author: 'Blog Owner' } }
      }
    ))
    .then(post => parseForDisplay(post))
    .then(data => res.render('posts/show', { data }))
    .catch(err => handleErrorPage(req, res, next, err))
  })
  .delete((req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, { deleted: true, deleted_on: Date.now() })
      .then(post => res.redirect('/'))
      .catch(err => handleErrorPage(req, res, next, err))
  })

router.route('/:id/edit')
  .get(mw.checkPostOwnership, (req, res, next) => {
    Post.findById(req.params.id)
      .then(data => {
        console.log('----------------')
        console.log(data)
        return data
      })
      .then(data => res.render('posts/edit', { data }))
      .catch(err => handleErrorPage(req, res, next, err))
  })
  .put(mw.checkPostOwnership, (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, Object.assign({},
      req.body,
      {
        word_count: calculateRead(req.body),
        $push: { updates: { date: Date.now(), author: 'Blog Owner' } }
      }
    ))
    .then(post => parseForDisplay(post))
    .then(data => res.render('posts/show', { data }))
    .catch(err => handleErrorPage(req, res, next, err))
  })

// NEW (dev)
// Used in development to return the data without data persistance
router.route('/new/dev')
  .post((req, res) => {
    const date = new Date()
    const placeholderData = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDay(),
      word_count: calculateRead(req.body),
      active: true,
      author: {
        username: 'oddert',
        id: '5c5a0b403df18363606c21ad',
        displayName: 'Benjamin Sisko',
        user: {
          profile: `https://projects.johnmarshallmedia.com/img/users/user.png`,
          primary_name: '',
          other_names: [],
          secondary_name: '',
          username: 'oddert_but_dev'
        }
      }
    }
    const displayData = parseForDisplay(
      Object.assign(
        {},
        req.body,
        placeholderData
      )
    )
    console.log('-------------------')
    console.log(displayData)

     if (req.body.page) res.render('posts/show', { data: displayData })
     else res.json({
       body: req.body,
       params: req.params,
       query: req.query
     })
 })


router.route('/:yearTitle/')
  .get((req, res, next) => {
    Post.count({ year: req.params.yearTitle })
      .then(count => {
        if (count > 0) {
          Post.find({ year: req.params.yearTitle })
            .then(posts => res.json(posts))
            .catch(err => res.json({ err }))
        } else {
          Post.count({ title: req.params.yearTitle })
            .then(count => {
              if (count > 0) {
                Post.find({ title: req.params.yearTitle })
                  .then(posts => res.json(posts))
                  .catch(err => res.json({ err }))
              } else {
                Post.count({ _id: req.params.yearTitle })
                  .then(count => {
                    // console.log({ count })
                    if (count > 0) {
                      Post.findOne({ _id: req.params.yearTitle })
                        .populate('author.user')
                        .then(post => parseForDisplay(post))
                        .then(data => res.render('posts/show', { data }))
                        .catch(err => res.json({ err }))
                    } else {
                      res.json({ err: 'Thats not an acceptable file type' })
                    }
                  })
                  .catch(err => res.json({ err }))
              }
            })
        }
      })
      .catch(err => console.log({ err }))
  })
router.route('/id/:id')
  .get((req, res, next) => {
    Post.findById(req.params.id)
      .populate('author.user')
      .then(post => parseForDisplay(post))
      .then(data => res.render('posts/show', { data }))
      .catch(err => res.json({ err }))
  })

function handlePostArr (req, res, next) {
  Post.count({ _id: req.params.year })
    .then(count => {
      console.log({ count })
      Post.find({ ...req.params })
      .populate('author.user')
      .then(posts => res.json(posts))
      .catch(err => res.json({ err }))
    })
    .catch({ err })
}
// router.route('/:year/:month/')
//   .get(handlePostArr)
// router.route('/:year/:month/:day/')
//   .get(handlePostArr)
router.route('/:year/:month/:day/:title')
  .get((req, res, next) => {
    Post.findOne({ ...req.params })
      .populate('author.user')
      .then(post => {
        console.log(post)
        res.render('posts/show', { data: parseForDisplay(post) })
      })
      .catch(err => {
        console.log(err)
        res.json({ err })
      })
  })

module.exports = router
