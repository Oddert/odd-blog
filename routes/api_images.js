const router      = require('express').Router()
    , cloudinary  = require('cloudinary')

const cloudinaryParser = require('../config/cloudinary')

const handleErrorJSON = require('../utils/handleErrorJSON')
    , mw              = require('../utils/middleware')

const Image = require('../models/Image')

function findImages (req, res, next) {
  return Image.find({ ...req.params })
    .then(images => res.json(images))
    .catch(err => res.json({ err }))
}

router.route('/tester')
  .post(cloudinaryParser.array("file", 10), (req, res, next) => {
    const file = req.file
    const files = req.files
    console.log({ file, files })
    res.json({ file, files })
  })

router.route('/image/:id')
  .delete(mw.checkAuth, (req, res, next) => {
    Image.findById(req.params.id)
      .then(image => {
        cloudinary.v2.uploader.destroy(image.cloudinary_id, {}, (err, result) => {
          if (err) return handleErrorPage(req, res, next, err)
          Image.findByIdAndRemove(req.params.id)
            .then(() => res.status(200).json({
              success: true,
              err: null,
              message: 'Image deleted'
            }))
        })
      })
      .catch(err => handleErrorJSON(req, res, next, err))
    // request(
    //   {
    //     // uri: `https://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/oddert/resources/image`
    //     uri: `https://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/oddert/resources/image/upload?public_ids=${req.params.id}`,
    //     method: 'DELETE'
    //   },
    //   (err, resp, body) => {
    //     console.log('error: ', err)
    //     console.log('response: ', resp && resp.statusCode)
    //     console.log('body: ', body)
    //     res.json({ success: `deletin happinin`, target: req.params.id, body: JSON.parse(body) })
    //   })
  })

router.route('/')
  .get(findImages)
  .post(mw.checkAuth, cloudinaryParser.single("file"), (req, res, next) => {
    const file = req.file
    const Today = new Date()
    console.log({ file })
    console.log(req.headers)
    Image.create({
      // name: file.fieldname || 'Image',
      year: req.body.month || Today.getFullYear(),
      month: req.body.month || Today.getMonth() + 1,
      day: req.body.day || Today.getDate(),
      cloudinary_id: file.public_id,
      cloudinary_etag: file.etag,
      url: file.url,
      height: file.height,
      width: file.width,
      mimetype: file.mimetype
    })
    .then(image => res.json({ image }))
    .catch(err => handleErrorJSON(req, res, next, err))
  })
router.route('/:year')
  .get(findImages)
router.route('/:year/:month')
  .get(findImages)
router.route('/:year/:month/:day')
  .get(findImages)

module.exports = router
