
require('dotenv').config()

const express     = require('express')
    , app         = express()
    , bodyParser  = require('body-parser')
    , path        = require('path')

const mongoose        = require('mongoose')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))

mongoose.connect(process.env.DATABASE)

app.get('/', (req, res) => {
  res.render('create')
})

let api = app.route('/api')
    api.get((req, res) => res.json({ message: 'res ok to route: /api/' }))


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

app.route('/api/tester')
  .get((req, res) => res.json({ message: 'res ok to route: /api/tester/' }))
  .post((req, res) => {
    const displayData = parseForm(req.body)

    // console.log('=============================')
    // console.log({ data: displayData })
    // console.log('-----------------------------')
    // console.log(displayData.inputs)

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
