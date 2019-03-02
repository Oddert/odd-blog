const router = require('express').Router()
    , mongoose = require('mongoose')

const mw                  = require('../utils/middleware')
    , parseForDisplay     = require('../utils/parseForDisplay')
    , calculateRead       = require('../utils/calculateRead')
    , handleErrorPage     = require('../utils/handleErrorPage')
    // , handleErrorJSON     = require('../utils/handleErrorJSON')
    , createReadableName  = require('../utils/createReadableName')

const Post = require('../models/Post')
    , User = require('../models/User')

router.route('/')
  .get((req, res, next) => {
    let perPage = req.query.quantity ? Number(req.query.quantity) : 10
    let page = req.query.page ? Number(req.query.page) : 0
    let skip = page * perPage
    let quantity = req.query.quantity ? req.query.quantity : undefined
    let params = req.isAuthenticated() ? {} : { deleted: false }
    // NOTE apparently 'skip' is resource intensive and does not scale well
    // check if there is a better way later
    Post.find(params)
      .skip(skip)
      .limit(perPage)
      .populate('author.user')
      .then(posts => ({ posts, page, skip, perPage, quantity }))
      .then(payload => Post.count({}).then(numPosts => ({ ...payload, numPosts })) )
      // .then(log => { console.log({ log }); return log })
      .then(payload => res.render('posts/index', { ...payload }))
      .catch(err => handleErrorPage(req, res, next, err))
  })

router.route('/tester/:id')
  .get((req, res, next) => {
    console.log(`TESTER for id: ${req.params.id}`)
    Post.findById(req.params.id)
      .then(present => ({ present }))
      .then(posts => Post.findOne({ _id: { $gt: req.params.id } }).sort({ _id: 1 }).then(past => ({ ...posts, past })))
      .then(posts => Post.findOne({ _id: { $lt: req.params.id } }).sort({ _id: -1 }).then(future => ({ ...posts, future })))
      .then(posts => {
        console.log({ posts })
        res.json({ posts })
      })
      // .catch(err => res.json({ err, explination: 'I have none -mongoose wee shit' }))
  })

// NEW
router.route('/new')
  .get(mw.checkAuth, (req, res, next) => res.render('posts/create'))
  .post(mw.checkAuth, (req, res, next) => {
    let date = new Date()
    Post.create(Object.assign({},
      req.body,
      {
        tags: req.body.tags.split(', '),
        year: date.getFullYear(),
        month: date.getMonth()+1,
        day: date.getDate(),
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
    // -Header External Internal
    // -Image External Internal
    .then(post => {
      console.log({ post })
      return Post.findById(post._id)
    })
    .then(post => User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } }).then(user => post))
    .then(post => res.redirect(`/posts/${post._id}`))
    .catch(err => res.status(500).json({ err }))
  })

function renderSinglePage (req, res, next, id) {
  console.log('rendering single page: ', id, { ...id })
  return Post.findOne({ ...id })
    .populate('author.user')
    .then(post => parseForDisplay(post))
    .then(data => ({ data }))
    .then(responce => Post.findOne({ _id: { $gt: responce.data._id } }).sort({ _id: 1 })
    .then(previousPost => ({ ...responce, previousPost })))
    .then(responce => Post.findOne({ _id: { $lt: responce.data._id } }).sort({ _id: -1 })
    .then(nextPost => ({ ...responce, nextPost })))
    .then(responce => res.render('posts/show', { ...responce }))
    .catch(err => handleErrorPage(req, res, next, err))
}

