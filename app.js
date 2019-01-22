const express = require('express')
    , app = express()
    , bodyParser  = require('body-parser')
    , path = require('path')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.render('index')
})

let api = app.route('/api')
    api.get((req, res) => res.json({ message: 'res ok to route: /api/' }))


function convertParagraph (para) {
  return {
    data_type: 'paragraph',
    data: para
  }
}

app.route('/api/tester')
   .get((req, res) => res.json({ message: 'res ok to route: /api/tester/' }))
   .post((req, res) => {
     let paragraphArrays = req.body.paragraphs
        .filter(e => e.length > 0)
        .map(each => each.split('\r\n'))

     if (req.body.page) {
       console.log({ paragraphArrays })
       res.render('show', { paragraphArrays })
     } else {
       res.json({
         paragraphArrays: paragraphArrays,
         length: paragraphArrays.length
       })
     }
   })





const PORT = process.env.PORT || 3000
app.listen(
  PORT
  , () => console.log(
    `${new Date().toLocaleTimeString('en-GB')}: Server initialised on PORT: ${PORT}`
  )
)
