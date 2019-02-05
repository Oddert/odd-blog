
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

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

function addUserInstance (req, res, next) {
  res.locals.user = req.user || {}
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
      // console.log('#', each)
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
      .then(posts => res.render('index', { posts }))
      .catch(err => handleErrorPage(req, res, next, err))
  })

// NEW
app.route('/posts/new')
  .get((req, res, next) => res.render('create'))
  .post((req, res, next) => {
    let date = new Date()
    Post.create(Object.assign({},
      req.body,
      {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay(),
        word_count: calculateRead(req.body),
        active: true
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
      .then(post => parseForm(post))
      .then(data => { console.log(data); return data })
      .then(data => res.render('show', { data }))
      .catch(err => handleErrorPage(req, res, next, err))
  })
  .put((req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, Object.assign({},
      req.body,
      {
        word_count: calculateRead(req.body),
        $push: { updates: { date: Date.now(), author: 'Blog Owner' } }
      }
    ))
    .then(post => parseForm(post))
    .then(data => res.render('show', { data }))
    .catch(err => handleErrorPage(req, res, next, err))
  })
  .delete((req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, { deleted: true, deleted_on: Date.now() })
      .then(post => res.redirect('/'))
      .catch(err => handleErrorPage(req, res, next, err))
  })

app.route('/api/posts/:id')
  .put((req, res, nex) => {
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
        res.render('edit', { data })
      })
      .catch(err => handleErrorPage(req, res, next, err))
  })
  .put((req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, Object.assign({},
      req.body,
      {
        word_count: calculateRead(req.body),
        $push: { updates: { date: Date.now(), author: 'Blog Owner' } }
      }
    ))
    .then(post => parseForm(post))
    .then(data => res.render('show', { data }))
    .catch(err => handleErrorPage(req, res, next, err))
  })



// NEW (dev)
app.route('/posts/new/dev')
  .post((req, res) => {
    const displayData = parseForm(req.body)

    console.log(calculateRead(req.body))

     if (req.body.page) res.render('show', { data: displayData })
     else res.json({
       body: req.body,
       params: req.params,
       query: req.query
     })
 })

app.route('/dev/:id/undelete')
  .get((req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, { deleted: false, deleted_on: null })
      .then(post => res.redirect('/'))
      .catch(err => handleErrorPage(req, res, next, err))
  })


app.route('/auth/register')
  .get((req, res, next) => res.render('register'))
  .post((req, res, next) => { console.log(req.body); res.redirect('/') })

app.route('/auth/login')
  .get((req, res, next) => res.render('login'))

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


const PORT = process.env.PORT || 3000
app.listen(
  PORT
  , () => console.log(
    `${new Date().toLocaleTimeString('en-GB')}: Server initialised on PORT: ${PORT}`
  )
)