router.route('/:yearTitleId/')
  .get((req, res, next) => {
    // console.log(mongoose.Types.ObjectId.isValid(req.params.yearTitleId))
    if (mongoose.Types.ObjectId.isValid(req.params.yearTitleId)) {
      renderSinglePage(req, res, next, { _id: req.params.yearTitleId })
    } else {
      Post.count({ title: req.params.yearTitleId })
      .then(count => {
        if (count === 1) {
          renderSinglePage(req, res, next, { title: req.params.yearTitleId })
        } else if (count > 0) {
          Post.find({ title: req.params.yearTitleId })
            .then(posts => res.render('search', { posts }))
            .catch(err => handleErrorPage(req, res, next, err))
        } else {
          Post.count({ year: req.params.yearTitleId })
          .then(count => {
            if (count > 1) {
              Post.find({ year: req.params.yearTitleId })
                .then(posts => res.render('search', { posts }))
                .catch(err => handleErrorPage(req, res, next, err))
            } else if (count > 0) {
              renderSinglePage(req, res, next, { year: req.params.yearTitleId })
            } else {
              res.json({ err: 'Thats not an acceptable file type' })
            }
          })
        }
      })
      .catch(err => console.log({ err }))
    }
  })
  .put(mw.checkPostOwnership, (req, res, next) => {
    Post.findByIdAndUpdate(req.params.yearTitleId, Object.assign({},
      req.body,
      {
        tags: req.body.tags.split(', '),
        word_count: calculateRead(req.body),
        $push: { updates: { date: Date.now(), author: 'Blog Owner' } }
      }
    ))
    .then(post => parseForDisplay(post))
    .then(data => res.render('posts/show', { data }))
    .catch(err => handleErrorPage(req, res, next, err))
  })
  .delete((req, res, next) => {
    Post.findByIdAndUpdate(req.params.yearTitleId, { deleted: true, deleted_on: Date.now() })
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
        tags: req.body.tags.split(', '),
        word_count: calculateRead(req.body),
        $push: {
          updates: {
            date: Date.now(),
            author: {
              id: req.user._id,
              username: req.user.username,
              displayName: `${req.user.primary_name} ${req.user.secondary_name}`
            }
          }
        }
      }
    ))
    // .then(post => parseForDisplay(post))
    // .then(data => res.render('posts/show', { data }))
    .then(post => res.redirect(`/posts/${post._id}`))
    .catch(err => handleErrorPage(req, res, next, err))
  })

// NEW (dev)
// Used in development to return the data without data persistance
router.route('/new/dev')
  .post((req, res) => {
    const date = new Date()
    const placeholderData = {
      tags: req.body.tags.split(', '),
      year: date.getFullYear(),
      month: date.getMonth()+1,
      day: date.getDate(),
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
       displayData,
       body: req.body,
       params: req.params,
       query: req.query
     })
 })

router.route('/id/:id')
  .get((req, res, next) => {
    Post.findById(req.params.id)
      .populate('author.user')
      .then(post => parseForDisplay(post))
      .then(data => res.render('posts/show', { data }))
      .catch(err => res.json({ err }))
  })

function handleSearch (req, res, next) {
  Post.find({ ...req.params })
    .then(posts => res.render('search', { posts }))
    .catch(err => handleErrorJSON(req, res, next, err))
}

router.route('/:year/:month/')
  .get(handleSearch)
router.route('/:year/:month/:day/')
  .get(handleSearch)
router.route('/:year/:month/:day/:title')
  .get((req, res, next) => {
    console.log(req.params.year, req.params.month, req.params.day, req.params.title)
    Post.findOne({
      year: req.params.year,
      month: req.params.month,
      day: req.params.day,
      title: { $regex: req.params.title, $options: 'i' }
    })
    // Post.findOne({ ...req.params })
      .populate('author.user')
      .then(post => { console.log({ post }); return post })
      .then(post => parseForDisplay(post))
      .then(data => ({ data }))
      .then(responce => Post.findOne({ _id: { $gt: responce.data._id } }).sort({ _id: 1 })
      .then(previousPost => ({ ...responce, previousPost })))
      .then(responce => Post.findOne({ _id: { $lt: responce.data._id } }).sort({ _id: -1 })
      .then(nextPost => ({ ...responce, nextPost })))
      .then(responce => res.render('posts/show', { ...responce }))
      .catch(err => handleErrorPage(req, res, next, err))
    // Post.find({ ...req.params })
    //   .populate('author.user')
    //   .then(posts => {
    //     console.log({ posts })
    //     res.render('search', { posts })
    //   })
      .catch(err => handleErrorPage(req, res, next, err))
  })

module.exports = router
