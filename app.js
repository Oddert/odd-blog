
require('dotenv').config()

const express         = require('express') // Core Packages
    , app             = express()
    , bodyParser      = require('body-parser')
    , path            = require('path')
    , methodOverride  = require('method-override')
    , helmet          = require('helmet')

const mongoose        = require('mongoose') // Auth / db
    , passport        = require('passport')
    , LocalStrategy   = require('passport-local')

const Post            = require('./models/Post') // Models
    , User            = require('./models/User')

const mw = require('./utils/middleware') //Utils
    , calculateRead   = require('./utils/calculateRead')
    , handleErrorPage = require('./utils/handleErrorPage')

const cloudinaryParser = require('./config/cloudinary') //Config

app.use(helmet())
app.use(require('cors')())

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
  console.log(req.originalUrl)
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
    console.log(req.originalUrl)
    res.redirect('/posts')
  })
  // .get((req, res, next) => res.redirect('/posts'))


app.use('/posts/', require('./routes/posts'))
app.use('/tags/', require('./routes/tags'))
app.use('/user/', require('./routes/users'))
app.use('/auth/', require('./routes/auth'))
app.use('/portfolio/', require('./routes/folio'))

app.use('/api/posts', require('./routes/api_posts'))
app.use('/api/users', require('./routes/api_users'))
app.use('/api/images', require('./routes/api_images'))

app.use('/dev/', require('./routes/dev'))


app.route('/test')
  .get((req, res, next) => res.render('test'))
  .post(cloudinaryParser.single("image"), (req, res, next) => {
    console.log(req.file)
    const image = {
      url: req.file.url,
      id: req.file.public_id
    }
    // Image.create
    res.json({ image, file: req.file })
  })


const PORT = process.env.PORT || 3000
app.listen(
  PORT
  , () => console.log(
    `${new Date().toLocaleTimeString('en-GB')}: Server initialised on PORT: ${PORT}`
  )
)


// -Needs better local sotrage to restore unsaved changes
// -DB can save drafts
// -Need pending status for posts
// -Add login menu to edit / create

// maybe done:   ..?
// -need to restore quote correctly on edit
// -Need to restore alignment correctly on edit
