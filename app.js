
require('dotenv').config()

const express         = require('express')
    , app             = express()
    , bodyParser      = require('body-parser')
    , path            = require('path')
    , methodOverride  = require('method-override')

const mongoose        = require('mongoose')
    , passport        = require('passport')
    , LocalStrategy   = require('passport-local')

const Post            = require('./models/Post')
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

function addUserToLocals (req, res, next) {
  res.locals.user = req.user
  res.locals.blog_name = process.env.BLOG_NAME || 'Blog'
  next()
}

app.use(addUserToLocals)

const handleErrorPage = require('./utils/handleErrorPage')
const handleErrorJSON = require('./utils/handleErrorJSON')

const mw = require('./utils/middleware')
    , parseForDisplay = require('./utils/parseForDisplay')
    , calculateRead   = require('./utils/calculateRead')

const combineNames = user => `${user.primary_name ? user.primary_name : ''} ${user.other_names ? user.other_names.join(' ') : ''} ${user.secondary_name ? user.secondary_name : ''}`
// US / Euro name formating, to be adjusted later


app.route('/')
  .get((req, res) => {
    Post.find({})
      .populate('author.user')
      .then(posts => { console.log(posts); return posts })
      .then(posts => res.render('posts/index', { posts }))
      .catch(err => handleErrorPage(req, res, next, err))
  })


app.route('/api/posts/:id')
 .put(mw.checkPostOwnershipJSON, (req, res, nex) => {
   Post.findByIdAndUpdate(req.params.id, Object.assign({},
     req.body,
     {
       word_count: calculateRead(req.body),
       $push: { updates: { date: Date.now(), author: 'Blog Owner' } }
     }
   ))
   .then(post => parseForDisplay(post))
   .then(data => res.json({ status: 'Success', data, message: 'Saved OK!' }))
   .catch(err => handleErrorJSON(req, res, next, err))
 })

app.route('/api/users/:id')
  .get((req, res, next) => {
    User.findById(req.params.id)
      .then(user => res.json({ user, currentUser: req.user }))
      .catch(err => res.status(500).json({ err }))
  })
  .put((req, res, next) => {
    console.log(req.body)
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(user => res.json({ user }))
      .catch(err => handleErrorJSON(req, res, next, err))
  })

app.route('/dev/:id/undelete')
  .get(mw.checkPostOwnership, (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, { deleted: false, deleted_on: null })
      .then(post => res.redirect('/'))
      .catch(err => handleErrorPage(req, res, next, err))
  })


app.use('/posts/', require('./routes/posts'))
app.use('/user/', require('./routes/users'))
app.use('/auth/', require('./routes/auth'))



const PORT = process.env.PORT || 3000
app.listen(
  PORT
  , () => console.log(
    `${new Date().toLocaleTimeString('en-GB')}: Server initialised on PORT: ${PORT}`
  )
)
