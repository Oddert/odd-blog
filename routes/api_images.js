const router = require('express').Router()

const cloudinaryParser = require('../config/cloudinary')

const handleErrorJSON = require('../utils/handleErrorJSON')

const Image = require('../models/Image')

function findImages (req, res, next) {
  return Image.find({ ...req.params })
    .then(images => res.json(images))
    .catch(err => res.json({ err }))
}

router.route('/')
  .get(findImages)
  .post(cloudinaryParser.single("image"), (req, res, next) => {
    const file = req.file
    const Today = new Date()
    Image.create({
      name: file.fieldname || 'Image',
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
