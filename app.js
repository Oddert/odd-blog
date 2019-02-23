
require('dotenv').config()

const express         = require('express')
    , app             = express()
    , bodyParser      = require('body-parser')
    , path            = require('path')
    , methodOverride  = require('method-override')
    , helmet          = require('helmet')

const mongoose        = require('mongoose')
    , passport        = require('passport')
    , LocalStrategy   = require('passport-local')

const Post            = require('./models/Post')
    , User            = require('./models/User')

const mw = require('./utils/middleware')
    , calculateRead   = require('./utils/calculateRead')
    , handleErrorPage = require('./utils/handleErrorPage')

app.use(helmet())

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
  res.locals.location = process.env.LOCATION || "https://oddert.github.io/"
  next()
}

app.use(addUserToLocals)

// const combineNames = user => `${user.primary_name ? user.primary_name : ''} ${user.other_names ? user.other_names.join(' ') : ''} ${user.secondary_name ? user.secondary_name : ''}`
// US / Euro name formating, to be adjusted later

app.route('/')
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
      .then(payload => res.render('posts', { ...payload }))
      .catch(err => handleErrorPage(req, res, next, err))
  })


app.use('/posts/', require('./routes/posts'))
app.use('/tags/', require('./routes/tags'))
app.use('/user/', require('./routes/users'))
app.use('/auth/', require('./routes/auth'))

app.use('/api/posts', require('./routes/api_posts'))
app.use('/api/users', require('./routes/api_users'))

app.use('/dev/', require('./routes/dev'))



const PORT = process.env.PORT || 3000
app.listen(
  PORT
  , () => console.log(
    `${new Date().toLocaleTimeString('en-GB')}: Server initialised on PORT: ${PORT}`
  )
)
