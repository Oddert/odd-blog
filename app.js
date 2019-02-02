
require('dotenv').config()

const express     = require('express')
    , app         = express()
    , bodyParser  = require('body-parser')
    , path        = require('path')

const mongoose    = require('mongoose')

const Post        = require('./models/Post')

app.set('view engine', 'ejs')
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

app.route('/')
  .get((req, res) => {
    Post.find({})
    .then(posts => res.render('index', { posts }))
    .catch(err => console.log(err))
  })

app.route('/post/:id')
  .get((req, res, next) => {
    Post.findById(req.params.id)
      .then(post => parseForm(post))
      .then(data => res.render('show', { data }))
      .catch(err => console.log(err))
  })

app.route('/post/new/')
  .get((req, res, next) => res.render('create'))
  .post((req, res, next) => {
    let date = new Date()
    Post.create(Object.assign({},
      req.body,
      {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay(),
        active: true
      }
    ))
    .then(post => {
      console.log({ post })
      const data = parseForm(post)
      res.render('show', { data })
    })
  })

app.route('/post/new/dev')
  .post((req, res) => {
    const displayData = parseForm(req.body)

     if (req.body.page) res.render('show', { data: displayData })
     else res.json({
       body: req.body,
       params: req.params,
       query: req.query
     })
 })


const PORT = process.env.PORT || 3000
app.listen(
  PORT
  , () => console.log(
    `${new Date().toLocaleTimeString('en-GB')}: Server initialised on PORT: ${PORT}`
  )
)
