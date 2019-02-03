
require('dotenv').config()

const express         = require('express')
    , app             = express()
    , bodyParser      = require('body-parser')
    , path            = require('path')
    , methodOverride  = require('method-override')

const mongoose        = require('mongoose')

const Post            = require('./models/post')

app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))

mongoose.connect(process.env.DATABASE)

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

// INDEX    get     /dogs
// NEW      get     /dogs/new
// CREATE   post    /dogs
// SHOW     get     /dogs/:id
// EDIT     get     /dogs/:id/edit
// UPDATE   put     /dogs/:id
// DESTROY  delete  /dogs/:id


// INDEX
app.route('/')
  .get((req, res) => {
    Post.find({})
    .then(posts => res.render('index', { posts }))
    .catch(err => console.log(err))
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
      .catch(err => console.log(err))
  })
  .put((req, res, next) => {
    // Post.findByIdAndUpdate(req.params.id, Object.assign({},
    //   req.body,
    //   {
    //     year: date.getFullYear(),
    //     month: date.getMonth(),
    //     day: date.getDay(),
    //     word_count: calculateRead(req.body),
    //     active: true
    //   }
    // ))
    res.json({ message: 'Route PUT /posts/:id/ not yet implamented', id: req.params.id })
  })
  .delete((req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, { deleted: true, deleted_on: Date.now() })
      .then(post => res.redirect('/'))
      .catch(err => console.log(err))
  })

app.route('/posts/:id/edit')
  .get((req, res, next) => {
    Post.findById(req.params.id)
      .then(data => {
        console.log('----------------')
        console.log(data)
        res.render('edit', { data })
      })
      .catch(err => console.log(err))
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
      .catch(err => console.log(err))
  })


const PORT = process.env.PORT || 3000
app.listen(
  PORT
  , () => console.log(
    `${new Date().toLocaleTimeString('en-GB')}: Server initialised on PORT: ${PORT}`
  )
)
