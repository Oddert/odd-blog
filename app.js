
require('dotenv').config()

const express         = require('express')
    , app             = express()
    , bodyParser      = require('body-parser')
    , path            = require('path')
    , methodOverride  = require('method-override')

const mongoose        = require('mongoose')
    , passport        = require('passport')
    , LocalStrategy   = require('passport-local')

const Post            = require('./models/post')
    , User            = require('./models/User')

app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))

mongoose.connect(process.env.DATABASE)

app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

function addUserInstance (req, res, next) {
  res.locals.user = req.user
  res.locals.blog_name = process.env.BLOG_NAME || 'Blog'
  next()
}

app.use(addUserInstance)

function parseForm (body) {
  const originalData = JSON.parse(JSON.stringify(body))
  const displayData = JSON.parse(JSON.stringify(body)) // I'm salty that this is apparently the best option of getting a deep clone >:(

  displayData.title = /\w/gi.test(displayData.title) ? displayData.title : "Blog Post"
  displayData.inputs = displayData.inputs
    .slice()
    .map(each => {
      if (each.data_type === 'paragraph') {
        let newText = each.text.split('\r\n')
        each.text = newText
      }
      return each
    }) || []
    return displayData
}

function calculateRead (body) {
  const oneStr = str => str
    .split(' ')
    .map(e => e.split('\r\n'))
    .reduce((acc, each) => acc = [...acc, ...each], []).length

  let wordCount = body.inputs.reduce((acc, each) => {
    if (each.data_type == 'paragraph') {
      return acc += oneStr(each.text)
    } else if (each.data_typ == 'image') {
      return acc += oneStr(each.caption)
    }
    return acc
  }, 0)
  wordCount += oneStr(body.title)
  wordCount += oneStr(body.subtitle)
  return wordCount
}

function handleErrorPage (req, res, next, error) {
  console.log('ERROR')
  console.log({ error })
  return res.render('error', { error })
}
function handleErrorJSON (req, res, next, err) {
  console.log('ERROR')
  console.log({ error })
  return res.status(500).json({ err })
}


function checkAuth (req, res, next) {
  if (req.isAuthenticated()) return next()
  else res.json({ error: 400, message: 'You need to be logged in to do whatever that is.' })
}

function checkPostOwnership (req, res, next) {
  if (!req.isAuthenticated()) return res.json({ error: 400, message: 'You need to be logged in to do whatever that is.' })
  Post.findById(req.params.id)
    .then(post => {
      if (post.author.id.equals(req.user._id)) return next()
      else res.json({ error: 402, message: 'You are not the author of whatever that is.' })
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

const combineNames = user => `${user.primary_name ? user.primary_name : ''} ${user.other_names ? user.other_names.join(' ') : ''} ${user.secondary_name ? user.secondary_name : ''}`
// US / Euro name formating, to be adjusted later


// INDEX    get     /posts
// NEW      get     /posts/new
// CREATE   post    /posts
// SHOW     get     /posts/:id
// EDIT     get     /posts/:id/edit
// UPDATE   put     /posts/:id
// DESTROY  delete  /posts/:id

// INDEX
app.route('/')
  .get((req, res) => {
    Post.find({})
      .populate('author.user')
      .then(posts => { console.log(posts); return posts })
      .then(posts => res.render('posts/index', { posts }))
      .catch(err => handleErrorPage(req, res, next, err))
  })

// NEW
app.route('/posts/new')
  .get(checkAuth, (req, res, next) => res.render('posts/create'))
  .post(checkAuth, (req, res, next) => {
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
          displayName: combineNames(req.user)
        }
      }
    ))
    .then(post => {
      console.log({ post })
      const data = parseForm(post)
      res.render('show', { data })
    })
  })

// SHOW
// UPDATE
// DESTROY
app.route('/posts/:id')
  .get((req, res, next) => {
    Post.findById(req.params.id)
      .populate('author.user')
      .then(post => parseForm(post))
      .then(data => { console.log(data); return data })
      .then(data => res.render('posts/show', { data }))
      .catch(err => handleErrorPage(req, res, next, err))
  })
  .put(checkPostOwnership, (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, Object.assign({},
      req.body,
      {
        word_count: calculateRead(req.body),
        $push: { updates: { date: Date.now(), author: 'Blog Owner' } }
      }
    ))
    .then(post => parseForm(post))
    .then(data => res.render('posts/show', { data }))
    .catch(err => handleErrorPage(req, res, next, err))
  })
  .delete((req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, { deleted: true, deleted_on: Date.now() })
      .then(post => res.redirect('/'))
      .catch(err => handleErrorPage(req, res, next, err))
  })

app.route('/api/posts/:id')
  .put(checkPostOwnershipJSON, (req, res, nex) => {
    Post.findByIdAndUpdate(req.params.id, Object.assign({},
      req.body,
      {
        word_count: calculateRead(req.body),
        $push: { updates: { date: Date.now(), author: 'Blog Owner' } }
      }
    ))
    .then(post => parseForm(post))
    .then(data => res.json({ status: 'Success', data, message: 'Saved OK!' }))
    .catch(err => handleErrorJSON(req, res, next, err))
  })

app.route('/posts/:id/edit')
  .get((req, res, next) => {
    Post.findById(req.params.id)
      .then(data => {
        console.log('----------------')
        console.log(data)
        return data
      })
      .then(data => res.render('edit', { data }))
      .catch(err => handleErrorPage(req, res, next, err))
  })
  .put(checkPostOwnership, (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, Object.assign({},
      req.body,
      {
        word_count: calculateRead(req.body),
        $push: { updates: { date: Date.now(), author: 'Blog Owner' } }
      }
    ))
    .then(post => parseForm(post))
    .then(data => res.render('posts/show', { data }))
    .catch(err => handleErrorPage(req, res, next, err))
  })



// NEW (dev)
// Used in development to return the data without data persistance
app.route('/posts/new/dev')
  .post((req, res) => {
    const displayData = parseForm(req.body)

    console.log(calculateRead(req.body))

     if (req.body.page) res.render('posts/show', { data: displayData })
     else res.json({
       body: req.body,
       params: req.params,
       query: req.query
     })
 })

app.route('/dev/:id/undelete')
  .get(checkPostOwnership, (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, { deleted: false, deleted_on: null })
      .then(post => res.redirect('/'))
      .catch(err => handleErrorPage(req, res, next, err))
  })

function checkSecret (req, res, next) {
  if (req.body.auth_code === process.env.SECRET) return next()
  else handleErrorPage(req, res, next, 'Incorrect Access Code.' )
}

app.route('/auth/register')
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

app.route('/auth/login')
  .get((req, res, next) => res.render('auth_local/login'))
  .post(passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/register'
  }), function (req, res, next){})

app.route('/auth/logout')
  .get((req, res, next) => {
    req.logout()
    res.redirect('/')
  })

app.route('/auth/secret')
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

app.route('/dev/ping')
  .get((req, res, next) => {
    console.log(req.user)
    res.redirect('/')
  })


const PORT = process.env.PORT || 3000
app.listen(
  PORT
  , () => console.log(
    `${new Date().toLocaleTimeString('en-GB')}: Server initialised on PORT: ${PORT}`
  )
)
